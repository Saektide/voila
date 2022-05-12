import Vue from 'vue'

/**
 * @typedef {{ id: String, role: String, level: String, label: String, dismiss: Boolean, busy: Boolean, exec: Function }} ModalAction
 * @typedef {{ title: String, component: String, componentPayload, actions: ModalAction[] }} ModalObject
*/

export default function (ctx, inject) {
  const { store } = ctx
  const modals = {
    /**
     * Add a modal object to the app's store to be invoked.
     * @param {ModalObject} modalObject
     */
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
    /**
     * Hides the front modal, then delete it from the app's store.
     */
    dismissFront () {
      store.commit('modals/hideFront')
      setTimeout(() => {
        store.commit('modals/shiftFront')

        if (store.getters['modals/front']) {
          store.commit('modals/showFront')
        }
      }, 200)
    },
    /**
     * Set the targeted action button to "busy".
     * @param {String} actionId
     */
    frontSetActionBusy (actionId) {
      store.commit('modals/frontSetActionBusy', actionId)
    },
    /**
     * Set the targeted action button to "idle".
     * @param {String} actionId
     */
    frontSetActionIdle (actionId) {
      store.commit('modals/frontSetActionIdle', actionId)
    }
  }

  Vue.prototype.$modals = modals
  ctx.$modals = modals
  inject('modals', modals)
}
