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
async function findElement (query, attempts = 1000, index) {
  let count = 0
  
  while (attempts ? count < attempts : typeof attempts === 'undefined') {
    // console.log(query)
    const element = index ? document.querySelectorAll(query)?.[index] : document.querySelector(query)
  
    if (element) {
      return element
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    if (attempts) {
      count++
    }
  }
}

/**
 * 
 * @param {String} query 
 * @param {Number?} attempts
 * @param {Number?} index
 */
async function findAndClick (query, attempts = 1000, index) {
  const element = await findElement(query, attempts, index)

  if (element) {
    element.click()
    return element
  }
}

function getModalPanel () {
  return document.querySelector('.modal-panel-exq')
}