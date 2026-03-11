'use strict'

console.log('Quotex tools')

for (const key in features) {
  featureStates[key] = false
}

window.addEventListener("load", loadEvent)
document.addEventListener('visibilitychange', visibilitychange)

/**
 * @param {keyof typeof features} feature 
 */
function toggleFeature (feature) {
  featureStates[feature] = !featureStates[feature]

  addOrRemoveFeatureClass(feature)
  handleexpirationByCandle()
}

async function handleexpirationByCandle () {
  if (!featureStates.expirationByCandle) return
  const inputValue = getInputTimeValue()
  if (inputValue && inputValue.length < 6) return

  await findAndClick('.section-deal__time .input-control__label__switch')
  await findAndClick('.input-control__dropdown-option')

  handleexpirationByCandle()
}

/**
 * 
 * @param {keyof typeof features} featureName
 */
async function addOrRemoveFeatureClass (featureName) {
  const feature = features[featureName]
  
  if (!feature.requireClass) return
  const themeOptionsQuery = '.---react-features-Sidepanel-Settings-Theme-Item-styles-module__switch--MSldi'

  if (featureStates[featureName]) {
    document.body.classList.add(featureName)

    // theme
    if (featureName === 'deepDarkMode') {
      const result = await findAndClick(themeOptionsQuery, 1, 2)

      if (!result) {
        const configButton = await findAndClick('.---react-features-Sidebar-styles-module__settingsButton--DT1hj', undefined, 2)
        await findAndClick(themeOptionsQuery, undefined, 2)
        configButton.click()
      }
    }
  } else {
    document.body.classList.remove(featureName)

    // theme
    if (featureName === 'deepDarkMode') {
      const potionPosition = theme === 'dark' ? 1 : theme === 'light' ? 0 : 2
      if (potionPosition === 2) return
      const result = await findAndClick(themeOptionsQuery, 1, potionPosition)

      if (!result) {
        const configButton = await findAndClick('.---react-features-Sidebar-styles-module__settingsButton--DT1hj', undefined, 2)
        await findAndClick(themeOptionsQuery, undefined, potionPosition)
        configButton.click()
      }
    }
  }
}
