<template>
  <div id="va_modalsuse_transfer_contact">
    <p>¿Cuanto quieres transferirle a <b>@{{ usernameTo }}</b>?</p>
    <div id="va_modalsuse_transfer_contact_amount_input_wrapper">
      <span class="text-blue-3">$</span>
      <input v-model="amount" type="number" name="amount" placeholder="0.00" class="amount_input">
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
  data() {
    return {
      amount: null
    }
  },
  computed: {
    usernameTo() {
      return this.payload.username
    },
    firstnameTo() {
      return this.payload.firstname
    },
    fixedAmount() {
      return parseFloat(this.amount || 0.01).toFixed(2)
    }
  },
  methods: {
    validateAmount(e) {
      if (e.data === '.' || e.data === ',') {
        this.amount = this.amount.replace(/(\.|,)/g, '')
        this.onDecimals = true
      }
    },
    makeTransfer(contact, amount) {
      this.$modals.invoke({
        title: 'Transferencia Ualá',
        component: 'passcode-check',
        actions: [
          {
            id: 'cancel-pin',
            role: 'secondary',
            level: 'normal',
            label: 'Cancelar',
            dismiss: true
          },
          {
            id: 'check-pin',
            role: 'primary',
            level: 'normal',
            label: 'Aceptar',
            async exec() {
              this.error = false
              if (this.pin.length !== 6) {
                this.error = true
                return
              }
              this.$modals.frontSetActionBusy('check-pin')
              try {
                await this.$axios.$post('transfer-local', {
                  pin: this.pin,
                  amount,
                  usernameTo: contact.username
                })
                this.$modals.dismissAll()
                this.$modals.invoke({
                  title: 'Transferencia realizada correctamente',
                  body: 'Has transferido plata a @' + contact.username + ' por Ualá.',
                  actions: [
                    {
                      id: 'close',
                      role: 'secondary',
                      level: 'normal',
                      label: 'Cerrar',
                      dismiss: true
                    }
                  ]
                })
              } catch (e) {
                this.error = true
              }
              this.$modals.frontSetActionIdle('check-pin')
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
#va_modalsuse_transfer_contact_amount_input_wrapper {
  @apply flex gap-3 mt-4 text-3xl items-center;
}

#va_modalsuse_transfer_contact_amount_input_wrapper input::-webkit-outer-spin-button,
#va_modalsuse_transfer_contact_amount_input_wrapper input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#va_modalsuse_transfer_contact_amount_input_wrapper input[type=number] {
  -moz-appearance: textfield;
}

.amount_input {
  @apply border border-mono-9 text-mono-0 rounded-md py-1 px-3 text-base w-full;
}
</style>
