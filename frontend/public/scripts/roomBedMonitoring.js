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
    <td>${
      data.bedType ? data.bedType.bedTypeName : 'Bed type does not exist'
    }</td>
    <td>${
      data.bedPrice
        ? data.bedPrice.bedTypePrice
        : 'Bed type price does not exist'
    }</td>
    <td>${
      data.bedQuantity ? data.bedQuantity : 'Bed quantity does not exist'
    }</td>
  `
  tbody.appendChild(tableRowData)
})
