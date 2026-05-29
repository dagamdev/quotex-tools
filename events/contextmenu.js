/**
 * 
 * @param {PointerEvent} ev
 */
function contextmenuEvent (ev) {
  if (featureStates.advancedContextMenu && location.pathname.includes('trade')) {
    ev.preventDefault()

    showCustomMenu(ev.clientX, ev.clientY)
  }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function showCustomMenu(x, y) {
  const customMenu = document.getElementById('qex-custommenu')

  if (customMenu) {
    customMenu.classList.add('show')

    if (x + customMenu.offsetWidth > window.innerWidth) x -= customMenu.offsetWidth
    if (y + customMenu.offsetHeight > window.innerHeight) y -= customMenu.offsetHeight

    customMenu.style.left = `${x}px`
    customMenu.style.top = `${y}px`
  }
}
