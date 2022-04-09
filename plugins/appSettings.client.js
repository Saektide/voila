import { settingsHandler } from '~/utils/settingsHandler'

export default function ({ app, store }) {
  settingsHandler(store.state.settings, app)
}
