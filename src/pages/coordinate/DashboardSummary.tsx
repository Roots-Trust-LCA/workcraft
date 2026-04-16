// @ts-nocheck
/**
 * DashboardSummary — Mini views of roadmap items and active sprints
 * at the top of the Workshop page. Glanceable, compact, clickable.
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { RoadmapItem } from '../../types/roadmap'
import { PRIORITY_META, STATUS_META } from '../../types/roadmap'
import type { CoordinationProposal } from '../../types/coordination'
import { STATUS_COLORS, STATUS_LABELS } from './constants'
import { Map, Zap, ChevronRight } from 'lucide-react'

interface DashboardSummaryProps {
  sprints: CoordinationProposal[]
}

export function DashboardSummary({ sprints }: DashboardSummaryProps) {
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
        .limit(6)
      setRoadmapItems(data || [])
    }
    load()

    const channel = supabase
      .channel('dashboard-roadmap')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'roadmap_items' }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  // Active sprints = in_progress + testing + proposed (non-completed, non-cancelled)
  const activeSprints = sprints
    .filter(s => ['in_progress', 'testing', 'proposed'].includes(s.status))
    .slice(0, 6)

  const hasRoadmap = roadmapItems.length > 0
  const hasActiveSprints = activeSprints.length > 0

  if (!hasRoadmap && !hasActiveSprints) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* ── Roadmap Mini ──────────────────────────────────────── */}
      <div className="rounded-lg overflow-hidden" style={{ background: 'var(--co-bg)', border: '1px solid var(--co-border)' }}>
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'var(--co-border)', background: '#0a0a0a' }}>
          <div className="flex items-center gap-2">
            <Map className="w-3.5 h-3.5 text-[#a78bfa]" />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Roadmap
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)' }}>
              {roadmapItems.length} active
            </span>
          </div>
          <a
            href="#roadmap-panel"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('roadmap-panel')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-0.5 text-co-text-muted hover:text-co-text transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem' }}
          >
            view all <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="px-3 py-2">
          {!hasRoadmap ? (
            <p className="text-xs text-co-text-muted py-2 text-center">No active roadmap items</p>
          ) : (
            <div className="space-y-1.5">
              {roadmapItems.map(item => {
                const pm = PRIORITY_META[item.priority]
                const sm = STATUS_META[item.status]
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-1 px-1 rounded hover:bg-co-surface transition-colors cursor-pointer"
                    onClick={() => document.getElementById('roadmap-panel')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {/* R-series ID */}
                    {item.roadmap_id && (
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', fontWeight: 500,
                        color: '#a78bfa', minWidth: '28px',
                      }}>
                        {item.roadmap_id}
                      </span>
                    )}
                    {/* Priority dot */}
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pm.color }} />
                    {/* Title */}
                    <span className="text-xs text-co-text truncate flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.title}
                    </span>
                    {/* Status */}
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem',
                      color: sm.color, whiteSpace: 'nowrap',
                    }}>
                      {sm.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Active Sprints Mini ───────────────────────────────── */}
      <div className="rounded-lg overflow-hidden" style={{ background: 'var(--co-bg)', border: '1px solid var(--co-border)' }}>
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'var(--co-border)', background: '#0a0a0a' }}>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--co-primary)' }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: 'var(--co-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Active Sprints
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'var(--co-text-muted)' }}>
              {activeSprints.length} open
            </span>
          </div>
          <a
            href="#sprint-tabs"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('sprint-tabs')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-0.5 text-co-text-muted hover:text-co-text transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem' }}
          >
            view all <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="px-3 py-2">
          {!hasActiveSprints ? (
            <p className="text-xs text-co-text-muted py-2 text-center">No active sprints</p>
          ) : (
            <div className="space-y-1.5">
              {activeSprints.map(sprint => {
                const statusColor = STATUS_COLORS[sprint.status] || 'var(--co-text-muted)'
                const statusLabel = STATUS_LABELS[sprint.status] || sprint.status
                const sprintLabel = sprint.sprint_id || sprint.id.slice(0, 6)
                return (
                  <div
                    key={sprint.id}
                    className="flex items-center gap-2 py-1 px-1 rounded hover:bg-co-surface transition-colors cursor-pointer"
                    onClick={() => navigate(`/sprint/${sprint.id}`)}
                  >
                    {/* Sprint ID */}
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', fontWeight: 500,
                      color: 'var(--co-primary)', minWidth: '36px',
                    }}>
                      {sprintLabel}
                    </span>
                    {/* Status dot */}
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor }} />
                    {/* Title */}
                    <span className="text-xs text-co-text truncate flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {sprint.title}
                    </span>
                    {/* Status */}
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem',
                      color: statusColor, whiteSpace: 'nowrap',
                    }}>
                      {statusLabel}
                    </span>
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
