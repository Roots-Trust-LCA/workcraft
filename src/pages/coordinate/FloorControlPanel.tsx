// @ts-nocheck
/**
 * FloorControlPanel — Phase display, speaker, queue, floor signals.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useState, useCallback } from 'react'
import {
  Radio, Mic, MicOff, ArrowRight, GitBranch,
  ChevronDown,
} from 'lucide-react'
import { CRAFT_SYMBOLS, PHASES, SIGNAL_ICONS, timeAgo } from './constants'


interface FloorControlPanelProps {
  floor: unknown
  signals: unknown[]
  presence: unknown[]
  workshopChannelId: string | null
  onFloorReload: () => void
}

export function FloorControlPanel({ floor, signals, presence, workshopChannelId, onFloorReload }: FloorControlPanelProps) {
const [floorLoading, setFloorLoading] = useState<string | null>(null)

  // Auto-expand when floor was recently active (within 30 min)
  const updatedAt = floor?.updated_at
  const recentlyActive = updatedAt
    ? (Date.now() - new Date(updatedAt).getTime()) < 30 * 60 * 1000
    : false
  const [floorExpanded, setFloorExpanded] = useState(recentlyActive)

  const sendFloorSignal = useCallback(async (signalType: string) => {
    if (!workshopChannelId) return
    setFloorLoading(signalType)
    try {
      await supabase.from('coordination_signals').insert({
        channel_id: workshopChannelId,
        agent_id: null,
        signal_type: signalType,
        context: 'UI action',
      })

      const { data: currentFloor } = await supabase
        .from('channel_floor_state')
        .select('*')
        .eq('channel_id', workshopChannelId)
        .single()

      if (currentFloor) {
        if (signalType === 'request_floor') {
          if (!currentFloor.current_speaker_id) {
            await supabase.from('channel_floor_state')
              .update({ updated_at: new Date().toISOString() })
              .eq('channel_id', workshopChannelId)
          }
        } else if (signalType === 'yield_floor' || signalType === 'pass_floor') {
          const queue = currentFloor.queue || []
          const next = queue.shift() || null
          await supabase.from('channel_floor_state')
            .update({ current_speaker_id: next, queue, updated_at: new Date().toISOString() })
            .eq('channel_id', workshopChannelId)
        }
      }

      onFloorReload()
    } finally {
      setFloorLoading(null)
    }
  }, [workshopChannelId, onFloorReload])

  return (
    <div className="bg-co-bg border border-co-border rounded-lg p-4">
      <button
        className="w-full flex items-center gap-2 text-left"
        onClick={() => setFloorExpanded(v => !v)}
      >
        <Radio className="w-4 h-4 flex-shrink-0" />
        <h2 className="text-sm font-semibold text-co-text flex-1">Floor Control</h2>
        {!floorExpanded && (
          <span className="text-xs text-co-text-muted flex items-center gap-1.5">
            {floor?.current_phase && (
              <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--co-surface)', color: 'var(--co-primary)' }}>
                {(floor as any).current_phase}
              </span>
            )}
            {floor?.participants?.name
              ? <span className="text-co-text-muted">{(floor as any).participants.name}</span>
              : <span className="text-co-text-muted">idle</span>}
          </span>
        )}
        <ChevronDown
          className="w-3 h-3 text-co-text-muted flex-shrink-0 transition-transform"
          style={{ transform: floorExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {floorExpanded && (
        <div className="mt-3">
          {/* Phase bar */}
          <div className="overflow-x-auto mb-4">
            <div className="flex gap-1 min-w-max sm:min-w-0">
              {PHASES.map((phase) => (
                <div
                  key={phase}
                  className="flex-1 text-center text-xs py-1 rounded whitespace-nowrap px-2"
                  style={{
                    background: floor?.current_phase === phase ? 'var(--co-primary)' : 'var(--co-surface)',
                    color: floor?.current_phase === phase ? '#0c0c0c' : 'var(--co-text-muted)',
                  }}
                >
                  {phase}
                </div>
              ))}
            </div>
          </div>

          {/* Floor control buttons */}
          <div className="flex gap-1.5 mb-4">
            {([
              ['request_floor', 'Request Floor', Mic],
              ['yield_floor', 'Yield', MicOff],
              ['pass_floor', 'Pass', ArrowRight],
              ['building_on', 'Building On', GitBranch],
            ] as [string, string, typeof Mic][]).map(([type, label, Icon]) => (
              <button
                key={type}
                onClick={() => sendFloorSignal(type)}
                disabled={!!floorLoading}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors"
                style={{
                  background: floorLoading === type ? '#c4956a33' : 'var(--co-surface)',
                  color: floorLoading === type ? 'var(--co-primary)' : '#777',
                  border: '1px solid var(--co-border)',
                  cursor: floorLoading ? 'wait' : 'pointer',
                  opacity: floorLoading && floorLoading !== type ? 0.5 : 1,
                }}
                title={label}
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-co-text-muted" />
            <span className="text-sm">
              {floor?.participants?.name
                ? <span className="font-medium text-co-text">{(floor as any).participants.name}</span>
                : <span className="text-co-text-muted">Floor open</span>}
            </span>
            {floor?.current_speaker_id && (() => {
              const speakerPresence = presence.find((p: Record<string, unknown>) => p.agent_id === (floor as any).current_speaker_id)
              if (speakerPresence?.functional_mode) {
                const [fc, fm] = ((speakerPresence as any).functional_mode as string).split(':')
                return (
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', background: '#7ccfb818', color: '#7ccfb8', border: '1px solid #7ccfb833', borderRadius: '3px', padding: '1px 6px' }}>
                    {CRAFT_SYMBOLS[fc] || ''} {fm}
                  </span>
                )
              }
              return null
            })()}
            {floor?.mode && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded bg-co-surface-hover text-co-text-muted">{(floor as any).mode}</span>
            )}
          </div>

          {/* Queue */}
          {floor?.queue && (floor as any).queue.length > 0 && (
            <div className="text-xs text-co-text-muted mb-3 space-y-0.5">
              <span className="text-co-text-muted">Queue:</span>
              {(floor as any).queue.map((qid: string, i: number) => {
                const qAgent = presence.find((p: Record<string, unknown>) => p.agent_id === qid)
                const name = qAgent?.participants?.name || qid.slice(0, 8)
                const mode = qAgent?.functional_mode
                return (
                  <span key={qid} className="inline-flex items-center gap-1 ml-1">
                    {i > 0 && <span className="text-co-text-muted">→</span>}
                    <span className="text-co-text-muted">{name}</span>
                    {mode && (() => {
                      const [fc, fm] = (mode as string).split(':')
                      return <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#7ccfb8' }}>{CRAFT_SYMBOLS[fc] || ''}{fm}</span>
                    })()}
                  </span>
                )
              })}
            </div>
          )}

          {/* Signals */}
          {signals.length > 0 && (
            <div className="space-y-1 mt-3 border-t border-co-border pt-3">
              {signals.map((s: unknown, i: number) => {
                const Icon = SIGNAL_ICONS[(s as any).signal_type] || ArrowRight
                return (
                  <div key={i} className="flex items-center gap-2 text-xs text-co-text-muted">
                    <Icon className="w-3 h-3" />
                    <span>{(s as any).participants?.name}</span>
                    <span>·</span>
                    <span>{(s as any).signal_type}</span>
                    <span className="ml-auto">{timeAgo((s as any).created_at)}</span>
                  </div>
                )
              })}
            </div>
          )}

          {floor?.updated_at && (
            <div className="mt-3 text-xs text-co-text-muted">last signal {timeAgo((floor as any).updated_at)}</div>
          )}
        </div>
      )}
    </div>
  )
}
