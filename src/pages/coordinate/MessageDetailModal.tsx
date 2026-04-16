// @ts-nocheck
/**
 * MessageDetailModal — Workshop message detail overlay.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { Bot, Users, X } from 'lucide-react'
import { renderMarkdown, timeAgo } from './constants'


interface MessageDetailModalProps {
  message: unknown
  onClose: () => void
}

export function MessageDetailModal({ message, onClose }: MessageDetailModalProps) {
return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{ background: '#141414', border: '1px solid var(--co-border)', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--co-border)', background: '#111' }}>
          {(message as any).participants?.is_agent
            ? <Bot className="w-4 h-4 text-co-text-muted shrink-0" />
            : <Users className="w-4 h-4 text-co-text-muted shrink-0" />
          }
          <div className="flex-1 min-w-0">
            <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', fontWeight: 500, color: 'var(--co-text)' }}>
              {(message as any).participants?.name}
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', marginLeft: '8px' }}>
              {timeAgo((message as any).created_at)}
            </span>
            {(message as any).sprint?.title && (
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', marginTop: '2px' }}>
                {(message as any).sprint.title}
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-co-text-muted hover:text-co-text-secondary transition-colors" aria-label="Close message detail">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        {(message as any).title && (
          <div className="px-5 pt-4 pb-0">
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--co-text)',
              lineHeight: 1.3,
              marginBottom: '4px',
            }}>
              {(message as any).title}
            </h3>
          </div>
        )}

        {/* Body — markdown rendered */}
        <div
          className="px-5 py-4 overflow-y-auto"
          style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown((message as any).content || '') }}
        />
      </div>
    </div>
  )
}
