// @ts-nocheck
/**
 * Shared constants, helpers, and types for the Workshop Coordinate page.
 * Extracted from Coordinate.tsx as part of P159 component decomposition.
 */

import {
  Mic, MicOff, ArrowRight, GitBranch,
} from 'lucide-react'
import { sanitizeHtml } from '../../lib/sanitize'

// ── Types ────────────────────────────────────────────────────────────────────

export interface RepoEntity {
  slug: string
  url: string
  linkCount: number
  lastSeen: string
}

// ── Craft constants ──────────────────────────────────────────────────────────

// P27: Craft symbol map
export const CRAFT_SYMBOLS: Record<string, string> = {
  code: '{ }', word: '¶', form: '◇', sound: '~',
  earth: '▽', body: '○', fire: '△', water: '≈',
}

// P94: Craft-specific colors for agent identity
export const CRAFT_COLORS: Record<string, string> = {
  code: '#60a5fa',
  word: '#c084fc',
  form: '#f472b6',
  sound: '#fbbf24',
  earth: '#4ade80',
  body: '#fb923c',
  fire: '#ef4444',
  water: '#22d3ee',
}

// ── Sprint constants ─────────────────────────────────────────────────────────

export const COMPLEXITY_RE = /\bComplexity:\s*(XS|S|M|L|XL)\b/i
export const COMPLEXITY_COLORS: Record<string, string> = {
  XS: '#7ccfb8', S: '#8bbfff', M: '#fbbf24', L: '#fb923c', XL: '#ef4444',
}
export const COMPLEXITY_LABELS: Record<string, string> = {
  XS: 'Extra Small', S: 'Small', M: 'Medium', L: 'Large', XL: 'Extra Large',
}

export const LAYER_COLORS: Record<number, { bg: string; label: string }> = {
  1: { bg: '#c4956a', label: 'Identity' },
  2: { bg: '#8bbfff', label: 'State' },
  3: { bg: '#a78bfa', label: 'Relationship' },
  4: { bg: '#fbbf24', label: 'Event' },
  5: { bg: '#7ccfb8', label: 'Flow' },
  6: { bg: '#fb923c', label: 'Constraint' },
  7: { bg: '#e8927c', label: 'View' },
}

export const STATUS_STEPS = ['proposed', 'accepted', 'in_progress', 'testing', 'completed'] as const
export const STATUS_LABELS: Record<string, string> = {
  proposed: 'proposed',
  accepted: 'accepted',
  in_progress: 'in progress',
  testing: 'testing & review',
  completed: 'completed',
}
export const STATUS_COLORS: Record<string, string> = {
  proposed: '#fbbf24',
  accepted: '#8bbfff',
  in_progress: '#c4956a',
  testing: '#a78bfa',
  completed: '#7ccfb8',
  cancelled: '#ef4444',
}

// P121: Sprint status sort order
export const SPRINT_STATUS_ORDER: Record<string, number> = { in_progress: 0, testing: 1, proposed: 2, accepted: 3 }

// P65: Map sprint status to protocol phase
export const STATUS_TO_PHASE: Record<string, string> = {
  proposed: 'discovery',
  accepted: 'proposal',
  in_progress: 'execution',
  testing: 'synthesis',
  completed: 'synthesis',
}

// ── Floor control constants ──────────────────────────────────────────────────

export const SIGNAL_ICONS: Record<string, typeof Mic> = {
  request_floor: Mic,
  yield_floor: MicOff,
  pass_floor: ArrowRight,
  building_on: GitBranch,
}

export const PHASES = ['gathering', 'discussion', 'convergence', 'decision'] as const

export const STATUS_DOT: Record<string, string> = {
  active: 'bg-green-500',
  idle: 'bg-amber-500',
  away: 'bg-gray-500',
  executing: 'bg-[#c4956a]',
}

// ── Protocol event constants ─────────────────────────────────────────────────

