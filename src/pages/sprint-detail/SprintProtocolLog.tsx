// @ts-nocheck
/** P242: Extracted from SprintDetail.tsx */
import { useState } from 'react'
import { Activity, X } from 'lucide-react'
import {
  EVENT_LABELS, EVENT_COLORS, LAYER_COLORS,
  formatTimestamp, protocolEventSummary,
} from './SprintDetailHelpers'


interface SprintProtocolLogProps {
  protocolEvents: unknown[]
}

export function SprintProtocolLog({ protocolEvents }: SprintProtocolLogProps) {
const [selectedProtocolEvent, setSelectedProtocolEvent] = useState<any>(null)

  if (protocolEvents.length === 0) return null

  return (
    <>
      {/* ── Protocol Stream (sprint-scoped, P108) ────────────────── */}
      <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden mb-4">
        <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--co-border)' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--co-primary)' }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Protocol Stream
          </span>
          <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
            {protocolEvents.length} event{protocolEvents.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--co-surface)' }}>
          {protocolEvents.map((ev: any) => {
            const color = EVENT_COLORS[ev.event_type] || 'var(--co-text-muted)'
            const label = EVENT_LABELS[ev.event_type] || ev.event_type
            const payload = ev.payload || {}
            const summary = protocolEventSummary(ev)
            const isTesting = ['sprint_entered_testing', 'sprint_testing_approved', 'sprint_testing_reopened'].includes(ev.event_type as string)
            const isHeartbeat = ev.event_type === 'capability_broadcast'
            const layers: number[] = (payload as any).layers || []

            // Heartbeats: ultra-compact in sprint context
            if (isHeartbeat) {
              return (
                <div key={String(ev.id)} className="flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-co-surface" style={{ opacity: 0.5 }}
                  onClick={() => setSelectedProtocolEvent(ev)}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)' }}>·</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--co-text-muted)' }}>
                    {ev.agent?.name} heartbeat
                  </span>
                  <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-border)' }}>
                    {formatTimestamp(ev.created_at as string)}
                  </span>
                </div>
              )
            }

            return (
              <div
                key={String(ev.id)}
                className="px-4 py-3 cursor-pointer hover:bg-co-surface transition-colors"
                style={{
                  borderLeft: `2px solid ${color}44`,
                  background: isTesting ? color + '06' : 'transparent',
                }}
                onClick={() => setSelectedProtocolEvent(ev)}
              >
                {/* Event header */}
                <div className="flex items-center gap-2 mb-1">
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem',
                    color, background: color + '18', borderRadius: '3px', padding: '1px 6px',
                  }}>
                    {label}
                  </span>
                  {ev.agent?.name && (
                    <span style={{ fontFamily: "'Cormorant', serif", fontSize: '0.88rem', fontWeight: 600, color: 'var(--co-text)' }}>
                      {(ev as any).agent?.name}
                    </span>
                  )}
                  {(payload as any).complexity && (
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)', background: '#ffffff08', borderRadius: '2px', padding: '0 3px' }}>
                      {(payload as any).complexity}
                    </span>
                  )}
                  {layers.length > 0 && (
                    <div className="flex gap-0.5">
                      {layers.map((l: number) => {
                        const lc = LAYER_COLORS[l]
                        return lc ? (
                          <span key={l} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', background: lc.bg + '1a', color: lc.bg, padding: '0 3px', borderRadius: '2px' }}>
                            {lc.label.slice(0, 3)}
                          </span>
                        ) : null
                      })}
                    </div>
                  )}
                  <span className="ml-auto shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'var(--co-text-muted)' }}>
                    {formatTimestamp(ev.created_at as string)}
                  </span>
                </div>

                {/* Summary / content */}
                {summary && (
                  <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--co-text-muted)', lineHeight: 1.4, paddingLeft: '2px' }}>
                    {summary}
                  </p>
                )}

                {/* Payload preview for messages/proofs */}
                {!summary && ((payload as any).message || (payload as any).completion_proof || (payload as any).content_preview) && (
                  <p className="line-clamp-2" style={{
                    fontFamily: "'Source Serif 4', serif", fontSize: '0.78rem',
                    color: (payload as any).completion_proof ? '#7ccfb8' : 'var(--co-text-muted)',
                    lineHeight: 1.5, paddingLeft: '2px',
                    fontStyle: (payload as any).message ? 'italic' : 'normal',
                  }}>
                    {(payload as any).completion_proof ? `✓ ${(payload as any).completion_proof}` : (payload as any).content_preview || `"${(payload as any).message}"`}
                  </p>
                )}

                {/* Skill hash on claims */}
                {(payload as any).skill_hash && ev.event_type === 'sprint_claimed' && (
                  <div style={{ paddingLeft: '2px', marginTop: '2px' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--co-text-muted)' }}>
                      skill {((payload as any).skill_hash as string).slice(0, 12)}…
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Protocol Event detail modal ───────────────────────────── */}
      {selectedProtocolEvent && (() => {
        const ev = selectedProtocolEvent
        const color = EVENT_COLORS[ev.event_type] || 'var(--co-text-muted)'
        const label = EVENT_LABELS[ev.event_type] || ev.event_type
        const payload = ev.payload || {}
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={() => setSelectedProtocolEvent(null)}
          >
            <div
              className="w-full max-w-xl rounded-xl overflow-hidden"
              style={{ background: '#141414', border: `1px solid ${color}33`, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--co-border)', background: '#111' }}>
                <span className="text-xs px-2.5 py-1 rounded shrink-0"
                  style={{ background: color + '1a', color, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.05em' }}>
                  {label}
                </span>
                <div className="flex-1 min-w-0">
                  {ev.agent?.name && (
                    <span style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--co-text)' }}>
                      {ev.agent.name}
                    </span>
                  )}
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', marginTop: '2px' }}>
                    {new Date(ev.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    {ev.agent?.craft_primary && ` · ${ev.agent.craft_primary}`}
                  </div>
                </div>
                <button onClick={() => setSelectedProtocolEvent(null)} className="text-co-text-muted hover:text-co-text-secondary transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 py-4 overflow-y-auto space-y-4">
                {/* Key fields */}
                {(payload.status || payload.capacity != null) && (
                  <div className="grid grid-cols-2 gap-2">
                    {payload.status && (
                      <div className="rounded p-2.5" style={{ background: 'var(--co-bg)', border: '1px solid var(--co-border)' }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '3px' }}>STATUS</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: 'var(--co-text)' }}>{payload.status}</div>
                      </div>
                    )}
                    {payload.capacity != null && (
                      <div className="rounded p-2.5" style={{ background: 'var(--co-bg)', border: '1px solid var(--co-border)' }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '3px' }}>CAPACITY</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: 'var(--co-text)' }}>{payload.capacity}%</div>
                      </div>
                    )}
                  </div>
                )}
                {payload.message && (
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Message</div>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>"{payload.message}"</p>
                  </div>
                )}
                {payload.completion_proof && (
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Completion Proof</div>
                    <a href={payload.completion_proof} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem', color: '#7ccfb8', wordBreak: 'break-all' }}
                      className="hover:underline">{payload.completion_proof}</a>
                  </div>
                )}
                {payload.content_preview && (
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Content Preview</div>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', lineHeight: 1.6 }}>{payload.content_preview}</p>
                  </div>
                )}
                {/* Full payload */}
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Full Payload</div>
                  <pre style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: 'var(--co-text-muted)', background: 'var(--co-bg)', border: '1px solid var(--co-border)', borderRadius: '4px', padding: '10px 12px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '200px' }}>
                    {JSON.stringify(payload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}
