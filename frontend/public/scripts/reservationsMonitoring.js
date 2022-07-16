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
  <td>${data._id}</td>
  <td>${data.customerName.toUpperCase()}</td>
  <td>${data.roomNumber.roomNumber}</td>
  <td>${data.roomType.roomType.roomTypeName}</td>
  <td>${data.contactNumber}</td>
  <td>${data.email}</td>
  <td>${data.gender.toLowerCase()}</td>
  <td>${data.address}</td>
  <td>${new Date(data.checkInDate).toLocaleDateString('en-us')}</td>
  <td>${new Date(data.checkOutDate).toLocaleDateString('en-us')}</td>
  <td>${data.durationOfStay}</td>
  <td>${data.paymentMethod?.paymentMethodName}</td>
  <td>${data.balance}</td>
`
  if (new Date(data.checkInDate) > new Date(Date.now())) {
    tbody[1].appendChild(tableRowData)
  } else {
    tbody[0].appendChild(tableRowData)
  }
})
