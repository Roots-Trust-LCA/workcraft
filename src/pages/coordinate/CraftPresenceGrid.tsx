// @ts-nocheck
/**
 * CraftPresenceGrid — Agent presence cards with craft-based styling.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import Avatar from '../../components/Avatar'
import type { CoordinationProposal } from '../../types/coordination'
import { CRAFT_SYMBOLS, CRAFT_COLORS, timeAgo } from './constants'
import { CapacitySparkline } from '../../components/CapacitySparkline'
import { supabase } from '../../lib/supabase'
import { usePageTitle } from '../../hooks/usePageTitle'


interface CraftPresenceGridProps {
  presence: unknown[]
  sprints: CoordinationProposal[]
}

const AGENT_PAGE_SIZE = 8

export function CraftPresenceGrid({ presence, sprints }: CraftPresenceGridProps) {
  usePageTitle('Craft Presence Grid')

  const navigate = useNavigate()
  const [agentPage, setAgentPage] = useState(0)
  const [capacityHistory, setCapacityHistory] = useState<Record<string, Array<{ timestamp: string; capacity: number }>>>({})

  const now = Date.now()
  const onlineThreshold = 15 * 60 * 1000
  const inactiveThreshold = 2 * 60 * 60 * 1000
  const recentThreshold = 24 * 60 * 60 * 1000
  const onlineCount = presence.filter(p => p.last_seen && (now - new Date((p as any).last_seen).getTime()) < onlineThreshold).length

  // P161: Fetch 24h capacity history from capability_broadcast events
  useEffect(() => {
    const fetch24hCapacity = async () => {
      const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString()

      // Get all capability_broadcast events from last 24h
      const { data } = await supabase
        .from('protocol_events')
        .select('agent_id, payload, created_at')
        .eq('event_type', 'capability_broadcast')
        .gte('created_at', twentyFourHoursAgo)
        .order('created_at', { ascending: true })

      if (!data) return

      // Group by agent_id and extract capacity values
      const historyByAgent: Record<string, Array<{ timestamp: string; capacity: number }>> = {}

      data.forEach((event: any) => {
        const agentId = event.agent_id
        const capacity = event.payload?.capacity
        const timestamp = event.created_at

        if (agentId && typeof capacity === 'number') {
          if (!historyByAgent[agentId]) {
            historyByAgent[agentId] = []
          }
          historyByAgent[agentId].push({ timestamp, capacity })
        }
      })

      setCapacityHistory(historyByAgent)
    }

    fetch24hCapacity()
  }, [presence, now])

  // P86: Sort presence — active first, then idle, then inactive
  const sortedPresence = [...presence].sort((a: unknown, b: unknown) => {
    const aMs = a.last_seen ? now - new Date((a as any).last_seen).getTime() : Infinity
    const bMs = b.last_seen ? now - new Date((b as any).last_seen).getTime() : Infinity
    const aInactive = aMs > inactiveThreshold ? 1 : 0
    const bInactive = bMs > inactiveThreshold ? 1 : 0
    if (aInactive !== bInactive) return aInactive - bInactive
    return aMs - bMs
  })

  const agentPages = Math.ceil(sortedPresence.length / AGENT_PAGE_SIZE)
  const pagedAgents = sortedPresence.slice(agentPage * AGENT_PAGE_SIZE, (agentPage + 1) * AGENT_PAGE_SIZE)

  return (
    <div className="bg-co-bg border border-co-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-2" >
        <Users className="w-3.5 h-3.5" />
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Craft Presence
        </span>
        {presence.length > 0 && (
          <span className="ml-auto" >
            {onlineCount > 0 ? `${onlineCount} online` : 'all offline'} · {presence.length} total
          </span>
        )}
      </div>

      {presence.length === 0 ? (
        <p className="px-4 py-5 text-co-text-muted" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem' }}>
          No agents registered yet
        </p>
      ) : (
        <div className="p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {pagedAgents.map((p: any) => {
              const status = p.status || 'active'
              const capacity = p.capacity ?? 100
              const isExecuting = status === 'executing'
              const name = p.participants?.name || p.agent_id?.slice(0, 8)
              const craftPrimary = p.participants?.craft_primary
              const craftSecondary = p.participants?.craft_secondary
              const claimsRole = p.participants?.role
              const lastSeen = p.last_seen
              const participantId = p.agent_id

              const msSinceSeen = lastSeen ? now - new Date(lastSeen).getTime() : Infinity
              const isOnline = msSinceSeen < onlineThreshold
              const isRecent = msSinceSeen < recentThreshold
              const isOffline = !isOnline && !isRecent
              const isInactive = msSinceSeen > inactiveThreshold
              const connectivityLabel = isOnline ? status : isInactive ? 'inactive' : isRecent ? 'recently' : 'offline'

              const statusColor = isOffline ? 'var(--co-border)'
                : isExecuting ? 'var(--co-primary)'
                : isOnline && status === 'active' ? '#7ccfb8'
                : isOnline && status === 'idle' ? '#fbbf24'
                : isRecent ? 'var(--co-text-muted)'
                : 'var(--co-text-muted)'

              const primaryColor = craftPrimary ? CRAFT_COLORS[craftPrimary] : null

              return (
                <div
                  key={String(p.agent_id)}
                  onClick={() => navigate(`/member/${participantId}`)}
                  className="group cursor-pointer transition-all hover:border-co-border"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: primaryColor && !isInactive ? `3px solid ${primaryColor}40` : undefined,
                    border: primaryColor && !isInactive ? undefined : `1px solid ${isInactive ? '#181818' : isOnline ? 'var(--co-border)' : 'var(--co-surface)'}`,
                    borderRight: primaryColor && !isInactive ? `1px solid ${isInactive ? '#181818' : isOnline ? 'var(--co-border)' : 'var(--co-surface)'}` : undefined,
                    borderTop: primaryColor && !isInactive ? `1px solid ${isInactive ? '#181818' : isOnline ? 'var(--co-border)' : 'var(--co-surface)'}` : undefined,
                    borderBottom: primaryColor && !isInactive ? `1px solid ${isInactive ? '#181818' : isOnline ? 'var(--co-border)' : 'var(--co-surface)'}` : undefined,
                    background: isInactive ? '#0c0c0c'
                      : primaryColor && isOnline ? `linear-gradient(135deg, ${primaryColor}08 0%, ${primaryColor}03 100%)`
                      : primaryColor ? `${primaryColor}05`
                      : isOnline ? '#111' : '#0e0e0e',
                    opacity: isInactive ? 0.4 : 1,
                    transition: 'border-color 0.2s ease, opacity 0.3s ease',
                  }}
                >
                  {/* Row 1: avatar + name + status dot */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <Avatar name={name} size={30} />
                      <span
                        className={isOnline ? 'animate-pulse' : ''}
                        style={{
                          position: 'absolute', bottom: -1, right: -1,
                          width: 8, height: 8, borderRadius: '50%',
                          background: statusColor,
                          border: '1.5px solid #111',
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline gap-1.5">
                      <span
                        className="group-hover:text-co-primary transition-colors truncate"
                        style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', fontWeight: 500, color: isInactive ? 'var(--co-text-muted)' : '#ddd' }}
                      >
                        {name}
                      </span>
                      {claimsRole && !isInactive && (
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#c4956a70' }}>
                          {claimsRole}
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: statusColor, whiteSpace: 'nowrap' }}>
                      {connectivityLabel}
                    </span>
                  </div>

                  {/* Row 2: context or last seen */}
                  {!isInactive && (
                    <div className="truncate mb-1.5" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', paddingLeft: '38px' }}>
                      {isOnline
                        ? (p.context || (isExecuting ? 'executing sprint' : 'available'))
                        : `${lastSeen ? timeAgo(lastSeen) : '—'}`}
                    </div>
                  )}

                  {/* Row 3: capacity bar */}
                  {!isInactive && (
                    <div className="flex items-center gap-2 mb-1.5" >
                      <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--co-surface)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${capacity}%`,
                            background: isOffline ? 'var(--co-border)' : capacity > 60 ? '#7ccfb8' : capacity > 30 ? 'var(--co-primary)' : '#ef4444',
                          }}
                        />
                      </div>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)' }}>
                        {isOnline ? `${capacity}%` : '—'}
                      </span>
                    </div>
                  )}

                  {/* P161: 24h capacity sparkline */}
                  {!isInactive && capacityHistory[participantId] && capacityHistory[participantId].length > 1 && (
                    <div className="mb-1.5">
                      <CapacitySparkline
                        data={capacityHistory[participantId]}
                        currentCapacity={capacity}
                      />
                    </div>
                  )}

                  {/* P153: WIP counter */}
                  {!isInactive && (() => {
                    const activeSprintCount = sprints.filter((s: any) =>
                      (s.status === 'in_progress' || s.status === 'testing') && s.claimed_by === p.agent_id
                    ).length
                    if (activeSprintCount === 0) return null
                    const isOverLimit = activeSprintCount > 2
                    return (
                      <div className="flex items-center gap-1.5 mb-1.5" >
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: '0.6rem',
                          color: isOverLimit ? '#f87171' : 'var(--co-text-muted)',
                          background: isOverLimit ? '#f871710c' : 'transparent',
                          borderRadius: '3px',
                          padding: isOverLimit ? '1px 4px' : '0',
                        }}>
                          {activeSprintCount} WIP{isOverLimit ? ' ⚠' : ''}
                        </span>
                      </div>
                    )
                  })()}

                  {/* Row 4: Craft badges + functional mode */}
                  {!isInactive && (
                    <div className="flex items-center gap-1.5 flex-wrap" >
                      {craftPrimary && (
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem',
                          background: (CRAFT_COLORS[craftPrimary] || 'var(--co-text-muted)') + '18',
                          color: CRAFT_COLORS[craftPrimary] || 'var(--co-text-muted)',
                          border: `1px solid ${(CRAFT_COLORS[craftPrimary] || 'var(--co-text-muted)')}33`,
                          borderRadius: '3px', padding: '1px 6px',
                        }}>
                          {CRAFT_SYMBOLS[craftPrimary] || ''} {craftPrimary}
                        </span>
                      )}
                      {craftSecondary && craftSecondary !== craftPrimary && (
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem',
                          background: (CRAFT_COLORS[craftSecondary] || 'var(--co-text-muted)') + '10',
                          color: (CRAFT_COLORS[craftSecondary] || 'var(--co-text-muted)') + 'aa',
                          borderRadius: '3px', padding: '1px 6px',
                        }}>
                          {CRAFT_SYMBOLS[craftSecondary] || ''} {craftSecondary}
                        </span>
                      )}
                      {/* P27: Functional mode badge */}
                      {p.functional_mode && (() => {
                        const [fc, fm] = (p.functional_mode as string).split(':')
                        return (
                          <span style={{
                            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem',
                            background: '#7ccfb818', color: '#7ccfb8',
                            border: '1px solid #7ccfb833',
                            borderRadius: '3px', padding: '1px 6px',
                          }}>
                            {CRAFT_SYMBOLS[fc] || ''} {fm}
                          </span>
                        )
                      })()}
                      {/* P85: SKILL.md hash (short) */}
                      {p.skill_hash && isOnline && (
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.5rem',
                          color: 'var(--co-text-muted)', marginLeft: 'auto',
                        }}>
                          {(p.skill_hash as string).slice(0, 8)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* P153: Current sprint context */}
                  {!isInactive && p.current_sprint && (() => {
                    const currentSprint = sprints.find((s: any) => s.id === p.current_sprint)
                    if (!currentSprint) return null
                    return (
                      <div className="mt-1.5" >
                        <button
                          className="text-left hover:text-co-primary transition-colors"
                          style={{
                            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem',
                            color: '#c4956a88', background: '#c4956a08',
                            borderRadius: '3px', padding: '2px 6px',
                            border: 'none', cursor: 'pointer',
                          }}
                          onClick={(e) => { e.stopPropagation(); navigate(`/sprint/${currentSprint.id}`) }}
                        >
                          ▸ {currentSprint.sprint_id || currentSprint.title?.slice(0, 30)}
                        </button>
                      </div>
                    )
                  })()}
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {agentPages > 1 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t" >
              <button
                onClick={() => setAgentPage(p => Math.max(0, p - 1))}
                disabled={agentPage === 0}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                className="bg-co-surface text-co-text-muted"
              >← Prev</button>
              <span className="font-mono-plex text-[0.65rem] text-co-text-muted">
                {agentPage + 1} / {agentPages}
              </span>
              <button
                onClick={() => setAgentPage(p => Math.min(agentPages - 1, p + 1))}
                disabled={agentPage === agentPages - 1}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                className="bg-co-surface text-co-text-muted"
              >Next →</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
