// @ts-nocheck
/** P234: Extracted from SprintTabs.tsx. P304: Mobile card layout. */

import { STATUS_COLORS, STATUS_LABELS, LAYER_COLORS } from './constants'

// ── Compact Sprint Grid ───────────────────────────────────────────────────────

export function CompactSprintGrid({ sprints, onNavigate }: { sprints: unknown[]; onNavigate: (id: string) => void }) {
  return (
    <div className="space-y-1.5">
      {/* P304: Desktop grid header — hidden on mobile */}
      <div className="hidden sm:grid gap-2 px-3 pb-1 border-b border-co-border"
        style={{
          gridTemplateColumns: '5rem 5.5rem 1fr 6rem 5rem 4rem',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.6rem', color: 'var(--co-border)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
        <span>ID</span><span>Status</span><span>Title</span>
        <span>Claimer</span><span>Layer(s)</span>
        <span style={{ textAlign: 'right' }}>Progress</span>
      </div>

      {sprints.map((s: Record<string, unknown>) => {
        const statusColor = STATUS_COLORS[s.status] || 'var(--co-text-muted)'
        const layers: number[] = Array.isArray(s.layers) ? s.layers : []
        const progressLog: unknown[] = s.progress_log || []
        const latestPct = progressLog.length > 0 ? progressLog[progressLog.length - 1]?.percent_complete : null
        const isPaused = !!s.paused_at
        const isInProgress = s.status === 'in_progress'

        return (
          <div key={String(s.id)}>
            {/* P304: Mobile card layout */}
            <div
              className="sm:hidden px-3 py-3 rounded-lg transition-colors hover:bg-co-surface cursor-pointer min-h-[44px]"
              onClick={() => onNavigate((s as string).id)}
              style={{
                background: '#111',
                border: `1px solid ${isInProgress ? '#c4956a22' : isPaused ? '#fb923c22' : 'var(--co-surface)'}`,
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-primary)', fontWeight: 600 }}>
                    {s.sprint_id || s.id?.slice(0, 6) || '—'}
                  </span>
                  {s.complexity && <span style={{ fontSize: '0.75rem', color: 'var(--co-text-muted)', background: '#ffffff08', borderRadius: '2px', padding: '0px 4px' }}>{s.complexity}</span>}
                </div>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: statusColor }}>
                    {STATUS_LABELS[s.status] || s.status.replace('_', ' ')}{isPaused ? ' ·pause' : ''}
                  </span>
                </span>
              </div>
              <div className="text-sm font-semibold text-co-text mb-1.5 line-clamp-2" style={{ letterSpacing: '-0.01em' }}>
                {s.title || 'Untitled'}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: s.claimer?.name ? '#8bbfff' : 'var(--co-text-muted)' }}>
                  {s.claimer?.name || s.proposer?.name || '—'}
                </span>
                {latestPct != null && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-12 rounded-full overflow-hidden" style={{ background: '#282828' }}>
                      <div className="h-full rounded-full" style={{ width: `${latestPct}%`, background: 'var(--co-primary)' }} />
                    </div>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-primary)' }}>{latestPct}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop grid row */}
            <div
              className="hidden sm:grid gap-2 px-3 py-2.5 rounded-lg items-center transition-colors hover:bg-co-surface cursor-pointer"
              onClick={() => onNavigate((s as string).id)}
              style={{
                gridTemplateColumns: '5rem 5.5rem 1fr 6rem 5rem 4rem',
                background: '#111',
                border: `1px solid ${isInProgress ? '#c4956a22' : isPaused ? '#fb923c22' : 'var(--co-surface)'}`,
              }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {s.sprint_id || s.id?.slice(0, 6) || '—'}
                {s.complexity && <span style={{ fontSize: '0.75rem', color: 'var(--co-text-muted)', background: '#ffffff08', borderRadius: '2px', padding: '0px 3px', letterSpacing: '0.04em' }}>{s.complexity}</span>}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColor }} />
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: statusColor, letterSpacing: '0.04em' }}>
                  {STATUS_LABELS[s.status] || s.status.replace('_', ' ')}{isPaused ? ' ·pause' : ''}
                </span>
                {s.status === 'proposed' && s.created_at && (() => {
                  const ageInDays = Math.floor((Date.now() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24))
                  return ageInDays >= 14 ? (
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#f87171', background: '#f871710c', borderRadius: '3px', padding: '1px 4px', marginLeft: '4px' }}>
                      ⚠ {ageInDays}d
                    </span>
                  ) : null
                })()}
              </span>
              <span className="truncate" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--co-text)', letterSpacing: '-0.01em' }}>
                {s.title || 'Untitled'}
              </span>
              <span className="truncate" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: s.claimer?.name ? '#8bbfff' : 'var(--co-border)' }}>
                {s.claimer?.name || s.proposer?.name || '—'}
              </span>
              <div className="flex gap-0.5 flex-wrap">
                {layers.length === 0
                  ? <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: 'var(--co-text-muted)' }}>—</span>
                  : layers.map((l) => {
                      const lc = LAYER_COLORS[l]
                      return lc ? (
                        <span key={l} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', background: lc.bg + '1a', color: lc.bg, padding: '1px 4px', borderRadius: '3px' }}>
                          {lc.label.slice(0, 3)}
                        </span>
                      ) : null
                    })
                }
              </div>
              <div style={{ textAlign: 'right' }}>
                {latestPct != null ? (
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="h-1 w-12 rounded-full overflow-hidden" style={{ background: '#282828' }}>
                      <div className="h-full rounded-full" style={{ width: `${latestPct}%`, background: 'var(--co-primary)' }} />
                    </div>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-primary)' }}>{latestPct}%</span>
                  </div>
                ) : (
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>—</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
