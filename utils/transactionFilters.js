const filterFunctions = {
  type (filterTypeValue) {
    const filtered = this.filter(t => t.type === filterTypeValue)
    return filtered
  },
  before (filterBeforeValue) {
    return this
  },
  after (filterAfterValue) {
    return this
  }
}

export { filterFunctions }
