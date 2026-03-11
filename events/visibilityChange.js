/**
 * 
 * @param {Event} event 
 */
function visibilitychange () {
  if (document.visibilityState === 'visible') {
    iniallice()
  }
}