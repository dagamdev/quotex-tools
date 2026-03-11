function loadEvent () {
  iniallice()

  const observer = new MutationObserver((mutations) => {
    const switchQuery = '.section-deal__time .input-control__label__switch'
    let count = 0

    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return

        if (featureStates.expirationByCandle) {
          const switchTime = node.matches?.(switchQuery)
          ? node
          : node.querySelector?.(switchQuery)
          
          if (switchTime) {
            count++

            if (count === 2) {
              count = 0
              handleexpirationByCandle()
            }
          }

          const input = node.matches?.('.section-deal__time .section-deal__input-control input')
            ? node
            : node.querySelector?.('.section-deal__time .section-deal__input-control input')

          if (input) {
            count++

            if (count === 2) {
              count = 0
              handleexpirationByCandle()
            }
          }
        }

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
          const query = '.---react-features-Sidepanel-Settings-Theme-Item-styles-module__switch--MSldi'
          const themeOption = node.matches(query) ? node : node.querySelector(query)

          if (themeOption) {
            document.querySelectorAll('.---react-features-Sidepanel-Settings-Theme-Item-styles-module__switch--MSldi').forEach((element, i) => {
              if (i === 2) return
              element.addEventListener('click', e => {
                if (featureStates.deepDarkMode) {
                  e.preventDefault()
                }
              })
              element.title = `Desactiva la función "${features.deepDarkMode.name}" para poder cambiar entré los temas del Broker`
            })
          }
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  document.addEventListener("keydown", (e) => {
    if (!featureStates.keyboardShortcuts) return
    
    if (isNaN(+e.key) || e.key === '0' || !e.ctrlKey) return
    e.preventDefault()

    const charts = document.querySelectorAll('.---react-pages-TradePage-components-ChartPanel-TopCorner-Tabs-Tab-styles-module__container--xaCSj')
    const chart = charts.item(+e.key - 1)

    if (chart) chart.click()
  })


  // Themes
  const observerHTMLClass = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "class" && !featureStates.deepDarkMode) {
        chrome.runtime.sendMessage({ action: 'updateTheme', theme: mutation.target.className })
      }
    })
  })

  observerHTMLClass.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  })
}
