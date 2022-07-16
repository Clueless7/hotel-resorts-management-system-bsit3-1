import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelector('table tbody')
const response = await getData('http://localhost:3000/api/rooms/types')
tbody.children[0].remove()

// Insert the data
response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${data.roomTypeName}</td>
    <td>${data.roomTypePrice}</td>
  `
  tbody.appendChild(tableRowData)
})
