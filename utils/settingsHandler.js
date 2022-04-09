const settingsFunctions = {
  darkMode (settingValue) {
    if (settingValue) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

exports.settingsHandler = (settingsObject, Vue) => {
  Object.keys(settingsObject).forEach((keyName) => {
    if (!settingsFunctions[keyName] || typeof settingsFunctions[keyName] !== 'function') { return }
    settingsFunctions[keyName].bind(Vue, settingsObject[keyName])()
  })
}
