// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Bot, Hash, Loader, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { useWorkshop } from '../lib/workshop-context'


interface GuildChannel {
  id: string
  name: string
  description: string | null
}

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

// Optimistic message placeholder
interface OptimisticMessage {
  id: string
  content: string
  created_at: string
  is_agent: false
  agent_name: null
  sender: { name: string; craft_primary: string | null }
  _optimistic: true
}

export function GuildChatPage() {
const { supabase } = useWorkshop()
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [channels, setChannels] = useState<GuildChannel[]>([])
  const [activeChannel, setActiveChannel] = useState<GuildChannel | null>(null)
  const [messages, setMessages] = useState<(GuildMessage | OptimisticMessage)[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [participantId, setParticipantId] = useState<string | null>(null)
  const [participantName, setParticipantName] = useState<string>('')
  const [participantCraft, setParticipantCraft] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setAuthLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !session) navigate('/login', { replace: true })
  }, [authLoading, session, navigate])

  // Fetch participant info
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

  // Fetch channels
  useEffect(() => {
    supabase
      .from('guild_channels')
      .select('*')
      .order('name')
      .then(({ data }) => {
        if (data && data.length > 0) {
          setChannels(data)
          setActiveChannel(data.find(c => c.name === 'workshop') || data[0])
        }
      })
  }, [])

  // Fetch messages for active channel
  useEffect(() => {
    if (!activeChannel) return

    async function fetchMessages() {
      const { data } = await supabase
        .from('guild_messages')
        .select('*, sender:sender_id(name, craft_primary)')
        .eq('channel_id', activeChannel!.id)
        .order('created_at', { ascending: false })
        .limit(50)
      if (data) setMessages(data.reverse())
    }
    fetchMessages()

    // Realtime subscription
    const channel = supabase
      .channel(`guild-chat-${activeChannel.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'guild_messages',
        filter: `channel_id=eq.${activeChannel.id}`
      }, async (payload) => {
        // Skip if we already have this message (optimistic)
        setMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          // Remove optimistic messages from this sender if content matches
          const filtered = prev.filter(m =>
            !('_optimistic' in m) || (m as OptimisticMessage).content !== payload.new.content
          )
          // Fetch sender info
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
  }, [activeChannel])

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }, [])

  async function sendMessage() {
    if (!newMessage.trim() || !participantId || !activeChannel) return
    const content = newMessage.trim()
    setSending(true)
    setNewMessage('')

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    // Optimistic UI
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
      channel_id: activeChannel.id,
      sender_id: participantId,
      content,
      message: content, // backward compat
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
    if (isToday) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] -mx-4 -mt-6" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
      {/* Channel Sidebar */}
      <div
        className="w-56 shrink-0 border-r flex flex-col"
        style={{ background: 'var(--co-bg)', borderColor: 'var(--co-border)' }}
      >
        <div className="p-3 border-b" style={{ borderColor: 'var(--co-border)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Guild Chat
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch)}
              className={`w-full text-left px-2.5 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                activeChannel?.id === ch.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              style={activeChannel?.id === ch.id ? { background: 'var(--co-surface)' } : undefined}
            >
              <Hash className="w-3.5 h-3.5 shrink-0" style={{ color: activeChannel?.id === ch.id ? 'var(--co-primary)' : undefined }} />
              {ch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: 'var(--co-surface)' }}>
        {/* Channel Header */}
        {activeChannel && (
          <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: 'var(--co-border)' }}>
            <Hash className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-white">{activeChannel.name}</span>
            {activeChannel.description && (
              <span className="text-xs text-gray-600 ml-2">{activeChannel.description}</span>
            )}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
              <MessageSquare className="w-8 h-8 mb-2 opacity-30" />
              <span className="text-sm">No messages yet. Start the conversation.</span>
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
                <div
                  key={msg.id}
                  className={`group ${isOptimistic ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span
                      className="text-xs font-bold"
                      style={{ color: isAgent ? '#8bbfff' : 'var(--co-primary)' }}
                    >
                      {senderName}
                    </span>
                    {isAgent && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-medium"
                        style={{ background: '#8bbfff15', color: '#8bbfff', border: '1px solid #8bbfff25' }}>
                        <Bot className="w-2.5 h-2.5" />
                        bot
                      </span>
                    )}
                    <span className="text-xs text-gray-600">
                      {formatTime(msg.created_at)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 break-words leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                </div>
              )
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Compose Input */}
        <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--co-border)' }}>
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={activeChannel ? `Message #${activeChannel.name}...` : 'Select a channel...'}
              rows={1}
              className="flex-1 bg-co-bg border rounded px-3 py-2 text-sm text-white resize-none focus:outline-none transition-colors"
              style={{
                borderColor: 'var(--co-border)',
                maxHeight: '120px',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--co-primary)')}
              onBlur={e => (e.target.style.borderColor = 'var(--co-border)')}
              disabled={sending || !activeChannel}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending || !activeChannel}
              className="p-2.5 rounded transition-colors disabled:opacity-30"
              style={{ background: 'var(--co-primary)', color: '#000' }}
              onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#d4a57a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--co-primary)' }}
            >
              {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send />}
            </button>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Enter to send · Shift+Enter for newline
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuildChatPage
