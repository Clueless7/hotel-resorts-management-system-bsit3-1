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
    setSelectedBedData()
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
    if (button.id === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.id === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })

  const roomBedTypeDropDown = document.querySelector('#roomBedTypeDropDown')
  roomBedTypeDynamicDropDown(roomBedTypeDropDown)

  const deleteButton = document.querySelector('.room-bed #DELETE')
  const addButton = document.querySelector('.room-bed #ADD')
  const editButton = document.querySelector('.room-bed #EDIT')

  if (deleteButton) {
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault()
      deleteRoomBed()
    })
  }
  if (addButton) {
    addButton.addEventListener('click', (e) => {
      e.preventDefault()
      createRoomBed()
    })
  }
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault()
      editRoomBed()
    })
  }
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

async function setSelectedBedData() {
  const roomBedTypeDropDown = document.querySelector('#roomBedTypeDropDown')
  const roomBedQuantityInputElement = document.querySelector(
    "input[name='roomBedQuantity']"
  )
  const selectedBedName = roomBedDropDown.value

  const selectedBedInfo = await getData('http://localhost:3000/api/beds/')

  selectedBedInfo.forEach((data) => {
    if (data.bedType.bedTypeName == selectedBedName) {
      roomBedTypeDropDown.value =
        data.bedType.bedTypeName ?? 'Bed name does not exist'
      roomBedQuantityInputElement.value =
        data.bedQuantity ?? 'Bed size does not exist'
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
    text: 'Room bed successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function deleteRoomBed() {
  const roomBedResponse = await getData('http://localhost:3000/api/beds')
  let roomBedObjectId
  roomBedResponse.forEach((data) => {
    if (data.bedType) {
      if (data.bedType.bedTypeName == roomBedDropDown.value) {
        roomBedObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/beds/',
    `${roomBedObjectId}`
  )
  if (deleteResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error.message}`,
      showConfirmButton: true,
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Room bed successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editRoomBed() {
  const roomBedResponse = await getData('http://localhost:3000/api/beds')
  let roomBedObjectId
  roomBedResponse.forEach((data) => {
    if (data.bedType) {
      if (data.bedType.bedTypeName == roomBedDropDown.value) {
        roomBedObjectId = data._id
      }
    }
  })

  const roomBedTypeValue = document.querySelector(
    "select[name='roomBedType']"
  ).value
  const roomBedQuantityValue = document.querySelector(
    "input[name='roomBedQuantity']"
  ).value

  const roomBedTypes = await getData('http://localhost:3000/api/beds/types')
  let roomBedTypeObjectId

  roomBedTypes.forEach((data) => {
    if (data.bedTypeName) {
      if (data.bedTypeName.toLowerCase() === roomBedTypeValue.toLowerCase()) {
        roomBedTypeObjectId = data._id
      }
    }
  })

  const dataPost = {
    bedType: roomBedTypeObjectId,
    bedQuantity: roomBedQuantityValue,
    bedPrice: roomBedTypeObjectId,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/beds/',
    `${roomBedObjectId}`,
    dataPost
  )
  if (updateResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Bed successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
