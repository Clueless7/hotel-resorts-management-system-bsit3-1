// Room type maintenance/manage
const paymentMethodDropDown = document.querySelector('.paymentMethodDropDown')
const paymentMethodContainer = document.querySelector(
  '.paymentMethod-container'
)
const paymentMethodFormButtonsContainer =
  document.querySelector('.paymentMethod')
const paymentMethodFormButtons = document.querySelectorAll(
  '.paymentMethod button'
)

paymentMethodDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new payment method') {
    paymentMethodContainerDisplay('block', 'flex')
    paymentMethodContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    paymentMethodContainerDisplay('none', 'none')
  } else {
    paymentMethodContainerDisplay('block', 'flex')
    paymentMethodContainerChange('EDIT', 'ADD', 'block')
  }
})

function paymentMethodContainerDisplay(display, buttonsDisplay) {
  paymentMethodContainer.setAttribute('style', `display:${display}`)
  paymentMethodFormButtonsContainer.setAttribute(
    'style',
    `display:${buttonsDisplay}`
  )
}

function paymentMethodContainerChange(newVal, oldVal, display) {
  const containerContent = `Payment Method Name: <input type='Text' name='paymentMethodName'> 
                            Payment Method status: <select name='paymentMethodIsOnline'>
                            <option value='Active'>Active</option>
                            <option value='Inactive'> Inactive</option>
                            </select>`
  paymentMethodContainer.innerHTML = containerContent
  paymentMethodFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })
}
