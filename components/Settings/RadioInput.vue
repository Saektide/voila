<template>
  <label
    class="text-mono-3 dark:text-mono-8 rounded-xl py-3 px-5 border w-full flex items-center justify-between cursor-pointer duration-100 select-none"
    :class="{
      'bg-blue-7 dark:bg-opacity-10 hover:bg-blue-6 border-blue-5 dark:border-opacity-50 text-blue-3 dark:text-blue-6': isChecked,
      'border-mono-9 dark:border-mono-3 hover:bg-mono-9 dark:hover:bg-mono-3': !isChecked
    }"
    :for="`settings-${id}`"
  >
    <input
      :id="`settings-${id}`"
      ref="radio"
      type="radio"
      :name="name"
      :value="value"
      hidden
      @change="handleRadio"
    >
    <span class="pointer-events-none">
      <slot />
    </span>
    <solid-check-icon v-if="isChecked" class="w-6" />
  </label>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SettingsRadioInput',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    sector: {
      type: String,
      default: 'settings'
    }
  },
  computed: {
    ...mapGetters({
      appSettings: 'settings/appSettings',
      transactionsFilters: 'transactions/filters'
    }),
    isChecked () {
      if (this.sector === 'transactions') {
        return this.transactionsFilters[this.name] === this.value
      }
      return this.appSettings[this.name]
    }
  },
  methods: {
    ...mapMutations({
      setSetting: 'settings/setSetting',
      transactionsFilterSet: 'transactions/setFilter',
      transactionsFilterDismiss: 'transactions/dismissFilter'
    }),
    handleRadio (event) {
      const { name, value } = event.target
      if (this.sector === 'transactions') {
        if (!value.length || value === null || !value) {
          return this.transactionsFilterDismiss(name)
        }
        this.transactionsFilterSet({
          filterName: name,
          filterValue: value
        })
      }
    }
  }
}
</script>
