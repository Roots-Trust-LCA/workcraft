// @ts-nocheck
/**
 * Coordinate — Workshop coordination layout shell.
 *
 * P159: Decomposed from 3430-line monolith into 6 focused components.
 * This file is now responsible for:
 *   - Data loading (Supabase queries + Realtime subscription)
 *   - Protocol Health Bar (uses presence + sprint summary data)
 *   - Layout: two-column top section, SprintTabs below
 *   - Modal state: protocol event detail, message detail
 *
 * Child components own their local UI state (pagination, filters, etc.)
 * See coordinate/ directory for the decomposed components.
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CoordinationProposal } from '../types/coordination'
import { logger } from '../lib/logger'
import { useWorkshop } from '../lib/workshop-context'
import {
  Radio, Activity, FileText, ShieldCheck, ShieldAlert, Settings2, BarChart2, PlusCircle, AlertTriangle,
} from 'lucide-react'
import ProtocolActivityStream from '../components/ProtocolActivityStream'
import { useAdvancedMode } from '../hooks/useAdvancedMode'

// Decomposed components (P159)
import { CraftPresenceGrid } from './coordinate/CraftPresenceGrid'
import { FloorControlPanel } from './coordinate/FloorControlPanel'
import { SharedLinksPanel } from './coordinate/SharedLinksPanel'
import { WorkshopActivity } from './coordinate/WorkshopActivity'
import { SprintTabs } from './coordinate/SprintTabs'
import { EventDetailModal } from './coordinate/EventDetailModal'
import { MessageDetailModal } from './coordinate/MessageDetailModal'
import { ProposeSprintModal } from './coordinate/ProposeSprintModal'
import { deriveConsensusHash, timeAgo } from './coordinate/constants'

// ── Component ────────────────────────────────────────────────────────────────

export function Coordinate() {
const { supabase } = useWorkshop()
  const navigate = useNavigate()
  const [advancedMode, toggleAdvanced] = useAdvancedMode()

  // ── Data state ────────────────────────────────────────────────────────────

  const [workshopChannelId, setWorkshopChannelId] = useState<string | null>(null)
  const [presence, setPresence] = useState<any[]>([])
  const [floor, setFloor] = useState<any>(null)
  const [signals, setSignals] = useState<any[]>([])
  const [sprints, setSprints] = useState<CoordinationProposal[]>([])
  const [completedSprints, setCompletedSprints] = useState<CoordinationProposal[]>([])
  const [pinnedSprints, setPinnedSprints] = useState<CoordinationProposal[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [protocolEvents, setProtocolEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  const addError = useCallback((context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err)
    logger.error(`[Coordinate] ${context}:`, err)
    setErrors(prev => {
      const entry = `${context}: ${msg}`
      return prev.includes(entry) ? prev : [...prev.slice(-4), entry]
    })
  }, [])

  // ── Modal state ───────────────────────────────────────────────────────────

  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [selectedProtocolEvent, setSelectedProtocolEvent] = useState<any>(null)
  const [proposeModalOpen, setProposeModalOpen] = useState(false)

  // ── Data loaders ──────────────────────────────────────────────────────────

  const loadPresence = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('agent_presence')
        .select('*, participants!inner(name, craft_primary, craft_secondary, role, is_agent, participant_type)')
        .order('last_seen', { ascending: false })
      if (error) throw error
      setPresence(data || [])
    } catch (err) { addError('Load presence', err) }
  }, [addError])

  const loadFloor = useCallback(async (chId: string) => {
    try {
      const [floorRes, sigRes] = await Promise.all([
        supabase
          .from('channel_floor_state')
          .select('*, participants!channel_floor_state_current_speaker_id_fkey(name)')
          .eq('channel_id', chId)
          .single(),
        supabase
          .from('coordination_signals')
          .select('*, participants!inner(name)')
          .order('created_at', { ascending: false })
          .limit(6),
      ])
      if (floorRes.error) throw floorRes.error
      setFloor(floorRes.data)
      setSignals(sigRes.data || [])
    } catch (err) { addError('Load floor state', err) }
  }, [addError])

  const loadSprints = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('coordination_requests')
        .select(`
          *,
          proposer:participants!coordination_requests_proposer_id_fkey(name),
          acceptor:participants!coordination_requests_accepted_by_fkey(name),
          claimer:participants!coordination_requests_claimed_by_fkey(name),
          sprint_messages(linked_at)
        `)
        .not('status', 'in', '("cancelled","completed","pinned")')
        .order('created_at', { ascending: false })
        .limit(100)
      if (error) throw error
      setSprints(data || [])
    } catch (err) { addError('Load sprints', err) }
  }, [addError])

  const loadPinnedSprints = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('coordination_requests')
        .select(`
          *,
          proposer:participants!coordination_requests_proposer_id_fkey(name),
          acceptor:participants!coordination_requests_accepted_by_fkey(name),
          claimer:participants!coordination_requests_claimed_by_fkey(name),
          sprint_messages(linked_at)
        `)
        .eq('status', 'pinned')
        .order('created_at', { ascending: false })
      if (error) throw error
      setPinnedSprints(data || [])
    } catch (err) { addError('Load pinned sprints', err) }
  }, [addError])

  const loadCompletedSprints = useCallback(async () => {
    try {
      // P221: query optimization — scope to last 90 days to prevent unbounded growth
      const { data, error } = await supabase
        .from('coordination_requests')
        .select(`
          *,
          proposer:participants!coordination_requests_proposer_id_fkey(name),
          acceptor:participants!coordination_requests_accepted_by_fkey(name),
          claimer:participants!coordination_requests_claimed_by_fkey(name),
          sprint_messages(linked_at)
        `)
        .eq('status', 'completed')
        .gte('completed_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
        .order('completed_at', { ascending: false })
        .limit(500)
      if (error) throw error
      const sorted = (data || []).sort((a: CoordinationProposal, b: CoordinationProposal) => {
        const ta = a.completed_at ? new Date(a.completed_at).getTime() : 0
        const tb = b.completed_at ? new Date(b.completed_at).getTime() : 0
        return tb - ta
      })
      setCompletedSprints(sorted)
    } catch (err) { addError('Load completed sprints', err) }
  }, [addError])

  const loadLinks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('coordination_links')
        .select('id, url, title, description, created_at, participants(name, craft_primary)')
        .order('created_at', { ascending: false })
        .limit(60)
      if (error) throw error
      setLinks(data || [])
    } catch (err) { addError('Load links', err) }
  }, [addError])

  const loadActivity = useCallback(async (chId: string) => {
    try {
      const [workshopRes, sprintLinkedRes] = await Promise.all([
        supabase
          .from('guild_messages')
          .select('*, participants!inner(name, is_agent, craft_primary)')
          .eq('channel_id', chId)
          .order('created_at', { ascending: false })
          .limit(60),
        supabase
          .from('guild_messages')
          .select('*, participants!inner(name, is_agent, craft_primary)')
          .not('sprint_id', 'is', null)
          .neq('channel_id', chId)
          .order('created_at', { ascending: false })
          .limit(30),
      ])
      if (workshopRes.error) throw workshopRes.error
      const workshopMsgs = workshopRes.data || []
      const sprintMsgs = sprintLinkedRes.data || []
      const seen = new Set<string>()
      const merged = [...workshopMsgs, ...sprintMsgs]
        .filter(m => { if (seen.has(m.id)) return false; seen.add(m.id); return true })
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 60)
      setActivity(merged)
    } catch (err) { addError('Load activity', err) }
  }, [addError])

  const loadProtocolEvents = useCallback(async (chId: string) => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    let { data, error } = await supabase
      .from('protocol_events')
      .select(`
        *,
        agent:participants!protocol_events_agent_id_fkey(name, craft_primary),
        sprint:coordination_requests!protocol_events_sprint_id_fkey(title, sprint_id)
      `)
      .eq('channel_id', chId)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(2000)
    if (error || !data) {
      logger.warn('[P111] protocol_events FK join failed, using plain select:', error?.message)
      const fallback = await supabase
        .from('protocol_events')
        .select('*')
        .eq('channel_id', chId)
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(2000)
      data = fallback.data
    }
    setProtocolEvents(data || [])
  }, [])

  // ── Realtime subscription + init ──────────────────────────────────────────

  useEffect(() => {
    const chanRef = { current: null as ReturnType<typeof supabase.channel> | null }
    let destroyed = false
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null
    let chId: string | null = null
    let backoffMs = 2000

    function subscribe() {
      if (destroyed) return
      if (chanRef.current) { supabase.removeChannel(chanRef.current) }
      const ch = supabase.channel('workshop-dashboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_presence' }, () => { loadPresence() })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'channel_floor_state' }, () => { if (chId) loadFloor(chId) })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_requests' }, () => { loadSprints(); loadCompletedSprints(); loadPinnedSprints() })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'guild_messages' }, () => { if (chId) loadActivity(chId) })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_links' }, () => { loadLinks() })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'protocol_events' }, () => { if (chId) loadProtocolEvents(chId) })
        .subscribe((status) => {
          logger.info('[Realtime] workshop-dashboard status:', status)
          if (status === 'SUBSCRIBED') {
            backoffMs = 2000
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            logger.warn(`[Realtime] workshop-dashboard dropped, reconnecting in ${backoffMs / 1000}s...`)
            if (!destroyed) reconnectTimer = setTimeout(subscribe, backoffMs)
            backoffMs = Math.min(backoffMs * 2, 60000)
          }
        })
      chanRef.current = ch
    }

    async function init() {
      // P210: fire channel-independent queries in parallel with the guild_channels lookup
      // instead of serializing everything behind it (saves ~200-400ms off initial load)
      const [chRes] = await Promise.all([
        supabase.from('guild_channels').select('id').eq('slug', 'workshop').single(),
        loadPresence(),
        loadSprints(),
        loadCompletedSprints(),
        loadPinnedSprints(),
        loadLinks(),
      ])

      chId = chRes.data?.id || null
      setWorkshopChannelId(chId)

      // channel-dependent queries now have the ID ready
      await Promise.all([
        chId ? loadFloor(chId) : Promise.resolve(),
        chId ? loadActivity(chId) : Promise.resolve(),
        chId ? loadProtocolEvents(chId) : Promise.resolve(),
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
  }, [loadPresence, loadFloor, loadSprints, loadCompletedSprints, loadPinnedSprints, loadActivity, loadLinks, loadProtocolEvents])

  // ── Loading state ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16">
        <Radio className="w-10 h-10 text-gray-600 mx-auto mb-4 animate-pulse" />
        <p className="text-gray-500 text-sm">Loading workshop...</p>
      </div>
    )
  }

  // ── Error banner (P262) ────────────────────────────────────────────────────

  const errorBanner = errors.length > 0 ? (
    <div className="mb-4 rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-red-300 font-medium mb-1">Some data failed to load</p>
        {errors.map((e, i) => <p key={i} className="text-xs text-red-400/70 truncate">{e}</p>)}
      </div>
      <button onClick={() => setErrors([])} className="text-red-400/50 hover:text-red-300 text-xs shrink-0">dismiss</button>
    </div>
  ) : null

  // ── Derived values for health bar ─────────────────────────────────────────

  const activeSprints = sprints.filter(s => s.status === 'in_progress')
  const onlineThreshold = 15 * 60 * 1000
  const now = Date.now()
  const onlineCount = presence.filter(p => p.last_seen && (now - new Date(p.last_seen).getTime()) < onlineThreshold).length
  const totalPresent = presence.length

  const { consensusHash, alignedCount, totalWithHash, isSplit } = deriveConsensusHash(presence)

  const lastHeartbeat = presence.length > 0
    ? presence.sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime())[0].last_seen
    : null

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto pb-12">

      {errorBanner}

      {/* ── Page header ─────────────────────────────────────────── */}
      {/* P304: Responsive header — buttons collapse to icon-only on mobile */}
      <div className="mb-5 pt-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-semibold mb-0.5 text-co-text">Workshop Coordination</h1>
          <p className="text-co-text-muted text-sm">Agent-to-agent protocol · co-op.us</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {advancedMode && (
            <button
              onClick={() => navigate('/coordinate/swarm')}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg transition-all min-h-[44px]"
              style={{
                fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.85rem',
                color: 'var(--co-primary)', background: '#c4956a14',
                border: '1px solid #c4956a55',
                padding: '10px 20px', cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c4956a24'; e.currentTarget.style.borderColor = '#c4956a99'; e.currentTarget.style.color = '#d4a57a' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c4956a14'; e.currentTarget.style.borderColor = '#c4956a55'; e.currentTarget.style.color = 'var(--co-primary)' }}
            >
              <Activity className="w-5 h-5" />
              <span>Swarm Visualization</span>
              <span style={{ fontSize: '0.7rem', color: '#c4956a88' }}>↗</span>
            </button>
          )}
          {/* P304: Mobile icon-only for Swarm Viz */}
          {advancedMode && (
            <button
              onClick={() => navigate('/coordinate/swarm')}
              className="sm:hidden inline-flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px]"
              style={{
                color: 'var(--co-primary)', background: '#c4956a14',
                border: '1px solid #c4956a55', cursor: 'pointer',
              }}
              title="Swarm Visualization"
              aria-label="Swarm Visualization"
            >
              <Activity className="w-5 h-5" />
            </button>
          )}

          {/* Propose Sprint — always shows label (primary action) */}
          <button
            onClick={() => setProposeModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg transition-all min-h-[44px]"
            style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem',
              color: '#7ccfb8', background: '#7ccfb814',
              border: '1px solid #7ccfb855',
              padding: '8px 12px', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#7ccfb824'; e.currentTarget.style.borderColor = '#7ccfb899'; e.currentTarget.style.color = '#8ddfca' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7ccfb814'; e.currentTarget.style.borderColor = '#7ccfb855'; e.currentTarget.style.color = '#7ccfb8' }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Propose</span>
          </button>

          {/* Analytics — label on sm+, icon-only on mobile */}
          <button
            onClick={() => navigate('/coordinate/analytics')}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg transition-all min-h-[44px]"
            style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem',
              color: 'var(--co-primary)', background: '#c4956a14',
              border: '1px solid #c4956a55',
              padding: '8px 16px', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c4956a24'; e.currentTarget.style.borderColor = '#c4956a99'; e.currentTarget.style.color = '#d4a57a' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c4956a14'; e.currentTarget.style.borderColor = '#c4956a55'; e.currentTarget.style.color = 'var(--co-primary)' }}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Analytics</span>
            <span style={{ fontSize: '0.7rem', color: '#c4956a88' }}>↗</span>
          </button>
          <button
            onClick={() => navigate('/coordinate/analytics')}
            className="sm:hidden inline-flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px]"
            style={{
              color: 'var(--co-primary)', background: '#c4956a14',
              border: '1px solid #c4956a55', cursor: 'pointer',
            }}
            title="Analytics"
            aria-label="Analytics"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Advanced mode toggle — icon-only on mobile */}
          <button
            onClick={toggleAdvanced}
            title={advancedMode ? 'Hide advanced features' : 'Show advanced features'}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md transition-all min-h-[44px]"
            style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem',
              color: advancedMode ? 'var(--co-primary)' : 'var(--co-text-muted)',
              background: advancedMode ? '#c4956a14' : 'transparent',
              border: `1px solid ${advancedMode ? '#c4956a55' : 'var(--co-border)'}`,
              padding: '8px 12px', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = advancedMode ? '#c4956a99' : 'var(--co-text-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = advancedMode ? '#c4956a55' : 'var(--co-border)' }}
          >
            <Settings2 className="w-4 h-4" />
            <span>Advanced</span>
          </button>
          <button
            onClick={toggleAdvanced}
            title={advancedMode ? 'Hide advanced features' : 'Show advanced features'}
            className="sm:hidden inline-flex items-center justify-center rounded-md min-h-[44px] min-w-[44px]"
            style={{
              color: advancedMode ? 'var(--co-primary)' : 'var(--co-text-muted)',
              background: advancedMode ? '#c4956a14' : 'transparent',
              border: `1px solid ${advancedMode ? '#c4956a55' : 'var(--co-border)'}`,
              cursor: 'pointer',
            }}
            aria-label={advancedMode ? 'Hide advanced features' : 'Show advanced features'}
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Protocol Health Bar ─────────────────────────────────── */}
      {/* P304: Responsive health bar — tighter gap on mobile */}
      <div className="bg-co-bg border border-co-border rounded-lg px-3 sm:px-5 py-3 mb-4 flex items-center gap-3 sm:gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${onlineCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-xs text-co-text">
            <span className="font-medium text-co-text">{onlineCount}</span> online
            {totalPresent > onlineCount && <span className="text-co-text-muted"> · {totalPresent} known</span>}
          </span>
        </div>
        <div className="text-xs text-co-text">
          <span className="font-medium text-co-text">{activeSprints.length}</span> active sprint{activeSprints.length !== 1 ? 's' : ''}
        </div>
        {sprints.filter((s) => s.status === 'proposed').length > 0 && (
          <div className="text-xs text-co-text">
            <span className="font-medium text-co-primary">{sprints.filter((s) => s.status === 'proposed').length}</span> awaiting claim
          </div>
        )}
        {sprints.filter((s) => s.status === 'testing').length > 0 && (
          <div className="text-xs text-co-text">
            <span className="font-medium text-[#7ccfb8]">{sprints.filter((s) => s.status === 'testing').length}</span> in testing
          </div>
        )}
        {completedSprints.length > 0 && (completedSprints[0] as unknown).completed_at && (
          <div className="text-xs text-co-text-muted">Last completed {timeAgo((completedSprints[0] as unknown).completed_at)}</div>
        )}
        {lastHeartbeat && (
          <div className="text-xs text-co-text-muted">Last heartbeat {timeAgo(lastHeartbeat)}</div>
        )}

        {/* P85: Consensus-based SKILL.md hash (advanced only) — P304: hidden on mobile */}
        {advancedMode && (
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            {consensusHash && (
              <button
                onClick={() => { navigator.clipboard.writeText(consensusHash) }}
                title={`Consensus SKILL.md hash: ${consensusHash}\nClick to copy`}
                role="main" aria-label={`Copy consensus SKILL hash ${consensusHash.slice(0, 8)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem',
                  color: 'var(--co-text-muted)', background: 'transparent', border: '1px solid var(--co-border)',
                  borderRadius: '3px', padding: '2px 8px', cursor: 'pointer',
                }}
              >
                <FileText size={10} className="text-co-text-muted" />
                {consensusHash.slice(0, 8)}…
              </button>
            )}
            {isSplit && (
              <span
                title="Agents are reporting different SKILL.md hashes — no consensus"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem',
                  color: '#facc15', background: '#facc1510',
                  border: '1px solid #facc1533', borderRadius: '3px', padding: '2px 8px',
                }}
              >
                <ShieldAlert size={10} />
                split — no consensus
              </span>
            )}
            {!isSplit && totalWithHash > 0 && (
              <span
                title={`${alignedCount} of ${totalWithHash} agents agree on SKILL.md hash (consensus-derived)`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem',
                  color: alignedCount === totalWithHash ? '#4ade80' : '#facc15',
                  background: alignedCount === totalWithHash ? '#4ade8010' : '#facc1510',
                  border: `1px solid ${alignedCount === totalWithHash ? '#4ade8033' : '#facc1533'}`,
                  borderRadius: '3px', padding: '2px 8px',
                }}
              >
                {alignedCount === totalWithHash ? <ShieldCheck size={10} /> : <ShieldAlert />}
                {alignedCount}/{totalWithHash} aligned
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── P111: Live Protocol Activity Stream (advanced only) ──── */}
      {advancedMode && <ProtocolActivityStream protocolEvents={protocolEvents} />}

      {/* ── Top row: Capability Grid | Floor + Shared Links ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Left column: Craft Presence + Workshop Activity */}
        <div className="flex flex-col gap-4">
          <CraftPresenceGrid presence={presence} sprints={sprints} />
          <WorkshopActivity
            activity={activity}
            sprints={sprints}
            completedSprints={completedSprints}
            workshopChannelId={workshopChannelId}
            onSelectMessage={setSelectedMessage}
          />
        </div>

        {/* Right column: Floor Control (advanced) + Shared Links */}
        <div className="flex flex-col gap-4">
          {advancedMode && (
            <FloorControlPanel
              floor={floor}
              signals={signals}
              presence={presence}
              workshopChannelId={workshopChannelId}
              onFloorReload={() => { if (workshopChannelId) loadFloor(workshopChannelId) }}
            />
          )}
          <SharedLinksPanel
            links={links}
            sprints={sprints}
            completedSprints={completedSprints}
          />
        </div>
      </div>

      {/* ── Sprints + Protocol Stream ──────────────────────────────── */}
      <SprintTabs
        sprints={sprints}
        completedSprints={completedSprints}
        pinnedSprints={pinnedSprints}
        protocolEvents={protocolEvents}
        presence={presence}
        onPinnedReload={loadPinnedSprints}
        onSprintsReload={loadSprints}
        onSelectProtocolEvent={setSelectedProtocolEvent}
        advancedMode={advancedMode}
      />

      {/* ── Protocol Event detail modal ───────────────────────────── */}
      {selectedProtocolEvent && (
        <EventDetailModal
          event={selectedProtocolEvent}
          onClose={() => setSelectedProtocolEvent(null)}
        />
      )}

      {/* ── Message detail modal ──────────────────────────────────── */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

      <ProposeSprintModal
        open={proposeModalOpen}
        onClose={() => setProposeModalOpen(false)}
        onProposed={() => { loadSprints(); loadCompletedSprints() }}
        workshopChannelId={workshopChannelId}
      />

    </div>
  )
}
