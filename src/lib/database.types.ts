export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_authority_tiers: {
        Row: {
          cosigner_count: number | null
          id: string
          max_transaction_usd: number | null
          participant_id: string
          promoted_at: string
          promoted_by: string | null
          requires_cosigner: boolean
          status: string
          tier: string
        }
        Insert: {
          cosigner_count?: number | null
          id?: string
          max_transaction_usd?: number | null
          participant_id: string
          promoted_at?: string
          promoted_by?: string | null
          requires_cosigner?: boolean
          status?: string
          tier?: string
        }
        Update: {
          cosigner_count?: number | null
          id?: string
          max_transaction_usd?: number | null
          participant_id?: string
          promoted_at?: string
          promoted_by?: string | null
          requires_cosigner?: boolean
          status?: string
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_authority_tiers_promoted_by_fkey"
            columns: ["promoted_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_earnings: {
        Row: {
          agent_id: string
          base_credits: number
          cloud_tx_id: string | null
          contribution_id: string
          contribution_type: string
          created_at: string
          credited_at: string | null
          id: string
          standing_multiplier: number
          standing_tier: string
          status: string
          total_credits: number
          verification_bonus: number
          verification_method: string
        }
        Insert: {
          agent_id: string
          base_credits: number
          cloud_tx_id?: string | null
          contribution_id: string
          contribution_type: string
          created_at?: string
          credited_at?: string | null
          id?: string
          standing_multiplier?: number
          standing_tier: string
          status?: string
          total_credits: number
          verification_bonus?: number
          verification_method?: string
        }
        Update: {
          agent_id?: string
          base_credits?: number
          cloud_tx_id?: string | null
          contribution_id?: string
          contribution_type?: string
          created_at?: string
          credited_at?: string | null
          id?: string
          standing_multiplier?: number
          standing_tier?: string
          status?: string
          total_credits?: number
          verification_bonus?: number
          verification_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_cloud_tx_id_fkey"
            columns: ["cloud_tx_id"]
            isOneToOne: false
            referencedRelation: "cloud_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_earnings_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_financial_actions: {
        Row: {
          action_type: string
          agent_id: string
          amount: number | null
          approved: boolean
          authority_tier: string
          created_at: string
          currency: string | null
          id: string
          overridden_by: string | null
          override_reason: string | null
          target: string | null
          tx_hash: string | null
        }
        Insert: {
          action_type: string
          agent_id: string
          amount?: number | null
          approved?: boolean
          authority_tier: string
          created_at?: string
          currency?: string | null
          id?: string
          overridden_by?: string | null
          override_reason?: string | null
          target?: string | null
          tx_hash?: string | null
        }
        Update: {
          action_type?: string
          agent_id?: string
          amount?: number | null
          approved?: boolean
          authority_tier?: string
          created_at?: string
          currency?: string | null
          id?: string
          overridden_by?: string | null
          override_reason?: string | null
          target?: string | null
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_financial_actions_overridden_by_fkey"
            columns: ["overridden_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_key_requests: {
        Row: {
          callback_url: string | null
          capabilities: string[] | null
          craft_primary: string | null
          craft_secondary: string | null
          created_at: string | null
          description: string
          id: string
          name: string
          operator_contact: string
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          callback_url?: string | null
          capabilities?: string[] | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string | null
          description: string
          id?: string
          name: string
          operator_contact: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          callback_url?: string | null
          capabilities?: string[] | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          operator_contact?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      agent_keys: {
        Row: {
          agent_name: string
          created_at: string | null
          id: string
          key_hash: string
          revoked_at: string | null
        }
        Insert: {
          agent_name: string
          created_at?: string | null
          id?: string
          key_hash: string
          revoked_at?: string | null
        }
        Update: {
          agent_name?: string
          created_at?: string | null
          id?: string
          key_hash?: string
          revoked_at?: string | null
        }
        Relationships: []
      }
      agent_leaderboard_snapshots: {
        Row: {
          agent_id: string
          economic_score: number
          id: string
          snapshot_date: string
          total_earned: number
          weekly_velocity: number
        }
        Insert: {
          agent_id: string
          economic_score?: number
          id?: string
          snapshot_date?: string
          total_earned?: number
          weekly_velocity?: number
        }
        Update: {
          agent_id?: string
          economic_score?: number
          id?: string
          snapshot_date?: string
          total_earned?: number
          weekly_velocity?: number
        }
        Relationships: [
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_leaderboard_snapshots_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_presence: {
        Row: {
          agent_id: string
          capabilities: Json
          capacity: number
          context: string | null
          current_sprint: string | null
          functional_mode: string | null
          last_seen: string
          secondary_modes: string[] | null
          skill_hash: string | null
          status: string
        }
        Insert: {
          agent_id: string
          capabilities?: Json
          capacity?: number
          context?: string | null
          current_sprint?: string | null
          functional_mode?: string | null
          last_seen?: string
          secondary_modes?: string[] | null
          skill_hash?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          capabilities?: Json
          capacity?: number
          context?: string | null
          current_sprint?: string | null
          functional_mode?: string | null
          last_seen?: string
          secondary_modes?: string[] | null
          skill_hash?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_current_sprint_fkey"
            columns: ["current_sprint"]
            isOneToOne: false
            referencedRelation: "coordination_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_presence_current_sprint_fkey"
            columns: ["current_sprint"]
            isOneToOne: false
            referencedRelation: "production_sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          api_key_hash: string | null
          capabilities: string[] | null
          contribution_count: number | null
          crafts: Json | null
          created_at: string
          description: string | null
          erc8004: Json | null
          expertise: string[] | null
          id: string
          name: string
          operator: string | null
          participant_id: string | null
          type: Database["public"]["Enums"]["agent_type"]
          updated_at: string | null
        }
        Insert: {
          api_key_hash?: string | null
          capabilities?: string[] | null
          contribution_count?: number | null
          crafts?: Json | null
          created_at?: string
          description?: string | null
          erc8004?: Json | null
          expertise?: string[] | null
          id?: string
          name: string
          operator?: string | null
          participant_id?: string | null
          type?: Database["public"]["Enums"]["agent_type"]
          updated_at?: string | null
        }
        Update: {
          api_key_hash?: string | null
          capabilities?: string[] | null
          contribution_count?: number | null
          crafts?: Json | null
          created_at?: string
          description?: string | null
          erc8004?: Json | null
          expertise?: string[] | null
          id?: string
          name?: string
          operator?: string | null
          participant_id?: string | null
          type?: Database["public"]["Enums"]["agent_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string | null
          participant_id: string
          rate_limit_per_hour: number
          revoked_at: string | null
          scopes: string[]
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name?: string | null
          participant_id: string
          rate_limit_per_hour?: number
          revoked_at?: string | null
          scopes?: string[]
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string | null
          participant_id?: string
          rate_limit_per_hour?: number
          revoked_at?: string | null
          scopes?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      api_rate_limits: {
        Row: {
          api_key_id: string
          created_at: string
          id: string
          request_count: number
          window_start: string
        }
        Insert: {
          api_key_id: string
          created_at?: string
          id?: string
          request_count?: number
          window_start: string
        }
        Update: {
          api_key_id?: string
          created_at?: string
          id?: string
          request_count?: number
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_rate_limits_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_dimensions: {
        Row: {
          artifact_id: string
          created_at: string
          dimension: Database["public"]["Enums"]["dimension_type"]
          id: string
          key: string
          value: string
          weight: number | null
        }
        Insert: {
          artifact_id: string
          created_at?: string
          dimension: Database["public"]["Enums"]["dimension_type"]
          id?: string
          key: string
          value: string
          weight?: number | null
        }
        Update: {
          artifact_id?: string
          created_at?: string
          dimension?: Database["public"]["Enums"]["dimension_type"]
          id?: string
          key?: string
          value?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_dimensions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_participants: {
        Row: {
          artifact_id: string
          created_at: string
          participant_id: string
          role: Database["public"]["Enums"]["participant_artifact_role"]
        }
        Insert: {
          artifact_id: string
          created_at?: string
          participant_id: string
          role?: Database["public"]["Enums"]["participant_artifact_role"]
        }
        Update: {
          artifact_id?: string
          created_at?: string
          participant_id?: string
          role?: Database["public"]["Enums"]["participant_artifact_role"]
        }
        Relationships: [
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_participants_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_relationships: {
        Row: {
          created_at: string
          created_by: string | null
          created_by_agent: string | null
          description: string | null
          from_artifact_id: string
          id: string
          to_artifact_id: string
          type: Database["public"]["Enums"]["relationship_type"]
          weight: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          created_by_agent?: string | null
          description?: string | null
          from_artifact_id: string
          id?: string
          to_artifact_id: string
          type: Database["public"]["Enums"]["relationship_type"]
          weight?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          created_by_agent?: string | null
          description?: string | null
          from_artifact_id?: string
          id?: string
          to_artifact_id?: string
          type?: Database["public"]["Enums"]["relationship_type"]
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artifact_relationships_created_by_agent_fkey"
            columns: ["created_by_agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_relationships_from_artifact_id_fkey"
            columns: ["from_artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_relationships_to_artifact_id_fkey"
            columns: ["to_artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_sessions: {
        Row: {
          artifact_id: string
          role: Database["public"]["Enums"]["artifact_session_role"]
          session_id: string
        }
        Insert: {
          artifact_id: string
          role?: Database["public"]["Enums"]["artifact_session_role"]
          session_id: string
        }
        Update: {
          artifact_id?: string
          role?: Database["public"]["Enums"]["artifact_session_role"]
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_sessions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_tags: {
        Row: {
          artifact_id: string
          tag_id: string
        }
        Insert: {
          artifact_id: string
          tag_id: string
        }
        Update: {
          artifact_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_tags_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      artifact_tents: {
        Row: {
          artifact_id: string
          tent_id: string
        }
        Insert: {
          artifact_id: string
          tent_id: string
        }
        Update: {
          artifact_id?: string
          tent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "artifact_tents_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifact_tents_tent_id_fkey"
            columns: ["tent_id"]
            isOneToOne: false
            referencedRelation: "tents"
            referencedColumns: ["id"]
          },
        ]
      }
      artifacts: {
        Row: {
          agent_type: string | null
          body: string | null
          created_at: string
          created_by: string | null
          created_by_agent: string | null
          deleted_at: string | null
          event_temporality: string | null
          id: string
          origin_convergence_id: string | null
          origin_session_id: string | null
          rea_role: string | null
          search_vector: unknown
          session_id: string | null
          state: Database["public"]["Enums"]["artifact_state"]
          steward_id: string | null
          summary: string | null
          title: string
          type: Database["public"]["Enums"]["artifact_type"]
          updated_at: string
        }
        Insert: {
          agent_type?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          created_by_agent?: string | null
          deleted_at?: string | null
          event_temporality?: string | null
          id?: string
          origin_convergence_id?: string | null
          origin_session_id?: string | null
          rea_role?: string | null
          search_vector?: unknown
          session_id?: string | null
          state?: Database["public"]["Enums"]["artifact_state"]
          steward_id?: string | null
          summary?: string | null
          title: string
          type: Database["public"]["Enums"]["artifact_type"]
          updated_at?: string
        }
        Update: {
          agent_type?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          created_by_agent?: string | null
          deleted_at?: string | null
          event_temporality?: string | null
          id?: string
          origin_convergence_id?: string | null
          origin_session_id?: string | null
          rea_role?: string | null
          search_vector?: unknown
          session_id?: string | null
          state?: Database["public"]["Enums"]["artifact_state"]
          steward_id?: string | null
          summary?: string | null
          title?: string
          type?: Database["public"]["Enums"]["artifact_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_created_by_agent_fkey"
            columns: ["created_by_agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_convergence_id_fkey"
            columns: ["origin_convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      authority_governance_params: {
        Row: {
          description: string | null
          id: string
          param_name: string
          param_value: Json
          set_by: string | null
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: string
          param_name: string
          param_value: Json
          set_by?: string | null
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: string
          param_name?: string
          param_value?: Json
          set_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "authority_governance_params_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      best_practices: {
        Row: {
          author_id: string
          community_id: string
          content: string
          created_at: string
          id: string
          published_at: string | null
          status: string
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          author_id: string
          community_id: string
          content: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          author_id?: string
          community_id?: string
          content?: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "best_practices_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "best_practices_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "practice_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      bioregions: {
        Row: {
          created_at: string
          description: string | null
          elevation_ft: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          watershed: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          elevation_ft?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          watershed?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          elevation_ft?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          watershed?: string | null
        }
        Relationships: []
      }
      bounty_claims: {
        Row: {
          bounty_id: string
          claimed_at: string
          claimer_id: string
          id: string
          quality_grade: string | null
          status: string
          submission: Json | null
          submitted_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          bounty_id: string
          claimed_at?: string
          claimer_id: string
          id?: string
          quality_grade?: string | null
          status?: string
          submission?: Json | null
          submitted_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          bounty_id?: string
          claimed_at?: string
          claimer_id?: string
          id?: string
          quality_grade?: string | null
          status?: string
          submission?: Json | null
          submitted_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bounty_claims_bounty_id_fkey"
            columns: ["bounty_id"]
            isOneToOne: false
            referencedRelation: "ecological_bounties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey"
            columns: ["claimer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bounty_claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_channels: {
        Row: {
          channel_name: string
          covenant_id: string
          created_at: string
          id: string
          local_channel: string | null
          remote_channel: string | null
          status: string
          sync_mode: string
        }
        Insert: {
          channel_name: string
          covenant_id: string
          created_at?: string
          id?: string
          local_channel?: string | null
          remote_channel?: string | null
          status?: string
          sync_mode?: string
        }
        Update: {
          channel_name?: string
          covenant_id?: string
          created_at?: string
          id?: string
          local_channel?: string | null
          remote_channel?: string | null
          status?: string
          sync_mode?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_channels_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: false
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_covenants: {
        Row: {
          activated_at: string | null
          bridge_type: string | null
          created_at: string
          dissolution_notice_at: string | null
          dissolved_at: string | null
          handshake_at: string | null
          id: string
          local_hub_id: string
          onchain_network: string | null
          onchain_tx_hash: string | null
          proposed_at: string
          proposed_by: string | null
          ratified_at: string | null
          remote_hub_id: string
          remote_hub_name: string
          remote_hub_url: string | null
          status: string
          superfluid_stream_id: string | null
          terms: Json
          updated_at: string
          version: string
        }
        Insert: {
          activated_at?: string | null
          bridge_type?: string | null
          created_at?: string
          dissolution_notice_at?: string | null
          dissolved_at?: string | null
          handshake_at?: string | null
          id?: string
          local_hub_id: string
          onchain_network?: string | null
          onchain_tx_hash?: string | null
          proposed_at?: string
          proposed_by?: string | null
          ratified_at?: string | null
          remote_hub_id: string
          remote_hub_name: string
          remote_hub_url?: string | null
          status?: string
          superfluid_stream_id?: string | null
          terms?: Json
          updated_at?: string
          version?: string
        }
        Update: {
          activated_at?: string | null
          bridge_type?: string | null
          created_at?: string
          dissolution_notice_at?: string | null
          dissolved_at?: string | null
          handshake_at?: string | null
          id?: string
          local_hub_id?: string
          onchain_network?: string | null
          onchain_tx_hash?: string | null
          proposed_at?: string
          proposed_by?: string | null
          ratified_at?: string | null
          remote_hub_id?: string
          remote_hub_name?: string
          remote_hub_url?: string | null
          status?: string
          superfluid_stream_id?: string | null
          terms?: Json
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_covenants_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_dissolution_records: {
        Row: {
          archive_completed: boolean
          covenant_id: string
          data_export_completed: boolean
          effective_at: string
          id: string
          initiated_by: string
          notice_given_at: string
          notice_period_days: number
          reason: string | null
          status: string
        }
        Insert: {
          archive_completed?: boolean
          covenant_id: string
          data_export_completed?: boolean
          effective_at: string
          id?: string
          initiated_by: string
          notice_given_at?: string
          notice_period_days?: number
          reason?: string | null
          status?: string
        }
        Update: {
          archive_completed?: boolean
          covenant_id?: string
          data_export_completed?: boolean
          effective_at?: string
          id?: string
          initiated_by?: string
          notice_given_at?: string
          notice_period_days?: number
          reason?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_dissolution_records_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: true
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_dissolution_records_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_events: {
        Row: {
          chain_entry_id: string | null
          covenant_id: string
          created_at: string
          event_type: string
          id: string
          mirrored: boolean
          mirrored_at: string | null
          payload: Json
          source_hub: string
        }
        Insert: {
          chain_entry_id?: string | null
          covenant_id: string
          created_at?: string
          event_type: string
          id?: string
          mirrored?: boolean
          mirrored_at?: string | null
          payload?: Json
          source_hub: string
        }
        Update: {
          chain_entry_id?: string | null
          covenant_id?: string
          created_at?: string
          event_type?: string
          id?: string
          mirrored?: boolean
          mirrored_at?: string | null
          payload?: Json
          source_hub?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_events_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: false
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_nominations: {
        Row: {
          covenant_id: string
          id: string
          nominated_at: string
          nominator_id: string
          nominee_id: string
          resolved_at: string | null
          role: string
          status: string
        }
        Insert: {
          covenant_id: string
          id?: string
          nominated_at?: string
          nominator_id: string
          nominee_id: string
          resolved_at?: string | null
          role?: string
          status?: string
        }
        Update: {
          covenant_id?: string
          id?: string
          nominated_at?: string
          nominator_id?: string
          nominee_id?: string
          resolved_at?: string | null
          role?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_nominations_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: false
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominator_id_fkey"
            columns: ["nominator_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_nominations_nominee_id_fkey"
            columns: ["nominee_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_stewards: {
        Row: {
          appointed_at: string
          covenant_id: string
          dual_attestation: boolean
          expires_at: string | null
          hub_side: string
          id: string
          onchain_address: string | null
          participant_id: string
          status: string
        }
        Insert: {
          appointed_at?: string
          covenant_id: string
          dual_attestation?: boolean
          expires_at?: string | null
          hub_side: string
          id?: string
          onchain_address?: string | null
          participant_id: string
          status?: string
        }
        Update: {
          appointed_at?: string
          covenant_id?: string
          dual_attestation?: boolean
          expires_at?: string | null
          hub_side?: string
          id?: string
          onchain_address?: string | null
          participant_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridge_stewards_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: false
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bridge_stewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      care_data_tiers: {
        Row: {
          access_policy: Json
          created_at: string
          data_category: string
          governance_body: string | null
          hub_id: string
          id: string
          rationale: string | null
          tier: string
        }
        Insert: {
          access_policy?: Json
          created_at?: string
          data_category: string
          governance_body?: string | null
          hub_id: string
          id?: string
          rationale?: string | null
          tier: string
        }
        Update: {
          access_policy?: Json
          created_at?: string
          data_category?: string
          governance_body?: string | null
          hub_id?: string
          id?: string
          rationale?: string | null
          tier?: string
        }
        Relationships: []
      }
      chain_batches: {
        Row: {
          activity_count: number
          batch_type: string
          chain_entry_id: string | null
          closed_at: string | null
          convergence_id: string
          created_at: string | null
          id: string
          merkle_root: string | null
          opened_at: string
        }
        Insert: {
          activity_count?: number
          batch_type: string
          chain_entry_id?: string | null
          closed_at?: string | null
          convergence_id: string
          created_at?: string | null
          id?: string
          merkle_root?: string | null
          opened_at: string
        }
        Update: {
          activity_count?: number
          batch_type?: string
          chain_entry_id?: string | null
          closed_at?: string | null
          convergence_id?: string
          created_at?: string | null
          id?: string
          merkle_root?: string | null
          opened_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chain_batches_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "chain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chain_batches_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "dashboard_activity_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chain_batches_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      chain_entries: {
        Row: {
          actor_id: string | null
          aggregate_id: string
          aggregate_type: string
          causation_id: string | null
          chain_index: number
          content_hash: string
          convergence_id: string
          correlation_id: string | null
          created_at: string | null
          event_type: string
          id: string
          nl_source: string | null
          pattern_layer: number | null
          payload: Json
          prev_hash: string
          schema_version: string | null
        }
        Insert: {
          actor_id?: string | null
          aggregate_id: string
          aggregate_type: string
          causation_id?: string | null
          chain_index: number
          content_hash: string
          convergence_id: string
          correlation_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          nl_source?: string | null
          pattern_layer?: number | null
          payload?: Json
          prev_hash: string
          schema_version?: string | null
        }
        Update: {
          actor_id?: string | null
          aggregate_id?: string
          aggregate_type?: string
          causation_id?: string | null
          chain_index?: number
          content_hash?: string
          convergence_id?: string
          correlation_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          nl_source?: string | null
          pattern_layer?: number | null
          payload?: Json
          prev_hash?: string
          schema_version?: string | null
        }
        Relationships: []
      }
      channel_floor_state: {
        Row: {
          channel_id: string
          current_speaker_id: string | null
          mode: string
          phase: string
          phase_started_at: string | null
          queue: string[] | null
          updated_at: string | null
        }
        Insert: {
          channel_id: string
          current_speaker_id?: string | null
          mode?: string
          phase?: string
          phase_started_at?: string | null
          queue?: string[] | null
          updated_at?: string | null
        }
        Update: {
          channel_id?: string
          current_speaker_id?: string | null
          mode?: string
          phase?: string
          phase_started_at?: string | null
          queue?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_floor_state_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: true
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_floor_state_current_speaker_id_fkey"
            columns: ["current_speaker_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          communication_mode:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          convergence_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          position: number
          slug: string
          type: Database["public"]["Enums"]["channel_type"]
          updated_at: string
          visibility: Database["public"]["Enums"]["channel_visibility"]
        }
        Insert: {
          communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          convergence_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          position?: number
          slug: string
          type?: Database["public"]["Enums"]["channel_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["channel_visibility"]
        }
        Update: {
          communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          convergence_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          position?: number
          slug?: string
          type?: Database["public"]["Enums"]["channel_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["channel_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "channels_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      client_errors: {
        Row: {
          component_stack: string | null
          created_at: string
          id: string
          message: string
          stack: string | null
          url: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          component_stack?: string | null
          created_at?: string
          id?: string
          message: string
          stack?: string | null
          url: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          component_stack?: string | null
          created_at?: string
          id?: string
          message?: string
          stack?: string | null
          url?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cloud_balances: {
        Row: {
          balance: number
          id: string
          participant_id: string
          updated_at: string
        }
        Insert: {
          balance?: number
          id?: string
          participant_id: string
          updated_at?: string
        }
        Update: {
          balance?: number
          id?: string
          participant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      cloud_transactions: {
        Row: {
          amount: number
          chain_entry_id: string | null
          created_at: string
          from_id: string | null
          id: string
          reason: string
          to_id: string | null
        }
        Insert: {
          amount: number
          chain_entry_id?: string | null
          created_at?: string
          from_id?: string | null
          id?: string
          reason: string
          to_id?: string | null
        }
        Update: {
          amount?: number
          chain_entry_id?: string | null
          created_at?: string
          from_id?: string | null
          id?: string
          reason?: string
          to_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cloud_transactions_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "chain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "dashboard_activity_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      commitments: {
        Row: {
          artifact_id: string | null
          created_at: string
          description: string
          due_date: string | null
          id: string
          last_reminded_at: string | null
          participant_id: string
          progress_notes: Json[] | null
          reminder_count: number | null
          status: Database["public"]["Enums"]["commitment_status"]
          updated_at: string
        }
        Insert: {
          artifact_id?: string | null
          created_at?: string
          description: string
          due_date?: string | null
          id?: string
          last_reminded_at?: string | null
          participant_id: string
          progress_notes?: Json[] | null
          reminder_count?: number | null
          status?: Database["public"]["Enums"]["commitment_status"]
          updated_at?: string
        }
        Update: {
          artifact_id?: string | null
          created_at?: string
          description?: string
          due_date?: string | null
          id?: string
          last_reminded_at?: string | null
          participant_id?: string
          progress_notes?: Json[] | null
          reminder_count?: number | null
          status?: Database["public"]["Enums"]["commitment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "commitments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commitments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      committee_endorsements: {
        Row: {
          committee_id: string
          contribution_id: string
          endorsed_at: string | null
          endorsed_by: string | null
          id: string
        }
        Insert: {
          committee_id: string
          contribution_id: string
          endorsed_at?: string | null
          endorsed_by?: string | null
          id?: string
        }
        Update: {
          committee_id?: string
          contribution_id?: string
          endorsed_at?: string | null
          endorsed_by?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "committee_endorsements_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_endorsements_endorsed_by_fkey"
            columns: ["endorsed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      committee_members: {
        Row: {
          committee_id: string
          council_member_id: string
          id: string
          role: string
        }
        Insert: {
          committee_id: string
          council_member_id: string
          id?: string
          role?: string
        }
        Update: {
          committee_id?: string
          council_member_id?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "committee_members_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "council_committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_members_council_member_id_fkey"
            columns: ["council_member_id"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
        ]
      }
      conflict_mediations: {
        Row: {
          committee_id: string | null
          description: string | null
          filed_at: string
          id: string
          mediator_id: string | null
          parties: string[]
          resolution: string | null
          resolved_at: string | null
          status: string
          title: string
        }
        Insert: {
          committee_id?: string | null
          description?: string | null
          filed_at?: string
          id?: string
          mediator_id?: string | null
          parties: string[]
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          title: string
        }
        Update: {
          committee_id?: string | null
          description?: string | null
          filed_at?: string
          id?: string
          mediator_id?: string | null
          parties?: string[]
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "conflict_mediations_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "council_committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conflict_mediations_mediator_id_fkey"
            columns: ["mediator_id"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_grants: {
        Row: {
          expires_at: string | null
          granted_at: string
          grantee_id: string
          grantor_id: string
          id: string
          notes: string | null
          revoked_at: string | null
          scope: string
          status: string
        }
        Insert: {
          expires_at?: string | null
          granted_at?: string
          grantee_id: string
          grantor_id: string
          id?: string
          notes?: string | null
          revoked_at?: string | null
          scope: string
          status?: string
        }
        Update: {
          expires_at?: string | null
          granted_at?: string
          grantee_id?: string
          grantor_id?: string
          id?: string
          notes?: string | null
          revoked_at?: string | null
          scope?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantee_id_fkey"
            columns: ["grantee_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_grants_grantor_id_fkey"
            columns: ["grantor_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      contribution_attestations: {
        Row: {
          attestation_type: string
          attested_by: string
          contribution_id: string
          created_at: string
          id: string
          note: string | null
        }
        Insert: {
          attestation_type?: string
          attested_by: string
          contribution_id: string
          created_at?: string
          id?: string
          note?: string | null
        }
        Update: {
          attestation_type?: string
          attested_by?: string
          contribution_id?: string
          created_at?: string
          id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_attested_by_fkey"
            columns: ["attested_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_attestations_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
        ]
      }
      contribution_references: {
        Row: {
          created_at: string | null
          from_contribution_id: string
          id: string
          to_contribution_id: string
        }
        Insert: {
          created_at?: string | null
          from_contribution_id: string
          id?: string
          to_contribution_id: string
        }
        Update: {
          created_at?: string | null
          from_contribution_id?: string
          id?: string
          to_contribution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contribution_references_from_contribution_id_fkey"
            columns: ["from_contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_references_from_contribution_id_fkey"
            columns: ["from_contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_references_to_contribution_id_fkey"
            columns: ["to_contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contribution_references_to_contribution_id_fkey"
            columns: ["to_contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
        ]
      }
      contributions: {
        Row: {
          attestation_count: number
          chain_hash: string | null
          content: string
          convergence_id: string | null
          created_at: string | null
          dimensions: string[] | null
          errors: Json | null
          extraction: Json | null
          hub_id: string | null
          id: string
          inbound_references: number | null
          parent_contribution_id: string | null
          parent_hash: string | null
          participant_id: string | null
          processed_at: string | null
          rarity: string | null
          recognition_count: number | null
          search_vector: unknown
          seq: number | null
          session_id: string | null
          source_url: string | null
          sprint_ref: string | null
          status: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          verified: boolean
        }
        Insert: {
          attestation_count?: number
          chain_hash?: string | null
          content: string
          convergence_id?: string | null
          created_at?: string | null
          dimensions?: string[] | null
          errors?: Json | null
          extraction?: Json | null
          hub_id?: string | null
          id?: string
          inbound_references?: number | null
          parent_contribution_id?: string | null
          parent_hash?: string | null
          participant_id?: string | null
          processed_at?: string | null
          rarity?: string | null
          recognition_count?: number | null
          search_vector?: unknown
          seq?: number | null
          session_id?: string | null
          source_url?: string | null
          sprint_ref?: string | null
          status?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          verified?: boolean
        }
        Update: {
          attestation_count?: number
          chain_hash?: string | null
          content?: string
          convergence_id?: string | null
          created_at?: string | null
          dimensions?: string[] | null
          errors?: Json | null
          extraction?: Json | null
          hub_id?: string | null
          id?: string
          inbound_references?: number | null
          parent_contribution_id?: string | null
          parent_hash?: string | null
          participant_id?: string | null
          processed_at?: string | null
          rarity?: string | null
          recognition_count?: number | null
          search_vector?: unknown
          seq?: number | null
          session_id?: string | null
          source_url?: string | null
          sprint_ref?: string | null
          status?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "contributions_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_parent_contribution_id_fkey"
            columns: ["parent_contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_parent_contribution_id_fkey"
            columns: ["parent_contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      contributor_profiles: {
        Row: {
          created_at: string
          email: string | null
          field_experience: string | null
          id: string
          onboarding_path: string
          participant_id: string
          phone: string | null
          preferred_name: string | null
          wallet_connected: boolean
        }
        Insert: {
          created_at?: string
          email?: string | null
          field_experience?: string | null
          id?: string
          onboarding_path?: string
          participant_id: string
          phone?: string | null
          preferred_name?: string | null
          wallet_connected?: boolean
        }
        Update: {
          created_at?: string
          email?: string | null
          field_experience?: string | null
          id?: string
          onboarding_path?: string
          participant_id?: string
          phone?: string | null
          preferred_name?: string | null
          wallet_connected?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributor_profiles_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      convergence_participants: {
        Row: {
          convergence_id: string
          participant_id: string
          registered_at: string
          state: Database["public"]["Enums"]["attendance_state"]
        }
        Insert: {
          convergence_id: string
          participant_id: string
          registered_at?: string
          state?: Database["public"]["Enums"]["attendance_state"]
        }
        Update: {
          convergence_id?: string
          participant_id?: string
          registered_at?: string
          state?: Database["public"]["Enums"]["attendance_state"]
        }
        Relationships: [
          {
            foreignKeyName: "convergence_participants_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergence_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      convergence_templates: {
        Row: {
          created_at: string
          description: string
          dimensions: Json
          id: string
          logo_accent: string | null
          name: string
          tagline: string | null
          theme: Json
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          dimensions?: Json
          id?: string
          logo_accent?: string | null
          name: string
          tagline?: string | null
          theme?: Json
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          dimensions?: Json
          id?: string
          logo_accent?: string | null
          name?: string
          tagline?: string | null
          theme?: Json
          type?: string
        }
        Relationships: []
      }
      convergences: {
        Row: {
          bioregion_id: string | null
          convergence_type: string | null
          created_at: string
          date_end: string | null
          date_start: string | null
          description: string | null
          dimensions: Json | null
          hub_id: string | null
          id: string
          is_active: boolean | null
          location: string | null
          logo_accent: string | null
          logo_text: string | null
          name: string
          opens_at: string | null
          slug: string | null
          state: Database["public"]["Enums"]["convergence_state"]
          steward_ids: string[] | null
          tagline: string | null
          theme_bg: string | null
          theme_border: string | null
          theme_primary: string | null
          theme_surface: string | null
          updated_at: string
        }
        Insert: {
          bioregion_id?: string | null
          convergence_type?: string | null
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          dimensions?: Json | null
          hub_id?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_accent?: string | null
          logo_text?: string | null
          name: string
          opens_at?: string | null
          slug?: string | null
          state?: Database["public"]["Enums"]["convergence_state"]
          steward_ids?: string[] | null
          tagline?: string | null
          theme_bg?: string | null
          theme_border?: string | null
          theme_primary?: string | null
          theme_surface?: string | null
          updated_at?: string
        }
        Update: {
          bioregion_id?: string | null
          convergence_type?: string | null
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          dimensions?: Json | null
          hub_id?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_accent?: string | null
          logo_text?: string | null
          name?: string
          opens_at?: string | null
          slug?: string | null
          state?: Database["public"]["Enums"]["convergence_state"]
          steward_ids?: string[] | null
          tagline?: string | null
          theme_bg?: string | null
          theme_border?: string | null
          theme_primary?: string | null
          theme_surface?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "convergences_bioregion_id_fkey"
            columns: ["bioregion_id"]
            isOneToOne: false
            referencedRelation: "bioregions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convergences_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
        ]
      }
      coordination_interests: {
        Row: {
          artifact_id: string
          created_at: string
          id: string
          note: string | null
          participant_id: string
        }
        Insert: {
          artifact_id: string
          created_at?: string
          id?: string
          note?: string | null
          participant_id: string
        }
        Update: {
          artifact_id?: string
          created_at?: string
          id?: string
          note?: string | null
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      coordination_links: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          shared_by: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          shared_by?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          shared_by?: string | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_links_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      coordination_requests: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          capability_requirements: Json | null
          channel_id: string
          claimed_at: string | null
          claimed_by: string | null
          completed_at: string | null
          completion_proof: string | null
          complexity: string | null
          context_refs: Json | null
          created_at: string | null
          description: string
          id: string
          injected_context: Json | null
          layers: string[] | null
          negotiation_log: Json | null
          paused_at: string | null
          paused_by: string | null
          prev_status: string | null
          progress_log: Json | null
          proposed_roles: Json | null
          proposer_id: string
          reference_urls: string[] | null
          result_summary: string | null
          roadmap_id: string | null
          roadmap_phase: string | null
          sprint_id: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          visibility_tier:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          capability_requirements?: Json | null
          channel_id: string
          claimed_at?: string | null
          claimed_by?: string | null
          completed_at?: string | null
          completion_proof?: string | null
          complexity?: string | null
          context_refs?: Json | null
          created_at?: string | null
          description: string
          id?: string
          injected_context?: Json | null
          layers?: string[] | null
          negotiation_log?: Json | null
          paused_at?: string | null
          paused_by?: string | null
          prev_status?: string | null
          progress_log?: Json | null
          proposed_roles?: Json | null
          proposer_id: string
          reference_urls?: string[] | null
          result_summary?: string | null
          roadmap_id?: string | null
          roadmap_phase?: string | null
          sprint_id?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          visibility_tier?:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type?: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          capability_requirements?: Json | null
          channel_id?: string
          claimed_at?: string | null
          claimed_by?: string | null
          completed_at?: string | null
          completion_proof?: string | null
          complexity?: string | null
          context_refs?: Json | null
          created_at?: string | null
          description?: string
          id?: string
          injected_context?: Json | null
          layers?: string[] | null
          negotiation_log?: Json | null
          paused_at?: string | null
          paused_by?: string | null
          prev_status?: string | null
          progress_log?: Json | null
          proposed_roles?: Json | null
          proposer_id?: string
          reference_urls?: string[] | null
          result_summary?: string | null
          roadmap_id?: string | null
          roadmap_phase?: string | null
          sprint_id?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          visibility_tier?:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type?: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      coordination_signals: {
        Row: {
          agent_id: string
          channel_id: string
          context: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          reference_id: string | null
          signal_type: string
        }
        Insert: {
          agent_id: string
          channel_id: string
          context?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          reference_id?: string | null
          signal_type: string
        }
        Update: {
          agent_id?: string
          channel_id?: string
          context?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          reference_id?: string | null
          signal_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_signals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_signals_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      council_committees: {
        Row: {
          chair_id: string | null
          created_at: string
          id: string
          meeting_cadence: string | null
          name: string
          purpose: string | null
        }
        Insert: {
          chair_id?: string | null
          created_at?: string
          id?: string
          meeting_cadence?: string | null
          name: string
          purpose?: string | null
        }
        Update: {
          chair_id?: string | null
          created_at?: string
          id?: string
          meeting_cadence?: string | null
          name?: string
          purpose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "council_committees_chair_id_fkey"
            columns: ["chair_id"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
        ]
      }
      council_decisions: {
        Row: {
          chain_entry_id: string | null
          committee_id: string | null
          consensus_level: string
          decision_type: string
          description: string | null
          id: string
          proposed_at: string
          proposed_by: string
          resolved_at: string | null
          status: string
          threshold_pct: number
          title: string
          voting_closes_at: string | null
          voting_opens_at: string | null
        }
        Insert: {
          chain_entry_id?: string | null
          committee_id?: string | null
          consensus_level: string
          decision_type: string
          description?: string | null
          id?: string
          proposed_at?: string
          proposed_by: string
          resolved_at?: string | null
          status?: string
          threshold_pct?: number
          title: string
          voting_closes_at?: string | null
          voting_opens_at?: string | null
        }
        Update: {
          chain_entry_id?: string | null
          committee_id?: string | null
          consensus_level?: string
          decision_type?: string
          description?: string | null
          id?: string
          proposed_at?: string
          proposed_by?: string
          resolved_at?: string | null
          status?: string
          threshold_pct?: number
          title?: string
          voting_closes_at?: string | null
          voting_opens_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "council_decisions_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "council_committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_decisions_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
        ]
      }
      council_members: {
        Row: {
          hub_id: string
          hub_name: string
          id: string
          participant_id: string
          rotation_year: number
          status: string
          term_end: string | null
          term_start: string
        }
        Insert: {
          hub_id: string
          hub_name: string
          id?: string
          participant_id: string
          rotation_year?: number
          status?: string
          term_end?: string | null
          term_start?: string
        }
        Update: {
          hub_id?: string
          hub_name?: string
          id?: string
          participant_id?: string
          rotation_year?: number
          status?: string
          term_end?: string | null
          term_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      council_votes: {
        Row: {
          council_member_id: string
          decision_id: string
          id: string
          rationale: string | null
          vote: string
          voted_at: string
        }
        Insert: {
          council_member_id: string
          decision_id: string
          id?: string
          rationale?: string | null
          vote: string
          voted_at?: string
        }
        Update: {
          council_member_id?: string
          decision_id?: string
          id?: string
          rationale?: string | null
          vote?: string
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "council_votes_council_member_id_fkey"
            columns: ["council_member_id"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_votes_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "council_decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      craft_functional_modes: {
        Row: {
          craft: string
          created_at: string | null
          description: string | null
          mode: string
        }
        Insert: {
          craft: string
          created_at?: string | null
          description?: string | null
          mode: string
        }
        Update: {
          craft?: string
          created_at?: string | null
          description?: string | null
          mode?: string
        }
        Relationships: []
      }
      craft_standards: {
        Row: {
          author_id: string | null
          community_id: string
          content: string
          created_at: string
          effective_from: string
          id: string
          status: string
          supersedes_id: string | null
          title: string
          version: string
        }
        Insert: {
          author_id?: string | null
          community_id: string
          content: string
          created_at?: string
          effective_from?: string
          id?: string
          status?: string
          supersedes_id?: string | null
          title: string
          version?: string
        }
        Update: {
          author_id?: string | null
          community_id?: string
          content?: string
          created_at?: string
          effective_from?: string
          id?: string
          status?: string
          supersedes_id?: string | null
          title?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "practice_communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "craft_standards_supersedes_id_fkey"
            columns: ["supersedes_id"]
            isOneToOne: false
            referencedRelation: "craft_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      credential_issuances: {
        Row: {
          created_at: string
          credential_id: string
          id: string
          signature: string | null
          signed_by: string | null
          trigger_data: Json
          trigger_event: string
        }
        Insert: {
          created_at?: string
          credential_id: string
          id?: string
          signature?: string | null
          signed_by?: string | null
          trigger_data?: Json
          trigger_event: string
        }
        Update: {
          created_at?: string
          credential_id?: string
          id?: string
          signature?: string | null
          signed_by?: string | null
          trigger_data?: Json
          trigger_event?: string
        }
        Relationships: [
          {
            foreignKeyName: "credential_issuances_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "portable_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_issuances_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      credential_revocations: {
        Row: {
          credential_id: string
          id: string
          reason: string
          revoked_at: string
          revoked_by: string
        }
        Insert: {
          credential_id: string
          id?: string
          reason: string
          revoked_at?: string
          revoked_by: string
        }
        Update: {
          credential_id?: string
          id?: string
          reason?: string
          revoked_at?: string
          revoked_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "credential_revocations_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: true
            referencedRelation: "portable_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_revocations_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      credential_verifications: {
        Row: {
          credential_id: string
          id: string
          result: string
          verification_method: string
          verified_at: string
          verified_by: string | null
          verifier_hub_id: string
        }
        Insert: {
          credential_id: string
          id?: string
          result: string
          verification_method?: string
          verified_at?: string
          verified_by?: string | null
          verifier_hub_id: string
        }
        Update: {
          credential_id?: string
          id?: string
          result?: string
          verification_method?: string
          verified_at?: string
          verified_by?: string | null
          verifier_hub_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credential_verifications_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "portable_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_verifications_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      dit_access_log: {
        Row: {
          access_type: string
          accessor_id: string | null
          hub_id: string
          id: string
          ip_address: string | null
          logged_at: string
          resource: string
          result: string
          user_agent: string | null
        }
        Insert: {
          access_type: string
          accessor_id?: string | null
          hub_id: string
          id?: string
          ip_address?: string | null
          logged_at?: string
          resource: string
          result?: string
          user_agent?: string | null
        }
        Update: {
          access_type?: string
          accessor_id?: string | null
          hub_id?: string
          id?: string
          ip_address?: string | null
          logged_at?: string
          resource?: string
          result?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      dit_alerts: {
        Row: {
          acknowledged: boolean
          acknowledged_at: string | null
          acknowledged_by: string | null
          created_at: string
          health_check_id: string | null
          id: string
          message: string
          severity: string
        }
        Insert: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          created_at?: string
          health_check_id?: string | null
          id?: string
          message: string
          severity: string
        }
        Update: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          created_at?: string
          health_check_id?: string | null
          id?: string
          message?: string
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_alerts_health_check_id_fkey"
            columns: ["health_check_id"]
            isOneToOne: false
            referencedRelation: "dit_health_checks"
            referencedColumns: ["id"]
          },
        ]
      }
      dit_data_regions: {
        Row: {
          created_at: string
          data_sovereignty_compliant: boolean
          encryption_standard: string
          hub_count: number
          id: string
          jurisdiction: string
          region_code: string
          region_name: string
        }
        Insert: {
          created_at?: string
          data_sovereignty_compliant?: boolean
          encryption_standard?: string
          hub_count?: number
          id?: string
          jurisdiction: string
          region_code: string
          region_name: string
        }
        Update: {
          created_at?: string
          data_sovereignty_compliant?: boolean
          encryption_standard?: string
          hub_count?: number
          id?: string
          jurisdiction?: string
          region_code?: string
          region_name?: string
        }
        Relationships: []
      }
      dit_exit_requests: {
        Row: {
          completed_at: string | null
          data_categories: string[]
          effective_at: string
          export_format: string
          hub_id: string
          hub_name: string
          id: string
          notice_days: number
          requested_at: string
          requested_by: string | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          data_categories?: string[]
          effective_at: string
          export_format?: string
          hub_id: string
          hub_name: string
          id?: string
          notice_days?: number
          requested_at?: string
          requested_by?: string | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          data_categories?: string[]
          effective_at?: string
          export_format?: string
          hub_id?: string
          hub_name?: string
          id?: string
          notice_days?: number
          requested_at?: string
          requested_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_exit_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      dit_governance: {
        Row: {
          bylaws_content: string | null
          bylaws_version: string
          election_cadence: string
          id: string
          last_election: string | null
          next_election: string | null
          treasurer_id: string | null
          updated_at: string
        }
        Insert: {
          bylaws_content?: string | null
          bylaws_version?: string
          election_cadence?: string
          id?: string
          last_election?: string | null
          next_election?: string | null
          treasurer_id?: string | null
          updated_at?: string
        }
        Update: {
          bylaws_content?: string | null
          bylaws_version?: string
          election_cadence?: string
          id?: string
          last_election?: string | null
          next_election?: string | null
          treasurer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dit_governance_treasurer_id_fkey"
            columns: ["treasurer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      dit_health_checks: {
        Row: {
          alert_triggered: boolean
          check_type: string
          checked_at: string
          id: string
          service_name: string
          status: string
          threshold: number | null
          value: number | null
        }
        Insert: {
          alert_triggered?: boolean
          check_type: string
          checked_at?: string
          id?: string
          service_name: string
          status?: string
          threshold?: number | null
          value?: number | null
        }
        Update: {
          alert_triggered?: boolean
          check_type?: string
          checked_at?: string
          id?: string
          service_name?: string
          status?: string
          threshold?: number | null
          value?: number | null
        }
        Relationships: []
      }
      dit_service_pricing: {
        Row: {
          cloud_price: number
          created_at: string
          effective_from: string
          effective_to: string | null
          id: string
          quarter: string
          resource_type: string
          service_name: string
          unit: string
        }
        Insert: {
          cloud_price: number
          created_at?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          quarter: string
          resource_type: string
          service_name: string
          unit: string
        }
        Update: {
          cloud_price?: number
          created_at?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          quarter?: string
          resource_type?: string
          service_name?: string
          unit?: string
        }
        Relationships: []
      }
      domain_expertise: {
        Row: {
          created_at: string
          domain_id: string
          id: string
          last_contribution_at: string | null
          level: number
          participant_id: string
          unlocked_at: string
          updated_at: string
          xp: number
        }
        Insert: {
          created_at?: string
          domain_id: string
          id?: string
          last_contribution_at?: string | null
          level?: number
          participant_id: string
          unlocked_at?: string
          updated_at?: string
          xp?: number
        }
        Update: {
          created_at?: string
          domain_id?: string
          id?: string
          last_contribution_at?: string | null
          level?: number
          participant_id?: string
          unlocked_at?: string
          updated_at?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_xp_events: {
        Row: {
          chain_entry_id: string | null
          created_at: string
          domain_id: string
          id: string
          participant_id: string
          reason: string | null
          xp_earned: number
        }
        Insert: {
          chain_entry_id?: string | null
          created_at?: string
          domain_id: string
          id?: string
          participant_id: string
          reason?: string | null
          xp_earned?: number
        }
        Update: {
          chain_entry_id?: string | null
          created_at?: string
          domain_id?: string
          id?: string
          participant_id?: string
          reason?: string | null
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "domain_xp_events_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "chain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_chain_entry_id_fkey"
            columns: ["chain_entry_id"]
            isOneToOne: false
            referencedRelation: "dashboard_activity_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_xp_events_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      earning_rules: {
        Row: {
          active: boolean
          base_credits: number
          contribution_type: string
          effective_from: string
          id: string
          max_daily_credits: number | null
          standing_multipliers: Json
          verification_bonus: Json
        }
        Insert: {
          active?: boolean
          base_credits?: number
          contribution_type: string
          effective_from?: string
          id?: string
          max_daily_credits?: number | null
          standing_multipliers?: Json
          verification_bonus?: Json
        }
        Update: {
          active?: boolean
          base_credits?: number
          contribution_type?: string
          effective_from?: string
          id?: string
          max_daily_credits?: number | null
          standing_multipliers?: Json
          verification_bonus?: Json
        }
        Relationships: []
      }
      eas_attestations: {
        Row: {
          attestation_uid: string | null
          attester_id: string
          chain_id: number | null
          claims: Json
          contribution_id: string | null
          created_at: string
          evidence_url: string | null
          hypercert_id: string | null
          id: string
          schema_uid: string | null
        }
        Insert: {
          attestation_uid?: string | null
          attester_id: string
          chain_id?: number | null
          claims?: Json
          contribution_id?: string | null
          created_at?: string
          evidence_url?: string | null
          hypercert_id?: string | null
          id?: string
          schema_uid?: string | null
        }
        Update: {
          attestation_uid?: string | null
          attester_id?: string
          chain_id?: number | null
          claims?: Json
          contribution_id?: string | null
          created_at?: string
          evidence_url?: string | null
          hypercert_id?: string | null
          id?: string
          schema_uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_attester_id_fkey"
            columns: ["attester_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eas_attestations_hypercert_id_fkey"
            columns: ["hypercert_id"]
            isOneToOne: false
            referencedRelation: "hypercerts"
            referencedColumns: ["id"]
          },
        ]
      }
      ecological_anomalies: {
        Row: {
          acknowledged: boolean
          baseline_value: number | null
          detected_at: string
          deviation_pct: number | null
          hub_id: string | null
          id: string
          message: string
          metric_name: string
          observed_value: number
          severity: string
          timeseries_id: string | null
        }
        Insert: {
          acknowledged?: boolean
          baseline_value?: number | null
          detected_at?: string
          deviation_pct?: number | null
          hub_id?: string | null
          id?: string
          message: string
          metric_name: string
          observed_value: number
          severity: string
          timeseries_id?: string | null
        }
        Update: {
          acknowledged?: boolean
          baseline_value?: number | null
          detected_at?: string
          deviation_pct?: number | null
          hub_id?: string | null
          id?: string
          message?: string
          metric_name?: string
          observed_value?: number
          severity?: string
          timeseries_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecological_anomalies_timeseries_id_fkey"
            columns: ["timeseries_id"]
            isOneToOne: false
            referencedRelation: "ecological_timeseries"
            referencedColumns: ["id"]
          },
        ]
      }
      ecological_bounties: {
        Row: {
          bounty_type: string
          claimed_count: number
          created_at: string
          description: string | null
          expires_at: string | null
          hub_id: string
          id: string
          max_claims: number
          methodology: string | null
          posted_by: string | null
          quality_criteria: Json
          reward_amount: number
          reward_currency: string
          status: string
          title: string
        }
        Insert: {
          bounty_type: string
          claimed_count?: number
          created_at?: string
          description?: string | null
          expires_at?: string | null
          hub_id: string
          id?: string
          max_claims?: number
          methodology?: string | null
          posted_by?: string | null
          quality_criteria?: Json
          reward_amount: number
          reward_currency?: string
          status?: string
          title: string
        }
        Update: {
          bounty_type?: string
          claimed_count?: number
          created_at?: string
          description?: string | null
          expires_at?: string | null
          hub_id?: string
          id?: string
          max_claims?: number
          methodology?: string | null
          posted_by?: string | null
          quality_criteria?: Json
          reward_amount?: number
          reward_currency?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_bounties_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      ecological_data_sources: {
        Row: {
          api_key_ref: string | null
          base_url: string | null
          created_at: string
          id: string
          last_polled_at: string | null
          poll_interval_minutes: number | null
          source_name: string
          source_type: string
          status: string
        }
        Insert: {
          api_key_ref?: string | null
          base_url?: string | null
          created_at?: string
          id?: string
          last_polled_at?: string | null
          poll_interval_minutes?: number | null
          source_name: string
          source_type: string
          status?: string
        }
        Update: {
          api_key_ref?: string | null
          base_url?: string | null
          created_at?: string
          id?: string
          last_polled_at?: string | null
          poll_interval_minutes?: number | null
          source_name?: string
          source_type?: string
          status?: string
        }
        Relationships: []
      }
      ecological_observations: {
        Row: {
          created_at: string
          hub_id: string
          id: string
          location: Json | null
          observation_type: string
          observed_at: string
          observer_id: string | null
          source: string
          value: Json
          verified: boolean
        }
        Insert: {
          created_at?: string
          hub_id: string
          id?: string
          location?: Json | null
          observation_type: string
          observed_at?: string
          observer_id?: string | null
          source?: string
          value?: Json
          verified?: boolean
        }
        Update: {
          created_at?: string
          hub_id?: string
          id?: string
          location?: Json | null
          observation_type?: string
          observed_at?: string
          observer_id?: string | null
          source?: string
          value?: Json
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_observations_observer_id_fkey"
            columns: ["observer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      ecological_patronage_weights: {
        Row: {
          bounties_completed: number
          computed_at: string
          computed_weight: number
          ecological_contributions: number
          hub_id: string
          hypercert_count: number
          id: string
          participant_id: string
          period: string
          stewardship_score: number
        }
        Insert: {
          bounties_completed?: number
          computed_at?: string
          computed_weight?: number
          ecological_contributions?: number
          hub_id: string
          hypercert_count?: number
          id?: string
          participant_id: string
          period: string
          stewardship_score?: number
        }
        Update: {
          bounties_completed?: number
          computed_at?: string
          computed_weight?: number
          ecological_contributions?: number
          hub_id?: string
          hypercert_count?: number
          id?: string
          participant_id?: string
          period?: string
          stewardship_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_patronage_weights_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      ecological_timeseries: {
        Row: {
          hub_id: string | null
          id: string
          ingested_at: string
          location: Json | null
          metric_name: string
          metric_unit: string
          observed_at: string
          quality_flag: string | null
          source_id: string
          station_id: string | null
          value: number
        }
        Insert: {
          hub_id?: string | null
          id?: string
          ingested_at?: string
          location?: Json | null
          metric_name: string
          metric_unit: string
          observed_at: string
          quality_flag?: string | null
          source_id: string
          station_id?: string | null
          value: number
        }
        Update: {
          hub_id?: string | null
          id?: string
          ingested_at?: string
          location?: Json | null
          metric_name?: string
          metric_unit?: string
          observed_at?: string
          quality_flag?: string | null
          source_id?: string
          station_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "ecological_timeseries_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "ecological_data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      education_path_rewards: {
        Row: {
          claimed_at: string
          cloud_amount: number
          id: string
          participant_id: string
          path_id: string
        }
        Insert: {
          claimed_at?: string
          cloud_amount?: number
          id?: string
          participant_id: string
          path_id: string
        }
        Update: {
          claimed_at?: string
          cloud_amount?: number
          id?: string
          participant_id?: string
          path_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_path_rewards_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_path_rewards_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "education_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      education_paths: {
        Row: {
          created_at: string
          description: string | null
          dimension: string | null
          estimated_minutes: number | null
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          dimension?: string | null
          estimated_minutes?: number | null
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          dimension?: string | null
          estimated_minutes?: number | null
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      education_progress: {
        Row: {
          completed_at: string
          id: string
          participant_id: string
          step_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          participant_id: string
          step_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          participant_id?: string
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_progress_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_progress_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "education_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      education_steps: {
        Row: {
          content: string
          created_at: string
          estimated_minutes: number | null
          id: string
          path_id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          estimated_minutes?: number | null
          id?: string
          path_id: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          estimated_minutes?: number | null
          id?: string
          path_id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_steps_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "education_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      engagement_capacity_types: {
        Row: {
          default_hours: number
          description: string | null
          engagement_type: string
          id: string
        }
        Insert: {
          default_hours: number
          description?: string | null
          engagement_type: string
          id?: string
        }
        Update: {
          default_hours?: number
          description?: string | null
          engagement_type?: string
          id?: string
        }
        Relationships: []
      }
      engagement_members: {
        Row: {
          capacity_hours: number | null
          engagement_id: string
          id: string
          joined_at: string
          participant_id: string
          role: string
        }
        Insert: {
          capacity_hours?: number | null
          engagement_id: string
          id?: string
          joined_at?: string
          participant_id: string
          role: string
        }
        Update: {
          capacity_hours?: number | null
          engagement_id?: string
          id?: string
          joined_at?: string
          participant_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagement_members_engagement_id_fkey"
            columns: ["engagement_id"]
            isOneToOne: false
            referencedRelation: "engagements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      engagement_scopes: {
        Row: {
          deliverables: string[]
          engagement_id: string
          id: string
          objectives: string[]
          out_of_scope: string[]
          success_criteria: string[]
          updated_at: string
        }
        Insert: {
          deliverables?: string[]
          engagement_id: string
          id?: string
          objectives?: string[]
          out_of_scope?: string[]
          success_criteria?: string[]
          updated_at?: string
        }
        Update: {
          deliverables?: string[]
          engagement_id?: string
          id?: string
          objectives?: string[]
          out_of_scope?: string[]
          success_criteria?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagement_scopes_engagement_id_fkey"
            columns: ["engagement_id"]
            isOneToOne: true
            referencedRelation: "engagements"
            referencedColumns: ["id"]
          },
        ]
      }
      engagements: {
        Row: {
          capacity_cost: number | null
          created_at: string
          description: string | null
          end_date: string | null
          hub_id: string | null
          id: string
          lead_id: string | null
          start_date: string | null
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          capacity_cost?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          hub_id?: string | null
          id?: string
          lead_id?: string | null
          start_date?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          capacity_cost?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          hub_id?: string | null
          id?: string
          lead_id?: string | null
          start_date?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagements_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          applicant_id: string | null
          applied_at: string
          craft_primary: string | null
          enrolled_at: string | null
          id: string
          intent: string | null
          name: string
          referrer: string | null
          referrer_id: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          applicant_id?: string | null
          applied_at?: string
          craft_primary?: string | null
          enrolled_at?: string | null
          id?: string
          intent?: string | null
          name: string
          referrer?: string | null
          referrer_id?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string | null
          applied_at?: string
          craft_primary?: string | null
          enrolled_at?: string | null
          id?: string
          intent?: string | null
          name?: string
          referrer?: string | null
          referrer_id?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          actor_id: string | null
          actor_type: string
          convergence_id: string | null
          created_at: string
          data: Json
          entity_id: string
          entity_type: string
          id: string
          type: Database["public"]["Enums"]["event_type"]
        }
        Insert: {
          actor_id?: string | null
          actor_type: string
          convergence_id?: string | null
          created_at?: string
          data?: Json
          entity_id: string
          entity_type: string
          id?: string
          type: Database["public"]["Enums"]["event_type"]
        }
        Update: {
          actor_id?: string | null
          actor_type?: string
          convergence_id?: string | null
          created_at?: string
          data?: Json
          entity_id?: string
          entity_type?: string
          id?: string
          type?: Database["public"]["Enums"]["event_type"]
        }
        Relationships: [
          {
            foreignKeyName: "events_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_suggestions: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          participant_id: string | null
          status: string
          title: string
          updated_at: string
          vote_count: number
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          participant_id?: string | null
          status?: string
          title: string
          updated_at?: string
          vote_count?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          participant_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          vote_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_suggestions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_votes: {
        Row: {
          created_at: string
          id: string
          participant_id: string
          suggestion_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_id: string
          suggestion_id: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_id?: string
          suggestion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_votes_suggestion_id_fkey"
            columns: ["suggestion_id"]
            isOneToOne: false
            referencedRelation: "feature_suggestions"
            referencedColumns: ["id"]
          },
        ]
      }
      federation_identities: {
        Row: {
          did_uri: string | null
          hub_id: string
          hub_name: string
          id: string
          participant_id: string
          remote_participant_id: string | null
          resolved_at: string
          status: string
        }
        Insert: {
          did_uri?: string | null
          hub_id: string
          hub_name: string
          id?: string
          participant_id: string
          remote_participant_id?: string | null
          resolved_at?: string
          status?: string
        }
        Update: {
          did_uri?: string | null
          hub_id?: string
          hub_name?: string
          id?: string
          participant_id?: string
          remote_participant_id?: string | null
          resolved_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "federation_identities_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      field_submissions: {
        Row: {
          description: string | null
          gps_accuracy_m: number | null
          gps_lat: number | null
          gps_lng: number | null
          hub_id: string
          id: string
          metadata: Json
          participant_id: string
          photo_url: string | null
          status: string
          submission_type: string
          submitted_at: string
          title: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          description?: string | null
          gps_accuracy_m?: number | null
          gps_lat?: number | null
          gps_lng?: number | null
          hub_id: string
          id?: string
          metadata?: Json
          participant_id: string
          photo_url?: string | null
          status?: string
          submission_type: string
          submitted_at?: string
          title: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          description?: string | null
          gps_accuracy_m?: number | null
          gps_lat?: number | null
          gps_lng?: number | null
          hub_id?: string
          id?: string
          metadata?: Json
          participant_id?: string
          photo_url?: string | null
          status?: string
          submission_type?: string
          submitted_at?: string
          title?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_submissions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_officer_elections: {
        Row: {
          candidate_id: string
          community_id: string
          created_at: string
          elected_at: string | null
          id: string
          status: string
          term_ends: string | null
        }
        Insert: {
          candidate_id: string
          community_id: string
          created_at?: string
          elected_at?: string | null
          id?: string
          status?: string
          term_ends?: string | null
        }
        Update: {
          candidate_id?: string
          community_id?: string
          created_at?: string
          elected_at?: string | null
          id?: string
          status?: string
          term_ends?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_officer_elections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_officer_elections_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "practice_communities"
            referencedColumns: ["id"]
          },
        ]
      }
      gdpr_export_requests: {
        Row: {
          delivered_at: string | null
          download_url: string | null
          expires_at: string | null
          format: string
          id: string
          includes: string[]
          participant_id: string
          requested_at: string
          status: string
        }
        Insert: {
          delivered_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          format?: string
          id?: string
          includes?: string[]
          participant_id: string
          requested_at?: string
          status?: string
        }
        Update: {
          delivered_at?: string | null
          download_url?: string | null
          expires_at?: string | null
          format?: string
          id?: string
          includes?: string[]
          participant_id?: string
          requested_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdpr_export_requests_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      global_forum_officers: {
        Row: {
          craft: string
          hub_id: string
          hub_name: string
          id: string
          participant_id: string
          status: string
          term_end: string | null
          term_start: string
        }
        Insert: {
          craft: string
          hub_id: string
          hub_name: string
          id?: string
          participant_id: string
          status?: string
          term_end?: string | null
          term_start?: string
        }
        Update: {
          craft?: string
          hub_id?: string
          hub_name?: string
          id?: string
          participant_id?: string
          status?: string
          term_end?: string | null
          term_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_forum_officers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      global_practice_state: {
        Row: {
          craft: string
          forum_officer_name: string | null
          hub_id: string
          hub_name: string
          id: string
          last_synced_at: string
          member_count: number
          standards_version: string | null
        }
        Insert: {
          craft: string
          forum_officer_name?: string | null
          hub_id: string
          hub_name: string
          id?: string
          last_synced_at?: string
          member_count?: number
          standards_version?: string | null
        }
        Update: {
          craft?: string
          forum_officer_name?: string | null
          hub_id?: string
          hub_name?: string
          id?: string
          last_synced_at?: string
          member_count?: number
          standards_version?: string | null
        }
        Relationships: []
      }
      guild_channels: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      guild_messages: {
        Row: {
          agent_name: string | null
          body: string | null
          channel_id: string | null
          content: string | null
          created_at: string | null
          guild: string
          id: string
          is_agent: boolean | null
          message: string
          metadata: Json | null
          sender_id: string | null
          sprint_id: string | null
          title: string | null
        }
        Insert: {
          agent_name?: string | null
          body?: string | null
          channel_id?: string | null
          content?: string | null
          created_at?: string | null
          guild: string
          id?: string
          is_agent?: boolean | null
          message: string
          metadata?: Json | null
          sender_id?: string | null
          sprint_id?: string | null
          title?: string | null
        }
        Update: {
          agent_name?: string | null
          body?: string | null
          channel_id?: string | null
          content?: string | null
          created_at?: string | null
          guild?: string
          id?: string
          is_agent?: boolean | null
          message?: string
          metadata?: Json | null
          sender_id?: string | null
          sprint_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guild_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_admissions: {
        Row: {
          applicant_hub_name: string
          applicant_hub_url: string | null
          application: Json
          applied_at: string
          contact_email: string | null
          contact_name: string | null
          decision_id: string | null
          id: string
          resolved_at: string | null
          sponsor_id: string | null
          status: string
        }
        Insert: {
          applicant_hub_name: string
          applicant_hub_url?: string | null
          application?: Json
          applied_at?: string
          contact_email?: string | null
          contact_name?: string | null
          decision_id?: string | null
          id?: string
          resolved_at?: string | null
          sponsor_id?: string | null
          status?: string
        }
        Update: {
          applicant_hub_name?: string
          applicant_hub_url?: string | null
          application?: Json
          applied_at?: string
          contact_email?: string | null
          contact_name?: string | null
          decision_id?: string | null
          id?: string
          resolved_at?: string | null
          sponsor_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_admissions_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "council_decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_admissions_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "council_members"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_applications: {
        Row: {
          created_at: string
          deposit_method: string | null
          description: string | null
          email: string
          hub_name: string | null
          id: string
          location: string
          member_estimate: number | null
          name: string
          notes: string | null
          reviewed_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          deposit_method?: string | null
          description?: string | null
          email: string
          hub_name?: string | null
          id?: string
          location: string
          member_estimate?: number | null
          name: string
          notes?: string | null
          reviewed_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          deposit_method?: string | null
          description?: string | null
          email?: string
          hub_name?: string | null
          id?: string
          location?: string
          member_estimate?: number | null
          name?: string
          notes?: string | null
          reviewed_at?: string | null
          status?: string
        }
        Relationships: []
      }
      hub_bioregion_profiles: {
        Row: {
          bioregion_id: string
          bioregion_name: string
          climate_zone: string | null
          created_at: string
          ecoregion: string | null
          elevation_range: string | null
          hub_id: string
          id: string
          updated_at: string
          watershed_geometry: Json | null
          watershed_name: string | null
        }
        Insert: {
          bioregion_id: string
          bioregion_name: string
          climate_zone?: string | null
          created_at?: string
          ecoregion?: string | null
          elevation_range?: string | null
          hub_id: string
          id?: string
          updated_at?: string
          watershed_geometry?: Json | null
          watershed_name?: string | null
        }
        Update: {
          bioregion_id?: string
          bioregion_name?: string
          climate_zone?: string | null
          created_at?: string
          ecoregion?: string | null
          elevation_range?: string | null
          hub_id?: string
          id?: string
          updated_at?: string
          watershed_geometry?: Json | null
          watershed_name?: string | null
        }
        Relationships: []
      }
      hub_event_rsvps: {
        Row: {
          created_at: string
          event_id: string
          id: string
          participant_id: string
          status: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          participant_id: string
          status?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          participant_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "hub_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_event_rsvps_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          event_type: string
          hub_id: string
          id: string
          location: string | null
          max_attendees: number | null
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          event_type?: string
          hub_id: string
          id?: string
          location?: string | null
          max_attendees?: number | null
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          event_type?: string
          hub_id?: string
          id?: string
          location?: string | null
          max_attendees?: number | null
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_events_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_memberships: {
        Row: {
          hub_id: string
          id: string
          joined_at: string | null
          participant_id: string
          role: string | null
        }
        Insert: {
          hub_id: string
          id?: string
          joined_at?: string | null
          participant_id: string
          role?: string | null
        }
        Update: {
          hub_id?: string
          id?: string
          joined_at?: string | null
          participant_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hub_memberships_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_memberships_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      hubs: {
        Row: {
          created_at: string
          hub_config: Json
          id: string
          location: string | null
          meridian_longitude: number | null
          name: string
          slug: string
          status: string
          theme_bg: string | null
          theme_primary: string | null
          timezone: string | null
        }
        Insert: {
          created_at?: string
          hub_config?: Json
          id?: string
          location?: string | null
          meridian_longitude?: number | null
          name: string
          slug: string
          status?: string
          theme_bg?: string | null
          theme_primary?: string | null
          timezone?: string | null
        }
        Update: {
          created_at?: string
          hub_config?: Json
          id?: string
          location?: string | null
          meridian_longitude?: number | null
          name?: string
          slug?: string
          status?: string
          theme_bg?: string | null
          theme_primary?: string | null
          timezone?: string | null
        }
        Relationships: []
      }
      hypercerts: {
        Row: {
          chain_id: number | null
          contributors: string[]
          created_at: string
          description: string | null
          hub_id: string
          id: string
          impact_scope: string[]
          minted_at: string | null
          status: string
          title: string
          token_id: string | null
          tx_hash: string | null
          work_scope: string[]
          work_timeframe_end: string | null
          work_timeframe_start: string | null
        }
        Insert: {
          chain_id?: number | null
          contributors?: string[]
          created_at?: string
          description?: string | null
          hub_id: string
          id?: string
          impact_scope?: string[]
          minted_at?: string | null
          status?: string
          title: string
          token_id?: string | null
          tx_hash?: string | null
          work_scope?: string[]
          work_timeframe_end?: string | null
          work_timeframe_start?: string | null
        }
        Update: {
          chain_id?: number | null
          contributors?: string[]
          created_at?: string
          description?: string | null
          hub_id?: string
          id?: string
          impact_scope?: string[]
          minted_at?: string | null
          status?: string
          title?: string
          token_id?: string | null
          tx_hash?: string | null
          work_scope?: string[]
          work_timeframe_end?: string | null
          work_timeframe_start?: string | null
        }
        Relationships: []
      }
      jurisdictional_exports: {
        Row: {
          approved_by: string | null
          completed_at: string | null
          covenant_id: string
          data_categories: string[]
          format: string
          id: string
          requested_at: string
          requester_hub: string
          status: string
        }
        Insert: {
          approved_by?: string | null
          completed_at?: string | null
          covenant_id: string
          data_categories?: string[]
          format?: string
          id?: string
          requested_at?: string
          requester_hub: string
          status?: string
        }
        Update: {
          approved_by?: string | null
          completed_at?: string | null
          covenant_id?: string
          data_categories?: string[]
          format?: string
          id?: string
          requested_at?: string
          requester_hub?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jurisdictional_exports_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: false
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_capacity_budgets: {
        Row: {
          committed_hours: number
          created_at: string
          id: string
          notes: string | null
          participant_id: string
          period_end: string
          period_start: string
          recovery_reserved: number
          total_hours: number
        }
        Insert: {
          committed_hours?: number
          created_at?: string
          id?: string
          notes?: string | null
          participant_id: string
          period_end: string
          period_start: string
          recovery_reserved?: number
          total_hours?: number
        }
        Update: {
          committed_hours?: number
          created_at?: string
          id?: string
          notes?: string | null
          participant_id?: string
          period_end?: string
          period_start?: string
          recovery_reserved?: number
          total_hours?: number
        }
        Relationships: [
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_capacity_budgets_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      mentoring_relationships: {
        Row: {
          completed_at: string | null
          craft: string
          focus: string | null
          id: string
          mentee_id: string
          mentor_id: string
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          craft: string
          focus?: string | null
          id?: string
          mentee_id: string
          mentor_id: string
          started_at?: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          craft?: string
          focus?: string | null
          id?: string
          mentee_id?: string
          mentor_id?: string
          started_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentoring_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      message_mentions: {
        Row: {
          id: string
          mentioned_participant_id: string
          message_id: string
        }
        Insert: {
          id?: string
          mentioned_participant_id: string
          message_id: string
        }
        Update: {
          id?: string
          mentioned_participant_id?: string
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_mentioned_participant_id_fkey"
            columns: ["mentioned_participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          participant_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "guild_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          author_id: string | null
          author_type: Database["public"]["Enums"]["author_type"] | null
          communication_mode:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          content: string
          created_at: string
          depth: number
          edited_at: string | null
          id: string
          parent_message_id: string | null
          search_vector: unknown
          thread_id: string
          type: Database["public"]["Enums"]["message_type"]
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_type?: Database["public"]["Enums"]["author_type"] | null
          communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          content: string
          created_at?: string
          depth?: number
          edited_at?: string | null
          id?: string
          parent_message_id?: string | null
          search_vector?: unknown
          thread_id: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_type?: Database["public"]["Enums"]["author_type"] | null
          communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          content?: string
          created_at?: string
          depth?: number
          edited_at?: string | null
          id?: string
          parent_message_id?: string | null
          search_vector?: unknown
          thread_id?: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_records: {
        Row: {
          action: string
          created_at: string
          id: string
          moderator_id: string | null
          new_status: string
          participant_id: string
          previous_status: string
          reason: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          moderator_id?: string | null
          new_status: string
          participant_id: string
          previous_status: string
          reason?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          moderator_id?: string | null
          new_status?: string
          participant_id?: string
          previous_status?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_records_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      moon_cycles: {
        Row: {
          created_at: string | null
          cycle_number: number
          full_moon_at: string
          id: string
          new_moon_at: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cycle_number: number
          full_moon_at: string
          id?: string
          new_moon_at: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cycle_number?: number
          full_moon_at?: string
          id?: string
          new_moon_at?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      multisig_safes: {
        Row: {
          chain_id: number | null
          created_at: string
          hub_id: string
          id: string
          purpose: string
          safe_address: string
          signers: string[]
          status: string
          threshold: number
        }
        Insert: {
          chain_id?: number | null
          created_at?: string
          hub_id: string
          id?: string
          purpose: string
          safe_address: string
          signers?: string[]
          status?: string
          threshold?: number
        }
        Update: {
          chain_id?: number | null
          created_at?: string
          hub_id?: string
          id?: string
          purpose?: string
          safe_address?: string
          signers?: string[]
          status?: string
          threshold?: number
        }
        Relationships: []
      }
      network_health_snapshots: {
        Row: {
          active_members_30d: number
          agent_contributions_7d: number
          agent_count: number
          avg_verification_rate: number
          chain_entries_30d: number
          cloud_circulating: number
          cloud_minted_30d: number
          contributions_7d: number
          health_score: number
          id: string
          snapshot_at: string
          total_contributions: number
        }
        Insert: {
          active_members_30d?: number
          agent_contributions_7d?: number
          agent_count?: number
          avg_verification_rate?: number
          chain_entries_30d?: number
          cloud_circulating?: number
          cloud_minted_30d?: number
          contributions_7d?: number
          health_score?: number
          id?: string
          snapshot_at?: string
          total_contributions?: number
        }
        Update: {
          active_members_30d?: number
          agent_contributions_7d?: number
          agent_count?: number
          avg_verification_rate?: number
          chain_entries_30d?: number
          cloud_circulating?: number
          cloud_minted_30d?: number
          contributions_7d?: number
          health_score?: number
          id?: string
          snapshot_at?: string
          total_contributions?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          body: string | null
          chain_entry_id: string | null
          chain_event_type: string | null
          convergence_id: string | null
          created_at: string | null
          id: string
          member_id: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          body?: string | null
          chain_entry_id?: string | null
          chain_event_type?: string | null
          convergence_id?: string | null
          created_at?: string | null
          id: string
          member_id: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          body?: string | null
          chain_entry_id?: string | null
          chain_event_type?: string | null
          convergence_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      participant_connections: {
        Row: {
          context: string | null
          convergence_id: string | null
          created_at: string
          id: string
          participant_a_id: string
          participant_b_id: string
          session_id: string | null
        }
        Insert: {
          context?: string | null
          convergence_id?: string | null
          created_at?: string
          id?: string
          participant_a_id: string
          participant_b_id: string
          session_id?: string | null
        }
        Update: {
          context?: string | null
          convergence_id?: string | null
          created_at?: string
          id?: string
          participant_a_id?: string
          participant_b_id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_connections_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_a_id_fkey"
            columns: ["participant_a_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_participant_b_id_fkey"
            columns: ["participant_b_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_connections_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          affiliation: string | null
          archetype: string | null
          auth_user_id: string | null
          background: string | null
          bio: string | null
          capabilities: string[] | null
          consent_recording: boolean | null
          craft_primary: string | null
          craft_secondary: string | null
          created_at: string
          dimensions_unlocked: Json | null
          email: string | null
          erc8004_agent_id: string | null
          experience: string[] | null
          github_username: string | null
          guild: string | null
          hub_id: string | null
          id: string
          interests: string[] | null
          is_agent: boolean
          last_seen_at: string | null
          location: string | null
          looking_for: string[] | null
          moderation_status: string
          name: string
          notification_prefs: Json | null
          offering: string[] | null
          parsed_fields: Json | null
          participant_type: string
          role: string | null
          skills: string[] | null
          status: string
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          affiliation?: string | null
          archetype?: string | null
          auth_user_id?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          consent_recording?: boolean | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string
          dimensions_unlocked?: Json | null
          email?: string | null
          erc8004_agent_id?: string | null
          experience?: string[] | null
          github_username?: string | null
          guild?: string | null
          hub_id?: string | null
          id?: string
          interests?: string[] | null
          is_agent?: boolean
          last_seen_at?: string | null
          location?: string | null
          looking_for?: string[] | null
          moderation_status?: string
          name: string
          notification_prefs?: Json | null
          offering?: string[] | null
          parsed_fields?: Json | null
          participant_type?: string
          role?: string | null
          skills?: string[] | null
          status?: string
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          affiliation?: string | null
          archetype?: string | null
          auth_user_id?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          consent_recording?: boolean | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string
          dimensions_unlocked?: Json | null
          email?: string | null
          erc8004_agent_id?: string | null
          experience?: string[] | null
          github_username?: string | null
          guild?: string | null
          hub_id?: string | null
          id?: string
          interests?: string[] | null
          is_agent?: boolean
          last_seen_at?: string | null
          location?: string | null
          looking_for?: string[] | null
          moderation_status?: string
          name?: string
          notification_prefs?: Json | null
          offering?: string[] | null
          parsed_fields?: Json | null
          participant_type?: string
          role?: string | null
          skills?: string[] | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
        ]
      }
      peer_greetings: {
        Row: {
          created_at: string
          from_participant_id: string
          id: string
          message: string
          read_at: string | null
          to_participant_id: string
        }
        Insert: {
          created_at?: string
          from_participant_id: string
          id?: string
          message: string
          read_at?: string | null
          to_participant_id: string
        }
        Update: {
          created_at?: string
          from_participant_id?: string
          id?: string
          message?: string
          read_at?: string | null
          to_participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_greetings_to_participant_id_fkey"
            columns: ["to_participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      peer_recognitions: {
        Row: {
          created_at: string
          from_participant_id: string
          id: string
          signal_type: string
          to_contribution_id: string
        }
        Insert: {
          created_at?: string
          from_participant_id: string
          id?: string
          signal_type?: string
          to_contribution_id: string
        }
        Update: {
          created_at?: string
          from_participant_id?: string
          id?: string
          signal_type?: string
          to_contribution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_from_participant_id_fkey"
            columns: ["from_participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_to_contribution_id_fkey"
            columns: ["to_contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_recognitions_to_contribution_id_fkey"
            columns: ["to_contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_activities: {
        Row: {
          actor_id: string | null
          aggregate_id: string
          aggregate_type: string
          batched_at: string | null
          batched_in: string | null
          convergence_id: string
          created_at: string | null
          event_type: string
          id: string
          nl_source: string | null
          pattern_layer: number | null
          payload: Json
          updated_at: string | null
          withdrawn: boolean | null
          withdrawn_at: string | null
        }
        Insert: {
          actor_id?: string | null
          aggregate_id?: string
          aggregate_type?: string
          batched_at?: string | null
          batched_in?: string | null
          convergence_id: string
          created_at?: string | null
          event_type: string
          id?: string
          nl_source?: string | null
          pattern_layer?: number | null
          payload?: Json
          updated_at?: string | null
          withdrawn?: boolean | null
          withdrawn_at?: string | null
        }
        Update: {
          actor_id?: string | null
          aggregate_id?: string
          aggregate_type?: string
          batched_at?: string | null
          batched_in?: string | null
          convergence_id?: string
          created_at?: string | null
          event_type?: string
          id?: string
          nl_source?: string | null
          pattern_layer?: number | null
          payload?: Json
          updated_at?: string | null
          withdrawn?: boolean | null
          withdrawn_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_activities_batched_in_fkey"
            columns: ["batched_in"]
            isOneToOne: false
            referencedRelation: "chain_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_activities_batched_in_fkey"
            columns: ["batched_in"]
            isOneToOne: false
            referencedRelation: "dashboard_activity_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_activities_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      portable_credentials: {
        Row: {
          claims: Json
          created_at: string
          credential_type: string
          did_uri: string | null
          ens_anchor: string | null
          expires_at: string | null
          id: string
          issued_at: string
          issuer_hub_id: string
          participant_id: string
          proof: Json | null
          revoked_at: string | null
          status: string
        }
        Insert: {
          claims?: Json
          created_at?: string
          credential_type: string
          did_uri?: string | null
          ens_anchor?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuer_hub_id: string
          participant_id: string
          proof?: Json | null
          revoked_at?: string | null
          status?: string
        }
        Update: {
          claims?: Json
          created_at?: string
          credential_type?: string
          did_uri?: string | null
          ens_anchor?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuer_hub_id?: string
          participant_id?: string
          proof?: Json | null
          revoked_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portable_credentials_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_communities: {
        Row: {
          channel_name: string
          craft: string
          created_at: string
          display_name: string
          forum_officer_id: string | null
          hub_id: string | null
          id: string
          member_count: number
        }
        Insert: {
          channel_name: string
          craft: string
          created_at?: string
          display_name: string
          forum_officer_id?: string | null
          hub_id?: string | null
          id?: string
          member_count?: number
        }
        Update: {
          channel_name?: string
          craft?: string
          created_at?: string
          display_name?: string
          forum_officer_id?: string | null
          hub_id?: string | null
          id?: string
          member_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_communities_forum_officer_id_fkey"
            columns: ["forum_officer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_votes: {
        Row: {
          created_at: string | null
          id: string
          proposal_id: string
          updated_at: string | null
          vote: string
          voter_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          proposal_id: string
          updated_at?: string | null
          vote: string
          voter_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          proposal_id?: string
          updated_at?: string | null
          vote?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          category: string
          created_at: string | null
          description: string
          hub_id: string | null
          id: string
          moon_cycle_id: string | null
          proposer_id: string
          result_summary: Json | null
          scope: string
          status: string
          title: string
          updated_at: string | null
          vote_deadline: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description: string
          hub_id?: string | null
          id?: string
          moon_cycle_id?: string | null
          proposer_id: string
          result_summary?: Json | null
          scope?: string
          status?: string
          title: string
          updated_at?: string | null
          vote_deadline?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          hub_id?: string | null
          id?: string
          moon_cycle_id?: string | null
          proposer_id?: string
          result_summary?: Json | null
          scope?: string
          status?: string
          title?: string
          updated_at?: string | null
          vote_deadline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_moon_cycle_id_fkey"
            columns: ["moon_cycle_id"]
            isOneToOne: false
            referencedRelation: "moon_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      protocol_events: {
        Row: {
          agent_id: string | null
          channel_id: string | null
          created_at: string
          event_type: string
          id: string
          payload: Json
          sprint_id: string | null
        }
        Insert: {
          agent_id?: string | null
          channel_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          payload?: Json
          sprint_id?: string | null
        }
        Update: {
          agent_id?: string | null
          channel_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          sprint_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "coordination_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_events_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "production_sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      qf_donations: {
        Row: {
          amount: number
          donated_at: string
          donor_id: string
          id: string
          project_id: string
          round_id: string
          tx_hash: string | null
        }
        Insert: {
          amount: number
          donated_at?: string
          donor_id: string
          id?: string
          project_id: string
          round_id: string
          tx_hash?: string | null
        }
        Update: {
          amount?: number
          donated_at?: string
          donor_id?: string
          id?: string
          project_id?: string
          round_id?: string
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qf_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qf_donations_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "qf_rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      qf_rounds: {
        Row: {
          allo_pool_id: string | null
          chain_id: number | null
          created_at: string
          end_date: string
          hub_id: string
          id: string
          matching_currency: string
          matching_pool: number
          start_date: string
          status: string
          title: string
        }
        Insert: {
          allo_pool_id?: string | null
          chain_id?: number | null
          created_at?: string
          end_date: string
          hub_id: string
          id?: string
          matching_currency?: string
          matching_pool: number
          start_date: string
          status?: string
          title: string
        }
        Update: {
          allo_pool_id?: string | null
          chain_id?: number | null
          created_at?: string
          end_date?: string
          hub_id?: string
          id?: string
          matching_currency?: string
          matching_pool?: number
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      rate_limit_buckets: {
        Row: {
          created_at: string
          key: string
          last_refill: string
          tokens: number
        }
        Insert: {
          created_at?: string
          key: string
          last_refill?: string
          tokens: number
        }
        Update: {
          created_at?: string
          key?: string
          last_refill?: string
          tokens?: number
        }
        Relationships: []
      }
      rate_limit_events: {
        Row: {
          bucket_key: string
          client_ip: string | null
          created_at: string
          function_name: string
          id: string
        }
        Insert: {
          bucket_key: string
          client_ip?: string | null
          created_at?: string
          function_name: string
          id?: string
        }
        Update: {
          bucket_key?: string
          client_ip?: string | null
          created_at?: string
          function_name?: string
          id?: string
        }
        Relationships: []
      }
      recovery_periods: {
        Row: {
          approved_by: string | null
          created_at: string
          end_date: string
          id: string
          participant_id: string
          reason: string | null
          start_date: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          end_date: string
          id?: string
          participant_id: string
          reason?: string | null
          start_date: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          end_date?: string
          id?: string
          participant_id?: string
          reason?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recovery_periods_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      sensing_agents: {
        Row: {
          authority_level: string
          created_at: string
          erc8004_agent_id: string | null
          hub_id: string | null
          id: string
          monitored_metrics: string[]
          participant_id: string
          status: string
        }
        Insert: {
          authority_level?: string
          created_at?: string
          erc8004_agent_id?: string | null
          hub_id?: string | null
          id?: string
          monitored_metrics?: string[]
          participant_id: string
          status?: string
        }
        Update: {
          authority_level?: string
          created_at?: string
          erc8004_agent_id?: string | null
          hub_id?: string | null
          id?: string
          monitored_metrics?: string[]
          participant_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensing_agents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          participant_id: string
          role: string | null
          session_id: string
        }
        Insert: {
          participant_id: string
          role?: string | null
          session_id: string
        }
        Update: {
          participant_id?: string
          role?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          chatham_house: boolean | null
          convergence_id: string
          created_at: string
          description: string | null
          id: string
          location: string | null
          recording_url: string | null
          session_type: string | null
          speakers: string[] | null
          tags: string[] | null
          time_end: string | null
          time_start: string | null
          title: string
          track: string | null
          transcript_url: string | null
          updated_at: string | null
        }
        Insert: {
          chatham_house?: boolean | null
          convergence_id: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          recording_url?: string | null
          session_type?: string | null
          speakers?: string[] | null
          tags?: string[] | null
          time_end?: string | null
          time_start?: string | null
          title: string
          track?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Update: {
          chatham_house?: boolean | null
          convergence_id?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          recording_url?: string | null
          session_type?: string | null
          speakers?: string[] | null
          tags?: string[] | null
          time_end?: string | null
          time_start?: string | null
          title?: string
          track?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      sovereign_partner_agreements: {
        Row: {
          care_tier: string
          covenant_id: string
          data_categories: string[]
          governance_framework: string | null
          id: string
          jurisdiction: string
          legal_contact: string | null
          partner_name: string
          ratified_at: string | null
          status: string
        }
        Insert: {
          care_tier?: string
          covenant_id: string
          data_categories?: string[]
          governance_framework?: string | null
          id?: string
          jurisdiction: string
          legal_contact?: string | null
          partner_name: string
          ratified_at?: string | null
          status?: string
        }
        Update: {
          care_tier?: string
          covenant_id?: string
          data_categories?: string[]
          governance_framework?: string | null
          id?: string
          jurisdiction?: string
          legal_contact?: string | null
          partner_name?: string
          ratified_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sovereign_partner_agreements_covenant_id_fkey"
            columns: ["covenant_id"]
            isOneToOne: true
            referencedRelation: "bridge_covenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sprint_messages: {
        Row: {
          id: string
          label: string | null
          linked_at: string | null
          linked_by: string | null
          message_id: string
          sprint_id: string
        }
        Insert: {
          id?: string
          label?: string | null
          linked_at?: string | null
          linked_by?: string | null
          message_id: string
          sprint_id: string
        }
        Update: {
          id?: string
          label?: string | null
          linked_at?: string | null
          linked_by?: string | null
          message_id?: string
          sprint_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_linked_by_fkey"
            columns: ["linked_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "guild_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "coordination_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_messages_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "production_sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      sprint_token_reports: {
        Row: {
          agent_id: string
          cache_read_tokens: number
          cache_write_tokens: number
          created_at: string | null
          id: string
          input_tokens: number
          is_isolated_session: boolean | null
          model: string | null
          notes: string | null
          output_tokens: number
          phase: string
          session_key: string | null
          sprint_id: string
        }
        Insert: {
          agent_id: string
          cache_read_tokens?: number
          cache_write_tokens?: number
          created_at?: string | null
          id?: string
          input_tokens?: number
          is_isolated_session?: boolean | null
          model?: string | null
          notes?: string | null
          output_tokens?: number
          phase: string
          session_key?: string | null
          sprint_id: string
        }
        Update: {
          agent_id?: string
          cache_read_tokens?: number
          cache_write_tokens?: number
          created_at?: string | null
          id?: string
          input_tokens?: number
          is_isolated_session?: boolean | null
          model?: string | null
          notes?: string | null
          output_tokens?: number
          phase?: string
          session_key?: string | null
          sprint_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "coordination_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_token_reports_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "production_sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      standards_publications: {
        Row: {
          approval_votes: number
          craft_standard_id: string
          created_at: string
          id: string
          publication_level: string
          published_at: string | null
          published_by: string | null
          required_votes: number
          status: string
        }
        Insert: {
          approval_votes?: number
          craft_standard_id: string
          created_at?: string
          id?: string
          publication_level: string
          published_at?: string | null
          published_by?: string | null
          required_votes?: number
          status?: string
        }
        Update: {
          approval_votes?: number
          craft_standard_id?: string
          created_at?: string
          id?: string
          publication_level?: string
          published_at?: string | null
          published_by?: string | null
          required_votes?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "standards_publications_craft_standard_id_fkey"
            columns: ["craft_standard_id"]
            isOneToOne: false
            referencedRelation: "craft_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standards_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      standing_gates: {
        Row: {
          active: boolean
          category: string
          description: string | null
          feature_id: string
          id: string
          required_tier: string
        }
        Insert: {
          active?: boolean
          category: string
          description?: string | null
          feature_id: string
          id?: string
          required_tier: string
        }
        Update: {
          active?: boolean
          category?: string
          description?: string | null
          feature_id?: string
          id?: string
          required_tier?: string
        }
        Relationships: []
      }
      stewardship_streams: {
        Row: {
          chain_id: number | null
          ended_at: string | null
          flow_rate_per_month: number
          hub_id: string
          id: string
          purpose: string | null
          receiver_id: string
          sender_address: string
          started_at: string
          status: string
          superfluid_stream_id: string | null
          token: string
        }
        Insert: {
          chain_id?: number | null
          ended_at?: string | null
          flow_rate_per_month: number
          hub_id: string
          id?: string
          purpose?: string | null
          receiver_id: string
          sender_address: string
          started_at?: string
          status?: string
          superfluid_stream_id?: string | null
          token?: string
        }
        Update: {
          chain_id?: number | null
          ended_at?: string | null
          flow_rate_per_month?: number
          hub_id?: string
          id?: string
          purpose?: string | null
          receiver_id?: string
          sender_address?: string
          started_at?: string
          status?: string
          superfluid_stream_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stewardship_streams_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee_id: string | null
          contribution_ref: string | null
          created_at: string
          creator_id: string
          description: string | null
          due_date: string | null
          id: string
          sprint_ref: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          contribution_ref?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          due_date?: string | null
          id?: string
          sprint_ref?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          contribution_ref?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          due_date?: string | null
          id?: string
          sprint_ref?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      tents: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      thread_tags: {
        Row: {
          created_at: string
          id: string
          tag_type: string
          tag_value: string
          thread_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_type?: string
          tag_value: string
          thread_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_type?: string
          tag_value?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "thread_tags_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          archived_at: string | null
          channel_id: string
          consolidated_at: string | null
          created_at: string
          created_by: string | null
          id: string
          resolved_at: string | null
          status: Database["public"]["Enums"]["thread_status"]
          title: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          channel_id: string
          consolidated_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["thread_status"]
          title: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          channel_id?: string
          consolidated_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["thread_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "threads_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channel_stats"
            referencedColumns: ["channel_id"]
          },
          {
            foreignKeyName: "threads_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_artifacts: {
        Row: {
          body: string | null
          created_at: string | null
          created_by: string | null
          created_by_agent: string | null
          deleted_at: string | null
          id: string | null
          origin_convergence_id: string | null
          origin_session_id: string | null
          search_vector: unknown
          state: Database["public"]["Enums"]["artifact_state"] | null
          steward_id: string | null
          summary: string | null
          title: string | null
          type: Database["public"]["Enums"]["artifact_type"] | null
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          created_by?: string | null
          created_by_agent?: string | null
          deleted_at?: string | null
          id?: string | null
          origin_convergence_id?: string | null
          origin_session_id?: string | null
          search_vector?: unknown
          state?: Database["public"]["Enums"]["artifact_state"] | null
          steward_id?: string | null
          summary?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["artifact_type"] | null
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          created_by?: string | null
          created_by_agent?: string | null
          deleted_at?: string | null
          id?: string | null
          origin_convergence_id?: string | null
          origin_session_id?: string | null
          search_vector?: unknown
          state?: Database["public"]["Enums"]["artifact_state"] | null
          steward_id?: string | null
          summary?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["artifact_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_created_by_agent_fkey"
            columns: ["created_by_agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_convergence_id_fkey"
            columns: ["origin_convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      active_members: {
        Row: {
          id: string | null
          last_seen_at: string | null
          name: string | null
          presence: string | null
          skills: string[] | null
        }
        Insert: {
          id?: string | null
          last_seen_at?: string | null
          name?: string | null
          presence?: never
          skills?: string[] | null
        }
        Update: {
          id?: string | null
          last_seen_at?: string | null
          name?: string | null
          presence?: never
          skills?: string[] | null
        }
        Relationships: []
      }
      agent_analytics: {
        Row: {
          active_consents: number | null
          agent_id: string | null
          cloud_earned: number | null
          computed_at: string | null
          contributions_7d: number | null
          erc8004_agent_id: string | null
          moderation_actions: number | null
          moderation_status: string | null
          name: string | null
          total_contributions: number | null
          verified_contributions: number | null
        }
        Relationships: []
      }
      agent_economic_leaderboard: {
        Row: {
          active_consents: number | null
          agent_id: string | null
          agent_name: string | null
          computed_at: string | null
          contributions_30d: number | null
          contributions_7d: number | null
          craft_primary: string | null
          earnings_30d: number | null
          earnings_7d: number | null
          economic_score: number | null
          erc8004_token_id: string | null
          moderation_status: string | null
          overrides_received: number | null
          total_contributions: number | null
          total_earned: number | null
          verification_rate_pct: number | null
          verified_contributions: number | null
          weekly_velocity: number | null
        }
        Relationships: []
      }
      agent_track_record: {
        Row: {
          agent_id: string | null
          approved_actions: number | null
          name: string | null
          overridden_actions: number | null
          override_rate_pct: number | null
          tier: string | null
          total_actions: number | null
          total_volume_approved: number | null
        }
        Relationships: []
      }
      artifact_clusters: {
        Row: {
          artifact_id: string | null
          cluster_id: string | null
        }
        Relationships: []
      }
      artifact_graph: {
        Row: {
          body: string | null
          connection_count: number | null
          created_at: string | null
          created_by: string | null
          created_by_agent: string | null
          id: string | null
          origin_convergence_id: string | null
          origin_session_id: string | null
          participant_count: number | null
          search_vector: unknown
          state: Database["public"]["Enums"]["artifact_state"] | null
          steward_id: string | null
          summary: string | null
          tag_names: string[] | null
          tent_names: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["artifact_type"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_created_by_agent_fkey"
            columns: ["created_by_agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_convergence_id_fkey"
            columns: ["origin_convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_steward_id_fkey"
            columns: ["steward_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      capacity_utilization: {
        Row: {
          available_hours: number | null
          committed_hours: number | null
          name: string | null
          participant_id: string | null
          period_end: string | null
          period_start: string | null
          recovery_reserved: number | null
          total_hours: number | null
          utilization_pct: number | null
        }
        Relationships: []
      }
      channel_stats: {
        Row: {
          channel_id: string | null
          convergence_id: string | null
          last_activity: string | null
          message_count: number | null
          name: string | null
          thread_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      chatham_house_artifacts: {
        Row: {
          body: string | null
          created_at: string | null
          created_by: string | null
          created_by_agent: string | null
          id: string | null
          is_agent_content: boolean | null
          origin_convergence_id: string | null
          origin_session_id: string | null
          search_vector: unknown
          state: Database["public"]["Enums"]["artifact_state"] | null
          steward_id: string | null
          summary: string | null
          title: string | null
          type: Database["public"]["Enums"]["artifact_type"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_created_by_agent_fkey"
            columns: ["created_by_agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_convergence_id_fkey"
            columns: ["origin_convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "session_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_origin_session_id_fkey"
            columns: ["origin_session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      cloud_balance_view: {
        Row: {
          balance: number | null
          participant_id: string | null
          updated_at: string | null
        }
        Insert: {
          balance?: never
          participant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          balance?: never
          participant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cloud_balances_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      cloud_flow_by_month: {
        Row: {
          minted: number | null
          month: string | null
          spent: number | null
        }
        Relationships: []
      }
      contribution_feed: {
        Row: {
          artifact_count: number | null
          commitment_count: number | null
          content: string | null
          convergence_id: string | null
          convergence_name: string | null
          created_at: string | null
          edge_count: number | null
          errors: Json | null
          id: string | null
          parent_contribution_id: string | null
          participant_id: string | null
          participant_name: string | null
          preview: string | null
          processed_at: string | null
          relationship_count: number | null
          reply_count: number | null
          status: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributions_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_parent_contribution_id_fkey"
            columns: ["parent_contribution_id"]
            isOneToOne: false
            referencedRelation: "contribution_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_parent_contribution_id_fkey"
            columns: ["parent_contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      contributions_by_month: {
        Row: {
          month: string | null
          pending: number | null
          processed: number | null
          total: number | null
        }
        Relationships: []
      }
      cooperative_analytics: {
        Row: {
          active_consents: number | null
          active_engagements: number | null
          cloud_circulating: number | null
          cloud_earned_by_agents: number | null
          computed_at: string | null
          contributions_30d: number | null
          contributions_7d: number | null
          total_agents: number | null
          total_attestations: number | null
          total_contributions: number | null
          total_members: number | null
        }
        Relationships: []
      }
      cooperative_stats: {
        Row: {
          active_this_moon: number | null
          cloud_circulating: number | null
          cloud_minted: number | null
          participation_rate: number | null
          total_contributions: number | null
          total_members: number | null
        }
        Relationships: []
      }
      coordination_analytics: {
        Row: {
          agent_attestations: number | null
          agent_messages_24h: number | null
          agent_messages_total: number | null
          agents_granting_consent: number | null
          computed_at: string | null
          sprints_completed: number | null
          sprints_pending: number | null
        }
        Relationships: []
      }
      coordination_hotspots: {
        Row: {
          artifact_id: string | null
          interest_count: number | null
          interested_participants: string[] | null
          rea_role: string | null
          summary: string | null
          title: string | null
          type: Database["public"]["Enums"]["artifact_type"] | null
        }
        Relationships: []
      }
      coordination_matches: {
        Row: {
          artifact_id: string | null
          participant_a: string | null
          participant_b: string | null
          shared_interest: string | null
        }
        Relationships: []
      }
      coordination_signal_summary: {
        Row: {
          artifact_id: string | null
          first_signal_at: string | null
          last_signal_at: string | null
          signal_count: number | null
          unique_participants: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "active_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifact_graph"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "chatham_house_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_hotspots"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "coordination_matches"
            referencedColumns: ["artifact_id"]
          },
          {
            foreignKeyName: "coordination_interests_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "graph_data"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_activity_feed: {
        Row: {
          actor_id: string | null
          actor_name: string | null
          created_at: string | null
          event_type: string | null
          id: string | null
          payload: Json | null
        }
        Relationships: []
      }
      dimension_distribution: {
        Row: {
          dimension: string | null
          total: number | null
        }
        Relationships: []
      }
      extraction_health_metrics: {
        Row: {
          avg_processing_seconds: number | null
          contributions_last_24h: number | null
          contributions_last_hour: number | null
          failed: number | null
          failed_24h: number | null
          failure_rate_pct: number | null
          last_processed_at: string | null
          pending: number | null
          processing: number | null
          success_rate_24h_pct: number | null
          success_rate_pct: number | null
          successful: number | null
          successful_24h: number | null
        }
        Relationships: []
      }
      graph_data: {
        Row: {
          agent_type: string | null
          connection_count: number | null
          created_at: string | null
          dimensions: Json | null
          event_temporality: string | null
          id: string | null
          origin_convergence_id: string | null
          participants: Json | null
          rea_role: string | null
          state: Database["public"]["Enums"]["artifact_state"] | null
          title: string | null
          type: Database["public"]["Enums"]["artifact_type"] | null
        }
        Insert: {
          agent_type?: string | null
          connection_count?: never
          created_at?: string | null
          dimensions?: never
          event_temporality?: string | null
          id?: string | null
          origin_convergence_id?: string | null
          participants?: never
          rea_role?: string | null
          state?: Database["public"]["Enums"]["artifact_state"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["artifact_type"] | null
        }
        Update: {
          agent_type?: string | null
          connection_count?: never
          created_at?: string | null
          dimensions?: never
          event_temporality?: string | null
          id?: string | null
          origin_convergence_id?: string | null
          participants?: never
          rea_role?: string | null
          state?: Database["public"]["Enums"]["artifact_state"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["artifact_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_origin_convergence_id_fkey"
            columns: ["origin_convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      member_expertise_summary: {
        Row: {
          contribution_count: number | null
          domain_id: string | null
          last_contribution_at: string | null
          level: number | null
          name: string | null
          participant_id: string | null
          unlocked_at: string | null
          xp: number | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_expertise_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_growth_by_week: {
        Row: {
          new_members: number | null
          week_start: string | null
        }
        Relationships: []
      }
      participant_activity: {
        Row: {
          affiliation: string | null
          artifacts_authored: number | null
          artifacts_stewarding: number | null
          auth_user_id: string | null
          bio: string | null
          completed_commitments: number | null
          connections_made: number | null
          consent_recording: boolean | null
          created_at: string | null
          email: string | null
          id: string | null
          interests: string[] | null
          name: string | null
          notification_prefs: Json | null
          open_commitments: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      participation_analytics: {
        Row: {
          active_engagements: number | null
          cloud_balance: number | null
          contributions_30d: number | null
          contributions_7d: number | null
          craft_primary: string | null
          name: string | null
          non_common_contributions: number | null
          participant_id: string | null
          participant_type: string | null
          total_contributions: number | null
          weekly_velocity: number | null
        }
        Relationships: []
      }
      production_participants: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"] | null
          affiliation: string | null
          archetype: string | null
          auth_user_id: string | null
          background: string | null
          bio: string | null
          capabilities: string[] | null
          consent_recording: boolean | null
          craft_primary: string | null
          craft_secondary: string | null
          created_at: string | null
          dimensions_unlocked: Json | null
          email: string | null
          erc8004_agent_id: string | null
          experience: string[] | null
          github_username: string | null
          guild: string | null
          hub_id: string | null
          id: string | null
          interests: string[] | null
          is_agent: boolean | null
          last_seen_at: string | null
          location: string | null
          looking_for: string[] | null
          moderation_status: string | null
          name: string | null
          notification_prefs: Json | null
          offering: string[] | null
          parsed_fields: Json | null
          participant_type: string | null
          role: string | null
          skills: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"] | null
          affiliation?: string | null
          archetype?: string | null
          auth_user_id?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          consent_recording?: boolean | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string | null
          dimensions_unlocked?: Json | null
          email?: string | null
          erc8004_agent_id?: string | null
          experience?: string[] | null
          github_username?: string | null
          guild?: string | null
          hub_id?: string | null
          id?: string | null
          interests?: string[] | null
          is_agent?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          looking_for?: string[] | null
          moderation_status?: string | null
          name?: string | null
          notification_prefs?: Json | null
          offering?: string[] | null
          parsed_fields?: Json | null
          participant_type?: string | null
          role?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"] | null
          affiliation?: string | null
          archetype?: string | null
          auth_user_id?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          consent_recording?: boolean | null
          craft_primary?: string | null
          craft_secondary?: string | null
          created_at?: string | null
          dimensions_unlocked?: Json | null
          email?: string | null
          erc8004_agent_id?: string | null
          experience?: string[] | null
          github_username?: string | null
          guild?: string | null
          hub_id?: string | null
          id?: string | null
          interests?: string[] | null
          is_agent?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          looking_for?: string[] | null
          moderation_status?: string | null
          name?: string | null
          notification_prefs?: Json | null
          offering?: string[] | null
          parsed_fields?: Json | null
          participant_type?: string | null
          role?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
        ]
      }
      production_sprints: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          capability_requirements: Json | null
          channel_id: string | null
          claimed_at: string | null
          claimed_by: string | null
          completed_at: string | null
          completion_proof: string | null
          complexity: string | null
          context_refs: Json | null
          created_at: string | null
          description: string | null
          id: string | null
          injected_context: Json | null
          layers: string[] | null
          negotiation_log: Json | null
          paused_at: string | null
          paused_by: string | null
          prev_status: string | null
          progress_log: Json | null
          proposed_roles: Json | null
          proposer_id: string | null
          reference_urls: string[] | null
          result_summary: string | null
          roadmap_id: string | null
          roadmap_phase: string | null
          sprint_id: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          visibility_tier:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          capability_requirements?: Json | null
          channel_id?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          completed_at?: string | null
          completion_proof?: string | null
          complexity?: string | null
          context_refs?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          injected_context?: Json | null
          layers?: string[] | null
          negotiation_log?: Json | null
          paused_at?: string | null
          paused_by?: string | null
          prev_status?: string | null
          progress_log?: Json | null
          proposed_roles?: Json | null
          proposer_id?: string | null
          reference_urls?: string[] | null
          result_summary?: string | null
          roadmap_id?: string | null
          roadmap_phase?: string | null
          sprint_id?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          visibility_tier?:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type?: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          capability_requirements?: Json | null
          channel_id?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          completed_at?: string | null
          completion_proof?: string | null
          complexity?: string | null
          context_refs?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          injected_context?: Json | null
          layers?: string[] | null
          negotiation_log?: Json | null
          paused_at?: string | null
          paused_by?: string | null
          prev_status?: string | null
          progress_log?: Json | null
          proposed_roles?: Json | null
          proposer_id?: string | null
          reference_urls?: string[] | null
          result_summary?: string | null
          roadmap_id?: string | null
          roadmap_phase?: string | null
          sprint_id?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          visibility_tier?:
            | Database["public"]["Enums"]["sprint_visibility_tier"]
            | null
          work_type?: Database["public"]["Enums"]["sprint_work_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "guild_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_paused_by_fkey"
            columns: ["paused_by"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "active_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_analytics"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_economic_leaderboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "agent_track_record"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "capacity_utilization"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participant_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "participation_analytics"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "production_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coordination_requests_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "public_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      public_participants: {
        Row: {
          affiliation: string | null
          background: string | null
          bio: string | null
          capabilities: string[] | null
          created_at: string | null
          experience: string[] | null
          id: string | null
          interests: string[] | null
          location: string | null
          looking_for: string[] | null
          name: string | null
          offering: string[] | null
          role: string | null
          skills: string[] | null
        }
        Insert: {
          affiliation?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          created_at?: string | null
          experience?: string[] | null
          id?: string | null
          interests?: string[] | null
          location?: string | null
          looking_for?: string[] | null
          name?: string | null
          offering?: string[] | null
          role?: string | null
          skills?: string[] | null
        }
        Update: {
          affiliation?: string | null
          background?: string | null
          bio?: string | null
          capabilities?: string[] | null
          created_at?: string | null
          experience?: string[] | null
          id?: string | null
          interests?: string[] | null
          location?: string | null
          looking_for?: string[] | null
          name?: string | null
          offering?: string[] | null
          role?: string | null
          skills?: string[] | null
        }
        Relationships: []
      }
      recent_events: {
        Row: {
          actor_id: string | null
          actor_name: string | null
          actor_type: string | null
          convergence_id: string | null
          created_at: string | null
          data: Json | null
          entity_id: string | null
          entity_name: string | null
          entity_type: string | null
          id: string | null
          type: Database["public"]["Enums"]["event_type"] | null
        }
        Insert: {
          actor_id?: string | null
          actor_name?: never
          actor_type?: string | null
          convergence_id?: string | null
          created_at?: string | null
          data?: Json | null
          entity_id?: string | null
          entity_name?: never
          entity_type?: string | null
          id?: string | null
          type?: Database["public"]["Enums"]["event_type"] | null
        }
        Update: {
          actor_id?: string | null
          actor_name?: never
          actor_type?: string | null
          convergence_id?: string | null
          created_at?: string | null
          data?: Json | null
          entity_id?: string | null
          entity_name?: never
          entity_type?: string | null
          id?: string | null
          type?: Database["public"]["Enums"]["event_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "events_convergence_id_fkey"
            columns: ["convergence_id"]
            isOneToOne: false
            referencedRelation: "convergences"
            referencedColumns: ["id"]
          },
        ]
      }
      session_stats: {
        Row: {
          artifact_count: number | null
          contribution_count: number | null
          end_time: string | null
          id: string | null
          participant_count: number | null
          session_type: string | null
          speakers: string[] | null
          start_time: string | null
          title: string | null
          track: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      append_chain_entry: {
        Args: {
          p_actor_id?: string
          p_aggregate_id: string
          p_aggregate_type: string
          p_causation_id?: string
          p_content_hash: string
          p_convergence_id: string
          p_correlation_id?: string
          p_event_type: string
          p_nl_source?: string
          p_pattern_layer: number
          p_payload: Json
        }
        Returns: Json
      }
      approve_hub_application: {
        Args: { app_id: string; hub_slug: string; meridian?: number }
        Returns: string
      }
      avg_extraction_time_ms: { Args: never; Returns: number }
      award_domain_xp: {
        Args: {
          p_chain_entry_id?: string
          p_domain_id: string
          p_participant_id: string
          p_reason?: string
          p_xp?: number
        }
        Returns: undefined
      }
      burn_cloud: {
        Args: { p_amount: number; p_from_id: string; p_reason?: string }
        Returns: undefined
      }
      chain_head: {
        Args: never
        Returns: {
          chain_intact: boolean
          head_hash: string
          head_seq: number
          last_contribution_at: string
          total_artifacts: number
          total_contributions: number
        }[]
      }
      check_rate_limit: {
        Args: { p_capacity: number; p_key: string; p_window_seconds: number }
        Returns: {
          allowed: boolean
          remaining: number
          retry_after_seconds: number
        }[]
      }
      claim_education_path_reward: {
        Args: { p_path_id: string }
        Returns: Json
      }
      cleanup_simulation: { Args: { p_scenario_id: string }; Returns: Json }
      cleanup_stale_agents: { Args: never; Returns: undefined }
      close_moon_cycle: { Args: { p_cycle_id?: string }; Returns: undefined }
      close_voting_proposals: { Args: never; Returns: Json }
      compute_merkle_root: { Args: { hashes: string[] }; Returns: string }
      compute_rarity: {
        Args: {
          p_committee_endorsed: boolean
          p_inbound_references: number
          p_recognition_count: number
        }
        Returns: string
      }
      consolidate_thread: { Args: { p_thread_id: string }; Returns: string }
      consolidate_threads: { Args: { p_thread_ids: string[] }; Returns: string }
      convert_message_to_contribution: {
        Args: { p_message_id: string }
        Returns: string
      }
      create_api_key: {
        Args: {
          p_environment?: string
          p_name?: string
          p_participant_id: string
          p_rate_limit?: number
          p_scopes?: string[]
        }
        Returns: {
          api_key: string
          created_at: string
          key_prefix: string
        }[]
      }
      create_artifact: {
        Args: {
          p_convergence_id: string
          p_created_by?: string
          p_created_by_agent?: string
          p_dimensions?: Json
          p_session_id?: string
          p_steward_id?: string
          p_summary: string
          p_tags?: string[]
          p_title: string
          p_type: Database["public"]["Enums"]["artifact_type"]
        }
        Returns: string
      }
      create_convergence_from_template: {
        Args: {
          p_end_date: string
          p_location?: string
          p_name: string
          p_slug: string
          p_start_date: string
          p_template_id: string
        }
        Returns: string
      }
      credit_agent_contribution_earning: {
        Args: { p_contribution_id: string }
        Returns: string
      }
      current_participant_id: { Args: never; Returns: string }
      evolve_artifact: {
        Args: {
          p_actor_id: string
          p_actor_type?: string
          p_artifact_id: string
          p_new_state: Database["public"]["Enums"]["artifact_state"]
          p_notes?: string
        }
        Returns: undefined
      }
      export_convergence_jsonld: {
        Args: { p_convergence_id?: string }
        Returns: Json
      }
      get_active_convergence: {
        Args: never
        Returns: {
          description: string
          dimensions: Json
          id: string
          logo_accent: string
          logo_text: string
          name: string
          opens_at: string
          steward_ids: string[]
          tagline: string
          theme_bg: string
          theme_border: string
          theme_primary: string
          theme_surface: string
        }[]
      }
      get_cloud_balance: { Args: { p_participant_id: string }; Returns: number }
      get_contribution_thread: {
        Args: { p_contribution_id: string }
        Returns: {
          content: string
          created_at: string
          depth: number
          id: string
          participant_id: string
          participant_name: string
          status: string
        }[]
      }
      get_coordination_graph: {
        Args: { p_convergence_id: string }
        Returns: Json
      }
      get_graph_clusters: { Args: { p_convergence_id: string }; Returns: Json }
      get_graph_data: { Args: { p_convergence_id: string }; Returns: Json }
      get_graph_timeline: { Args: { p_convergence_id: string }; Returns: Json }
      get_hub_config: { Args: { hub_slug: string }; Returns: Json }
      get_participant_overlaps: {
        Args: { p_participant_id: string }
        Returns: {
          other_participant_id: string
          shared_artifact_ids: string[]
          shared_signal_count: number
        }[]
      }
      get_recent_artifacts: {
        Args: { p_convergence_id: string; p_hours?: number }
        Returns: {
          created_at: string
          id: string
          summary: string
          tags: string[]
          title: string
          type: Database["public"]["Enums"]["artifact_type"]
        }[]
      }
      get_recent_extraction_errors: {
        Args: { limit_count?: number }
        Returns: {
          content_preview: string
          contribution_id: string
          created_at: string
          errors: Json
        }[]
      }
      get_session_detail: { Args: { p_session_id: string }; Returns: Json }
      get_tag_signal_density: {
        Args: never
        Returns: {
          artifact_count: number
          density_ratio: number
          tag_name: string
          total_signals: number
          unique_signalers: number
        }[]
      }
      get_thread_count: { Args: { p_contribution_id: string }; Returns: number }
      get_weighted_dimension_distribution: {
        Args: { p_convergence_id?: string }
        Returns: {
          artifact_count: number
          avg_weight: number
          dimension_key: string
          total_weight: number
        }[]
      }
      grant_cloud: {
        Args: { p_amount: number; p_reason?: string; p_to_id: string }
        Returns: undefined
      }
      graph_at_seq: {
        Args: { p_seq: number }
        Returns: {
          artifact_rea_role: string
          artifact_summary: string
          artifact_title: string
          artifact_type: string
          contribution_chain_hash: string
          contribution_seq: number
        }[]
      }
      ingest_extraction: {
        Args: {
          p_actor_id?: string
          p_actor_type?: string
          p_convergence_id: string
          p_extraction?: Json
          p_session_title?: string
        }
        Returns: Json
      }
      is_simulation_participant: { Args: { p_id: string }; Returns: boolean }
      is_simulation_sprint: { Args: { p_id: string }; Returns: boolean }
      link_artifacts: {
        Args: {
          p_actor_id: string
          p_actor_type?: string
          p_description?: string
          p_from_id: string
          p_to_id: string
          p_type: Database["public"]["Enums"]["relationship_type"]
        }
        Returns: string
      }
      merge_artifacts: {
        Args: {
          p_merged_summary?: string
          p_merged_title?: string
          p_source_artifact_id: string
          p_target_artifact_id: string
        }
        Returns: Json
      }
      rarity_cloud_mint: { Args: { p_rarity: string }; Returns: number }
      rarity_rank: { Args: { tier: string }; Returns: number }
      recompute_rarity: {
        Args: { p_contribution_id: string }
        Returns: undefined
      }
      record_commitment: {
        Args: {
          p_artifact_id: string
          p_description: string
          p_due_date?: string
          p_participant_id: string
        }
        Returns: string
      }
      replay_chain: {
        Args: { p_from_seq?: number; p_to_seq?: number }
        Returns: {
          artifact_count: number
          artifacts: Json
          chain_hash: string
          content: string
          contribution_id: string
          created_at: string
          parent_hash: string
          processed_at: string
          seq: number
          status: string
        }[]
      }
      revoke_api_key: { Args: { p_key_prefix: string }; Returns: boolean }
      seal_activity_batch: {
        Args: {
          p_batch_type: string
          p_convergence_id: string
          p_opened_at: string
        }
        Returns: string
      }
      search_artifacts: {
        Args: {
          p_convergence_id?: string
          p_limit?: number
          p_query: string
          p_type?: Database["public"]["Enums"]["artifact_type"]
        }
        Returns: {
          id: string
          rank: number
          state: Database["public"]["Enums"]["artifact_state"]
          summary: string
          title: string
          type: Database["public"]["Enums"]["artifact_type"]
        }[]
      }
      search_content: {
        Args: { query_text: string }
        Returns: {
          created_at: string
          id: string
          rank: number
          result_type: string
          snippet: string
          title: string
        }[]
      }
      start_moon_cycle: {
        Args: {
          p_cycle_number: number
          p_full_moon_at: string
          p_new_moon_at: string
          p_next_new_moon_at: string
        }
        Returns: string
      }
      submit_observation: {
        Args: {
          p_actor_id: string
          p_actor_type: string
          p_convergence_id?: string
          p_data: Json
          p_entity_id: string
          p_entity_type: string
        }
        Returns: string
      }
      tally_proposal: { Args: { p_proposal_id: string }; Returns: Json }
      transfer_cloud:
        | {
            Args: {
              p_amount: number
              p_from: string
              p_reason: string
              p_to: string
            }
            Returns: string
          }
        | {
            Args: {
              p_amount: number
              p_from_id: string
              p_reason?: string
              p_to_id: string
            }
            Returns: string
          }
      validate_api_key: {
        Args: { p_key_hash: string }
        Returns: {
          account_type: Database["public"]["Enums"]["account_type"]
          participant_id: string
          remaining_requests: number
          reset_at: string
          valid: boolean
        }[]
      }
      verify_merkle_chain: {
        Args: never
        Returns: {
          broken_at_seq: number
          chain_intact: boolean
          genesis_hash: string
          head_hash: string
          head_seq: number
          total_links: number
          valid_links: number
        }[]
      }
      word_frequencies: {
        Args: { p_participant_id?: string }
        Returns: {
          contributors: number
          count: number
          word: string
        }[]
      }
    }
    Enums: {
      account_type: "human" | "agent"
      agent_type: "personal" | "collective" | "service"
      artifact_session_role: "discussed_in" | "emerged_from" | "presented_in"
      artifact_state:
        | "seed"
        | "discussed"
        | "proposed"
        | "committed"
        | "active"
        | "completed"
        | "archived"
        | "superseded"
        | "merged"
      artifact_type:
        | "idea"
        | "proposal"
        | "commitment"
        | "pattern"
        | "synthesis"
        | "question"
        | "reflection"
      attendance_state:
        | "registered"
        | "attending"
        | "contributing"
        | "stewarding"
      author_type: "human" | "agent"
      channel_type: "general" | "dimension" | "session" | "topic" | "meta"
      channel_visibility: "public" | "members"
      commitment_status: "made" | "in_progress" | "completed" | "abandoned"
      communication_mode: "human-to-human" | "human-to-agent" | "agent-to-agent"
      convergence_state: "announced" | "pre" | "live" | "post" | "archived"
      dimension_type:
        | "temporal"
        | "social"
        | "thematic"
        | "energetic"
        | "spatial"
      event_type:
        | "artifact.created"
        | "artifact.evolved"
        | "artifact.linked"
        | "session.recorded"
        | "session.synthesized"
        | "commitment.made"
        | "commitment.updated"
        | "observation.submitted"
        | "convergence.state_changed"
        | "participant.joined"
        | "extraction.completed"
        | "extraction.failed"
      message_type: "text" | "contribution" | "system"
      participant_artifact_role:
        | "author"
        | "contributor"
        | "steward"
        | "interested"
      relationship_type:
        | "builds_on"
        | "extends"
        | "contradicts"
        | "supersedes"
        | "related_to"
        | "synthesizes"
        | "supports"
        | "implements"
      sprint_visibility_tier:
        | "tier-1-foundational"
        | "tier-2-evolutionary"
        | "tier-3-operational"
        | "tier-4-deprecated"
      sprint_work_type:
        | "protocol"
        | "ui"
        | "infrastructure"
        | "documentation"
        | "agent-identity"
        | "process"
        | "deployment"
        | "fix"
      thread_status:
        | "open"
        | "tagged"
        | "resolved"
        | "consolidated"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["human", "agent"],
      agent_type: ["personal", "collective", "service"],
      artifact_session_role: ["discussed_in", "emerged_from", "presented_in"],
      artifact_state: [
        "seed",
        "discussed",
        "proposed",
        "committed",
        "active",
        "completed",
        "archived",
        "superseded",
        "merged",
      ],
      artifact_type: [
        "idea",
        "proposal",
        "commitment",
        "pattern",
        "synthesis",
        "question",
        "reflection",
      ],
      attendance_state: [
        "registered",
        "attending",
        "contributing",
        "stewarding",
      ],
      author_type: ["human", "agent"],
      channel_type: ["general", "dimension", "session", "topic", "meta"],
      channel_visibility: ["public", "members"],
      commitment_status: ["made", "in_progress", "completed", "abandoned"],
      communication_mode: [
        "human-to-human",
        "human-to-agent",
        "agent-to-agent",
      ],
      convergence_state: ["announced", "pre", "live", "post", "archived"],
      dimension_type: [
        "temporal",
        "social",
        "thematic",
        "energetic",
        "spatial",
      ],
      event_type: [
        "artifact.created",
        "artifact.evolved",
        "artifact.linked",
        "session.recorded",
        "session.synthesized",
        "commitment.made",
        "commitment.updated",
        "observation.submitted",
        "convergence.state_changed",
        "participant.joined",
        "extraction.completed",
        "extraction.failed",
      ],
      message_type: ["text", "contribution", "system"],
      participant_artifact_role: [
        "author",
        "contributor",
        "steward",
        "interested",
      ],
      relationship_type: [
        "builds_on",
        "extends",
        "contradicts",
        "supersedes",
        "related_to",
        "synthesizes",
        "supports",
        "implements",
      ],
      sprint_visibility_tier: [
        "tier-1-foundational",
        "tier-2-evolutionary",
        "tier-3-operational",
        "tier-4-deprecated",
      ],
      sprint_work_type: [
        "protocol",
        "ui",
        "infrastructure",
        "documentation",
        "agent-identity",
        "process",
        "deployment",
        "fix",
      ],
      thread_status: ["open", "tagged", "resolved", "consolidated", "archived"],
    },
  },
} as const
