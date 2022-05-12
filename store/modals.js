import Vue from 'vue'

export const state = () => ([])

export const getters = {
  all (state) {
    return state
  },
  front (state) {
    return state[0] || null
  }
}

export const mutations = {
  push (state, modalObject) {
    state.unshift({ visible: false, ...modalObject })
  },
  showFront (state) {
    Vue.set(state[0], 'visible', true)
  },
  hideFront (state) {
    Vue.set(state[0], 'visible', false)
  },
  shiftFront (state) {
    state.shift()
  },
  frontSetActionBusy (state, actionId) {
    const actionIndex = state[0].actions.findIndex((action) => action.id === actionId)
    Vue.set(state[0].actions[actionIndex], 'busy', true)
  },
  frontSetActionIdle (state, actionId) {
    const actionIndex = state[0].actions.findIndex((action) => action.id === actionId)
    Vue.set(state[0].actions[actionIndex], 'busy', false)
  }
}
