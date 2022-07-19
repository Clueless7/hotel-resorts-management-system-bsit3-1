import { getData, putData, deleteData } from './fetch.js'

// Select dropdowns, update button, and forms
const transactionIdDropDown = document.querySelector('#transactionId')
const roomNumberDropDown = document.querySelector('#roomNumber')
const paymentMethodDropDown = document.querySelector('#paymentMethod')
const updateButton = document.querySelector('.form-buttons > button.update-btn')
const deleteButton = document.querySelector('.form-buttons > button.delete-btn')
const balanceElement = document.querySelector('#balance')
const durationOfStayElement = document.querySelector('#durationOfStay')

let executed = false

// For duration of days computation
let today = new Date().toISOString().split('T')[0]
const checkInDate = document.querySelector('#check-inDate')
const checkOutDate = document.querySelector('#check-outDate')
let durationOfStay = document.querySelector('#durationOfStay')

setDates(today, checkInDate, checkOutDate)

function setDates(today, checkInDate, checkOutDate) {
  checkInDate.setAttribute('min', today)
  checkInDate.addEventListener('change', (event) => {
    checkOutDate.value = event.target.value
    checkOutDate.setAttribute('min', event.target.value)
    calculateDurationOfStay()
    calculateBalance2()
  })
  checkOutDate.addEventListener('change', (event) => {
    calculateDurationOfStay()
    calculateBalance2()
  })
}

function calculateDurationOfStay() {
  const date1 = new Date(checkOutDate.value)
  const date2 = new Date(checkInDate.value)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  durationOfStay.value = diffDays
}

// let balance

// async function calculateBalance(event, dOfStay) {
//   const balanceElement = document.querySelector('#balance')
//   const allRooms = await getData('http://localhost:3000/api/rooms')

//   allRooms.forEach((data) => {
//     if (data.roomNumber == event.target.value) {
//       balance =
//         (data.roomType ? data.roomType.roomTypePrice : 0) +
//         (data.roomBed ? data.roomBed.bedPrice.bedTypePrice : 0)
//     }
//   })
//   console.log(dOfStay)
//   console.log(balance)
//   balanceElement.value = balance * dOfStay
// }

dynamicDropDown()

async function calculateBalance2() {
  const currentRoomIdSelected = roomNumberDropDown.value
  const allRooms = await getData('http://localhost:3000/api/rooms')
  let balance
  let roomPrice
  let bedPrice
  let durationOfStay

  allRooms.forEach((data) => {
    if (data._id == currentRoomIdSelected) {
      roomPrice = data.roomType.roomTypePrice ?? 0
      bedPrice = data.roomBed.bedPrice.bedTypePrice ?? 0
      durationOfStay = durationOfStayElement.value ?? 0
    }
  })

  balance = (roomPrice + bedPrice) * durationOfStay
  balanceElement.value = balance
}

calculateBalance2()

// Update the contents of the dropdowns
async function dynamicDropDown() {
  const transactionIdOptions = await getData(
    'http://localhost:3000/api/reservations'
  )
  const roomOptions = await getData('http://localhost:3000/api/rooms')
  const paymentMethodsOptions = await getData(
    'http://localhost:3000/api/paymentmethods'
  )

  // Create dynamic dropdown for customer name
  transactionIdOptions.forEach((data) => {
    const transactionIdOption = document.createElement('option')
    if (data.customerName && data._id) {
      transactionIdOption.value = `${data._id}`
      transactionIdOption.innerHTML = `${data.customerName}`
      transactionIdDropDown.append(transactionIdOption)
    }
  })

  // Create dynamic dropdown for room numbers
  roomOptions.forEach((data) => {
    const roomOption = document.createElement('option')
    if (data.roomNumber && data._id) {
      // Only show available rooms
      if (data.roomIsAvailable) {
        roomOption.value = `${data._id}`
        roomOption.innerHTML = `${data.roomNumber}`
        roomNumberDropDown.append(roomOption)
      }
    }
  })

  // Create dynamic dropdown for payment methods
  paymentMethodsOptions.forEach((data) => {
    const paymentMethodsOption = document.createElement('option')
    if (data.paymentMethodName && data._id) {
      paymentMethodsOption.value = `${data._id}`
      paymentMethodsOption.innerHTML = `${data.paymentMethodName}`
      paymentMethodDropDown.append(paymentMethodsOption)
    }
  })

  addCurrentEditUserInfo()

  transactionIdDropDown.addEventListener('change', addCurrentEditUserInfo)
  roomNumberDropDown.addEventListener('change', calculateBalance2)
}

