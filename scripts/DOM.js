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
 */
async function findAndClick (query) {
  while (true) {
    console.log('loop: ', query)
    const element = document.querySelector(query)
  
    if (element) {
      element.click()
      console.log('elemento: ', element)
      return element
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}