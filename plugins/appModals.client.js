import Vue from 'vue'

export default function (ctx, inject) {
  const { store } = ctx
  const modals = {
    invoke (modalObject) {
      function release () {
        store.commit('modals/push', modalObject)
        setTimeout(() => {
          store.commit('modals/showFront')
        }, 10)
      }
      if (store.getters['modals/front']) {
        store.commit('modals/hideFront')
        setTimeout(release, 200)
      } else {
        release()
      }
    },
    dismissFront () {
      store.commit('modals/hideFront')
      setTimeout(() => {
        store.commit('modals/shiftFront')

        if (store.getters['modals/front']) {
          store.commit('modals/showFront')
        }
      }, 200)
    }
  }

  Vue.prototype.$modals = modals
  ctx.$modals = modals
  inject('modals', modals)
}
