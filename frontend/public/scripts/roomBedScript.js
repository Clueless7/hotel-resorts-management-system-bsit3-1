// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage
const roomBedDropDown = document.querySelector('.roomBedDropDown')
const roomBedContainer = document.querySelector('.roomBed-container')
const roomBedFormButtonsContainer = document.querySelector('.room-bed')
const roomBedFormButtons = document.querySelectorAll('.room-bed button')

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/beds')
  response.forEach((data) => {
    const roomBedOptions = document.createElement('option')
    if (data.bedType) {
      roomBedOptions.value = data.bedType.bedTypeName
      roomBedOptions.innerHTML = `${data.bedType.bedTypeName}`
      roomBedDropDown.append(roomBedOptions)
    }
  })

  const roomBedAdd = document.createElement('option')
  roomBedAdd.value = 'Add new bed'
  roomBedAdd.innerHTML = 'Add new bed'
  roomBedDropDown.append(roomBedAdd)
}

roomBedDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new bed') {
    console.log(roomBedContainer)
    console.log(roomBedFormButtonsContainer)
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
  const containerContent = `Room Bed: <select name='roomBedType' id='roomBedTypeDropDown' required>
                            </select><br>
                            Room Bed Quantity: <input type='Number' name='roomBedQuantity'>`
  roomBedContainer.innerHTML = containerContent
  roomBedFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })

  const roomBedTypeDropDown = document.querySelector('#roomBedTypeDropDown')
  roomBedTypeDynamicDropDown(roomBedTypeDropDown)

  const addButton = document.querySelector(
    '.newroom-btn-group.room-bed > a:nth-child(4) > button'
  )
  addButton.addEventListener('click', (e) => {
    e.preventDefault()
    createRoomBed()
  })
}

async function roomBedTypeDynamicDropDown(dropDown) {
  const response = await getData('http://localhost:3000/api/beds/types')

  response.forEach((data) => {
    const roomBedTypeOption = document.createElement('option')
    if (data.bedTypeName) {
      roomBedTypeOption.value = `${data.bedTypeName}`
      roomBedTypeOption.innerHTML = `${data.bedTypeName}`
      dropDown.append(roomBedTypeOption)
    }
  })
}

async function createRoomBed() {
  const roomBedTypeValue = document.querySelector(
    "select[name='roomBedType']"
  ).value
  const roomBedQuantityValue = document.querySelector(
    "input[name='roomBedQuantity']"
  ).value
  let roomBedTypeObjectId

  try {
    const roomBedTypes = await getData('http://localhost:3000/api/beds/types')

    roomBedTypes.forEach((data) => {
      if (data.bedTypeName) {
        if (data.bedTypeName.toLowerCase() === roomBedTypeValue.toLowerCase()) {
          roomBedTypeObjectId = data._id
        }
      }
    })

    const dataPost = {
      bedType: roomBedTypeObjectId, //ObjectID
      bedQuantity: roomBedQuantityValue,
      bedPrice: roomBedTypeObjectId, //ObjectID
    }
    const response = await postData('http://localhost:3000/api/beds', dataPost)

    if (response.message) {
      return swal('Error!', `${response.message}`, 'error')
    }
    swal('Success', 'Bed successfully added', 'success')
  } catch (error) {
    swal('Error!', `${error}`, 'error')
  }
}
