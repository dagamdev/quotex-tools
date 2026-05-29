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
    findAndClick(querys.deepDarkMode.configButton, 2, 2)
  }

  if (id.includes('menu-draw')) {
    const index = +ev.target.dataset.index

    if (!isNaN(index)) {
      const drawItem = await findAndClick(querys.advancedContextMenu.drawItem, 1, index)

      if (!drawItem) {
        const drawsButton = await findAndClick(querys.advancedContextMenu.drawButton, undefined)
        await findAndClick(querys.advancedContextMenu.drawItem, undefined, index)
        drawsButton.click()
      }
    }
  }
}
