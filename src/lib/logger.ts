const isDev = import.meta.env.DEV
const noop = (..._args: unknown[]) => {}

export const logger = {
  debug: isDev ? console.debug.bind(console) : noop,
  info: isDev ? console.log.bind(console) : noop,
  warn: isDev ? console.warn.bind(console) : noop,
  error: console.error.bind(console),
}
