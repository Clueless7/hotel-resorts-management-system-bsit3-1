// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage
const roomTypeDropDown = document.querySelector('.roomTypeDropDown')
const roomTypeContainer = document.querySelector('.roomtype-container')
const roomTypeFormButtonsContainer = document.querySelector('.roomtype')
const roomTypeFormButtons = document.querySelectorAll('.roomtype button')
const form = document.querySelector('form')

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

  const deleteButton = document.querySelector(
    '.newroom-btn-group.roomtype > a:nth-child(3) > button'
  )
  const addButton = document.querySelector(
    '.newroom-btn-group.roomtype > a:nth-child(4) > button'
  )

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    deleteRoomType()
  })

  addButton.addEventListener('click', (e) => {
    e.preventDefault()
    createRoomType()
    form.reset()
  })
}

async function createRoomType() {
  const roomTypeNameValue = document.querySelector(
    "input[name='roomTypeName']"
  ).value
  const roomTypePriceValue = document.querySelector(
    "input[name='roomTypePrice']"
  ).value

  try {
    const dataPost = {
      roomTypeName: roomTypeNameValue,
      roomTypePrice: roomTypePriceValue,
    }

    const response = await postData(
      'http://localhost:3000/api/rooms/types',
      dataPost
    )

    if (response.message) {
      return swal('Error!', `${response.message}`, 'error')
    }

    swal('Success', 'Room successfully added', 'success')
  } catch (error) {
    swal('Error!', `${error}`, 'error')
  }
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
    return swal('Error!', `${deleteResponse.message}`, 'error')
  }

  swal('Success', 'Room Type successfully deleted!', 'success')
  refreshPage()
}

function refreshPage() {
  location.href = 'http://localhost:3000/rooms(roomTypeManage).html'
}
