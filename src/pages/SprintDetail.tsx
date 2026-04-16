// @ts-nocheck
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { logger } from '../lib/logger'
import {
  ArrowLeft, CheckCircle, Circle, Pause,
  FileText, Clock, Pin, PinOff, AlertTriangle,
} from 'lucide-react'
import { SprintTimeline } from '../components/SprintTimeline'
import { formatDuration, computeSprintDurations } from '../utils/duration'
import {
  splitRetrospective, timeAgo, formatTimestamp,
  parseComplexity, renderMarkdown,
  COMPLEXITY_LABELS, COMPLEXITY_COLORS,
  LAYER_COLORS, STATUS_STEPS, STATUS_LABELS, STATUS_COLORS,
} from './sprint-detail/SprintDetailHelpers'
import { SprintDiscussion } from './sprint-detail/SprintDiscussion'
import { SprintProtocolLog } from './sprint-detail/SprintProtocolLog'
import { SprintProgressPanel } from './sprint-detail/SprintProgressPanel'

export function SprintDetail() {
const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [sprint, setSprint] = useState<any>(null)
  const [discussion, setDiscussion] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [protocolEvents, setProtocolEvents] = useState<any[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const addError = useCallback((context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err)
    logger.error(`[SprintDetail] ${context}:`, err)
    setErrors(prev => {
      const entry = `${context}: ${msg}`
      return prev.includes(entry) ? prev : [...prev.slice(-4), entry]
    })
  }, [])

  const loadSprint = useCallback(async () => {
    if (!id) return
    try {
      const { data, error } = await supabase
        .from('coordination_requests')
        .select(`
          *,
          proposer:participants!coordination_requests_proposer_id_fkey(name),
          acceptor:participants!coordination_requests_accepted_by_fkey(name),
          claimer:participants!coordination_requests_claimed_by_fkey(name)
        `)
        .eq('id', id)
        .single()
      if (error) throw error
      setSprint(data)
    } catch (err) { addError('Load sprint', err) }
  }, [id, addError])

  const loadProtocolEvents = useCallback(async () => {
    if (!id) return
    try {
      const { data, error } = await supabase
        .from('protocol_events')
        .select(`
          *,
          agent:participants!protocol_events_agent_id_fkey(name, craft_primary)
        `)
        .eq('sprint_id', id)
        .order('created_at', { ascending: true })
      if (error) throw error
      setProtocolEvents(data || [])
    } catch (err) { addError('Load protocol events', err) }
  }, [id, addError])

  const loadDiscussion = useCallback(async () => {
    if (!id) return
    try {
      // Load linked messages via sprint_messages join table
      const { data: links, error: linksError } = await supabase
        .from('sprint_messages')
        .select('id, label, linked_at, message_id')
        .eq('sprint_id', id)
        .order('linked_at', { ascending: true })
      if (linksError) throw linksError

      if (!links || links.length === 0) {
        setDiscussion([])
        return
      }

      const messageIds = links.map((l: any) => l.message_id)
      const { data: messages, error: msgsError } = await supabase
        .from('guild_messages')
        .select('id, content, title, body, created_at, is_agent, agent_name, sender_id, participants!inner(name, is_agent, craft_primary)')
        .in('id', messageIds)
        .order('created_at', { ascending: true })
      if (msgsError) throw msgsError

      const linkMap = new Map(links.map((l: any) => [l.message_id, l]))
      const merged = (messages || []).map((m: any) => ({
        ...m,
        label: linkMap.get(m.id)?.label || null,
        linked_at: linkMap.get(m.id)?.linked_at,
      }))

      setDiscussion(merged)
    } catch (err) { addError('Load discussion', err) }
  }, [id, addError])

  useEffect(() => {
    async function init() {
      await Promise.all([loadSprint(), loadDiscussion(), loadProtocolEvents()])
      setLoading(false)
    }
    init()

    // Realtime subscription for updates
    const chan = supabase.channel(`sprint-detail-${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coordination_requests', filter: `id=eq.${id}` }, () => loadSprint())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sprint_messages', filter: `sprint_id=eq.${id}` }, () => loadDiscussion())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'protocol_events', filter: `sprint_id=eq.${id}` }, () => loadProtocolEvents())
      .subscribe()

    return () => { supabase.removeChannel(chan) }
  }, [id, loadSprint, loadDiscussion, loadProtocolEvents])

  if (loading) {
    return (
      <div role="main" aria-label="Sprint Details" className="max-w-4xl mx-auto text-center py-16">
        <Circle className="w-8 h-8 text-gray-600 mx-auto mb-4 animate-pulse" />
        <p className="text-gray-500 text-sm">Loading sprint...</p>
      </div>
    )
  }

  if (!sprint) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-gray-500">Sprint not found</p>
        <button onClick={() => navigate('/coordinate')} className="text-co-primary text-sm mt-2 hover:underline">
          Back to Workshop
        </button>
      </div>
    )
  }

  const currentIdx = STATUS_STEPS.indexOf(sprint.status)
  const layers: number[] = Array.isArray(sprint.layers) ? sprint.layers : []
  const roles: Record<string, string> = sprint.proposed_roles || {}
  const progressLog: unknown[] = sprint.progress_log || []
  const capReqs: string[] = sprint.capability_requirements || []
  const isPaused = !!sprint.paused_at
  const isComplete = sprint.status === 'completed'
  const isInProgress = sprint.status === 'in_progress'
  const statusColor = STATUS_COLORS[sprint.status] || 'var(--co-text-muted)'
  const latestProgress = progressLog[progressLog.length - 1]

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

  return (
    <div className="max-w-4xl mx-auto pb-12">

      {errorBanner}

      {/* Back link */}
      <button
        onClick={() => navigate('/coordinate')}
        className="flex items-center gap-2 text-sm text-co-text-muted hover:text-co-primary transition-colors mb-4 pt-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-mono-plex text-xs">Workshop</span>
      </button>

      {/* Sprint header card */}
      <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden mb-4">
        <div className="px-6 pt-6 pb-5">

          {/* Top row: ID + status + layers */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {sprint.sprint_id && (
              <span className="text-sm px-2.5 py-1 rounded-full shrink-0"
                style={{ fontFamily: 'IBM Plex Mono, monospace', background: '#c4956a18', color: 'var(--co-primary)', fontWeight: 500 }}>
                {sprint.sprint_id}
              </span>
            )}
            {sprint.complexity && (
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.65rem',
                color: 'var(--co-text-muted)',
                background: '#ffffff0a',
                borderRadius: '3px',
                padding: '2px 6px',
                letterSpacing: '0.04em',
              }}>
                {sprint.complexity}
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded"
              style={{ fontFamily: 'IBM Plex Mono, monospace', background: statusColor + '22', color: statusColor, letterSpacing: '0.05em' }}>
              {STATUS_LABELS[sprint.status] || sprint.status.replace('_', ' ')}
              {isPaused ? ' · paused' : ''}
            </span>
            {layers.map((l) => {
              const lc = LAYER_COLORS[l]
              return lc ? (
                <span key={l} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: lc.bg + '1a', color: lc.bg, fontFamily: 'IBM Plex Mono, monospace' }}>
                  {lc.label}
                </span>
              ) : null
            })}
            <div className="ml-auto flex items-center gap-2">
              {isPaused && <Pause className="w-4 h-4 text-[#fb923c]" />}
              {isComplete && <CheckCircle className="w-4 h-4 text-[#7ccfb8]" />}
              {/* P170: Pin/Unpin button */}
              {sprint.status === 'pinned' ? (
                <button
                  title="Unpin this sprint"
                  onClick={async () => {
                    const restoredStatus = sprint.prev_status || 'proposed'
                    await supabase.from('coordination_requests')
                      .update({ status: restoredStatus, prev_status: null })
                      .eq('id', sprint.id)
                    loadSprint()
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded transition-colors hover:bg-[#a78bfa22]"
                  style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#a78bfa', border: '1px solid #a78bfa33' }}
                >
                  <PinOff className="w-3.5 h-3.5" /> Unpin
                </button>
              ) : sprint.status !== 'completed' && sprint.status !== 'cancelled' ? (
                <button
                  title="Pin this sprint"
                  onClick={async () => {
                    await supabase.from('coordination_requests')
                      .update({ prev_status: sprint.status, status: 'pinned' })
                      .eq('id', sprint.id)
                    loadSprint()
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded transition-colors hover:bg-[#a78bfa22]"
                  style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', border: '1px solid var(--co-border)' }}
                >
                  <Pin className="w-3.5 h-3.5" /> Pin
                </button>
              ) : null}
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Cormorant', serif",
            fontSize: '1.6rem',
            fontWeight: 600,
            color: 'var(--co-text)',
            lineHeight: 1.2,
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>
            {sprint.title || 'Untitled'}
          </h1>

          {/* Roadmap breadcrumb */}
          {(sprint.roadmap_phase || sprint.roadmap_id) && (
            <p style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.7rem',
              color: 'var(--co-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}>
              {sprint.roadmap_phase || sprint.roadmap_id}
            </p>
          )}

          {/* Status pipeline */}
          <div className="flex gap-0.5 mb-5">
            {STATUS_STEPS.map((step, i) => {
              const color = STATUS_COLORS[step]
              const isActive = step === sprint.status
              const isFilled = i <= currentIdx
              return (
                <div key={step} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-1 rounded-full"
                    style={{ background: isFilled ? (isActive ? color : color + '55') : 'var(--co-surface)' }} />
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: isActive ? color : 'var(--co-border)',
                    fontWeight: isActive ? 500 : 400,
                  }}>
                    {STATUS_LABELS[step] || step.replace('_', ' ')}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Description */}
          {sprint.description && (
            <div className="mb-4">
              <div
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: '0.92rem',
                  color: 'var(--co-text-muted)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
                className={showFullDescription ? '' : 'line-clamp-4'}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(sprint.description) }}
              />
              {sprint.description.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(v => !v)}
                  className="text-xs mt-1 hover:text-co-primary transition-colors font-mono-plex text-co-text-muted"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {sprint.proposer?.name && (
              <div className="rounded p-2.5" >
                <div className="ws-label text-co-text-muted">Proposed by</div>
                <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color: 'var(--co-primary)' }}>{sprint.proposer.name}</div>
                <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">{timeAgo(sprint.created_at)}</div>
              </div>
            )}
            {sprint.claimer?.name && (
              <div className="rounded p-2.5" >
                <div className="ws-label text-co-text-muted">Claimed by</div>
                <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color: '#8bbfff' }}>{sprint.claimer.name}</div>
                {sprint.claimed_at && <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">{timeAgo(sprint.claimed_at)}</div>}
              </div>
            )}
            <div className="rounded p-2.5" >
              <div className="ws-label text-co-text-muted">Last updated</div>
              <div className="font-mono-plex text-[0.82rem] text-co-text-secondary">{timeAgo(sprint.updated_at)}</div>
              <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">{formatTimestamp(sprint.updated_at)}</div>
            </div>
            {(() => {
              const cx = parseComplexity(sprint.description)
              if (!cx) return null
              const color = COMPLEXITY_COLORS[cx] || 'var(--co-text-muted)'
              return (
                <div className="rounded p-2.5" >
                  <div className="ws-label text-co-text-muted">Complexity</div>
                  <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color }}>{COMPLEXITY_LABELS[cx]}</div>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: color + '88' }}>{cx}</div>
                </div>
              )
            })()}
            {discussion.length > 0 && (
              <div className="rounded p-2.5" >
                <div className="ws-label text-co-text-muted">Discussion</div>
                <div className="font-mono-plex text-[0.82rem] text-co-text-secondary">{discussion.length} messages</div>
                <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">latest {timeAgo(discussion[discussion.length - 1]?.created_at)}</div>
              </div>
            )}
          </div>

          {/* P168: Sprint Timeline + Lifecycle Timing */}
          {sprint.created_at && (
            <div className="mb-4">
              <SprintTimeline
                createdAt={sprint.created_at}
                claimedAt={sprint.claimed_at}
                completedAt={sprint.completed_at}
                status={sprint.status}
              />
              {(() => {
                const d = computeSprintDurations(sprint.created_at, sprint.claimed_at, sprint.completed_at)
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div className="rounded p-2.5" >
                      <div className="ws-label text-co-text-muted">Total Duration</div>
                      <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color: 'var(--co-text)' }}>{formatDuration(d.total)}</div>
                      <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">{d.isRunning ? 'in progress' : 'completed'}</div>
                    </div>
                    {d.wait !== null && (
                      <div className="rounded p-2.5" >
                        <div className="ws-label text-co-text-muted">Wait Time</div>
                        <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color: 'var(--co-text-muted)' }}>{formatDuration(d.wait)}</div>
                        <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">proposed → claimed</div>
                      </div>
                    )}
                    {d.execution !== null && (
                      <div className="rounded p-2.5" >
                        <div className="ws-label text-co-text-muted">Execution Time</div>
                        <div className="font-serif-cormorant" style={{ fontSize: '0.95rem', color: 'var(--co-primary)' }}>{formatDuration(d.execution)}</div>
                        <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">claimed → {d.isRunning ? 'now' : 'completed'}</div>
                      </div>
                    )}
                    {sprint.created_at && (
                      <div className="rounded p-2.5" >
                        <div className="ws-label text-co-text-muted">Proposed</div>
                        <div className="font-mono-plex text-[0.82rem] text-co-text-secondary">
                          {new Date(sprint.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {sprint.completed_at && (
                          <div className="font-mono-plex text-[0.6rem] text-co-text-placeholder">
                            → {new Date(sprint.completed_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          )}

          {/* Reference URLs (inline) */}
          {(sprint.reference_urls || []).length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <FileText className="w-3 h-3" />
              {(sprint.reference_urls as string[]).map((url: string, i: number) => {
                const label = url.replace(/^https?:\/\/(github\.com\/)?/, '').replace(/\/blob\/main\//, '/').replace(/\/$/, '')
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-co-primary transition-colors"
                    style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: 'var(--co-text-muted)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    {label.length > 60 ? label.slice(0, 57) + '...' : label}
                  </a>
                )
              })}
            </div>
          )}

          {/* Roles */}
          {Object.keys(roles).length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {Object.entries(roles).map(([name, role]) => (
                <span key={name} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem', color: 'var(--co-text-muted)' }}>
                  <span className="text-co-text-secondary">{name}</span> · {role as string}
                </span>
              ))}
            </div>
          )}

          {/* Capability requirements */}
          {capReqs.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>needs</span>
              {capReqs.map((c: string) => (
                <span key={c} className="text-xs px-1.5 py-0.5 rounded border"
                  style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', borderColor: 'var(--co-border)', color: 'var(--co-text-muted)' }}>
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Live execution strip */}
        {(isInProgress || isPaused) && latestProgress && (
          <div className="px-6 py-3 border-t" >
            {(latestProgress as any).percent_complete != null && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>progress</span>
                  <span className="font-mono-plex text-[0.65rem] text-co-primary">{(latestProgress as any).percent_complete}%</span>
                </div>
                <div className="h-1 w-full rounded-full" >
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(latestProgress as any).percent_complete}%`, background: 'var(--co-primary)' }} />
                </div>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-co-primary mt-2 shrink-0 animate-pulse" />
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{(latestProgress as any).message}"
              </p>
            </div>
          </div>
        )}

        {/* Completion proof */}
        {sprint.completion_proof && (
          <div className="px-6 py-3 border-t" style={{ borderColor: '#7ccfb833', background: 'var(--co-bg)' }}>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#7ccfb8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              Completion proof
            </p>
            <a
              href={sprint.completion_proof.startsWith('http') ? sprint.completion_proof : '#'}
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'var(--co-text)', wordBreak: 'break-all' }}
              className="hover:text-co-primary transition-colors"
            >
              {sprint.completion_proof}
            </a>
            {sprint.result_summary && (() => {
              const { summary, retrospective } = splitRetrospective(sprint.result_summary)
              return (
                <>
                  <div
                    style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.6, marginTop: '8px' }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }}
                  />
                  {retrospective && (
                    <div style={{ marginTop: '12px', padding: '12px 16px', background: 'var(--co-surface)', borderLeft: '2px solid #c4956a', borderRadius: '0 4px 4px 0' }}>
                      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        Retrospective
                      </div>
                      <div
                        style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.84rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.7, fontStyle: 'italic' }}
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(retrospective) }}
                      />
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        )}
      </div>

      {/* Discussion thread */}
      <SprintDiscussion discussion={discussion} />

      {/* Execution & negotiation logs */}
      <SprintProgressPanel sprint={sprint} />

      {/* Protocol Stream + event detail modal */}
      <SprintProtocolLog protocolEvents={protocolEvents} />

    </div>
  )
}
