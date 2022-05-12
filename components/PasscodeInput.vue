<template>
  <input
    :id="'va-pin-' + order"
    :data-pin-order="order"
    type="text"
    class="va_passcode_pin_input"
    maxlength="1"
    minlength="0"
    inputmode="numeric"
    autocomplete="off"
    @input="handlePINInput"
    @keydown="handlePINKeyDown"
    @keyup="handlePINKeyUp"
  >
</template>

<script>
export default {
  name: 'PasscodeInput',
  props: {
    order: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handlePINInput(e) {
      const { value } = e.target
      const orderIndex = parseInt(e.target.attributes['data-pin-order'].value)
      const orderClamp = (num) => Math.min(Math.max(num, 0), 5)
      let nextOrderIndex = 0
      if (value.length) {
        nextOrderIndex = orderClamp(orderIndex + 1)
        document.getElementById('va-pin-' + nextOrderIndex).focus()
      }
      this.$emit('input', value)
    },
    handlePINKeyDown(e) {
      if (!/\d/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault()
      }
    },
    handlePINKeyUp(e) {
      const orderIndex = parseInt(e.target.attributes['data-pin-order'].value)
      const orderClamp = (num) => Math.min(Math.max(num, 0), 5)
      if (e.key === 'Backspace') {
        const nextOrderIndex = orderClamp(orderIndex - 1)
        const nextOrderElement = document.getElementById('va-pin-' + nextOrderIndex)
        nextOrderElement.focus()
        this.$emit('input', '')
      }
    }
  }
}
</script>

<style scoped>
.va_passcode_pin_input {
  @apply appearance-none w-8 py-2 px-2 m-0 text-center bg-mono-10 dark:bg-mono-3 rounded-lg text-mono-4 dark:text-mono-9 focus:ring focus:ring-mono-9 dark:focus:ring-mono-4;
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
</style>
