<template>
  <div id="voila_wrapper_app">
    <div
      id="va_sidebar_nav"
      class="transform"
      :class="{
        '-translate-x-full lg:translate-x-0': !mobileSidebarShow,
        'shadow-xl': mobileSidebarShow
      }"
    >
      <div>
        <div
          id="va_mobile_controls"
          class="lg:hidden flex relative py-4"
        >
          <button
            class="va_mobile_btn_sidebar_menu_toggle"
            @click="() => { mobileSidebarShow = !mobileSidebarShow }"
          >
            <outline-x-icon v-if="mobileSidebarShow" class="w-6 pointer-events-none" />
            <outline-menu-alt-4-icon v-else class="w-6 pointer-events-none" />
          </button>
        </div>
      </div>
      <sidebar-skeleton v-if="lazyChecking" />
      <sidebar-loaded v-else @navigate="forceHideSidebar" />
    </div>
    <div
      id="va_content_wrapper"
      ref="contentWrapper"
      class="flex flex-col overflow-x-hidden w-full overflow-y-auto"
      @scroll="handleContentWrapperScroll"
    >
      <div
        v-if="currentTitle"
        id="va_header_wrapper"
        class="text-mono-4 w-full top-0 z-20 border-b duration-500"
        :class="{
          regular: !isHomeView,
          'p-4': !isHomeView && isScrollOnTop,
          'p-4 md:p-8 border-mono-9 dark:border-mono-3': isHomeView && isScrollOnTop,
          home_scrolling: isHomeView && !isScrollOnTop,
          sticky: isHomeView
        }"
      >
        <div
          class="max-w-sm md:max-w-xl mx-auto duration-500"
          :class="{
            'lg:max-w-3xl xl:max-w-5xl': !isHomeView,
            'lg:max-w-2xl': isHomeView
          }"
        >
          <div
            id="va_header_content"
            class="text-mono-5 dark:text-mono-10 flex gap-4 select-none items-center justify-start"
          >
            <div
              id="va_mobile_controls"
              class="lg:hidden inline-flex relative"
            >
              <button
                class="va_mobile_btn_sidebar_menu_toggle"
                @click="() => { mobileSidebarShow = !mobileSidebarShow }"
              >
                <outline-x-icon v-if="mobileSidebarShow" class="w-6 pointer-events-none" />
                <outline-menu-alt-4-icon v-else class="w-6 pointer-events-none" />
              </button>
            </div>
            <div class="flex flex-col flex-1 justify-center items-start relative">
              <div
                class="duration-500 overflow-hidden"
                :class="{
                  '-mt-5 opacity-0': !isHomeView || !isScrollOnTop
                }"
              >
                Tenés disponible
              </div>
              <span
                id="va_header_title"
                class="font-semibold duration-500"
                :class="{
                  'min-w-full text-2xl': !isScrollOnTop,
                  'min-w-0 text-3xl': isScrollOnTop,
                  'text-center': isHomeView
                }"
                v-text="currentTitle"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="va_content" class="relative z-10 flex-1 px-4 lg:px-16">
        <div
          class="pt-12 pb-12 max-w-sm md:max-w-xl mx-auto"
          :class="{
            'lg:max-w-2xl': isHomeView,
            'lg:max-w-3xl xl:max-w-5xl': !isHomeView
          }"
        >
          <nuxt />
        </div>
      </div>
    </div>
    <modals-wrapper />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { settingsHandler } from '~/utils/settingsHandler'

export default {
  name: 'DefaultLayout',
  middleware: 'logged',
  data() {
    return {
      lazyChecking: true,
      mobileSidebarShow: false
    }
  },
  computed: {
    ...mapGetters(['balance', 'fetching']),
    ...mapGetters({
      appSettings: 'settings/appSettings',
      isScrollOnTop: 'isScrollOnTop',
      currentRoute: 'currentRoute'
    }),
    isHomeView() {
      return this.currentRoute === 'home'
    },
    availableBalance() {
      return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
        this.balance || 0
      )
    },
    currentTitle() {
      const viewTitles = {
        home: this.availableBalance,
        transfers: 'Transferencias',
        card: 'Tarjeta',
        settings: 'Configuración',
        dev: 'Herramientas de desarrollo'
      }
      return viewTitles[this.currentRoute] || null
    }
  },
  watch: {
    appSettings: {
      deep: true,
      handler(currentSettings) {
        settingsHandler(currentSettings, this)
      }
    }
  },
  mounted() {
    if (!this.$store.state.auth.loggedIn) {
      this.$router.push('/login')
    } else {
      this.lazyChecking = false
    }
    this.fetchTransactions()
  },
  methods: {
    ...mapMutations(['setBalance', 'addFetching', 'removeFetching', 'setScrollStatus']),
    ...mapMutations({
      setTransactions: 'transactions/setTransactions'
    }),
    async fetchTransactions() {
      this.addFetching('transactions')
      this.addFetching('balance')
      try {
        const res = await this.$axios.$get('transactions')
        this.setTransactions(res.transactions)
        this.setBalance(res.balance.availableBalance)
      } catch (err) {
        console.warn(err)
      }
      this.removeFetching('transactions')
      this.removeFetching('balance')
    },
    handleContentWrapperScroll(e) {
      const isScrollOnTop_ = e.target.scrollTop === 0
      const stateAlreadyApplied =
        (this.isScrollOnTop && isScrollOnTop_) || (!this.isScrollOnTop && !isScrollOnTop_)
      if (stateAlreadyApplied) {
        return false
      }
      this.setScrollStatus(isScrollOnTop_)
    },
    forceHideSidebar() {
      this.mobileSidebarShow = false
    }
  }
}
</script>

<style scoped>
#voila_wrapper_app {
  @apply flex flex-row bg-mono-11 dark:bg-mono-2 dark:text-mono-8 w-full fixed h-full inset-y-0 overflow-hidden;
}

#va_sidebar_nav {
  @apply fixed inset-y-0 lg:sticky lg:shadow-xl duration-300 z-30 p-8 pt-4 lg:pt-8 bg-mono-12 dark:bg-mono-1 text-mono-0 dark:text-mono-10 md:shadow-xl flex flex-col items-start justify-center w-full md:w-96 overflow-hidden;
}

#va_header_wrapper.regular {
  @apply bg-mono-11 dark:bg-mono-2 border-mono-9 dark:border-mono-3 px-4 lg:px-16;
}

#va_header_wrapper.home_scrolling {
  @apply bg-mono-10 dark:bg-mono-2 p-6 lg:px-16 border-transparent dark:border-mono-3;
}

.va_mobile_btn_sidebar_menu_toggle {
  @apply duration-75 cursor-pointer p-2 rounded-lg hover:bg-opacity-20 dark:hover:bg-opacity-20 text-mono-0 dark:text-mono-9 hover:bg-mono-0 dark:hover:bg-mono-9;
}

#va_header_wrapper.home_scrolling #va_header_title {
  @apply pr-16;
}
</style>