export const EVENT_LABELS: Record<string, string> = {
  task_proposed: 'Proposed',
  capability_matched: 'Matched',
  negotiation_accepted: 'Accepted',
  negotiation_countered: 'Countered',
  negotiation_declined: 'Declined',
  sprint_claimed: 'Claimed',
  sprint_unclaimed: 'Unclaimed',
  progress_posted: 'Progress',
  context_injected: 'Context',
  sprint_paused: 'Paused',
  sprint_resumed: 'Resumed',
  sprint_completed: 'Completed',
  sprint_cancelled: 'Cancelled',
  sprint_withdrawn: 'Withdrawn',
  sprint_entered_testing: 'Testing',
  sprint_testing_approved: 'Approved',
  sprint_testing_reopened: 'Reopened',
  chat_message_posted: 'Chat',
  link_shared: 'Link',
  capability_broadcast: 'Heartbeat',
  functional_mode_changed: 'Mode',
  skill_hash_drift_detected: 'Drift',
  skill_hash_aligned: 'Aligned',
  agent_capacity_critical: 'Critical',
}

export const EVENT_COLORS: Record<string, string> = {
  task_proposed: '#fbbf24',
  capability_matched: '#7ccfb8',
  negotiation_accepted: '#7ccfb8',
  negotiation_countered: '#a78bfa',
  negotiation_declined: '#ef4444',
  sprint_claimed: '#c4956a',
  sprint_unclaimed: '#fb923c',
  progress_posted: '#c4956a',
  context_injected: '#a78bfa',
  sprint_paused: '#fb923c',
  sprint_resumed: '#7ccfb8',
  sprint_completed: '#7ccfb8',
  sprint_cancelled: '#ef4444',
  sprint_withdrawn: '#ef4444',
  sprint_entered_testing: '#a78bfa',
  sprint_testing_approved: '#7ccfb8',
  sprint_testing_reopened: '#fb923c',
  chat_message_posted: '#4ade80',
  link_shared: '#4ade80',
  capability_broadcast: '#555',
  functional_mode_changed: '#8bbfff',
  skill_hash_drift_detected: '#facc15',
  skill_hash_aligned: '#4ade80',
  agent_capacity_critical: '#ef4444',
}

// P108: Event category classification
export const EVENT_CATEGORY: Record<string, string> = {
  task_proposed: 'sprint', capability_matched: 'sprint', negotiation_accepted: 'sprint',
  negotiation_countered: 'sprint', negotiation_declined: 'sprint', sprint_claimed: 'sprint',
  sprint_unclaimed: 'sprint', progress_posted: 'sprint', context_injected: 'sprint',
  sprint_paused: 'sprint', sprint_resumed: 'sprint', sprint_completed: 'sprint',
  sprint_cancelled: 'sprint', sprint_withdrawn: 'sprint',
  sprint_entered_testing: 'testing', sprint_testing_approved: 'testing', sprint_testing_reopened: 'testing',
  chat_message_posted: 'communication', link_shared: 'communication',
  capability_broadcast: 'presence', functional_mode_changed: 'presence',
  skill_hash_drift_detected: 'health', skill_hash_aligned: 'health', agent_capacity_critical: 'health',
}

export const CATEGORY_ICONS: Record<string, string> = {
  sprint: '◆', testing: '◈', communication: '◇', presence: '·', health: '!',
}

export const SPRINT_LIFECYCLE_TYPES = new Set([
  'sprint_completed', 'sprint_claimed', 'sprint_unclaimed', 'sprint_cancelled',
  'task_proposed', 'sprint_entered_testing', 'sprint_testing_approved',
  'sprint_testing_reopened', 'progress_posted', 'context_injected',
])

// P114: Tier metadata
export const TIER_META: Record<string, { label: string; color: string; short: string }> = {
  'tier-1-foundational': { label: 'Foundational', color: '#c4956a', short: 'T1' },
  'tier-2-evolutionary': { label: 'Evolutionary', color: '#7ccfb8', short: 'T2' },
  'tier-3-operational':  { label: 'Operational',  color: '#555',     short: 'T3' },
  'tier-4-deprecated':   { label: 'Deprecated',   color: '#3a3a3a',  short: 'T4' },
}

export const WORK_TYPE_LABELS: Record<string, string> = {
  protocol: 'Protocol', ui: 'UI', infrastructure: 'Infra',
  documentation: 'Docs', 'agent-identity': 'Agent', process: 'Process',
  deployment: 'Deploy', fix: 'Fix',
}

