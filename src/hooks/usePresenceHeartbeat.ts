import { useEffect, useRef } from 'react'
import { useWorkshop } from '../lib/workshop-context'

const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000

/**
 * Presence heartbeat — updates participants.last_seen_at every 5 minutes
 * for authenticated users.
 */
export function usePresenceHeartbeat() {
  const { supabase } = useWorkshop()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastPingRef = useRef<number>(0)

  useEffect(() => {
    async function ping() {
      const now = Date.now()
      if (now - lastPingRef.current < HEARTBEAT_INTERVAL_MS - 60_000) return
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      lastPingRef.current = now
      await supabase
        .from('participants')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('auth_user_id', session.user.id)
    }

    ping()
    intervalRef.current = setInterval(ping, HEARTBEAT_INTERVAL_MS)
    function handleVisibility() {
      if (document.visibilityState === 'visible') ping()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [supabase])
}
