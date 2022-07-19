// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room maintenance/manage
const roomDropDown = document.querySelector('.roomDropDown')
const roomContainer = document.querySelector('.room-container')
const roomFormButtonsContainer = document.querySelector('.room')
const roomFormButtons = document.querySelectorAll('.room button')

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
    roomContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    roomContainerDisplay('none', 'none')
  } else {
    roomContainerDisplay('block', 'flex')
    roomContainerChange('EDIT', 'ADD', 'block')
    setSelectedRoomData()
  }
})

function roomContainerDisplay(display, buttonDisplay) {
  roomContainer.setAttribute('style', `display:${display}`)
  roomFormButtonsContainer.setAttribute('style', `display:${buttonDisplay}`)
}

function roomContainerChange(newVal, oldVal, display) {
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

  roomContainer.innerHTML = containerContent
  roomFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    } else {
    }
  })

  const roomTypeDropDown = document.querySelector('#roomTypeDropDown')
  const roomBedDropDown = document.querySelector('#roomBedDropDown')

  roomTypeDynamicDropDown(roomTypeDropDown)
  roomBedDynamicDropDown(roomBedDropDown)

  const deleteButton = document.querySelector('.room #DELETE')
  const addButton = document.querySelector('.room #ADD')
  const editButton = document.querySelector('.room #EDIT')

  if (addButton) {
    addButton.addEventListener('click', (e) => {
      e.preventDefault()
      createRoom()
    })
  }
  if (deleteButton) {
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault()
      deleteRoom()
    })
  }
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault()
      editRoom()
    })
  }
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

async function setSelectedRoomData() {
  const roomNumberDropDown = document.querySelector('.roomDropDown')
  const roomNumberInputElement = document.querySelector(
    "input[name='roomNumber']"
  )
  const roomTypeDropDown = document.querySelector('#roomTypeDropDown')
  const roomRoomBedDropDown = document.querySelector('#roomBedDropDown')
  const roomStatusDropDown = document.querySelector(
    "select[name='room-status']"
  )

  const selectedRoomNumberValue = roomNumberDropDown.value

  const selectedRoomInfo = await getData('http://localhost:3000/api/rooms')

  console.group(selectedRoomInfo)

  selectedRoomInfo.forEach((data) => {
    if (data.roomNumber == selectedRoomNumberValue) {
      roomNumberInputElement.value = data.roomNumber ?? '99'
      roomTypeDropDown.value =
        data.roomType.roomTypeName ?? 'Room price does not exist'
      roomRoomBedDropDown.value =
        data.roomBed.bedType.bedTypeName ?? 'Bed does not exist'
      roomStatusDropDown.value = data.roomIsAvailable
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

  const roomTypes = await getData('http://localhost:3000/api/rooms/types')
  roomTypes.forEach((data) => {
    if (data.roomTypeName.toLowerCase() === roomTypeValue.toLowerCase()) {
      roomTypeObjectID = data._id
    }
  })

  let roomBedData
  const roomBed = await getData('http://localhost:3000/api/beds')
  roomBed.forEach((data) => {
    if (data.bedType) {
      if (
        data.bedType.bedTypeName.toLowerCase() === roomBedValue.toLowerCase()
      ) {
        roomBedObjectID = data._id
        roomBedData = data
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

  console.log(roomBedData)
  if (response.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${response.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Room successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  })
    .then(async (result) => {
      const decrementBed = await putData(
        'http://localhost:3000/api/beds',
        `${roomBedData._id}`,
        {
          bedType: roomBedData.bedType._id,
          bedQuantity: roomBedData.bedQuantity - 1,
          bedPrice: roomBedData.bedType._id,
        }
      )

      if (decrementBed.message) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${decrementBed.message}`,
          showConfirmButton: true,
        })
      }
    })
    .then((result) => {
      location.reload()
    })
}

async function deleteRoom() {
  const roomResponse = await getData('http://localhost:3000/api/rooms')
  let roomObjectId
  roomResponse.forEach((data) => {
    if (data.roomNumber) {
      if (data.roomNumber == roomDropDown.value) {
        roomObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/rooms/',
    `${roomObjectId}`
  )
  if (deleteResponse.message) {
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
    text: 'Room successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editRoom() {
  const roomResponse = await getData('http://localhost:3000/api/rooms')
  let roomObjectId
  roomResponse.forEach((data) => {
    if (data.roomNumber) {
      if (data.roomNumber == roomDropDown.value) {
        roomObjectId = data._id
      }
    }
  })

  const roomNumberValue = document.querySelector(
    "input[name='roomNumber']"
  ).value
  const roomIsAvailableValue = document.querySelector(
    "select[name='room-status']"
  ).value

  const roomTypes = await getData('http://localhost:3000/api/rooms/types')
  let roomTypeObjectId

  roomTypes.forEach((data) => {
    if (data.roomTypeName) {
      if (
        data.roomTypeName.toLowerCase() === roomTypeDropDown.value.toLowerCase()
      ) {
        roomTypeObjectId = data._id
      }
    }
  })

  const roomBeds = await getData('http://localhost:3000/api/beds')
  let roomBedObjectId

  roomBeds.forEach((data) => {
    if (data.bedType) {
      if (
        data.bedType.bedTypeName.toLowerCase() ===
        roomBedDropDown.value.toLowerCase()
      ) {
        roomBedObjectId = data._id
      }
    }
  })

  const dataPost = {
    roomNumber: roomNumberValue,
    roomIsAvailable: roomIsAvailableValue ? 'true' : 'false',
    roomType: roomTypeObjectId,
    roomBed: roomBedObjectId,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/rooms',
    `${roomObjectId}`,
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
    text: 'Room successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
