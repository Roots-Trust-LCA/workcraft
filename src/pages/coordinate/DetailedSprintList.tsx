// @ts-nocheck
import type { CoordinationProposal } from '../../types/coordination'
/** P234: Extracted from SprintTabs.tsx */

import React from 'react'
import { useWorkshop } from '../../lib/workshop-context'
import {
  ChevronDown, ChevronUp, Circle, Pause, FileText, CheckCircle, Pin, Clock,
} from 'lucide-react'
import { SprintTimeline } from '../../components/SprintTimeline'
import { formatLifecycleSummary } from '../../utils/duration'
import {
  STATUS_STEPS, STATUS_COLORS, STATUS_SECTION_LABELS, STATUS_LABELS, LAYER_COLORS,
  COMPLEXITY_COLORS, COMPLEXITY_LABELS, CRAFT_SYMBOLS,
  timeAgo, getLastActivity, parseComplexity, summaryWithoutRetrospective, GITHUB_REPO_RE,
} from './constants'

// ── Detailed Sprint List ──────────────────────────────────────────────────────

export function DetailedSprintList({
  sprints, presence, expanded, setExpanded, onNavigate, now,
  onPinnedReload, onSprintsReload,
}: {
  sprints: CoordinationProposal[]; presence: unknown[]; expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onNavigate: (id: string) => void; now: number;
  onPinnedReload?: () => void; onSprintsReload?: () => void;
}) {
  const { supabase } = useWorkshop()
  return (
    <div className="space-y-5">
      {sprints.map((s: unknown, idx: number) => {
        const prevStatus = idx > 0 ? sprints[idx - 1].status : null
        const showDivider = idx > 0 && (s as any).status !== prevStatus
        const dividerEl = showDivider ? (
          <div key={`divider-${(s as any).id}`} className="flex items-center gap-3 pt-2 pb-1">
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: STATUS_COLORS[(s as any).status] || 'var(--co-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {STATUS_SECTION_LABELS[s.status] || (s as any).status}
            </span>
            <div className="flex-1 h-px" style={{ background: `${STATUS_COLORS[(s as any).status] || 'var(--co-border)'}33` }} />
          </div>
        ) : null

        const isExp = expanded[(s as any).id]
        const currentIdx = STATUS_STEPS.indexOf((s as any).status as unknown)
        const layers: number[] = Array.isArray(s.layers) ? (s as any).layers : []
        const roles: Record<string, string> = (typeof s.proposed_roles === 'object' && s.proposed_roles !== null && !Array.isArray(s.proposed_roles)) ? (s as any).proposed_roles : {}
        const progressLog: unknown[] = (s as any).progress_log || []
        const negotiationLog: unknown[] = (s as any).negotiation_log || []
        const capReqs: string[] = (s as any).capability_requirements || []
        const isPaused = !!(s as any).paused_at
        const isComplete = (s as any).status === 'completed'
        const isInProgress = (s as any).status === 'in_progress'
        const statusColor = STATUS_COLORS[(s as any).status] || 'var(--co-text-muted)'
        const latestProgress = progressLog[progressLog.length - 1]
        const lastNeg = negotiationLog[negotiationLog.length - 1]
        const claimedMs = s.claimed_at ? now - new Date((s as any).claimed_at).getTime() : null
        const claimedMin = claimedMs ? Math.round(claimedMs / 60000) : null

        return (
          <div key={(s as any).id}>
            {idx === 0 && s.status && STATUS_SECTION_LABELS[(s as any).status] && (
              <div className="flex items-center gap-3 pb-2">
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: STATUS_COLORS[(s as any).status] || 'var(--co-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {STATUS_SECTION_LABELS[(s as any).status]}
                </span>
                <div className="flex-1 h-px" style={{ background: `${STATUS_COLORS[(s as any).status] || 'var(--co-border)'}33` }} />
              </div>
            )}
            {dividerEl}
            <div
              className="border rounded-lg overflow-hidden transition-colors cursor-pointer"
              onClick={() => onNavigate((s as any).id)}
              style={{
                borderColor: isInProgress ? '#c4956a44' : isPaused ? '#fb923c44' : isComplete ? '#7ccfb844' : 'var(--co-border)',
                background: '#111',
              }}
            >
              {/* P304: Card header — responsive padding */}
              <div className="px-3 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
                  {(s as any).sprint_id && (
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ fontFamily: 'IBM Plex Mono, monospace', background: '#c4956a18', color: 'var(--co-primary)' }}>
                      {(s as any).sprint_id}
                    </span>
                  )}
                  {(s as any).complexity && (
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', background: '#ffffff08', borderRadius: '2px', padding: '0px 3px', letterSpacing: '0.04em' }}>
                      {(s as any).complexity}
                    </span>
                  )}
                  {/* P164: Bilateral sprint badge */}
                  {s.proposer_id && s.claimed_by && s.proposer_id !== (s as any).claimed_by && (
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#a78bfa', background: '#a78bfa18', border: '1px solid #a78bfa33', borderRadius: '3px', padding: '1px 6px', letterSpacing: '0.04em' }}>
                      bilateral
                    </span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded" style={{ fontFamily: 'IBM Plex Mono, monospace', background: statusColor + '22', color: statusColor, letterSpacing: '0.05em' }}>
                    {STATUS_LABELS[s.status] || (s as any).status.replace('_', ' ')}{isPaused ? ' · paused' : ''}
                  </span>
                  {s.status === 'proposed' && (s as any).created_at && (() => {
                    const ageInDays = Math.floor((Date.now() - new Date((s as any).created_at).getTime()) / (1000 * 60 * 60 * 24))
                    return ageInDays >= 14 ? (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#f87171', background: '#f871710c', borderRadius: '3px', padding: '1px 4px' }}>
                        ⚠ {ageInDays}d
                      </span>
                    ) : null
                  })()}
                  {layers.map((l) => {
                    const lc = LAYER_COLORS[l]
                    return lc ? (
                      <span key={l} className="text-xs px-2 py-0.5 rounded-full" style={{ background: lc.bg + '1a', color: lc.bg, fontFamily: 'IBM Plex Mono, monospace' }}>
                        {lc.label}
                      </span>
                    ) : null
                  })}
                  <div className="flex items-center gap-1.5 ml-auto">
                    {isPaused && <Pause className="w-3.5 h-3.5 text-[#fb923c]" />}
                    {isComplete && <CheckCircle className="w-3.5 h-3.5 text-[#7ccfb8]" />}
                    {/* P170: Pin button — only for non-completed, non-cancelled, non-pinned sprints */}
                    {s.status !== 'completed' && s.status !== 'cancelled' && (s as any).status !== 'pinned' && (
                      <button
                        title="Pin this sprint"
                        onClick={async (e) => {
                          e.stopPropagation()
                          await supabase.from('coordination_requests')
                            .update({ prev_status: (s as any).status, status: 'pinned' })
                            .eq('id', (s as any).id)
                          onPinnedReload?.()
                          onSprintsReload?.()
                        }}
                        className="text-co-text-muted hover:text-[#a78bfa] transition-colors p-0.5"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); setExpanded(prev => ({ ...prev, [(s as any).id]: !isExp })) }}
                      className="text-co-text-muted hover:text-co-text-secondary transition-colors">
                      {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h3 className="font-serif-cormorant" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--co-text)', lineHeight: 1.2, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {(s as any).title || 'Untitled'}
                </h3>

                {(s.roadmap_phase || (s as any).roadmap_id) && (
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                    {s.roadmap_phase || (s as any).roadmap_id}
                  </p>
                )}

                {((s as any).reference_urls || []).length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <FileText className="w-3 h-3 text-co-text-muted shrink-0" />
                    {((s as any).reference_urls as string[]).map((refUrl: string, ri: number) => {
                      const repoMatch = refUrl.match(GITHUB_REPO_RE)
                      const label = repoMatch ? repoMatch[1] : refUrl.replace(/^https?:\/\//, '').slice(0, 40)
                      return (
                        <a key={ri} href={refUrl} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="hover:text-co-primary transition-colors"
                          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', background: '#111', border: '1px solid var(--co-border)', borderRadius: '3px', padding: '1px 6px', textDecoration: 'none' }}>
                          {label}
                        </a>
                      )
                    })}
                  </div>
                )}

                {/* P304: Status pipeline — horizontal scroll on mobile */}
                <div className="flex gap-0.5 mb-4 overflow-x-auto pb-1">
                  {STATUS_STEPS.map((step, i) => {
                    const color = STATUS_COLORS[step]
                    const isActive = step === (s as any).status
                    const isFilled = i <= currentIdx
                    return (
                      <div key={step} className="flex-1 min-w-[3rem] flex flex-col items-center gap-1">
                        <div className="w-full h-1 rounded-full" style={{ background: isFilled ? (isActive ? color : color + '55') : 'var(--co-surface)' }} />
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: isActive ? color : 'var(--co-border)', fontWeight: isActive ? 500 : 400, whiteSpace: 'nowrap' }}>
                          {STATUS_LABELS[step] || step.replace('_', ' ')}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* P160: Sprint Timeline Visualization */}
                <SprintTimeline
                  createdAt={(s as any).created_at}
                  claimedAt={(s as any).claimed_at}
                  completedAt={(s as any).completed_at}
                  status={(s as any).status}
                />

                {/* P168: Sprint lifecycle duration */}
                {(s as any).created_at && (
                  <div className="flex items-center gap-2 mb-3" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem' }}>
                    <Clock className="w-3 h-3 text-co-text-muted" />
                    <span className="text-co-text-muted">{formatLifecycleSummary(s.created_at, s.claimed_at, (s as any).completed_at)}</span>
                  </div>
                )}

                {/* Who / when */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {(s as any).proposer?.name && (
                    <span className="font-mono-plex text-[0.7rem] text-co-text-muted">
                      proposed by <span className="text-co-primary">{(s as any).proposer.name}</span>
                      <span className="ml-1 text-co-text-muted">{timeAgo((s as any).created_at)}</span>
                    </span>
                  )}
                  {(s as any).claimer?.name && (
                    <span className="font-mono-plex text-[0.7rem] text-co-text-muted">
                      claimed by <span style={{ color: '#8bbfff' }}>{(s as any).claimer.name}</span>
                      {claimedMin != null && <span className="ml-1 text-co-text-muted">{claimedMin}m ago</span>}
                    </span>
                  )}
                  {(() => {
                    const lastAct = getLastActivity(s)
                    return lastAct && lastAct !== (s as any).created_at ? (
                      <span className="font-mono-plex text-[0.7rem] text-co-text-muted">
                        last activity <span className="text-co-text-muted">{timeAgo(lastAct)}</span>
                      </span>
                    ) : null
                  })()}
                  {(() => {
                    const cx = parseComplexity((s as any).description)
                    return cx ? (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', background: (COMPLEXITY_COLORS[cx] || 'var(--co-text-muted)') + '1a', color: COMPLEXITY_COLORS[cx] || 'var(--co-text-muted)', padding: '1px 6px', borderRadius: '3px', letterSpacing: '0.05em' }}>
                        {cx} — {COMPLEXITY_LABELS[cx] || cx}
                      </span>
                    ) : null
                  })()}
                </div>

                {capReqs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>needs</span>
                    {capReqs.map((c: string) => (
                      <span key={c} className="text-xs px-1.5 py-0.5 rounded border" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', borderColor: 'var(--co-border)', color: 'var(--co-text-muted)' }}>{c}</span>
                    ))}
                  </div>
                )}

                {Object.keys(roles).length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {Object.entries(roles).map(([name, role]) => {
                      const agentPresence = presence.find((pr: Record<string, unknown>) => pr.participants?.name?.toLowerCase() === name.toLowerCase())
                      const craft = agentPresence?.participants?.craft_primary
                      const sym = craft ? CRAFT_SYMBOLS[craft] : ''
                      return (
                        <span key={name} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
                          {sym && <span style={{ color: 'var(--co-primary)', marginRight: '3px' }}>{sym}</span>}
                          <span className="text-co-text-secondary">{name}</span> · {typeof role === 'string' ? role : JSON.stringify(role)}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Live execution strip */}
              {(isInProgress || isPaused) && (
                <div className="px-3 sm:px-5 py-3 border-t" >
                  {latestProgress?.percent_complete != null && (
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>execution progress</span>
                        <span className="font-mono-plex text-[0.65rem] text-co-primary">{(latestProgress as any).percent_complete}%</span>
                      </div>
                      <div className="h-1 w-full rounded-full" >
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(latestProgress as any).percent_complete}%`, background: 'var(--co-primary)' }} />
                      </div>
                    </div>
                  )}
                  {latestProgress && (
                    <div className="flex items-start gap-2">

                      <span className="w-1 h-1 rounded-full bg-co-primary mt-2 shrink-0 animate-pulse" />
                      <div>
                        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5 }}>
                          "{(latestProgress as any).message}"
                        </p>
                        <span className="font-mono-plex text-[0.62rem] text-co-text-muted">
                          {(latestProgress as any).timestamp ? timeAgo((latestProgress as any).timestamp) : ''}
                        </span>
                      </div>
                    </div>
                  )}
                  {isPaused && (
                    <div className="flex items-center gap-2 mt-2">
                      <Pause className="w-3 h-3 text-[#fb923c]" />
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: '#fb923c' }}>
                        paused {s.paused_at ? timeAgo((s as any).paused_at) : ''}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Negotiation summary */}
              {lastNeg && !isComplete && (
                <div className="px-3 sm:px-5 py-3 border-t" >
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    Negotiation · latest
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="text-xs px-1.5 py-0.5 rounded shrink-0" style={{ fontFamily: 'IBM Plex Mono, monospace', background: (lastNeg as any).action === 'accepted' ? '#7ccfb822' : (lastNeg as any).action === 'declined' ? '#ef444422' : '#a78bfa22', color: (lastNeg as any).action === 'accepted' ? '#7ccfb8' : (lastNeg as any).action === 'declined' ? '#ef4444' : '#a78bfa' }}>
                      {(lastNeg as any).action}
                    </span>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{(lastNeg as any).message}"
                    </p>
                  </div>
                </div>
              )}

              {/* Completion proof */}
              {(s as any).completion_proof && (
                <div className="px-3 sm:px-5 py-3 border-t" style={{ borderColor: '#7ccfb833', background: 'var(--co-bg)' }}>
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#7ccfb8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    ✓ Completion proof
                  </p>
                  <a href={s.completion_proof.startsWith('http') ? (s as any).completion_proof : '#'} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'var(--co-text)', wordBreak: 'break-all', textDecoration: 'none' }}
                    className="hover:text-co-primary transition-colors">
                    {(s as any).completion_proof}
                  </a>
                  {(s as any).completed_at && (
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', marginTop: '4px' }}>
                      completed {timeAgo((s as any).completed_at)}
                      {s.claimed_at && ` · ${Math.round((new Date(s.completed_at).getTime() - new Date((s as any).claimed_at).getTime()) / 60000)}m total`}
                    </p>
                  )}
                  {(s as any).result_summary && (
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.6, marginTop: '8px' }}>
                      {summaryWithoutRetrospective((s as any).result_summary)}
                    </p>
                  )}
                </div>
              )}

              {/* Expanded logs */}
              {isExp && (
                <div className="border-t" >
                  {progressLog.length > 0 && (
                    <div className="px-3 sm:px-5 py-4">
                      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                        Execution log · {progressLog.length} {progressLog.length === 1 ? 'entry' : 'entries'}
                      </p>
                      <div className="space-y-3">
                        {progressLog.map((entry: unknown, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <Circle className="w-2 h-2 text-co-primary" />
                              {i < progressLog.length - 1 && <div className="w-px flex-1 min-h-4" />}
                            </div>
                            <div className="pb-2">
                              {entry.percent_complete != null && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-primary)', marginRight: '8px' }}>{(entry as any).percent_complete}%</span>}
                              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text)', fontWeight: 300, lineHeight: 1.6, display: 'inline' }}>
                                {(entry as any).message}
                              </p>
                              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-border)', marginLeft: '8px' }}>
                                {entry.timestamp ? timeAgo((entry as any).timestamp) : ''}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {negotiationLog.length > 0 && (
                    <div className="px-3 sm:px-5 py-4 border-t" style={{ borderColor: 'var(--co-surface)' }}>
                      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                        Negotiation log · {negotiationLog.length} {negotiationLog.length === 1 ? 'exchange' : 'exchanges'}
                      </p>
                      <div className="space-y-3">
                        {negotiationLog.map((entry: unknown, i: number) => (
                          <div key={i} className="pl-3 border-l" style={{ borderColor: (entry as any).action === 'accepted' ? '#7ccfb844' : 'var(--co-text-muted)' }}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-1.5 py-0.5 rounded" style={{ fontFamily: 'IBM Plex Mono, monospace', background: entry.action === 'accepted' ? '#7ccfb822' : entry.action === 'declined' ? '#ef444422' : 'var(--co-border)', color: entry.action === 'accepted' ? '#7ccfb8' : (entry as any).action === 'declined' ? '#ef4444' : 'var(--co-text-muted)' }}>
                                {(entry as any).action}
                              </span>
                              {entry.timestamp && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-border)' }}>{timeAgo((entry as any).timestamp)}</span>}
                            </div>
                            {entry.message && <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text-muted)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6 }}>"{(entry as any).message}"</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {((s as any).injected_context || []).length > 0 && (
                    <div className="px-3 sm:px-5 py-4 border-t" style={{ borderColor: 'var(--co-surface)' }}>
                      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#a78bfa88', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        Steward context
                      </p>
                      {((s as any).injected_context || []).map((ctx: unknown, i: number) => (
                        <div key={i} className="pl-3 border-l mb-2" style={{ borderColor: '#a78bfa44' }}>
                          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.6 }}>{(ctx as any).message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
