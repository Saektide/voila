<template>
  <div id="va_devtools">
    <div id="va_devtools_content" class="grid xl:grid-cols-2 gap-5">
      <dev-action-box
        v-for="actionData in developmentActions"
        :key="actionData.name"
        :action="actionData"
      />
    </div>
  </div>
</template>

<script>
import { developmentActions } from '~/utils/developmentActions'

export default {
  name: 'DevelopmentToolsView',
  data () {
    return {
      developmentActions
    }
  }
}
</script>
