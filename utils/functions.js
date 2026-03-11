function iniallice () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    featureStates = response.featureStates
    theme = response.theme

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