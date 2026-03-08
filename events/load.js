function loadEvent () {
  
  chrome.runtime.sendMessage({ action: 'getFeatures', host }, (response) => {
    features = response.features
    console.log(features)

    handleCleanInterface()
  })

  const observer = new MutationObserver((mutations) => {
    const switchQuery = '.section-deal__time .input-control__label__switch'
    let count = 0

    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return

        if (features.expirationByCandle) {
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
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
