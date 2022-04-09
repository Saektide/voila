<template>
  <div id="va_card"></div>
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
