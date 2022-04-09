<template>
  <label
    class="text-mono-3 rounded-xl py-3 px-5 border w-full flex cursor-pointer duration-100 select-none"
    :class="{
      'bg-mono-9 hover:bg-mono-8 border-mono-8': isChecked,
      'border-mono-9 hover:bg-mono-9': !isChecked
    }"
    :for="`settings-${id}`"
  >
    <input
      :id="`settings-${id}`"
      type="checkbox"
      :name="`settings-${name}`"
      :value="isChecked"
      hidden
      @change="handleCheckbox"
    >
    <span class="pointer-events-none">
      <slot />
    </span>
  </label>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SettingsCheckbox',
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
    handleCheckbox (event) {
      const { checked, name } = event.target
      this.setSetting({
        settingName: name.split('settings-')[1],
        value: checked
      })
    }
  }
}
</script>
