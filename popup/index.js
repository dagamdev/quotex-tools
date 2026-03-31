'use strict'

let compactMode = false

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

  const { name, version } = chrome.runtime.getManifest()
  document.getElementById('title').textContent = name
  document.getElementById('version').textContent = 'v' + version

  localStorageGet(null, (result) => {
    if (result.featureStates) featureStates = result.featureStates
    theme = result.theme || 'black'

    if (theme !== 'black' || featureStates.deepDarkMode) {
      document.body.classList.remove('black')
      document.body.classList.add(featureStates.deepDarkMode ? 'deepDarkMode' : theme)
    }

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

    updateActiveFeaturesCount()
    if (result.compactMode) {
      compactMode = result.compactMode
      document.body.classList.add('compact')
      document.getElementById('toggleCompactMode').textContent = compactMode ? 'Expandir' : 'Compactar'
    }

    document.body.classList.remove('hiden')
  })
})

document.addEventListener('change', ev => {
  if (!ev.target instanceof HTMLInputElement) return
  const { id } = ev.target

  if (featureKeys.some(fk => fk === id)) {
    const newValue = ev.target.checked
    featureStates[id] = newValue
    updateActiveFeaturesCount()

    if (id === 'deepDarkMode') {
      if (newValue) {
        document.body.classList.add('deepDarkMode')
        document.body.classList.remove(theme)
      } else {
        document.body.classList.add(theme)
        document.body.classList.remove('deepDarkMode')
      }
    }

    localStorageSet({ ['featureStates']: featureStates }, () => {
      chrome.tabs.query({ url: ["*://*.qxbroker.com/*"] }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {
            type: 'UPDATE_FEATURE',
            featureName: id,
            newState: newValue
          })
        })
      })
    })
  }
})

document.addEventListener('click', ev => {
  if (!ev.target instanceof HTMLInputElement) return
  const { id } = ev.target

  if (id === 'toggleCompactMode') {
    compactMode = !compactMode

    localStorageSet({ ['compactMode']: compactMode }, () => {
      ev.target.textContent = compactMode ? 'Expandir' : 'Compactar'
      if (compactMode) {
        document.body.classList.add('compact')
      } else {
        document.body.classList.remove('compact')
      }
    })
  }
})

function updateActiveFeaturesCount() {
  const active = Object.values(featureStates).filter(Boolean).length
  const total = featureKeys.length

  const element = document.getElementById("activeFeaturesCount")
  element.textContent = `${active} / ${total} funciones activas`
}
