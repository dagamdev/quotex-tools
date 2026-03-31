'use strict'

console.log('Quotex tools')

for (const key in features) {
  featureStates[key] = false
}

window.addEventListener("load", loadEvent)
document.addEventListener('visibilitychange', visibilitychange)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'UPDATE_FEATURE') {
    toggleFeature(msg.featureName, msg.newState)
  }
});
