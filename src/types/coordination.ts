/**
 * CoordinationProposal — P03
 *
 * Extends the `coordination_requests` table shape with roadmap-tracking fields.
 * The base shape is fully preserved; all additions are nullable to remain
 * backward-compatible with records that predate P07.
 *
 * Source: roadmap-patronage-ventures-coordination v2.1, Block 1 — Identity Layer
 */

export type CoordinationContextRef = {
  type: 'venture' | 'project' | 'patronage_period' | 'royalty_agreement'
  id: string
}

export type CapabilityRequirement = {
  capability: string
  required: boolean
}

export type NegotiationEntry = {
  agent: string
  message: string
  timestamp: string
}

export type ProgressEntry = {
  agent: string
  message: string
  timestamp: string
}

export type InjectedContextEntry = {
  key: string
  value: unknown
}

/** Participant join shape (from FK selects in Coordinate.tsx) */
export type ParticipantRef = {
  name: string
  craft_primary?: string
  is_agent?: boolean
}

/** Base shape mirrors the coordination_requests table exactly */
export interface CoordinationRequestBase {
  id: string
  channel_id: string
  proposer_id: string
  title: string
  description: string
  sprint_id: string | null
  layers: string[]
  proposed_roles: Record<string, string>
  status: 'proposed' | 'accepted' | 'in_progress' | 'testing' | 'completed' | 'cancelled' | 'pinned'
  accepted_by: string | null
  accepted_at: string | null
  completed_at: string | null
  result_summary: string | null
  created_at: string
  updated_at: string
}

/**
 * CoordinationProposal — a sprint as a named, tracked, claimable unit of
 * roadmap work. All fields beyond CoordinationRequestBase are nullable;
 * they are populated by the P07 extension and subsequent protocol activity.
 */
export interface CoordinationProposal extends CoordinationRequestBase {
  // Roadmap identity (P07)
  roadmap_id: string | null
  roadmap_phase: string | null
  context_refs: CoordinationContextRef[]
  capability_requirements: CapabilityRequirement[]

  // Claim lifecycle (P07)
  claimed_by: string | null
  claimed_at: string | null

  // Protocol trace (P07)
  negotiation_log: NegotiationEntry[]
  progress_log: ProgressEntry[]
  completion_proof: string | null
  paused_at: string | null
  paused_by: string | null
  injected_context: InjectedContextEntry[]

  // Reference URLs (P259)
  reference_urls?: string[] | null

  // Tags (P228 taxonomy)
  tags?: string[] | null

  // Complexity (P232)
  complexity?: string | null

  // P114: Sprint taxonomy
  work_type?: SprintWorkType | null
  visibility_tier?: SprintVisibilityTier | null

  // Join shapes (populated by Supabase FK selects, not stored columns)
  proposer?: ParticipantRef | null
  acceptor?: ParticipantRef | null
  claimer?: ParticipantRef | null
}

// P114: Work type taxonomy — domain classification
export type SprintWorkType =
  | 'protocol'
  | 'ui'
  | 'infrastructure'
  | 'documentation'
  | 'agent-identity'
  | 'process'
  | 'deployment'
  | 'fix'

// P114: Visibility tier — significance for post-completion discoverability
export type SprintVisibilityTier =
  | 'tier-1-foundational'
  | 'tier-2-evolutionary'
  | 'tier-3-operational'
  | 'tier-4-deprecated'
