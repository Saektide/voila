<template>
  <div
    class="fixed z-50 inset-0 bg-mono-0 bg-opacity-40 flex duration-200"
    :class="{
      'pointer-events-none opacity-0': !modals.length
    }"
  >
    <modals-box v-if="modals.length" :modal-data="frontModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ModalsWrapper',
  computed: {
    ...mapGetters({
      modals: 'modals/all',
      frontModal: 'modals/front'
    })
  }
}
</script>
