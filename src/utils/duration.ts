/**
 * Sprint duration formatting utilities.
 * P168: Shared across SprintTimeline, SprintTabs, SwarmViz, SprintDetail, SprintTimingAnalysis.
 */

/** Format a duration in milliseconds to human-readable string */
export function formatDuration(ms: number): string {
  if (ms < 0) ms = 0
  const minutes = Math.floor(ms / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    const remainingHours = hours % 24
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`
  }
  if (hours > 0) {
    const remainingMin = minutes % 60
    return remainingMin > 0 ? `${hours}h ${remainingMin}m` : `${hours}h`
  }
  return `${minutes}m`
}

/** Format a duration compactly (for tooltips, badges) */
export function formatDurationCompact(ms: number): string {
  if (ms < 0) ms = 0
  const minutes = Math.floor(ms / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  return `${minutes}m`
}

/** Compute sprint lifecycle durations from timestamps */
export interface SprintDurations {
  /** Total time from proposed to completed (or now if not completed) */
  total: number
  /** Wait time: proposed → claimed */
  wait: number | null
  /** Execution time: claimed → completed (or now) */
  execution: number | null
  /** Whether the sprint is still running */
  isRunning: boolean
}

export function computeSprintDurations(
  createdAt: string,
  claimedAt: string | null,
  completedAt: string | null
): SprintDurations {
  const created = new Date(createdAt).getTime()
  const claimed = claimedAt ? new Date(claimedAt).getTime() : null
  const completed = completedAt ? new Date(completedAt).getTime() : null
  const now = Date.now()
  const end = completed || now
  const isRunning = !completed

  return {
    total: end - created,
    wait: claimed ? claimed - created : null,
    execution: claimed ? (end - claimed) : null,
    isRunning,
  }
}

/** Format sprint lifecycle as a summary string */
export function formatLifecycleSummary(
  createdAt: string,
  claimedAt: string | null,
  completedAt: string | null
): string {
  const d = computeSprintDurations(createdAt, claimedAt, completedAt)

  if (completedAt && d.wait !== null && d.execution !== null) {
    return `${formatDuration(d.total)} (wait: ${formatDuration(d.wait)}, exec: ${formatDuration(d.execution)})`
  }
  if (claimedAt && d.execution !== null) {
    return `${formatDuration(d.total)} elapsed (exec: ${formatDuration(d.execution)}, running)`
  }
  return `${formatDuration(d.total)} waiting`
}

/** Aggregate timing stats for a set of completed sprints */
export interface TimingStats {
  count: number
  avgTotal: number
  avgWait: number
  avgExecution: number
  fastest: { sprintId: string; title: string; duration: number } | null
  slowest: { sprintId: string; title: string; duration: number } | null
  byComplexity: Record<string, { count: number; avgTotal: number; avgWait: number; avgExecution: number }>
  byAgent: Record<string, { count: number; avgTotal: number; avgWait: number; avgExecution: number }>
}

export function computeTimingStats(sprints: any[]): TimingStats {
  const completed = sprints.filter(s => s.completed_at && s.claimed_at && s.created_at)
  if (completed.length === 0) {
    return { count: 0, avgTotal: 0, avgWait: 0, avgExecution: 0, fastest: null, slowest: null, byComplexity: {}, byAgent: {} }
  }

  let totalSum = 0, waitSum = 0, execSum = 0
  let fastest: TimingStats['fastest'] = null
  let slowest: TimingStats['slowest'] = null
  const byComplexity: Record<string, { totalSum: number; waitSum: number; execSum: number; count: number }> = {}
  const byAgent: Record<string, { totalSum: number; waitSum: number; execSum: number; count: number; name: string }> = {}

  for (const s of completed) {
    const d = computeSprintDurations(s.created_at, s.claimed_at, s.completed_at)
    const total = d.total
    const wait = d.wait || 0
    const exec = d.execution || 0

    totalSum += total
    waitSum += wait
    execSum += exec

    const label = s.sprint_id || s.id?.slice(0, 6)
    if (!fastest || total < fastest.duration) fastest = { sprintId: label, title: s.title, duration: total }
    if (!slowest || total > slowest.duration) slowest = { sprintId: label, title: s.title, duration: total }

    // By complexity
    const cx = s.complexity || 'unknown'
    if (!byComplexity[cx]) byComplexity[cx] = { totalSum: 0, waitSum: 0, execSum: 0, count: 0 }
    byComplexity[cx].totalSum += total
    byComplexity[cx].waitSum += wait
    byComplexity[cx].execSum += exec
    byComplexity[cx].count++

    // By agent (claimer)
    const agentId = s.claimed_by || 'unknown'
    const agentName = s.claimer?.name || agentId.slice(0, 8)
    if (!byAgent[agentId]) byAgent[agentId] = { totalSum: 0, waitSum: 0, execSum: 0, count: 0, name: agentName }
    byAgent[agentId].totalSum += total
    byAgent[agentId].waitSum += wait
    byAgent[agentId].execSum += exec
    byAgent[agentId].count++
  }

  const n = completed.length
  const byCx: TimingStats['byComplexity'] = {}
  for (const [k, v] of Object.entries(byComplexity)) {
    byCx[k] = { count: v.count, avgTotal: v.totalSum / v.count, avgWait: v.waitSum / v.count, avgExecution: v.execSum / v.count }
  }
  const byAg: TimingStats['byAgent'] = {}
  for (const [k, v] of Object.entries(byAgent)) {
    byAg[v.name] = { count: v.count, avgTotal: v.totalSum / v.count, avgWait: v.waitSum / v.count, avgExecution: v.execSum / v.count }
  }

  return {
    count: n,
    avgTotal: totalSum / n,
    avgWait: waitSum / n,
    avgExecution: execSum / n,
    fastest,
    slowest,
    byComplexity: byCx,
    byAgent: byAg,
  }
}
