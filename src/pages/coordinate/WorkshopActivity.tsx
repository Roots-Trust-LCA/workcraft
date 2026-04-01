/**
 * WorkshopActivity — Workshop message feed + compose input.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Bot, Users, SmilePlus } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { CoordinationProposal } from '../../types/coordination'
import { timeAgo } from './constants'
import { usePageTitle } from '../../hooks/usePageTitle'


const REACTION_PRESETS = ['👍', '🤔', '✅', '🚀', '👀']

/** P240: Inline reaction bar for a single message */
function MessageReactions({ messageId }: { messageId: string }) {
  usePageTitle('Workshop Activity')

  const [reactions, setReactions] = useState<Record<string, number>>({})
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set())
  const [showPicker, setShowPicker] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load reactions for this message
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('message_reactions')
        .select('emoji, participant_id')
        .eq('message_id', messageId)
      if (cancelled || !data) return
      const counts: Record<string, number> = {}
      const mine = new Set<string>()
      for (const r of data) {
        counts[r.emoji] = (counts[r.emoji] || 0) + 1
      }
      // We can't easily check "my" reactions without participant_id mapping,
      // but we show counts for all
      setReactions(counts)
    })()
    return () => { cancelled = true }
  }, [messageId])

  const addReaction = async (emoji: string) => {
    if (loading) return
    setLoading(true)
    setShowPicker(false)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.id) return

      const { data: participant } = await supabase
        .from('participants')
        .select('id')
        .eq('auth_user_id', session.user.id)
        .maybeSingle()

      if (!participant) return

      await supabase.from('message_reactions').upsert(
        { message_id: messageId, participant_id: participant.id, emoji },
        { onConflict: 'message_id,participant_id,emoji', ignoreDuplicates: true }
      )

      setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
      setMyReactions(prev => new Set(prev).add(emoji))
    } finally {
      setLoading(false)
    }
  }

  const hasReactions = Object.keys(reactions).length > 0

  return (
    <div className="flex items-center gap-1 flex-wrap" style={{ marginTop: hasReactions || showPicker ? '3px' : 0, marginLeft: '20px' }}>
      {Object.entries(reactions).map(([emoji, count]) => (
        <button
          key={emoji}
          onClick={(e) => { e.stopPropagation(); addReaction(emoji) }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            padding: '1px 6px', borderRadius: '10px', cursor: 'pointer',
            background: myReactions.has(emoji) ? '#c4956a1a' : 'var(--co-surface)',
            border: `1px solid ${myReactions.has(emoji) ? '#c4956a33' : 'var(--co-surface)'}`,
            fontSize: '0.7rem', lineHeight: 1.4,
          }}
        >
          <span>{emoji}</span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>{count}</span>
        </button>
      ))}
      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setShowPicker(p => !p) }}
          style={{
            display: 'inline-flex', alignItems: 'center', padding: '2px 4px',
            borderRadius: '10px', cursor: 'pointer',
            background: 'transparent', border: '1px solid transparent',
            color: 'var(--co-text-muted)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--co-text-muted)'; e.currentTarget.style.borderColor = 'var(--co-border)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--co-border)'; e.currentTarget.style.borderColor = 'transparent' }}
          title="Add reaction"
        >
          <SmilePlus size={12} />
        </button>
        {showPicker && (
          <div
            style={{
              position: 'absolute', bottom: '100%', left: 0, zIndex: 50,
              background: 'var(--co-surface)', border: '1px solid var(--co-border)', borderRadius: '8px',
              padding: '4px', display: 'flex', gap: '2px', marginBottom: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            {REACTION_PRESETS.map(emoji => (
              <button
                key={emoji}
                onClick={(e) => { e.stopPropagation(); addReaction(emoji) }}
                style={{
                  padding: '4px 6px', borderRadius: '6px', cursor: 'pointer',
                  background: 'transparent', border: 'none', fontSize: '1rem',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--co-border)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface WorkshopActivityProps {
  activity: unknown[]
  sprints: CoordinationProposal[]
  completedSprints: CoordinationProposal[]
  workshopChannelId: string | null
  onSelectMessage: (msg: unknown) => void
}

const ACTIVITY_PAGE_SIZE = 6

export function WorkshopActivity({ activity, sprints, completedSprints, workshopChannelId, onSelectMessage }: WorkshopActivityProps) {
  const navigate = useNavigate()
  const [activityPage, setActivityPage] = useState(0)
  const [composeTitle, setComposeTitle] = useState('')
  const [composeMessage, setComposeMessage] = useState('')
  const [composeSending, setComposeSending] = useState(false)

  const activityPages = Math.ceil(activity.length / ACTIVITY_PAGE_SIZE)
  const pagedActivity = activity.slice(activityPage * ACTIVITY_PAGE_SIZE, (activityPage + 1) * ACTIVITY_PAGE_SIZE)

  const canSend = !!(composeTitle.trim() && composeMessage.trim())

  // P121: Workshop message compose (P149: attribution, P169: required title)
  const sendWorkshopMessage = useCallback(async () => {
    if (!composeTitle.trim() || !composeMessage.trim() || !workshopChannelId || composeSending) return
    setComposeSending(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      let senderId: string | null = null
      let senderName: string | null = null
      if (session?.user?.id) {
        const { data: participant } = await supabase
          .from('participants')
          .select('id, name')
          .eq('auth_user_id', session.user.id)
          .maybeSingle()
        if (participant) {
          senderId = participant.id
          senderName = participant.name
        }
      }
      const trimmedTitle = composeTitle.trim().slice(0, 120)
      const trimmed = composeMessage.trim()

      // P196-fix: Auto-detect sprint reference from title or content
      const sprintMatch = (trimmedTitle + ' ' + trimmed).match(/\b([A-Z]\d{1,4})\b/)
      const detectedSprintLabel = sprintMatch ? sprintMatch[1] : null

      // Resolve sprint serial to UUID for linking
      let sprintUuid: string | null = null
      if (detectedSprintLabel) {
        const { data: sprintRow } = await supabase
          .from('coordination_requests')
          .select('id')
          .eq('sprint_id', detectedSprintLabel)
          .maybeSingle()
        if (sprintRow) sprintUuid = sprintRow.id
      }

      const { data: msgRow } = await supabase.from('guild_messages').insert({
        channel_id: workshopChannelId,
        content: trimmed,
        title: trimmedTitle,
        is_agent: false,
        sender_id: senderId,
        agent_name: senderName,
        sprint_id: sprintUuid,
      }).select('id, created_at').single()

      // P158: Emit protocol event
      if (msgRow) {
        const contentPreview = trimmed.length > 280 ? trimmed.slice(0, 280) + '…' : trimmed
        await supabase.from('protocol_events').insert({
          channel_id: workshopChannelId,
          event_type: 'chat_message_posted',
          agent_id: senderId,
          sprint_id: sprintUuid,
          payload: {
            message_id: msgRow.id,
            content_preview: contentPreview,
            is_agent: false,
            agent_name: senderName,
            channel: 'workshop',
            sprint_id_label: detectedSprintLabel,
          },
        })

        // Auto-link to Sprint Discussion thread
        if (sprintUuid) {
          await supabase.from('sprint_messages').insert({
            sprint_id: sprintUuid,
            message_id: msgRow.id,
            linked_by: senderId,
            label: 'discussion',
          }).maybeSingle() // best-effort; ignore conflict
        }
      }
      setComposeTitle('')
      setComposeMessage('')
    } finally {
      setComposeSending(false)
    }
  }, [composeTitle, composeMessage, workshopChannelId, composeSending])

  return (
    <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center gap-2" >
        <MessageSquare className="w-3.5 h-3.5" />
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Workshop Activity
        </span>
        {activity.length > 0 && (
          <span className="ml-auto" >
            {activity.length} messages
          </span>
        )}
      </div>

      {activity.length === 0 ? (
        <p className="px-4 py-4 text-co-text-muted" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem' }}>
          No recent activity
        </p>
      ) : (
        <div className="divide-y" style={{ borderColor: 'var(--co-surface)' }}>
          {pagedActivity.map((m: any, i: number) => {
            const title = m.title || (m.message?.slice(0, 80) + (m.message?.length > 80 ? '...' : '')) || '(untitled)'
            const hasBody = !!(m.body || m.content)
            const sprintSerial = m.sprint_id
              ? (sprints.find((s: any) => s.id === m.sprint_id)?.sprint_id
                || completedSprints.find((s: any) => s.id === m.sprint_id)?.sprint_id
                || null)
              : null
            const titleMatch = !sprintSerial ? (m.title || '').match(/\b(P\d{2,4}|V\d{2,4})\b/) : null
            const displaySerial = sprintSerial || (titleMatch ? titleMatch[1] : null)
            const sprintUuid = m.sprint_id
              || (displaySerial
                ? (sprints.find((s: any) => s.sprint_id === displaySerial)?.id
                  || completedSprints.find((s: any) => s.sprint_id === displaySerial)?.id
                  || null)
                : null)

            return (
              <div key={m.id || i} className="border-co-border">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-co-surface-hover"
                  style={{ cursor: hasBody ? 'pointer' : 'default' }}
                  onClick={() => hasBody && onSelectMessage({ ...m, content: m.body || m.content })}
                >
                  {m.participants?.is_agent
                    ? <Bot className="w-3 h-3 text-co-text-muted shrink-0" />
                    : <Users className="w-3 h-3 text-co-text-muted shrink-0" />
                  }
                  {displaySerial && (
                    <button
                      className="shrink-0 hover:brightness-125 transition-all"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.75rem', fontWeight: 600,
                        color: 'var(--co-primary)', background: '#c4956a14',
                        border: '1px solid #c4956a33',
                        borderRadius: '3px', padding: '1px 5px',
                        letterSpacing: '0.03em',
                      }}
                      onClick={e => {
                        e.stopPropagation()
                        if (sprintUuid) navigate(`/sprint/${sprintUuid}`)
                      }}
                      title={`Go to sprint ${displaySerial}`}
                    >
                      {displaySerial}
                    </button>
                  )}
                  <span className="truncate flex-1" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--co-text)' }}>
                    {title}
                  </span>
                  <span className="shrink-0" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)' }}>
                    {m.participants?.name}
                  </span>
                  <span className="shrink-0" >
                    {timeAgo((m as any).created_at)}
                  </span>
                </div>
                {m.id && <MessageReactions messageId={m.id} />}
              </div>
            )
          })}
          {activityPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2" >
              <button onClick={() => setActivityPage(p => Math.max(0, p - 1))} disabled={activityPage === 0}
                className="text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>← prev</button>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>
                {activityPage + 1} / {activityPages}
              </span>
              <button onClick={() => setActivityPage(p => Math.min(activityPages - 1, p + 1))}
                disabled={activityPage === activityPages - 1}
                className="text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)' }}>next →</button>
            </div>
          )}
        </div>
      )}

      {/* P169: Compose with required title + message */}
      {workshopChannelId && (
        <div className="border-t p-3" >
          <input
            type="text"
            value={composeTitle}
            onChange={e => setComposeTitle(e.target.value.slice(0, 120))}
            placeholder="Title (required)…"
            maxLength={120}
            style={{
              width: '100%',
              background: '#0e0e0e',
              border: `1px solid ${composeTitle.trim() ? 'var(--co-border)' : 'var(--co-border)'}`,
              borderRadius: '4px 4px 0 0',
              padding: '6px 10px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--co-text)',
              outline: 'none',
            }}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={composeMessage}
              onChange={e => setComposeMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && canSend) { e.preventDefault(); sendWorkshopMessage() } }}
              placeholder="Message…"
              style={{
                flex: 1,
                background: '#0e0e0e',
                border: '1px solid var(--co-border)',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                padding: '6px 10px',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--co-text)',
                outline: 'none',
              }}
            />
            <button
              onClick={sendWorkshopMessage}
              disabled={!canSend || composeSending}
              style={{
                padding: '6px 12px',
                background: canSend ? '#c4956a22' : '#111',
                color: canSend ? 'var(--co-primary)' : 'var(--co-text-muted)',
                border: `1px solid ${canSend ? '#c4956a44' : 'var(--co-surface)'}`,
                borderRadius: '4px',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.72rem',
                cursor: canSend ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
                alignSelf: 'flex-end',
              }}
            >
              {composeSending ? '…' : '↵'}
            </button>
          </div>
          {composeTitle.length > 100 && (
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: 'var(--co-text-muted)', textAlign: 'right', marginTop: '2px' }}>
              {composeTitle.length}/120
            </div>
          )}
        </div>
      )}
    </div>
  )
}
