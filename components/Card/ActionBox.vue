<template>
  <div class="va_dev__action_box" @click="handleAction">
    <div class="va_dev__action_box_content">
      <div>
        <div class="va_dev__action_box_icon_wrapper">
          <component :is="'outline-' + icon + '-icon'" class="w-5 m-auto" />
        </div>
      </div>
      <div>
        <div class="text-lg font-semibold text-mono-0 dark:text-mono-11" v-text="action.title" />
        <div class="text-mono-5 dark:text-mono-7 text-sm" v-text="action.summary" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardActionBox',
  props: {
    action: {
      type: Object,
      default: () => {}
    },
    icon: {
      type: String,
      default: 'cube'
    }
  },
  methods: {
    handleAction() {
      if (!this.action.handler || typeof this.action.handler !== 'function') {
        return false
      }
      this.action.handler(this)
    }
  }
}
</script>

<style scoped>
.va_dev__action_box {
  @apply bg-mono-10 dark:bg-transparent hover:bg-mono-9 dark:hover:bg-mono-3 rounded-xl p-4 cursor-pointer duration-75;
}

.va_dev__action_box_content {
  @apply flex gap-3 pointer-events-none select-none;
}

.va_dev__action_box_icon_wrapper {
  @apply w-8 h-8 bg-blue-5 bg-opacity-30 dark:bg-opacity-20 text-blue-2 dark:text-blue-5 relative flex rounded-lg;
}
</style>
