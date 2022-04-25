<template>
  <div id="va_sidebar_content" class="w-full h-full flex flex-col justify-between">
    <div id="va_sidebar_top">
      <sidebar-sections-profile />
      <sidebar-sections-nav @navigate="handleNavigateEmitter" />
    </div>
    <div id="va_sidebar_bottom">
      <sidebar-sections-footer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarLoaded',
  methods: {
    handleNavigateEmitter() {
      this.$emit('navigate')
    }
  }
}
</script>
