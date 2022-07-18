import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelector('.table tbody')
const response = await getData('http://localhost:3000/api/rooms')

// Remove placeholder data
tbody.children[0].remove()

// Insert the data
response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${data.roomNumber ? data.roomNumber : 'Room number does not exist'}</td>
    <td>${
      data.roomType ? data.roomType.roomTypeName : 'Room type does not exist'
    }</td>
    <td>${
      data.roomBed ? data.roomBed.bedType.bedTypeName : 'Bed does not exist'
    }</td>
    <td>${data.roomIsAvailable ? 'Available' : 'Unavailable'}</td>
    <td>${
      (data.roomType ? data.roomType.roomTypePrice : 0) +
      (data.roomBed ? data.roomBed.bedPrice.bedTypePrice : 0)
    }</td>
    `
  tbody.appendChild(tableRowData)
})

// data.roomBed.bedPrice.bedTypePrice + data.roomType.roomTypePrice
