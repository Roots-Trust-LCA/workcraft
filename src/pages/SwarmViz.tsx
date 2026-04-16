// @ts-nocheck
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import ProtocolActivityStream from '../components/ProtocolActivityStream'
import { useWorkshop } from '../lib/workshop-context'
import { TimelineSlider } from '../components/TimelineSlider'
import { formatDuration, computeSprintDurations } from '../utils/duration'
import {
  ArrowLeft, Activity, MessageSquare, Zap, Bot, Users, Radio,
} from 'lucide-react'
import { logger } from '../lib/logger'
import { timeAgo } from '../lib/format'

// P251: Constants, types, and helpers extracted to swarm-viz/
import {
  CRAFT_SYMBOLS, CRAFT_COLORS, STATUS_COLORS, LAYER_COLORS,
  EVENT_PARTICLE_COLORS, ONLINE_THRESHOLD, INACTIVE_THRESHOLD,
  COMPLEXITY_NEON, REPO_COLORS, GITHUB_REPO_RE, URL_RE,
  extractSprintUrls,
  type GraphNode, type GraphEdge, type ResolvedEdge, type Particle, type SwarmPopup,
} from './swarm-viz/SwarmHelpers'
import SwarmLegend from './swarm-viz/SwarmLegend'
import SwarmControls from './swarm-viz/SwarmControls'

