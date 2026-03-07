chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)

  if (message.action === 'getFeatures') {
    chrome.storage.local.get([`features`], (result) => {
      sendResponse(result)
    })

    return true
  }
})