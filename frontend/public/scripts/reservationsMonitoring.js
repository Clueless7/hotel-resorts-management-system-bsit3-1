import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelectorAll('.table tbody')
const response = await getData('http://localhost:3000/api/reservations')

tbody.forEach((element) => {
  element.children[0].remove()
  // Insert the data
})

response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
  <td>${index + 1}</td>
  <td>${data._id ? data._id : 'Id does not exist'}</td>
  <td>${
    data.customerName
      ? data.customerName.toUpperCase()
      : 'Customer name does not exist'
  }</td>
  <td>${
    data.roomNumber ? data.roomNumber.roomNumber : 'Room number does not exist'
  }</td>
  <td>${
    data.roomType
      ? data.roomType.roomType.roomTypeName
      : 'Room type does not exist'
  }</td>
  <td>${
    data.contactNumber ? data.contactNumber : 'Contact number does not exist'
  }</td>
  <td>${data.email ? data.email : 'Email does not exist'}</td>
  <td>${data.gender ? data.gender.toLowerCase() : 'Gender does not exist'}</td>
  <td>${data.address ? data.address : 'Address does not exist'}</td>
  <td>${new Date(data.checkInDate).toLocaleDateString('en-us')}</td>
  <td>${new Date(data.checkOutDate).toLocaleDateString('en-us')}</td>
  <td>${
    data.durationOfStay
      ? data.durationOfStay
      : 'Duration of stay does not exist'
  }</td>
  <td>${
    data.paymentMethod
      ? data.paymentMethod.paymentMethodName
      : 'Payment method does not exist'
  }</td>
  <td>${data.balance ? data.balance : 'Balance does not exist'}</td>
`
  if (new Date(data.checkOutDate) >= new Date(Date.now())) {
    if (new Date(data.checkInDate) > new Date(Date.now())) {
      tbody[1].appendChild(tableRowData)
    } else {
      tbody[0].appendChild(tableRowData)
    }
  }
})
