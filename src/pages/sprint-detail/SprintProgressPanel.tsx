// @ts-nocheck
/** P242: Extracted from SprintDetail.tsx */
import { useState } from 'react'
import { FileText, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { timeAgo } from './SprintDetailHelpers'
import { usePageTitle } from '../../hooks/usePageTitle'


interface SprintProgressPanelProps {
  sprint: unknown
}

export function SprintProgressPanel({ sprint }: SprintProgressPanelProps) {
  usePageTitle('Sprint Progress Panel')

  const [expandedLogs, setExpandedLogs] = useState(false)

  const progressLog: unknown[] = (sprint as any).progress_log || []
  const negotiationLog: unknown[] = (sprint as any).negotiation_log || []
  const injectedContext: unknown[] = (sprint as any).injected_context || []

  if (progressLog.length === 0 && negotiationLog.length === 0 && injectedContext.length === 0) {
    return null
  }

  return (
    <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden mb-4">
      <button
        className="w-full px-5 py-3 border-b flex items-center gap-2 text-left"
        style={{ borderColor: 'var(--co-border)' }}
        onClick={() => setExpandedLogs(v => !v)}
      >
        <FileText className="w-3.5 h-3.5" style={{ color: 'var(--co-primary)' }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Execution Logs
        </span>
        <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
          {progressLog.length + negotiationLog.length + injectedContext.length} entries
        </span>
        {expandedLogs ? <ChevronUp className="w-3 h-3 text-co-text-muted" /> : <ChevronDown />}
      </button>

      {expandedLogs && (
        <div className="px-5 py-4 space-y-4">
          {/* Progress log */}
          {progressLog.length > 0 && (
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Progress · {progressLog.length} entries
              </p>
              <div className="space-y-2">
                {progressLog.map((entry: unknown, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <Circle className="w-2 h-2 text-co-primary" />
                      {i < progressLog.length - 1 && <div className="w-px flex-1 min-h-4" style={{ background: 'var(--co-surface)' }} />}
                    </div>
                    <div>
                      {(entry as any).percent_complete != null && (
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-primary)', marginRight: '8px' }}>{(entry as any).percent_complete}%</span>
                      )}
                      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text)', fontWeight: 300, lineHeight: 1.6, display: 'inline' }}>{(entry as any).message}</p>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--co-border)', marginLeft: '8px' }}>
                        {entry.timestamp ? timeAgo((entry as any).timestamp) : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Negotiation log */}
          {negotiationLog.length > 0 && (
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Negotiation · {negotiationLog.length} exchanges
              </p>
              <div className="space-y-2">
                {negotiationLog.map((entry: unknown, i: number) => (
                  <div key={i} className="pl-3 border-l" style={{ borderColor: (entry as any).action === 'accepted' ? '#7ccfb844' : 'var(--co-text-muted)' }}>
                    <span className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        background: (entry as any).action === 'accepted' ? '#7ccfb822' : 'var(--co-border)',
                        color: (entry as any).action === 'accepted' ? '#7ccfb8' : 'var(--co-text-muted)',
                      }}>{(entry as any).action}</span>
                    {(entry as any).message && (
                      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, marginTop: '4px' }}>
                        "{(entry as any).message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Injected context */}
          {injectedContext.length > 0 && (
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: '#a78bfa88', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Steward context
              </p>
              {injectedContext.map((ctx: unknown, i: number) => (
                <div key={i} className="pl-3 border-l mb-2" style={{ borderColor: '#a78bfa44' }}>
                  <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', fontWeight: 300, lineHeight: 1.6 }}>{(ctx as any).message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
