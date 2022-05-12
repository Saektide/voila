<template>
  <div id="va_card">
    <div v-if="!fetchingCard" id="va_card_header" class="flex flex-col lg:flex-row justify-center lg:justify-start gap-8 items-center">
      <art-magnetic-card />
      <card-header-details :is-magnetic="isMagneticCard" :is-paused="pausedCard" @requestCardData="handleGetServiceCardButton" />
    </div>
    <div v-else id="va_card_header_skeleton" class="animate-pulse filter grayscale flex flex-col lg:flex-row justify-center lg:justify-start gap-8 items-center">
      <art-magnetic-card />
      <card-header-details-skeleton />
    </div>
    <div id="va_card_actions">
      <div>
        <checkbox
          id="va-pause-service-card"
          name="uala-pause-card"
          :checked="pausedCard"
          :disabled="fetchingCard"
          @check="handlePauseServiceCard"
          @uncheck="handleUnpauseServiceCard"
        >
          Congelar tarjeta
        </checkbox>
      </div>
      <div v-if="!fetchingCard">
        <ul v-if="!pausedCard" class="grid lg:grid-cols-2 gap-2 lg:gap-6 mt-6">
          <li v-for="(action, actionIdx) in cardActions" :key="actionIdx">
            <card-action-box
              :action="action"
              :icon="action.icon"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CardView',
  data() {
    return {
      fetchingCard: true,
      cardActions: [
        {
          title: 'Formas de carga',
          summary: 'Por transferencia o en efectivo.',
          icon: 'plus'
        },
        {
          title: 'Retiro por cajero',
          summary: '$8500 por día en cajeros Red Link y Banelco.',
          icon: 'cash'
        },
        {
          title: 'Retiro por Rapipago',
          summary: 'Gratis sin costo la primera vez por mes.',
          icon: 'inbox'
        },
        {
          title: 'Administrar seguridad',
          summary: 'Ver o cambiar tus claves.',
          icon: 'lock-closed'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['balance', 'transactions', 'card', 'fetching']),
    pausedCard() {
      return this.card.status === 'TEMPORAL_BLOCKED'
    },
    isMagneticCard() {
      return this.card.type === 'MAGNETIC'
    }
  },
  watch: {
    fetching: {
      deep: true,
      handler(currentFetching) {
        if (!currentFetching.includes('card')) {
          this.fetchingCard = false
        }
      }
    }
  },
  mounted () {
    if (!this.fetching.includes('card')) {
      this.fetchingCard = false
    }
  },
  methods: {
    ...mapMutations(['setCardStatus']),
    async handlePauseServiceCard() {
      this.fetchingCard = true
      try {
        const resCard = await this.$axios.$post('card-block', { lastFourDigits: this.card.last4Digits })
        this.setCardStatus(resCard.card.status)
      } catch (e) {
        // @TODO: Fail toast notification, modals can be an alternative for now.
        this.$modals.invoke({
          title: 'Error al bloquear la tarjeta',
          body: 'No se pudo bloquear temporalmente la tarjeta, revisa la consola de desarrollo e intentalo nuevamente.',
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
      }
      this.fetchingCard = false
    },
    async handleUnpauseServiceCard() {
      this.fetchingCard = true
      try {
        const resCard = await this.$axios.$post('card-activate', { lastFourDigits: this.card.last4Digits })
        this.setCardStatus(resCard.card.status)
      } catch (e) {
        // @TODO: Fail toast notification, modals can be an alternative for now.
        this.$modals.invoke({
          title: 'Error al desbloquear la tarjeta',
          body: 'No se pudo desbloquear la tarjeta, revisa la consola de desarrollo e intentalo nuevamente.',
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
      }
      this.fetchingCard = false
    },
    handleGetServiceCardButton() {
      this.$modals.invoke({
        title: 'Datos de la tarjeta',
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
                const res = await this.$axios.$get('card-virtual', {
                  headers: {
                    pin: this.pin
                  }
                })
                this.$modals.dismissFront()
                this.$modals.invoke({
                  title: 'Datos de la tarjeta',
                  component: 'virtual-card-details',
                  componentPayload: res,
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
