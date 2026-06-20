/**
 * @type {Record<FeatureKeys, (newState: boolean, oldState: boolean) => void | Promise<void>>}
 */
const handlers = {
  async expirationByCandle (newState, oldState = false) {
    if (!newState) return

    // await findAndClick('.section-deal__time .input-control__label__switch')
    // await findAndClick('.input-control__dropdown-option')
    await findAndClick('.F7y_9 .oKKPh')
    // await findAndClick('.input-control__dropdown-option')
  },
  advancedNotifications (newState, oldState = false) {
    if (newState) {
      const notification = `
        <div class="iuQNi">
          <div class="JvC_S">
            <svg class="icon-close"><use xlink:href="/profile/images/spritemap.svg#icon-close"></use></svg>
          </div>
          <div class="_UPSN">
            <div class="flags PmHi6">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 256 257" class="flag-gbp"><circle cx="128" cy="128" r="128" fill="#2e4ce5"></circle><mask id="a" width="256" height="256" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type: luminance;"><circle cx="128" cy="128" r="128" fill="#fff"></circle></mask><g fill="#91a0ec" fill-rule="evenodd" clip-rule="evenodd" mask="url(#a)"><path d="M132.671 1.317c46.252 22.533 69.995 71.799 69.995 126.923s-23.743 104.39-69.995 126.923l-9.343-19.179c36.949-18 58.005-58.335 58.005-107.744s-21.056-89.744-58.005-107.744z"></path><path d="M132.672 20.496c-36.949 18-58.005 58.335-58.005 107.744s21.056 89.744 58.005 107.744l-9.344 19.179C77.077 232.63 53.334 183.364 53.334 128.24S77.077 23.85 123.328 1.317z"></path><path d="M138.667 10.906v234.667h-21.334V10.906z"></path><path d="M245.333 138.907H10.667v-21.334h234.666z"></path><path d="M128 21.573c-58.91 0-106.667 47.756-106.667 106.667 0 58.91 47.757 106.666 106.667 106.666S234.667 187.15 234.667 128.24 186.91 21.573 128 21.573M0 128.24C0 57.547 57.308.24 128 .24s128 57.307 128 128c0 70.692-57.308 128-128 128S0 198.932 0 128.24"></path></g></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 256 257" class="flag-nzd"><circle cx="128" cy="128" r="128" fill="#2e4ce5"></circle><mask id="a" width="256" height="256" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type: luminance;"><circle cx="128" cy="128" r="128" fill="#fff"></circle></mask><g fill="#91a0ec" fill-rule="evenodd" clip-rule="evenodd" mask="url(#a)"><path d="M132.671 1.317c46.252 22.533 69.995 71.799 69.995 126.923s-23.743 104.39-69.995 126.923l-9.343-19.179c36.949-18 58.005-58.335 58.005-107.744s-21.056-89.744-58.005-107.744z"></path><path d="M132.672 20.496c-36.949 18-58.005 58.335-58.005 107.744s21.056 89.744 58.005 107.744l-9.344 19.179C77.077 232.63 53.334 183.364 53.334 128.24S77.077 23.85 123.328 1.317z"></path><path d="M138.667 10.906v234.667h-21.334V10.906z"></path><path d="M245.333 138.907H10.667v-21.334h234.666z"></path><path d="M128 21.573c-58.91 0-106.667 47.756-106.667 106.667 0 58.91 47.757 106.666 106.667 106.666S234.667 187.15 234.667 128.24 186.91 21.573 128 21.573M0 128.24C0 57.547 57.308.24 128 .24s128 57.307 128 128c0 70.692-57.308 128-128 128S0 198.932 0 128.24"></path></g></svg>
            </div>
            <div>GBP/NZD (OTC)</div>
          </div>
          <div>Precio alcanzado 1.90592</div>
        </div>
      `
      document.body.insertAdjacentHTML('beforeend', `<div class="advancedNotificationList">${notification}</div>`)
    } else {
      const notificationContainer = document.querySelector('.advancedNotificationList')
      if (notificationContainer) notificationContainer.remove()
    }
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
          <button id="fibonacciRetracement-menu-draw" data-index="7">Retroceso de Fibonacci</button>
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
