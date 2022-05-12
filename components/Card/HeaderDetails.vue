<template>
  <div class="flex-1">
    <div class="flex flex-col lg:flex-row gap-4 items-center">
      <h2 class="text-3xl dark:text-mono-10 font-semibold hidden lg:block">
        Tarjeta Ualá Prepaga
      </h2>
      <span v-if="isMagnetic" class="va_card_label_chip">Magnética</span>
      <span v-else class="va_card_label_chip">Contactless</span>
    </div>
    <div v-if="!isPaused" class="mt-4">
      <btn @click.native="handleGetServiceCardButton">
        Datos de la tarjeta
      </btn>
    </div>
    <div v-else class="text-mono-4 dark:text-mono-9 mt-3 bg-mono-10 dark:bg-mono-3 rounded-md py-3 px-5 flex items-center gap-3">
      <solid-exclamation-circle-icon class="w-6 text-mono-8 dark:text-mono-5" />
      <p class="flex-1">
        No podés ver los datos de tu tarjeta porque está bloqueada. Desbloqueala para poder acceder a sus datos.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHeaderDetails',
  props: {
    isMagnetic: {
      type: Boolean,
      default: false
    },
    isPaused: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleGetServiceCardButton () {
      this.$emit('requestCardData')
    }
  }
}
</script>

<style scoped>
.va_card_label_chip {
  @apply py-1 px-3 rounded-full text-sm border border-mono-9 dark:border-mono-4 text-mono-4 dark:text-mono-9;
}
</style>
