<template>
  <li class="va_home__transaction_item" @click="invokeDetailsModal">
    <div class="va_home__transaction_item_icon_wrapper">
      <div
        class="va_home__transaction_item_icon_box"
        :class="{
          success: isAuthorized,
          failed: !isAuthorized
        }"
      >
        <component :is="`solid-${transactionIconName}-icon`" class="w-6 m-auto" />
      </div>
    </div>
    <div class="va_home__transaction_item_body">
      <div class="va_home__transaction_item_body_left">
        <div
          class="pb-0.5 font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-full"
          v-text="normalizedTransactionName"
        />
        <div class="text-mono-5 dark:text-mono-7 pb-0.5" v-text="transaction.label" />
      </div>
      <div class="va_home__transaction_item_body_right">
        <div
          v-if="transaction.amount !== '0'"
          class="font-semibold"
          :class="{
            'text-red-2': isExpense
          }"
        >
          {{ isExpense ? '-' : '' }}
          <span v-text="formatCurrencyAmount(transaction.amount)" />
        </div>
        <div class="text-mono-5 dark:text-mono-7" v-text="formatDate(transaction.createdDate)" />
      </div>
    </div>
  </li>
</template>

<script>
import { since } from '~/utils/time'

export default {
  name: 'HomeTransactionItem',
  props: {
    transaction: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sanitizedMetadata: {}
    }
  },
  computed: {
    normalizedTransactionName() {
      const transactionTypes = {
        CASH_OUT_CVU: 'Transferencia CVU',
        CASH_IN_CVU: 'Transferencia CVU',
        CONSUMPTION_POS: this.sanitizedMetadata.placeName,
        CREDIT_ADJUSTMENT: 'Ajuste de crédito',
        DEBIT_ADJUSTMENT: 'Ajuste de saldo',
        REFUND: 'Reembolso',
        USER_TO_USER: 'Transferencia Ualá',
        AUTOMATIC_DEBIT: 'Débito automático',
        INVESTMENTS_DEPOSIT: 'Inversiones',
        INVESTMENTS_WITHDRAW: 'Inversiones',
        TELERECARGAS_CARGA: this.sanitizedMetadata.productDescription,
        CASH_IN_TDC: 'Cargaste en ' + this.sanitizedMetadata.entity,
        CASH_OUT_TDC: 'Retiraste en ' + this.sanitizedMetadata.entity
      }
      return transactionTypes[this.transaction.type] || 'Desconocido'
    },
    isAuthorized() {
      return this.transaction.status === 'AUTHORIZED'
    },
    isExpense() {
      const expenseTransactionTypes = [
        'INVESTMENTS_DEPOSIT',
        'CONSUMPTION_POS',
        'CASH_OUT_TDC',
        'CASH_OUT_CVU',
        'TELERECARGAS_CARGA',
        'AUTOMATIC_DEBIT'
      ]
      return (
        this.transaction.reconciliationStatus === 'DEBIT_RECONCILED' ||
        expenseTransactionTypes.includes(this.transaction.type)
      )
    },
    transactionIconName() {
      const transactionTypes = {
        CASH_OUT_CVU: 'arrow-narrow-up',
        CASH_IN_CVU: 'arrow-narrow-down',
        CONSUMPTION_POS: 'newspaper',
        CREDIT_ADJUSTMENT: 'pencil',
        DEBIT_ADJUSTMENT: 'pencil',
        REFUND: 'reply',
        USER_TO_USER: 'users',
        AUTOMATIC_DEBIT: 'credit-card',
        INVESTMENTS_DEPOSIT: 'cloud-upload',
        INVESTMENTS_WITHDRAW: 'cloud-download',
        TELERECARGAS_CARGA: 'hashtag',
        CASH_IN_TDC: 'download',
        CASH_OUT_TDC: 'upload'
      }
      return transactionTypes[this.transaction.type] || 'question-mark-circle'
    }
  },
  mounted() {
    this.formatMetadata()
  },
  methods: {
    formatDate(timestamp) {
      const thisDate = new Date(timestamp)
      let relativeDate
      try {
        relativeDate = since(thisDate)
      } catch (err) {
        relativeDate =
          thisDate.getDate() + '/' + (thisDate.getMonth() + 1).toString().padStart(2, '0')
      }
      return relativeDate
    },
    formatCurrencyAmount(amount) {
      return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount)
    },
    formatMetadata() {
      const pseudoMetadata = this.transaction.metadata.split(/^{(.*)}$/).filter((s) => s.length)
      pseudoMetadata[0]
        .split(',')
        .map((p) => p.trim().split('='))
        .forEach((p) => {
          this.$set(this.sanitizedMetadata, p[0], p[1])
        })
    },
    invokeDetailsModal() {
      this.$modals.invoke({
        title: 'Detalles de la transacción',
        component: 'transaction-details',
        componentPayload: this.transaction,
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

<style scoped>
.va_home__transaction_item {
  @apply text-mono-3 dark:text-mono-10 flex gap-3 w-full select-none p-5 border border-mono-9 dark:border-mono-3 duration-100 cursor-pointer hover:shadow-lg hover:bg-mono-12 dark:hover:bg-mono-3 rounded-xl hover:border-transparent dark:hover:border-transparent;
}

.va_home__transaction_item_icon_wrapper {
  @apply flex items-center justify-center;
}

.va_home__transaction_item_icon_box {
  @apply rounded-lg w-10 h-10 relative flex;
}

.va_home__transaction_item_icon_box.success {
  @apply bg-blue-4 bg-opacity-30 text-blue-2 dark:bg-blue-1 dark:text-blue-5 dark:bg-opacity-75;
}

.va_home__transaction_item_icon_box.failed {
  @apply bg-red-4 bg-opacity-30 text-red-2 dark:bg-red-1 dark:text-red-5 dark:bg-opacity-75;
}

.va_home__transaction_item_body {
  @apply flex justify-between flex-1 overflow-hidden;
}

.va_home__transaction_item_body_left {
  @apply flex flex-col items-start justify-start gap-1 relative flex-1 overflow-hidden pr-3;
}

.va_home__transaction_item_transaction_name {
  @apply pb-0.5 font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-full;
}

.va_home__transaction_item_body_right {
  @apply flex flex-col items-end justify-start gap-1 flex-0;
}
</style>
