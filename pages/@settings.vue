<template>
  <div id="va_settings">
    <div id="va_settings_contents" class="flex flex-col gap-3">
      <settings-separator no-margin>
        Apariencia
      </settings-separator>
      <settings-checkbox id="darkMode" name="darkMode">
        Modo oscuro
      </settings-checkbox>
      <settings-separator>
        Privacidad
      </settings-separator>
      <settings-checkbox id="ninjaMode" name="ninjaMode">
        Ocultar tus nombres y usuario
      </settings-checkbox>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SettingsView',
  computed: {
    ...mapGetters({
      appSettings: 'settings/appSettings'
    })
  },
  methods: {
    ...mapMutations({
      setSetting: 'settings/setSetting'
    }),
    /**
     * @param {Event} e
     */
    handleChange (e) {
      const { checked, name } = e.target
      this.setSetting({ settingName: name, value: checked })
    }
  }
}
</script>
