require('dotenv').config()

class Logger {
  constructor(loggerName = 'Other') {
    this.loggerName = loggerName
    this.debugEnabled = process.env.API_DEBUG || false
  }

  log(tag, ...args) {
    const delimiter = '[ λ | ' + this.loggerName + ' | ' + tag + ' ]'
    // eslint-disable-next-line no-console
    console.log(delimiter, ...args)
  }

  debug(...args) { this.log('🧪 DEBUG', ...args) }
  warn(...args) { this.log('⚠ WARN', ...args) }
  error(...args) { this.log('❌ ERR', ...args) }
}

module.exports = Logger
