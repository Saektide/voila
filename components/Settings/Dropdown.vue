<template>
  <button
    class="text-mono-3 border-mono-9 hover:bg-mono-9 rounded-xl py-3 px-5 border w-full flex items-center justify-between cursor-pointer duration-100 select-none"
    @click="handleDropdown"
  >
    <span class="pointer-events-none">
      <slot />
    </span>
    <solid-chevron-right-icon class="w-6 text-mono-7" />
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SettingsDropdown',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    sector: {
      type: String,
      default: 'settings'
    },
    options: {
      type: Array,
      default: () => []
    },
    invoke: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      appSettings: 'settings/appSettings'
    }),
    isChecked () {
      return this.appSettings[this.name]
    }
  },
  methods: {
    ...mapMutations({
      setSetting: 'settings/setSetting'
    }),
    handleDropdown () {
      this.$emit('onDropdown')
      this.$modals.invoke({
        title: this.invoke.title || 'Untitled Dropdown Modal',
        component: 'dropdown-options',
        componentPayload: this.invoke.payload,
        actions: this.invoke.actions || [
          {
            role: 'secondary',
            level: 'normal',
            label: 'Volver',
            dismiss: true
          }
        ]
      })
    }
  }
}
</script>
