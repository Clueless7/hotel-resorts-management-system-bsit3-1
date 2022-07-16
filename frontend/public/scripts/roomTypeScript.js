// Room type maintenance/manage
const roomTypeDropDown = document.querySelector('.roomTypeDropDown')
const roomTypeContainer = document.querySelector('.roomtype-container')
const roomTypeFormButtonsContainer = document.querySelector('.roomtype')
const roomTypeFormButtons = document.querySelectorAll('.roomtype button')

roomTypeDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new room type') {
    roomTypeContainerDisplay('block', 'flex')
    roomTypeContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    roomTypeContainerDisplay('none', 'none')
  } else {
    roomTypeContainerDisplay('block', 'flex')
    roomTypeContainerChange('EDIT', 'ADD', 'block')
  }
})

function roomTypeContainerDisplay(display, buttonsDisplay) {
  roomTypeContainer.setAttribute('style', `display:${display}`)
  roomTypeFormButtonsContainer.setAttribute(
    'style',
    `display:${buttonsDisplay}`
  )
}

function roomTypeContainerChange(newVal, oldVal, display) {
  const containerContent = `Room Type Name: <input type='Text' name='roomTypeName'> 
                            Room Type Price: <input type='Number' name='roomTypePrice'>`
  roomTypeContainer.innerHTML = containerContent
  roomTypeFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })
}
