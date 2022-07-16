// Room type maintenance/manage
const roomBedDropDown = document.querySelector('.roomBedDropDown')
const roomBedContainer = document.querySelector('.roomBed-container')
const roomBedFormButtonsContainer = document.querySelector('.room-bed')
const roomBedFormButtons = document.querySelectorAll('.room-bed button')

roomBedDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new bed') {
    roomBedContainerDisplay('block', 'flex')
    roomBedContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    roomBedContainerDisplay('none', 'none')
  } else {
    roomBedContainerDisplay('block', 'flex')
    roomBedContainerChange('EDIT', 'ADD', 'block')
  }
})

function roomBedContainerDisplay(display, buttonsDisplay) {
  roomBedContainer.setAttribute('style', `display:${display}`)
  roomBedFormButtonsContainer.setAttribute('style', `display:${buttonsDisplay}`)
}

function roomBedContainerChange(newVal, oldVal, display) {
  const containerContent = `Room Bed: <input type='Text' name='roomBedType'> 
                            Room Bed Quantity: <input type='Number' name='roomBedQuantity'>
                            Room Bed Price: <input type='Number' name='roomBedPrice'>`
  roomBedContainer.innerHTML = containerContent
  roomBedFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })
}
