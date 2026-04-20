'use strict'

console.log('Quotex tools')

for (const key in features) {
  featureStates[key] = false
}

window.addEventListener("load", loadEvent)
document.addEventListener('visibilitychange', visibilitychange)
window.addEventListener('resize', resizeEvent)
document.addEventListener('click', clickEvent)
document.addEventListener('change', changeEvent)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'UPDATE_FEATURE') {
    toggleFeature(msg.featureName, msg.newState)
  }

  if (msg.type === 'UPDATE_COMPACTMODE') {
    const modalPanel = document.querySelector('.modal-panel-exq')
    if (!modalPanel) return
    
    console.log(msg)
    compactMode = msg.newState

    compactMode ? 'Expandir' : 'Compactar'
    if (compactMode) {
      modalPanel.classList.add('compact-exq')
    } else {
      modalPanel.classList.remove('compact-exq')
    }
  }
})
