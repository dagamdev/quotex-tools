/**
 * @type {Record<FeatureKeys, (newState: boolean, oldState: boolean) => void | Promise<void>>}
 */
const handlers = {
  async expirationByCandle (newState, oldState = false) {
    if (!newState) return

    // await findAndClick('.section-deal__time .input-control__label__switch')
    // await findAndClick('.input-control__dropdown-option')
    await findAndClick('.HMRlv .GZg69')
    // await findAndClick('.input-control__dropdown-option')
  },
  async deepDarkMode (newState, oldState) {      
    if (newState) {
      const result = await findAndClick(querys.deepDarkMode.themeOptions, 1, 2)

      if (result) {
        manageBrokerThemes()
      } else {
        const configButton = await findAndClick(querys.deepDarkMode.configButton, undefined, 2)
        await findAndClick(querys.deepDarkMode.themeOptions, undefined, 2)
        configButton.click()
      }

      
    } else if (newState === false && newState !== oldState) {
      const potionPosition = theme === 'dark' ? 1 : theme === 'light' ? 0 : 2
      if (potionPosition === 2) return
      const result = await findAndClick(querys.deepDarkMode.themeOptions, 1, potionPosition)

      if (!result) {
        const configButton = await findAndClick(querys.deepDarkMode.configButton, undefined, 2)
        await findAndClick(querys.deepDarkMode.themeOptions, undefined, potionPosition)
        configButton.click()
      }
    }
  },
  blockLast30sOfCandle (newState, oldState) {
    if (newState !== oldState && !newState) {
      document.querySelectorAll(querys.blockLast30sOfCandle.tradeButton).forEach(button => {
        button.disabled = false
      })
    }
  },
  payoutChangeAlerts (newState, oldState) {
    if (newState) {
      document.body.insertAdjacentHTML('beforeend', '<div class="qt-notifications-container" />')
      currentAssetName = document.querySelector(querys.payoutChangeAlerts.actualAssetName)?.textContent ?? ''
      currentAssetPayout = Number(document.querySelector(querys.payoutChangeAlerts.actualAssetPayout)?.textContent.slice(0, 2) ?? '0')
    } else {
      const notificationContainer = document.querySelector('.qt-notifications-container')
      if (notificationContainer) notificationContainer.remove()
    }
  },
  async advancedContextMenu (newState, oldState) {
    if (newState) {
      const customMenu = document.createElement('div')
      customMenu.id = 'qex-custommenu'

      // <button id="savebtn">📸 Guardar imagen</button>
      // <button id="copybtn">📋 Copiar imagen</button>
      // <hr></hr>

      customMenu.innerHTML = `
        <div class="items">
          <button id="horizontalLine-menu-draw" data-index="1">Línea horizontal</button>
          <button id="verticalLine-menu-draw" data-index="6">Línea vertical</button>
          <button id="trendLine-menu-draw" data-index="9">Línea de tendencia</button>
          <button id="ray-menu-draw" data-index="19">Rayo</button>
          <hr></hr>
          <button id="setting-menu">⚙️ Configuración</button>
        </div>
      `
      document.body.appendChild(customMenu)
    } else {
      const notificationContainer = document.querySelector('.qt-notifications-container')
      if (notificationContainer) notificationContainer.remove()
    }
  }
}

/**
 * 
 * @param {keyof typeof features} featureName
 * @param {boolean} newState
 * @param {boolean} oldState
 */
async function toggleClasses (featureName, newState, oldState = false) {  
  if (newState === oldState) return
  const feature = features[featureName]
  if (!feature.requireClass) return

  if (newState) {
    document.body.classList.add(featureName)
  } else {
    document.body.classList.remove(featureName)
  }
}
