<template>
  <label
    class="group text-mono-6 border-b border-mono-9 dark:border-mono-3 dark:text-mono-8 font-bold py-5 w-full flex cursor-pointer duration-100 select-none items-center justify-between"
    :for="`va-${id}`"
    @mousedown="handleMouseEvent"
    @mouseup="handleMouseEvent"
    @mouseleave="handleMouseEvent"
  >
    <input
      :id="`va-${id}`"
      type="checkbox"
      :name="`va-${name}`"
      :value="checked"
      hidden
      :disabled="disabled"
      @change="handleCheckbox"
    >
    <span class="pointer-events-none">
      <slot />
    </span>
    <div class="pointer-events-none">
      <div
        class="rounded-full w-10 flex items-center h-6 relative px-1 duration-200"
        :class="{
          'bg-mono-7': !checked,
          'bg-blue-4': checked,
          'opacity-50 cursor-not-allowed': disabled
        }"
      >
        <div
          class="h-4 bg-mono-12 shadow rounded-full duration-200 absolute inline-flex overflow-hidden"
          :class="{
            'left-1': !checked,
            'right-1 left-5': checked && !isActive,
            'right-1 left-4': checked && isActive,
            'w-4': !isActive,
            'w-5': isActive
          }"
        >
          <solid-x-icon
            class="w-4 text-mono-7 transform absolute duration-300"
            :class="{
              'translate-x-1/3': isActive,
              'translate-x-full': checked
            }"
          />
          <solid-check-icon
            class="w-4 text-blue-4 transform absolute duration-300"
            :class="{
              '-translate-x-1/3': isActive,
              '-translate-x-full': !checked
            }"
          />
        </div>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {},
  methods: {
    handleCheckbox (event) {
      const { name } = event.target
      const checked = this.checked
      const emitterName = !checked ? 'check' : 'uncheck'
      this.$emit(emitterName, { name, checked })
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
