<template>
  <form action="#" class="w-full">
    <div class="flex flex-col gap-3">
      <settings-radio-input
        v-for="(option, optionIdx) in payload.options"
        :id="option.id"
        :key="optionIdx"
        :name="payload.name"
        :value="option.value"
        sector="transactions"
      >
        {{ option.label }}
      </settings-radio-input>
    </div>
  </form>
</template>

<script>

export default {
  name: 'ModalsUseDropdownOptions',
  props: {
    payload: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
