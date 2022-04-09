<template>
  <form
    action="#"
    class="my-6 flex flex-col gap-3 md:w-96 lg:w-full md:mx-auto"
    @submit.prevent="handleLogin"
  >
    <div class="flex flex-col gap-1">
      <label for="username">Usuario</label>
      <input
        id="username"
        v-model="login.username"
        autocomplete="off"
        name="username"
        type="text"
        class="w-full bg-mono-10 py-2 px-4 rounded-md hover:bg-mono-9 focus:bg-mono-9 ring-1 ring-transparent focus:ring-mono-8 duration-100"
        required
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="login.password"
        autocomplete="off"
        name="password"
        type="password"
        class="w-full bg-mono-10 py-2 px-4 rounded-md hover:bg-mono-9 focus:bg-mono-9 focus:ring-1 focus:ring-mono-8 duration-100"
        required
      >
    </div>
    <div class="mt-2">
      <button
        type="submit"
        class="flex items-center justify-center gap-2 py-2 px-4 text-mono-12 w-full rounded-md bg-blue-3 hover:bg-blue-2 focus:ring-4 focus:ring-blue-4 focus:ring-opacity-50 disabled:opacity-75 duration-100"
        :disabled="fetching"
      >
        <loading-icon v-if="fetching" class="w-6 animate-spin-slow" />
        <span v-if="fetching">Procesando...</span>
        <span v-else>Iniciar sesión</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginWithPassword',
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      fetching: false
    }
  },
  methods: {
    async handleLogin () {
      this.fetching = true
      this.$emit('loginFetching')
      try {
        const { username, password } = this.login
        const { data } = await this.$auth.loginWith('local', {
          data: { username, password }
        })
        await this.$auth.setUserToken(data.access_token, data.refresh_token)
        await this.$auth.fetchUser()
        this.$router.push({ path: '/' })
      } catch (err) {
        this.$emit('loginError', err.response.data)
      }
      this.fetching = false
    }
  }
}
</script>
