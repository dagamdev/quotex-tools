function loadEvent () {
  initialice()

  const timerClasses = ['KgDs6', 'RJgT7']

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return

        // Notifications
        if (featureStates.priceNotificationNavigation) {
          const query = querys.priceNotificationNavigation.notification
          const notification = node.matches(query) ? node : node.querySelector(query)

          if (notification) {
            const assetName = notification.querySelector(querys.priceNotificationNavigation.assetName).children.item(1).textContent
            
            notification.addEventListener('click', (e) => {
              if (!featureStates.priceNotificationNavigation) return
              if (e.target.closest(querys.priceNotificationNavigation.closeButton)) return

              const asset = document.querySelector(`#${CSS.escape(assetName)} .rKkq0`)

              asset?.click()
              notification.querySelector(querys.priceNotificationNavigation.closeButton)?.click()
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

        // notification payout
        if (featureStates.payoutChangeAlerts) {
          const { assetName: assetNameClass, assetPayout: assetPayoutClass } = querys.payoutChangeAlerts
          const assetName = node.matches(assetNameClass) ? node : node.querySelector(assetNameClass)
          const assetPayout = node.matches(assetPayoutClass) ? node : node.querySelector(assetPayoutClass)

          if (assetName && assetPayout) {
            currentAssetName = assetName?.textContent ?? ''
            currentAssetPayout = Number(assetPayout?.textContent.slice(0, 2) ?? '0')
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

  const observerTimer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type !== "characterData") return

      if (featureStates.blockLast30sOfCandle && mutation.target.parentElement.classList.contains(...timerClasses)) {
        const seconds = +mutation.target.nodeValue.slice(6)

        document.querySelectorAll(querys.blockLast30sOfCandle.tradeButton).forEach(button => {
          const bloqued = seconds >= 30 && seconds < 59
          
          if (bloqued && !button.disabled) {
            button.disabled = true
          } else if (button.disabled && !bloqued) {
            button.disabled = false
          }
        })
      }

      if (featureStates.payoutChangeAlerts && (!featureStates.superCleanMode) && mutation.target.parentElement.classList.contains('Pg7a_')) {
        const newValue = +mutation.target.nodeValue
        
        if (newValue === currentAssetPayout) return
        const assetName = mutation.target.parentElement.parentElement.querySelector('.T4GAK')?.textContent

        if (currentAssetName !== assetName) {
          currentAssetName = assetName
        } else {
          createNotification(newValue, assetName)
        }
        currentAssetPayout = newValue
      }
    })
  })

  observerTimer.observe(document.body, {
    characterData: true,
    childList: true,
    subtree: true
  })
}
