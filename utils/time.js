/**
 * Compare a given timestamp with the current one (now). Returns a formatted relative time string.
 * Uses Intl (ECMAScript Internationalization API) for multi-language support.
 * @param {Date} date
 * @param {String} defaultLang
 * @returns {String}
 */
function since (date, defaultLang = 'es') {
  const rl = new Intl.RelativeTimeFormat(defaultLang, { style: 'long' })
  const rawSeconds = Math.floor((new Date().getTime() - date) / 1000)

  const divisorsUnits = [
    { value: 31536000, name: 'year' },
    { value: 2592000, name: 'month' },
    { value: 604800, name: 'week' },
    { value: 86400, name: 'day' },
    { value: 3600, name: 'hour' },
    { value: 60, name: 'minute' },
    { value: 1, name: 'second' }
  ]
  const sortedDivisorUnits = divisorsUnits.sort((a, b) => a.value < b.value)

  let formattedRelativeTime = null

  sortedDivisorUnits.every((unit) => {
    const interval = Math.floor(rawSeconds / unit.value)
    if (interval >= 1) {
      formattedRelativeTime = rl.format(-interval, unit.name)
      return false
    }
    return true
  })

  return formattedRelativeTime
}

export { since }
