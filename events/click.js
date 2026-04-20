/**
 * 
 * @param {PointerEvent} ev
 */
function clickEvent (ev) {
  // Eventos para modal panel
  if (!ev.target instanceof HTMLInputElement) return
  const modalPanel = getModalPanel()

  if (modalPanel && modalPanel.classList.contains('show-exq') && !modalPanel.contains(ev.target)) {
    modalPanel.classList.remove('show-exq')
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
}
