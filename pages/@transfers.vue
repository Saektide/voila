<template>
  <div id="va_transfers"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TransfersView',
  computed: {
    ...mapGetters(['balance', 'transactions', 'fetching'])
  }
}
</script>
