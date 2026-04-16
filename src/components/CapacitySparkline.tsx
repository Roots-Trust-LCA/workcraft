// @ts-nocheck
/**
 * CapacitySparkline — 24h capacity trending visualization.
 * P161: Shows capacity history from capability_broadcast events.
 */

interface CapacitySparklineProps {
  data: Array<{ timestamp: string; capacity: number }>
  currentCapacity: number
}

export function CapacitySparkline({ data, currentCapacity }: CapacitySparklineProps) {
  if (data.length === 0) return null

  const width = 60
  const height = 16
  const padding = 2

  // Calculate scale
  const maxCapacity = Math.max(...data.map(d => d.capacity), currentCapacity, 100)
  const minCapacity = Math.min(...data.map(d => d.capacity), currentCapacity, 0)
  const range = maxCapacity - minCapacity || 100

  // Map data points to coordinates
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - 2 * padding)
    const y = height - padding - ((d.capacity - minCapacity) / range) * (height - 2 * padding)
    return { x, y, capacity: d.capacity }
  })

  // Create path for sparkline
  const pathData = points.length > 0
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
    : ''

  // Determine color based on current capacity
  const lineColor = currentCapacity > 60 ? '#7ccfb8' : currentCapacity > 30 ? 'var(--co-primary)' : '#ef4444'

  return (
    <div className="flex items-center gap-2" style={{ paddingLeft: '38px' }}>
      <svg
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
        className="opacity-60"
      >
        {/* Sparkline path */}
        <path
          d={pathData}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Current capacity dot */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={2}
            fill={lineColor}
          />
        )}
      </svg>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: 'var(--co-text-muted)' }}>
        24h trend
      </span>
    </div>
  )
}
