// @ts-nocheck
/**
 * SprintTabs — Tabbed sprint views: Pinned / Active / Completed / Protocol Stream.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, CheckCircle, Activity, Pin, PinOff,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { CoordinationProposal } from '../../types/coordination'
import {
  LAYER_COLORS, STATUS_LABELS, STATUS_COLORS,
  STATUS_SECTION_LABELS, SPRINT_STATUS_ORDER,
  TIER_META, WORK_TYPE_LABELS,
  SPRINT_LIFECYCLE_TYPES,
  timeAgo, summaryWithoutRetrospective,
} from './constants'
import { SprintTimeline } from '../../components/SprintTimeline'
import { SprintTimingAnalysis } from '../../components/SprintTimingAnalysis'
import { formatLifecycleSummary } from '../../utils/duration'
import { BarChart2, Clock } from 'lucide-react'
import { CompactSprintGrid } from './CompactSprintGrid'
import { DetailedSprintList } from './DetailedSprintList'
import { ProtocolStreamTab } from './ProtocolStreamTab'
import { usePageTitle } from '../../hooks/usePageTitle'


// ── Types ────────────────────────────────────────────────────────────────────

interface SprintTabsProps {
  sprints: CoordinationProposal[]
  completedSprints: CoordinationProposal[]
  pinnedSprints: CoordinationProposal[]
  protocolEvents: unknown[]
  presence: unknown[]
  onPinnedReload: () => void
  onSprintsReload: () => void
  onSelectProtocolEvent: (ev: unknown) => void
  advancedMode?: boolean
}

// ── Constants ────────────────────────────────────────────────────────────────

const SPRINT_PAGE_SIZE = 15
const COMPLETED_PAGE_SIZE = 10
const PROTOCOL_PAGE_SIZE = 12

// P305: Increased padding and font for mobile touch targets
const filterSelectStyle: React.CSSProperties = {
  background: '#111',
  border: '1px solid var(--co-border)',
  borderRadius: '6px',
  color: 'var(--co-text-muted)',
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: '0.72rem',
  padding: '8px 10px',
  cursor: 'pointer',
  letterSpacing: '0.04em',
  minHeight: '36px',
  WebkitAppearance: 'none',
}

// ── Component ────────────────────────────────────────────────────────────────

export function SprintTabs({
  sprints, completedSprints, pinnedSprints, protocolEvents, presence,
  onPinnedReload, onSprintsReload, onSelectProtocolEvent,
  advancedMode = false,
}: SprintTabsProps) {
  usePageTitle('Sprint Tabs')

  const navigate = useNavigate()

  // Tab state
  const [activeTab, setActiveTab] = useState<'pinned' | 'sprints' | 'completed' | 'protocol' | 'timing'>('sprints')
  const [compactSprints, setCompactSprints] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Sprint pagination + filters
  const [sprintPage, setSprintPage] = useState(0)
  const [activeLayerFilter, setActiveLayerFilter] = useState<number | null>(null)
  const [activeClaimerFilter, setActiveClaimerFilter] = useState<string>('')
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('')
  const [activeTagFilter, setActiveTagFilter] = useState<string>('')

  // Completed pagination + filters
  const [completedPage, setCompletedPage] = useState(0)
  const [completedWorkTypeFilter, setCompletedWorkTypeFilter] = useState<string>('')
  const [completedTierFilter, setCompletedTierFilter] = useState<string>('')

  // Protocol pagination + filter
  const [protocolPage, setProtocolPage] = useState(0)
  const [protocolEventTypeFilter, setProtocolEventTypeFilter] = useState<string>('all')

  // ── Derived sprint data ────────────────────────────────────────────────────

  const statusSortedSprints = [...sprints].sort((a: CoordinationProposal, b: CoordinationProposal) =>
    (SPRINT_STATUS_ORDER[a.status] ?? 10) - (SPRINT_STATUS_ORDER[b.status] ?? 10)
  )
  const filteredActiveSprints = statusSortedSprints.filter((s) => {
    if (activeLayerFilter !== null && !s.layers?.includes(String(activeLayerFilter))) return false
    if (activeClaimerFilter && s.claimed_by !== activeClaimerFilter) return false
    if (activeStatusFilter && s.status !== activeStatusFilter) return false
    if (activeTagFilter && (!s.tags || !s.tags.includes(activeTagFilter))) return false
    return true
  })
  const sprintPages = Math.ceil(filteredActiveSprints.length / SPRINT_PAGE_SIZE)
  const pagedSprints = filteredActiveSprints.slice(sprintPage * SPRINT_PAGE_SIZE, (sprintPage + 1) * SPRINT_PAGE_SIZE)

  // ── Derived protocol data ─────────────────────────────────────────────────

  const filteredProtocolEvents = protocolEventTypeFilter === 'all'
    ? protocolEvents
    : protocolEventTypeFilter === 'sprint_lifecycle'
      ? protocolEvents.filter((e: Record<string, unknown>) => SPRINT_LIFECYCLE_TYPES.has((e as string).event_type))
      : protocolEvents.filter((e: Record<string, unknown>) => e.event_type === protocolEventTypeFilter)
  const protocolPages = Math.ceil(filteredProtocolEvents.length / PROTOCOL_PAGE_SIZE)
  const pagedProtocol = filteredProtocolEvents.slice(protocolPage * PROTOCOL_PAGE_SIZE, (protocolPage + 1) * PROTOCOL_PAGE_SIZE)

  const now = Date.now()

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-co-bg border border-co-border rounded-lg mb-4 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-co-border overflow-x-auto">
        <button onClick={() => setActiveTab('pinned')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm transition-colors whitespace-nowrap ${
            activeTab === 'pinned' ? 'text-[#a78bfa] border-b-2 border-[#a78bfa] -mb-px bg-co-surface' : 'text-co-text-muted hover:text-co-text'
          }`}>
          <Pin className="w-4 h-4" />
          Pinned Work
          {pinnedSprints.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-co-surface-hover text-co-text-secondary">{pinnedSprints.length}</span>}
        </button>
        <button onClick={() => setActiveTab('sprints')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm transition-colors whitespace-nowrap ${
            activeTab === 'sprints' ? 'text-co-primary border-b-2 border-co-primary -mb-px bg-co-surface' : 'text-co-text-muted hover:text-co-text'
          }`}>
          <Zap className="w-4 h-4" />
          Active Sprints
          {sprints.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-co-surface-hover text-co-text-secondary">{sprints.length}</span>}
        </button>
        <button onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm transition-colors whitespace-nowrap ${
            activeTab === 'completed' ? 'text-[#7ccfb8] border-b-2 border-[#7ccfb8] -mb-px bg-co-surface' : 'text-co-text-muted hover:text-co-text'
          }`}>
          <CheckCircle className="w-4 h-4" />
          Completed
          {completedSprints.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-co-surface-hover text-co-text-secondary">{completedSprints.length}</span>}
        </button>
        {advancedMode && (
          <button onClick={() => setActiveTab('protocol')}
            className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'protocol' ? 'text-co-primary border-b-2 border-co-primary -mb-px bg-co-surface' : 'text-co-text-muted hover:text-co-text'
            }`}>
            <Activity className="w-4 h-4" />
            Protocol Stream
            {protocolEvents.length > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-co-surface-hover text-co-text-secondary">{protocolEvents.length}</span>}
          </button>
        )}
        {advancedMode && (
          <button onClick={() => setActiveTab('timing')}
            className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === 'timing' ? 'text-[#a78bfa] border-b-2 border-[#a78bfa] -mb-px bg-co-surface' : 'text-co-text-muted hover:text-co-text'
            }`}>
            <BarChart2 className="w-4 h-4" />
            Timing
          </button>
        )}
        {activeTab === 'sprints' && (
          <button onClick={() => setCompactSprints(c => !c)}
            className="ml-auto mr-3 flex items-center gap-1.5 px-3 py-1.5 my-auto rounded text-xs transition-colors"
            style={{
              background: compactSprints ? '#c4956a22' : 'var(--co-surface)',
              color: compactSprints ? 'var(--co-primary)' : 'var(--co-text-muted)',
              border: `1px solid ${compactSprints ? '#c4956a44' : 'var(--co-border)'}`,
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.04em',
            }}>
            {compactSprints ? '⊞ detailed' : '⊟ compact'}
          </button>
        )}
      </div>

      <div className="p-4">
        {/* ── Pinned Work tab ─── */}
        {activeTab === 'pinned' && (
          pinnedSprints.length === 0 ? (
            <div className="py-8 text-center">
              <Pin className="w-8 h-8 mx-auto mb-3 text-co-text-muted" />
              <p className="text-co-text-muted text-sm">No pinned work yet</p>
              <p className="text-co-text-muted text-xs mt-1">Pin standing directives, foundational docs, or long-running commitments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pinnedSprints.map((s) => {
                const sprintLabel = s.sprint_id || s.id.slice(0, 6)
                const proposerName = s.proposer?.name || '—'
                const desc = s.description || ''
                return (
                  <div key={s.id} className="rounded-lg p-4 transition-colors" style={{ background: '#111', border: '1px solid #a78bfa22' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: '#a78bfa18', color: '#a78bfa', fontFamily: 'IBM Plex Mono, monospace' }}>
                            {sprintLabel}
                          </span>
                          <Pin className="w-3 h-3 text-[#a78bfa]" />
                        </div>
                        <div
                          className="text-sm mb-2 cursor-pointer hover:text-co-text transition-colors font-serif-cormorant" style={{ color: 'var(--co-text)', fontSize: '0.95rem' }}
                          onClick={() => navigate(`/sprint/${s.id}`)}
                        >
                          {s.title}
                        </div>
                        {desc && (
                          <p className="text-xs text-co-text-muted leading-relaxed line-clamp-2">
                            {desc.length > 180 ? desc.slice(0, 177) + '…' : desc}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2.5" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
                          {proposerName !== '—' && <span>by {proposerName}</span>}
                          {s.tags && s.tags.length > 0 && <span>{s.tags.slice(0, 3).join(' · ')}</span>}
                        </div>
                      </div>
                      <button
                        title="Unpin"
                        onClick={async () => {
                          const restoredStatus = (s as unknown).prev_status || 'proposed'
                          await supabase.from('coordination_requests')
                            .update({ status: restoredStatus, prev_status: null })
                            .eq('id', s.id)
                          onPinnedReload()
                          onSprintsReload()
                        }}
                        className="flex-shrink-0 p-1.5 rounded transition-colors hover:bg-co-surface-hover"
                        style={{ color: 'var(--co-border)' }}
                      >
                        <PinOff className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        )}

        {/* ── Active Sprints tab ─── */}
        {activeTab === 'sprints' && (
          sprints.length === 0 ? (
            <p className="text-co-text-muted text-sm py-4 text-center">No active sprints</p>
          ) : (
            <>
              {/* Filter bar */}
              {(() => {
                const layerCounts: Record<number, number> = {}
                const claimerCounts: Record<string, number> = {}
                const statusCounts: Record<string, number> = {}
                statusSortedSprints.forEach((s: Record<string, unknown>) => {
                  if (s.layers && Array.isArray(s.layers)) {
                    s.layers.forEach((layer: number) => { layerCounts[layer] = (layerCounts[layer] || 0) + 1 })
                  }
                  if (s.claimed_by) claimerCounts[s.claimed_by] = (claimerCounts[s.claimed_by] || 0) + 1
                  if (s.status) statusCounts[s.status] = (statusCounts[s.status] || 0) + 1
                })
                const tagCounts: Record<string, number> = {}
                statusSortedSprints.forEach((s: Record<string, unknown>) => {
                  if (s.tags && Array.isArray(s.tags)) {
                    s.tags.forEach((tag: string) => { tagCounts[tag] = (tagCounts[tag] || 0) + 1 })
                  }
                })
                const hasTags = Object.keys(tagCounts).length > 0

                return (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 border-b border-co-border" style={{ background: 'var(--co-bg)' }}>
                    <span className="w-full sm:w-auto" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Filter:
                    </span>
                    <select value={activeLayerFilter ?? ''} onChange={e => { setActiveLayerFilter(e.target.value ? parseInt(e.target.value) : null); setSprintPage(0) }} style={filterSelectStyle}>
                      <option value="">All Layers ({statusSortedSprints.length})</option>
                      {[1, 2, 3, 4, 5, 6, 7].map(layer => {
                        const count = layerCounts[layer] || 0
                        return count === 0 ? null : <option key={layer} value={layer}>Layer {layer} ({count})</option>
                      })}
                    </select>
                    <select value={activeClaimerFilter} onChange={e => { setActiveClaimerFilter(e.target.value); setSprintPage(0) }} style={filterSelectStyle}>
                      <option value="">All Claimers ({statusSortedSprints.length})</option>
                      {Object.entries(claimerCounts).sort(([, a], [, b]) => b - a).map(([claimerId, count]) => {
                        const agent = presence.find((p: Record<string, unknown>) => p.agent_id === claimerId)
                        const agentName = agent?.participants?.name || 'Unknown'
                        return <option key={claimerId} value={claimerId}>{agentName} ({count})</option>
                      })}
                    </select>
                    <select value={activeStatusFilter} onChange={e => { setActiveStatusFilter(e.target.value); setSprintPage(0) }} style={filterSelectStyle}>
                      <option value="">All Statuses ({statusSortedSprints.length})</option>
                      {Object.entries(statusCounts).sort(([a], [b]) => (SPRINT_STATUS_ORDER[a] ?? 10) - (SPRINT_STATUS_ORDER[b] ?? 10)).map(([status, count]) => (
                        <option key={status} value={status}>{STATUS_LABELS[status] || status} ({count})</option>
                      ))}
                    </select>
                    {hasTags && (
                      <select value={activeTagFilter} onChange={e => { setActiveTagFilter(e.target.value); setSprintPage(0) }} style={filterSelectStyle}>
                        <option value="">All Tags</option>
                        {Object.entries(tagCounts).sort(([, a], [, b]) => b - a).map(([tag, count]) => (
                          <option key={tag} value={tag}>{tag} ({count})</option>
                        ))}
                      </select>
                    )}
                    {(activeLayerFilter !== null || activeClaimerFilter || activeStatusFilter || activeTagFilter) && (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-primary)', background: '#c4956a15', padding: '2px 6px', borderRadius: '3px', marginLeft: 'auto' }}>
                        {filteredActiveSprints.length} / {statusSortedSprints.length} shown
                      </span>
                    )}
                  </div>
                )
              })()}

              {filteredActiveSprints.length === 0 ? (
                <p className="text-co-text-muted text-sm py-4 text-center">No sprints match the current filters</p>
              ) : compactSprints ? (
                <CompactSprintGrid sprints={pagedSprints} onNavigate={(id) => navigate(`/sprint/${id}`)} />
              ) : (
                <DetailedSprintList
                  sprints={pagedSprints}
                  presence={presence}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  onNavigate={(id) => navigate(`/sprint/${id}`)}
                  now={now}
                  onPinnedReload={onPinnedReload}
                  onSprintsReload={onSprintsReload}
                />
              )}

              {/* P305: Fixed duplicate className, responsive */}
              {sprints.length > 0 && sprintPages > 1 && (
                <div className="flex items-center justify-between mt-5 pt-4 border-t">
                  <button onClick={() => setSprintPage(p => Math.max(0, p - 1))} disabled={sprintPage === 0}
                    className="px-3 py-2 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted min-h-[36px]">← Prev</button>
                  <span className="font-mono-plex text-xs text-co-text-muted">{sprintPage + 1} / {sprintPages}</span>
                  <button onClick={() => setSprintPage(p => Math.min(sprintPages - 1, p + 1))} disabled={sprintPage === sprintPages - 1}
                    className="px-3 py-2 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted min-h-[36px]">Next →</button>
                </div>
              )}
            </>
          )
        )}

        {/* ── Completed Sprints tab ─── */}
        {activeTab === 'completed' && (() => {
          const filteredCompleted = completedSprints.filter((s) => {
            if (completedWorkTypeFilter && s.work_type !== completedWorkTypeFilter) return false
            if (completedTierFilter && s.visibility_tier !== completedTierFilter) return false
            return true
          })
          const completedPages = Math.ceil(filteredCompleted.length / COMPLETED_PAGE_SIZE)
          const pagedCompleted = filteredCompleted.slice(completedPage * COMPLETED_PAGE_SIZE, (completedPage + 1) * COMPLETED_PAGE_SIZE)

          const workTypeCounts: Record<string, number> = {}
          const tierCounts: Record<string, number> = {}
          completedSprints.forEach((s: Record<string, unknown>) => {
            if (s.work_type) workTypeCounts[s.work_type] = (workTypeCounts[s.work_type] || 0) + 1
            if (s.visibility_tier) tierCounts[s.visibility_tier] = (tierCounts[s.visibility_tier] || 0) + 1
          })

          return completedSprints.length === 0 ? (
            <div className="py-8 text-center text-co-text-muted text-sm">No completed sprints yet</div>
          ) : (
            <div>
              {/* P305: Responsive completed filter bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 border-b border-co-border" style={{ background: 'var(--co-bg)' }}>
                <span className="w-full sm:w-auto" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-border)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filter</span>
                <select value={completedTierFilter} onChange={e => { setCompletedTierFilter(e.target.value); setCompletedPage(0) }} style={filterSelectStyle}>
                  <option value="">All tiers ({completedSprints.length})</option>
                  {(['tier-1-foundational', 'tier-2-evolutionary', 'tier-3-operational', 'tier-4-deprecated'] as const).map(t => (
                    tierCounts[t] ? <option key={t} value={t}>{TIER_META[t].short} {TIER_META[t].label} ({tierCounts[t]})</option> : null
                  ))}
                </select>
                <select value={completedWorkTypeFilter} onChange={e => { setCompletedWorkTypeFilter(e.target.value); setCompletedPage(0) }} style={filterSelectStyle}>
                  <option value="">All types</option>
                  {Object.keys(workTypeCounts).sort().map(wt => (
                    <option key={wt} value={wt}>{WORK_TYPE_LABELS[wt] || wt} ({workTypeCounts[wt]})</option>
                  ))}
                </select>
                {(completedWorkTypeFilter || completedTierFilter) && (
                  <>
                    <button onClick={() => { setCompletedWorkTypeFilter(''); setCompletedTierFilter(''); setCompletedPage(0) }}
                      style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      clear ×
                    </button>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', marginLeft: 'auto' }}>
                      {filteredCompleted.length} result{filteredCompleted.length !== 1 ? 's' : ''}
                    </span>
                  </>
                )}
              </div>
              <div className="divide-y divide-[#1e1e1e]">
                {filteredCompleted.length === 0 ? (
                  <div className="py-6 text-center text-co-text-muted text-sm">No sprints match the selected filters</div>
                ) : pagedCompleted.map((s) => {
                  const layers: string[] = Array.isArray(s.layers) ? s.layers : []
                  const sprintLabel = s.sprint_id || (() => { const m = s.title?.match(/^([A-Z]\d{2}[a-z]?|[A-Z]\d+)\b/); return m ? m[1] : s.id?.slice(0, 6) })()
                  const tierMeta = s.visibility_tier ? TIER_META[s.visibility_tier] : null
                  return (
                    <div key={s.id} className="px-3 sm:px-5 py-4 hover:bg-co-surface transition-colors cursor-pointer" onClick={() => navigate(`/sprint/${s.id}`)}>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2 shrink-0 pt-0.5">
                          <CheckCircle className="w-3.5 h-3.5" style={{ color: '#7ccfb8' }} />
                          {sprintLabel && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#7ccfb8' }}>{sprintLabel}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-serif-cormorant" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--co-text)', letterSpacing: '-0.01em' }}>
                              {s.title}
                            </span>
                            {tierMeta && (
                              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', background: tierMeta.color + '18', color: tierMeta.color, padding: '1px 5px', borderRadius: '3px', border: `1px solid ${tierMeta.color}33`, letterSpacing: '0.04em' }}>
                                {tierMeta.short}
                              </span>
                            )}
                            {s.work_type && (
                              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', background: '#ffffff08', color: 'var(--co-text-muted)', padding: '1px 5px', borderRadius: '3px', letterSpacing: '0.04em' }}>
                                {WORK_TYPE_LABELS[s.work_type] || s.work_type}
                              </span>
                            )}
                            {/* P164: Bilateral sprint badge */}
                            {s.proposer_id && s.claimed_by && s.proposer_id !== s.claimed_by && (
                              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: '#a78bfa', background: '#a78bfa18', border: '1px solid #a78bfa33', borderRadius: '3px', padding: '1px 6px', letterSpacing: '0.04em' }}>
                                bilateral
                              </span>
                            )}
                            {layers.map((l: string) => {
                              const lc = LAYER_COLORS[Number(l)]
                              return lc ? (
                                <span key={l} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', background: lc.bg + '1a', color: lc.bg, padding: '1px 5px', borderRadius: '3px' }}>
                                  {lc.label.slice(0, 3)}
                                </span>
                              ) : null
                            })}
                          </div>
                          {s.result_summary && (
                            <p style={{ fontSize: '0.82rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.55 }} className="mb-2 line-clamp-2">
                              {summaryWithoutRetrospective(s.result_summary)}
                            </p>
                          )}
                          {/* P160: Sprint Timeline for completed sprints */}
                          <div className="mb-2">
                            <SprintTimeline
                              createdAt={s.created_at}
                              claimedAt={s.claimed_at}
                              completedAt={s.completed_at}
                              status={s.status}
                            />
                          </div>
                          {/* P305: Responsive metadata — bumped font, gap-y for wrapping */}
                          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
                            {/* P168: Completion duration */}
                            {s.created_at && s.completed_at && (
                              <span className="text-co-text-muted">
                                <Clock className="w-3 h-3 inline-block mr-1" style={{ verticalAlign: '-2px' }} />
                                {formatLifecycleSummary(s.created_at, s.claimed_at, s.completed_at)}
                              </span>
                            )}
                            {s.claimer?.name && <span>by {s.claimer.name}</span>}
                            {s.completed_at && <span>{timeAgo(s.completed_at)}</span>}
                            {s.roadmap_phase && <span>{s.roadmap_phase}</span>}
                            {s.completion_proof && (
                              <a href={s.completion_proof} target="_blank" rel="noopener noreferrer"
                                style={{ color: '#7ccfb8' }} onClick={e => e.stopPropagation()}>
                                proof ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* P305: Fixed duplicate className, responsive padding */}
              {completedPages > 1 && (
                <div className="flex items-center justify-between px-3 sm:px-5 py-3 border-t border-co-border">
                  <button onClick={() => setCompletedPage(p => Math.max(0, p - 1))} disabled={completedPage === 0}
                    className="px-3 py-2 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted min-h-[36px]">← Prev</button>
                  <span className="font-mono-plex text-xs text-co-text-muted">{completedPage + 1} / {completedPages}</span>
                  <button onClick={() => setCompletedPage(p => Math.min(completedPages - 1, p + 1))} disabled={completedPage === completedPages - 1}
                    className="px-3 py-2 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted min-h-[36px]">Next →</button>
                </div>
              )}
            </div>
          )
        })()}

        {/* ── Timing Analysis tab ─── */}
        {activeTab === 'timing' && (
          <SprintTimingAnalysis sprints={completedSprints} />
        )}

        {/* ── Protocol Stream tab ─── */}
        {activeTab === 'protocol' && (
          <ProtocolStreamTab
            protocolEvents={protocolEvents}
            filteredProtocolEvents={filteredProtocolEvents}
            pagedProtocol={pagedProtocol}
            protocolEventTypeFilter={protocolEventTypeFilter}
            setProtocolEventTypeFilter={(v) => { setProtocolEventTypeFilter(v); setProtocolPage(0) }}
            protocolPage={protocolPage}
            setProtocolPage={setProtocolPage}
            protocolPages={protocolPages}
            onSelectProtocolEvent={onSelectProtocolEvent}
            onNavigate={(path) => navigate(path)}
          />
        )}
      </div>
    </div>
  )
}
