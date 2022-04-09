function groupByNumber (arr, n = 2) {
  if (n < 1) { return arr }
  const result = []
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n))
  }
  return result
}

function areObjectValuesNull (obj) {
  return !Object.values(obj).filter(a => a !== null).length
}

export { groupByNumber, areObjectValuesNull }
