export default function ({ store, redirect }) {
  if (!process.server) {
    const { loggedIn } = store.state.auth
    if (loggedIn) {
      return redirect('/')
    }
  }
}
