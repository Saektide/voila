<template>
  <div class="w-64 h-36 bg-gradient-to-b from-mono-11 to-mono-12 border border-mono-9 rounded-xl relative flex flex-col justify-between items-start p-4 text-mono-2">
    <div>
      <icons-uala-long class="w-12 h-auto" />
    </div>
    <div class="flex justify-between w-full items-end">
      <div class="pb-8 flex items-center gap-3 flex-1">
        <span>•••• •••• •••• ••••</span>
      </div>
      <div class="w-auto inline-flex">
        <icons-master-card class="w-12 h-auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtMagneticCard'
}
</script>
