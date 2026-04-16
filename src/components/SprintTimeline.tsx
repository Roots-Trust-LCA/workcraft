// @ts-nocheck
/**
 * SprintTimeline — Duration bar showing sprint lifecycle segments.
 * P160: Shows time from proposed → claimed → completed as horizontal bar.
 */
import { memo } from 'react'

interface SprintTimelineProps {
  createdAt: string
  claimedAt: string | null
  completedAt: string | null
  status: string
}

export const SprintTimeline = memo(function SprintTimeline({ createdAt, claimedAt, completedAt, status }: SprintTimelineProps) {
  const created = new Date(createdAt).getTime()
  const claimed = claimedAt ? new Date(claimedAt).getTime() : null
  const completed = completedAt ? new Date(completedAt).getTime() : null
  const now = Date.now()

  // Calculate total duration (from created to now or completed)
  const end = completed || now
  const totalDuration = end - created

  // Calculate segment widths as percentages
  const proposedDuration = claimed ? claimed - created : (completed ? 0 : totalDuration)
  const proposedWidth = (proposedDuration / totalDuration) * 100

  const claimedDuration = claimed ? ((completed || now) - claimed) : 0
  const claimedWidth = (claimedDuration / totalDuration) * 100

  // Format duration helpers
  const formatDuration = (ms: number): string => {
    const hours = ms / (1000 * 60 * 60)
    if (hours < 1) {
      const minutes = Math.round(ms / (1000 * 60))
      return `${minutes}m`
    }
    if (hours < 24) {
      return `${Math.round(hours)}h`
    }
    const days = Math.round(hours / 24)
    return `${days}d`
  }

  return (
    <div className="mb-3">
      {/* Timeline bar */}
      <div className="flex h-2 rounded-full overflow-hidden" style={{ background: 'var(--co-surface)' }}>
        {/* Proposed segment */}
        {proposedWidth > 0 && (
          <div
            className="h-full transition-all"
            style={{
              width: `${proposedWidth}%`,
              background: 'var(--co-text-muted)',
            }}
            title={`Proposed: ${formatDuration(proposedDuration)}`}
          />
        )}

        {/* Claimed/In Progress segment */}
        {claimedWidth > 0 && (
          <div
            className="h-full transition-all"
            style={{
              width: `${claimedWidth}%`,
              background: completed ? 'var(--co-primary)' : '#c4956aaa',
            }}
            title={`${completed ? 'Executed' : 'In Progress'}: ${formatDuration(claimedDuration)}`}
          />
        )}
      </div>

      {/* Timeline labels */}
      <div className="flex justify-between items-center mt-1.5">
        <div className="flex items-center gap-3">
          {proposedDuration > 0 && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: 'var(--co-text-muted)' }} />
              {formatDuration(proposedDuration)} proposed
            </span>
          )}
          {claimedDuration > 0 && (
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-primary)' }}>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: completed ? 'var(--co-primary)' : '#c4956aaa' }} />
              {formatDuration(claimedDuration)} {completed ? 'executed' : 'in progress'}
            </span>
          )}
        </div>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'var(--co-text-muted)' }}>
          total: {formatDuration(totalDuration)}
        </span>
      </div>
    </div>
  )
})
