/**
 * @type {Record<FeatureKeys, (newState: boolean, oldState: boolean) => void | Promise<void>>}
 */
const handlers = {
  async expirationByCandle (newState, oldState = false) {
    if (!newState) return

    // await findAndClick('.section-deal__time .input-control__label__switch')
    // await findAndClick('.input-control__dropdown-option')
    await findAndClick('.GZg69.lp1E6')
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
      currentAssetName = document.querySelector('.page__sidebar .T4GAK')?.textContent ?? ''
      currentAssetPayout = Number(document.querySelector('.page__sidebar .Pg7a_')?.textContent.slice(0, 2) ?? '0')
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
