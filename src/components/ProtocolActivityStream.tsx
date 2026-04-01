// @ts-nocheck
/**
 * P111 — Live Protocol Activity Stream
 * A canvas-based horizontal streaming visualization where protocol events
 * flow right-to-left across categorized bands (seismograph-style).
 *
 * Dia bilateral review incorporated:
 * - R1: Canvas over SVG for 60fps performance
 * - R3: 120px height (20px per band)
 * - R5: 3-tier event sizing (2px/4px/6px radius)
 * - R7: Opacity fade 1.0→0.3 over 10 minutes
 * - R10: Prune to ≤100 events
 * - D1: Fixed band labels outside canvas
 * - D2: Relative time markers (Now, 5m, 10m)
 * - D4: Empty state handling
 */

import { useRef, useEffect, useCallback, useState } from 'react'
import { Activity } from 'lucide-react'

// ── Band definitions ────────────────────────────────────────────────────────

interface Band {
  id: string
  label: string
  color: string
  eventTypes: string[]
}

const BANDS: Band[] = [
  {
    id: 'sprint',
    label: 'Sprint',
    color: '#8aba8a',
    eventTypes: [
      'task_proposed', 'sprint_claimed', 'sprint_unclaimed', 'sprint_completed',
      'sprint_cancelled', 'sprint_withdrawn', 'progress_posted', 'context_injected',
      'sprint_paused', 'sprint_resumed',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    color: 'var(--co-primary)',
    eventTypes: ['sprint_entered_testing', 'sprint_testing_approved', 'sprint_testing_reopened'],
  },
  {
    id: 'communication',
    label: 'Comms',
    color: '#7a9ab5',
    eventTypes: ['chat_message_posted', 'link_shared'],
  },
  {
    id: 'negotiation',
    label: 'Negot.',
    color: '#9a7ab5',
    eventTypes: ['negotiation_accepted', 'negotiation_countered', 'negotiation_declined', 'capability_matched'],
  },
  {
    id: 'presence',
    label: 'Presence',
    color: '#06b6d4',
    eventTypes: ['capability_broadcast', 'functional_mode_changed'],
  },
  {
    id: 'health',
    label: 'Health',
    color: '#ef4444',
    eventTypes: ['skill_hash_drift_detected', 'skill_hash_aligned', 'agent_capacity_critical'],
  },
]

// Event type → band index lookup
const EVENT_TO_BAND = new Map<string, number>()
BANDS.forEach((band, i) => {
  band.eventTypes.forEach(et => EVENT_TO_BAND.set(et, i))
})

// ── 3-tier event sizing (R5) ────────────────────────────────────────────────

function eventRadius(eventType: string): number {
  if (eventType === 'capability_broadcast') return 2
  if ([
    'sprint_completed', 'sprint_entered_testing', 'sprint_testing_approved',
    'sprint_testing_reopened', 'task_proposed', 'sprint_claimed', 'sprint_cancelled',
  ].includes(eventType)) return 6
  return 4
}

function eventGlow(eventType: string): boolean {
  return [
    'sprint_completed', 'sprint_testing_approved', 'sprint_entered_testing',
  ].includes(eventType)
}

// ── Mark data structure ─────────────────────────────────────────────────────

interface EventMark {
  id: string
  eventType: string
  bandIndex: number
  timestamp: number // ms since epoch
  color: string
  radius: number
  glow: boolean
  agentName?: string
  sprintId?: string
}

// ── Time window ─────────────────────────────────────────────────────────────

const WINDOW_MS = 3 * 60 * 60 * 1000 // 3 hours
const MAX_MARKS = 250 // prune to ≤250

// ── Heartbeat deduplication (R2) ────────────────────────────────────────────
const HEARTBEAT_DEDUP_MS = 5 * 60 * 1000 // 5 minutes per agent

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  protocolEvents: unknown[]
}

// P116 — Tooltip state
interface TooltipState {
  mark: EventMark
  clientX: number
  clientY: number
}

