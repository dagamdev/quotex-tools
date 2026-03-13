'use strict'

let tab
const hosts = [
  'https://qxbroker.com'
]

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  tab = tabs[0]

  localStorageGet(['featureStates', 'theme'], (result) => {
    if (result.featureStates) featureStates = result.featureStates
    theme = result.theme || 'black'

    const container = document.querySelector('.container')
    featureKeys.forEach(key => {
      const value = featureStates[key]
      const feature = features[key]
      
      container.insertAdjacentHTML('beforeend', 
        `<article class="feature${feature.inDevelopment ? ' disabled' : ''}"${feature.inDevelopment ? ` title="En desarrollo"` : ''}>
          <div class="feature-info">
            <div class="feature-title">${feature.name}</div>
            <div class="feature-desc">
              ${feature.description}
            </div>
          </div>

          <label class="switch">
            <input type="checkbox" id="${key}"${value ? ` checked="true"` : ''}>
            <span class="slider"></span>
          </label>
        </article>`
      )
    })

    document.body.classList.add(featureStates.deepDarkMode ? 'deepDarkMode' : theme)
  })
})


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

  const version = chrome.runtime.getManifest().version
  document.getElementById("version").textContent = "v" + version
})

document.addEventListener('change', ev => {
  if (!ev.target instanceof HTMLInputElement) return
  const { id } = ev.target

  if (featureKeys.some(fk => fk === id)) {
    const newValue = ev.target.checked
    featureStates[id] = newValue

    if (id === 'deepDarkMode') {
      console.log(id, newValue, theme)
      if (newValue) {
        document.body.className = 'deepDarkMode'
      } else {
        document.body.className = theme
      }
    }

    localStorageSet({ ['featureStates']: featureStates }, () => {
      if (hosts.every(h => !tab.url.includes(h))) return

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function(featureName, isActive) {
          toggleFeature(featureName, isActive)
        },
        args: [id, newValue]
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
