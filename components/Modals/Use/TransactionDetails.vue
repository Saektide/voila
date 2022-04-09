<template>
  <div id="va_modalsuse_transaction_details">
    <ul id="va_modalsuse_transaction_details_list" class="flex flex-col">
      <li
        v-for="row in dataRows"
        :key="row.label"
        class="flex items-center justify-between border-b border-mono-9 dark:border-mono-3 py-3"
      >
        <span class="dark:text-mono-7 font-bold pr-4" v-text="row.label" />
        <span class="text-mono-6 dark:text-mono-11" v-text="row.value" />
      </li>
    </ul>
    <div v-if="message" id="va_modalsuse_transaction_details_message">
      <solid-chat-alt-icon class="w-6 text-mono-7" />
      <span v-text="message" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalsUseTransactionDetails',
  props: {
    payload: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    tid() {
      return this.payload.transactionId
    },
    label() {
      return this.payload.label
    },
    message() {
      return this.payload.message
    },
    formattedTime() {
      return new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'long',
        timeStyle: 'medium'
      }).format(new Date(this.payload.createdDate))
    },
    dataRows() {
      const rows = [
        { label: 'ID', value: this.tid },
        { label: 'Fecha y hora', value: this.formattedTime }
      ]
      function addRow(labelName, labelValue) {
        rows.splice(1, 0, { label: labelName, value: labelValue })
      }
      if (this.label) {
        addRow('Categoría', this.label)
      }
      return rows
    }
  }
}
</script>

<style scoped>
#va_modalsuse_transaction_details_message {
  @apply mt-6 bg-mono-10 dark:bg-mono-3 text-mono-2 dark:text-mono-8 italic py-3 px-5 rounded-xl flex items-center gap-x-3;
}
</style>
