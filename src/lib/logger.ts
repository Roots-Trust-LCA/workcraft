/**
 * Environment-aware logger for co-op.us
 *
 * Silent in production for info/debug/warn levels.
 * Errors always log (they indicate real problems).
 *
 * Usage:
 *   import { logger } from '@/lib/logger'
 *   logger.info('Token refreshed')
 *   logger.warn('Retrying query', error.message)
 *   logger.error('Chain verification failed', error)
 *
 * P222: Console.log cleanup + logger implementation
 */

const isDev = import.meta.env.DEV

/** No-op function for suppressed log levels */
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (..._args: unknown[]) => {}

export const logger = {
  /** Debug-level output — dev only */
  debug: isDev ? console.debug.bind(console) : noop,

  /** Informational output — dev only */
  info: isDev ? console.log.bind(console) : noop,

  /** Warnings (non-fatal issues) — dev only */
  warn: isDev ? console.warn.bind(console) : noop,

  /** Errors always log — these indicate real problems */
  error: console.error.bind(console),
}