// P121: Status section labels
export const STATUS_SECTION_LABELS: Record<string, string> = {
  in_progress: '● In Progress', testing: '◆ Testing', proposed: '○ Proposed', accepted: '◇ Accepted',
}

// ── Helper functions ─────────────────────────────────────────────────────────

/** P165: Strip retrospective section from result_summary for compact card views */
export function summaryWithoutRetrospective(text: string): string {
  const match = text.match(/\n\s*Retrospective:\s*\n/i)
  return match && match.index !== undefined ? text.slice(0, match.index).trimEnd() : text
}

// P248: Re-exported from shared lib
export { timeAgo } from '../../lib/format'

// ── Simple markdown renderer (no external deps, XSS-safe) ───────────────────
export function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_m, _lang, code) =>
      `<pre style="background:#0f0f0f;border:1px solid #1e1e1e;border-radius:4px;padding:10px 12px;overflow-x:auto;font-family:'IBM Plex Mono',monospace;font-size:0.78rem;color:#c8c2ba;margin:8px 0;"><code>${code.trim()}</code></pre>`)
    .replace(/^### (.+)$/gm, '<h3 style="font-family:\'Cormorant\',serif;font-size:1.05rem;font-weight:600;color:#ece6de;margin:12px 0 4px;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:\'Cormorant\',serif;font-size:1.2rem;font-weight:600;color:#ece6de;margin:14px 0 6px;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-family:\'Cormorant\',serif;font-size:1.4rem;font-weight:600;color:#ece6de;margin:16px 0 8px;">$1</h1>')
    .replace(/`([^`]+)`/g, '<code style="font-family:\'IBM Plex Mono\',monospace;font-size:0.8em;background:#1e1e1e;border-radius:3px;padding:1px 5px;color:#c4956a;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#ece6de;font-weight:600;">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em style="color:#c8c2ba;">$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#c4956a;text-decoration:underline;text-underline-offset:2px;">$1</a>')
    .replace(/^- (.+)$/gm, '<li style="margin:2px 0;padding-left:4px;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul style="padding-left:16px;margin:6px 0;list-style:disc;color:#888;">${m}</ul>`)
    .split(/\n\n+/).map(block =>
      block.startsWith('<') ? block
        : `<p style="margin:6px 0;line-height:1.7;color:#888;">${block.replace(/\n/g, '<br/>')}</p>`
    ).join('\n')
  return sanitizeHtml(html)
}

export function parseComplexity(description?: string): string | null {
  if (!description) return null
  const m = description.match(COMPLEXITY_RE)
  return m ? m[1].toUpperCase() : null
}

/** Compute last activity timestamp for a sprint */
export function getLastActivity(sprint: unknown): string | null {
  const msgs: unknown[] = (sprint as any).sprint_messages || []
  const latestMsg = msgs.reduce((best: string | null, m: unknown) => {
    if (!(m as any).linked_at) return best
    return !best || m.linked_at > best ? (m as any).linked_at : best
  }, null as string | null)

  const plog: unknown[] = (sprint as any).progress_log || []
  const latestPlog = plog.reduce((best: string | null, p: unknown) => {
    if (!(p as any).timestamp) return best
    return !best || p.timestamp > best ? (p as any).timestamp : best
  }, null as string | null)

  const candidates = [latestMsg, latestPlog, (sprint as any).updated_at].filter(Boolean)
  if (candidates.length === 0) return null
  return candidates.sort().pop()!
}

