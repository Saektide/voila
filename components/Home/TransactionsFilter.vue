<template>
  <div id="va_home_transactions_filter" class="flex items-center justify-end">
    <btn icon="adjustments" @click.native="handleFilterButton">
      Filtrar
    </btn>
  </div>
</template>

<script>
export default {
  name: 'HomeTransactionsFilter',
  methods: {
    handleFilterButton() {
      this.$modals.invoke({
        title: 'Filtrar transacciones',
        component: 'filter-transactions',
        actions: [
          {
            role: 'secondary',
            level: 'normal',
            label: 'Cerrar',
            dismiss: true
          }
        ]
      })
    }
  }
}
</script>
