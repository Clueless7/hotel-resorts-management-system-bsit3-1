import { getData } from './fetch.js'

const tbody = document.querySelector('table tbody')
const response = await getData('http://localhost:3000/api/services')
tbody.children[0].remove()

response.forEach((data, index) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${data.serviceName ?? 'Services name does not exist'}</td>
    <td>${data.servicePrice ?? 'Service price does not exist'}</td>
  `
  tbody.appendChild(tableRowData)
})
