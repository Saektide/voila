<template>
  <div class="w-full h-full flex relative">
    <div class="m-auto">
      <header class="flex flex-col items-center justify-center gap-4">
        <div class="w-12 h-12 bg-blurple-5 bg-opacity-25 text-blurple-2 flex relative rounded-xl">
          <solid-emoji-sad-icon class="w-8 m-auto" />
        </div>
        <span class="text-3xl font-semibold" v-text="currentTitle" />
      </header>
      <main class="mt-8 text-mono-5 max-w-xl text-center">
        <p>
          Al parecer intentaste buscar una página que no existe. Si crees que esto es un error
          revisa la consola de desarrollador pulsando F12.
        </p>
        <p v-if="error.message" class="mt-4 text-red-1 bg-red-7 py-3 px-5 rounded-lg text-left font-mono">
          {{ error.message }}
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      errorTitles: [
        '¡Ups!',
        'Algo anda mal...'
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    currentTitle () {
      return this.errorTitles[Math.floor(this.errorTitles.length * Math.random())]
    }
  }
}
</script>
