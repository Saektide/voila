<template>
  <div id="va_sidebar_skeleton" class="w-full h-full text-mono-8 flex flex-col justify-between">
    <div id="va_sidebar_skeleton_top">
      <div id="va_skeleton_profile" class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-full bg-current animate-pulse" />
        <div>
          <div class="w-40 h-4 rounded-full bg-current animate-pulse mb-2" />
          <div class="w-20 h-2 rounded-full bg-current animate-pulse" />
        </div>
      </div>
      <div id="va_skeleton_nav" class="flex flex-col gap-6 mt-16">
        <div class="w-40 h-4 rounded-full bg-current animate-pulse mb-2" />
        <div class="w-36 h-4 rounded-full bg-current animate-pulse mb-2" />
        <div class="w-24 h-4 rounded-full bg-current animate-pulse mb-2" />
        <div class="w-40 h-4 rounded-full bg-current animate-pulse mb-2" />
        <div class="w-24 h-4 rounded-full bg-current animate-pulse mb-2" />
      </div>
    </div>
    <div id="va_sidebar_skeleton_bottom" class="flex gap-4">
      <span class="w-8 h-8 rounded-full bg-current animate-pulse" />
      <span class="w-8 h-8 rounded-full bg-current animate-pulse" />
      <span class="w-8 h-8 rounded-full bg-current animate-pulse" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarSkeleton'
}
</script>
