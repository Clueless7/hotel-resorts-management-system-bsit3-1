// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room maintenance/manage
const roomDropDown = document.querySelector('.roomDropDown')
const roomContainer = document.querySelector('.room-container')
const roomFormButtonsContainer = document.querySelector('.room')
const roomFormButtons = document.querySelectorAll('.room button')
const form = document.querySelector('.content form')

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/rooms')

  response.forEach((data) => {
    const roomOptions = document.createElement('option')
    if (data.roomNumber) {
      roomOptions.value = data.roomNumber
      roomOptions.innerHTML = `Room ${data.roomNumber}`
      roomDropDown.append(roomOptions)
    }
  })

  const roomAdd = document.createElement('option')
  roomAdd.value = 'Add new Room'
  roomAdd.innerHTML = 'Add new Room'
  roomDropDown.append(roomAdd)
}

roomDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new Room') {
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
  const containerContent = `Room Number: <input type='Number' name='roomNumber' required> 
                            Room Type: <select name='room-type' id='roomTypeDropDown' required>
                            </select><br>
                            Bed: <select name='room-bed' id='roomBedDropDown' required>
                            </select><br>
                            Room Status: <select name='room-status' required>
                            <option value='true'>Vacant</option>
                            <option value='false'>Occupied</option>
                            </select><br>`
  roomContainer.innerHTML = containerContent

  roomFormButtons.forEach((button) => {
    if (button.innerHTML === 'DELETE' || button.innerHTML === 'EDIT') {
      button.setAttribute('style', `display:${display1}`)
    } else if (button.innerHTML === 'ADD') {
      button.setAttribute('style', `display:${display2}`)
    }
  })

  const roomTypeDropDown = document.querySelector('#roomTypeDropDown')
  const roomBedDropDown = document.querySelector('#roomBedDropDown')

  roomTypeDynamicDropDown(roomTypeDropDown)
  roomBedDynamicDropDown(roomBedDropDown)

  const addButton = document.querySelector(
    '.newroom-btn-group.room > a:nth-child(5) > button'
  )
  addButton.addEventListener('click', (e) => {
    e.preventDefault()
    createRoom()
    form.reset()
  })
}

async function roomTypeDynamicDropDown(dropDown) {
  const response = await getData('http://localhost:3000/api/rooms/types')

  response.forEach((data) => {
    const roomTypeOption = document.createElement('option')

    if (data.roomTypeName) {
      roomTypeOption.value = `${data.roomTypeName}`
      roomTypeOption.innerHTML = `${data.roomTypeName}`
      dropDown.append(roomTypeOption)
    }
  })
}

async function roomBedDynamicDropDown(dropDown) {
  const response = await getData('http://localhost:3000/api/beds')

  response.forEach((data) => {
    const roomBedOption = document.createElement('option')
    if (data.bedType) {
      roomBedOption.value = `${data.bedType.bedTypeName}`
      roomBedOption.innerHTML = `${data.bedType.bedTypeName}`
      dropDown.append(roomBedOption)
    }
  })
}

async function createRoom() {
  const roomNumberValue = document.querySelector(
    "input[name='roomNumber']"
  ).value
  const roomIsAvailableValue = document.querySelector(
    "select[name='room-status']"
  ).value
  const roomTypeValue = document.querySelector("select[name='room-type']").value
  const roomBedValue = document.querySelector("select[name='room-bed']").value
  let roomTypeObjectID
  let roomBedObjectID

  try {
    const roomTypes = await getData('http://localhost:3000/api/rooms/types')
    roomTypes.forEach((data) => {
      if (data.roomTypeName.toLowerCase() === roomTypeValue.toLowerCase()) {
        roomTypeObjectID = data._id
      }
    })

    const roomBed = await getData('http://localhost:3000/api/beds')
    roomBed.forEach((data) => {
      if (data.bedType) {
        if (
          data.bedType.bedTypeName.toLowerCase() === roomBedValue.toLowerCase()
        ) {
          roomBedObjectID = data._id
        }
      }
    })

    const dataPost = {
      roomNumber: roomNumberValue,
      roomIsAvailable: roomIsAvailableValue,
      roomType: roomTypeObjectID, // ObjectId
      roomBed: roomBedObjectID, // ObjectId
    }

    const response = await postData('http://localhost:3000/api/rooms', dataPost)

    if (response.message) {
      return swal('Error!', `${response.message}`, 'error')
    }

    swal('Success', 'Room successfully added', 'success')
  } catch (error) {
    swal('Error!', `${error}`, 'error')
  }
}
