<template>
  <div id="va_modalsuse_passcode_check">
    <div v-if="error" class="bg-red-5 bg-opacity-50 rounded-md text-red-1 py-3 px-5 mb-3 flex items-center justify-start gap-4">
      <solid-exclamation-circle-icon class="w-6 text-red-2" />
      <span>Revisa tu PIN de seguridad e intentá nuevamente.</span>
    </div>
    <p>
      Para acceder a esta acción, tenés que escribir tu PIN de 6 dígitos de Ualá.
    </p>
    <div class="py-6 flex items-center justify-center gap-3">
      <passcode-input ref="pinInput0" v-model="pin0" :order="0" />
      <passcode-input v-model="pin1" :order="1" />
      <passcode-input v-model="pin2" :order="2" />
      <passcode-input v-model="pin3" :order="3" />
      <passcode-input v-model="pin4" :order="4" />
      <passcode-input v-model="pin5" :order="5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalsUsePasscodeCheck',
  props: {
    payload: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pin0: '',
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      error: false
    }
  },
  computed: {
    pin() {
      return '' + this.pin0 + this.pin1 + this.pin2 + this.pin3 + this.pin4 + this.pin5
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.pinInput0.$el.focus()
    }, 100)
  }
}
</script>

<style scoped>
.va_modalsuse_passcode_check_pin_input {
  @apply appearance-none w-8 py-2 px-2 text-center bg-mono-10 rounded-lg text-mono-4 focus:ring focus:ring-mono-9;
}
</style>
