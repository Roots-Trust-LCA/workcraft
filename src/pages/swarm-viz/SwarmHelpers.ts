// @ts-nocheck
/** P251: Extracted from SwarmViz.tsx */

// ── Constants ────────────────────────────────────────────────────────────────

export const CRAFT_SYMBOLS: Record<string, string> = {
  code: '{ }', word: '¶', form: '◇', sound: '~',
  earth: '▽', body: '○', fire: '△', water: '≈',
}

export const CRAFT_COLORS: Record<string, string> = {
  code: '#60a5fa', word: '#c084fc', form: '#f472b6', sound: '#fbbf24',
  earth: '#4ade80', body: '#fb923c', fire: '#ef4444', water: '#22d3ee',
}

export const STATUS_COLORS: Record<string, string> = {
  active: '#7a9ab5',
  idle: '#7a9ab5',
  executing: '#8aba8a',
  sensing: '#06b6d4',
  reviewing: '#9a7ab5',
  dormant: '#444444',
}

export const LAYER_COLORS: Record<string, string> = {
  '1': '#6366f1', '2': '#10b981', '3': '#f59e0b', '4': '#ef4444',
  '5': '#06b6d4', '6': '#64748b', '7': '#8b5cf6',
}

export const EVENT_PARTICLE_COLORS: Record<string, string> = {
  task_proposed: '#c4956a',
  sprint_claimed: '#f59e0b',
  sprint_completed: '#8aba8a',
  sprint_entered_testing: '#06b6d4',
  sprint_testing_approved: '#4ade80',
  progress_posted: '#ece6de',
  capability_broadcast: '#06b6d4',
  chat_message_posted: '#777',
  context_injected: '#c084fc',
  sprint_cancelled: '#ef4444',
  default: '#555',
}

export const ONLINE_THRESHOLD = 10 * 60 * 1000
export const INACTIVE_THRESHOLD = 3 * 60 * 60 * 1000 // 3h — hide from viz

// P116 — Neon complexity colors for sprint diamond nodes (keyed by complexity)
export const COMPLEXITY_NEON: Record<string, string> = {
  XS: '#00ffff',  // neon cyan
  S:  '#39ff14',  // neon green
  M:  '#ffe01b',  // neon yellow
  L:  '#ff8c00',  // neon orange
  XL: '#ff00ff',  // neon magenta
}

// Repo color palette — consistent per-repo
export const REPO_COLORS = ['#c4956a', '#7a9ab5', '#8aba8a', '#9a7ab5', '#06b6d4', '#f59e0b', '#b57a7a', '#4ade80']

export const GITHUB_REPO_RE = /https?:\/\/github\.com\/([^/]+\/[^/]+)/
export const URL_RE = /https?:\/\/[^\s)<>"'`]+/g

// ── Types ────────────────────────────────────────────────────────────────────

export interface GraphNode {
  id: string
  nodeType: 'agent' | 'repo' | 'sprint'
  name: string
  x: number
  y: number
  // Agent fields
  craftPrimary?: string | null
  craftSecondary?: string | null
  status?: string
  capacity?: number
  functionalMode?: string | null
  color: string
  lastSeen?: string
  isOnline?: boolean
  role?: string | null
  // Repo fields
  slug?: string
  url?: string
  linkCount?: number
  contributors?: string[] // agent_ids that have worked on this repo
  repoLastSeen?: string
  // Sprint fields
  sprintSerial?: string | null
  sprintStatus?: string
  sprintLayers?: string[]
  complexity?: string | null
  claimedBy?: string | null
  claimerName?: string | null
  proposerId?: string | null
  proposerName?: string | null
  referenceUrls?: string[]
  description?: string
  createdAt?: string
  claimedAt?: string | null
  completedAt?: string | null
  contextRefs?: unknown[]
}

export interface GraphEdge {
  id: string
  edgeType: 'sprint' | 'repo-contribution' | 'sprint-claim' | 'sprint-propose' | 'sprint-repo' | 'co-authorship'
  source: string | GraphNode
  target: string | GraphNode
  sprintId?: string
  sprintTitle?: string
  layers?: string[]
  status?: string
  weight?: number
}

export interface ResolvedEdge {
  id: string
  edgeType: 'sprint' | 'repo-contribution' | 'sprint-claim' | 'sprint-propose' | 'sprint-repo' | 'co-authorship'
  source: GraphNode
  target: GraphNode
  sprintId?: string
  sprintTitle?: string
  layers?: string[]
  status?: string
  weight?: number
}

export interface Particle {
  id: number
  sourceId: string
  targetId: string
  progress: number
  speed: number
  color: string
  eventType: string
}

// P130: Pop-up window state
export interface SwarmPopup {
  id: string
  nodeType: 'sprint' | 'agent' | 'repo'
  node: GraphNode
  offsetIndex: number
  // P136: draggable + resizable state
  pos?: { x: number; y: number }
  size?: { w: number; h: number }
  zBoost?: number // click-to-front
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function extractSprintUrls(sprint: unknown): string[] {
  const urls: string[] = []
  const fields = [sprint.description, sprint.completion_proof, (sprint as any).result_summary]
  for (const f of fields) {
    if (typeof f === 'string') {
      const matches = f.match(URL_RE)
      if (matches) urls.push(...matches)
    }
  }
  if (Array.isArray((sprint as any).context_refs)) {
    for (const ref of (sprint as any).context_refs) {
      if (ref?.url) urls.push(ref.url)
    }
  }
  if (Array.isArray((sprint as any).reference_urls)) {
    urls.push(...(sprint as any).reference_urls)
  }
  return [...new Set(urls)]
}
