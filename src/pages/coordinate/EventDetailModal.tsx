// @ts-nocheck
/**
 * EventDetailModal — Protocol event detail overlay.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { EVENT_COLORS, EVENT_LABELS, timeAgo } from './constants'
import { usePageTitle } from '../../hooks/usePageTitle'


interface EventDetailModalProps {
  event: unknown
  onClose: () => void
}

export function EventDetailModal({ event: ev, onClose }: EventDetailModalProps) {
  usePageTitle('Event Detail Modal')

  const navigate = useNavigate()
  const color = EVENT_COLORS[(ev as any).event_type] || 'var(--co-text-muted)'
  const label = EVENT_LABELS[ev.event_type] || (ev as any).event_type
  const payload = (ev as any).payload || {}

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden"
        style={{ background: '#141414', border: `1px solid ${color}33`, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--co-border)', background: '#111' }}>
          <span className="text-xs px-2.5 py-1 rounded shrink-0"
            style={{ background: color + '1a', color, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.05em' }}>
            {label}
          </span>
          <div className="flex-1 min-w-0">
            {(ev as any).agent?.name && (
              <button
                className="hover:text-co-primary transition-colors font-serif-cormorant" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--co-text)' }}
                onClick={() => { onClose(); navigate(`/${(ev as any).agent_id}`) }}
              >
                {(ev as any).agent.name}
              </button>
            )}
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', marginTop: '2px' }}>
              {new Date((ev as any).created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              {ev.agent?.craft_primary && ` · ${(ev as any).agent.craft_primary}`}
            </div>
          </div>
          <button onClick={onClose} className="text-co-text-muted hover:text-co-text-secondary transition-colors shrink-0" aria-label="Close event detail">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto space-y-4">
          {/* Sprint link */}
          {(ev as any).sprint && (
            <div>
              <div className="ws-label-lg text-co-text-muted">Sprint</div>
              <button
                className="flex items-center gap-2 hover:text-co-text transition-colors text-left text-co-text-muted"
                onClick={() => { onClose(); if (ev.sprint_id) navigate(`/sprint/${(ev as any).sprint_id}`) }}
              >
                {(ev as any).sprint.sprint_id && (
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', background: '#c4956a18', color: 'var(--co-primary)', padding: '1px 6px', borderRadius: '3px' }}>
                    {(ev as any).sprint.sprint_id}
                  </span>
                )}
                <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem' }}>{(ev as any).sprint.title}</span>
              </button>
            </div>
          )}

          {/* Key payload fields */}
          {(payload.status || payload.capacity != null || payload.context) && (
            <div>
              <div className="ws-label-lg text-co-text-muted">Presence</div>
              <div className="grid grid-cols-2 gap-2">
                {payload.status && (
                  <div className="rounded p-2.5" >
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '3px' }}>STATUS</div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'var(--co-text)' }}>{payload.status}</div>
                  </div>
                )}
                {payload.capacity != null && (
                  <div className="rounded p-2.5" >
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '3px' }}>CAPACITY</div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'var(--co-text)' }}>{payload.capacity}%</div>
                  </div>
                )}
                {payload.context && (
                  <div className="col-span-2 rounded p-2.5" >
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: 'var(--co-text-muted)', marginBottom: '3px' }}>CONTEXT</div>
                    <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--co-text-muted)' }}>{payload.context}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message / proof */}
          {payload.message && (
            <div>
              <div className="ws-label-lg text-co-text-muted">Message</div>
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'var(--co-text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>"{payload.message}"</p>
            </div>
          )}
          {payload.completion_proof && (
            <div>
              <div className="ws-label-lg text-co-text-muted">Completion Proof</div>
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: '#7ccfb8', lineHeight: 1.7 }}>{payload.completion_proof}</p>
            </div>
          )}

          {/* Capabilities */}
          {payload.capabilities?.length > 0 && (
            <div>
              <div className="ws-label-lg text-co-text-muted">Capabilities</div>
              <div className="flex flex-wrap gap-1.5">
                {payload.capabilities.map((c: string) => (
                  <span key={c} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', background: '#111', border: '1px solid var(--co-border)', borderRadius: '3px', padding: '2px 7px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full payload */}
          <div>
            <div className="ws-label-lg text-co-text-muted">Full Payload</div>
            <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem', color: 'var(--co-text-muted)', background: 'var(--co-bg)', border: '1px solid var(--co-border)', borderRadius: '4px', padding: '10px 12px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '200px' }}>
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
