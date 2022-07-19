// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage
const roomTypeDropDown = document.querySelector('.roomTypeDropDown')
const roomTypeContainer = document.querySelector('.roomtype-container')
const roomTypeFormButtonsContainer = document.querySelector('.roomtype')
const roomTypeFormButtons = document.querySelectorAll('.roomtype button')

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/rooms/types')
  response.forEach((data) => {
    const roomTypeOptions = document.createElement('option')
    if (data.roomTypeName) {
      roomTypeOptions.value = data.roomTypeName
      roomTypeOptions.innerHTML = `${data.roomTypeName}`
      roomTypeDropDown.append(roomTypeOptions)
    }
  })

  const roomTypeAdd = document.createElement('option')
  roomTypeAdd.value = 'Add new Room Type'
  roomTypeAdd.innerHTML = 'Add new Room Type'
  roomTypeDropDown.append(roomTypeAdd)
}

roomTypeDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new Room Type') {
    roomTypeContainerDisplay('block', 'flex')
    roomTypeContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    roomTypeContainerDisplay('none', 'none')
  } else {
    roomTypeContainerDisplay('block', 'flex')
    roomTypeContainerChange('EDIT', 'ADD', 'block')
  }

  setSelectedBedData()
})

function roomTypeContainerDisplay(display, buttonsDisplay) {
  roomTypeContainer.setAttribute('style', `display:${display}`)
  roomTypeFormButtonsContainer.setAttribute(
    'style',
    `display:${buttonsDisplay}`
  )
}

function roomTypeContainerChange(newVal, oldVal, display) {
  const containerContent = `Room Type Name: <input type='Text' name='roomTypeName' required> 
                            Room Type Price: <input type='Number' name='roomTypePrice' required>`
  roomTypeContainer.innerHTML = containerContent
  roomTypeFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    } else {
    }
  })

  const deleteButton = document.querySelector('.roomtype #DELETE')
  const addButton = document.querySelector('.roomtype #ADD')
  const editButton = document.querySelector('.roomtype #EDIT')

  if (addButton) {
    addButton.removeEventListener('click', editListener)
    addButton.removeEventListener('click', addListener)
    addButton.addEventListener('click', addListener)
  }
  if (editButton) {
    editButton.removeEventListener('click', addListener)
    editButton.removeEventListener('click', editListener)
    editButton.addEventListener('click', editListener)
  }
  if (deleteButton) {
    deleteButton.removeEventListener('click', deleteListener)
    deleteButton.addEventListener('click', deleteListener)
  }
}

function addListener(e) {
  e.preventDefault()
  createRoomType()
}

function editListener(e) {
  e.preventDefault()
  editRoomType()
}

function deleteListener(e) {
  e.preventDefault()
  deleteRoomType()
}

async function setSelectedBedData() {
  const roomTypeNameInputElement = document.querySelector(
    "input[name='roomTypeName']"
  )
  const roomTypePriceInputElement = document.querySelector(
    "input[name='roomTypePrice']"
  )
  const selectedRoomTypeNameValue = roomTypeDropDown.value

  const selectedRoomTypeInfo = await getData(
    'http://localhost:3000/api/rooms/types'
  )

  selectedRoomTypeInfo.forEach((data) => {
    if (data.roomTypeName == selectedRoomTypeNameValue) {
      roomTypeNameInputElement.value =
        data.roomTypeName ?? 'Room type name does not exist'
      roomTypePriceInputElement.value =
        data.roomTypePrice ?? 'Room price does not exist'
    }
  })
}

async function createRoomType() {
  const roomTypeNameValue = document.querySelector(
    "input[name='roomTypeName']"
  ).value
  const roomTypePriceValue = document.querySelector(
    "input[name='roomTypePrice']"
  ).value

  const dataPost = {
    roomTypeName: roomTypeNameValue,
    roomTypePrice: roomTypePriceValue,
  }

  const response = await postData(
    'http://localhost:3000/api/rooms/types',
    dataPost
  )

  if (response.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${response.message}`,
      showConfirmButton: true,
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Room type successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function deleteRoomType() {
  const roomTypeResponse = await getData(
    'http://localhost:3000/api/rooms/types'
  )
  let roomTypeObjectId
  roomTypeResponse.forEach((data) => {
    if (data.roomTypeName) {
      if (data.roomTypeName == roomTypeDropDown.value) {
        roomTypeObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/rooms/types/',
    `${roomTypeObjectId}`
  )
  if (deleteResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${deleteResponse.message}`,
      showConfirmButton: true,
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Room type successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editRoomType() {
  const roomTypeResponse = await getData(
    'http://localhost:3000/api/rooms/types'
  )
  let roomTypeObjectId
  roomTypeResponse.forEach((data) => {
    if (data.roomTypeName) {
      if (data.roomTypeName == roomTypeDropDown.value) {
        roomTypeObjectId = data._id
      }
    }
  })

  const roomTypeNameValue = document.querySelector(
    "input[name='roomTypeName']"
  ).value
  const roomTypePriceValue = document.querySelector(
    "input[name='roomTypePrice']"
  ).value
  const dataPost = {
    roomTypeName: roomTypeNameValue,
    roomTypePrice: roomTypePriceValue,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/rooms/types',
    `${roomTypeObjectId}`,
    dataPost
  )
  if (updateResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${updateResponse.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Room type successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
