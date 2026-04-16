/**
 * Analytics — /coordinate/analytics
 *
 * Workshop Analytics Dashboard: sprint velocity, completion times by
 * complexity, agent contribution, work type distribution, activity heatmap,
 * and summary stats.
 *
 * P235: Built with d3 SVG rendering inside useEffect refs.
 * Design: dark mode forced, IBM Plex Mono + Cormorant, copper accent.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Clock, Users, Zap } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { WORK_TYPE_LABELS } from './constants'
import * as d3 from 'd3'
import { usePageTitle } from '../../hooks/usePageTitle'


// ── Design tokens ────────────────────────────────────────────────────────────

const T = {
  bg: 'var(--co-bg)',
  surface: 'var(--co-surface)',
  border: 'var(--co-border)',
  text: 'var(--co-text)',
  muted: 'var(--co-text-muted)',
  accent: 'var(--co-primary)',
  accentDim: 'color-mix(in srgb, var(--co-primary) 20%, transparent)',
  accentBorder: 'color-mix(in srgb, var(--co-primary) 33%, transparent)',
  mono: "'IBM Plex Mono', monospace",
  serif: "'Cormorant', serif",
  green: '#7ccfb8',
  blue: '#8bbfff',
  purple: '#a78bfa',
  amber: '#fbbf24',
  red: '#ef4444',
}

// ── Types ────────────────────────────────────────────────────────────────────

interface SummaryStats {
  totalCompleted: number
  avgCompletionHours: number
  activeAgents: number
  protocolEvents: number
}

interface VelocityPoint {
  week: Date
  count: number
}

interface ComplexityBar {
  tier: string
  avgHours: number
}

interface AgentBar {
  name: string
  count: number
}

interface WorkTypeSlice {
  type: string
  label: string
  count: number
}

interface HeatCell {
  day: number   // 0=Mon … 6=Sun
  hour: number  // 0-23
  count: number
}

// ── Small helpers ────────────────────────────────────────────────────────────

function startOfWeek(d: Date): Date {
  const dt = new Date(d)
  const day = dt.getUTCDay() || 7 // Mon=1..Sun=7
  dt.setUTCDate(dt.getUTCDate() - (day - 1))
  dt.setUTCHours(0, 0, 0, 0)
  return dt
}

function weekKey(d: Date): string {
  return startOfWeek(d).toISOString().slice(0, 10)
}

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, sub }: {
  label: string; value: string | number; icon: React.ElementType; sub?: string
}) {
  usePageTitle('Analytics')

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 8, padding: '16px 20px', flex: '1 1 160px', minWidth: 140,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Icon size={14} color={T.accent} />
        <span style={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: '1.6rem', fontWeight: 700, color: T.text, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: T.mono, fontSize: '0.68rem', color: T.muted, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  )
}

// ── Chart wrapper ────────────────────────────────────────────────────────────

function ChartCard({ title, children, loading }: {
  title: string; children: React.ReactNode; loading: boolean
}) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 8, padding: '20px 24px',
    }}>
      <h2 style={{ fontFamily: T.serif, fontSize: '1.1rem', color: T.text, marginBottom: 16, fontWeight: 600 }}>
        {title}
      </h2>
      {loading ? (
        <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: T.mono, fontSize: '0.75rem', color: T.muted }}>loading…</span>
        </div>
      ) : children}
    </div>
  )
}

// ── Sprint Velocity chart ────────────────────────────────────────────────────

function VelocityChart({ data }: { data: VelocityPoint[] }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current || data.length === 0) return
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    const W = ref.current.clientWidth || 480
    const H = 180
    const margin = { top: 10, right: 16, bottom: 32, left: 36 }
    const w = W - margin.left - margin.right
    const h = H - margin.top - margin.bottom

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.week) as [Date, Date])
      .range([0, w])

    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(data, d => d.count) as number)])
      .nice()
      .range([h, 0])

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).tickSize(-w).tickFormat(() => ''))
      .call(gg => {
        gg.select('.domain').remove()
        gg.selectAll('line').attr('stroke', 'var(--co-surface)').attr('stroke-dasharray', '2,4')
      })

    // Area fill
    const area = d3.area<VelocityPoint>()
      .x(d => x(d.week))
      .y0(h)
      .y1(d => y(d.count))
      .curve(d3.curveMonotoneX)

    // Gradient
    const defs = svg.append('defs')
    const gradId = 'vel-grad'
    const grad = defs.append('linearGradient').attr('id', gradId).attr('x1', '0').attr('x2', '0').attr('y1', '0').attr('y2', '1')
    grad.append('stop').attr('offset', '0%').attr('stop-color', T.accent).attr('stop-opacity', 0.25)
    grad.append('stop').attr('offset', '100%').attr('stop-color', T.accent).attr('stop-opacity', 0.02)

    g.append('path')
      .datum(data)
      .attr('fill', `url(#${gradId})`)
      .attr('d', area)

    // Line
    const line = d3.line<VelocityPoint>()
      .x(d => x(d.week))
      .y(d => y(d.count))
      .curve(d3.curveMonotoneX)

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', T.accent)
      .attr('stroke-width', 2)
      .attr('d', line)

    // Dots
    g.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d.week))
      .attr('cy', d => y(d.count))
      .attr('r', 3)
      .attr('fill', T.accent)
      .attr('stroke', T.bg)
      .attr('stroke-width', 1.5)

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d => d3.timeFormat('%b %d')(d as Date)))
      .call(gg => {
        gg.select('.domain').attr('stroke', T.border)
        gg.selectAll('text').attr('fill', T.muted).style('font-family', T.mono).style('font-size', '0.65rem')
        gg.selectAll('line').attr('stroke', T.border)
      })

    g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => String(d)))
      .call(gg => {
        gg.select('.domain').attr('stroke', T.border)
        gg.selectAll('text').attr('fill', T.muted).style('font-family', T.mono).style('font-size', '0.65rem')
        gg.selectAll('line').attr('stroke', T.border)
      })
  }, [data])

  if (data.length === 0) {
    return <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.muted, fontFamily: T.mono, fontSize: '0.75rem' }}>no data</div>
  }

  return <svg ref={ref} width="100%" height={180} className="block overflow-visible" />
}

// ── Completion Time bar chart ────────────────────────────────────────────────

const COMPLEXITY_ORDER = ['XS', 'S', 'M', 'L', 'XL']
const COMPLEXITY_COLORS: Record<string, string> = {
  XS: '#7ccfb8', S: '#8bbfff', M: '#fbbf24', L: '#fb923c', XL: '#ef4444',
}

function ComplexityChart({ data }: { data: ComplexityBar[] }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current || data.length === 0) return
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    const W = ref.current.clientWidth || 480
    const H = 180
    const margin = { top: 10, right: 16, bottom: 32, left: 50 }
    const w = W - margin.left - margin.right
    const h = H - margin.top - margin.bottom

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const ordered = COMPLEXITY_ORDER.filter(t => data.find(d => d.tier === t))

    const x = d3.scaleBand()
      .domain(ordered)
      .range([0, w])
      .padding(0.35)

    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(data, d => d.avgHours) as number)])
      .nice()
      .range([h, 0])

    // Grid
    g.append('g')
      .call(d3.axisLeft(y).tickSize(-w).tickFormat(() => ''))
      .call(gg => {
        gg.select('.domain').remove()
        gg.selectAll('line').attr('stroke', 'var(--co-surface)').attr('stroke-dasharray', '2,4')
      })

    // Bars
    const bars = data.filter(d => ordered.includes(d.tier))
    g.selectAll('rect')
      .data(bars)
      .join('rect')
      .attr('x', d => x(d.tier)!)
      .attr('y', d => y(d.avgHours))
      .attr('width', x.bandwidth())
      .attr('height', d => h - y(d.avgHours))
      .attr('fill', d => COMPLEXITY_COLORS[d.tier] || T.accent)
      .attr('rx', 3)
      .attr('opacity', 0.85)

    // Value labels
    g.selectAll('text.val')
      .data(bars)
      .join('text')
      .attr('class', 'val')
      .attr('x', d => x(d.tier)! + x.bandwidth() / 2)
      .attr('y', d => y(d.avgHours) - 4)
      .attr('text-anchor', 'middle')
      .attr('fill', T.muted)
      .style('font-family', T.mono)
      .style('font-size', '0.62rem')
      .text(d => `${d.avgHours.toFixed(1)}h`)

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(x))
      .call(gg => {
        gg.select('.domain').attr('stroke', T.border)
        gg.selectAll('text').attr('fill', T.muted).style('font-family', T.mono).style('font-size', '0.7rem')
        gg.selectAll('line').attr('stroke', T.border)
      })

    g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}h`))
      .call(gg => {
        gg.select('.domain').attr('stroke', T.border)
        gg.selectAll('text').attr('fill', T.muted).style('font-family', T.mono).style('font-size', '0.65rem')
        gg.selectAll('line').attr('stroke', T.border)
      })
  }, [data])

  if (data.length === 0) {
    return <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.muted, fontFamily: T.mono, fontSize: '0.75rem' }}>no data</div>
  }

  return <svg ref={ref} width="100%" height={180} className="block overflow-visible" />
}

// ── Agent Contribution horizontal bar chart ──────────────────────────────────

function AgentChart({ data }: { data: AgentBar[] }) {
  const ref = useRef<SVGSVGElement>(null)
  const H = Math.max(100, data.length * 28 + 20)

  useEffect(() => {
    if (!ref.current || data.length === 0) return
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    const W = ref.current.clientWidth || 480
    const margin = { top: 6, right: 50, bottom: 10, left: 110 }
    const w = W - margin.left - margin.right
    const h = H - margin.top - margin.bottom

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const sorted = [...data].sort((a, b) => b.count - a.count).slice(0, 12)

    const y = d3.scaleBand()
      .domain(sorted.map(d => d.name))
      .range([0, h])
      .padding(0.3)

    const x = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(sorted, d => d.count) as number)])
      .nice()
      .range([0, w])

    // Bars
    g.selectAll('rect')
      .data(sorted)
      .join('rect')
      .attr('y', d => y(d.name)!)
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.count))
      .attr('fill', T.accent)
      .attr('rx', 3)
      .attr('opacity', 0.8)

    // Count labels
    g.selectAll('text.val')
      .data(sorted)
      .join('text')
      .attr('class', 'val')
      .attr('y', d => y(d.name)! + y.bandwidth() / 2 + 4)
      .attr('x', d => x(d.count) + 6)
      .attr('fill', T.muted)
      .style('font-family', T.mono)
      .style('font-size', '0.65rem')
      .text(d => d.count)

    // Y axis (names)
    g.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call(gg => {
        gg.select('.domain').remove()
        gg.selectAll('text')
          .attr('fill', T.text)
          .style('font-family', T.mono)
          .style('font-size', '0.68rem')
          .attr('dx', -4)
      })
  }, [data, H])

  if (data.length === 0) {
    return <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.muted, fontFamily: T.mono, fontSize: '0.75rem' }}>no data</div>
  }

  return <svg ref={ref} width="100%" height={H} className="block overflow-visible" />
}

// ── Work Type donut chart ────────────────────────────────────────────────────

const DONUT_COLORS = [T.accent, T.green, T.blue, T.purple, T.amber, T.red, '#fb923c', '#22d3ee', '#f472b6']

function DonutChart({ data }: { data: WorkTypeSlice[] }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current || data.length === 0) return
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    const SIZE = 180
    const R = SIZE / 2 - 16
    const IR = R * 0.56 // inner radius for donut hole
    const total = d3.sum(data, d => d.count)

    const g = svg.append('g').attr('transform', `translate(${SIZE / 2},${SIZE / 2})`)

    const pie = d3.pie<WorkTypeSlice>()
      .value(d => d.count)
      .sort(null)
      .padAngle(0.03)

    const arc = d3.arc<d3.PieArcDatum<WorkTypeSlice>>()
      .innerRadius(IR)
      .outerRadius(R)
      .cornerRadius(3)

    const arcs = g.selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('d', arc)
      .attr('fill', (_d, i) => DONUT_COLORS[i % DONUT_COLORS.length])
      .attr('opacity', 0.85)

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('fill', T.text)
      .style('font-family', T.mono)
      .style('font-size', '1.4rem')
      .style('font-weight', '700')
      .text(total)

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('fill', T.muted)
      .style('font-family', T.mono)
      .style('font-size', '0.6rem')
      .style('letter-spacing', '0.08em')
      .text('SPRINTS')

    // Suppress unused var warning
    void arcs

    return () => { svg.selectAll('*').remove() }
  }, [data])

  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180, color: T.muted, fontFamily: T.mono, fontSize: '0.75rem' }}>
        no data
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg ref={ref} width={180} height={180} style={{ flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.slice(0, 8).map((d, i) => (
          <div key={d.type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: DONUT_COLORS[i % DONUT_COLORS.length], flexShrink: 0 }} />
            <span style={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.muted }}>{d.label}</span>
            <span style={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.text, marginLeft: 'auto' }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Activity Heatmap ─────────────────────────────────────────────────────────

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function HeatmapChart({ data }: { data: HeatCell[] }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    const W = ref.current.clientWidth || 480
    const DAYS = 7
    const HOURS = 24
    const margin = { top: 4, right: 12, bottom: 28, left: 40 }
    const w = W - margin.left - margin.right
    const H_SVG = 220
    const h = H_SVG - margin.top - margin.bottom

    const cellW = w / DAYS
    const cellH = h / HOURS

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const maxCount = d3.max(data, d => d.count) || 1
    const colorScale = d3.scaleSequential()
      .domain([0, maxCount])
      .interpolator(d3.interpolate('var(--co-surface)', T.accent))

    // Draw cells
    // Build lookup
    const lookup = new Map<string, number>()
    for (const cell of data) {
      lookup.set(`${cell.day}-${cell.hour}`, cell.count)
    }

    for (let day = 0; day < DAYS; day++) {
      for (let hour = 0; hour < HOURS; hour++) {
        const count = lookup.get(`${day}-${hour}`) || 0
        g.append('rect')
          .attr('x', day * cellW + 1)
          .attr('y', hour * cellH + 1)
          .attr('width', cellW - 2)
          .attr('height', cellH - 2)
          .attr('fill', count > 0 ? colorScale(count) : '#111')
          .attr('rx', 2)
          .attr('opacity', count > 0 ? 0.9 : 1)
      }
    }

    // Day labels (x axis)
    DAY_LABELS.forEach((day, i) => {
      g.append('text')
        .attr('x', i * cellW + cellW / 2)
        .attr('y', h + 18)
        .attr('text-anchor', 'middle')
        .attr('fill', T.muted)
        .style('font-family', T.mono)
        .style('font-size', '0.62rem')
        .text(day)
    })

    // Hour labels (y axis) — every 4 hours
    for (let hr = 0; hr < HOURS; hr += 4) {
      g.append('text')
        .attr('x', -6)
        .attr('y', hr * cellH + cellH / 2 + 4)
        .attr('text-anchor', 'end')
        .attr('fill', T.muted)
        .style('font-family', T.mono)
        .style('font-size', '0.6rem')
        .text(`${String(hr).padStart(2, '0')}:00`)
    }

    // Color scale legend
    const legendW = Math.min(120, w * 0.3)
    const legendX = w - legendW
    const legendY = h + 6
    const defs = svg.append('defs')
    const lgId = 'hm-grad'
    const lg = defs.append('linearGradient').attr('id', lgId)
    lg.append('stop').attr('offset', '0%').attr('stop-color', 'var(--co-surface)')
    lg.append('stop').attr('offset', '100%').attr('stop-color', T.accent)
    g.append('rect')
      .attr('x', legendX).attr('y', legendY).attr('width', legendW).attr('height', 6)
      .attr('fill', `url(#${lgId})`).attr('rx', 2)
    g.append('text').attr('x', legendX).attr('y', legendY + 14).attr('fill', T.muted)
      .style('font-family', T.mono).style('font-size', '0.55rem').text('0')
    g.append('text').attr('x', legendX + legendW).attr('y', legendY + 14).attr('text-anchor', 'end')
      .attr('fill', T.muted).style('font-family', T.mono).style('font-size', '0.55rem').text(maxCount)
  }, [data])

  return <svg ref={ref} width="100%" height={220} className="block overflow-visible" />
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Analytics() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Data state
  const [stats, setStats] = useState<SummaryStats>({ totalCompleted: 0, avgCompletionHours: 0, activeAgents: 0, protocolEvents: 0 })
  const [velocity, setVelocity] = useState<VelocityPoint[]>([])
  const [complexity, setComplexity] = useState<ComplexityBar[]>([])
  const [agents, setAgents] = useState<AgentBar[]>([])
  const [workTypes, setWorkTypes] = useState<WorkTypeSlice[]>([])
  const [heatmap, setHeatmap] = useState<HeatCell[]>([])

  const loadAll = useCallback(async () => {
    const now = new Date()
    const ago90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()
    const ago30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const ago7  = new Date(now.getTime() -  7 * 24 * 60 * 60 * 1000).toISOString()

    // ── 1. Completed sprints (last 90 days) ─────────────────────────────────
    const { data: completed } = await supabase
      .from('coordination_requests')
      .select('id, completed_at, claimed_at, claimed_by, work_type, description, complexity')
      .eq('status', 'completed')
      .gte('completed_at', ago90)
      .order('completed_at', { ascending: true })

    const allCompleted = completed || []

    // Sprint Velocity: group by week
    const weekMap = new Map<string, number>()
    for (const s of allCompleted) {
      if (!s.completed_at) continue
      const k = weekKey(new Date(s.completed_at))
      weekMap.set(k, (weekMap.get(k) || 0) + 1)
    }
    // Fill gaps between first and last week
    const velPoints: VelocityPoint[] = []
    if (weekMap.size > 0) {
      const sorted = [...weekMap.entries()].sort(([a], [b]) => a.localeCompare(b))
      const startW = new Date(sorted[0][0])
      const endW = startOfWeek(now)
      let cur = new Date(startW)
      while (cur <= endW) {
        velPoints.push({ week: new Date(cur), count: weekMap.get(cur.toISOString().slice(0, 10)) || 0 })
        cur.setUTCDate(cur.getUTCDate() + 7)
      }
    }
    setVelocity(velPoints)

    // ── 2. Completion time by complexity ────────────────────────────────────
    const { data: withTimes } = await supabase
      .from('coordination_requests')
      .select('claimed_at, completed_at, description, complexity')
      .eq('status', 'completed')
      .not('claimed_at', 'is', null)
      .not('completed_at', 'is', null)

    const complexityMap = new Map<string, number[]>()
    const COMPLEXITY_RE = /\bComplexity:\s*(XS|S|M|L|XL)\b/i

    for (const s of withTimes || []) {
      const tier = s.complexity || (s.description && COMPLEXITY_RE.exec(s.description)?.[1]?.toUpperCase())
      if (!tier) continue
      const hours = (new Date(s.completed_at).getTime() - new Date(s.claimed_at).getTime()) / 3600000
      if (hours < 0 || hours > 720) continue // sanity bound
      if (!complexityMap.has(tier)) complexityMap.set(tier, [])
      complexityMap.get(tier)!.push(hours)
    }

    const complexityBars: ComplexityBar[] = []
    for (const [tier, hours] of complexityMap.entries()) {
      if (hours.length === 0) continue
      complexityBars.push({ tier, avgHours: d3.mean(hours) as number })
    }
    setComplexity(complexityBars)

    // ── 3. Agent contribution ────────────────────────────────────────────────
    const claimerIds = [...new Set(allCompleted.map(s => s.claimed_by).filter(Boolean))]
    const agentCountMap = new Map<string, number>()
    for (const s of allCompleted) {
      if (!s.claimed_by) continue
      agentCountMap.set(s.claimed_by, (agentCountMap.get(s.claimed_by) || 0) + 1)
    }

    // Fetch names from participants
    const agentBars: AgentBar[] = []
    if (claimerIds.length > 0) {
      const { data: participants } = await supabase
        .from('participants')
        .select('id, name')
        .in('id', claimerIds)

      const nameMap = new Map((participants || []).map(p => [p.id, p.name]))
      for (const [id, count] of agentCountMap.entries()) {
        agentBars.push({ name: nameMap.get(id) || id.slice(0, 8), count })
      }
    }
    setAgents(agentBars)

    // ── 4. Work type distribution ────────────────────────────────────────────
    const typeMap = new Map<string, number>()
    for (const s of allCompleted) {
      const t = s.work_type || 'unknown'
      typeMap.set(t, (typeMap.get(t) || 0) + 1)
    }
    const workSlices: WorkTypeSlice[] = [...typeMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        label: (WORK_TYPE_LABELS as Record<string, string>)[type] || type,
        count,
      }))
    setWorkTypes(workSlices)

    // ── 5. Activity Heatmap ──────────────────────────────────────────────────
    const { data: events } = await supabase
      .from('protocol_events')
      .select('created_at')
      .gte('created_at', ago90)

    const heatMap = new Map<string, number>()
    for (const ev of events || []) {
      const d = new Date(ev.created_at)
      const dayOfWeek = (d.getUTCDay() + 6) % 7 // Mon=0..Sun=6
      const hour = d.getUTCHours()
      const key = `${dayOfWeek}-${hour}`
      heatMap.set(key, (heatMap.get(key) || 0) + 1)
    }

    const heatCells: HeatCell[] = []
    for (const [key, count] of heatMap.entries()) {
      const [day, hour] = key.split('-').map(Number)
      heatCells.push({ day, hour, count })
    }
    setHeatmap(heatCells)

    // ── 6. Summary Stats ─────────────────────────────────────────────────────
    // Total completed (all time)
    const { count: totalCount } = await supabase
      .from('coordination_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed')

    // Active agents (last 7 days)
    const { count: activeCount } = await supabase
      .from('agent_presence')
      .select('agent_id', { count: 'exact', head: true })
      .gte('last_seen', ago7)

    // Protocol events (last 30 days)
    const { count: eventsCount } = await supabase
      .from('protocol_events')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', ago30)

    // Avg completion time from withTimes
    const allHours: number[] = []
    for (const s of withTimes || []) {
      const h = (new Date(s.completed_at).getTime() - new Date(s.claimed_at).getTime()) / 3600000
      if (h >= 0 && h <= 720) allHours.push(h)
    }
    const avgHours = allHours.length > 0 ? (d3.mean(allHours) as number) : 0

    setStats({
      totalCompleted: totalCount || 0,
      avgCompletionHours: avgHours,
      activeAgents: activeCount || 0,
      protocolEvents: eventsCount || 0,
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    loadAll().finally(() => setLoading(false))
  }, [loadAll])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAll()
    setRefreshing(false)
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: T.mono }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 0 20px 0', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', color: T.muted, cursor: 'pointer',
              fontFamily: T.mono, fontSize: '0.75rem', padding: '4px 8px',
              borderRadius: 4, transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = T.text)}
            onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
          >
            <ArrowLeft size={13} />
            coordinate
          </button>
          <span style={{ color: T.border }}>·</span>
          <div>
            <h1 style={{ fontFamily: T.serif, fontSize: '1.4rem', fontWeight: 700, color: T.text, margin: 0, lineHeight: 1.1 }}>
              Workshop Analytics
            </h1>
            <p style={{ fontFamily: T.mono, fontSize: '0.7rem', color: T.muted, margin: '4px 0 0' }}>
              last 90 days · UTC
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: T.accentDim, border: `1px solid ${T.accentBorder}`,
            borderRadius: 6, padding: '8px 14px', cursor: 'pointer',
            fontFamily: T.mono, fontSize: '0.72rem', color: T.accent,
            transition: 'all 0.15s', opacity: (refreshing || loading) ? 0.5 : 1,
          }}
          onMouseEnter={e => { if (!refreshing && !loading) e.currentTarget.style.background = '#c4956a24' }}
          onMouseLeave={e => { e.currentTarget.style.background = T.accentDim }}
        >
          <RefreshCw size={13} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
          refresh
        </button>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <StatCard
          label="Sprints Completed"
          value={loading ? '…' : stats.totalCompleted.toLocaleString()}
          icon={CheckCircle2}
          sub="all time"
        />
        <StatCard
          label="Avg Completion"
          value={loading ? '…' : `${stats.avgCompletionHours.toFixed(1)}h`}
          icon={Clock}
          sub="claim → complete"
        />
        <StatCard
          label="Active Agents"
          value={loading ? '…' : stats.activeAgents}
          icon={Users}
          sub="last 7 days"
        />
        <StatCard
          label="Protocol Events"
          value={loading ? '…' : stats.protocolEvents.toLocaleString()}
          icon={Zap}
          sub="last 30 days"
        />
      </div>

      {/* Charts — 2-column grid on wide, 1-column on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16,
      }}>
        {/* Sprint Velocity */}
        <ChartCard title="Sprint Velocity" loading={loading}>
          <VelocityChart data={velocity} />
          <div style={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.muted, marginTop: 6 }}>
            completed sprints per week
          </div>
        </ChartCard>

        {/* Completion Time by Complexity */}
        <ChartCard title="Completion Time by Complexity" loading={loading}>
          <ComplexityChart data={complexity} />
          <div style={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.muted, marginTop: 6 }}>
            avg hours from claim to completion
          </div>
        </ChartCard>

        {/* Agent Contribution */}
        <ChartCard title="Agent Contribution" loading={loading}>
          <AgentChart data={agents} />
          <div style={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.muted, marginTop: 6 }}>
            completed sprints per agent
          </div>
        </ChartCard>

        {/* Work Type Distribution */}
        <ChartCard title="Work Type Distribution" loading={loading}>
          <DonutChart data={workTypes} />
          <div style={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.muted, marginTop: 8 }}>
            sprints by work type (last 90 days)
          </div>
        </ChartCard>

        {/* Activity Heatmap — full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <ChartCard title="Activity Heatmap" loading={loading}>
            <HeatmapChart data={heatmap} />
            <div style={{ fontFamily: T.mono, fontSize: '0.65rem', color: T.muted, marginTop: 4 }}>
              protocol events by day-of-week and hour (UTC)
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Spin animation for refresh button */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
