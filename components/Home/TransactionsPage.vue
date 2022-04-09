<template>
  <ul :id="`va_home__transactions_list_${idx}`" class="leading-none space-y-5">
    <home-transaction-item
      v-for="transaction in transactions"
      :key="transaction.transactionId"
      :transaction="transaction"
    />
  </ul>
</template>

<script>
export default {
  name: 'HomeTransactionsPage',
  props: {
    transactions: {
      type: [Array, Object],
      default: () => []
    },
    idx: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>
