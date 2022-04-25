<template>
  <div id="va_card" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardView',
  computed: {
    ...mapGetters(['balance', 'transactions', 'fetching'])
  }
}
</script>
