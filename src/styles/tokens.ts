/**
 * Design tokens — Techne Design System
 * https://techne.institute/design-system/
 *
 * Neutral warm palette, gold accent, IBM Plex Mono / Inter / Georgia.
 */

export const colors = {
  // Accent
  primary:       'var(--gold, #c4956a)',
  primaryHover:  '#d4a57a',
  primaryMuted:  'var(--gold-20, rgba(196,149,106,0.20))',

  // Surfaces
  bg:            'var(--void, #0c0c0c)',
  surface:       'var(--surface, #161616)',
  surfaceHover:  'var(--panel, #222222)',
  surfaceActive: 'var(--raised, #2a2a2a)',
  overlay:       'rgba(12,12,12,0.88)',

  // Borders
  border:        'var(--border, #383838)',
  borderDim:     'var(--border-dim, #2a2a2a)',
  borderHover:   'var(--ghost, #505050)',

  // Text
  text:          'var(--parchment, #f0f0f0)',
  textSecondary: 'var(--warm, #d0d0d0)',
  textMuted:     'var(--muted, #9a9a9a)',
  textPlaceholder:'var(--dim, #707070)',

  // Status
  success:       '#4ade80',
  successTeal:   '#7ccfb8',
  warning:       '#fbbf24',
  error:         '#ef4444',
  info:          '#8bbfff',
  link:          '#8bbfff',
  presence:      '#22c55e',
  purple:        '#a78bfa',
  orange:        '#fb923c',
} as const

export const spacing = {
  xs:  '0.25rem',
  sm:  '0.5rem',
  md:  '0.75rem',
  lg:  '1rem',
  xl:  '1.5rem',
  xxl: '2rem',
} as const

export const radius = {
  sm:   '3px',
  md:   '6px',
  lg:   '8px',
  xl:   '10px',
  full: '9999px',
} as const

export const font = {
  mono:  '"IBM Plex Mono", ui-monospace, monospace',
  sans:  'Inter, system-ui, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
} as const
