function loadEvent () {
  initialice()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return

        // Notifications
        if (featureStates.priceNotificationNavigation) {
          const query = '.notification-tracked-value'
          const notification = node.matches(query) ? node : node.querySelector(query)

          if (notification) {
            const assetName = notification.querySelector('.notification-tracked-value__header').children.item(1).textContent

            notification.addEventListener('click', (e) => {
              if (!featureStates.priceNotificationNavigation) return
              if (e.target.closest('.notification-tracked-value__close')) return

              const asset = document.querySelector(`#${CSS.escape(assetName)} .---react-pages-TradePage-components-ChartPanel-TopCorner-Tabs-Tab-styles-module__container--xaCSj`)

              asset?.click()
              notification.querySelector('.notification-tracked-value__close')?.click()
            })
          }
        }

        // deepDarkMode
        if (featureStates.deepDarkMode) {
          const query = querys.deepDarkMode.themeOptions
          const themeOption = node.matches(query) ? node : node.querySelector(query)

          if (themeOption) {
            manageBrokerThemes()
          }
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  document.addEventListener("keydown", async (e) => {
    if (featureStates.keyboardShortcuts) {
      if ( e.key !== '0' && e.ctrlKey && !isNaN(+e.key)) {
        e.preventDefault()
  
        const charts = document.querySelectorAll(querys.keyboardShortcuts.chartsOpen)
        const chart = charts.item(+e.key - 1)
  
        if (chart) chart.click()
      }
    }

    if (featureStates.timeframeHotkeys) {
      if ( e.key !== '0' && e.altKey && !isNaN(+e.key)) {
        e.preventDefault()

        const index = +e.key - 1
        const timeFrame = await findAndClick(querys.timeframeHotkeys.timeFrameOptions, 1, index)

        if (!timeFrame) {
          await findAndClick(querys.timeframeHotkeys.settingsItems, undefined, 1)
          await findAndClick(querys.timeframeHotkeys.timeFrameOptions, 30, index)
        }
      }
    }
  })


  // Themes
  const observerHTMLClass = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        updateBrokerTheme(mutation.target.className)
      }
    })
  })

  observerHTMLClass.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  })
}
