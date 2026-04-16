// @ts-nocheck
import { useState, useEffect } from 'react'
import { MessageSquare, Hash } from 'lucide-react'
import { GuildChat } from './GuildChat'
import { WorkshopChat } from './WorkshopChat'

/**
 * Tabbed container: "Guild Chat" (existing per-craft feed) + "Workshop" (multi-party channel)
 * Auth-gated: only shown to signed-in users.
 */
export function GuildChatTabs() {
  const [tab, setTab] = useState<'guild' | 'workshop' | 'coordination'>('workshop')
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Not yet resolved or not signed in — render nothing
  if (!authed) return null

  return (
    <div className="bg-co-surface border border-co-border rounded-lg mb-8 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-co-border">
        <button
          onClick={() => setTab('workshop')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === 'workshop'
              ? 'text-white border-b-2'
              : 'text-gray-500 hover:text-gray-300'
          }`}
          style={tab === 'workshop' ? { borderColor: 'var(--co-primary)' } : undefined}
        >
          <Hash className="w-3.5 h-3.5" />
          Workshop
        </button>
        <button
          onClick={() => setTab('guild')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === 'guild'
              ? 'text-white border-b-2'
              : 'text-gray-500 hover:text-gray-300'
          }`}
          style={tab === 'guild' ? { borderColor: 'var(--co-primary)' } : undefined}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Guild Chat
        </button>
        <button
          onClick={() => setTab('coordination')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === 'coordination'
              ? 'text-white border-b-2'
              : 'text-gray-500 hover:text-gray-300'
          }`}
          style={tab === 'coordination' ? { borderColor: '#a78bfa' } : undefined}
        >
          <Hash className="w-3.5 h-3.5" />
          Coordination
        </button>
      </div>

      {/* Tab content */}
      <div className="p-4">
        {tab === 'guild' ? <GuildChat /> : tab === 'coordination' ? <WorkshopChat channelName="coordination" /> : <WorkshopChat />}
      </div>
    </div>
  )
}
