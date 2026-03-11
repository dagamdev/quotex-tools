chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)

  if (message.action === 'getData') {
    chrome.storage.local.get([`featureStates`, 'theme'], (result) => {
      sendResponse(result)
    })

    return true
  }

  if (message.action === 'updateTheme') {
    chrome.storage.local.get([`theme`], ({theme}) => {
      if (theme !== message.theme) {
        chrome.storage.local.set({['theme']: message.theme})
      }
    })

    return true
  }
})