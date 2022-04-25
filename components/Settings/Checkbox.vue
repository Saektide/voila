<template>
  <label
    class="group text-mono-6 border-b border-mono-9 dark:border-mono-3 dark:text-mono-8 font-bold py-5 w-full flex cursor-pointer duration-100 select-none items-center justify-between"
    :for="`settings-${id}`"
    @mousedown="handleMouseEvent"
    @mouseup="handleMouseEvent"
    @mouseleave="handleMouseEvent"
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
    <div class="pointer-events-none">
      <div
        class="rounded-full w-10 flex items-center h-6 relative px-1"
        :class="{
          'bg-mono-7': !isChecked,
          'bg-safety-green': isChecked
        }"
      >
        <div
          class="h-4 bg-mono-12 shadow rounded-full duration-200 absolute"
          :class="{
            'left-1': !isChecked,
            'right-1 left-5': isChecked && !isActive,
            'right-1 left-4': isChecked && isActive,
            'w-4': !isActive,
            'w-5': isActive
          }"
        />
      </div>
    </div>
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
  data() {
    return {
      isActive: false
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
    },
    handleMouseEvent (event) {
      const eventActions = {
        mousedown: () => { this.isActive = true },
        mouseup: () => { this.isActive = false },
        mouseleave: () => { if (this.isActive) { this.isActive = false } }
      }
      return eventActions[event.type]()
    }
  }
}
</script>
