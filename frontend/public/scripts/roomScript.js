// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'

// Room maintenance/manage
const roomDropDown = document.querySelector('.roomDropDown')
const roomContainer = document.querySelector('.room-container')
const roomFormButtonsContainer = document.querySelector('.room')
const roomForm = document.querySelector('.content form')
const roomFormButtons = document.querySelectorAll('.room button')

roomDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new room') {
    roomContainerDisplay('block', 'flex')
    roomContainerChange('none', 'block')
  } else if (event.target.value === '-') {
    roomContainerDisplay('none', 'none')
  } else {
    roomContainerDisplay('block', 'flex')
    roomContainerChange('block', 'none')
  }
})

function roomContainerDisplay(display, buttonDisplay) {
  roomContainer.setAttribute('style', `display:${display}`)
  roomFormButtonsContainer.setAttribute('style', `display:${buttonDisplay}`)
}

function roomContainerChange(display1, display2) {
  const containerContent = `Room Number: <input type='Number' name='roomNumber'> 
                            Room Status: <select name="room-status">
                            <option value="true">Vacant</option>
                            <option value="false">Occupied</option>
                            </select><br>
                            Price: <input type="text" class="input">`
  roomContainer.innerHTML = containerContent

  roomFormButtons.forEach((button) => {
    if (button.innerHTML === 'DELETE' || button.innerHTML === 'EDIT') {
      button.setAttribute('style', `display:${display1}`)
    } else if (button.innerHTML === 'ADD') {
      button.setAttribute('style', `display:${display2}`)
    }
  })
}
