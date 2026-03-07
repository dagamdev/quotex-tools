'use strict'

let tab
const hosts = [
  'https://qxbroker.com'
]
const featureKeys = Object.keys(features)

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  tab = tabs[0]

  localStorageGet(['features'], (result) => {
    if (!result.features) return

    featureKeys.forEach(key => {
      if (key in result.features) {
        const value = result.features[key]
        features[key] = value
        document.getElementById(key).checked = value
      }
    })
  })
})


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
})

document.addEventListener('change', ev => {
  if (!ev.target instanceof HTMLInputElement) return
  const { id } = ev.target

  if (featureKeys.some(fk => fk === id)) {
    const newValue = ev.target.checked
    features[id] = newValue

    localStorageSet({ ['features']: features }, () => {
      if (hosts.every(h => !tab.url.includes(h))) return

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function(featureKey) {
          toggleFeature(featureKey)
        },
        args: [id]
      })
    })
  }

  if (id === 'toggle') {
    ennable = !ennable
    document.getElementById('toggleSpan').textContent = ennable ? 'Deshabilitar' : 'Habilitar'
    
    localStorageSet({ ['toggle']: ennable }, () => {
      if (hosts.every(h => !tab.url.includes(h))) return

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function() {
          toggleScript()
        },
        args: []
      })
    })
  }

  if (id === 'startDelay') {
    const { value } = ev.target
    if (!value) return

    let startDelay = Number(value)
    if (isNaN(startDelay)) startDelay = 0

    localStorageSet({'startDelay': startDelay}, () => {
      if (hosts.every(h => !tab.url.includes(h))) return

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function(value) {
          updateStartDelay(value)
        },
        args: [startDelay]
      })
    })
  }
})
