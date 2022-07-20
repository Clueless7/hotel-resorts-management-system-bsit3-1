import { getData } from './fetch.js'

const reservationsReportButton = document.querySelector('#reservations-report')
const roomsReportButton = document.querySelector('#rooms-report')
const tbodyReservations = document.querySelector('#reservations-table tbody')
const tbodyRooms = document.querySelector('#rooms-table')

const reservationsData = await getData('http://localhost:3000/api/reservations')
const roomsData = await getData('http://localhost:3000/api/rooms')

reservationsData.forEach((data, index) => {
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
      tbodyReservations.appendChild(tableRowData)
    }
  }
})

// Insert the data
roomsData.forEach((data, index) => {
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
  tbodyRooms.appendChild(tableRowData)
})

reservationsReportButton.addEventListener('click', downloadReservationReports)
roomsReportButton.addEventListener('click', downloadRoomsReports)

function downloadReservationReports() {
  let doc = new jsPDF({
    orientation: 'landscape',
  })

  doc.autoTable({
    html: '#reservations-table',
    styles: {
      cellPadding: 0.5,
      fontSize: 7,
    },

    startY: 25,
  })

  doc.text('Reservations Reports', 14, doc.lastAutoTable.finalY - 20)

  doc.save('reservation-reports.pdf')
}

function downloadRoomsReports() {
  let doc = new jsPDF({
    orientation: 'landscape',
  })

  doc.autoTable({
    html: '#rooms-table',
    startY: 25,
  })

  doc.text('Rooms Reports', 14, doc.lastAutoTable.finalY - 150)

  doc.save('rooms-reports.pdf')
}
