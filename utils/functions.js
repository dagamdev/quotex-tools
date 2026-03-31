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
 * @param {keyof typeof features} featureName
 * @param {Boolean} newState
 */
function toggleFeature (featureName, newState) {
  const oldState = featureStates[featureName]
  if (oldState === newState) return

  toggleClasses(featureName, newState, oldState)
  featureStates[featureName] = newState

  const handler = handlers[featureName]
  if (handler) handler(newState, oldState)
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

/**
 * 
 * @param {number} newValue 
 * @param {string} assetName 
 * @param {string} currentAssetName 
 * @param {number} currentAssetPayout 
 */
function createNotification (newValue, assetName) {
  const isOlder = newValue > currentAssetPayout
  const container = document.querySelector(".qt-notifications-container")

  const notification = document.createElement('div')
  notification.className = `qt-notification ${isOlder ? 'success' : 'danger'}`
  notification.innerHTML = `
    <div class="qt-content">
      <span class="qt-icon">${isOlder ? '🟢' : '🔴'}</span>
      <div class="qt-text">
        <div class="qt-title">${currentAssetName} ${isOlder ? 'subió' : 'bajó'} de ${currentAssetPayout}% a ${newValue}%</div>
        <div class="qt-desc">${isOlder ? 'Mejor condición de pago' : 'Condición menos favorable'}</div>
      </div>
    </div>
    <button class="qt-close">✕</button>
  `

  const delay = 5_000
  let timeout = setTimeout(() => {
    notification.remove()
  }, delay)

  const closeBtn = notification.querySelector('.qt-close')
  closeBtn.addEventListener('click', () => {
    clearTimeout(timeout)
    notification.remove()
  })

  notification.addEventListener('mouseenter', () => {
    clearTimeout(timeout)
  })

  notification.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      notification.remove()
    }, delay)
  })

  container.appendChild(notification)
}
