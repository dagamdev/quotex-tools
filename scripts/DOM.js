/**
 * 
 * @returns {String}
 */
function getInputTimeValue () {
  const input = document.querySelector('.section-deal__time .section-deal__input-control input')

  if (input) return input.value
  return ''
}

/**
 * 
 * @param {String} query 
 * @param {Number?} attempts
 * @param {Number?} index
 */
async function findAndClick (query, attempts, index) {
  let count = 0
  
  while (attempts ? count < attempts : typeof attempts === 'undefined') {
    const element = index ? document.querySelectorAll(query)?.[index] : document.querySelector(query)
  
    if (element) {
      element.click()
      return element
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    if (attempts) {
      count++
    }
  }
}