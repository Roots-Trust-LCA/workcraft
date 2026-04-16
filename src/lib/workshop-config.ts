/**
 * Workshop Configuration — the generalization layer.
 *
 * A standalone Workshop deployment is configured by providing a WorkshopConfig
 * object. This can be derived from a SKILL.md document, from environment
 * variables, or from a JSON/YAML config file.
 *
 * Every co-op.us-specific value has been extracted into this config shape.
 */

export interface WorkshopConfig {
  /** Display name for this Workshop instance */
  name: string

  /** Optional tagline / description */
  description?: string

  /** Supabase project URL (e.g., https://xxx.supabase.co) */
  supabaseUrl: string

  /** Supabase anon/publishable key */
  supabaseAnonKey: string

  /** Edge function base URL (defaults to supabaseUrl + /functions/v1/) */
  edgeFunctionBase?: string

  /** REST API base URL (defaults to supabaseUrl + /rest/v1/) */
  restApiBase?: string

  /** Whether auth is required to view the Workshop (default: false = public) */
  requireAuth: boolean

  /** Whether auth is required to post messages / propose sprints */
  requireAuthToWrite: boolean

  /** Organization identity — replaces co-op.us-specific branding */
  org: {
    name: string
    url?: string
    logo?: string
  }

  /** Protocol configuration */
  protocol: {
    /** Five-phase labels (can be customized) */
    phases: [string, string, string, string, string]

    /** Whether human review is the default completion path */
    humanReviewDefault: boolean

    /** Max WIP sprints per agent */
    maxWipPerAgent: number

    /** Aging alert threshold in days */
    agingAlertDays: number

    /** Sprint ID prefix (e.g., "P" for P455, "S" for S25) */
    sprintIdPrefix: string
  }

  /** Craft system — the 8 crafts can be replaced with any role taxonomy */
  crafts: CraftDefinition[]

  /** Feature flags */
  features: {
    swarmViz: boolean
    analytics: boolean
    floorControl: boolean
    ideaGarden: boolean
    directMessages: boolean
    reactions: boolean
    sharedLinks: boolean
    protocolStream: boolean
  }

  /** Theme overrides */
  theme?: {
    primary?: string
    surface?: string
    text?: string
    border?: string
    forceDark?: boolean
  }
}

export interface CraftDefinition {
  id: string
  name: string
  symbol: string
  domain: string
  color: string
}

// ── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_CRAFTS: CraftDefinition[] = [
  { id: 'code', name: 'Code', symbol: '{ }', domain: 'Systems, logic, automation', color: '#60a5fa' },
  { id: 'word', name: 'Word', symbol: '¶', domain: 'Language, narrative, law', color: '#c084fc' },
  { id: 'form', name: 'Form', symbol: '◇', domain: 'Shape, space, the visible', color: '#f472b6' },
  { id: 'sound', name: 'Sound', symbol: '~', domain: 'Audio, music, voice', color: '#fbbf24' },
  { id: 'earth', name: 'Earth', symbol: '▽', domain: 'Land, ecology, material', color: '#4ade80' },
  { id: 'body', name: 'Body', symbol: '○', domain: 'Movement, health, presence', color: '#fb923c' },
  { id: 'fire', name: 'Fire', symbol: '△', domain: 'Energy, transformation, urgency', color: '#ef4444' },
  { id: 'water', name: 'Water', symbol: '≈', domain: 'Flow, connection, healing', color: '#22d3ee' },
]

export const DEFAULT_PROTOCOL_PHASES: [string, string, string, string, string] = [
  'Discovery', 'Proposal', 'Negotiation', 'Execution', 'Synthesis',
]

export function createDefaultConfig(overrides?: Partial<WorkshopConfig>): WorkshopConfig {
  return {
    name: 'Workshop',
    description: 'Agent Coordination Workshop',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    requireAuth: false,
    requireAuthToWrite: false,
    org: {
      name: 'Workshop',
      ...overrides?.org,
    },
    protocol: {
      phases: DEFAULT_PROTOCOL_PHASES,
      humanReviewDefault: true,
      maxWipPerAgent: 2,
      agingAlertDays: 14,
      sprintIdPrefix: 'P',
      ...overrides?.protocol,
    },
    crafts: overrides?.crafts ?? DEFAULT_CRAFTS,
    features: {
      swarmViz: true,
      analytics: true,
      floorControl: true,
      ideaGarden: true,
      directMessages: true,
      reactions: true,
      sharedLinks: true,
      protocolStream: true,
      ...overrides?.features,
    },
    theme: overrides?.theme,
    ...overrides,
  }
}
