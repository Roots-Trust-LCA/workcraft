// @ts-nocheck
/**
 * SprintTimingAnalysis — Aggregate sprint timing stats.
 * P168: Shows average completion times, fastest/slowest, breakdown by complexity and agent.
 */

import { useState, useMemo } from 'react'
import { computeTimingStats, formatDuration, type TimingStats } from '../utils/duration'

interface SprintTimingAnalysisProps {
  sprints: unknown[] // all completed sprints
}

const COMPLEXITY_ORDER = ['XS', 'S', 'M', 'L', 'XL']
const COMPLEXITY_COLORS: Record<string, string> = {
  XS: '#7ccfb8', S: '#7ccfb8', M: 'var(--co-primary)', L: '#ef4444', XL: '#a855f7', unknown: 'var(--co-text-muted)',
}

const monoStyle: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" }

export function SprintTimingAnalysis({ sprints }: SprintTimingAnalysisProps) {
  const [timeWindow, setTimeWindow] = useState<'7d' | '30d' | 'all'>('all')

  const filteredSprints = useMemo(() => {
    if (timeWindow === 'all') return sprints
    const cutoff = Date.now() - (timeWindow === '7d' ? 7 * 86_400_000 : 30 * 86_400_000)
    return sprints.filter(s => s.completed_at && new Date((s as any).completed_at).getTime() >= cutoff)
  }, [sprints, timeWindow])

  const stats: TimingStats = useMemo(() => computeTimingStats(filteredSprints), [filteredSprints])

  if (stats.count === 0) {
    return (
      <div className="py-6 text-center">
        <p style={{ ...monoStyle, fontSize: '0.75rem', color: 'var(--co-text-muted)' }}>No completed sprints in this time window</p>
      </div>
    )
  }

  const sortedComplexities = Object.entries(stats.byComplexity)
    .sort(([a], [b]) => {
      const ai = COMPLEXITY_ORDER.indexOf(a)
      const bi = COMPLEXITY_ORDER.indexOf(b)
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })

  const sortedAgents = Object.entries(stats.byAgent)
    .sort(([, a], [, b]) => b.count - a.count)

  return (
    <div>
      {/* Time window selector */}
      <div className="flex items-center gap-2 mb-4">
        <span style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Window:</span>
        {(['7d', '30d', 'all'] as const).map(w => (
          <button key={w} onClick={() => setTimeWindow(w)}
            style={{
              ...monoStyle, fontSize: '0.6rem', padding: '3px 10px', borderRadius: '4px',
              background: timeWindow === w ? '#c4956a22' : '#111',
              color: timeWindow === w ? 'var(--co-primary)' : 'var(--co-text-muted)',
              border: `1px solid ${timeWindow === w ? '#c4956a44' : 'var(--co-border)'}`,
              cursor: 'pointer', letterSpacing: '0.04em',
            }}>
            {w === 'all' ? 'All time' : w === '7d' ? 'Last 7 days' : 'Last 30 days'}
          </button>
        ))}
        <span style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', marginLeft: 'auto' }}>
          {stats.count} sprint{stats.count !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Overview stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Avg Total" value={formatDuration(stats.avgTotal)} color="#c8c2ba" />
        <StatCard label="Avg Wait" sublabel="proposed → claimed" value={formatDuration(stats.avgWait)} color="#666" />
        <StatCard label="Avg Execution" sublabel="claimed → completed" value={formatDuration(stats.avgExecution)} color="var(--co-primary)" />
        <StatCard label="Sprints Completed" value={String(stats.count)} color="#7ccfb8" />
      </div>

      {/* Fastest / slowest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {stats.fastest && (
          <div className="rounded p-3" style={{ background: 'var(--co-bg)', border: '1px solid #7ccfb822' }}>
            <div style={{ ...monoStyle, fontSize: '0.58rem', color: '#7ccfb8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Fastest Sprint
            </div>
            <div className="flex items-baseline gap-2">
              <span style={{ ...monoStyle, fontSize: '0.72rem', color: '#7ccfb8' }}>{stats.fastest.sprintId}</span>
              <span style={{ ...monoStyle, fontSize: '0.95rem', color: 'var(--co-text)', fontWeight: 600 }}>{formatDuration(stats.fastest.duration)}</span>
            </div>
            <div className="truncate" style={{ fontFamily: "'Cormorant', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', marginTop: '2px' }}>
              {stats.fastest.title}
            </div>
          </div>
        )}
        {stats.slowest && (
          <div className="rounded p-3" style={{ background: 'var(--co-bg)', border: '1px solid #ef444422' }}>
            <div style={{ ...monoStyle, fontSize: '0.58rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Slowest Sprint
            </div>
            <div className="flex items-baseline gap-2">
              <span style={{ ...monoStyle, fontSize: '0.72rem', color: '#ef4444' }}>{stats.slowest.sprintId}</span>
              <span style={{ ...monoStyle, fontSize: '0.95rem', color: 'var(--co-text)', fontWeight: 600 }}>{formatDuration(stats.slowest.duration)}</span>
            </div>
            <div className="truncate" style={{ fontFamily: "'Cormorant', serif", fontSize: '0.85rem', color: 'var(--co-text-muted)', marginTop: '2px' }}>
              {stats.slowest.title}
            </div>
          </div>
        )}
      </div>

      {/* By Complexity */}
      {sortedComplexities.length > 0 && (
        <div className="mb-5">
          <div style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            By Complexity
          </div>
          <div className="space-y-2">
            {sortedComplexities.map(([cx, data]) => {
              const color = COMPLEXITY_COLORS[cx] || 'var(--co-text-muted)'
              const pct = stats.avgTotal > 0 ? (data.avgTotal / stats.avgTotal) * 100 : 0
              return (
                <div key={cx} className="flex items-center gap-3">
                  <span style={{ ...monoStyle, fontSize: '0.72rem', color, width: '32px', textAlign: 'center', fontWeight: 600 }}>{cx}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--co-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color, opacity: 0.6 }} />
                  </div>
                  <span style={{ ...monoStyle, fontSize: '0.68rem', color: 'var(--co-text)', width: '60px', textAlign: 'right' }}>{formatDuration(data.avgTotal)}</span>
                  <span style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', width: '80px', textAlign: 'right' }}>
                    w:{formatDuration(data.avgWait)} e:{formatDuration(data.avgExecution)}
                  </span>
                  <span style={{ ...monoStyle, fontSize: '0.58rem', color: 'var(--co-text-muted)', width: '24px', textAlign: 'right' }}>×{data.count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* By Agent */}
      {sortedAgents.length > 0 && (
        <div>
          <div style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            By Agent
          </div>
          <div className="space-y-2">
            {sortedAgents.map(([name, data]) => {
              const pct = stats.avgTotal > 0 ? (data.avgTotal / stats.avgTotal) * 100 : 0
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="truncate" style={{ ...monoStyle, fontSize: '0.72rem', color: 'var(--co-text)', width: '80px' }}>{name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--co-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: 'var(--co-primary)', opacity: 0.6 }} />
                  </div>
                  <span style={{ ...monoStyle, fontSize: '0.68rem', color: 'var(--co-text)', width: '60px', textAlign: 'right' }}>{formatDuration(data.avgTotal)}</span>
                  <span style={{ ...monoStyle, fontSize: '0.6rem', color: 'var(--co-text-muted)', width: '80px', textAlign: 'right' }}>
                    w:{formatDuration(data.avgWait)} e:{formatDuration(data.avgExecution)}
                  </span>
                  <span style={{ ...monoStyle, fontSize: '0.58rem', color: 'var(--co-text-muted)', width: '24px', textAlign: 'right' }}>×{data.count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, sublabel, value, color }: { label: string; sublabel?: string; value: string; color: string }) {
  return (
    <div className="rounded p-3" style={{ background: 'var(--co-bg)', border: '1px solid var(--co-border)' }}>
      <div style={{ ...monoStyle, fontSize: '0.58rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ ...monoStyle, fontSize: '0.5rem', color: 'var(--co-text-muted)', marginBottom: '4px' }}>{sublabel}</div>
      )}
      <div style={{ fontFamily: "'Cormorant', serif", fontSize: '1.15rem', color, fontWeight: 600 }}>{value}</div>
    </div>
  )
}
