/**
 * Design tokens — standalone Workshop.
 * Uses CSS custom properties for dark/light mode.
 */

export const colors = {
  primary: 'var(--ws-primary, #c4956a)',
  primaryHover: 'var(--ws-primary-hover, #d4a57a)',
  primaryMuted: 'var(--ws-primary-muted, rgba(196,149,106,0.15))',
  bg: 'var(--ws-bg, #0a0a0f)',
  surface: 'var(--ws-surface, #141420)',
  surfaceHover: 'var(--ws-surface-hover, #1c1c2e)',
  overlay: 'var(--ws-overlay, rgba(10,10,15,0.85))',
  border: 'var(--ws-border, #2a2a3e)',
  borderHover: 'var(--ws-border-hover, #3a3a4e)',
  text: 'var(--ws-text, #e8e8f0)',
  textSecondary: 'var(--ws-text-secondary, #a0a0b8)',
  textMuted: 'var(--ws-text-muted, #6a6a82)',
  textPlaceholder: 'var(--ws-text-placeholder, #4a4a62)',
  success: '#7ccfb8',
  successBright: '#4ade80',
  warning: '#e8927c',
  warningYellow: '#fbbf24',
  error: '#ef4444',
  info: '#8bbfff',
  link: '#8bbfff',
  presence: '#22c55e',
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem',
} as const

export const radius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const
