import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelector('.table tbody')
const response = await getData('http://localhost:3000/api/beds')
tbody.children[0].remove()

// Insert the data
response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${data.bedType.bedTypeName}</td>
    <td>${data.bedPrice.bedTypePrice}</td>
    <td>${data.bedQuantity}</td>
  `
  tbody.appendChild(tableRowData)
})