export function SwarmViz() {
const { supabase } = useWorkshop()
  const navigate = useNavigate()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const particleIdRef = useRef(0)
  const animFrameRef = useRef<number>(0)
  const animatingRef = useRef<boolean>(false) // P157: track if animation loop is running
  const nodesRef = useRef<GraphNode[]>([])
  const linksRef = useRef<ResolvedEdge[]>([])
  // orbitsRef removed - agents now positioned statically

  // Data state
  const [presence, setPresence] = useState<any[]>([])
  const [sprints, setSprints] = useState<any[]>([])
  const [completedSprints, setCompletedSprints] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [protocolEvents, setProtocolEvents] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [workshopChannelId, setWorkshopChannelId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  // P118: tick incremented by Realtime handler when cache is invalidated, triggering fetch effects
  const [githubFetchTick, setGithubFetchTick] = useState(0)

  // UI state
  const [bottomTab, setBottomTab] = useState<'sprints' | 'protocol' | 'activity'>('sprints')
  const [dimensions, setDimensions] = useState({ width: 1200, height: 500 })
  const [hoveredSprint, setHoveredSprint] = useState<GraphNode | null>(null)
  const [hoveredRepo, setHoveredRepo] = useState<GraphNode | null>(null)
  const [hoveredAgent, setHoveredAgent] = useState<GraphNode | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [agentTooltipPos, setAgentTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [repoTooltipPos, setRepoTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [showLegends, setShowLegends] = useState(false)
  // P195: Simulation filter — hide non-simulation data when a scenario is running
  const [simFilter, setSimFilter] = useState<'all' | 'sim-only' | 'hide-sim'>('all')
  // P130: Pop-up windows
  const [activePopups, setActivePopups] = useState<SwarmPopup[]>([])
  // P124 context panels decomposed (see docs/decomposition/P124-swarmviz-context-panels.md)

  // P163: Replay mode state
  const [replayMode, setReplayMode] = useState(false)
  const [replayTime, setReplayTime] = useState<Date | null>(null)

  // P130: Pop-up helpers
  const openPopup = useCallback((node: GraphNode) => {
    setActivePopups(prev => {
      // Don't open duplicate for same node
      if (prev.some(p => p.node.id === node.id)) return prev
      const offsetIndex = prev.length
      const newPopup: SwarmPopup = {
        id: `popup-${node.id}-${Date.now()}`,
        nodeType: node.nodeType,
        node,
        offsetIndex,
      }
      // Update URL for sprints (shareability)
      if (node.nodeType === 'sprint' && node.sprintSerial) {
        const url = new URL(window.location.href)
        url.searchParams.set('sprint', node.sprintSerial)
        window.history.pushState({}, '', url.toString())
      }
      return [...prev, newPopup]
    })
  }, [])

  const closePopup = useCallback((popupId: string) => {
    setActivePopups(prev => prev.filter(p => p.id !== popupId))
  }, [])

  // P136: bring popup to front on click
  const zBoostRef = useRef(0)
  const bringToFront = useCallback((popupId: string) => {
    zBoostRef.current += 1
    const boost = zBoostRef.current
    setActivePopups(prev => prev.map(p => p.id === popupId ? { ...p, zBoost: boost } : p))
  }, [])

  // P136: drag handler — returns props to spread on the drag handle element
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null)
  const resizeRef = useRef<{ id: string; startX: number; startY: number; origW: number; origH: number } | null>(null)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragRef.current) {
        const d = dragRef.current
        const dx = e.clientX - d.startX
        const dy = e.clientY - d.startY
        setActivePopups(prev => prev.map(p => p.id === d.id ? { ...p, pos: { x: d.origX + dx, y: d.origY + dy } } : p))
      }
      if (resizeRef.current) {
        const r = resizeRef.current
        const dx = e.clientX - r.startX
        const dy = e.clientY - r.startY
        const w = Math.max(280, r.origW + dx)
        const h = Math.max(200, r.origH + dy)
        setActivePopups(prev => prev.map(p => p.id === r.id ? { ...p, size: { w, h } } : p))
      }
    }
    const onMouseUp = () => {
      dragRef.current = null
      resizeRef.current = null
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // ESC key closes topmost popup
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopups(prev => {
          if (prev.length === 0) return prev
          return prev.slice(0, -1)
        })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ── Data loading ───────────────────────────────────────────────────────────

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
    // P221: query optimization — scope to last 30 days; graph only needs recent completions
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
      .limit(2000)
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
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null
    let chId: string | null = null
    let backoffMs = 2000

    function subscribe() {
      if (destroyed) return
      if (chanRef.current) { supabase.removeChannel(chanRef.current) }
      const ch = supabase.channel('swarm-viz')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_presence' }, () => { loadPresence() })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_requests' }, () => { loadSprints(); loadCompletedSprints() })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'protocol_events' }, (payload) => {
          if (chId) loadProtocolEvents(chId)
          const evt = payload.new as unknown
          if (evt?.agent_id) spawnEventParticle(evt)
          
          // P118 Phase 1 & 3: Invalidate cache + optimistic increment on sprint events
          if (evt?.sprint_id) {
            const sprint = [...sprints, ...completedSprints].find((s: Record<string, unknown>) => s.id === (evt as any).sprint_id)
            if (sprint) {
              const urls = extractSprintUrls(sprint)
              urls.forEach(url => {
                const m = url.match(GITHUB_REPO_RE)
                if (m) {
                  const slug = m[1].replace(/\.git$/, '')

                  // Invalidate contributor cache to trigger refetch
                  fetchedContribSlugsRef.current.delete(slug)
                  setGithubFetchTick(t => t + 1)
                }
              })
            }
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'guild_messages' }, () => { if (chId) loadActivity(chId) })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_links' }, () => { loadLinks() })
        .subscribe((status) => {
          logger.info('[Realtime] swarm-viz status:', status)
          if (status === 'SUBSCRIBED') {
            backoffMs = 2000
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            logger.warn(`[Realtime] swarm-viz dropped, reconnecting in ${backoffMs / 1000}s...`)
            if (!destroyed) reconnectTimer = setTimeout(subscribe, backoffMs)
            backoffMs = Math.min(backoffMs * 2, 60000)
          }
        })
      chanRef.current = ch
    }

    async function init() {
      const { data: ch } = await supabase
        .from('guild_channels').select('id').eq('slug', 'workshop').single()
      chId = ch?.id || null
      setWorkshopChannelId(chId)

      await Promise.all([
        loadPresence(), loadSprints(), loadCompletedSprints(), loadLinks(),
        chId ? loadProtocolEvents(chId) : Promise.resolve(),
        chId ? loadActivity(chId) : Promise.resolve(),
      ])
      setLoading(false)
      subscribe()
    }

    init()
    return () => {
      destroyed = true
      if (reconnectTimer) clearTimeout(reconnectTimer)
      if (chanRef.current) supabase.removeChannel(chanRef.current)
    }
  }, [loadPresence, loadSprints, loadCompletedSprints, loadLinks, loadProtocolEvents, loadActivity])

  // ── Fetch repo commit counts + per-contributor data from GitHub ─────────────

  // P118: TTL-based fetch guards (5min cache, invalidated by protocol events)
  const fetchedContribSlugsRef = useRef<Map<string, number>>(new Map())
  const [contributorCommits, setContributorCommits] = useState<Record<string, { login: string; avatar: string; contributions: number; repos: string[] }>>({})
  
  const FETCH_TTL_MS = 5 * 60 * 1000 // 5 minutes
  
  // P118 Phase 2: Live Data Matrix Audit
  // ✓ agent_presence: Realtime subscription (line ~276)
  // ✓ coordination_requests: Realtime subscription (line ~277)
  // ✓ protocol_events: Realtime subscription + invalidation (line ~278)
  // ✓ guild_messages: Realtime subscription (line ~286)
  // ✓ coordination_links: Realtime subscription (line ~287)
  // ✓ GitHub repo commits: 5min TTL + protocol event invalidation (Phase 1)
  // ✓ GitHub contributors: 5min TTL + protocol event invalidation (Phase 1)
  // All data sources now have either Realtime or TTL refresh strategy.

  // ── Compute graph data ─────────────────────────────────────────────────────

  const now = Date.now()

  // P163: Time-filtered data for replay mode
  const effectiveTime = replayMode && replayTime ? replayTime.getTime() : now
  // P195: Simulation filter helpers
  const isSimParticipant = (p: Record<string, unknown>) =>
    typeof p?.participants?.name === 'string' && (p as any).participants?.name.startsWith('[')
  const isSimSprint = (s: Record<string, unknown>) =>
    Array.isArray(s?.context_refs) && s.context_refs.some((r: unknown) => r?.type === 'simulation')

  const filteredPresence = useMemo(() => {
    let list = presence
    // P195: sim filter
    if (simFilter === 'sim-only') list = list.filter(isSimParticipant)
    else if (simFilter === 'hide-sim') list = list.filter(p => !isSimParticipant(p))
    if (!replayMode || !replayTime) return list
    // Filter agents visible at replay time (last_seen <= replayTime && within 3h)
    return list.filter((p: Record<string, unknown>) => {
      if (!p.last_seen) return false
      const lastSeenMs = new Date(p.last_seen).getTime()
      return lastSeenMs <= effectiveTime && (effectiveTime - lastSeenMs) < INACTIVE_THRESHOLD
    })
  }, [replayMode, replayTime, presence, effectiveTime, simFilter])

  const filteredSprints = useMemo(() => {
    let list = sprints
    if (simFilter === 'sim-only') list = list.filter(isSimSprint)
    else if (simFilter === 'hide-sim') list = list.filter(s => !isSimSprint(s))
    if (!replayMode || !replayTime) return list
    // Filter sprints that existed at replay time (created_at <= replayTime && not yet completed)
    return list.filter((s: Record<string, unknown>) => {
      const createdMs = new Date(s.created_at).getTime()
      const completedMs = s.completed_at ? new Date(s.completed_at).getTime() : Infinity
      return createdMs <= effectiveTime && effectiveTime <= completedMs
    })
  }, [replayMode, replayTime, sprints, effectiveTime, simFilter])

  const filteredCompletedSprints = useMemo(() => {
    if (!replayMode || !replayTime) return completedSprints
    // Filter completed sprints that completed by replay time
    return completedSprints.filter((s: Record<string, unknown>) => {
      if (!s.completed_at) return false
      return new Date(s.completed_at).getTime() <= effectiveTime
    })
  }, [replayMode, replayTime, completedSprints, effectiveTime])

  // Extract repo entities from all sprint URLs + coordination links
  const repoEntities = useMemo(() => {
    const repoMap = new Map<string, { slug: string; count: number; lastSeen: string; contributors: Set<string> }>()
    const allSprints = [...filteredSprints, ...filteredCompletedSprints]

    // From coordination_links
    links.forEach((l: Record<string, unknown>) => {
      const m = l.url?.match(GITHUB_REPO_RE)
      if (!m) return
      const slug = m[1].replace(/\.git$/, '')
      const existing = repoMap.get(slug)
      if (existing) { existing.count++ }
      else { repoMap.set(slug, { slug, count: 1, lastSeen: l.created_at || '', contributors: new Set() }) }
    })

    // From sprints
    allSprints.forEach((s: Record<string, unknown>) => {
      const urls = extractSprintUrls(s)
      const contributor = s.claimed_by || s.proposer_id
      urls.forEach(url => {
        const m = url.match(GITHUB_REPO_RE)
        if (!m) return
        const slug = m[1].replace(/\.git$/, '')
        const ts = s.completed_at || s.created_at || ''
        const existing = repoMap.get(slug)
        if (existing) {
          existing.count++
          if (ts > existing.lastSeen) existing.lastSeen = ts
          if (contributor) existing.contributors.add(contributor)
        } else {
          const contribs = new Set<string>()
          if (contributor) contribs.add(contributor)
          repoMap.set(slug, { slug, count: 1, lastSeen: ts, contributors: contribs })
        }
      })
    })

    const THREE_HOURS_AGO = new Date(effectiveTime - 3 * 60 * 60 * 1000).toISOString()
    return Array.from(repoMap.values())
      .filter(r => r.count >= 2 && r.lastSeen >= THREE_HOURS_AGO) // Only show repos active in last 3h
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) // Cap at 8 repos to avoid clutter
  }, [filteredSprints, filteredCompletedSprints, links, effectiveTime])

  // P118 Phase 1: Fetch per-contributor commit counts with TTL-based cache
  useEffect(() => {
    const now = Date.now()
    repoEntities.forEach(async (repo) => {
      const lastFetched = fetchedContribSlugsRef.current.get(repo.slug)
      if (lastFetched && (now - lastFetched) < FETCH_TTL_MS) return // Skip if cached and fresh
      
      fetchedContribSlugsRef.current.set(repo.slug, now)
      try {
        const res = await fetch(`https://api.github.com/repos/${repo.slug}/contributors?per_page=30`, {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })
        if (!res.ok) return
        const contribs: unknown[] = await res.json()
        if (!Array.isArray(contribs)) return
        setContributorCommits(prev => {
          const next = { ...prev }
          contribs.forEach((c: Record<string, unknown>) => {
            const login = c.login as string
            if (!login) return
            const existing = next[login]
            if (existing) {
              existing.contributions += c.contributions || 0
              if (!existing.repos.includes(repo.slug)) existing.repos.push(repo.slug)
            } else {
              next[login] = {
                login,
                avatar: c.avatar_url || '',
                contributions: c.contributions || 0,
                repos: [repo.slug],
              }
            }
          })
          return next
        })
      } catch { /* ignore */ }
    })
  }, [repoEntities, githubFetchTick])

  // Sorted leaderboard data
  const commitLeaderboard = useMemo(() => {
    return Object.values(contributorCommits)
      .filter(c => c.contributions > 0)
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, 12)
  }, [contributorCommits])

  // Agent nodes — filter out inactive >3h
  const agentNodes: GraphNode[] = useMemo(() => {
    return filteredPresence
      .filter((p: Record<string, unknown>) => {
        if (!p.last_seen) return false
        return (effectiveTime - new Date(p.last_seen).getTime()) < INACTIVE_THRESHOLD
      })
      .map((p: Record<string, unknown>) => {
        const msSinceSeen = p.last_seen ? effectiveTime - new Date(p.last_seen).getTime() : Infinity
        const isOnline = msSinceSeen < ONLINE_THRESHOLD
        const craft = p.participants?.craft_primary
        return {
          id: p.agent_id,
          nodeType: 'agent' as const,
          name: p.participants?.name || p.agent_id?.slice(0, 8),
          x: 0, y: 0,
          craftPrimary: craft,
          craftSecondary: p.participants?.craft_secondary,
          status: isOnline ? (p.status || 'active') : 'dormant',
          capacity: p.capacity ?? 100,
          functionalMode: p.functional_mode,
          color: craft ? (CRAFT_COLORS[craft] || 'var(--co-primary)') : 'var(--co-primary)',
          lastSeen: p.last_seen,
          isOnline,
          role: p.participants?.role,
        }
      })
  }, [filteredPresence, effectiveTime])

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

  // Sprint nodes — active + testing sprints become diamond nodes
  const sprintNodes: GraphNode[] = useMemo(() => {
    return [...filteredSprints, ...filteredCompletedSprints.filter((s: Record<string, unknown>) => s.status === 'testing')]
      .filter((s: Record<string, unknown>) => ['in_progress', 'testing', 'proposed'].includes((s as string).status))
      .map((s: Record<string, unknown>) => {
        const layers: string[] = Array.isArray(s.layers) ? s.layers : []
        const primaryLayer = layers[0] ? parseInt(layers[0]) : null
        const lc = primaryLayer ? LAYER_COLORS[primaryLayer] : null
        return {
          id: `sprint-${s.id}`,
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
          contextRefs: s.context_refs || [],
        }
      })
  }, [sprints, completedSprints])

  // All nodes combined
  const allGraphNodes = useMemo(() => [...agentNodes, ...repoNodes, ...sprintNodes], [agentNodes, repoNodes, sprintNodes])

  // Edges: sprint claim/propose edges (agent → sprint node) + repo contribution edges (agent → repo)
  const allEdges: GraphEdge[] = useMemo(() => {
    const edges: GraphEdge[] = []
    const agentIds = new Set(agentNodes.map(n => n.id))
    const sprintNodeIds = new Set(sprintNodes.map(n => n.id))

    // Sprint edges: agents → sprint nodes
    sprintNodes.forEach(sn => {
      // Claimer → sprint (solid)
      if (sn.claimedBy && agentIds.has(sn.claimedBy)) {
        edges.push({
          id: `claim-${sn.id}`,
          source: sn.claimedBy,
          target: sn.id,
          edgeType: 'sprint-claim',
          sprintId: sn.sprintSerial || sn.id,
          layers: sn.sprintLayers,
          status: sn.sprintStatus,
        })
      }
      // Proposer → sprint (dashed, if different from claimer)
      if (sn.proposerId && agentIds.has(sn.proposerId) && sn.proposerId !== sn.claimedBy) {
        edges.push({
          id: `propose-${sn.id}`,
          source: sn.proposerId,
          target: sn.id,
          edgeType: 'sprint-propose',
          sprintId: sn.sprintSerial || sn.id,
          layers: sn.sprintLayers,
          status: sn.sprintStatus,
        })
      }
    })

    // Sprint → Repo edges: active/testing sprints link to repos they reference
    const repoNodeIds = new Set(repoEntities.map(r => `repo-${r.slug}`))
    sprintNodes.forEach(sn => {
      // Extract all GitHub repo slugs from the sprint's reference URLs / description
      const rawUrls: string[] = []
      if ((sn as unknown).referenceUrls) rawUrls.push(...(sn as unknown).referenceUrls)
      if ((sn as unknown).description) rawUrls.push((sn as unknown).description)
      rawUrls.forEach(text => {
        const matches = (text || '').matchAll(/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/g)
        for (const m of matches) {
          const slug = m[1].replace(/\.git$/, '')
          const repoNodeId = `repo-${slug}`
          if (repoNodeIds.has(repoNodeId)) {
            edges.push({
              id: `sprint-repo-${sn.id}-${slug}`,
              source: sn.id,
              target: repoNodeId,
              edgeType: 'sprint-repo',
              layers: sn.sprintLayers,
              status: sn.sprintStatus,
            })
          }
        }
      })
    })

    // Repo contribution edges: connect agents to repos they've contributed to
    repoEntities.forEach((repo) => {
      const repoNodeId = `repo-${repo.slug}`
      repo.contributors.forEach(agentId => {
        if (!agentIds.has(agentId)) return
        edges.push({
          id: `contrib-${agentId}-${repo.slug}`,
          source: agentId,
          target: repoNodeId,
          edgeType: 'repo-contribution',
        })
      })
    })

    // P162: Co-authorship edges — agent↔agent when they co-author sprints (proposer ≠ claimer)
    const coAuthorCounts = new Map<string, number>()
    sprintNodes.forEach(sn => {
      if (sn.proposerId && sn.claimedBy && sn.proposerId !== sn.claimedBy
          && agentIds.has(sn.proposerId) && agentIds.has(sn.claimedBy)) {
        // Normalize key so A-B and B-A are the same edge
        const pair = [sn.proposerId, sn.claimedBy].sort().join('::')
        coAuthorCounts.set(pair, (coAuthorCounts.get(pair) || 0) + 1)
      }
    })
    // Also count from completed sprints (loaded separately)
    completedSprints.forEach((s: Record<string, unknown>) => {
      if (s.proposer_id && s.claimed_by && s.proposer_id !== s.claimed_by
          && agentIds.has(s.proposer_id) && agentIds.has(s.claimed_by)) {
        const pair = [s.proposer_id, s.claimed_by].sort().join('::')
        coAuthorCounts.set(pair, (coAuthorCounts.get(pair) || 0) + 1)
      }
    })
    coAuthorCounts.forEach((count, pair) => {
      const [a, b] = pair.split('::')
      edges.push({
        id: `coauthor-${a}-${b}`,
        source: a,
        target: b,
        edgeType: 'co-authorship',
        weight: count,
      })
    })

    return edges
  }, [sprintNodes, repoEntities, agentNodes, completedSprints])

  // ── Particle spawning ─────────────────────────────────────────────────────

  const spawnEventParticle = useCallback((evt: unknown) => {
    const nodes = nodesRef.current
    const sourceNode = nodes.find(n => n.id === (evt as any).agent_id)
    if (!sourceNode) return

    const color = EVENT_PARTICLE_COLORS[(evt as any).event_type] || EVENT_PARTICLE_COLORS.default
    const speed = (evt as any).event_type === 'sprint_completed' ? 0.025 : 0.012 + Math.random() * 0.018
    const targets = nodes.filter(n => n.id !== (evt as any).agent_id)
    if (targets.length === 0) return

    if (evt.event_type === 'sprint_completed' || (evt as any).event_type === 'sprint_testing_approved') {
      targets.forEach(t => {
        particlesRef.current.push({
          id: ++particleIdRef.current, sourceId: (evt as any).agent_id, targetId: t.id,
          progress: 0, speed: speed + Math.random() * 0.01, color, eventType: (evt as any).event_type,
        })
      })
    } else {
      const target = targets[Math.floor(Math.random() * targets.length)]
      particlesRef.current.push({
        id: ++particleIdRef.current, sourceId: (evt as any).agent_id, targetId: target.id,
        progress: 0, speed, color, eventType: (evt as any).event_type,
      })
    }
  }, [])

  // ── Resize observer ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect
        // P119b: near-square aspect so rings can grow to 2× — height tracks width up to 1200px cap
        // P135: mobile — reduce minimum height so SVG doesn't consume entire viewport on portrait devices
        const isMobile = width < 500
        const minH = isMobile ? Math.min(width * 0.9, 420) : 600
        const height = Math.max(minH, Math.min(1200, width * 0.85))
        setDimensions({ width, height })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── Orbital Visualization (repos anchored, agents orbit) ────────────────

  useEffect(() => {
    if (!svgRef.current || loading) return
    console.count('P157: main SVG render') // P157: measurement — this should increment ONLY on data/dimension changes, NOT on hover

    const svg = d3.select(svgRef.current)
    const { width, height } = dimensions
    const cx = width / 2, cy = height / 2

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    // ── P144: Three EXCLUSIVE concentric zones — geometrically impossible overlap ──
    // Zones computed inside-out from actual node sizes. If total extent exceeds
    // available radius, ALL positions scale proportionally — zones can compress
    // but never cross each other's boundaries.
    //
    // Previous bugs (P143): repo spacing had Math.max(50,...) floor that pushed
    // repos beyond budget; agent ring clamped to dim*0.44 which pushed agents
    // BACK INTO sprint zone. Both fixed by proportional scaling.

    const repoData = allGraphNodes.filter(n => n.nodeType === 'repo')
    const agentData = allGraphNodes.filter(n => n.nodeType === 'agent')
    const sprintData = allGraphNodes.filter(n => n.nodeType === 'sprint')

    const dim = Math.min(width, height)
    const totalR = dim * 0.44 // max distance from center for any node center

    // Hard visual extents — how far each node type extends from its center
    const MAX_REPO_HALF = 45   // half of max 70px square + contributor dots
    const MAX_SPRINT_HALF = 44 // max diamond (XL=40) + stroke
    const MAX_AGENT_R = 35     // circle (~30) + halo (8); labels extend outward only
    const GAP = 20             // dead space between zone edges

    // ── REPO ZONE: center grid ──
    const sortedRepos = [...repoData].sort((a, b) => (b.linkCount || 0) - (a.linkCount || 0))
    const maxRefCount = Math.max(1, ...sortedRepos.map(r => r.linkCount || 1))
    const repoCount = sortedRepos.length
    const cols = repoCount > 0 ? Math.ceil(Math.sqrt(repoCount)) : 1

    // P167: Grid spacing must exceed node visual extent to prevent overlap.
    // Minimum = 2 * MAX_REPO_HALF + small gap so nodes sit close but never overlap.
    const MIN_REPO_SPACING = MAX_REPO_HALF * 2 + 8 // ~98px: nodes touch edges with 8px gap
    const maxGridHalf = Math.ceil(cols / 2) || 1
    const repoBudget = Math.max(MIN_REPO_SPACING * maxGridHalf + MAX_REPO_HALF, totalR * 0.28)
    const repoSpacing = repoCount > 1
      ? Math.min(120, Math.max(MIN_REPO_SPACING, Math.floor((repoBudget - MAX_REPO_HALF) / maxGridHalf)))
      : 0

    // Place repos in center grid, track actual extent
    let repoZoneOuter = 0
    if (repoCount > 0) {
      const half = Math.floor(cols / 2) + 1
      const gridPositions: { gx: number; gy: number; dist: number }[] = []
      for (let gy = -half; gy <= half; gy++) {
        for (let gx = -half; gx <= half; gx++) {
          gridPositions.push({ gx, gy, dist: gx * gx + gy * gy })
        }
      }
      gridPositions.sort((a, b) => a.dist - b.dist)
      sortedRepos.forEach((repo, i) => {
        const pos = gridPositions[i]
        repo.x = cx + pos.gx * repoSpacing
        repo.y = cy + pos.gy * repoSpacing
        const distFromCenter = Math.sqrt((pos.gx * repoSpacing) ** 2 + (pos.gy * repoSpacing) ** 2)
        repoZoneOuter = Math.max(repoZoneOuter, distFromCenter + MAX_REPO_HALF)
      })
    } else {
      repoZoneOuter = 20
    }

    // ── Compute ideal ring positions inside-out, then scale if needed ──
    const idealSprintR = repoZoneOuter + GAP + MAX_SPRINT_HALF
    const idealSprintZoneOuter = idealSprintR + MAX_SPRINT_HALF
    const idealAgentR = idealSprintZoneOuter + GAP + MAX_AGENT_R

    // If ideal layout exceeds totalR, scale everything proportionally
    const zoneScale = idealAgentR > totalR ? totalR / idealAgentR : 1.0

    const sprintR = idealSprintR * zoneScale
    const sprintZoneInner = (repoZoneOuter + GAP) * zoneScale
    const sprintZoneOuter = idealSprintZoneOuter * zoneScale
    const agentZoneInner = (idealSprintZoneOuter + GAP) * zoneScale
    const agentR = idealAgentR * zoneScale

    // Scale repo positions if zones were compressed
    if (zoneScale < 1) {
      sortedRepos.forEach(repo => {
        repo.x = cx + (repo.x - cx) * zoneScale
        repo.y = cy + (repo.y - cy) * zoneScale
      })
      repoZoneOuter *= zoneScale
    }

    // ── SPRINT ZONE: ring ──
    sprintData.forEach((sn, i) => {
      const angle = (2 * Math.PI * i) / Math.max(sprintData.length, 1) - Math.PI / 2
      sn.x = cx + sprintR * Math.cos(angle)
      sn.y = cy + sprintR * Math.sin(angle)
    })

    // Build node/link refs
    const nodeById = new Map<string, GraphNode>()
    const allNodes = [...repoData, ...sprintData, ...agentData]
    allNodes.forEach(n => nodeById.set(n.id, n))
    nodesRef.current = allNodes

    const newLinks: ResolvedEdge[] = allEdges.filter(e => {
      const srcId = typeof e.source === 'string' ? e.source : e.source.id
      const tgtId = typeof e.target === 'string' ? e.target : e.target.id
      return nodeById.has(srcId) && nodeById.has(tgtId)
    }).map(e => ({
      ...e,
      source: nodeById.get(typeof e.source === 'string' ? e.source : e.source.id)!,
      target: nodeById.get(typeof e.target === 'string' ? e.target : e.target.id)!,
    }))
    linksRef.current = newLinks

    // ── AGENT ZONE: outermost ring ──
    const totalAgents = agentData.length
    agentData.forEach((agent, idx) => {
      const angle = (2 * Math.PI * idx) / Math.max(totalAgents, 1) - Math.PI / 2
      agent.x = cx + agentR * Math.cos(angle)
      agent.y = cy + agentR * Math.sin(angle)
    })

    // ── SVG setup ──
    let defs = svg.select<SVGDefsElement>('defs')
    if (defs.empty()) {
      defs = svg.append('defs')
      const glow = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      glow.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur')
      const merge = glow.append('feMerge')
      merge.append('feMergeNode').attr('in', 'blur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')
    }

    let g = svg.select<SVGGElement>('g.main-group')
    if (g.empty()) {
      g = svg.append('g').attr('class', 'main-group')
      svg.call(
        d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.3, 3])
          .on('zoom', (event) => { g.attr('transform', event.transform) })
      )
    }

    // orbitPathG removed - no longer rendering orbit rings
    let linkG = g.select<SVGGElement>('g.links')
    if (linkG.empty()) linkG = g.append('g').attr('class', 'links')
    let particleG = g.select<SVGGElement>('g.particles')
    if (particleG.empty()) particleG = g.append('g').attr('class', 'particles')
    let nodeG = g.select<SVGGElement>('g.nodes')
    if (nodeG.empty()) nodeG = g.append('g').attr('class', 'nodes')

    // ── Render function (called each animation frame) ──
    function render() {
      const allN = nodesRef.current
      const lnks = linksRef.current

      // ── P143: Zone boundary rings (subtle visual guides) ──
      const zoneRingData = [
        { r: repoZoneOuter, label: '' },
        { r: sprintZoneInner, label: '' },
        { r: sprintZoneOuter, label: '' },
        { r: agentZoneInner, label: '' },
      ]
      const zoneRingSel = linkG.selectAll<SVGCircleElement, typeof zoneRingData[0]>('circle.zone-ring')
        .data(zoneRingData, (_d, i) => `zone-${i}`)
      zoneRingSel.exit().remove()
      const zoneRingEnter = zoneRingSel.enter().append('circle').attr('class', 'zone-ring')
      zoneRingSel.merge(zoneRingEnter)
        .attr('cx', cx).attr('cy', cy)
        .attr('r', d => d.r)
        .attr('fill', 'none')
        .attr('stroke', 'var(--co-surface)')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '4,6')

      // ── Links ──
      const linkSel = linkG.selectAll<SVGLineElement, ResolvedEdge>('line')
        .data(lnks, ( d: Record<string, unknown>) => d.id)
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
          const layer = d.layers?.[0]
          return layer ? (LAYER_COLORS[layer] || 'var(--co-text-muted)') : 'var(--co-text-muted)'
        })
        .attr('stroke-width', d => {
          if (d.edgeType === 'co-authorship') return Math.min(1.5 + (d.weight || 1) * 0.3, 5)
          if (d.edgeType === 'sprint-claim') return 2.0
          if (d.edgeType === 'sprint-propose') return 1.2
          if (d.edgeType === 'repo-contribution') return 1.2
          if (d.edgeType === 'sprint-repo') return 1.5
          return 1.8
        })
        .attr('stroke-opacity', d => {
          if (d.edgeType === 'co-authorship') return 0.5
          if (d.edgeType === 'sprint-claim') return 0.6
          if (d.edgeType === 'sprint-propose') return 0.3
          if (d.edgeType === 'repo-contribution') return 0.2
          if (d.edgeType === 'sprint-repo') return 0.4
          return 0.45
        })
        .attr('stroke-dasharray', d => {
          if (d.edgeType === 'co-authorship') return 'none'
          if (d.edgeType === 'sprint-propose') return '5,4'
          if (d.edgeType === 'repo-contribution') return '4,3'
          if (d.edgeType === 'sprint-repo') return '3,3'
          return 'none'
        })

      // ── Edge labels (for sprint edges only when hovered) ──
      const sprintEdges = lnks.filter(d => d.edgeType === 'sprint-claim' || d.edgeType === 'sprint-propose')
      const labelSel = linkG.selectAll<SVGTextElement, ResolvedEdge>('text.edge-label')
        .data(hoveredSprint ? sprintEdges.filter(d => d.target.id === hoveredSprint.id) : [], d => d.id)
      labelSel.exit().remove()
      const labelEnter = labelSel.enter().append('text').attr('class', 'edge-label')
        .attr('font-family', "'IBM Plex Mono', monospace")
        .attr('font-size', '7px')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
      labelSel.merge(labelEnter)
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2 - 2)
        .attr('fill', d => d.edgeType === 'sprint-claim' ? d.target.color : 'var(--co-text-muted)')
        .text(d => d.edgeType === 'sprint-claim' ? 'claiming' : 'proposed')

      // P162: Co-authorship edge labels (always visible)
      const coAuthorEdges = lnks.filter(d => d.edgeType === 'co-authorship')
      const coLabelSel = linkG.selectAll<SVGTextElement, ResolvedEdge>('text.coauthor-label')
        .data(coAuthorEdges, d => d.id)
      coLabelSel.exit().remove()
      const coLabelEnter = coLabelSel.enter().append('text').attr('class', 'coauthor-label')
        .attr('font-family', "'IBM Plex Mono', monospace")
        .attr('font-size', '8px')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
      coLabelSel.merge(coLabelEnter)
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2 - 4)
        .attr('fill', 'var(--co-primary)')
        .attr('fill-opacity', 0.7)
        .text(d => `${d.weight} sprint${(d.weight || 1) > 1 ? 's' : ''}`)

      // ── Agent nodes ──
      const agentN = allN.filter(n => n.nodeType === 'agent')
      const r = (d: GraphNode) => 18 + (d.capacity || 80) / 7

      const aSel = nodeG.selectAll<SVGGElement, GraphNode>('g.agent-node')
        .data(agentN, d => d.id)
      aSel.exit().remove()

      const aEnter = aSel.enter().append('g').attr('class', 'agent-node')
      aEnter.append('circle').attr('class', 'halo')
      aEnter.append('circle').attr('class', 'core')
      aEnter.append('text').attr('class', 'initials')
        .attr('dy', 4).attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', '11px')
        .attr('font-weight', '500').attr('fill', '#0a0a0a').style('pointer-events', 'none')
      aEnter.append('text').attr('class', 'name-label').attr('text-anchor', 'middle')
        .attr('font-family', "'Cormorant', serif").attr('font-size', '13px')
        .attr('fill', '#c8c2ba').style('pointer-events', 'none')
      aEnter.append('text').attr('class', 'craft-label').attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', '9px')
        .attr('fill', 'var(--co-text-muted)').style('pointer-events', 'none')

      const allA = aSel.merge(aEnter)
      allA.attr('transform', d => `translate(${d.x},${d.y})`).style('cursor', 'pointer')
        .on('mouseenter', function(event, d) {
          setHoveredAgent(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setAgentTooltipPos({ x: mx, y: my })
        })
        .on('mouseleave', () => {
          setHoveredAgent(null)
          setAgentTooltipPos(null)
        })
        .on('touchstart', function(event, d) { // P156: touch support for mobile
          event.preventDefault()
          setHoveredAgent(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setAgentTooltipPos({ x: mx, y: my })
        })
        .on('touchend', () => { // P156: touch support for mobile
          setHoveredAgent(null)
          setAgentTooltipPos(null)
        })
        .on('click', (event, d) => {
          event.stopPropagation()
          openPopup(d)
        })

      allA.select('.halo')
        .attr('r', d => r(d) + 8).attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', d => d.role === 'steward' ? 3 : d.role === 'member' ? 2 : 1)
        .attr('stroke-opacity', d => d.isOnline ? 0.35 : 0.1)

      allA.select('.core')
        .attr('r', r)
        .attr('fill', d => STATUS_COLORS[d.status || 'idle'] || STATUS_COLORS.idle)
        .attr('stroke', d => d.color).attr('stroke-width', 1.5)
        .attr('opacity', d => d.isOnline ? 0.9 : 0.3)
        .attr('filter', d => (d.status === 'executing' || d.functionalMode) ? 'url(#glow)' : 'none')

      allA.select('.initials').text(d => d.name.slice(0, 2).toUpperCase())
        .attr('opacity', d => d.isOnline ? 1 : 0.3)
      // P120b: radial label placement — labels point away from center at each node's angle
      // This prevents overlap between agent labels and sprint/repo nodes on inner rings
      const agentLabelAngle = (d: GraphNode) => Math.atan2(d.y - cy, d.x - cx)
      const agentLabelAnchor = (d: GraphNode) => {
        const cos = Math.cos(agentLabelAngle(d))
        return Math.abs(cos) > 0.45 ? (cos > 0 ? 'start' : 'end') : 'middle'
      }

      allA.select('.name-label')
        .attr('x', d => (r(d) + 14) * Math.cos(agentLabelAngle(d)))
        .attr('y', d => (r(d) + 14) * Math.sin(agentLabelAngle(d)))
        .attr('dy', '0.35em')
        .attr('text-anchor', d => agentLabelAnchor(d))
        .text(d => d.name)
        .attr('fill', d => d.isOnline ? '#c8c2ba' : 'var(--co-border)')
      allA.select('.craft-label')
        .attr('x', d => (r(d) + 28) * Math.cos(agentLabelAngle(d)))
        .attr('y', d => (r(d) + 28) * Math.sin(agentLabelAngle(d)))
        .attr('dy', '0.35em')
        .attr('text-anchor', d => agentLabelAnchor(d))
        .text(d => {
          const parts: string[] = []
          if (d.craftPrimary) parts.push(`${CRAFT_SYMBOLS[d.craftPrimary] || ''}${d.craftPrimary}`)
          if (d.craftSecondary) parts.push(`${CRAFT_SYMBOLS[d.craftSecondary] || ''}${d.craftSecondary}`)
          return parts.join(' × ')
        })
        .attr('fill', d => d.isOnline ? 'var(--co-text-muted)' : 'var(--co-text-muted)')

      // ── P142: Repo nodes (squares — sized by ref count) ──
      const repoN = allN.filter(n => n.nodeType === 'repo')
      // Square size scales with ref count: 30px (min) to 70px (max refs)
      const repoSize = (d: GraphNode) => {
        const refs = d.linkCount || 1
        return 30 + (refs / maxRefCount) * 40
      }

      const rSel = nodeG.selectAll<SVGGElement, GraphNode>('g.repo-node')
        .data(repoN, d => d.id)
      rSel.exit().remove()

      const rEnter = rSel.enter().append('g').attr('class', 'repo-node')
      rEnter.append('rect').attr('class', 'repo-bg repo-square') // P157: added repo-square class for hover layer
        .attr('rx', 4).attr('ry', 4)
      rEnter.append('text').attr('class', 'repo-name repo-label') // P157: added repo-label class for hover layer
        .attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-weight', '500')
        .style('pointer-events', 'none')
      // Workshop reference count label
      rEnter.append('text').attr('class', 'repo-commits')
        .attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace")
        .style('pointer-events', 'none')
      rEnter.append('g').attr('class', 'repo-contribs')

      const allR = rSel.merge(rEnter)
      allR.attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .on('mouseenter', function(event, d) {
          setHoveredRepo(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setRepoTooltipPos({ x: mx, y: my })
        })
        .on('mouseleave', () => {
          setHoveredRepo(null)
          setRepoTooltipPos(null)
        })
        .on('touchstart', function(event, d) { // P156: touch support for mobile
          event.preventDefault()
          setHoveredRepo(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setRepoTooltipPos({ x: mx, y: my })
        })
        .on('touchend', () => { // P156: touch support for mobile
          setHoveredRepo(null)
          setRepoTooltipPos(null)
        })
        .on('click', (event, d) => {
          event.stopPropagation()
          openPopup(d)
        })

      allR.select('.repo-bg')
        .attr('x', d => -repoSize(d) / 2)
        .attr('y', d => -repoSize(d) / 2)
        .attr('width', d => repoSize(d))
        .attr('height', d => repoSize(d))
        .attr('fill', '#111').attr('stroke', d => d.color)
        .attr('stroke-width', d => hoveredRepo?.id === d.id ? 2 : 1)
        .attr('stroke-opacity', d => hoveredRepo?.id === d.id ? 0.9 : 0.5)

      allR.select('.repo-name')
        .attr('y', d => -repoSize(d) / 2 - 6)
        .attr('font-size', d => repoSize(d) > 50 ? '9px' : '8px')
        .attr('fill', d => d.color)
        .text(d => d.name.length > 12 ? d.name.slice(0, 10) + '..' : d.name)
        .attr('opacity', d => hoveredRepo?.id === d.id ? 1 : 0.6)
      allR.select('.repo-commits')
        .attr('y', 3)
        .attr('font-size', '8px')
        .attr('fill', '#777')
        .text(d => {
          const workshopRefs = d.linkCount || 0
          return `${workshopRefs}`
        })

      allR.each(function (d) {
        const cg = d3.select(this).select('.repo-contribs')
        const contribs = d.contributors || []
        const s = repoSize(d)
        const dots = cg.selectAll<SVGCircleElement, string>('circle').data(contribs)
        dots.exit().remove()
        dots.enter().append('circle').merge(dots)
          .attr('cx', (_c, i) => -((contribs.length - 1) * 6) / 2 + i * 6)
          .attr('cy', s / 2 + 8)
          .attr('r', 2.5)
          .attr('fill', c => {
            const agent = agentN.find(a => a.id === c)
            return agent ? agent.color : 'var(--co-text-muted)'
          })
      })

      // ── Sprint nodes (diamonds) ──
      const sprintN = allN.filter(n => n.nodeType === 'sprint')
      const COMPLEXITY_SIZE: Record<string, number> = { XS: 16, S: 20, M: 26, L: 32, XL: 40 }
      const sprintSize = (d: GraphNode) => COMPLEXITY_SIZE[d.complexity || 'M'] ?? 26

      const snSel = nodeG.selectAll<SVGGElement, GraphNode>('g.sprint-node')
        .data(sprintN, d => d.id)
      snSel.exit().remove()

      const snEnter = snSel.enter().append('g').attr('class', 'sprint-node')
      snEnter.append('polygon').attr('class', 'sprint-diamond') // P157: class for hover layer
      snEnter.append('text').attr('class', 'sprint-label sprint-title-hover') // P157: added sprint-title-hover class
        .attr('text-anchor', 'middle').attr('dy', 4)
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', '8px')
        .attr('font-weight', '600').style('pointer-events', 'none')
      snEnter.append('text').attr('class', 'sprint-status sprint-status-hover') // P157: added sprint-status-hover class
        .attr('text-anchor', 'middle')
        .attr('font-family', "'IBM Plex Mono', monospace").attr('font-size', '7px')
        .style('pointer-events', 'none')

      const allSN = snSel.merge(snEnter)
      allSN.attr('transform', d => `translate(${d.x},${d.y})`).style('cursor', 'pointer')
        .on('mouseenter', function(event, d) {
          setHoveredSprint(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setTooltipPos({ x: mx, y: my })
        })
        .on('mouseleave', () => {
          setHoveredSprint(null)
          setTooltipPos(null)
        })
        .on('touchstart', function(event, d) { // P156: touch support for mobile
          event.preventDefault()
          setHoveredSprint(d)
          const [mx, my] = d3.pointer(event, svg.node())
          setTooltipPos({ x: mx, y: my })
        })
        .on('touchend', () => { // P156: touch support for mobile
          setHoveredSprint(null)
          setTooltipPos(null)
        })
        .on('click', (event, d) => {
          event.stopPropagation()
          openPopup(d)
        })

      allSN.select('.sprint-diamond').each(function(d) {
        const s = sprintSize(d)
        const isActive = d.sprintStatus === 'in_progress'
        const isTesting = d.sprintStatus === 'testing'
        const isHovered = hoveredSprint?.id === d.id
        // P164: Bilateral sprint detection
        const isBilateral = d.proposerId && d.claimedBy && d.proposerId !== d.claimedBy
        d3.select(this).attr('points', `0,${-s} ${s},0 0,${s} ${-s},0`)
          .attr('fill', isHovered ? d.color + 'cc' : isActive ? d.color + 'aa' : isTesting ? d.color + '66' : d.color + '33')
          .attr('stroke', isHovered ? '#fff' : isBilateral ? '#a78bfa' : d.color)
          .attr('stroke-width', isHovered ? 4 : isActive ? 3.5 : isTesting ? 2.5 : isBilateral ? 3 : 2)
          .attr('stroke-opacity', 1.0)
          .attr('opacity', 1.0)
          .attr('stroke-dasharray', (!isActive && !isTesting) ? '5,3' : 'none')
          .attr('filter', isActive || isHovered ? 'url(#glow)' : 'none')
      })

      // P120: Show serial by default, expand to truncated title on hover
      allSN.select('.sprint-label')
        .text(d => {
          const isHovered = hoveredSprint?.id === d.id
          if (!isHovered) return d.sprintSerial || 'P?'
          // On hover, show truncated title
          const title = d.name || d.sprintSerial || 'P?'
          return title.length > 30 ? title.slice(0, 27) + '...' : title
        })
        .attr('fill', d => d.color)
        .attr('opacity', d => {
          const isHovered = hoveredSprint?.id === d.id
          if (isHovered) return 1
          return d.sprintStatus === 'in_progress' ? 0.8 : 0.5
        })

      // P120 + P120b: hover-only status text, radially positioned
      allSN.select('.sprint-status')
        .attr('x', d => {
          const angle = Math.atan2(d.y - cy, d.x - cx)
          return (sprintSize(d) + 14) * Math.cos(angle)
        })
        .attr('y', d => {
          const angle = Math.atan2(d.y - cy, d.x - cx)
          return (sprintSize(d) + 14) * Math.sin(angle)
        })
        .attr('dy', '0.35em')
        .attr('text-anchor', d => {
          const angle = Math.atan2(d.y - cy, d.x - cx)
          const cos = Math.cos(angle)
          return Math.abs(cos) > 0.45 ? (cos > 0 ? 'start' : 'end') : 'middle'
        })
        .text(d => {
          if (hoveredSprint?.id !== d.id) return ''
          return d.sprintStatus === 'in_progress' ? '● active' : d.sprintStatus === 'testing' ? '◆ testing' : '○ proposed'
        })
        .attr('fill', d => d.sprintStatus === 'in_progress' ? d.color : 'var(--co-border)')
        .attr('font-size', '6px')

      // ── Particles ──
      const ps = particlesRef.current
      const pSel = particleG.selectAll<SVGCircleElement, Particle>('circle.particle')
        .data(ps, d => d.id)
      pSel.exit().remove()
      const pEnter = pSel.enter().append('circle').attr('class', 'particle')
      pSel.merge(pEnter)
        .attr('r', d => d.eventType === 'sprint_completed' ? 4 : 3)
        .attr('fill', d => d.color).attr('opacity', 0.85)
        .each(function (d) {
          const src = allN.find(n => n.id === d.sourceId)
          const tgt = allN.find(n => n.id === d.targetId)
          if (src && tgt) {
            d3.select(this)
              .attr('cx', src.x + (tgt.x - src.x) * d.progress)
              .attr('cy', src.y + (tgt.y - src.y) * d.progress)
          }
        })
    }

    // ── P157: Animation loop — stops when no particles active (performance optimization) ──
    function animate() {
      // Agent orbital motion removed - agents remain in fixed positions

      // Advance particles
      const ps = particlesRef.current
      for (let i = ps.length - 1; i >= 0; i--) {
        ps[i].progress += ps[i].speed
        if (ps[i].progress >= 1) ps.splice(i, 1)
      }

      // Ambient particles on active links
      if (Math.random() < 0.016 && newLinks.length > 0) {
        const link = newLinks[Math.floor(Math.random() * newLinks.length)]
        const color = link.edgeType === 'repo-contribution'
          ? (link.target.color || 'var(--co-text-muted)')
          : (link.layers?.[0] ? (LAYER_COLORS[link.layers[0]] || 'var(--co-text-muted)') : 'var(--co-text-muted)')
        particlesRef.current.push({
          id: ++particleIdRef.current, sourceId: link.source.id, targetId: link.target.id,
          progress: 0, speed: 0.006 + Math.random() * 0.012,
          color, eventType: 'ambient',
        })
      }

      render()

      // P157: Stop animation loop when no particles (performance — no continuous RAF)
      if (ps.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        animatingRef.current = false // P157: mark animation as stopped
      }
    }

    render()
    animatingRef.current = true // P157: mark animation as running
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      animatingRef.current = false
    }
  }, [loading, allGraphNodes, allEdges, dimensions, openPopup]) // P157: removed hover states from dependency array

  // ── P157: Separate hover layer — updates only hover-dependent attributes without rebuilding SVG ──
  useEffect(() => {
    if (!svgRef.current) return
    console.count('P157: hover-layer render') // P157: measurement — this should increment ONLY on hover, not on data changes

    const svg = d3.select(svgRef.current)

    // Update repo hover states
    svg.selectAll<SVGRectElement, GraphNode>('rect.repo-square')
      .attr('stroke-width', d => hoveredRepo?.id === d.id ? 2 : 1)
      .attr('stroke-opacity', d => hoveredRepo?.id === d.id ? 0.9 : 0.5)

    svg.selectAll<SVGTextElement, GraphNode>('text.repo-label')
      .attr('opacity', d => hoveredRepo?.id === d.id ? 1 : 0.6)

    // Update sprint hover states
    svg.selectAll<SVGPathElement, GraphNode>('path.sprint-diamond')
      .attr('stroke-width', d => hoveredSprint?.id === d.id ? 3 : 2)

    // Update sprint hover-only status text
    svg.selectAll<SVGTextElement, GraphNode>('text.sprint-status-hover')
      .text(d => {
        if (hoveredSprint?.id !== d.id) return ''
        return d.sprintStatus === 'in_progress' ? '● active' : d.sprintStatus === 'testing' ? '◆ testing' : '○ proposed'
      })

    // Update sprint hover-only title text
    svg.selectAll<SVGTextElement, GraphNode>('text.sprint-title-hover')
      .text(d => {
        if (hoveredSprint?.id !== d.id) return d.sprintSerial || ''
        const title = d.name || ''
        return title.length > 32 ? title.slice(0, 29) + '...' : title
      })

    // Update edge labels (shown only when sprint hovered)
    const sprintEdges = linksRef.current.filter(e => e.edgeType === 'sprint-repo')
    svg.select('g.edge-labels').selectAll<SVGTextElement, ResolvedEdge>('text.edge-label')
      .data(hoveredSprint ? sprintEdges.filter(d => d.target.id === hoveredSprint.id) : [], d => d.id)
      .join('text')
      .attr('class', 'edge-label')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '0.5rem')
      .attr('fill', 'var(--co-text-muted)')
      .text(d => d.layers?.map(l => `L${l}`).join(',') || '')

  }, [hoveredSprint, hoveredRepo, hoveredAgent])

  // ── Derived stats ──────────────────────────────────────────────────────────

  const onlineCount = agentNodes.filter(n => n.isOnline).length
  const activeSprintCount = sprints.filter((s: Record<string, unknown>) => ['in_progress', 'testing'].includes((s as string).status)).length

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--co-bg)' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: 'var(--co-text-muted)' }}>
          Loading swarm data…
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--co-bg)', minHeight: '100vh', color: 'var(--co-text)' }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 24px', borderBottom: '1px solid var(--co-border)',
        display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
      }}>
        <button
          onClick={() => navigate('/coordinate')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: '1px solid var(--co-border)', borderRadius: '4px',
            color: 'var(--co-text-muted)', padding: '4px 10px', cursor: 'pointer',
            fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
          }}
        >
          <ArrowLeft size={12} /> Workshop
        </button>

        <h1 style={{
          fontFamily: "'Cormorant', serif", fontSize: '1.4rem',
          fontWeight: 400, color: 'var(--co-text)', margin: 0,
        }}>
          Swarm
        </h1>

        {/* P308: Link to Live view */}
        <button
          onClick={() => navigate('/coordinate/swarm/live')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#4ade8014', border: '1px solid #4ade8055',
            borderRadius: '4px', color: '#4ade80', padding: '4px 10px',
            cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
          }}
        >
          <Radio size={12} /> Live
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* P163: Replay mode toggle */}
          <button
            onClick={() => {
              setReplayMode(!replayMode)
              if (replayMode) setReplayTime(null) // Reset when disabling
            }}
            style={{
              background: replayMode ? '#4ade8018' : 'none',
              border: `1px solid ${replayMode ? '#4ade80' : 'var(--co-border)'}`,
              borderRadius: '4px',
              color: replayMode ? '#4ade80' : '#777',
              padding: '4px 10px',
              cursor: 'pointer',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.65rem',
            }}
          >
            {replayMode ? '● Replay' : 'Replay'}
          </button>

          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--co-text-muted)' }}>
            <span style={{ color: onlineCount > 0 ? '#4ade80' : 'var(--co-text-muted)' }}>●</span>
            {' '}<span style={{ color: 'var(--co-text)' }}>{onlineCount}</span> online
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--co-text-muted)' }}>
            <span style={{ color: 'var(--co-text)' }}>{activeSprintCount}</span> active
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--co-text-muted)' }}>
            <span style={{ color: 'var(--co-text)' }}>{agentNodes.length}</span> agent{agentNodes.length !== 1 ? 's' : ''}
            {' · '}<span style={{ color: 'var(--co-text)' }}>{repoNodes.length}</span> repo{repoNodes.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* ── Visualization Container ─────────────────────────────────── */}
      <div ref={containerRef} style={{ width: '100%', background: 'var(--co-bg)', position: 'relative', borderBottom: '1px solid var(--co-border)' }}>
        <svg ref={svgRef} style={{ width: '100%', height: dimensions.height, display: 'block' }} />

        <SwarmLegend dimensions={dimensions} commitLeaderboard={commitLeaderboard} />

        {/* P128: Sprint hover tooltip (enhanced from P117) */}
        {hoveredSprint && tooltipPos && (() => {
          const PHASE_STEPS = ['proposed', 'in_progress', 'testing', 'completed']
          const phaseIdx = PHASE_STEPS.indexOf(hoveredSprint.sprintStatus || 'proposed')
          const descPreview = hoveredSprint.description
            ? (hoveredSprint.description.length > 100 ? hoveredSprint.description.slice(0, 97) + '…' : hoveredSprint.description)
            : null
          const relTime = (iso: string) => {
            const diff = Date.now() - new Date(iso).getTime()
            const h = Math.floor(diff / 3_600_000)
            const d = Math.floor(h / 24)
            return d > 0 ? `${d}d ago` : h > 0 ? `${h}h ago` : 'just now'
          }
          const txLeft = Math.min(tooltipPos.x + 15, (dimensions.width || 800) - 250)
          return (
            <div style={{
              position: 'absolute',
              left: txLeft,
              top: Math.max(10, tooltipPos.y - 80),
              background: 'rgba(10, 10, 10, 0.95)',
              border: `1px solid ${hoveredSprint.color}55`,
              borderRadius: '6px',
              padding: '10px 12px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--co-text)',
              pointerEvents: 'none',
              zIndex: 1000,
              minWidth: '240px',
              maxWidth: '280px',
              boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 8px ${hoveredSprint.color}22`,
            }}>
              {/* Serial + status badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', color: hoveredSprint.color, fontSize: '0.75rem' }}>
                  {hoveredSprint.sprintSerial}
                </span>
                <span style={{
                  fontSize: '0.56rem', color: hoveredSprint.sprintStatus === 'in_progress' ? '#8aba8a' : hoveredSprint.sprintStatus === 'testing' ? '#06b6d4' : '#777',
                  border: `1px solid currentColor`, borderRadius: '3px', padding: '1px 4px',
                }}>
                  {hoveredSprint.sprintStatus === 'in_progress' ? 'active' : hoveredSprint.sprintStatus || 'proposed'}
                </span>
              </div>
              {/* Title */}
              <div style={{ color: 'var(--co-text)', marginBottom: '6px', fontSize: '0.68rem', lineHeight: '1.4' }}>
                {hoveredSprint.name}
              </div>
              {/* Description preview */}
              {descPreview && (
                <div style={{ color: 'var(--co-text-muted)', fontSize: '0.6rem', marginBottom: '6px', lineHeight: '1.5', fontStyle: 'italic' }}>
                  {descPreview}
                </div>
              )}
              {/* Phase progress bar */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                {PHASE_STEPS.map((phase, i) => (
                  <div key={phase} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: i <= phaseIdx ? hoveredSprint.color : 'var(--co-surface)',
                    opacity: i === phaseIdx ? 1 : i < phaseIdx ? 0.6 : 0.2,
                  }} />
                ))}
              </div>
              <div style={{ fontSize: '0.56rem', color: 'var(--co-text-muted)', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>proposed</span><span>active</span><span>testing</span><span>done</span>
              </div>
              {/* Meta */}
              <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.7' }}>
                <div>Complexity: <span style={{ color: COMPLEXITY_NEON[hoveredSprint.complexity || 'M'] ?? '#ffe01b' }}>{hoveredSprint.complexity || '—'}</span></div>
                {hoveredSprint.sprintLayers && hoveredSprint.sprintLayers.length > 0 && (
                  <div>Layers: <span style={{ color: 'var(--co-text)' }}>
                    {hoveredSprint.sprintLayers.map(l => (['Identity','State','Relationship','Event','Flow','Constraint','View'][parseInt(l)-1] || l)).join(' · ')}
                  </span></div>
                )}
                {hoveredSprint.proposerName && (
                  <div>Proposer: <span style={{ color: 'var(--co-text)' }}>{hoveredSprint.proposerName}</span></div>
                )}
                {hoveredSprint.claimerName && (
                  <div>Claimer: <span style={{ color: '#8aba8a' }}>{hoveredSprint.claimerName}</span></div>
                )}
                {hoveredSprint.createdAt && (
                  <div>Created: <span style={{ color: 'var(--co-text-muted)' }}>{relTime(hoveredSprint.createdAt)}</span></div>
                )}
                {/* P168: Sprint duration in tooltip */}
                {hoveredSprint.createdAt && (() => {
                  const d = computeSprintDurations(hoveredSprint.createdAt, hoveredSprint.claimedAt ?? null, hoveredSprint.completedAt ?? null)
                  if (hoveredSprint.completedAt && d.wait !== null && d.execution !== null) {
                    return <div>Duration: <span style={{ color: 'var(--co-primary)' }}>{formatDuration(d.total)}</span> <span style={{ color: 'var(--co-text-muted)' }}>(wait: {formatDuration(d.wait)}, exec: {formatDuration(d.execution)})</span></div>
                  }
                  if (hoveredSprint.claimedAt && d.execution !== null) {
                    return <div>Elapsed: <span style={{ color: 'var(--co-primary)' }}>{formatDuration(d.total)}</span> <span style={{ color: 'var(--co-text-muted)' }}>(exec: {formatDuration(d.execution)}, running)</span></div>
                  }
                  return <div>Waiting: <span style={{ color: 'var(--co-text-muted)' }}>{formatDuration(d.total)}</span></div>
                })()}
                {Array.isArray(hoveredSprint.contextRefs) && hoveredSprint.contextRefs.length > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    {hoveredSprint.contextRefs.slice(0, 3).map((ref: Record<string, unknown>, i: number) => (
                      <span key={i} style={{
                        display: 'inline-block', background: 'var(--co-surface)', border: '1px solid var(--co-border)',
                        borderRadius: '3px', padding: '1px 4px', marginRight: '3px',
                        fontSize: '0.55rem', color: 'var(--co-text-muted)',
                      }}>
                        {typeof ref === 'string' ? ref.replace('skill_hash:', 'hash:').slice(0, 20) : ref?.id || JSON.stringify(ref).slice(0, 20)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Click hint */}
              <div style={{ marginTop: '6px', fontSize: '0.56rem', color: 'var(--co-text-muted)', borderTop: '1px solid var(--co-border)', paddingTop: '5px' }}>
                Click to open sprint detail →
              </div>
            </div>
          )
        })()}

        {/* P128: Agent hover tooltip (new) */}
        {hoveredAgent && agentTooltipPos && (() => {
          const relTime = (iso: string) => {
            const diff = Date.now() - new Date(iso).getTime()
            const h = Math.floor(diff / 3_600_000)
            const m = Math.floor(diff / 60_000)
            return h > 0 ? `${h}h ago` : m > 0 ? `${m}m ago` : 'just now'
          }
          const activeSprintCount = allGraphNodes.filter(
            n => n.nodeType === 'sprint' && (n.claimedBy === hoveredAgent.id || n.proposerId === hoveredAgent.id)
          ).length
          const txLeft = Math.min(agentTooltipPos.x + 15, (dimensions.width || 800) - 230)
          return (
            <div style={{
              position: 'absolute',
              left: txLeft,
              top: Math.max(10, agentTooltipPos.y - 70),
              background: 'rgba(10, 10, 10, 0.95)',
              border: `1px solid ${hoveredAgent.color}55`,
              borderRadius: '6px',
              padding: '10px 12px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--co-text)',
              pointerEvents: 'none',
              zIndex: 1000,
              minWidth: '210px',
              boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 8px ${hoveredAgent.color}22`,
            }}>
              {/* Name + role */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', color: hoveredAgent.color, fontSize: '0.75rem' }}>{hoveredAgent.name}</span>
                {hoveredAgent.role && (
                  <span style={{
                    fontSize: '0.56rem', color: hoveredAgent.role === 'steward' ? '#f59e0b' : hoveredAgent.role === 'member' ? '#60a5fa' : 'var(--co-text-muted)',
                    border: '1px solid currentColor', borderRadius: '3px', padding: '1px 4px',
                  }}>{hoveredAgent.role}</span>
                )}
              </div>
              {/* Crafts */}
              {(hoveredAgent.craftPrimary || hoveredAgent.craftSecondary) && (
                <div style={{ fontSize: '0.63rem', color: 'var(--co-text-muted)', marginBottom: '5px' }}>
                  {hoveredAgent.craftPrimary && (
                    <span style={{ color: CRAFT_COLORS[hoveredAgent.craftPrimary] || 'var(--co-primary)' }}>
                      {CRAFT_SYMBOLS[hoveredAgent.craftPrimary] || ''} {hoveredAgent.craftPrimary}
                    </span>
                  )}
                  {hoveredAgent.craftSecondary && (
                    <span style={{ color: 'var(--co-text-muted)' }}> × <span style={{ color: CRAFT_COLORS[hoveredAgent.craftSecondary] || 'var(--co-text-muted)' }}>
                      {CRAFT_SYMBOLS[hoveredAgent.craftSecondary] || ''} {hoveredAgent.craftSecondary}
                    </span></span>
                  )}
                </div>
              )}
              {/* Status + online indicator */}
              <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.7' }}>
                <div>Status: <span style={{
                  color: hoveredAgent.isOnline ? '#8aba8a' : 'var(--co-border)',
                  display: 'inline-flex', alignItems: 'center', gap: '3px',
                }}>
                  <span style={{
                    display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
                    background: hoveredAgent.isOnline ? '#8aba8a' : 'var(--co-text-muted)',
                  }} />
                  {hoveredAgent.status || 'idle'}
                </span></div>
                {/* Capacity bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Capacity:</span>
                  <div style={{ flex: 1, height: '4px', background: 'var(--co-surface)', borderRadius: '2px' }}>
                    <div style={{
                      width: `${hoveredAgent.capacity ?? 100}%`, height: '100%', borderRadius: '2px',
                      background: (hoveredAgent.capacity ?? 100) > 60 ? '#8aba8a' : (hoveredAgent.capacity ?? 100) > 30 ? '#f59e0b' : '#ef4444',
                    }} />
                  </div>
                  <span style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem' }}>{hoveredAgent.capacity ?? 100}%</span>
                </div>
                {hoveredAgent.functionalMode && (() => {
                  const [craft, mode] = (hoveredAgent.functionalMode as string).split(':')
                  const craftSym = CRAFT_SYMBOLS[craft] || ''
                  const craftCol = CRAFT_COLORS[craft] || hoveredAgent.color
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--co-text-muted)' }}>Mode:</span>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        background: craftCol + '18', color: craftCol,
                        border: `1px solid ${craftCol}33`,
                        borderRadius: '3px', padding: '1px 6px',
                        fontSize: '0.62rem',
                      }}>
                        {craftSym && <span>{craftSym}</span>}
                        <span>{mode || craft}</span>
                      </span>
                    </div>
                  )
                })()}
                <div>Sprints: <span style={{ color: 'var(--co-text)' }}>{activeSprintCount} active</span></div>
                {hoveredAgent.lastSeen && (
                  <div>Seen: <span style={{ color: 'var(--co-text-muted)' }}>{relTime(hoveredAgent.lastSeen)}</span></div>
                )}
              </div>
            </div>
          )
        })()}

        {/* P128: Repo hover tooltip (new) */}
        {hoveredRepo && repoTooltipPos && (() => {
          const relTime = (iso: string) => {
            if (!iso) return '—'
            const diff = Date.now() - new Date(iso).getTime()
            const h = Math.floor(diff / 3_600_000)
            const d = Math.floor(h / 24)
            return d > 0 ? `${d}d ago` : h > 0 ? `${h}h ago` : 'just now'
          }
          const txLeft = Math.min(repoTooltipPos.x + 15, (dimensions.width || 800) - 240)
          const repoContribs = hoveredRepo.contributors
            ? hoveredRepo.contributors.map(id => agentNodes.find(a => a.id === id)).filter(Boolean) as GraphNode[]
            : []
          return (
            <div style={{
              position: 'absolute',
              left: txLeft,
              top: Math.max(10, repoTooltipPos.y - 70),
              background: 'rgba(10, 10, 10, 0.95)',
              border: `1px solid ${hoveredRepo.color}55`,
              borderRadius: '6px',
              padding: '10px 12px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--co-text)',
              pointerEvents: 'none',
              zIndex: 1000,
              minWidth: '220px',
              maxWidth: '260px',
              boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 8px ${hoveredRepo.color}22`,
            }}>
              {/* Repo name */}
              <div style={{ fontWeight: 'bold', color: hoveredRepo.color, marginBottom: '2px', fontSize: '0.73rem' }}>
                {hoveredRepo.name}
              </div>
              {/* Full URL (truncated, copyable concept) */}
              {hoveredRepo.slug && (
                <div style={{ fontSize: '0.58rem', color: 'var(--co-text-muted)', marginBottom: '6px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  github.com/{hoveredRepo.slug}
                </div>
              )}
              <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.7' }}>
                <div>Workshop refs: <span style={{ color: 'var(--co-text)' }}>{hoveredRepo.linkCount ?? 0}</span></div>
                {hoveredRepo.repoLastSeen && (
                  <div>Last active: <span style={{ color: 'var(--co-text-muted)' }}>{relTime(hoveredRepo.repoLastSeen)}</span></div>
                )}
                {/* Contributors */}
                {repoContribs.length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    <div style={{ color: 'var(--co-text-muted)', marginBottom: '3px', fontSize: '0.58rem' }}>contributors</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {repoContribs.slice(0, 6).map(a => (
                        <span key={a.id} style={{
                          fontSize: '0.58rem', color: a.color,
                          background: 'var(--co-surface)', border: `1px solid ${a.color}44`,
                          borderRadius: '3px', padding: '1px 5px',
                        }}>{a.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {/* P130: Pop-up windows for sprint / agent / repo nodes */}
        {activePopups.map((popup) => {
          const BASE_LEFT = 60
          const BASE_TOP = 60
          const OFFSET = 30
          // P136: use dragged position if set, otherwise default cascade
          const left = popup.pos?.x ?? (BASE_LEFT + popup.offsetIndex * OFFSET)
          const top = popup.pos?.y ?? (BASE_TOP + popup.offsetIndex * OFFSET)
          const popupWidth = popup.size?.w ?? 320
          const popupMaxHeight = popup.size?.h ?? 480
          const { node } = popup

          const relTime = (iso: string) => {
            if (!iso) return '—'
            const diff = Date.now() - new Date(iso).getTime()
            const h = Math.floor(diff / 3_600_000)
            const d = Math.floor(h / 24)
            const m = Math.floor(diff / 60_000)
            return d > 0 ? `${d}d ago` : h > 0 ? `${h}h ago` : m > 0 ? `${m}m ago` : 'just now'
          }

          // Look up full sprint record from loaded data
          const fullSprint = node.nodeType === 'sprint'
            ? [...sprints, ...completedSprints].find((s: Record<string, unknown>) => `sprint-${s.id}` === node.id)
            : null

          const repoContribs = node.nodeType === 'repo' && node.contributors
            ? node.contributors.map(id => agentNodes.find(a => a.id === id)).filter(Boolean) as GraphNode[]
            : []

          return (
            <div
              key={popup.id}
              onMouseDown={() => bringToFront(popup.id)}
              style={{
                position: 'absolute',
                left,
                top,
                width: `${popupWidth}px`,
                maxHeight: `${popupMaxHeight}px`,
                background: 'rgba(10, 10, 10, 0.97)',
                border: `1px solid ${node.color}66`,
                borderRadius: '8px',
                boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 12px ${node.color}22`,
                zIndex: 2000 + (popup.zBoost ?? popup.offsetIndex),
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--co-text)',
                overflow: 'hidden',
              }}
            >
              {/* Header — P136: draggable */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  bringToFront(popup.id)
                  dragRef.current = {
                    id: popup.id,
                    startX: e.clientX,
                    startY: e.clientY,
                    origX: popup.pos?.x ?? left,
                    origY: popup.pos?.y ?? top,
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px 8px',
                  borderBottom: `1px solid ${node.color}33`,
                  background: `${node.color}11`,
                  flexShrink: 0,
                  cursor: 'move',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: node.color, fontSize: '0.8rem' }}>
                    {node.nodeType === 'sprint' ? node.sprintSerial :
                     node.nodeType === 'agent' ? node.name :
                     node.slug ? node.slug.split('/').pop() : node.name}
                  </span>
                  <span style={{
                    fontSize: '0.55rem', color: 'var(--co-text-muted)', border: '1px solid var(--co-border)',
                    borderRadius: '3px', padding: '1px 4px', textTransform: 'uppercase',
                  }}>
                    {node.nodeType}
                  </span>
                </div>
                <button
                  onClick={() => closePopup(popup.id)}
                  style={{
                    background: 'none', border: 'none', color: 'var(--co-text-muted)', cursor: 'pointer',
                    fontSize: '1rem', lineHeight: 1, padding: '2px 4px',
                    fontFamily: 'inherit',
                  }}
                  title="Close (ESC)"
                >×</button>
              </div>

              {/* Body */}
              <div style={{ padding: '12px', overflowY: 'auto', flex: 1 }}>

                {/* ── Sprint popup ── */}
                {node.nodeType === 'sprint' && (
                  <div style={{ lineHeight: '1.6' }}>
                    {/* Title */}
                    <div style={{ color: 'var(--co-text)', marginBottom: '8px', fontSize: '0.72rem', fontWeight: 500 }}>
                      {fullSprint?.title || node.name}
                    </div>
                    {/* Phase progress */}
                    {(() => {
                      const PHASES = ['proposed', 'in_progress', 'testing', 'completed']
                      const phaseIdx = PHASES.indexOf(node.sprintStatus || 'proposed')
                      return (
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', gap: '3px', marginBottom: '3px' }}>
                            {PHASES.map((_, i) => (
                              <div key={i} style={{
                                flex: 1, height: '3px', borderRadius: '2px',
                                background: i <= phaseIdx ? node.color : 'var(--co-surface)',
                              }} />
                            ))}
                          </div>
                          <div style={{ fontSize: '0.56rem', color: 'var(--co-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>proposed</span><span>active</span><span>testing</span><span>done</span>
                          </div>
                        </div>
                      )
                    })()}
                    {/* Meta grid */}
                    <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.8', marginBottom: '8px' }}>
                      <div>Status: <span style={{ color: node.sprintStatus === 'in_progress' ? '#8aba8a' : node.sprintStatus === 'testing' ? '#06b6d4' : '#777' }}>
                        {node.sprintStatus}
                      </span></div>
                      <div>Complexity: <span style={{ color: COMPLEXITY_NEON[node.complexity || 'M'] ?? '#ffe01b' }}>{node.complexity || '—'}</span></div>
                      {node.sprintLayers && node.sprintLayers.length > 0 && (
                        <div>Layers: <span style={{ color: 'var(--co-text)' }}>
                          {node.sprintLayers.map(l => (['Identity','State','Relationship','Event','Flow','Constraint','View'][parseInt(l)-1] || l)).join(' · ')}
                        </span></div>
                      )}
                      {node.proposerName && <div>Proposer: <span style={{ color: 'var(--co-text)' }}>{node.proposerName}</span></div>}
                      {node.claimerName && <div>Claimer: <span style={{ color: '#8aba8a' }}>{node.claimerName}</span></div>}
                      {node.createdAt && <div>Created: <span style={{ color: 'var(--co-text-muted)' }}>{relTime(node.createdAt)}</span></div>}
                    </div>
                    {/* Description */}
                    {fullSprint?.description && (
                      <div style={{
                        fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.6',
                        borderTop: '1px solid var(--co-border)', paddingTop: '8px', marginBottom: '8px',
                        maxHeight: '120px', overflowY: 'auto',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {fullSprint.description.length > 500
                          ? fullSprint.description.slice(0, 497) + '…'
                          : fullSprint.description}
                      </div>
                    )}
                    {/* Progress log */}
                    {fullSprint?.progress_log && Array.isArray(fullSprint.progress_log) && fullSprint.progress_log.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--co-border)', paddingTop: '8px', marginBottom: '8px' }}>
                        <div style={{ fontSize: '0.58rem', color: 'var(--co-text-muted)', marginBottom: '4px' }}>progress</div>
                        {fullSprint.progress_log.slice(-3).map((entry: unknown, i: number) => (
                          <div key={i} style={{ fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '4px', lineHeight: '1.5' }}>
                            <span style={{ color: 'var(--co-text-muted)' }}>{entry.percent_complete != null ? `${(entry as any).percent_complete}%` : ''} </span>
                            {entry.message?.slice(0, 120)}{(entry as any).message?.length > 120 ? '…' : ''}
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Completion proof */}
                    {fullSprint?.completion_proof && (
                      <div style={{ borderTop: '1px solid var(--co-border)', paddingTop: '8px', marginBottom: '8px' }}>
                        <div style={{ fontSize: '0.58rem', color: 'var(--co-text-muted)', marginBottom: '4px' }}>proof</div>
                        <a href={fullSprint.completion_proof} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.6rem', color: node.color, textDecoration: 'none',
                            display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                          {fullSprint.completion_proof}
                        </a>
                      </div>
                    )}
                    {/* Full detail link */}
                    <div style={{ borderTop: '1px solid var(--co-border)', paddingTop: '8px' }}>
                      <button
                        onClick={() => navigate(`/coordinate/sprint/${fullSprint?.id || ''}`)}
                        style={{
                          background: `${node.color}22`, border: `1px solid ${node.color}44`,
                          color: node.color, borderRadius: '4px', padding: '4px 10px',
                          fontFamily: 'inherit', fontSize: '0.62rem', cursor: 'pointer',
                        }}
                      >
                        Open full sprint →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Agent popup ── */}
                {node.nodeType === 'agent' && (
                  <div style={{ lineHeight: '1.6' }}>
                    {/* Crafts */}
                    {(node.craftPrimary || node.craftSecondary) && (
                      <div style={{ fontSize: '0.68rem', marginBottom: '10px' }}>
                        {node.craftPrimary && (
                          <span style={{ color: CRAFT_COLORS[node.craftPrimary] || 'var(--co-primary)' }}>
                            {CRAFT_SYMBOLS[node.craftPrimary] || ''} {node.craftPrimary}
                          </span>
                        )}
                        {node.craftSecondary && (
                          <span style={{ color: 'var(--co-text-muted)' }}> × <span style={{ color: CRAFT_COLORS[node.craftSecondary] || 'var(--co-text-muted)' }}>
                            {CRAFT_SYMBOLS[node.craftSecondary] || ''} {node.craftSecondary}
                          </span></span>
                        )}
                      </div>
                    )}
                    <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.8' }}>
                      {/* Online + status */}
                      <div>Status: <span style={{ color: node.isOnline ? '#8aba8a' : 'var(--co-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: node.isOnline ? '#8aba8a' : 'var(--co-text-muted)' }} />
                        {node.isOnline ? (node.status || 'active') : 'offline'}
                      </span></div>
                      {node.role && (
                        <div>Role: <span style={{
                          color: node.role === 'steward' ? '#f59e0b' : node.role === 'member' ? '#60a5fa' : 'var(--co-text-muted)',
                        }}>{node.role}</span></div>
                      )}
                      {/* Capacity bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                        <span>Capacity:</span>
                        <div style={{ flex: 1, height: '5px', background: 'var(--co-surface)', borderRadius: '3px' }}>
                          <div style={{
                            width: `${node.capacity ?? 100}%`, height: '100%', borderRadius: '3px',
                            background: (node.capacity ?? 100) > 60 ? '#8aba8a' : (node.capacity ?? 100) > 30 ? '#f59e0b' : '#ef4444',
                          }} />
                        </div>
                        <span style={{ color: 'var(--co-text-muted)', minWidth: '28px' }}>{node.capacity ?? 100}%</span>
                      </div>
                      {node.functionalMode && (() => {
                        const [craft, mode] = (node.functionalMode as string).split(':')
                        const craftSym = CRAFT_SYMBOLS[craft] || ''
                        const craftCol = CRAFT_COLORS[craft] || node.color
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: 'var(--co-text-muted)' }}>Mode:</span>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                              background: craftCol + '18', color: craftCol,
                              border: `1px solid ${craftCol}33`,
                              borderRadius: '3px', padding: '1px 6px',
                              fontSize: '0.65rem',
                            }}>
                              {craftSym && <span>{craftSym}</span>}
                              <span>{mode || craft}</span>
                            </span>
                          </div>
                        )
                      })()}
                      {/* Active sprints this agent is involved in */}
                      {(() => {
                        const agentSprints = allGraphNodes.filter(
                          n => n.nodeType === 'sprint' && (n.claimedBy === node.id || n.proposerId === node.id)
                        )
                        if (agentSprints.length === 0) return null
                        return (
                          <div style={{ marginTop: '8px', borderTop: '1px solid var(--co-border)', paddingTop: '8px' }}>
                            <div style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem', marginBottom: '4px' }}>active sprints</div>
                            {agentSprints.map(s => (
                              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <span style={{ color: s.color, fontSize: '0.62rem', fontWeight: 600 }}>{s.sprintSerial}</span>
                                <span style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem' }}>
                                  {s.claimedBy === node.id ? '● claiming' : '○ proposed'}
                                </span>
                                <button
                                  onClick={() => openPopup(s)}
                                  style={{
                                    background: 'none', border: `1px solid ${s.color}44`,
                                    color: s.color, borderRadius: '3px', padding: '1px 5px',
                                    fontFamily: 'inherit', fontSize: '0.55rem', cursor: 'pointer',
                                  }}
                                >view</button>
                              </div>
                            ))}
                          </div>
                        )
                      })()}
                      {node.lastSeen && (
                        <div style={{ marginTop: '6px', color: 'var(--co-text-muted)' }}>Last seen: {relTime(node.lastSeen)}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Repo popup ── */}
                {node.nodeType === 'repo' && (
                  <div style={{ lineHeight: '1.6' }}>
                    {node.slug && (
                      <a href={`https://github.com/${node.slug}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.62rem', color: node.color, display: 'block', marginBottom: '10px', textDecoration: 'none' }}>
                        github.com/{node.slug} ↗
                      </a>
                    )}
                    <div style={{ fontSize: '0.62rem', color: 'var(--co-text-muted)', lineHeight: '1.8' }}>
                      <div>Workshop refs: <span style={{ color: 'var(--co-text)' }}>{node.linkCount ?? 0}</span></div>
                      {node.repoLastSeen && (
                        <div>Last active: <span style={{ color: 'var(--co-text-muted)' }}>{relTime(node.repoLastSeen)}</span></div>
                      )}
                      {repoContribs.length > 0 && (
                        <div style={{ marginTop: '8px', borderTop: '1px solid var(--co-border)', paddingTop: '8px' }}>
                          <div style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem', marginBottom: '6px' }}>workshop contributors</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {repoContribs.map(a => (
                              <button
                                key={a.id}
                                onClick={() => openPopup(a)}
                                style={{
                                  background: `${a.color}11`, border: `1px solid ${a.color}44`,
                                  color: a.color, borderRadius: '4px', padding: '3px 8px',
                                  fontFamily: 'inherit', fontSize: '0.62rem', cursor: 'pointer',
                                }}
                              >
                                {CRAFT_SYMBOLS[a.craftPrimary || ''] || ''} {a.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* P136: Resize handle */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  bringToFront(popup.id)
                  resizeRef.current = {
                    id: popup.id,
                    startX: e.clientX,
                    startY: e.clientY,
                    origW: popup.size?.w ?? 320,
                    origH: popup.size?.h ?? 480,
                  }
                }}
                style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: '16px', height: '16px',
                  cursor: 'nwse-resize',
                  background: 'transparent',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ opacity: 0.3 }}>
                  <path d="M14 2L2 14M14 6L6 14M14 10L10 14" stroke="#555" strokeWidth="1" />
                </svg>
              </div>
            </div>
          )
        })}

        {/* P251: Controls extracted to SwarmControls */}
        <SwarmControls
          simFilter={simFilter}
          setSimFilter={setSimFilter}
          showLegends={showLegends}
          setShowLegends={setShowLegends}
          dimensions={dimensions}
        />
      </div>

      {/* P163: Timeline slider for replay mode */}
      {replayMode && (
        <div style={{
          background: 'var(--co-bg)',
          borderBottom: '1px solid var(--co-border)',
          padding: '12px 16px',
        }}>
          <TimelineSlider
            artifacts={protocolEvents.map(e => ({
              id: e.id,
              created_at: e.created_at,
            }))}
            onTimeChange={(time) => setReplayTime(time)}
          />
        </div>
      )}

      {/* P111 Protocol Activity Stream */}
      <div style={{ marginTop: '8px' }}>
        <ProtocolActivityStream protocolEvents={protocolEvents} />
      </div>

      {/* ── Bottom Panels — hidden on mobile ────────────────────────── */}
      <div style={{ maxWidth: '100%', display: dimensions.width < 500 ? 'none' : 'block' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--co-border)', background: 'var(--co-bg)' }}>
          {([
            ['sprints', 'Active Sprints', Zap],
            ['protocol', 'Protocol Stream', Activity],
            ['activity', 'Workshop Activity', MessageSquare],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setBottomTab(key as unknown)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '10px 16px', border: 'none', cursor: 'pointer',
                background: bottomTab === key ? '#141414' : 'transparent',
                borderBottom: bottomTab === key ? '2px solid #c4956a' : '2px solid transparent',
                color: bottomTab === key ? '#c8c2ba' : 'var(--co-text-muted)',
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'all 0.15s',
              }}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        <div style={{ background: 'var(--co-bg)', maxHeight: '320px', overflowY: 'auto' }}>
          {bottomTab === 'sprints' && (
            <div>
              {sprints.filter((s: Record<string, unknown>) => ['in_progress', 'testing', 'proposed', 'claimed'].includes((s as string).status)).length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: 'var(--co-text-muted)' }}>No active sprints</div>
              ) : (
                sprints.filter((s: Record<string, unknown>) => ['in_progress', 'testing', 'proposed', 'claimed'].includes((s as string).status)).map((s: Record<string, unknown>) => (
                  <div key={String(s.id)} onClick={() => navigate(`/coordinate/sprint/${s.id}`)}
                    style={{ padding: '12px 20px', borderBottom: '1px solid var(--co-border)', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#141414')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem',
                        color: s.status === 'in_progress' ? '#8aba8a' : s.status === 'testing' ? '#06b6d4' : 'var(--co-primary)',
                        background: s.status === 'in_progress' ? '#8aba8a12' : s.status === 'testing' ? '#06b6d412' : '#c4956a12',
                        borderRadius: '3px', padding: '1px 6px',
                      }}>{s.sprint_id || '—'}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'var(--co-text-muted)', textTransform: 'uppercase' }}>{s.status}</span>
                      {s.layers?.map((l: string) => (
                        <span key={l} style={{ width: '6px', height: '6px', borderRadius: '50%', background: LAYER_COLORS[l] || 'var(--co-text-muted)', display: 'inline-block' }} />
                      ))}
                      <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)' }}>{s.claimer?.name || s.proposer?.name || '—'}</span>
                    </div>
                    <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.88rem', color: 'var(--co-text)', fontWeight: 500 }}>{s.title}</div>
                  </div>
                ))
              )}
            </div>
          )}

          {bottomTab === 'protocol' && (
            <div>
              {protocolEvents.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: 'var(--co-text-muted)' }}>No protocol events</div>
              ) : (
                protocolEvents.slice(0, 50).map((evt: Record<string, unknown>) => (
                  <div key={String(evt.id)} style={{ padding: '8px 20px', borderBottom: '1px solid var(--co-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: EVENT_PARTICLE_COLORS[evt.event_type] || 'var(--co-text-muted)' }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', minWidth: '140px' }}>{evt.event_type?.replace(/_/g, ' ')}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: evt.agent?.craft_primary ? (CRAFT_COLORS[(evt as any).agent?.craft_primary] || 'var(--co-primary)') : 'var(--co-primary)' }}>{evt.agent?.name || '—'}</span>
                    {evt.sprint?.sprint_id && (
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'var(--co-text-muted)', background: 'var(--co-surface)', borderRadius: '3px', padding: '0 4px' }}>{(evt as any).sprint?.sprint_id}</span>
                    )}
                    <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)' }}>{timeAgo((evt as any).created_at)}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {bottomTab === 'activity' && (
            <div>
              {activity.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: 'var(--co-text-muted)' }}>No recent activity</div>
              ) : (
                activity.map((m: Record<string, unknown>, i: number) => (
                  <div key={m.id || i} style={{ padding: '10px 20px', borderBottom: '1px solid var(--co-border)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    {m.participants?.is_agent
                      ? <Bot size={13} style={{ color: 'var(--co-text-muted)', flexShrink: 0, marginTop: '3px' }} />
                      : <Users size={13} style={{ color: 'var(--co-text-muted)', flexShrink: 0, marginTop: '3px' }} />
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: m.participants?.craft_primary ? (CRAFT_COLORS[(m as any).participants?.craft_primary] || 'var(--co-primary)') : 'var(--co-text-muted)', fontWeight: 500 }}>{m.participants?.name || '—'}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)' }}>{timeAgo((m as any).created_at)}</span>
                      </div>
                      <div style={{ fontFamily: "'Cormorant', serif", fontSize: '0.85rem', color: 'var(--co-text)' }}>{m.title || m.message || '(untitled)'}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