async function addCurrentEditUserInfo() {
  if (!executed) {
    executed = true
  }
  roomNumberDropDown.removeChild(roomNumberDropDown.firstElementChild)

  const transactionIdValue = document.querySelector('#transactionId').value
  const customerNameElement = document.querySelector('#customerName')
  const contactNumberElement = document.querySelector('#contactNumber')
  const emailElement = document.querySelector('#email')
  const genderElement = document.querySelector('#gender')
  const addressElement = document.querySelector('#address')
  const roomNumberElement = document.querySelector('#roomNumber')
  const checkInDateElement = document.querySelector('#check-inDate')
  const checkOutDateElement = document.querySelector('#check-outDate')
  const durationOfStayElement = document.querySelector('#durationOfStay')
  const paymentMethodElement = document.querySelector('#paymentMethod')
  const balanceElement = document.querySelector('#balance')

  const reservationUser = await getData(
    'http://localhost:3000/api/reservations',
    `${transactionIdValue}`
  )

  customerNameElement.value = `${
    reservationUser.customerName
      ? reservationUser.customerName
      : 'Customer name does not exist'
  }`
  contactNumberElement.value = `${
    reservationUser.contactNumber
      ? reservationUser.contactNumber
      : 'Contact number does not exist'
  }`
  emailElement.value = `${
    reservationUser.email ? reservationUser.email : 'Email does not exist'
  }`
  genderElement.value = `${
    reservationUser.gender ? reservationUser.gender : 'Gender does not exist'
  }`
  addressElement.value = `${
    reservationUser.address ? reservationUser.address : 'Address not exist'
  }`
  roomNumberElement.value = `${
    reservationUser.roomNumber?.roomNumber
      ? reservationUser.roomNumber.roomNumber
      : 'Room number does not exist'
  }`
  checkInDateElement.valueAsDate = new Date(`${reservationUser.checkInDate}`)
  checkOutDateElement.valueAsDate = new Date(`${reservationUser.checkOutDate}`)
  durationOfStayElement.value = `${
    reservationUser.durationOfStay
      ? reservationUser.durationOfStay
      : 'Duration of stay does not exist'
  }`
  paymentMethodElement.value = `${
    reservationUser.paymentMethod
      ? reservationUser.paymentMethod
      : 'Payment method does not exist'
  }`
  balanceElement.value = `${
    reservationUser.balance ? reservationUser.balance : 'Balance does not exist'
  }`

  const roomOption = document.createElement('option')
  roomOption.value = `${reservationUser.roomNumber?._id}`
  roomOption.innerHTML = `Current Room - ${
    reservationUser.roomNumber?.roomNumber ?? 'Room number does not exist'
  }`
  roomNumberDropDown.prepend(roomOption)
}

// Listen for click to put data
updateButton.addEventListener('click', (e) => {
  e.preventDefault()
  updateData()
})

// Get all values then call fetch
async function updateData() {
  const transactionIdValue = document.querySelector('#transactionId').value
  const customerNameValue = document.querySelector('#customerName').value
  const contactNumberValue = document.querySelector('#contactNumber').value
  const emailValue = document.querySelector('#email').value
  const genderValue = document.querySelector('#gender').value
  const addressValue = document.querySelector('#address').value
  const roomNumberValue = document.querySelector('#roomNumber').value
  const checkInDateValue = document.querySelector('#check-inDate').value
  const checkOutDateValue = document.querySelector('#check-outDate').value
  const durationOfStayValue = document.querySelector('#durationOfStay').value
  const paymentMethodValue = document.querySelector('#paymentMethod').value
  const balanceValue = document.querySelector('#balance').value

  const dataToPut = {
    customerName: customerNameValue,
    contactNumber: contactNumberValue,
    email: emailValue,
    gender: genderValue,
    address: addressValue,
    roomNumber: roomNumberValue,
    roomType: roomNumberValue,
    roomBed: roomNumberValue,
    checkInDate: checkInDateValue,
    checkOutDate: checkOutDateValue,
    durationOfStay: durationOfStayValue,
    balance: balanceValue,
    paymentMethod: paymentMethodValue,
  }

  let roomNumber
  let roomTypeId
  let roomBedId

  const roomInfo = await getData(
    'http://localhost:3000/api/rooms',
    `${roomNumberValue}`
  )

  roomNumber = roomInfo.roomNumber
  roomTypeId = roomInfo.roomType._id
  roomBedId = roomInfo.roomBed._id

  console.log(roomNumber)
  console.log(roomTypeId)
  console.log(roomBedId)

  if (roomInfo.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${response.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  const response = await putData(
    'http://localhost:3000/api/reservations',
    `${transactionIdValue}`,
    dataToPut
  )

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
    text: 'Reservation successfully updated',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  })
    .then(async (result) => {
      const isAvailable = 'false'

      const updateRoomIsAvailable = await putData(
        'http://localhost:3000/api/rooms',
        `${roomNumberValue}`,
        {
          roomNumber: roomNumber,
          roomIsAvailable: isAvailable,
          roomType: roomTypeId,
          roomBed: roomBedId,
        }
      )

      if (updateRoomIsAvailable.message) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${response.message}`,
          showConfirmButton: true,
        })
      }
    })
    .then((result) => {
      location.reload()
    })
}

deleteButton.addEventListener('click', (event) => {
  event.preventDefault()
  deleteReservation()
})

async function deleteReservation() {
  const transactionIdValue = document.querySelector('#transactionId').value
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/reservations/',
    `${transactionIdValue}`
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
    text: 'Reservation successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
