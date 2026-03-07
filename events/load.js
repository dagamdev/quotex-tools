function loadEvent () {
  
  chrome.runtime.sendMessage({ action: 'getFeatures', host }, (response) => {
    features = response.features
    console.log(features)

    handleCleanInterface()
  })

  // const observer = new MutationObserver(() => {
  //   if (!ennable) return

  //   const query = 'button.botonAceptar[data-dismiss="modal"]'
  //   const button = document.querySelector(query)

  //   if (button) {
  //     button.click()
  //     observer.disconnect()
  //   } else {
  //     console.log('Boton no encontrado, query: ', query)
  //   }
  // })

  // observer.observe(document.body, {
  //   childList: true,
  //   subtree: true
  // })
}
