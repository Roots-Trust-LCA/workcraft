/**
 * E217: Deterministic avatar from guestname hash.
 * Generates a subtle geometric pattern in dimension colors.
 * No uploads — identity emerges from name.
 */
import { memo } from 'react'
import { DIMENSIONS } from '../lib/dimensions'
import { colors } from '../styles/tokens'

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

interface AvatarProps {
  name: string
  size?: number
  className?: string
}

export default memo(function Avatar({ name, size = 40, className = '' }: AvatarProps) {
  const hash = hashString(name || 'anon')
  const rand = seededRandom(hash)

  // Pick two dimension colors based on hash
  const colorA = DIMENSIONS[hash % DIMENSIONS.length].color
  const colorB = DIMENSIONS[(hash >> 4) % DIMENSIONS.length].color

  // Generate a 3x3 symmetric grid (mirrored left-right for face-like patterns)
  const cells: boolean[][] = []
  for (let row = 0; row < 3; row++) {
    const r: boolean[] = []
    for (let col = 0; col < 2; col++) {
      r.push(rand() > 0.4)
    }
    // Mirror: col2 = col0
    r.push(r[0])
    cells.push(r)
  }

  const cellSize = size / 5
  const offset = cellSize // 1-cell padding

  // Background shape rotation
  const rotation = (hash % 6) * 60

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ borderRadius: '50%', flexShrink: 0 }}
    >
      {/* Background */}
      <rect width={size} height={size} fill={colors.surface} rx={size / 2} />

      {/* Subtle background shape */}
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(${rotation})`}>
        <polygon
          points={`0,${-size * 0.35} ${size * 0.3},${size * 0.17} ${-size * 0.3},${size * 0.17}`}
          fill={colorB}
          opacity={0.15}
        />
      </g>

      {/* Grid pattern */}
      {cells.map((row, ri) =>
        row.map((on, ci) =>
          on ? (
            <rect
              key={`${ri}-${ci}`}
              x={offset + ci * cellSize}
              y={offset + ri * cellSize}
              width={cellSize}
              height={cellSize}
              rx={cellSize * 0.2}
              fill={ri === 1 ? colorA : colorB}
              opacity={0.85}
            />
          ) : null
        )
      )}
    </svg>
  )
})
