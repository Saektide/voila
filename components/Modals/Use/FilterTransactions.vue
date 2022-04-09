<template>
  <div class="w-full">
    <settings-dropdown id="type" name="type" sector="transactions" :invoke="typeInvokeModal">
      Tipos de transacción
    </settings-dropdown>
  </div>
</template>

<script>

export default {
  name: 'ModalsUseFilterTransactions',
  data () {
    return {
      typeInvokeModal: {
        title: 'Filtrar por tipo de transacciones',
        payload: {
          name: 'type',
          options: [
            {
              label: 'Ninguno',
              id: 'none',
              value: null
            },
            {
              label: 'Entrantes (CVU)',
              id: 'cvu_transfer_in',
              value: 'CASH_IN_CVU'
            },
            {
              label: 'Salientes (CVU)',
              id: 'cvu_transfer_out',
              value: 'CASH_OUT_CVU'
            },
            {
              label: 'Consumo',
              id: 'comsumption_pos',
              value: 'CONSUMPTION_POS'
            },
            {
              label: 'Reembolsos',
              id: 'refund',
              value: 'REFUND'
            },
            {
              label: 'Débito automático',
              id: 'automatic_debit',
              value: 'AUTOMATIC_DEBIT'
            },
            {
              label: 'Recargas',
              id: 'telerecargas_carga',
              value: 'TELERECARGAS_CARGA'
            },
            {
              label: 'Ualá a Ualá',
              id: 'user_to_user',
              value: 'USER_TO_USER'
            }
          ]
        }
      }
    }
  }
}
</script>
