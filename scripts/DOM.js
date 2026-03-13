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
async function findAndClick (query, attempts = 1000, index) {
  let count = 0
  
  while (attempts ? count < attempts : typeof attempts === 'undefined') {
    // console.log(query)
    const element = index ? document.querySelectorAll(query)?.[index] : document.querySelector(query)
  
    if (element) {
      // console.log(element)
      element.click()
      return element
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    if (attempts) {
      count++
    }
  }
}