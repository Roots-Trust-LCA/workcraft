// @ts-nocheck
/** P242: Extracted from SprintDetail.tsx */
import { useState } from 'react'
import { MessageSquare, Bot, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { renderMarkdown, formatTimestamp, LABEL_COLORS } from './SprintDetailHelpers'


interface SprintDiscussionProps {
  discussion: unknown[]
}

export function SprintDiscussion({ discussion }: SprintDiscussionProps) {
const [selectedMessage, setSelectedMessage] = useState<any>(null)

  return (
    <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden mb-4">
      <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--co-border)' }}>
        <MessageSquare className="w-3.5 h-3.5" style={{ color: 'var(--co-primary)' }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Discussion Thread
        </span>
        <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
          {discussion.length} message{discussion.length !== 1 ? 's' : ''}
        </span>
      </div>

      {discussion.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: 'var(--co-text-muted)' }}>
            No discussion messages linked to this sprint yet.
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: 'var(--co-text-muted)', marginTop: '4px' }}>
            Messages sent with sprint_id will auto-link here.
          </p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: 'var(--co-border)' }}>
          {discussion.map((m: any) => {
            const isExpanded = selectedMessage === m.id
            const hasLongContent = m.content?.length > 300
            const displayContent = isExpanded || !hasLongContent
              ? m.content
              : m.content.slice(0, 300).replace(/\s\S*$/, '') + '...'
            const labelColor = LABEL_COLORS[m.label] || 'var(--co-text-muted)'

            return (
              <div
                key={String(m.id)}
                className="px-5 py-4 transition-colors hover:bg-co-surface"
                style={{ cursor: hasLongContent ? 'pointer' : 'default' }}
                onClick={() => hasLongContent && setSelectedMessage(isExpanded ? null : m.id)}
              >
                {/* Message header */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {m.participants?.is_agent
                    ? <Bot className="w-3.5 h-3.5 text-co-text-muted shrink-0" />
                    : <Users className="w-3.5 h-3.5 text-co-text-muted shrink-0" />
                  }
                  <span style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--co-text)' }}>
                    {m.participants?.name || m.agent_name || 'Unknown'}
                  </span>
                  {m.label && (
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.6rem',
                      background: labelColor + '1a',
                      color: labelColor,
                      padding: '1px 6px',
                      borderRadius: '3px',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                    }}>
                      {m.label}
                    </span>
                  )}
                  <span className="ml-auto" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-border)' }}>
                    {formatTimestamp((m as any).created_at)}
                  </span>
                </div>

                {/* Message title */}
                {m.title && (
                  <h3 style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--co-text)',
                    marginBottom: '6px',
                  }}>
                    {m.title}
                  </h3>
                )}

                {/* Message content */}
                <div
                  style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(displayContent || '') }}
                />

                {hasLongContent && (
                  <button
                    className="text-xs mt-2 hover:text-co-primary transition-colors flex items-center gap-1"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'var(--co-text-muted)' }}
                  >
                    {isExpanded
                      ? <><ChevronUp className="w-3 h-3" /> Show less</>
                      : <><ChevronDown className="w-3 h-3" /> Show full message</>
                    }
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
