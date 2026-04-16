/**
 * CoordinationProposal — a sprint as a named, tracked, claimable unit of work.
 * Generalized from co-op.us types for standalone Workshop use.
 */

export type CoordinationContextRef = {
  type: string
  id: string
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

export type ParticipantRef = {
  name: string
  craft_primary?: string
  is_agent?: boolean
}

export interface CoordinationProposal {
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
  roadmap_id: string | null
  roadmap_phase: string | null
  context_refs: CoordinationContextRef[]
  capability_requirements: { capability: string; required: boolean }[]
  claimed_by: string | null
  claimed_at: string | null
  negotiation_log: NegotiationEntry[]
  progress_log: ProgressEntry[]
  completion_proof: string | null
  paused_at: string | null
  paused_by: string | null
  injected_context: InjectedContextEntry[]
  reference_urls?: string[] | null
  tags?: string[] | null
  complexity?: string | null
  work_type?: string | null
  visibility_tier?: string | null
  proposer?: ParticipantRef | null
  acceptor?: ParticipantRef | null
  claimer?: ParticipantRef | null
}