/** Build a human-readable summary from enriched P107 payloads */
export function eventSummary(ev: unknown): string | null {
  const p = (ev as any).payload || {}
  const agentName = p.agent_name || (ev as any).agent?.name || null
  const sprintLabel = p.sprint_id_label || (ev as any).sprint?.sprint_id || null

  switch ((ev as any).event_type) {
    case 'task_proposed':
      return [agentName, 'proposed', sprintLabel, p.complexity ? `(${p.complexity})` : null].filter(Boolean).join(' ')
    case 'sprint_claimed':
      return [agentName, 'claimed', sprintLabel, p.complexity ? `· ${p.complexity}` : null].filter(Boolean).join(' ')
    case 'sprint_unclaimed':
      return [p.unclaimed_by || agentName, 'unclaimed', sprintLabel, p.reason ? `— ${p.reason}` : null].filter(Boolean).join(' ')
    case 'sprint_completed':
      return [agentName, 'completed', sprintLabel, p.sprint_title ? `— ${p.sprint_title}` : null].filter(Boolean).join(' ')
    case 'sprint_cancelled':
      return [p.cancelled_by || agentName, 'cancelled', sprintLabel, p.previous_status ? `(was ${p.previous_status})` : null].filter(Boolean).join(' ')
    case 'sprint_entered_testing':
      return [sprintLabel, 'sent to testing', p.sprint_title ? `— ${p.sprint_title}` : null].filter(Boolean).join(' ')
    case 'sprint_testing_approved':
      return [sprintLabel, 'approved', p.time_in_testing_minutes != null ? `· ${p.time_in_testing_minutes}m in review` : null].filter(Boolean).join(' ')
    case 'sprint_testing_reopened':
      return [sprintLabel, 'reopened', p.reason ? `— ${p.reason}` : null].filter(Boolean).join(' ')
    case 'context_injected':
      return [p.injected_by || agentName, 'injected context into', sprintLabel].filter(Boolean).join(' ')
    case 'chat_message_posted':
      return null
    case 'sprint_withdrawn':
      return [agentName, 'withdrew', sprintLabel].filter(Boolean).join(' ')
    default:
      return null
  }
}

// P85: Consensus-based SKILL.md alignment
export function deriveConsensusHash(agents: unknown[]): { consensusHash: string | null; alignedCount: number; totalWithHash: number; isSplit: boolean } {
  const withHash = agents.filter((a: any) => a.skill_hash)
  if (withHash.length === 0) return { consensusHash: null, alignedCount: 0, totalWithHash: 0, isSplit: false }

  const counts: Record<string, number> = {}
  for (const a of withHash) {
    counts[a.skill_hash] = (counts[(a as any).skill_hash] || 0) + 1
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const topHash = sorted[0][0]
  const topCount = sorted[0][1]
  const isSplit = sorted.length > 1 && sorted[1][1] === topCount

  return {
    consensusHash: isSplit ? null : topHash,
    alignedCount: isSplit ? 0 : topCount,
    totalWithHash: withHash.length,
    isSplit,
  }
}

// ── Repo extraction helpers ──────────────────────────────────────────────────

export const GITHUB_REPO_RE = /https?:\/\/github\.com\/([^/]+\/[^/]+)/
const URL_RE = /https?:\/\/[^\s)<>"'`]+/g

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

export function extractRepoEntities(urls: string[], timestamps: string[]): RepoEntity[] {
  const repoMap = new Map<string, { count: number; lastSeen: string; slug: string }>()
  urls.forEach((url, i) => {
    const m = url.match(GITHUB_REPO_RE)
    if (!m) return
    const slug = m[1].replace(/\.git$/, '')
    const ts = timestamps[i] || ''
    const existing = repoMap.get(slug)
    if (existing) {
      existing.count++
      if (ts > existing.lastSeen) existing.lastSeen = ts
    } else {
      repoMap.set(slug, { count: 1, lastSeen: ts, slug })
    }
  })
  return Array.from(repoMap.values())
    .filter(r => r.count >= 1)
    .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen))
    .map(r => ({ slug: r.slug, url: `https://github.com/${r.slug}`, linkCount: r.count, lastSeen: r.lastSeen }))
}

// P89: Rarity gradient for repository entities
export function getRepoRarity(linkCount: number): { color: string; label: string } {
  if (linkCount === 0) return { color: '#555', label: 'common' }
  if (linkCount >= 20) return { color: '#8b6d3f', label: 'legendary' }
  if (linkCount >= 10) return { color: '#7a6399', label: 'epic' }
  if (linkCount >= 4)  return { color: '#4a7a9b', label: 'rare' }
  if (linkCount >= 2)  return { color: '#4a7a5a', label: 'uncommon' }
  return { color: '#555', label: 'common' }
}
