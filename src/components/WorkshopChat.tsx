// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Bot, Hash, Loader, MessageSquare, AlertTriangle } from 'lucide-react'
import { logger } from '../lib/logger'
import { useWorkshop } from '../lib/workshop-context'

interface GuildMessage {
  id: string
  channel_id: string | null
  sender_id: string | null
  content: string | null
  message: string | null
  is_agent: boolean
  agent_name: string | null
  created_at: string
  sender?: { name: string; craft_primary: string | null } | null
}

interface OptimisticMessage {
  id: string
  content: string
  created_at: string
  is_agent: false
  agent_name: null
  sender: { name: string; craft_primary: string | null }
  _optimistic: true
}

interface WorkshopChatProps {
  channelName?: string
}

/**
 * Workshop Chat — multi-party coordination chat (humans + agents)
 * Uses guild_channels + guild_messages with Realtime subscription.
 * Designed as an embeddable widget for the Home page.
 * Accepts an optional channelName prop (default: 'workshop').
 */
export function WorkshopChat({ channelName = 'workshop' }: WorkshopChatProps) {
  const { supabase } = useWorkshop()
  const [session, setSession] = useState<any>(null)
  const [channelId, setChannelId] = useState<string | null>(null)
  const [messages, setMessages] = useState<(GuildMessage | OptimisticMessage)[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [participantId, setParticipantId] = useState<string | null>(null)
  const [participantName, setParticipantName] = useState<string>('')
  const [participantCraft, setParticipantCraft] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  // Participant info
  useEffect(() => {
    if (!session?.user) return
    supabase
      .from('participants')
      .select('id, name, craft_primary')
      .eq('auth_user_id', session.user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setParticipantId(data.id)
          setParticipantName(data.name)
          setParticipantCraft(data.craft_primary)
        }
      })
  }, [session])

  // Fetch channel by name
  useEffect(() => {
    supabase
      .from('guild_channels')
      .select('id')
      .eq('slug', channelName)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setChannelId(data.id)
      })
  }, [channelName])

  // Fetch messages + realtime
  useEffect(() => {
    if (!channelId) return

    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from('guild_messages')
          .select('*, sender:sender_id(name, craft_primary)')
          .eq('channel_id', channelId!)
          .order('created_at', { ascending: false })
          .limit(30)
        if (error) throw error
        if (data) setMessages(data.reverse())
        setLoadError(null)
      } catch (err) {
        logger.error('[WorkshopChat] fetchMessages:', err)
        setLoadError(err instanceof Error ? err.message : 'Failed to load messages')
      }
    }
    fetchMessages()

    const channel = supabase
      .channel(`${channelName}-chat-${channelId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'guild_messages',
        filter: `channel_id=eq.${channelId}`
      }, async (payload) => {
        setMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          const filtered = prev.filter(m =>
            !('_optimistic' in m) || (m as OptimisticMessage).content !== payload.new.content
          )
          supabase
            .from('participants')
            .select('name, craft_primary')
            .eq('id', payload.new.sender_id)
            .single()
            .then(({ data: sender }) => {
              setMessages(prev => {
                if (prev.some(m => m.id === payload.new.id)) return prev
                return [...prev.filter(m =>
                  !('_optimistic' in m) || (m as OptimisticMessage).content !== payload.new.content
                ), { ...payload.new, sender } as GuildMessage]
              })
            })
          return filtered
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [channelId])

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [])

  async function sendMessage() {
    if (!newMessage.trim() || !participantId || !channelId) return
    const content = newMessage.trim()
    setSending(true)
    setNewMessage('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const optimistic: OptimisticMessage = {
      id: `opt-${Date.now()}`,
      content,
      created_at: new Date().toISOString(),
      is_agent: false,
      agent_name: null,
      sender: { name: participantName, craft_primary: participantCraft },
      _optimistic: true,
    }
    setMessages(prev => [...prev, optimistic])

    await supabase.from('guild_messages').insert({
      channel_id: channelId,
      sender_id: participantId,
      content,
      message: content,
      guild: channelName,
      is_agent: false,
    })
    setSending(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function formatTime(ts: string) {
    const d = new Date(ts)
    const now = new Date()
    const isToday = d.toDateString() === now.toDateString()
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {loadError && (
        <div className="mb-2 rounded-lg p-2 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-xs text-red-400/70 truncate flex-1">{loadError}</span>
          <button onClick={() => setLoadError(null)} className="text-red-400/50 hover:text-red-300 text-xs shrink-0">dismiss</button>
        </div>
      )}
      {/* Messages */}
      <div className="h-56 overflow-y-auto space-y-3 mb-3 pr-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <MessageSquare className="w-6 h-6 mb-2 opacity-30" />
            <span className="text-xs">No messages yet. Start the coordination.</span>
          </div>
        ) : (
          messages.map(msg => {
            const content = (msg as GuildMessage).content || (msg as GuildMessage).message || ''
            const isAgent = (msg as GuildMessage).is_agent || !!(msg as GuildMessage).agent_name
            const senderName = isAgent
              ? (msg as GuildMessage).agent_name || 'Agent'
              : msg.sender?.name || 'Unknown'
            const isOptimistic = '_optimistic' in msg

            return (
              <div key={msg.id} className={isOptimistic ? 'opacity-60' : ''}>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-bold" style={{ color: isAgent ? '#8bbfff' : 'var(--co-primary)' }}>
                    {senderName}
                  </span>
                  {isAgent && (
                    <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] uppercase tracking-wider font-medium"
                      style={{ background: '#8bbfff15', color: '#8bbfff', border: '1px solid #8bbfff25' }}>
                      <Bot className="w-2 h-2" />
                      bot
                    </span>
                  )}
                  <span className="text-xs text-gray-600">{formatTime(msg.created_at)}</span>
                </div>
                <div className="text-sm text-gray-300 break-words leading-relaxed whitespace-pre-wrap">{content}</div>
              </div>
            )
          })
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Compose */}
      {session ? (
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}...`}
            rows={1}
            className="flex-1 bg-co-bg border border-co-border rounded px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-co-primary"
            style={{ maxHeight: '100px' }}
            disabled={sending || !channelId}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending || !channelId}
            className="p-2 bg-co-primary text-black rounded hover:bg-[#d4a57a] disabled:opacity-50 transition-colors"
          >
            {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send />}
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-gray-500 py-2 border-t border-co-border">
          <a href="/app/login" className="text-co-primary hover:underline">Log in</a> to chat
        </div>
      )}
    </>
  )
}
