<template>
  <div id="va_contacts">
    <div id="va_contacts_content">
      <section id="va_contacts_service">
        <h2 class="text-2xl font-bold">
          Contactos Ualá
        </h2>
        <ul class="grid grid-cols-2 gap-4 mt-4">
          <li
            v-for="contact in contacts"
            :key="contact.username"
            class="select-none cursor-pointer border border-mono-9 hover:border-transparent hover:bg-mono-12 hover:shadow-md duration-150 p-4 rounded-md"
            @click="promptTransferAmount(contact)"
          >
            <span class="font-semibold" v-text="contact.username" />
            <div class="capitalize text-mono-7">
              {{ contact.firstname }} {{ contact.lastname }}
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsView',
  computed: {
    ...mapGetters(['balance', 'contacts', 'fetching'])
  },
  methods: {
    promptTransferAmount(contact) {
      this.$modals.invoke({
        title: 'Transferencia Ualá',
        component: 'transfer-contact',
        componentPayload: contact,
        actions: [
          {
            id: 'cancel-trasnfer',
            role: 'secondary',
            level: 'normal',
            label: 'Cancelar',
            dismiss: true
          },
          {
            id: 'continue-trasnfer',
            role: 'primary',
            level: 'normal',
            label: 'Transferir',
            exec() {
              this.makeTransfer(this.payload, this.fixedAmount)
            }
          }
        ]
      })
    }
  }
}
</script>
