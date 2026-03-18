function initialice () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    if (response.featureStates) featureStates = response.featureStates
    if (response.theme) theme = response.theme
    
    featureKeys.forEach(featureKey => {
      const state = featureStates[featureKey]
      toggleClasses(featureKey, state)
      
      const handler = handlers[featureKey]
      if (handler) handler(state, false)
    })
  
    loadedPage = true
  })
  
  updateBrokerTheme(document.documentElement.className)
}

function updateData () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    if (response.theme) theme = response.theme
    
    
    if (response.featureStates) {
      featureKeys.forEach(featureKey => {
        const newState = response.featureStates[featureKey]
        toggleFeature(featureKey, newState)
      })
    }
  })

  updateBrokerTheme(document.documentElement.className)
}

function manageBrokerThemes () {
  document.querySelectorAll(querys.deepDarkMode.themeOptions).forEach((element, i) => {
    if (i === 2) return
    element.addEventListener('click', e => {
      if (featureStates.deepDarkMode) {
        e.preventDefault()
      }
    })
    element.title = `Desactiva la función "${features.deepDarkMode.name}" para poder cambiar entré los temas del Broker`
  })
}

/**
 * 
 * @param {string} newTheme 
 */
function updateBrokerTheme (newTheme) {
  if (loadedPage && !featureStates.deepDarkMode) {
    theme = newTheme
    chrome.runtime.sendMessage({ action: 'updateTheme', theme: newTheme })
  }
}
