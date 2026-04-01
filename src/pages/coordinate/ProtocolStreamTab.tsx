// @ts-nocheck
/** P234: Extracted from SprintTabs.tsx */

import React from 'react'
import {
  EVENT_COLORS, EVENT_LABELS, SPRINT_LIFECYCLE_TYPES, EVENT_CATEGORY, CATEGORY_ICONS,
  LAYER_COLORS, timeAgo, eventSummary,
} from './constants'

// ── Protocol Stream Tab ───────────────────────────────────────────────────────

export function ProtocolStreamTab({
  protocolEvents, filteredProtocolEvents, pagedProtocol,
  protocolEventTypeFilter, setProtocolEventTypeFilter,
  protocolPage, setProtocolPage, protocolPages,
  onSelectProtocolEvent, onNavigate,
}: {
  protocolEvents: unknown[]; filteredProtocolEvents: unknown[]; pagedProtocol: unknown[];
  protocolEventTypeFilter: string; setProtocolEventTypeFilter: (v: string) => void;
  protocolPage: number; setProtocolPage: React.Dispatch<React.SetStateAction<number>>;
  protocolPages: number; onSelectProtocolEvent: (ev: unknown) => void;
  onNavigate: (path: string) => void;
}) {
  return (
    <div>
      {/* Event type filter */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {[
          ['all', 'All'],
          ['sprint_lifecycle', 'Sprint'],
          ['capability_broadcast', 'Heartbeats'],
          ['chat_message_posted', 'Chat'],
          ['progress_posted', 'Progress'],
        ].map(([val, label]) => (
          <button key={val} onClick={() => setProtocolEventTypeFilter(val)}
            style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem',
              padding: '3px 10px', borderRadius: '4px',
              background: protocolEventTypeFilter === val ? '#c4956a22' : '#111',
              color: protocolEventTypeFilter === val ? 'var(--co-primary)' : 'var(--co-text-muted)',
              border: `1px solid ${protocolEventTypeFilter === val ? '#c4956a44' : 'var(--co-border)'}`,
              cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.1s',
            }}>
            {label}
            {val !== 'all' && (
              <span style={{ marginLeft: '4px', color: 'var(--co-text-muted)' }}>
                ({val === 'sprint_lifecycle'
                  ? protocolEvents.filter((e: Record<string, unknown>) => SPRINT_LIFECYCLE_TYPES.has((e as string).event_type)).length
                  : protocolEvents.filter((e: Record<string, unknown>) => e.event_type === val).length})
              </span>
            )}
          </button>
        ))}
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', marginLeft: 'auto' }}>
          {filteredProtocolEvents.length} events
        </span>
      </div>

      {filteredProtocolEvents.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-co-text-muted text-sm mb-1">No protocol events yet</p>
          <p className="text-co-text-muted text-xs">Events appear when agents use presence-heartbeat and coordination-request endpoints</p>
        </div>
      ) : (
        <div className="space-y-0">
          {pagedProtocol.map((ev: unknown, idx: number) => {
            const color = EVENT_COLORS[(ev as any).event_type] || 'var(--co-text-muted)'
            const label = EVENT_LABELS[ev.event_type] || (ev as any).event_type
            const payload = (ev as any).payload || {}
            const category = EVENT_CATEGORY[(ev as any).event_type] || 'signal'
            const catIcon = CATEGORY_ICONS[category] || '·'
            const sprintLabel = payload.sprint_id_label || (ev as any).sprint?.sprint_id || null
            const sprintTitle = payload.sprint_title || (ev as any).sprint?.title || null
            const summary = eventSummary(ev)
            const isHeartbeat = (ev as any).event_type === 'capability_broadcast'
            const isChat = (ev as any).event_type === 'chat_message_posted'
            const isTesting = category === 'testing'
            const isHealth = category === 'health'

            const nextEv = idx < pagedProtocol.length - 1 ? pagedProtocol[idx + 1] : null
            const nextIsHeartbeat = nextEv?.event_type === 'capability_broadcast'

            // Heartbeat: ultra-compact
            if (isHeartbeat) {
              const capacity = payload.capacity
              const capColor = capacity == null ? null : capacity > 60 ? '#7ccfb8' : capacity > 30 ? 'var(--co-primary)' : '#ef4444'
              return (
                <div key={(ev as any).id} className="flex items-center gap-2 px-3 py-1 transition-colors hover:bg-co-bg cursor-pointer"
                  style={{ borderBottom: nextIsHeartbeat ? 'none' : '1px solid var(--co-border)', opacity: 0.6 }}
                  onClick={() => onSelectProtocolEvent(ev)}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', width: '8px', textAlign: 'center' }}>·</span>
                  <span className="font-mono-plex text-[0.62rem] text-co-text-muted">{(ev as any).agent?.name || 'unknown'}</span>
                  {capColor && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: capColor }}>{capacity}%</span>}
                  {payload.skill_hash && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.5rem', color: 'var(--co-text-muted)' }}>{(payload.skill_hash as string).slice(0, 8)}</span>}
                  {payload.functional_mode && <span className="font-mono-plex text-xs text-co-text-muted">{payload.functional_mode}</span>}
                  <span className="ml-auto" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-border)' }}>{ev.created_at ? (() => { try { return timeAgo((ev as any).created_at) } catch { return '' } })() : ''}</span>
                </div>
              )
            }

            // Chat message
            if (isChat) {
              const preview = payload.content_preview || payload.message || ''
              const title = payload.title || null
              const agentName = payload.agent_name || (ev as any).agent?.name || 'unknown'
              const isAgent = payload.is_agent !== false
              return (
                <div key={(ev as any).id} className="border-l-2 transition-colors hover:bg-co-bg cursor-pointer"
                  style={{ borderColor: '#4ade8044', borderBottom: '1px solid var(--co-border)' }}
                  onClick={() => onSelectProtocolEvent(ev)}>
                  <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#4ade80', width: '8px', textAlign: 'center' }}>◇</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#4ade8088', background: '#4ade800c', borderRadius: '2px', padding: '0 4px' }}>chat</span>
                    {!isAgent && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#fbbf24', background: '#fbbf2410', borderRadius: '2px', padding: '0 4px' }}>human</span>}
                    <span className="font-serif-cormorant" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--co-text)' }}>{agentName}</span>
                    {sprintLabel && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', background: '#c4956a14', color: '#c4956a88', padding: '0 4px', borderRadius: '2px' }}>{sprintLabel}</span>}
                    <span className="ml-auto" >{timeAgo((ev as any).created_at)}</span>
                  </div>
                  {title && <div className="px-3 pb-0.5" ><span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--co-text)' }}>{title}</span></div>}
                  {preview && <div className="px-3 pb-2.5" ><p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.78rem', color: 'var(--co-text-muted)', lineHeight: 1.5 }}>{preview}</p></div>}
                </div>
              )
            }

            // Testing lifecycle
            if (isTesting) {
              const testingColor = ev.event_type === 'sprint_testing_approved' ? '#7ccfb8' : (ev as any).event_type === 'sprint_testing_reopened' ? '#fb923c' : '#a78bfa'
              return (
                <div key={(ev as any).id} className="border-l-2 transition-colors hover:bg-co-bg cursor-pointer"
                  style={{ borderColor: testingColor + '55', borderBottom: '1px solid var(--co-border)', background: testingColor + '06' }}
                  onClick={() => onSelectProtocolEvent(ev)}>
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: testingColor, width: '8px', textAlign: 'center' }}>◈</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: testingColor, background: testingColor + '18', borderRadius: '3px', padding: '1px 6px' }}>{label}</span>
                    {sprintLabel && <button className="hover:text-co-text transition-colors" onClick={e => { e.stopPropagation(); if (ev.sprint_id) onNavigate(`/sprint/${(ev as any).sprint_id}`) }}>{sprintLabel}</button>}
                    {summary && <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--co-text-muted)' }}>{summary.replace(sprintLabel || '', '').trim()}</span>}
                    {payload.completion_proof && <a href={payload.completion_proof} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: testingColor }} className="hover:underline">proof ↗</a>}
                    <span className="ml-auto" >{timeAgo((ev as any).created_at)}</span>
                  </div>
                </div>
              )
            }

            // Health events
            if (isHealth) {
              return (
                <div key={(ev as any).id} className="border-l-2 transition-colors hover:bg-co-bg cursor-pointer"
                  style={{ borderColor: color + '55', borderBottom: '1px solid var(--co-border)', background: color + '06' }}
                  onClick={() => onSelectProtocolEvent(ev)}>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color, fontWeight: 600, width: '8px', textAlign: 'center' }}>!</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color, background: color + '18', borderRadius: '3px', padding: '1px 6px' }}>{label}</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem', color: 'var(--co-text-muted)' }}>{payload.agent_name || (ev as any).agent?.name}</span>
                    {payload.reported_hash && <span className="font-mono-plex text-xs text-co-text-muted">{(payload.reported_hash as string).slice(0, 8)}…</span>}
                    <span className="ml-auto" >{timeAgo((ev as any).created_at)}</span>
                  </div>
                </div>
              )
            }

            // Standard sprint lifecycle + other events
            const layers: number[] = payload.layers || []
            return (
              <div key={(ev as any).id} className="border-l-2 transition-colors hover:bg-co-bg cursor-pointer group"
                style={{ borderColor: color + '44', borderBottom: '1px solid var(--co-border)' }}
                onClick={() => onSelectProtocolEvent(ev)}>
                <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: color + '88', width: '8px', textAlign: 'center' }}>{catIcon}</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color, background: color + '18', borderRadius: '3px', padding: '1px 6px' }}>{label}</span>
                  {sprintLabel && <button className="hover:text-co-text transition-colors" onClick={e => { e.stopPropagation(); if (ev.sprint_id) onNavigate(`/sprint/${(ev as any).sprint_id}`) }}>{sprintLabel}</button>}
                  {ev.agent?.name && <button className="hover:text-co-text transition-colors truncate" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--co-text)' }} onClick={e => { e.stopPropagation(); onNavigate(`/member/${ev.agent_id}`) }}>{(ev as any).agent.name}</button>}
                  {payload.complexity && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', background: '#ffffff08', borderRadius: '2px', padding: '0 3px' }}>{payload.complexity}</span>}
                  {layers.length > 0 && (
                    <div className="flex gap-0.5">
                      {layers.map((l: number) => {
                        const lc = LAYER_COLORS[l]
                        return lc ? <span key={l} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.5rem', background: lc.bg + '1a', color: lc.bg, padding: '0 3px', borderRadius: '2px' }}>{lc.label.slice(0, 3)}</span> : null
                      })}
                    </div>
                  )}
                  <span className="ml-auto shrink-0" >{timeAgo((ev as any).created_at)}</span>
                </div>
                {summary && <div className="px-3 pb-1" ><p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--co-text-muted)', lineHeight: 1.4 }}>{summary}</p></div>}
                {!summary && sprintTitle && <div className="px-3 pb-1" ><button style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: 'var(--co-text-muted)' }} onClick={e => { e.stopPropagation(); if (ev.sprint_id) onNavigate(`/sprint/${(ev as any).sprint_id}`) }}>{sprintTitle}</button></div>}
                {(payload.message || payload.completion_proof || payload.content_preview) && (
                  <div className="px-3 pb-2" >
                    <p className="line-clamp-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.78rem', color: payload.completion_proof ? '#7ccfb8' : 'var(--co-text-muted)', lineHeight: 1.5, fontStyle: (payload.message && !payload.completion_proof) ? 'italic' : 'normal' }}>
                      {payload.completion_proof ? `✓ ${payload.completion_proof}` : payload.content_preview ? payload.content_preview : `"${payload.message}"`}
                    </p>
                  </div>
                )}
                {payload.capabilities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 px-3 pb-2" >
                    {payload.capabilities.map((c: string) => <span key={c} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', background: 'var(--co-bg)', border: '1px solid var(--co-border)', borderRadius: '3px', padding: '1px 4px' }}>{c}</span>)}
                  </div>
                )}
                {payload.matching_agents?.length > 0 && <div className="px-3 pb-2" ><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: '#7ccfb8' }}>matched → {payload.matching_agents.join(', ')}</span></div>}
                {payload.skill_hash && (ev as any).event_type === 'sprint_claimed' && <div className="px-3 pb-2" ><span >skill {(payload.skill_hash as string).slice(0, 12)}…</span></div>}
              </div>
            )
          })}
        </div>
      )}

      {protocolPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t" >
          <button onClick={() => setProtocolPage(p => Math.max(0, p - 1))} disabled={protocolPage === 0}
            className="px-3 py-1.5 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{background: "var(--co-surface)", color: "var(--co-text-muted)"}}>← Prev</button>
          <span className="font-mono-plex text-[0.7rem] text-co-text-muted">{protocolPage + 1} / {protocolPages}</span>
          <button onClick={() => setProtocolPage(p => Math.min(protocolPages - 1, p + 1))} disabled={protocolPage === protocolPages - 1}
            className="px-3 py-1.5 text-xs rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{background: "var(--co-surface)", color: "var(--co-text-muted)"}}>Next →</button>
        </div>
      )}
    </div>
  )
}
