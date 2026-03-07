'use strict'

let lastResultTime = '', automationTimeout
const { host, pathname } = location

window.addEventListener("load", loadEvent)

/**
 * @param {'cleanInterface' | 'expirationByCandle'} feature 
 */
function toggleFeature (feature) {
  features[feature] = !features[feature]

  handleCleanInterface()

  console.log(features)
}

function handleCleanInterface () {
  if (features.cleanInterface) {
    document.body.classList.add('cleanInterface')
  } else {
    document.body.classList.remove('cleanInterface')
  }
}
