/**
 * Shared dimension definitions and unlock utilities
 */
import { supabase } from './supabase'
const triggerDimensionUnlockToast = (_code: string) => {} // Standalone: no toast
const notifyDimensionUnlocked = (_dim: string) => {} // Standalone: no notification engine
import { colors } from '../styles/tokens'

export interface Dimension {
  code: string
  name: string
  color: string
  description: string
  route: string
}

export const DIMENSIONS: Dimension[] = [
  { code: 'H', name: 'Human', color: colors.primary, description: 'You showed up. That matters.', route: '/arrive' },
  { code: 'L', name: 'Language', color: '#a6ed2a', description: 'You spoke, and the commons heard structure.', route: '/voice' },
  { code: 'e', name: 'Ecology', color: '#4a8c6f', description: 'Intelligence is situated. The cooperative exists in a place.', route: '/ecology' },
  { code: 'A', name: 'Artifacts', color: '#8bbfff', description: 'What you make becomes part of the record.', route: '/artifacts' },
  { code: 'S', name: 'Solar Cycles', color: '#d4a0e8', description: 'Time is not a clock. It\'s a rhythm.', route: '/cycles' },
  { code: 'T', name: 'Training', color: '#e8927c', description: 'The bootstrap: using your own tools to improve your own tools.', route: '/training' },
  { code: 'M', name: 'Methodology', color: colors.success, description: 'You\'ve experienced the whole. Now see how governance works.', route: '/methodology' },
]

// P189: Canonical dimension order — H → L → e → A → S → T → M
// Import this everywhere instead of defining locally
// Note: lowercase 'e' for Ecology is intentional (e/ notation)
export const DIMENSION_ORDER: string[] = DIMENSIONS.map(d => d.code)

// E238: Cloud earned per dimension unlock
const DIMENSION_CLOUD: Record<string, number> = {
  H: 0, L: 10, e: 15, A: 20, S: 25, T: 25, M: 55,
}

export async function unlockDimension(participantId: string, dimCode: string): Promise<void> {
  const { data } = await supabase
    .from('participants')
    .select('dimensions_unlocked')
    .eq('id', participantId)
    .single()

  const already = data?.dimensions_unlocked?.[dimCode]
  const dims = { ...(data?.dimensions_unlocked || { H: true }), [dimCode]: true }
  await supabase
    .from('participants')
    .update({ dimensions_unlocked: dims })
    .eq('id', participantId)

  // E273: Record dimension unlock on the tree as permanent record
  if (!already) {
    const dim = DIMENSIONS.find(d => d.code === dimCode)
    await supabase.from('chain_entries').insert({
      participant_id: participantId,
      entry_type: 'dimension.unlocked',
      payload: { dimension: dimCode, name: dim?.name ?? dimCode },
    })
  }

  // E272: Show celebration toast for newly unlocked dimensions
  if (!already) {
    triggerDimensionUnlockToast(dimCode)
    // E313: Notification for dimension unlock
    const dim = DIMENSIONS.find(d => d.code === dimCode)
    notifyDimensionUnlocked(participantId, dimCode, dim?.name ?? dimCode).catch(() => {})
  }

  // Grant cloud if not already unlocked
  const grant = DIMENSION_CLOUD[dimCode] ?? 0
  if (!already && grant > 0) {
    await supabase.rpc('grant_cloud', { p_to_id: participantId, p_amount: grant, p_reason: `Dimension ${dimCode} unlocked` })
    await supabase.from('chain_entries').insert({
      participant_id: participantId, entry_type: 'cloud.granted',
      payload: { amount: grant, dimension: dimCode },
    })
  }
}

/**
 * P173: Express enrollment — unlock all dimensions at once.
 * Grants full CLOUD (150), records all chain entries, fires a single combined toast.
 */
export async function unlockAllDimensions(participantId: string): Promise<void> {
  // Fetch current state
  const { data } = await supabase
    .from('participants')
    .select('dimensions_unlocked')
    .eq('id', participantId)
    .single()

  const current = data?.dimensions_unlocked || {}
  const allDims: Record<string, boolean> = {}
  let totalCloud = 0
  const newlyUnlocked: string[] = []

  for (const dim of DIMENSIONS) {
    allDims[dim.code] = true
    if (!current[dim.code]) {
      newlyUnlocked.push(dim.code)
      totalCloud += DIMENSION_CLOUD[dim.code] ?? 0
    }
  }

  // Batch update dimensions_unlocked
  await supabase
    .from('participants')
    .update({ dimensions_unlocked: allDims })
    .eq('id', participantId)

  // Record chain entries for each newly unlocked dimension
  const chainEntries = newlyUnlocked.map(code => ({
    participant_id: participantId,
    entry_type: 'dimension.unlocked',
    payload: { dimension: code, name: DIMENSIONS.find(d => d.code === code)?.name ?? code, express: true },
  }))

  if (chainEntries.length > 0) {
    await supabase.from('chain_entries').insert(chainEntries)
  }

  // P173 rev: Express earns half CLOUD (75 of 150) — progressive discovery rewards the journey
  const expressCloud = Math.floor(totalCloud / 2)
  if (expressCloud > 0) {
    await supabase.rpc('grant_cloud', {
      p_to_id: participantId,
      p_amount: expressCloud,
      p_reason: `Express enrollment — all dimensions unlocked (${expressCloud} CLOUD, half rate)`,
    })
    await supabase.from('chain_entries').insert({
      participant_id: participantId,
      entry_type: 'cloud.granted',
      payload: { amount: expressCloud, full_rate: totalCloud, express: true, dimensions: newlyUnlocked },
    })
  }

  // Fire notifications for newly unlocked dimensions
  for (const code of newlyUnlocked) {
    const dim = DIMENSIONS.find(d => d.code === code)
    notifyDimensionUnlocked(participantId, code, dim?.name ?? code).catch(() => {})
  }

  // Single combined toast showing all dimensions
  if (newlyUnlocked.length > 0) {
    triggerDimensionUnlockToast(newlyUnlocked.join(''))
  }

  // Notify DimensionVisibilityContext to refresh
  window.dispatchEvent(new CustomEvent('dimensions-changed'))
}

export async function checkDimensionUnlocked(participantId: string, dimCode: string): Promise<boolean> {
  const { data } = await supabase
    .from('participants')
    .select('dimensions_unlocked')
    .eq('id', participantId)
    .single()

  return !!(data?.dimensions_unlocked?.[dimCode])
}
