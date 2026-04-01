/**
 * useAdvancedMode — Toggle for advanced coordination features.
 * Persisted in localStorage so it sticks across sessions.
 */

import { useState, useCallback } from 'react'

const STORAGE_KEY = 'coordinate-advanced-mode'

export function useAdvancedMode(): [boolean, () => void] {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev
      try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0') } catch {}
      return next
    })
  }, [])

  return [enabled, toggle]
}
