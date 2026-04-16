// @ts-nocheck
/**
 * P308: Swarm Live View — /coordinate/swarm/live
 * Enhanced version of SwarmViz with:
 * - Agent attention beams (executing agent → active sprint)
 * - Mobile swarm view (BottomSheet instead of hidden panels)
 * - Temporal pulse (recent activity glow)
 * - No audio (deferred)
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import {
  ArrowLeft, Activity, Zap, Bot, Users, Radio, ChevronUp,
} from 'lucide-react'
import { logger } from '../lib/logger'
import { timeAgo } from '../lib/format'
import { BottomSheet } from '../components/BottomSheet'
import { colors } from '../styles/tokens'
import { useWorkshop } from '../lib/workshop-context'

import {
  CRAFT_SYMBOLS, CRAFT_COLORS, STATUS_COLORS, LAYER_COLORS,
  EVENT_PARTICLE_COLORS, ONLINE_THRESHOLD, INACTIVE_THRESHOLD,
  COMPLEXITY_NEON, REPO_COLORS, GITHUB_REPO_RE,
  extractSprintUrls,
  type GraphNode, type GraphEdge, type ResolvedEdge, type Particle,
} from './swarm-viz/SwarmHelpers'

// ── CSS for temporal pulse animation ─────────────────────────────────────────
const pulseStyles = `
@keyframes swarmPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes swarmGlow {
  0%, 100% { filter: drop-shadow(0 0 4px currentColor); }
  50% { filter: drop-shadow(0 0 12px currentColor); }
}
@keyframes beamPulse {
  0%, 100% { stroke-opacity: 0.8; stroke-width: 5; }
  50% { stroke-opacity: 0.4; stroke-width: 3; }
}
@keyframes sprintFlowFade {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.3); }
}
`

export function SwarmLive() {
const { supabase } = useWorkshop()
  const navigate = useNavigate()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const particleIdRef = useRef(0)
  const animFrameRef = useRef<number>(0)
  const nodesRef = useRef<GraphNode[]>([])
  const linksRef = useRef<ResolvedEdge[]>([])

  // Data state
  const [presence, setPresence] = useState<any[]>([])
  const [sprints, setSprints] = useState<any[]>([])
  const [completedSprints, setCompletedSprints] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [protocolEvents, setProtocolEvents] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [workshopChannelId, setWorkshopChannelId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // UI state
  const [dimensions, setDimensions] = useState({ width: 1200, height: 500 })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<'sprints' | 'protocol'>('sprints')
  const [showHeatmap, setShowHeatmap] = useState(true)
  const isMobile = dimensions.width < 500

  // ── Data loading (shared with SwarmViz) ────────────────────────────────────

  const loadPresence = useCallback(async () => {
    const { data } = await supabase
      .from('agent_presence')
      .select('*, participants!inner(name, craft_primary, craft_secondary, role, is_agent)')
      .order('last_seen', { ascending: false })
    setPresence(data || [])
  }, [])

  const loadSprints = useCallback(async () => {
    const { data } = await supabase
      .from('coordination_requests')
      .select(`*, proposer:participants!coordination_requests_proposer_id_fkey(name), claimer:participants!coordination_requests_claimed_by_fkey(name)`)
      .in('status', ['in_progress', 'proposed', 'testing', 'claimed'])
      .order('created_at', { ascending: false })
      .limit(30)
    setSprints(data || [])
  }, [])

  const loadCompletedSprints = useCallback(async () => {
    const { data } = await supabase
      .from('coordination_requests')
      .select(`*, proposer:participants!coordination_requests_proposer_id_fkey(name), claimer:participants!coordination_requests_claimed_by_fkey(name)`)
      .eq('status', 'completed')
      .gte('completed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('completed_at', { ascending: false })
      .limit(200)
    setCompletedSprints(data || [])
  }, [])

  const loadLinks = useCallback(async () => {
    const { data } = await supabase
      .from('coordination_links')
      .select('id, url, title, created_at, participants(name, craft_primary)')
      .order('created_at', { ascending: false })
      .limit(60)
    setLinks(data || [])
  }, [])

  const loadProtocolEvents = useCallback(async (chId: string) => {
    const since = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    const { data } = await supabase
      .from('protocol_events')
      .select(`*, agent:participants!protocol_events_agent_id_fkey(name, craft_primary), sprint:coordination_requests!protocol_events_sprint_id_fkey(title, sprint_id)`)
      .eq('channel_id', chId)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(500)
    setProtocolEvents(data || [])
  }, [])

  const loadActivity = useCallback(async (chId: string) => {
    const { data } = await supabase
      .from('guild_messages')
      .select('*, participants!inner(name, is_agent, craft_primary)')
      .eq('channel_id', chId)
      .order('created_at', { ascending: false })
      .limit(30)
    setActivity(data || [])
  }, [])

  // ── Init + Realtime ────────────────────────────────────────────────────────

  useEffect(() => {
    const chanRef = { current: null as ReturnType<typeof supabase.channel> | null }
    let destroyed = false
    let chId: string | null = null

    async function init() {
      const { data: ch } = await supabase
        .from('guild_channels').select('id').eq('slug', 'workshop').maybeSingle()
      chId = ch?.id || null
      setWorkshopChannelId(chId)
      await Promise.all([
        loadPresence(), loadSprints(), loadCompletedSprints(), loadLinks(),
        chId ? loadProtocolEvents(chId) : Promise.resolve(),
        chId ? loadActivity(chId) : Promise.resolve(),
      ])
      setLoading(false)

      // Realtime
      if (destroyed) return
      const sub = supabase.channel('swarm-live')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_presence' }, () => loadPresence())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_requests' }, () => { loadSprints(); loadCompletedSprints() })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'protocol_events' }, (payload) => {
          if (chId) loadProtocolEvents(chId)
          const evt = payload.new
          if (evt?.agent_id) spawnEventParticle(evt)
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'guild_messages' }, () => { if (chId) loadActivity(chId) })
        .subscribe()
      chanRef.current = sub
    }

    init()
    return () => {
      destroyed = true
      if (chanRef.current) supabase.removeChannel(chanRef.current)
    }
  }, [])

  // ── Resize observer ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect
        const mobile = width < 500
        const minH = mobile ? Math.min(width * 0.95, 440) : 600
        const height = Math.max(minH, Math.min(1200, width * 0.85))
        setDimensions({ width, height })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── Compute graph data ─────────────────────────────────────────────────────

  const now = Date.now()
  const FIVE_MINUTES = 5 * 60 * 1000
  const TEN_MINUTES = 10 * 60 * 1000

  // Repo entities
  const repoEntities = useMemo(() => {
    const repoMap = new Map<string, { slug: string; count: number; lastSeen: string; contributors: Set<string> }>()
    const allSprints = [...sprints, ...completedSprints]
    links.forEach((l) => {
      const m = l.url?.match(GITHUB_REPO_RE)
      if (!m) return
      const slug = m[1].replace(/\.git$/, '')
      const existing = repoMap.get(slug)
      if (existing) existing.count++
      else repoMap.set(slug, { slug, count: 1, lastSeen: l.created_at || '', contributors: new Set() })
    })
    allSprints.forEach((s) => {
      const urls = extractSprintUrls(s)
      const contributor = s.claimed_by || s.proposer_id
      urls.forEach(url => {
        const m = url.match(GITHUB_REPO_RE)
        if (!m) return
        const slug = m[1].replace(/\.git$/, '')
        const ts = s.completed_at || s.created_at || ''
        const existing = repoMap.get(slug)
        if (existing) { existing.count++; if (ts > existing.lastSeen) existing.lastSeen = ts; if (contributor) existing.contributors.add(contributor) }
        else { const c = new Set<string>(); if (contributor) c.add(contributor); repoMap.set(slug, { slug, count: 1, lastSeen: ts, contributors: c }) }
      })
    })
    const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000).toISOString()
    return Array.from(repoMap.values()).filter(r => r.count >= 2 && r.lastSeen >= threeHoursAgo).sort((a, b) => b.count - a.count).slice(0, 8)
  }, [sprints, completedSprints, links, now])

  // Agent nodes
  const agentNodes: GraphNode[] = useMemo(() => {
    return presence
      .filter(p => p.last_seen && (now - new Date(p.last_seen).getTime()) < INACTIVE_THRESHOLD)
      .map(p => {
        const msSince = now - new Date(p.last_seen).getTime()
        const isOnline = msSince < ONLINE_THRESHOLD
        const isExecuting = p.status === 'executing' || !!p.functional_mode
        const recentActivity = msSince < FIVE_MINUTES
        return {
          id: p.agent_id,
          nodeType: 'agent' as const,
          name: p.participants?.name || p.agent_id?.slice(0, 8),
          x: 0, y: 0,
          craftPrimary: p.participants?.craft_primary,
          craftSecondary: p.participants?.craft_secondary,
          status: isOnline ? (p.status || 'active') : 'dormant',
          capacity: p.capacity ?? 100,
          functionalMode: p.functional_mode,
          currentSprint: p.current_sprint,
          color: p.participants?.craft_primary ? (CRAFT_COLORS[p.participants.craft_primary] || 'var(--co-primary)') : 'var(--co-primary)',
          lastSeen: p.last_seen,
          isOnline,
          isExecuting,
          recentActivity,
          role: p.participants?.role,
        }
      })
  }, [presence, now])

  // Repo nodes
  const repoNodes: GraphNode[] = useMemo(() => {
    return repoEntities.map((repo, i) => ({
      id: `repo-${repo.slug}`,
      nodeType: 'repo' as const,
      name: repo.slug.split('/').pop() || repo.slug,
      x: 0, y: 0,
      slug: repo.slug,
      url: `https://github.com/${repo.slug}`,
      color: REPO_COLORS[i % REPO_COLORS.length],
      linkCount: repo.count,
      contributors: Array.from(repo.contributors),
      repoLastSeen: repo.lastSeen,
    }))
  }, [repoEntities])

  // Sprint nodes
  const sprintNodes: GraphNode[] = useMemo(() => {
    return sprints
      .filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status))
      .map(s => {
        const layers = Array.isArray(s.layers) ? s.layers : []
        const recentChange = s.updated_at && (now - new Date(s.updated_at).getTime()) < TEN_MINUTES
        return {
          id: `sprint-${s.id}`,
          sprintUuid: s.id,
          nodeType: 'sprint' as const,
          name: s.sprint_id || s.title?.match(/^([A-Z]\d+)/)?.[1] || s.id.slice(0, 6),
          x: 0, y: 0,
          color: COMPLEXITY_NEON[s.complexity || 'M'] ?? '#ffe01b',
          sprintSerial: s.sprint_id || null,
          sprintStatus: s.status,
          sprintLayers: layers,
          complexity: s.complexity || null,
          claimedBy: s.claimed_by || null,
          claimerName: s.claimer?.name || null,
          proposerId: s.proposer_id || null,
          proposerName: s.proposer?.name || null,
          referenceUrls: s.reference_urls || [],
          description: s.description || '',
          createdAt: s.created_at || null,
          claimedAt: s.claimed_at || null,
          completedAt: s.completed_at || null,
          title: s.title || '',
          recentChange,
        }
      })
  }, [sprints, now])

  // P307 Phase B: Recently completed sprints for flow animation (last 30 min)
  const THIRTY_MINUTES = 30 * 60 * 1000
  const flowNodes: GraphNode[] = useMemo(() => {
    return completedSprints
      .filter(s => s.completed_at && (now - new Date(s.completed_at).getTime()) < THIRTY_MINUTES)
      .slice(0, 8) // cap
      .map(s => {
        const layers = Array.isArray(s.layers) ? s.layers : []
        const completedMs = new Date(s.completed_at).getTime()
        const progress = Math.min(1, (now - completedMs) / THIRTY_MINUTES) // 0→1 over 30min
        return {
          id: `flow-${s.id}`,
          nodeType: 'flow' as const,
          name: s.sprint_id || s.id.slice(0, 6),
          x: 0, y: 0,
          color: COMPLEXITY_NEON[s.complexity || 'M'] ?? '#ffe01b',
          sprintSerial: s.sprint_id || null,
          sprintStatus: 'completed',
          sprintLayers: layers,
          complexity: s.complexity || null,
          claimedBy: s.claimed_by || null,
          referenceUrls: s.reference_urls || [],
          description: s.description || '',
          completedAt: s.completed_at,
          flowProgress: progress, // 0=just completed, 1=fully absorbed
          title: s.title || '',
        }
      })
  }, [completedSprints, now])

  // P307 Phase B: Heatmap data — activity density per angular sector (last 6h)
  const heatmapData = useMemo(() => {
    const SIX_HOURS = 6 * 60 * 60 * 1000
    const sectors = 24 // divide circle into 24 sectors
    const counts = new Array(sectors).fill(0)
    const recentEvents = protocolEvents.filter(e => e.created_at && (now - new Date(e.created_at).getTime()) < SIX_HOURS)

    // Map each event to a sector based on its agent's angular position
    recentEvents.forEach(evt => {
      const agent = agentNodes.find(a => a.id === evt.agent_id)
      if (!agent || !agent.x || !agent.y) return
      // We don't have cx/cy here, so compute sector based on time
      const eventTime = new Date(evt.created_at).getTime()
      const timeFraction = (eventTime % (24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
      const sector = Math.floor(timeFraction * sectors) % sectors
      counts[sector]++
    })

    const maxCount = Math.max(1, ...counts)
    return counts.map((count, i) => ({
      sector: i,
      angle: (2 * Math.PI * i) / sectors - Math.PI / 2,
      intensity: count / maxCount,
      count,
    }))
  }, [protocolEvents, agentNodes, now])

  const allGraphNodes = useMemo(() => [...agentNodes, ...repoNodes, ...sprintNodes, ...flowNodes], [agentNodes, repoNodes, sprintNodes, flowNodes])

  // Edges including attention beams
  const allEdges: GraphEdge[] = useMemo(() => {
    const edges: GraphEdge[] = []
    const agentIds = new Set(agentNodes.map(n => n.id))

    // Sprint edges
    sprintNodes.forEach(sn => {
      if (sn.claimedBy && agentIds.has(sn.claimedBy)) {
        edges.push({ id: `claim-${sn.id}`, source: sn.claimedBy, target: sn.id, edgeType: 'sprint-claim', layers: sn.sprintLayers, status: sn.sprintStatus })
      }
      if (sn.proposerId && agentIds.has(sn.proposerId) && sn.proposerId !== sn.claimedBy) {
        edges.push({ id: `propose-${sn.id}`, source: sn.proposerId, target: sn.id, edgeType: 'sprint-propose', layers: sn.sprintLayers, status: sn.sprintStatus })
      }
    })

    // P308: Attention beams — executing agents → their current sprint
    agentNodes.forEach(agent => {
      if (agent.isExecuting && agent.currentSprint) {
        const sprintNode = sprintNodes.find(sn => sn.sprintUuid === agent.currentSprint)
        if (sprintNode) {
          edges.push({ id: `beam-${agent.id}`, source: agent.id, target: sprintNode.id, edgeType: 'attention-beam' })
        }
      }
    })

    // Sprint → Repo edges
    const repoNodeIds = new Set(repoEntities.map(r => `repo-${r.slug}`))
    sprintNodes.forEach(sn => {
      const rawUrls = [...(sn.referenceUrls || []), sn.description || '']
      rawUrls.forEach(text => {
        const matches = (text || '').matchAll(/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/g)
        for (const m of matches) {
          const slug = m[1].replace(/\.git$/, '')
          const repoNodeId = `repo-${slug}`
          if (repoNodeIds.has(repoNodeId)) {
            edges.push({ id: `sprint-repo-${sn.id}-${slug}`, source: sn.id, target: repoNodeId, edgeType: 'sprint-repo', layers: sn.sprintLayers })
          }
        }
      })
    })

    // Repo contribution edges
    repoEntities.forEach(repo => {
      repo.contributors.forEach(agentId => {
        if (!agentIds.has(agentId)) return
        edges.push({ id: `contrib-${agentId}-${repo.slug}`, source: agentId, target: `repo-${repo.slug}`, edgeType: 'repo-contribution' })
      })
    })

    // Co-authorship edges (hidden on mobile)
    if (!isMobile) {
      const coAuthorCounts = new Map<string, number>()
      sprintNodes.forEach(sn => {
        if (sn.proposerId && sn.claimedBy && sn.proposerId !== sn.claimedBy && agentIds.has(sn.proposerId) && agentIds.has(sn.claimedBy)) {
          const pair = [sn.proposerId, sn.claimedBy].sort().join('::')
          coAuthorCounts.set(pair, (coAuthorCounts.get(pair) || 0) + 1)
        }
      })
      completedSprints.forEach(s => {
        if (s.proposer_id && s.claimed_by && s.proposer_id !== s.claimed_by && agentIds.has(s.proposer_id) && agentIds.has(s.claimed_by)) {
          const pair = [s.proposer_id, s.claimed_by].sort().join('::')
          coAuthorCounts.set(pair, (coAuthorCounts.get(pair) || 0) + 1)
        }
      })
      coAuthorCounts.forEach((count, pair) => {
        const [a, b] = pair.split('::')
        edges.push({ id: `coauthor-${a}-${b}`, source: a, target: b, edgeType: 'co-authorship', weight: count })
      })
    }

    return edges
  }, [sprintNodes, repoEntities, agentNodes, completedSprints, isMobile])

  // ── Particle spawning ─────────────────────────────────────────────────────

  const spawnEventParticle = useCallback((evt) => {
    const nodes = nodesRef.current
    const sourceNode = nodes.find(n => n.id === evt.agent_id)
    if (!sourceNode) return
    // P308: Cap particles on mobile
    if (isMobile && particlesRef.current.length >= 5) return
    const color = EVENT_PARTICLE_COLORS[evt.event_type] || EVENT_PARTICLE_COLORS.default
    const targets = nodes.filter(n => n.id !== evt.agent_id)
    if (targets.length === 0) return
    const target = targets[Math.floor(Math.random() * targets.length)]
    particlesRef.current.push({
      id: ++particleIdRef.current, sourceId: evt.agent_id, targetId: target.id,
      progress: 0, speed: 0.012 + Math.random() * 0.018, color, eventType: evt.event_type,
    })
  }, [isMobile])

  // ── D3 Visualization ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!svgRef.current || loading) return

    const svg = d3.select(svgRef.current)
    const { width, height } = dimensions
    const cx = width / 2, cy = height / 2

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const repoData = allGraphNodes.filter(n => n.nodeType === 'repo')
    const agentData = allGraphNodes.filter(n => n.nodeType === 'agent')
    const sprintData = allGraphNodes.filter(n => n.nodeType === 'sprint')

    const dim = Math.min(width, height)
    const totalR = dim * 0.44
    const MAX_REPO_HALF = 45
    const MAX_SPRINT_HALF = 44
    const MAX_AGENT_R = 35
    const GAP = 20

    // Repo zone
    const sortedRepos = [...repoData].sort((a, b) => (b.linkCount || 0) - (a.linkCount || 0))
    const maxRefCount = Math.max(1, ...sortedRepos.map(r => r.linkCount || 1))
    const repoCount = sortedRepos.length
    const cols = repoCount > 0 ? Math.ceil(Math.sqrt(repoCount)) : 1
    const MIN_REPO_SPACING = MAX_REPO_HALF * 2 + 8
    const maxGridHalf = Math.ceil(cols / 2) || 1
    const repoBudget = Math.max(MIN_REPO_SPACING * maxGridHalf + MAX_REPO_HALF, totalR * 0.28)
    const repoSpacing = repoCount > 1 ? Math.min(120, Math.max(MIN_REPO_SPACING, Math.floor((repoBudget - MAX_REPO_HALF) / maxGridHalf))) : 0

    let repoZoneOuter = 0
    if (repoCount > 0) {
      const half = Math.floor(cols / 2) + 1
      const gridPositions: { gx: number; gy: number; dist: number }[] = []
      for (let gy = -half; gy <= half; gy++) for (let gx = -half; gx <= half; gx++) gridPositions.push({ gx, gy, dist: gx * gx + gy * gy })
      gridPositions.sort((a, b) => a.dist - b.dist)
      sortedRepos.forEach((repo, i) => {
        const pos = gridPositions[i]
        repo.x = cx + pos.gx * repoSpacing
        repo.y = cy + pos.gy * repoSpacing
        repoZoneOuter = Math.max(repoZoneOuter, Math.sqrt((pos.gx * repoSpacing) ** 2 + (pos.gy * repoSpacing) ** 2) + MAX_REPO_HALF)
      })
    } else {
      repoZoneOuter = 20
    }

    const idealSprintR = repoZoneOuter + GAP + MAX_SPRINT_HALF
    const idealSprintZoneOuter = idealSprintR + MAX_SPRINT_HALF
    const idealAgentR = idealSprintZoneOuter + GAP + MAX_AGENT_R
    const zoneScale = idealAgentR > totalR ? totalR / idealAgentR : 1.0
    const sprintR = idealSprintR * zoneScale
    const agentR = idealAgentR * zoneScale

    if (zoneScale < 1) sortedRepos.forEach(repo => { repo.x = cx + (repo.x - cx) * zoneScale; repo.y = cy + (repo.y - cy) * zoneScale; repoZoneOuter *= zoneScale })

    // P307 Phase C: Contribution gravity — sprints gravitate toward their referenced repo
    sprintData.forEach((sn, i) => {
      const baseAngle = (2 * Math.PI * i) / Math.max(sprintData.length, 1) - Math.PI / 2
      let targetX = cx + sprintR * Math.cos(baseAngle)
      let targetY = cy + sprintR * Math.sin(baseAngle)

      // If sprint references a repo, pull 20% toward it
      if (sn.referenceUrls && sortedRepos.length > 0) {
        for (const url of (sn.referenceUrls || [])) {
          const m = (url || '').match(GITHUB_REPO_RE)
          if (m) {
            const slug = m[1].replace(/\.git$/, '')
            const repo = sortedRepos.find(r => r.slug === slug)
            if (repo && repo.x != null) {
              const pullStrength = sn.sprintStatus === 'in_progress' ? 0.25 : 0.15
              targetX = targetX + (repo.x - targetX) * pullStrength
              targetY = targetY + (repo.y - targetY) * pullStrength
              break
            }
          }
        }
      }
      sn.x = targetX
      sn.y = targetY
    })

    agentData.forEach((agent, idx) => {
      const angle = (2 * Math.PI * idx) / Math.max(agentData.length, 1) - Math.PI / 2
      agent.x = cx + agentR * Math.cos(angle)
      agent.y = cy + agentR * Math.sin(angle)
    })

    const nodeById = new Map<string, GraphNode>()
    const allNodes = [...repoData, ...sprintData, ...agentData]
    allNodes.forEach(n => nodeById.set(n.id, n))
    nodesRef.current = allNodes

    const resolvedLinks: ResolvedEdge[] = allEdges.filter(e => {
      const srcId = typeof e.source === 'string' ? e.source : e.source.id
      const tgtId = typeof e.target === 'string' ? e.target : e.target.id
      return nodeById.has(srcId) && nodeById.has(tgtId)
    }).map(e => ({
      ...e,
      source: nodeById.get(typeof e.source === 'string' ? e.source : e.source.id)!,
      target: nodeById.get(typeof e.target === 'string' ? e.target : e.target.id)!,
    }))
    linksRef.current = resolvedLinks

    // SVG setup
    let defs = svg.select<SVGDefsElement>('defs')
    if (defs.empty()) {
      defs = svg.append('defs')
      const glow = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      glow.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur')
      const merge = glow.append('feMerge')
      merge.append('feMergeNode').attr('in', 'blur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')
      // P308: Stronger glow for attention beams
      const beamGlow = defs.append('filter').attr('id', 'beam-glow').attr('x', '-100%').attr('y', '-100%').attr('width', '300%').attr('height', '300%')
      beamGlow.append('feGaussianBlur').attr('stdDeviation', '8').attr('result', 'blur')
      const bMerge = beamGlow.append('feMerge')
      bMerge.append('feMergeNode').attr('in', 'blur')
      bMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    }

    let g = svg.select<SVGGElement>('g.main-group')
    if (g.empty()) {
      g = svg.append('g').attr('class', 'main-group')
      svg.call(d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.3, 3]).on('zoom', (event) => { g.attr('transform', event.transform) }))
    }

    // P307: Heatmap layer (behind everything)
    let heatmapG = g.select<SVGGElement>('g.heatmap')
    if (heatmapG.empty()) heatmapG = g.append('g').attr('class', 'heatmap')
    let linkG = g.select<SVGGElement>('g.links')
    if (linkG.empty()) linkG = g.append('g').attr('class', 'links')
    let beamG = g.select<SVGGElement>('g.beams')
    if (beamG.empty()) beamG = g.append('g').attr('class', 'beams')
    let flowG = g.select<SVGGElement>('g.flow-nodes')
    if (flowG.empty()) flowG = g.append('g').attr('class', 'flow-nodes')
    let particleG = g.select<SVGGElement>('g.particles')
    if (particleG.empty()) particleG = g.append('g').attr('class', 'particles')
    let nodeG = g.select<SVGGElement>('g.nodes')
    if (nodeG.empty()) nodeG = g.append('g').attr('class', 'nodes')

    function render() {
      const allN = nodesRef.current
      const lnks = linksRef.current

      // ── P307 Phase B: Temporal Heatmap Layer ──
      if (showHeatmap && heatmapData.length > 0) {
        const heatR = agentR + 15 // just outside agent ring
        const sectorAngle = (2 * Math.PI) / heatmapData.length
        const arcGen = d3.arc()

        const hSel = heatmapG.selectAll<SVGPathElement, typeof heatmapData[0]>('path.heat-sector')
          .data(heatmapData, d => `heat-${d.sector}`)
        hSel.exit().remove()
        const hEnter = hSel.enter().append('path').attr('class', 'heat-sector')
        hSel.merge(hEnter)
          .attr('d', d => arcGen({
            innerRadius: heatR - 8,
            outerRadius: heatR + 8 + d.intensity * 20,
            startAngle: d.angle - sectorAngle / 2 + Math.PI / 2,
            endAngle: d.angle + sectorAngle / 2 + Math.PI / 2,
          }))
          .attr('transform', `translate(${cx},${cy})`)
          .attr('fill', d => {
            const r = Math.floor(196 + d.intensity * 59)
            const g = Math.floor(149 - d.intensity * 80)
            const b = Math.floor(106 - d.intensity * 60)
            return `rgba(${r},${g},${b},${0.05 + d.intensity * 0.15})`
          })
          .attr('stroke', 'none')
      } else {
        heatmapG.selectAll('path.heat-sector').remove()
      }

      // ── P307 Phase B: Sprint Flow — recently completed sprints drift toward center ──
      const flowData = allN.filter(n => n.nodeType === 'flow')
      // Position flow nodes: start at sprint ring, drift toward center based on flowProgress
      flowData.forEach(fn => {
        // Find the repo this sprint touched (via reference_urls)
        let targetX = cx, targetY = cy
        const repoN = allN.filter(n => n.nodeType === 'repo')
        if (fn.referenceUrls && repoN.length > 0) {
          for (const url of fn.referenceUrls) {
            const m = (url || '').match(GITHUB_REPO_RE)
            if (m) {
              const slug = m[1].replace(/\.git$/, '')
              const repo = repoN.find(r => r.slug === slug)
              if (repo) { targetX = repo.x; targetY = repo.y; break }
            }
          }
        }
        // Interpolate from sprint ring toward target repo
        const startAngle = Math.random() * 2 * Math.PI // semi-random start position
        const startX = cx + sprintR * Math.cos(startAngle)
        const startY = cy + sprintR * Math.sin(startAngle)
        const p = fn.flowProgress || 0
        fn.x = startX + (targetX - startX) * p
        fn.y = startY + (targetY - startY) * p
      })

      const fSel = flowG.selectAll<SVGGElement, GraphNode>('g.flow-node').data(flowData, d => d.id)
      fSel.exit().remove()
      const fEnter = fSel.enter().append('g').attr('class', 'flow-node')
      fEnter.append('polygon')
      fEnter.append('text').attr('text-anchor', 'middle').attr('dy', 3)
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', '6px')
        .attr('font-weight', '600').style('pointer-events', 'none')

      const allF = fSel.merge(fEnter)
      allF.attr('transform', d => `translate(${d.x},${d.y})`)
        .style('opacity', d => Math.max(0, 1 - (d.flowProgress || 0)))

      allF.select('polygon').each(function(d) {
        const baseSize = 20
        const s = baseSize * Math.max(0.3, 1 - (d.flowProgress || 0) * 0.7)
        d3.select(this).attr('points', `0,${-s} ${s},0 0,${s} ${-s},0`)
          .attr('fill', d.color + '44')
          .attr('stroke', d.color)
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.4)
          .attr('stroke-dasharray', '3,3')
      })
      allF.select('text').text(d => d.sprintSerial || '').attr('fill', d => d.color).attr('opacity', 0.5)

      // ── Regular edges (non-beam) ──
      const regularLinks = lnks.filter(d => d.edgeType !== 'attention-beam')
      const linkSel = linkG.selectAll<SVGLineElement, ResolvedEdge>('line').data(regularLinks, d => d.id)
      linkSel.exit().remove()
      const linkEnter = linkSel.enter().append('line')
      linkSel.merge(linkEnter)
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
        .attr('stroke', d => {
          if (d.edgeType === 'co-authorship') return 'var(--co-primary)'
          if (d.edgeType === 'repo-contribution') return d.target.color || 'var(--co-text-muted)'
          if (d.edgeType === 'sprint-claim' || d.edgeType === 'sprint-propose') return d.target.color || 'var(--co-text-muted)'
          if (d.edgeType === 'sprint-repo') return d.source.color || 'var(--co-text-muted)'
          return 'var(--co-text-muted)'
        })
        .attr('stroke-width', d => {
          if (d.edgeType === 'co-authorship') return Math.min(1.5 + (d.weight || 1) * 0.3, 5)
          if (d.edgeType === 'sprint-claim') return 2.0
          return 1.2
        })
        .attr('stroke-opacity', d => {
          // P308: Dim edges for idle agents
          const srcAgent = d.source.nodeType === 'agent' ? d.source : null
          if (srcAgent && !srcAgent.isOnline) return 0.08
          if (d.edgeType === 'co-authorship') return 0.5
          if (d.edgeType === 'sprint-claim') return 0.5
          if (d.edgeType === 'sprint-propose') return 0.25
          return 0.2
        })
        .attr('stroke-dasharray', d => d.edgeType === 'sprint-propose' || d.edgeType === 'repo-contribution' ? '4,3' : 'none')

      // ── P308: Attention beams ──
      const beamLinks = lnks.filter(d => d.edgeType === 'attention-beam')
      const beamSel = beamG.selectAll<SVGLineElement, ResolvedEdge>('line.beam').data(beamLinks, d => d.id)
      beamSel.exit().remove()
      const beamEnter = beamSel.enter().append('line').attr('class', 'beam')
      beamSel.merge(beamEnter)
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
        .attr('stroke', d => d.source.color || 'var(--co-primary)')
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 0.7)
        .attr('filter', 'url(#beam-glow)')
        .style('animation', 'beamPulse 2s ease-in-out infinite')

      // ── Agent nodes ──
      const agentN = allN.filter(n => n.nodeType === 'agent')
      const r = (d: GraphNode) => 18 + (d.capacity || 80) / 7

      const aSel = nodeG.selectAll<SVGGElement, GraphNode>('g.agent-node').data(agentN, d => d.id)
      aSel.exit().remove()
      const aEnter = aSel.enter().append('g').attr('class', 'agent-node')
      aEnter.append('circle').attr('class', 'halo')
      aEnter.append('circle').attr('class', 'core')
      aEnter.append('text').attr('class', 'initials').attr('dy', 4).attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', isMobile ? '9px' : '11px')
        .attr('font-weight', '500').attr('fill', '#0a0a0a').style('pointer-events', 'none')
      aEnter.append('text').attr('class', 'name-label').attr('text-anchor', 'middle')
        .attr('font-family', "'Cormorant', serif").attr('font-size', isMobile ? '11px' : '13px')
        .style('pointer-events', 'none')
      aEnter.append('text').attr('class', 'craft-label').attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', isMobile ? '7px' : '9px')
        .attr('fill', 'var(--co-text-muted)').style('pointer-events', 'none')

      const allA = aSel.merge(aEnter)
      allA.attr('transform', d => `translate(${d.x},${d.y})`).style('cursor', 'pointer')
        .on('click', (event, d) => { event.stopPropagation(); setSelectedNode(d); if (isMobile) setBottomSheetOpen(true) })
        .on('touchstart', (event, d) => { event.preventDefault(); setSelectedNode(d); if (isMobile) setBottomSheetOpen(true) })

      // P308: Idle agents dim to 30%, executing agents pulse
      allA.select('.halo')
        .attr('r', d => r(d) + 8).attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', d => d.isExecuting ? 3 : d.role === 'steward' ? 2 : 1)
        .attr('stroke-opacity', d => d.isExecuting ? 0.6 : d.isOnline ? 0.25 : 0.06)
        .style('animation', d => d.isExecuting ? 'swarmGlow 2s ease-in-out infinite' : 'none')
        .style('color', d => d.color)

      allA.select('.core')
        .attr('r', r)
        .attr('fill', d => STATUS_COLORS[d.status || 'idle'] || STATUS_COLORS.idle)
        .attr('stroke', d => d.color).attr('stroke-width', 1.5)
        .attr('opacity', d => d.isExecuting ? 1 : d.isOnline ? 0.7 : 0.2)
        .attr('filter', d => d.isExecuting ? 'url(#glow)' : 'none')
        .style('animation', d => d.recentActivity ? 'swarmPulse 3s ease-in-out infinite' : 'none')

      allA.select('.initials').text(d => d.name.slice(0, 2).toUpperCase())
        .attr('opacity', d => d.isExecuting ? 1 : d.isOnline ? 0.8 : 0.2)

      const agentLabelAngle = (d: GraphNode) => Math.atan2(d.y - cy, d.x - cx)
      const agentLabelAnchor = (d: GraphNode) => { const cos = Math.cos(agentLabelAngle(d)); return Math.abs(cos) > 0.45 ? (cos > 0 ? 'start' : 'end') : 'middle' }

      allA.select('.name-label')
        .attr('x', d => (r(d) + 14) * Math.cos(agentLabelAngle(d)))
        .attr('y', d => (r(d) + 14) * Math.sin(agentLabelAngle(d)))
        .attr('dy', '0.35em').attr('text-anchor', d => agentLabelAnchor(d))
        .text(d => d.name)
        .attr('fill', d => d.isExecuting ? d.color : d.isOnline ? '#c8c2ba' : 'var(--co-border)')

      allA.select('.craft-label')
        .attr('x', d => (r(d) + 28) * Math.cos(agentLabelAngle(d)))
        .attr('y', d => (r(d) + 28) * Math.sin(agentLabelAngle(d)))
        .attr('dy', '0.35em').attr('text-anchor', d => agentLabelAnchor(d))
        .text(d => {
          if (d.isExecuting && d.functionalMode) return d.functionalMode
          const parts: string[] = []
          if (d.craftPrimary) parts.push(`${CRAFT_SYMBOLS[d.craftPrimary] || ''}${d.craftPrimary}`)
          return parts.join('')
        })

      // ── Repo nodes ──
      const repoN = allN.filter(n => n.nodeType === 'repo')
      const repoSize = (d: GraphNode) => 30 + ((d.linkCount || 1) / maxRefCount) * 40

      const rSel = nodeG.selectAll<SVGGElement, GraphNode>('g.repo-node').data(repoN, d => d.id)
      rSel.exit().remove()
      const rEnter = rSel.enter().append('g').attr('class', 'repo-node')
      rEnter.append('rect').attr('rx', 4).attr('ry', 4)
      rEnter.append('text').attr('class', 'repo-name').attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-weight', '500').style('pointer-events', 'none')
      rEnter.append('text').attr('class', 'repo-count').attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").style('pointer-events', 'none')

      const allR = rSel.merge(rEnter)
      allR.attr('transform', d => `translate(${d.x},${d.y})`).style('cursor', 'pointer')
        .on('click', (event, d) => { event.stopPropagation(); setSelectedNode(d); if (isMobile) setBottomSheetOpen(true) })

      allR.select('rect')
        .attr('x', d => -repoSize(d) / 2).attr('y', d => -repoSize(d) / 2)
        .attr('width', d => repoSize(d)).attr('height', d => repoSize(d))
        .attr('fill', '#111').attr('stroke', d => d.color).attr('stroke-width', 1).attr('stroke-opacity', 0.5)

      allR.select('.repo-name')
        .attr('y', d => -repoSize(d) / 2 - 6).attr('font-size', '8px')
        .attr('fill', d => d.color).attr('opacity', 0.6)
        .text(d => d.name.length > 12 ? d.name.slice(0, 10) + '..' : d.name)

      allR.select('.repo-count').attr('y', 3).attr('font-size', '8px').attr('fill', '#777')
        .text(d => `${d.linkCount || 0}`)

      // ── Sprint nodes ──
      const sprintN = allN.filter(n => n.nodeType === 'sprint')
      const COMPLEXITY_SIZE: Record<string, number> = { XS: 16, S: 20, M: 26, L: 32, XL: 40 }
      const sprintSize = (d: GraphNode) => COMPLEXITY_SIZE[d.complexity || 'M'] ?? 26

      const snSel = nodeG.selectAll<SVGGElement, GraphNode>('g.sprint-node').data(sprintN, d => d.id)
      snSel.exit().remove()
      const snEnter = snSel.enter().append('g').attr('class', 'sprint-node')
      snEnter.append('polygon')
      snEnter.append('text').attr('class', 'sprint-label').attr('text-anchor', 'middle').attr('dy', 4)
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', isMobile ? '7px' : '8px')
        .attr('font-weight', '600').style('pointer-events', 'none')

      const allSN = snSel.merge(snEnter)
      allSN.attr('transform', d => `translate(${d.x},${d.y})`).style('cursor', 'pointer')
        .on('click', (event, d) => { event.stopPropagation(); setSelectedNode(d); if (isMobile) setBottomSheetOpen(true) })

      allSN.select('polygon').each(function(d) {
        const s = sprintSize(d)
        const isActive = d.sprintStatus === 'in_progress'
        d3.select(this).attr('points', `0,${-s} ${s},0 0,${s} ${-s},0`)
          .attr('fill', isActive ? d.color + 'aa' : d.color + '33')
          .attr('stroke', d.color).attr('stroke-width', isActive ? 3.5 : 2)
          .attr('stroke-dasharray', !isActive ? '5,3' : 'none')
          .attr('filter', isActive ? 'url(#glow)' : 'none')
          .style('animation', d.recentChange ? 'swarmPulse 2s ease-in-out 3' : 'none')
      })

      allSN.select('.sprint-label').text(d => d.sprintSerial || 'P?').attr('fill', d => d.color)
        .attr('opacity', d => d.sprintStatus === 'in_progress' ? 0.8 : 0.5)

      // ── Particles ──
      const ps = particlesRef.current
      const pSel = particleG.selectAll<SVGCircleElement, Particle>('circle.particle').data(ps, d => d.id)
      pSel.exit().remove()
      const pEnter = pSel.enter().append('circle').attr('class', 'particle')
      pSel.merge(pEnter).attr('r', 3).attr('fill', d => d.color).attr('opacity', 0.85)
        .each(function(d) {
          const src = allN.find(n => n.id === d.sourceId)
          const tgt = allN.find(n => n.id === d.targetId)
          if (src && tgt) {
            d3.select(this).attr('cx', src.x + (tgt.x - src.x) * d.progress).attr('cy', src.y + (tgt.y - src.y) * d.progress)
          }
        })
    }

    function animate() {
      const ps = particlesRef.current
      for (let i = ps.length - 1; i >= 0; i--) { ps[i].progress += ps[i].speed; if (ps[i].progress >= 1) ps.splice(i, 1) }
      // P308: Reduced ambient particle rate on mobile
      const ambientRate = isMobile ? 0.008 : 0.016
      if (Math.random() < ambientRate && resolvedLinks.length > 0) {
        const link = resolvedLinks[Math.floor(Math.random() * resolvedLinks.length)]
        if (link.edgeType !== 'attention-beam') {
          particlesRef.current.push({
            id: ++particleIdRef.current, sourceId: link.source.id, targetId: link.target.id,
            progress: 0, speed: 0.006 + Math.random() * 0.012,
            color: link.target.color || 'var(--co-text-muted)', eventType: 'ambient',
          })
        }
      }
      render()
      if (ps.length > 0) { animFrameRef.current = requestAnimationFrame(animate) }
    }

    render()
    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [loading, allGraphNodes, allEdges, dimensions, isMobile, showHeatmap, heatmapData])

  // ── Derived stats ──────────────────────────────────────────────────────────

  const onlineCount = agentNodes.filter(n => n.isOnline).length
  const executingCount = agentNodes.filter(n => n.isExecuting).length
  const activeSprintCount = sprints.filter(s => ['in_progress', 'testing'].includes(s.status)).length

  // ── Node detail for bottom sheet / sidebar ─────────────────────────────────

  const renderNodeDetail = (node: GraphNode) => {
    const relTime = (iso: string) => { if (!iso) return '—'; const diff = Date.now() - new Date(iso).getTime(); const h = Math.floor(diff / 3_600_000); const m = Math.floor(diff / 60_000); return h > 0 ? `${h}h ago` : m > 0 ? `${m}m ago` : 'just now' }

    if (node.nodeType === 'agent') {
      return (
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', lineHeight: '1.8' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: node.color, marginBottom: '8px' }}>{node.name}</div>
          {node.craftPrimary && <div style={{ color: CRAFT_COLORS[node.craftPrimary] || 'var(--co-primary)', marginBottom: '4px' }}>{CRAFT_SYMBOLS[node.craftPrimary] || ''} {node.craftPrimary}{node.craftSecondary ? ` x ${node.craftSecondary}` : ''}</div>}
          <div>Status: <span style={{ color: node.isExecuting ? '#4ade80' : node.isOnline ? '#8aba8a' : 'var(--co-text-muted)' }}>{node.isExecuting ? 'executing' : node.isOnline ? 'online' : 'offline'}</span></div>
          {node.functionalMode && <div>Mode: <span style={{ color: node.color }}>{node.functionalMode}</span></div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
            <span>Capacity:</span>
            <div style={{ flex: 1, height: '5px', background: 'var(--co-surface)', borderRadius: '3px' }}>
              <div style={{ width: `${node.capacity ?? 100}%`, height: '100%', borderRadius: '3px', background: (node.capacity ?? 100) > 60 ? '#8aba8a' : '#f59e0b' }} />
            </div>
            <span>{node.capacity ?? 100}%</span>
          </div>
          {node.lastSeen && <div>Seen: {relTime(node.lastSeen)}</div>}
          {node.role && <div>Role: <span style={{ color: node.role === 'steward' ? '#f59e0b' : '#60a5fa' }}>{node.role}</span></div>}
        </div>
      )
    }
    if (node.nodeType === 'sprint') {
      return (
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', lineHeight: '1.8' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: node.color, marginBottom: '4px' }}>{node.sprintSerial}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--co-text)', marginBottom: '8px' }}>{node.title || node.name}</div>
          <div>Status: <span style={{ color: node.sprintStatus === 'in_progress' ? '#8aba8a' : 'var(--co-text-muted)' }}>{node.sprintStatus}</span></div>
          <div>Complexity: <span style={{ color: COMPLEXITY_NEON[node.complexity || 'M'] }}>{node.complexity || '—'}</span></div>
          {node.claimerName && <div>Claimer: <span style={{ color: '#8aba8a' }}>{node.claimerName}</span></div>}
          {node.proposerName && <div>Proposer: {node.proposerName}</div>}
          {node.createdAt && <div>Created: {relTime(node.createdAt)}</div>}
          <button onClick={() => navigate(`/coordinate/sprint/${node.sprintUuid || ''}`)}
            style={{ marginTop: '12px', background: `${node.color}22`, border: `1px solid ${node.color}44`, color: node.color, borderRadius: '6px', padding: '8px 16px', fontFamily: 'inherit', fontSize: '0.75rem', cursor: 'pointer', minHeight: '44px' }}>
            Open full sprint
          </button>
        </div>
      )
    }
    if (node.nodeType === 'repo') {
      return (
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', lineHeight: '1.8' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: node.color, marginBottom: '4px' }}>{node.name}</div>
          {node.slug && <div style={{ fontSize: '0.68rem', color: 'var(--co-text-muted)', marginBottom: '8px' }}>github.com/{node.slug}</div>}
          <div>Workshop refs: {node.linkCount ?? 0}</div>
          <a href={`https://github.com/${node.slug}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '12px', background: `${node.color}22`, border: `1px solid ${node.color}44`, color: node.color, borderRadius: '6px', padding: '8px 16px', fontFamily: 'inherit', fontSize: '0.75rem', textDecoration: 'none', minHeight: '44px', lineHeight: '28px' }}>
            Open on GitHub
          </a>
        </div>
      )
    }
    return null
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--co-bg)' }}>
        <Radio className="w-8 h-8 text-co-text-muted animate-pulse" />
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--co-bg)', minHeight: '100vh', color: 'var(--co-text)' }}>
      <style>{pulseStyles}</style>

      {/* Header */}
      <div className="flex items-center gap-3 px-3 sm:px-6 py-3 border-b border-co-border flex-wrap">
        <button onClick={() => navigate('/coordinate/swarm')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs min-h-[36px]"
          style={{ background: 'none', border: '1px solid var(--co-border)', color: 'var(--co-text-muted)', fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer' }}>
          <ArrowLeft size={12} /> Swarm
        </button>

        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: isMobile ? '1.1rem' : '1.4rem', fontWeight: 400, margin: 0 }}>
          Swarm <span style={{ color: 'var(--co-primary)', fontSize: '0.8em' }}>Live</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
          {/* P307: Heatmap toggle */}
          <button onClick={() => setShowHeatmap(h => !h)}
            className="min-h-[36px] px-2 py-1 rounded"
            style={{
              background: showHeatmap ? '#c4956a18' : 'none',
              border: `1px solid ${showHeatmap ? '#c4956a55' : 'var(--co-border)'}`,
              color: showHeatmap ? 'var(--co-primary)' : 'var(--co-text-muted)',
              cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem',
            }}>
            {showHeatmap ? '◉ Heat' : '○ Heat'}
          </button>
          {executingCount > 0 && (
            <div><span style={{ color: '#4ade80' }}>⚡</span> <span style={{ color: 'var(--co-text)' }}>{executingCount}</span> executing</div>
          )}
          <div><span style={{ color: onlineCount > 0 ? '#4ade80' : 'var(--co-text-muted)' }}>●</span> <span style={{ color: 'var(--co-text)' }}>{onlineCount}</span> online</div>
          {!isMobile && <div><span style={{ color: 'var(--co-text)' }}>{activeSprintCount}</span> active</div>}
        </div>
      </div>

      {/* SVG Container */}
      <div ref={containerRef} style={{ width: '100%', position: 'relative', borderBottom: '1px solid var(--co-border)' }}>
        <svg ref={svgRef} style={{ width: '100%', height: dimensions.height, display: 'block', background: 'var(--co-bg)' }} />

        {/* Desktop selected node sidebar */}
        {selectedNode && !isMobile && (
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '300px', maxHeight: `${dimensions.height - 32}px`,
            background: 'rgba(10, 10, 10, 0.95)', border: `1px solid ${selectedNode.color}55`,
            borderRadius: '8px', padding: '16px', overflowY: 'auto',
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 12px ${selectedNode.color}22`,
          }}>
            <button onClick={() => setSelectedNode(null)}
              style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: 'var(--co-text-muted)', cursor: 'pointer', fontSize: '1rem', padding: '4px 8px' }}>
              x
            </button>
            {renderNodeDetail(selectedNode)}
          </div>
        )}
      </div>

      {/* P308: Mobile bottom sheet for node detail */}
      {isMobile && (
        <BottomSheet isOpen={bottomSheetOpen} onClose={() => { setBottomSheetOpen(false); setSelectedNode(null) }}
          title={selectedNode?.name || ''}>
          {selectedNode && renderNodeDetail(selectedNode)}
        </BottomSheet>
      )}

      {/* P308: Mobile swipe-up panel trigger */}
      {isMobile && !bottomSheetOpen && (
        <div className="fixed bottom-16 left-0 right-0 z-30 px-4 pb-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 64px)' }}>
          <button onClick={() => { setSelectedNode(null); setBottomSheetOpen(true) }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl min-h-[44px]"
            style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid var(--co-border)', color: 'var(--co-text-muted)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            <ChevronUp className="w-4 h-4" />
            {activeSprintCount} active sprint{activeSprintCount !== 1 ? 's' : ''} · {protocolEvents.length} events
          </button>
        </div>
      )}

      {/* P308: Mobile bottom sheet for sprint list / protocol */}
      {isMobile && bottomSheetOpen && !selectedNode && (
        <BottomSheet isOpen={true} onClose={() => setBottomSheetOpen(false)} title="Workshop">
          <div className="flex gap-2 mb-3">
            <button onClick={() => setMobileTab('sprints')}
              className="flex-1 py-2 rounded-lg text-xs min-h-[36px]"
              style={{ background: mobileTab === 'sprints' ? '#c4956a22' : 'var(--co-surface)', color: mobileTab === 'sprints' ? 'var(--co-primary)' : 'var(--co-text-muted)', border: `1px solid ${mobileTab === 'sprints' ? '#c4956a44' : 'var(--co-border)'}`, fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer' }}>
              <Zap className="w-3 h-3 inline mr-1" /> Sprints
            </button>
            <button onClick={() => setMobileTab('protocol')}
              className="flex-1 py-2 rounded-lg text-xs min-h-[36px]"
              style={{ background: mobileTab === 'protocol' ? '#c4956a22' : 'var(--co-surface)', color: mobileTab === 'protocol' ? 'var(--co-primary)' : 'var(--co-text-muted)', border: `1px solid ${mobileTab === 'protocol' ? '#c4956a44' : 'var(--co-border)'}`, fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer' }}>
              <Activity className="w-3 h-3 inline mr-1" /> Protocol
            </button>
          </div>
          {mobileTab === 'sprints' && (
            <div className="space-y-2">
              {sprints.filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status)).map(s => (
                <div key={s.id} onClick={() => navigate(`/coordinate/sprint/${s.id}`)}
                  className="p-3 rounded-lg min-h-[44px]"
                  style={{ background: 'var(--co-surface)', border: '1px solid var(--co-border)', cursor: 'pointer' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: COMPLEXITY_NEON[s.complexity || 'M'], fontWeight: 600 }}>{s.sprint_id || '—'}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: s.status === 'in_progress' ? '#8aba8a' : 'var(--co-text-muted)' }}>{s.status}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--co-text)' }}>{s.title}</div>
                </div>
              ))}
              {sprints.filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status)).length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--co-text-muted)', fontSize: '0.75rem', padding: '16px' }}>No active sprints</div>
              )}
            </div>
          )}
          {mobileTab === 'protocol' && (
            <div className="space-y-1">
              {protocolEvents.slice(0, 20).map(evt => (
                <div key={evt.id} className="flex items-center gap-2 py-2" style={{ fontSize: '0.72rem' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: EVENT_PARTICLE_COLORS[evt.event_type] || 'var(--co-text-muted)' }} />
                  <span style={{ color: 'var(--co-text-muted)', minWidth: '80px' }}>{evt.event_type?.replace(/_/g, ' ')}</span>
                  <span style={{ color: evt.agent?.craft_primary ? CRAFT_COLORS[evt.agent.craft_primary] : 'var(--co-primary)' }}>{evt.agent?.name || '—'}</span>
                  <span className="ml-auto" style={{ color: 'var(--co-text-muted)', fontSize: '0.62rem' }}>{timeAgo(evt.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </BottomSheet>
      )}

      {/* Desktop bottom panels */}
      {!isMobile && (
        <div style={{ maxHeight: '320px', overflowY: 'auto', background: 'var(--co-bg)' }}>
          <div className="flex border-b border-co-border">
            {[['sprints', 'Active Sprints', Zap], ['protocol', 'Protocol Stream', Activity]] .map(([key, label, Icon]) => (
              <button key={key} onClick={() => setMobileTab(key)}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs"
                style={{
                  background: mobileTab === key ? '#141414' : 'transparent',
                  borderBottom: mobileTab === key ? '2px solid #c4956a' : '2px solid transparent',
                  color: mobileTab === key ? '#c8c2ba' : 'var(--co-text-muted)',
                  fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer', border: 'none',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
          <div style={{ padding: '8px 0' }}>
            {mobileTab === 'sprints' && sprints.filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status)).map(s => (
              <div key={s.id} onClick={() => navigate(`/coordinate/sprint/${s.id}`)}
                className="px-5 py-3 hover:bg-co-surface transition-colors cursor-pointer border-b border-co-border">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: COMPLEXITY_NEON[s.complexity || 'M'], fontWeight: 600 }}>{s.sprint_id}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: s.status === 'in_progress' ? '#8aba8a' : 'var(--co-text-muted)', textTransform: 'uppercase' }}>{s.status}</span>
                  <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'var(--co-text-muted)' }}>{s.claimer?.name || s.proposer?.name}</span>
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.88rem', color: 'var(--co-text)', fontWeight: 500 }}>{s.title}</div>
              </div>
            ))}
            {mobileTab === 'protocol' && protocolEvents.slice(0, 30).map(evt => (
              <div key={evt.id} className="flex items-center gap-2 px-5 py-2 border-b border-co-border" style={{ fontSize: '0.68rem' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: EVENT_PARTICLE_COLORS[evt.event_type] || 'var(--co-text-muted)' }} />
                <span style={{ color: 'var(--co-text-muted)', minWidth: '120px' }}>{evt.event_type?.replace(/_/g, ' ')}</span>
                <span style={{ color: evt.agent?.craft_primary ? CRAFT_COLORS[evt.agent.craft_primary] : 'var(--co-primary)' }}>{evt.agent?.name || '—'}</span>
                {evt.sprint?.sprint_id && <span style={{ color: 'var(--co-text-muted)', background: 'var(--co-surface)', borderRadius: '3px', padding: '0 4px', fontSize: '0.62rem' }}>{evt.sprint.sprint_id}</span>}
                <span className="ml-auto" style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem' }}>{timeAgo(evt.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
