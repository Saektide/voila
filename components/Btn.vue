<template>
  <button
    class="va_btn"
    :class="{
      primary_normal: isPrimary && level === 'normal',
      secondary_normal: !isPrimary && level === 'normal'
    }"
  >
    <component :is="`outline-${icon}-icon`" v-if="icon" class="w-6" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Btn',
  props: {
    role: {
      type: String,
      default: 'primary',
      validate(val) {
        return ['primary', 'secondary'].includes(val)
      }
    },
    level: {
      type: String,
      default: 'normal',
      validate(val) {
        return ['normal', 'danger', 'warning'].includes(val)
      }
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    isPrimary() {
      return this.role === 'primary'
    }
  }
}
</script>

<style scoped>
.va_btn {
  @apply py-3 lg:py-2 px-6 lg:px-5 rounded-lg duration-100 gap-3 flex items-center justify-center;
}

.va_btn.primary_normal {
  @apply bg-blue-2 hover:bg-blue-3 text-mono-12;
}

.va_btn.secondary_normal {
  @apply ring-1 ring-mono-9 dark:ring-mono-4 hover:bg-mono-9 dark:hover:bg-mono-4 text-mono-3 dark:text-mono-8 hover:text-mono-0 dark:hover:text-mono-10;
}
</style>
