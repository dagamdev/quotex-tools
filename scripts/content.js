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
}

function handleCleanInterface () {
  if (features.cleanInterface) {
    document.body.classList.add('cleanInterface')
  } else {
    document.body.classList.remove('cleanInterface')
  }
}

async function handleexpirationByCandle () {
  const inputValue = getInputTimeValue()
  if (inputValue && inputValue.length < 6) return

  await findAndClick('.section-deal__time .input-control__label__switch')
  await findAndClick('.input-control__dropdown-option')

  handleexpirationByCandle()
}
