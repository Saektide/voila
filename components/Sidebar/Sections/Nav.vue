<template>
  <nav id="va_sidebar_nav" class="flex flex-col gap-6 mt-16 select-none">
    <ul id="va_sidebar_nav_list" class="space-y-1">
      <li v-for="(link, linkIdx) in links" :key="linkIdx">
        <n-link
          :to="link.path"
          class="flex gap-5 lg:gap-3 items-center py-4 px-6 text-lg lg:text-base lg:py-2 lg:px-4 duration-75 rounded-lg"
          :class="{
            'text-blue-3 dark:text-blue-5 bg-blue-7 dark:bg-blue-4 dark:bg-opacity-20 bg-opacity-50 cursor-default': currentRoute === link.name,
            'text-mono-5 dark:text-mono-7 hover:text-mono-1 dark:hover:text-mono-10 hover:bg-mono-10 dark:hover:bg-mono-2': currentRoute !== link.name
          }"
          draggable="false"
        >
          <component
            :is="`solid-${link.icon}-icon`"
            v-if="currentRoute === link.name"
            class="w-8 lg:w-6 duration-75"
          />
          <component
            :is="`outline-${link.icon}-icon`"
            v-else
            class="w-8 lg:w-6 duration-75 opacity-50"
          />
          <span v-text="link.label" />
        </n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SidebarSectionsNav',
  data () {
    return {
      links: [
        { name: 'home', label: 'Inicio', path: '/', icon: 'home' },
        { name: 'transfers', label: 'Transferencias', path: '/@transfers', icon: 'switch-vertical' },
        { name: 'card', label: 'Tarjeta', path: '/@card', icon: 'credit-card' },
        { name: 'settings', label: 'Configuración', path: '/@settings', icon: 'cog' }
      ],
      pathNames: {
        '/': 'home',
        '/@transfers': 'transfers',
        '/@card': 'card',
        '/@settings': 'settings',
        '/@dev': 'dev'
      }
    }
  },
  computed: {
    ...mapGetters(['currentRoute'])
  },
  watch: {
    $route (v) {
      this.setRoute(this.pathNames[v.path])
    }
  },
  mounted () {
    if (process.env.NODE_ENV !== 'production') {
      this.links.push({ name: 'dev', label: 'Desarrollo', path: '/@dev', icon: 'beaker' })
    }
    this.setRoute(this.pathNames[this.$route.path])
  },
  methods: {
    ...mapMutations(['setRoute'])
  }
}
</script>
