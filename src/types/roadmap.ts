/**
 * RoadmapItem — a directional unit of work that sits above sprints.
 * Lighter lifecycle: propose → accept → complete. No claim/progress tracking.
 * One or more sprints can link to a roadmap item via roadmap_item_id FK.
 */

export type RoadmapPriority = 'P1' | 'P2' | 'P3' | 'P4'
export type RoadmapStatus = 'proposed' | 'accepted' | 'in_progress' | 'completed'

export interface RoadmapItem {
  id: string
  roadmap_id: string | null
  title: string
  description: string | null
  status: RoadmapStatus
  priority: RoadmapPriority
  category: string | null
  created_by: string | null
  accepted_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  // Join shapes
  creator?: { name: string; craft_primary?: string } | null
  // Computed
  linked_sprint_count?: number
}

export const PRIORITY_META: Record<RoadmapPriority, { label: string; color: string; short: string }> = {
  P1: { label: 'Critical', color: '#ef4444', short: 'P1' },
  P2: { label: 'High', color: '#f59e0b', short: 'P2' },
  P3: { label: 'Medium', color: '#3b82f6', short: 'P3' },
  P4: { label: 'Low', color: '#6b7280', short: 'P4' },
}

export const STATUS_META: Record<RoadmapStatus, { label: string; color: string }> = {
  proposed: { label: 'Proposed', color: '#a78bfa' },
  accepted: { label: 'Accepted', color: '#60a5fa' },
  in_progress: { label: 'In Progress', color: '#f59e0b' },
  completed: { label: 'Completed', color: '#7ccfb8' },
}
