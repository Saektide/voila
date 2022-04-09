<template>
  <div id="voila_wrapper_login" class="w-full">
    <div
      v-if="lazySessionChecking"
      id="voila_lazy_checking"
      class="flex items-center justify-center text-2xl gap-4 font-semibold"
    >
      <loading-icon class="w-10 animate-spin-slow opacity-50" />
      <span>Un momento...</span>
    </div>
    <div v-else id="voila_login">
      <h2 class="text-2xl text-center md:text-3xl font-semibold">
        Iniciar sesión
      </h2>
      <div v-if="error" class="bg-safety-red bg-opacity-25 p-3 rounded-lg flex gap-2 mt-6">
        <div>
          <outline-exclamation-icon class="w-6 text-safety-red" />
        </div>
        <p v-text="error" />
      </div>
      <login-with-password v-if="loginStep === 'password'" @loginError="handleLoginError" />
      <login-with-mfa-oob v-else-if="loginStep === 'mfa-oob'" :mfa-token="mfa_token" :oob-code="oob_code" />
      <div class="bg-mono-10 rounded-md p-4 text-mono-4 text-sm flex gap-2">
        <div>
          <outline-exclamation-circle-icon class="w-6 text-mono-8" />
        </div>
        <p>
          Este cliente no es oficial de Ualá, no podrás recibir soporte acerca de ello.
          Al usar este cliente para fines maliciosos estarás incumpliendo los Términos de Uso de Ualá.
        </p>
      </div>
      <div class="mt-6 text-mono-4 text-sm">
        <a href="https://github.com/saektide/voila" class="text-blue-4 underline">GitHub</a> -
        <span>by Saektide</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'reception',
  middleware: 'anon',
  data () {
    return {
      lazySessionChecking: true,
      error: null,
      loginStep: 'password',
      mfa_token: null,
      oob_code: null
    }
  },
  mounted () {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push('/')
    } else {
      this.lazySessionChecking = false
    }
  },
  methods: {
    handleLoginError (err) {
      this.error = err.message
      if (err.code === 32) {
        this.mfa_token = err.details.mfa_token
        this.oob_code = err.details.oob_code
        this.loginStep = 'mfa-oob'
      }
    },
    handleLoginFetching () {
      this.error = null
    }
  }
}
</script>
