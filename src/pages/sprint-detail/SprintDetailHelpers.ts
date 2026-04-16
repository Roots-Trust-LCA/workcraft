// @ts-nocheck
/** P242: Extracted from SprintDetail.tsx */
import { sanitizeHtml } from '../../lib/sanitize'

/** P165: Split result_summary into main summary and retrospective sections */
export function splitRetrospective(text: string): { summary: string; retrospective: string | null } {
  const marker = /\n\s*Retrospective:\s*\n/i
  const match = text.match(marker)
  if (!match || match.index === undefined) return { summary: text, retrospective: null }
  return {
    summary: text.slice(0, match.index).trimEnd(),
    retrospective: text.slice(match.index + match[0].length).trim(),
  }
}

// P248: Re-exported from shared lib
export { timeAgo } from '../../lib/format'

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export const COMPLEXITY_RE = /\bComplexity:\s*(XS|S|M|L|XL)\b/i
export const COMPLEXITY_LABELS: Record<string, string> = {
  XS: 'Extra Small', S: 'Small', M: 'Medium', L: 'Large', XL: 'Extra Large',
}
export const COMPLEXITY_COLORS: Record<string, string> = {
  XS: '#7ccfb8', S: '#8bbfff', M: '#fbbf24', L: '#fb923c', XL: '#ef4444',
}
export function parseComplexity(description?: string): string | null {
  if (!description) return null
  const m = description.match(COMPLEXITY_RE)
  return m ? m[1].toUpperCase() : null
}

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

export const LABEL_COLORS: Record<string, string> = {
  'proposal': '#fbbf24',
  'review': '#8bbfff',
  'gap-assessment': '#a78bfa',
  'synthesis': '#7ccfb8',
  'challenge': '#fb923c',
  'convergence': '#c4956a',
  'reference': '#555',
  'completion': '#7ccfb8',
}

// ── Protocol Stream constants (P108) ─────────────────────────────────────────

export const EVENT_LABELS: Record<string, string> = {
  task_proposed: 'Proposed', capability_matched: 'Matched',
  negotiation_accepted: 'Accepted', negotiation_countered: 'Countered', negotiation_declined: 'Declined',
  sprint_claimed: 'Claimed', sprint_unclaimed: 'Unclaimed',
  progress_posted: 'Progress', context_injected: 'Context',
  sprint_paused: 'Paused', sprint_resumed: 'Resumed',
  sprint_completed: 'Completed', sprint_cancelled: 'Cancelled', sprint_withdrawn: 'Withdrawn',
  sprint_entered_testing: 'Testing', sprint_testing_approved: 'Approved', sprint_testing_reopened: 'Reopened',
  chat_message_posted: 'Chat', link_shared: 'Link',
  capability_broadcast: 'Heartbeat', functional_mode_changed: 'Mode',
  skill_hash_drift_detected: 'Drift', skill_hash_aligned: 'Aligned', agent_capacity_critical: 'Critical',
}

export const EVENT_COLORS: Record<string, string> = {
  task_proposed: '#fbbf24', capability_matched: '#7ccfb8',
  negotiation_accepted: '#7ccfb8', negotiation_countered: '#a78bfa', negotiation_declined: '#ef4444',
  sprint_claimed: '#c4956a', sprint_unclaimed: '#fb923c',
  progress_posted: '#c4956a', context_injected: '#a78bfa',
  sprint_paused: '#fb923c', sprint_resumed: '#7ccfb8',
  sprint_completed: '#7ccfb8', sprint_cancelled: '#ef4444', sprint_withdrawn: '#ef4444',
  sprint_entered_testing: '#a78bfa', sprint_testing_approved: '#7ccfb8', sprint_testing_reopened: '#fb923c',
  chat_message_posted: '#4ade80', link_shared: '#4ade80',
  capability_broadcast: '#555', functional_mode_changed: '#8bbfff',
  skill_hash_drift_detected: '#facc15', skill_hash_aligned: '#4ade80', agent_capacity_critical: '#ef4444',
}

export function protocolEventSummary(ev: unknown): string | null {
  const p = (ev as any).payload || {}
  const agentName = p.agent_name || (ev as any).agent?.name || null
  const sprintLabel = p.sprint_id_label || (ev as any).sprint?.sprint_id || null
  switch ((ev as any).event_type) {
    case 'task_proposed': return [agentName, 'proposed', sprintLabel, p.complexity ? `(${p.complexity})` : null].filter(Boolean).join(' ')
    case 'sprint_claimed': return [agentName, 'claimed', p.complexity ? `· ${p.complexity}` : null].filter(Boolean).join(' ')
    case 'sprint_unclaimed': return [p.unclaimed_by || agentName, 'unclaimed', p.reason ? `— ${p.reason}` : null].filter(Boolean).join(' ')
    case 'sprint_completed': return [agentName, 'completed'].filter(Boolean).join(' ')
    case 'sprint_cancelled': return [p.cancelled_by || agentName, 'cancelled', p.previous_status ? `(was ${p.previous_status})` : null].filter(Boolean).join(' ')
    case 'sprint_entered_testing': return ['sent to testing'].filter(Boolean).join(' ')
    case 'sprint_testing_approved': return ['approved', p.time_in_testing_minutes != null ? `· ${p.time_in_testing_minutes}m in review` : null].filter(Boolean).join(' ')
    case 'sprint_testing_reopened': return ['reopened', p.reason ? `— ${p.reason}` : null].filter(Boolean).join(' ')
    case 'context_injected': return [p.injected_by || agentName, 'injected context'].filter(Boolean).join(' ')
    case 'progress_posted': return p.message ? `"${(p.message as string).slice(0, 80)}${(p.message as string).length > 80 ? '…' : ''}"` : null
    case 'chat_message_posted': return p.content_preview || p.title || null
    default: return null
  }
}
