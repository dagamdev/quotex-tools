'use strict'

console.log('Quotex tools')

for (const key in features) {
  featureStates[key] = false
}

window.addEventListener("load", loadEvent)
document.addEventListener('visibilitychange', visibilitychange)

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
