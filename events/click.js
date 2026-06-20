/**
 * 
 * @param {PointerEvent} ev
 */
async function clickEvent (ev) {
  // Eventos para modal panel
  if (!(ev.target instanceof HTMLElement)) return
  const modalPanel = getModalPanel()

  if (modalPanel && modalPanel.classList.contains('show-exq') && !modalPanel.contains(ev.target)) {
    modalPanel.classList.remove('show-exq')
  }

  const customMenu = document.getElementById('qex-custommenu')
  if (customMenu && !customMenu.contains(ev.target)) {
    customMenu.classList.remove('show')
  }

  const { id } = ev.target


  if (id === 'toggleCompactMode') {
    compactMode = !compactMode

    chrome.runtime.sendMessage({ action: 'updateData', data: {compactMode} }, (response) => {
      ev.target.textContent = compactMode ? 'Expandir' : 'Compactar'
      const modalPanel = document.querySelector('.modal-panel-exq')
      if (!modalPanel) return

      if (compactMode) {
        modalPanel.classList.add('compact-exq')
      } else {
        modalPanel.classList.remove('compact-exq')
      }
    })
  }

  if (id === 'setting-menu') {
    findAndClick(querys.advancedContextMenu.setting, 2)
  }

  if (id.includes('menu-draw')) {
    const index = +ev.target.dataset.index


    if (!isNaN(index)) {
      let drawItems = document.querySelectorAll(querys.advancedContextMenu.drawItem)
      const lang = location.pathname.slice(1, 3)
      const langDraws = LANG_LABELS[lang]?.draws

      if (drawItems.length) {
        if (drawItems){
          ;[...drawItems].find(di => di.textContent.trim().toLowerCase() == langDraws[id.replace('-menu-draw', '')].toLowerCase())?.click()
        } else {
          drawItems[index]?.click()
        }
        
        await findAndClick(querys.advancedContextMenu.drawButton, undefined)

      } else {
        const drawsButton = await findAndClick(querys.advancedContextMenu.drawButton, undefined)
        drawItems = document.querySelectorAll(querys.advancedContextMenu.drawItem)

        if (drawItems){
          ;[...drawItems].find(di => di.textContent.trim().toLowerCase() == langDraws[id.replace('-menu-draw', '')].toLowerCase())?.click()
        } else {
          drawItems[index]?.click()
        }

        drawsButton.click()
      }
    }
  }
}
