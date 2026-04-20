/**
 * 
 * @param {Event} ev 
 */
function changeEvent (ev) {
  if (!ev.target instanceof HTMLInputElement) return
  const { id } = ev.target

  if (featureKeys.some(fk => fk === id)) {
    const newValue = ev.target.checked

    if (location.pathname.includes('index.html')) {
      featureStates[id] = newValue
      if (id === 'deepDarkMode') {
        if (newValue) {
          document.body.classList.add('deepDarkMode')
          document.body.classList.remove(theme)
        } else {
          document.body.classList.add(theme)
          document.body.classList.remove('deepDarkMode')
        }
      }

      localStorageSet({ 'featureStates': featureStates }, () => {
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
    } else {
      // Envio los datos actualizados aun no actualizando la variable por que fallan otras cosas
      chrome.runtime.sendMessage({ action: 'updateData', data: {featureStates: {...featureStates, [id]: newValue}} }, () => {
        toggleFeature(id, newValue)
      })
    }

    updateActiveFeaturesCount()
  }
}

function updateActiveFeaturesCount() {
  const active = Object.values(featureStates).filter(Boolean).length
  const total = featureKeys.length

  const element = document.getElementById("activeFeaturesCount")
  element.textContent = `${active} / ${total} funciones activas`
}