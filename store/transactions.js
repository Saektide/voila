import Vue from 'vue'
import { groupByNumber, areObjectValuesNull } from '~/utils/array'
import { filterFunctions } from '~/utils/transactionFilters'

export const state = () => ({
  transactions: [],
  page: 1,
  pageItemsLimit: 50,
  pagesCount: 1,
  filters: {
    type: null,
    before: null,
    after: null
  },
  filteredTransactions: [],
  filteredPagesCount: 1
})

export const getters = {
  all (state) {
    return state.transactions
  },
  page (state) {
    return state.page
  },
  pageLimit (state) {
    return state.pageItemsLimit
  },
  pages (state) {
    return state.pagesCount
  },
  filters (state) {
    return state.filters
  },
  filtered (state) {
    return state.filteredTransactions
  },
  filteredPages (state) {
    return state.filteredPagesCount
  }
}

export const mutations = {
  setTransactions (state, transactionsArray) {
    state.transactions = transactionsArray
    state.pagesCount = groupByNumber(transactionsArray, state.pageItemsLimit).length
  },
  setPagesCount (state, newPagesCount) {
    state.pagesCount = newPagesCount
  },
  setFilter (state, { filterName, filterValue }) {
    Vue.set(state.filters, filterName, filterValue)
    let newFiltered = state.transactions
    // by transaction type
    Object.keys(state.filters).forEach((filterName) => {
      newFiltered = filterFunctions[filterName].bind(newFiltered, filterValue)()
    })
    state.filteredTransactions = newFiltered
    state.filteredPagesCount = groupByNumber(newFiltered, state.pageItemsLimit).length
    state.page = 1
  },
  dismissFilter (state, filterName) {
    Vue.set(state.filters, filterName, null)
    if (areObjectValuesNull(state.filters)) {
      state.filteredTransactions = []
    }
    state.page = 1
  },
  nextPage (state) {
    const newCount = state.page + 1
    const maxCount = !state.filteredTransactions.length ? state.pagesCount : state.filteredPagesCount
    if (newCount > maxCount) {
      state.page = 1
    } else {
      ++state.page
    }
  },
  prevPage (state) {
    const newCount = state.page - 1
    const maxCount = !state.filteredTransactions.length ? state.pagesCount : state.filteredPagesCount
    if (newCount <= 0) {
      state.page = maxCount
    } else {
      --state.page
    }
  }
}
