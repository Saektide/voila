<template>
  <div
    class="flex items-center gap-4"
    :class="{
      'mt-10': !noMargin
    }"
  >
    <span class="uppercase tracking-widest text-mono-7">
      <slot />
    </span>
    <div class="flex-1 border-t border-mono-9 dark:border-mono-3" />
  </div>
</template>

<script>
export default {
  name: 'SettingsSeparator',
  props: {
    noMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
