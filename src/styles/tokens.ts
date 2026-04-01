// Design Tokens — co-op.us / Techne
// Single source of truth for visual constants
// Colors use CSS custom properties for light/dark mode support

export const colors = {
  // Primary (terracotta)
  primary: 'var(--co-primary)',
  primaryHover: 'var(--co-primary-hover)',
  primaryMuted: 'var(--co-primary-muted)',

  // Surfaces
  bg: 'var(--co-bg)',
  surface: 'var(--co-surface)',
  surfaceHover: 'var(--co-surface-hover)',
  overlay: 'var(--co-overlay)',

  // Borders
  border: 'var(--co-border)',
  borderHover: 'var(--co-border-hover)',
  borderActive: 'var(--co-primary)',

  // Text
  text: 'var(--co-text)',
  textSecondary: 'var(--co-text-secondary)',
  textMuted: 'var(--co-text-muted)',
  textPlaceholder: 'var(--co-text-placeholder)',

  // Status — warm palette
  success: '#7ccfb8',    // teal (Methodology)
  successBright: '#4ade80', // green — vote passed, online presence
  warning: '#e8927c',    // salmon (Training)
  warningYellow: '#fbbf24', // amber — pending, caution, calendar
  error: '#ef4444',
  errorLight: '#f87171', // softer red — vote failed, error badges
  info: '#8bbfff',       // light blue (Artifacts)
  link: '#8bbfff',       // link hover (prefer over Tailwind blue-400)

  // Semantic accents
  positive: '#7ccfb8',   // teal
  processing: '#8bbfff', // light blue
  verified: '#7ccfb8',   // teal
  pending: '#fbbf24',    // amber — pending states
  accent2: '#fb923c',    // warm orange — secondary interactive accent
  surfaceActive: 'var(--co-surface-active)',
  presence: '#22c55e',   // bright green — online presence dot

  // Dimensions (e/H-LAM/T+S) — matches dimensions.ts canonical colors
  ecology: '#4a8c6f',
  human: '#c4956a',
  language: '#a6ed2a',       // lime green (corrected from #c4956a)
  artifacts: '#8bbfff',
  solarCycles: '#d4a0e8',    // lavender (Solar Cycles dimension)
  methodology: '#7ccfb8',
  training: '#e8927c',
} as const

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
} as const

export const fontSize = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  base: '1rem',    // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
} as const

export const borderRadius = {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px rgba(196, 149, 106, 0.15)',
} as const

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const
