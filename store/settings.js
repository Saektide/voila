import Vue from 'vue'

export const state = () => ({
  darkMode: false,
  ninjaMode: false
})

export const getters = {
  appSettings (state) {
    return state
  }
}

export const mutations = {
  setSetting (state, { settingName, value }) {
    Vue.set(state, settingName, value)
  }
}
