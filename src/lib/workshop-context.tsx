/**
 * WorkshopContext — React context that provides the Workshop configuration
 * and Supabase client to all components.
 *
 * Usage:
 *   <WorkshopProvider config={myConfig}>
 *     <App />
 *   </WorkshopProvider>
 *
 * Components access config via useWorkshop():
 *   const { config, supabase } = useWorkshop()
 */

import { createContext, useContext, useMemo } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { WorkshopConfig } from './workshop-config'

interface WorkshopContextValue {
  config: WorkshopConfig
  supabase: SupabaseClient
}

const WorkshopCtx = createContext<WorkshopContextValue | null>(null)

interface WorkshopProviderProps {
  config: WorkshopConfig
  children: React.ReactNode
}

export function WorkshopProvider({ config, children }: WorkshopProviderProps) {
  const value = useMemo(() => {
    const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)
    return { config, supabase }
  }, [config.supabaseUrl, config.supabaseAnonKey, config])

  return <WorkshopCtx.Provider value={value}>{children}</WorkshopCtx.Provider>
}

export function useWorkshop(): WorkshopContextValue {
  const ctx = useContext(WorkshopCtx)
  if (!ctx) throw new Error('useWorkshop must be used inside <WorkshopProvider>')
  return ctx
}
