<template>
  <div id="va_modalsuse_virtual_card_details">
    <ul id="va_modalsuse_virtual_card_details_list" class="flex flex-col">
      <li
        v-for="row in dataRows"
        :key="row.label"
        class="flex items-center justify-between border-b border-mono-9 dark:border-mono-3 py-3"
      >
        <span class="dark:text-mono-7 font-bold pr-4" v-text="row.label" />
        <span class="text-mono-6 dark:text-mono-11" v-text="row.value" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ModalsUseVirtualCardDetails',
  props: {
    payload: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    number() {
      return this.payload.number
    },
    cvc() {
      return this.payload.cvc
    },
    holder() {
      return this.payload.holderName
    },
    expires() {
      return this.payload.expirationDate
    },
    dataRows() {
      const rows = [
        { label: 'Número', value: this.number },
        { label: 'CVC', value: this.cvc },
        { label: 'Nombre del titular', value: this.holder },
        { label: 'Fecha de expiración', value: this.expires }
      ]
      return rows
    }
  }
}
</script>
