/** P253: Set document title per page */
import { useEffect } from 'react'

const BASE = 'techne.co-op.us'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : BASE
    return () => { document.title = BASE }
  }, [title])
}
