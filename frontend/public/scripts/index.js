import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelector('.dashboard-table tbody')
const response = await getData('http://localhost:3000/api/reservations')
tbody.children[0].remove()

// Insert the data
response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${data.roomNumber.roomNumber}</td>
    <td>${new Date(data.checkInDate).toLocaleDateString('en-US')}</td>
    <td>${new Date(data.checkOutDate).toLocaleDateString('en-US')}</td>
  `
  if (new Date(data.checkInDate) > new Date(Date.now())) {
    tbody.appendChild(tableRowData)
  }
})
