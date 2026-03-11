'use strict'

console.log('Quotex tools')

window.addEventListener("load", loadEvent)

/**
 * @param {'cleanInterface' | 'expirationByCandle'} feature 
 */
function toggleFeature (feature) {
  features[feature] = !features[feature]

  handleCleanInterface()
  handleexpirationByCandle()
  handleSuperCleanMode()
}

function handleCleanInterface () {
  if (features.cleanInterface) {
    document.body.classList.add('cleanInterface')
  } else {
    document.body.classList.remove('cleanInterface')
  }
}

async function handleexpirationByCandle () {
  if (!features.expirationByCandle) return
  const inputValue = getInputTimeValue()
  if (inputValue && inputValue.length < 6) return

  await findAndClick('.section-deal__time .input-control__label__switch')
  await findAndClick('.input-control__dropdown-option')

  handleexpirationByCandle()
}

function handleSuperCleanMode () {
  if (features.superCleanMode) {
    document.body.classList.add('superCleanMode')
  } else {
    document.body.classList.remove('superCleanMode')
  }
}
