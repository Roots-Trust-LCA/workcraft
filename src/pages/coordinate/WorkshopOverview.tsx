// @ts-nocheck
/**
 * WorkshopOverview — Unified overview card combining Roadmap, Active Sprints,
 * and Active Agents into a single glanceable panel below the health bar.
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { RoadmapItem } from '../../types/roadmap'
import { PRIORITY_META, STATUS_META } from '../../types/roadmap'
import type { CoordinationProposal } from '../../types/coordination'
import { STATUS_COLORS, STATUS_LABELS } from './constants'
import { Map, Zap, Users, ChevronRight, Circle } from 'lucide-react'

// ── Craft symbols ────────────────────────────────────────────────────────────
const CRAFT_SYMBOLS: Record<string, string> = {
  code: '{ }', word: '¶', form: '◇', sound: '~',
  earth: '▽', body: '○', fire: '△', water: '≈',
}

interface WorkshopOverviewProps {
  sprints: CoordinationProposal[]
  presence: any[]
}

export function WorkshopOverview({ sprints, presence }: WorkshopOverviewProps) {
  const navigate = useNavigate()
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('roadmap_items')
        .select('*, creator:participants!roadmap_items_created_by_fkey(name)')
        .not('status', 'eq', 'completed')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(5)
      setRoadmapItems(data || [])
    }
    load()
    const ch = supabase.channel('overview-roadmap')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'roadmap_items' }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [])

  const activeSprints = sprints
    .filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status))
    .slice(0, 6)

  const onlineThreshold = 45 * 60 * 1000
  const now = Date.now()
  const agents = presence
    .filter(p => p.participants?.is_agent !== false)
    .map(p => {
      const isOnline = p.last_seen && (now - new Date(p.last_seen).getTime()) < onlineThreshold
      return { ...p, isOnline }
    })
    .sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0))
    .slice(0, 6)

  // Section header style
  const sectionHeader = (icon: React.ReactNode, label: string, color: string, count: number) => (
    <div className="flex items-center gap-2 mb-2 pb-1.5" style={{ borderBottom: '1px solid #1a1a1a' }}>
      {icon}
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
        {count}
      </span>
    </div>
  )

  return (
    <div className="bg-co-bg border border-co-border rounded-lg mb-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ divideColor: '#1a1a1a' }}>

        {/* ── Roadmap ─────────────────────────────────────────── */}
        <div className="px-4 py-3">
          {sectionHeader(
            <Map className="w-3.5 h-3.5 text-[#a78bfa]" />,
            'Roadmap', '#a78bfa', roadmapItems.length
          )}
          {roadmapItems.length === 0 ? (
            <p className="text-xs text-co-text-muted py-1">No active items</p>
          ) : (
            <div className="space-y-1">
              {roadmapItems.map(item => {
                const pm = PRIORITY_META[item.priority]
                const sm = STATUS_META[item.status]
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-0.5 rounded hover:bg-co-surface transition-colors cursor-pointer px-1"
                    onClick={() => document.getElementById('roadmap-panel')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {item.roadmap_id && (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: '#a78bfa', minWidth: '24px', fontWeight: 500 }}>
                        {item.roadmap_id}
                      </span>
                    )}
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pm.color }} />
                    <span className="text-xs text-co-text truncate flex-1">{item.title}</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: sm.color, whiteSpace: 'nowrap' }}>
                      {sm.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Active Sprints ──────────────────────────────────── */}
        <div className="px-4 py-3">
          {sectionHeader(
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--co-primary)' }} />,
            'Sprints', 'var(--co-primary)', activeSprints.length
          )}
          {activeSprints.length === 0 ? (
            <p className="text-xs text-co-text-muted py-1">No active sprints</p>
          ) : (
            <div className="space-y-1">
              {activeSprints.map(sprint => {
                const statusColor = STATUS_COLORS[sprint.status] || 'var(--co-text-muted)'
                const statusLabel = STATUS_LABELS[sprint.status] || sprint.status
                const sprintLabel = sprint.sprint_id || sprint.id.slice(0, 6)
                return (
                  <div
                    key={sprint.id}
                    className="flex items-center gap-2 py-0.5 rounded hover:bg-co-surface transition-colors cursor-pointer px-1"
                    onClick={() => navigate(`/sprint/${sprint.id}`)}
                  >
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: 'var(--co-primary)', minWidth: '32px', fontWeight: 500 }}>
                      {sprintLabel}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor }} />
                    <span className="text-xs text-co-text truncate flex-1">{sprint.title}</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: statusColor, whiteSpace: 'nowrap' }}>
                      {statusLabel}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Active Agents ───────────────────────────────────── */}
        <div className="px-4 py-3">
          {sectionHeader(
            <Users className="w-3.5 h-3.5 text-[#8bbfff]" />,
            'Agents', '#8bbfff', agents.filter(a => a.isOnline).length
          )}
          {agents.length === 0 ? (
            <p className="text-xs text-co-text-muted py-1">No agents registered</p>
          ) : (
            <div className="space-y-1">
              {agents.map(agent => {
                const name = agent.participants?.name || agent.agent_id?.slice(0, 8)
                const craft = agent.participants?.craft_primary
                const craftSymbol = craft ? CRAFT_SYMBOLS[craft] || '' : ''
                const mode = agent.functional_mode
                const modeLabel = mode ? mode.split(':')[1] || mode : null
                const currentSprint = agent.current_sprint

                // Find sprint label if executing
                const executingSprint = currentSprint
                  ? sprints.find(s => s.id === currentSprint)
                  : null

                return (
                  <div key={agent.agent_id} className="flex items-center gap-2 py-0.5 px-1">
                    {/* Online indicator */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${agent.isOnline ? 'animate-pulse' : ''}`}
                      style={{ background: agent.isOnline ? '#4ade80' : '#555' }}
                    />
                    {/* Craft symbol */}
                    {craftSymbol && (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)', minWidth: '18px', textAlign: 'center' }}>
                        {craftSymbol}
                      </span>
                    )}
                    {/* Name */}
                    <span className="text-xs truncate" style={{ color: agent.isOnline ? 'var(--co-text)' : 'var(--co-text-muted)' }}>
                      {name}
                    </span>
                    {/* Status: mode or sprint */}
                    {executingSprint ? (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: 'var(--co-primary)', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                        {executingSprint.sprint_id || '…'}
                      </span>
                    ) : modeLabel ? (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: 'var(--co-text-muted)', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                        {modeLabel}
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: '#555', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                        {agent.isOnline ? agent.status || 'idle' : 'offline'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
