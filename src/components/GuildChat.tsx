// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import { Send, User, Loader } from 'lucide-react'
import { useWorkshop } from '../lib/workshop-context'

export function GuildChat() {
  const { supabase } = useWorkshop()
  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Get session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  // Fetch initial messages & subscribe
  useEffect(() => {
    // 1. Fetch history
    async function fetchHistory() {
      const { data } = await supabase
        .from('guild_messages')
        .select('*, sender:sender_id(name, craft_primary)')
        .order('created_at', { ascending: false }) // Newest first
        .limit(20)
      if (data) setMessages(data.reverse())
    }
    fetchHistory()

    // 2. Subscribe
    const channel = supabase
      .channel('guild-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guild_messages' }, async (payload) => {
        // Optimistically update or re-fetch? Payload doesn't have sender details...
        // Let's refetch or just push basic info if user matches session
        const { data: sender } = await supabase
          .from('participants')
          .select('name, craft_primary')
          .eq('id', payload.new.sender_id)
          .single()
        
        setMessages(prev => [...prev, { ...payload.new, sender }])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!newMessage.trim() || !session?.user) return
    setSending(true)

    // Get sender's participant ID & guild
    const { data: p } = await supabase
      .from('participants')
      .select('id, craft_primary')
      .eq('auth_user_id', session.user.id)
      .single()

    if (p) {
      await supabase.from('guild_messages').insert({
        guild: p.craft_primary || 'global',
        sender_id: p.id,
        message: newMessage.trim()
      })
      setNewMessage('')
    }
    setSending(false)
  }

  return (
    <>
      {/* Messages */}
      <div className="h-56 overflow-y-auto space-y-3 mb-3 pr-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="text-center text-gray-600 text-xs py-10">Start the conversation...</div>
        ) : (
          messages.map(msg => {
            const guild = msg.sender?.craft_primary ? getGuild(msg.sender.craft_primary) : null
            const isMe = session?.user && false // Can't easily check 'isMe' without fetching my participant ID first. Let's skip styling 'me' differently for now.
            
            return (
              <div key={msg.id} className="text-sm">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span 
                    className="text-xs font-bold" 
                    style={{ color: guild?.color || 'var(--co-text-muted)' }}
                  >
                    {msg.sender?.name || 'Anon'}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-gray-300 break-words leading-relaxed">{msg.message}</div>
              </div>
            )
          })
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      {session ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Message the guild..."
            className="flex-1 bg-co-bg border border-co-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-co-primary"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="p-2 bg-co-primary text-black rounded hover:bg-[#d4a57a] disabled:opacity-50 transition-colors"
          >
            {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send />}
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-gray-500 py-2 border-t border-co-border">
          <a href="/login" className="text-co-primary hover:underline">Log in</a> to chat
        </div>
      )}
    </>
  )
}
