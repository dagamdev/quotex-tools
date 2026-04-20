chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === 'getData') {
    chrome.storage.local.get(null, (result) => {
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

  if (message.action === 'updateData') {
    chrome.storage.local.set(message.data, sendResponse)

    return true
  }
})