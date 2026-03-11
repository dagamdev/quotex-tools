function iniallice () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    if (response.featureStates) featureStates = response.featureStates
    if (response.theme) theme = response.theme

    for (const featureKey in features) {
      const feature = features[featureKey]
      if (feature.requireClass) {
        addOrRemoveFeatureClass(featureKey)
      }
    }
  })

  if (!featureStates.deepDarkMode) {
    chrome.runtime.sendMessage({ action: 'updateTheme', theme: document.documentElement.className })
  }
}