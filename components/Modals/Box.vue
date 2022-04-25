<template>
  <div
    class="va__modal_box"
    :class="{
      invisible: !modalData.visible,
      'pointer-events-auto': modalData.visible
    }"
  >
    <header v-if="modalData.title" class="va__modal_box_header">
      <div class="lg:hidden w-12 h-12 bg-blue-6 bg-opacity-50 dark:bg-opacity-30 text-blue-2 dark:text-blue-5 flex relative rounded-xl">
        <outline-cube-icon class="w-8 m-auto" />
      </div>
      <span v-text="modalData.title" />
    </header>
    <main v-if="!modalData.component" class="flex gap-5 select-none overflow-y-auto">
      <div class="hidden lg:block flex-1">
        <div class="w-10 h-10 bg-blue-6 bg-opacity-50 dark:bg-opacity-30 text-blue-2 dark:text-blue-5 flex relative rounded-xl">
          <outline-cube-icon class="w-6 m-auto" />
        </div>
      </div>
      <div class="text-center lg:text-left w-full lg">
        <p class="block" v-text="modalData.body" />
      </div>
    </main>
    <div v-else class="relative w-full overflow-y-auto">
      <component :is="`modals-use-${modalData.component}`" :payload="modalData.componentPayload" />
    </div>
    <footer class="mt-6">
      <div class="flex flex-col-reverse md:flex-row justify-end items-center gap-5">
        <btn
          v-for="(action, actionIdx) in modalData.actions"
          :key="actionIdx"
          class="w-full lg:w-auto"
          :role="action.role"
          :level="action.level"
          @click.native="handleAction(action)"
        >
          {{ action.label }}
        </btn>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ModalsBox',
  props: {
    modalData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleAction(actionObject) {
      if (actionObject.dismiss) {
        return this.$modals.dismissFront()
      }
    }
  }
}
</script>

<style scoped>
.va__modal_box {
  @apply flex flex-col overflow-hidden transform mb-0 w-full lg:w-auto mt-auto lg:m-auto lg:max-w-xl lg:min-w-sm xl:max-w-3xl xl:min-w-xl p-8 bg-mono-12 dark:bg-mono-2 dark:text-mono-9 text-mono-0 rounded-t-xl lg:rounded-b-xl shadow-lg duration-200 max-h-screen--md;
}

.va__modal_box.invisible {
  @apply translate-y-full lg:translate-y-0 lg:scale-90 opacity-0 pointer-events-none;
}

.va__modal_box_header {
  @apply flex flex-col lg:flex-row gap-5 items-center justify-center lg:justify-start text-3xl font-bold select-none mb-6;
}
</style>