export default function ProtocolActivityStream({ protocolEvents }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const marksRef = useRef<EventMark[]>([])
  const animFrameRef = useRef(0)
  const seenIdsRef = useRef<Set<string>>(new Set())
  const lastHeartbeatRef = useRef<Map<string, number>>(new Map()) // agentId → timestamp
  const [canvasWidth, setCanvasWidth] = useState(800)
  // P116 — hover state
  const mouseRef = useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null)
  const hoveredMarkIdRef = useRef<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const BAND_HEIGHT = 20
  const TOTAL_HEIGHT = BANDS.length * BAND_HEIGHT
  const LABEL_WIDTH = 52

  // Resize observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setCanvasWidth(Math.floor(entry.contentRect.width) - LABEL_WIDTH)
      }
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  // Convert protocol events to marks
  const processEvent = useCallback((ev: unknown): EventMark | null => {
    if (seenIdsRef.current.has((ev as any).id)) return null
    seenIdsRef.current.add((ev as any).id)

    const bandIndex = EVENT_TO_BAND.get((ev as any).event_type)
    if (bandIndex == null) return null

    const timestamp = new Date((ev as any).created_at).getTime()
    const band = BANDS[bandIndex]

    // R2: Heartbeat deduplication
    if ((ev as any).event_type === 'capability_broadcast') {
      const agentId = ev.agent_id || (ev as any).agent?.name || 'unknown'
      const lastHb = lastHeartbeatRef.current.get(agentId) || 0
      if (timestamp - lastHb < HEARTBEAT_DEDUP_MS) return null
      lastHeartbeatRef.current.set(agentId, timestamp)
    }

    return {
      id: (ev as any).id,
      eventType: (ev as any).event_type,
      bandIndex,
      timestamp,
      color: band.color,
      radius: eventRadius((ev as any).event_type),
      glow: eventGlow((ev as any).event_type),
      agentName: ev.agent?.name || (ev as any).payload?.agent_name,
      sprintId: ev.payload?.sprint_id_label || (ev as any).sprint?.sprint_id,
    }
  }, [])

  // Ingest events — rebuild from the full incoming set each time
  // (query returns the complete 12h window; recompute rather than accumulate)
  useEffect(() => {
    if (protocolEvents.length === 0) return
    // Reset seen + heartbeat dedup state so a fresh query rebuilds marks cleanly
    seenIdsRef.current = new Set()
    lastHeartbeatRef.current = new Map()
    const newMarks: EventMark[] = []
    for (const ev of protocolEvents) {
      const mark = processEvent(ev)
      if (mark) newMarks.push(mark)
    }
    // Keep newest MAX_MARKS (events arrive newest-first)
    marksRef.current = newMarks.slice(0, MAX_MARKS)
  }, [protocolEvents, processEvent])

  // P116 — mouse handlers (defined outside draw so they can be removed on cleanup)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        clientX: e.clientX,
        clientY: e.clientY,
      }
    }
    function onMouseLeave() {
      mouseRef.current = null
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [canvasWidth])

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function draw() {
      if (!ctx || !canvas) return
      const now = Date.now()
      const w = canvasWidth
      const h = TOTAL_HEIGHT
      const dpr = window.devicePixelRatio || 1

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Clear
      ctx.clearRect(0, 0, w, h)

      // Draw band separators
      for (let i = 1; i < BANDS.length; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * BAND_HEIGHT)
        ctx.lineTo(w, i * BAND_HEIGHT)
        ctx.strokeStyle = 'var(--co-surface)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw time markers (D2)
      const markers = [
        { label: 'now', x: w - 4 },
        { label: '1h',  x: w * 0.67 },
        { label: '2h',  x: w * 0.33 },
        { label: '3h',  x: 4 },
      ]
      ctx.font = '9px "IBM Plex Mono", monospace'
      ctx.textAlign = 'center'
      markers.forEach(m => {
        ctx.fillStyle = 'var(--co-surface)'
        ctx.fillText(m.label, m.x, h - 2)
      })

      // Draw event marks
      const marks = marksRef.current
      // Prune old marks
      const cutoff = now - WINDOW_MS
      marksRef.current = marks.filter(m => m.timestamp > cutoff)

      for (const mark of marksRef.current) {
        const age = now - mark.timestamp
        const progress = age / WINDOW_MS // 0 (newest) to 1 (oldest)
        if (progress > 1) continue

        // X position: right edge = newest, left edge = oldest
        const x = w - progress * w
        // Y position: center of band + slight jitter for visual interest
        const bandY = mark.bandIndex * BAND_HEIGHT + BAND_HEIGHT / 2
        const jitter = (mark.id.charCodeAt(0) % 7 - 3) * 1.5 // deterministic jitter
        const y = bandY + jitter

        // R7: Opacity fade 1.0 → 0.3
        const opacity = 1.0 - progress * 0.7

        // Draw glow for tier-3 events
        if (mark.glow && opacity > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, mark.radius + 4, 0, Math.PI * 2)
          ctx.fillStyle = mark.color + Math.floor(opacity * 0.15 * 255).toString(16).padStart(2, '0')
          ctx.fill()
        }

        // Draw mark
        ctx.beginPath()
        ctx.arc(x, y, mark.radius, 0, Math.PI * 2)
        ctx.fillStyle = mark.color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }

      // D4: Empty state
      if (marksRef.current.length === 0) {
        ctx.fillStyle = 'var(--co-border)'
        ctx.font = '10px "IBM Plex Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText('no protocol activity in the last 3 hours', w / 2, h / 2 + 4)
      }

      // P116 — Hover detection: find nearest mark to mouse cursor
      const mouse = mouseRef.current
      if (mouse) {
        const HIT_RADIUS = 12
        let closest: EventMark | null = null
        let closestDist = HIT_RADIUS
        let closestX = 0
        let closestY = 0

        for (const mark of marksRef.current) {
          const age = now - mark.timestamp
          const progress = age / WINDOW_MS
          if (progress > 1) continue
          const mx = w - progress * w
          const my = mark.bandIndex * BAND_HEIGHT + BAND_HEIGHT / 2 + (mark.id.charCodeAt(0) % 7 - 3) * 1.5
          const dist = Math.sqrt((mx - mouse.x) ** 2 + (my - mouse.y) ** 2)
          if (dist < closestDist) {
            closestDist = dist
            closest = mark
            closestX = mx
            closestY = my
          }
        }

        if (closest) {
          // White ring highlight
          ctx.beginPath()
          ctx.arc(closestX, closestY, closest.radius + 5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255,255,255,0.85)'
          ctx.lineWidth = 1.5
          ctx.stroke()
          if (hoveredMarkIdRef.current !== closest.id) {
            hoveredMarkIdRef.current = closest.id
            setTooltip({ mark: closest, clientX: mouse.clientX, clientY: mouse.clientY })
          }
        } else {
          if (hoveredMarkIdRef.current !== null) {
            hoveredMarkIdRef.current = null
            setTooltip(null)
          }
        }
      } else {
        if (hoveredMarkIdRef.current !== null) {
          hoveredMarkIdRef.current = null
          setTooltip(null)
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [canvasWidth])

  // P116 — Relative time helper
  function relTime(ts: number): string {
    const diff = Date.now() - ts
    if (diff < 60_000) return `${Math.round(diff / 1000)}s ago`
    if (diff < 3_600_000) return `${Math.round(diff / 60_000)}m ago`
    return `${Math.round(diff / 3_600_000)}h ago`
  }

  // P139: Hide when no events to avoid empty black box
  if (protocolEvents.length === 0) return null

  return (
    <div className="mb-4">
      <div
        ref={containerRef}
        className="bg-co-bg border border-co-border rounded-lg overflow-hidden"
        style={{ height: `${TOTAL_HEIGHT}px` }}
      >
        <div style={{ display: 'flex', height: '100%' }}>
          {/* D1: Fixed band labels (outside canvas) */}
          <div style={{
            width: `${LABEL_WIDTH}px`, flexShrink: 0,
            display: 'flex', flexDirection: 'column',
            borderRight: '1px solid var(--co-border)',
          }}>
            {BANDS.map(band => (
              <div
                key={band.id}
                style={{
                  height: `${BAND_HEIGHT}px`,
                  display: 'flex', alignItems: 'center',
                  paddingLeft: '6px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.5rem',
                  color: band.color + '88',
                  letterSpacing: '0.04em',
                  borderBottom: '1px solid var(--co-border)',
                }}
              >
                {band.label}
              </div>
            ))}
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              flex: 1,
              height: '100%',
              display: 'block',
              cursor: tooltip ? 'crosshair' : 'default',
            }}
          />
        </div>
      </div>

      {/* P116 — Hover tooltip (fixed position, follows cursor) */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.clientX + 14,
          top: tooltip.clientY - 10,
          background: 'rgba(10, 10, 10, 0.97)',
          border: `1px solid ${tooltip.mark.color}55`,
          borderRadius: '5px',
          padding: '7px 10px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.62rem',
          color: 'var(--co-text)',
          pointerEvents: 'none',
          zIndex: 9999,
          minWidth: '180px',
          boxShadow: `0 2px 10px rgba(0,0,0,0.7), 0 0 6px ${tooltip.mark.color}22`,
        }}>
          <div style={{ color: tooltip.mark.color, fontWeight: 600, marginBottom: '4px', fontSize: '0.65rem' }}>
            {tooltip.mark.eventType.replace(/_/g, ' ')}
          </div>
          <div style={{ color: 'var(--co-text-muted)', fontSize: '0.58rem', marginBottom: '4px' }}>
            {relTime(tooltip.mark.timestamp)}
          </div>
          {tooltip.mark.agentName && (
            <div style={{ color: 'var(--co-text-muted)' }}>
              agent: <span style={{ color: 'var(--co-text)' }}>{tooltip.mark.agentName}</span>
            </div>
          )}
          {tooltip.mark.sprintId && (
            <div style={{ color: 'var(--co-text-muted)' }}>
              sprint: <span style={{ color: 'var(--co-text)' }}>{tooltip.mark.sprintId}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
