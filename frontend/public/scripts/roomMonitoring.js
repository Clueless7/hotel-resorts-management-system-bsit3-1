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
    <td>${data.roomNumber}</td>
    <td>${data.roomType.roomTypeName}</td>
    <td>${data.roomBed?.bedType?.bedTypeName}</td>
    <td>${data.roomIsAvailable ? 'Available' : 'Unavailable'}</td>
    <td>${data.roomBed.bedPrice.bedTypePrice + data.roomType.roomTypePrice}</td>
    `
  tbody.appendChild(tableRowData)
})
