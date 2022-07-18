// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// set check in and check out dates
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
    calculateBalance(event, durationOfStay.value)
  })
  checkOutDate.addEventListener('change', (event) => {
    calculateDurationOfStay()
    calculateBalance(event, durationOfStay.value)
  })
}

function calculateDurationOfStay() {
  const date1 = new Date(checkOutDate.value)
  const date2 = new Date(checkInDate.value)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  durationOfStay.value = diffDays
  console.log(diffDays)
}

// Select elements for dropdowns
const newCheckInRoomNumberDropDown = document.querySelector('#roomNumber')
const newCheckInPaymentMethodDropDown = document.querySelector('#paymentMethod')
const durationOfStayElement = document.querySelector('#durationOfStay')
const checkInNewForm = document.querySelector('.content form')
const balanceElement = document.querySelector('#balance')
const addButton = document.querySelector('.form-buttons > button.add-btn')
let balance
dynamicDropDown()

addButton.addEventListener('click', (event) => {
  event.preventDefault()
  createReservation()
  checkInNewForm.reset()
})

newCheckInRoomNumberDropDown.addEventListener('change', (e) => {
  calculateBalance(e, durationOfStay.value)
})

async function calculateBalance(event, dOfStay) {
  const allRooms = await getData('http://localhost:3000/api/rooms')

  allRooms.forEach((data) => {
    if (data.roomNumber == event.target.value) {
      balance =
        (data.roomType ? data.roomType.roomTypePrice : 0) +
        (data.roomBed ? data.roomBed.bedPrice.bedTypePrice : 0)
    }
  })
  console.log(dOfStay)
  balanceElement.value = balance * dOfStay
}

async function dynamicDropDown() {
  const roomNumberResponse = await getData('http://localhost:3000/api/rooms')
  const paymentMethodResponse = await getData(
    'http://localhost:3000/api/paymentmethods'
  )

  roomNumberResponse.forEach((data) => {
    const newCheckInRoomNumberOption = document.createElement('option')
    if (data.roomNumber) {
      if (data.roomIsAvailable === true) {
        newCheckInRoomNumberOption.value = `${data.roomNumber}`
        newCheckInRoomNumberOption.innerHTML = `${data.roomNumber}`
        newCheckInRoomNumberDropDown.append(newCheckInRoomNumberOption)
      }
    }
  })

  paymentMethodResponse.forEach((data) => {
    const newCheckInPaymentMethodOption = document.createElement('option')
    if (data.paymentMethodName) {
      newCheckInPaymentMethodOption.value = `${data.paymentMethodName}`
      newCheckInPaymentMethodOption.innerHTML = `${data.paymentMethodName}`
      newCheckInPaymentMethodDropDown.append(newCheckInPaymentMethodOption)
    }
  })
}

// create a reservation

async function createReservation() {
  const customerNameValue = document.querySelector(
    "input[name='customerName']"
  ).value
  const contactNumberValue = document.querySelector(
    "input[name='contactNumber']"
  ).value
  const emailValue = document.querySelector("input[name='email']").value
  const genderValue = document.querySelector("select[name='gender']").value
  const addressValue = document.querySelector("input[name='address']").value
  const roomNumberValue = document.querySelector(
    "select[name='roomNumber']"
  ).value
  let roomObjectId
  const checkInDateValue = document.querySelector(
    "input[name='check-inDate']"
  ).value
  const checkOutDateValue = document.querySelector(
    "input[name='check-outDate']"
  ).value
  const durationOfStayValue = document.querySelector(
    "input[name='durationOfStay']"
  ).value
  const paymentMethodValue = document.querySelector(
    "select[name='paymentMethod']"
  ).value
  let paymentMethodId
  const balanceValue = document.querySelector("input[name='balance']").value
  let roomData

  const roomResponse = await getData('http://localhost:3000/api/rooms')
  const paymentMethodResponse = await getData(
    'http://localhost:3000/api/paymentmethods'
  )

  roomResponse.forEach((data) => {
    if (data.roomNumber) {
      if (data.roomNumber == roomNumberValue) {
        roomObjectId = data._id
        roomData = data
      }
    }
  })

  paymentMethodResponse.forEach((data) => {
    if (data.paymentMethodName) {
      if (
        data.paymentMethodName.toLowerCase() ===
        paymentMethodValue.toLowerCase()
      ) {
        paymentMethodId = data._id
      }
    }
  })

  try {
    const dataPost = {
      customerName: customerNameValue,
      contactNumber: contactNumberValue,
      email: emailValue,
      gender: genderValue,
      address: addressValue,
      roomNumber: roomObjectId, //ObjectId
      roomType: roomObjectId, //ObjectId
      roomBed: roomObjectId, //ObjectId
      checkInDate: checkInDateValue,
      checkOutDate: checkOutDateValue,
      durationOfStay: durationOfStayValue,
      balance: balanceValue,
      paymentMethod: paymentMethodId,
    }
    console.log(dataPost)

    const response = await postData(
      'http://localhost:3000/api/reservations/',
      dataPost
    )

    const isAvailable = 'false'

    const updateRoomIsAvailable = await putData(
      'http://localhost:3000/api/rooms/',
      `${roomObjectId}`,
      {
        roomNumber: roomData.roomNumber,
        roomIsAvailable: isAvailable,
        roomType: roomData.roomType._id,
        roomBed: roomData.roomBed._id,
      }
    )

    if (response.message) {
      return swal('Error!', `${response.message}`, 'error')
    }

    if (updateRoomIsAvailable.message) {
      return swal('Error!', `${updateRoomIsAvailable.message}`, 'error')
    }

    swal('Success', 'Reservation information successfully updated', 'success')
  } catch (error) {
    return swal('Error!', `${error.message}`, 'error')
  }
}
