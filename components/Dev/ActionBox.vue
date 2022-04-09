<template>
  <div class="va_dev__action_box" @click="handleAction">
    <div class="va_dev__action_box_content">
      <div>
        <div class="va_dev__action_box_icon_wrapper">
          <outline-cube-icon class="w-6 m-auto" />
        </div>
      </div>
      <div>
        <div class="text-lg font-semibold text-mono-0" v-text="action.title" />
        <div class="text-mono-4" v-text="action.summary" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevActionBox',
  props: {
    action: {
      type: Object,
      default: () => {}
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
  @apply bg-mono-10 hover:bg-mono-9 rounded-xl p-4 cursor-pointer duration-75;
}

.va_dev__action_box_content {
  @apply flex gap-3 pointer-events-none select-none;
}

.va_dev__action_box_icon_wrapper {
  @apply w-8 h-8 bg-blurple-5 bg-opacity-30 text-blurple-2 relative flex rounded-lg;
}
</style>