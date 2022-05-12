import Vue from 'vue'

export const state = () => ({
  balance: null,
  transactions: [],
  card: {},
  fetching: [
    'balance',
    'transactions',
    'card'
  ],
  currentRoute: '',
  isScrollOnTop: true
})

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  currentUser (state) {
    return state.auth.user
  },
  fetching (state) {
    return state.fetching
  },
  transactions (state) {
    return state.transactions
  },
  balance (state) {
    return state.balance
  },
  card (state) {
    return state.card
  },
  currentRoute (state) {
    return state.currentRoute
  },
  isScrollOnTop (state) {
    return state.isScrollOnTop
  }
}

export const mutations = {
  setBalance (state, newBalance) {
    state.balance = newBalance
  },
  setTransactions (state, transactionsArray) {
    state.transactions = transactionsArray
  },
  setCard (state, cardObject) {
    state.card = cardObject
  },
  setCardStatus (state, newCardStatus) {
    Vue.set(state.card, 'status', newCardStatus)
  },
  addTransaction (state, transactionObject) {
    state.transactions.push(transactionObject)
  },
  addFetching (state, endpointLabel) {
    if (state.fetching.includes(endpointLabel)) { return }
    state.fetching.push(endpointLabel)
  },
  removeFetching (state, endpointLabel) {
    if (!state.fetching.includes(endpointLabel)) { return }
    state.fetching.splice(state.fetching.indexOf(endpointLabel), 1)
  },
  setRoute (state, routeName) {
    state.currentRoute = routeName
  },
  setScrollStatus (state, scrollStatusBoolean) {
    state.isScrollOnTop = scrollStatusBoolean
  }
}
