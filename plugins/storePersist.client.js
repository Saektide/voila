import Persistence from 'vuex-persist'

export default ({ store }) => {
  new Persistence({
    modules: [
      'settings'
    ]
  }).plugin(store)
}
