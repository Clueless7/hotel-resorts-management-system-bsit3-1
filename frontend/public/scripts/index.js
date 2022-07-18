import { getData } from './fetch.js'

// Select elements
const tbody = document.querySelector('.dashboard-table tbody')
const vacancyDisplayCount = document.querySelector('.vacancy-display-count')
const response = await getData('http://localhost:3000/api/reservations')
tbody.children[0].remove()

// Insert the data
let index = 0
response.forEach((data) => {
  const tableRowData = document.createElement('tr')
  tableRowData.innerHTML = `
    <td>${index + 1}</td>
    <td>${
      data.roomNumber
        ? data.roomNumber.roomNumber
        : 'Room number does not exist'
    }</td>
    <td>${new Date(data.checkInDate).toLocaleDateString('en-US')}</td>
    <td>${new Date(data.checkOutDate).toLocaleDateString('en-US')}</td>
  `
  if (new Date(data.checkInDate) > new Date(Date.now())) {
    tbody.appendChild(tableRowData)
    index++
  }
})

const vacantRooms = await getData('http://localhost:3000/api/rooms')

let numVacant = 0
vacantRooms.forEach((data) => {
  if (data.roomIsAvailable) {
    numVacant++
  }
})

vacancyDisplayCount.innerHTML = numVacant
