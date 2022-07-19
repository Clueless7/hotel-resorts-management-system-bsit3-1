// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage
const serviceDropDown = document.querySelector('.serviceDropDown')
const serviceContainer = document.querySelector('.service-container')
const serviceFormButtonsContainer = document.querySelector('.service')
const serviceFormButtons = document.querySelectorAll('.service button')

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/services')
  response.forEach((data) => {
    const serviceOptions = document.createElement('option')
    if (data.serviceName) {
      serviceOptions.value = data.serviceName
      serviceOptions.innerHTML = `${data.serviceName}`
      serviceDropDown.append(serviceOptions)
    }
  })

  const serviceAdd = document.createElement('option')
  serviceAdd.value = 'Add new service'
  serviceAdd.innerHTML = 'Add new service'
  serviceDropDown.append(serviceAdd)
}

serviceDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new service') {
    serviceContainerDisplay('block', 'flex')
    serviceContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    serviceContainerDisplay('none', 'none')
  } else {
    serviceContainerDisplay('block', 'flex')
    serviceContainerChange('EDIT', 'ADD', 'block')
    getServiceData()
  }
})

function serviceContainerDisplay(display, buttonsDisplay) {
  serviceContainer.setAttribute('style', `display:${display}`)
  serviceFormButtonsContainer.setAttribute('style', `display:${buttonsDisplay}`)
}

function serviceContainerChange(newVal, oldVal, display) {
  const containerContent = `Service Name: <input type='Text' name='serviceName' required>
                            Service Price: <input type='Number' name='servicePrice' required>`
  serviceContainer.innerHTML = containerContent
  serviceFormButtons.forEach((button) => {
    if (button.id === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.id === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    } else {
    }
  })

  const deleteButton = document.querySelector('.service #DELETE')
  const addButton = document.querySelector('.service #ADD')
  const editButton = document.querySelector('.service #EDIT')

  if (addButton) {
    addButton.removeEventListener('click', editListener)
    addButton.removeEventListener('click', addListener)
    addButton.addEventListener('click', addListener)
  }
  if (editButton) {
    editButton.removeEventListener('click', addListener)
    editButton.removeEventListener('click', editListener)
    editButton.addEventListener('click', editListener)
  }
  if (deleteButton) {
    deleteButton.removeEventListener('click', deleteListener)
    deleteButton.addEventListener('click', deleteListener)
  }
}

function addListener(e) {
  e.preventDefault()
  createService()
}

function editListener(e) {
  e.preventDefault()
  editService()
}

function deleteListener(e) {
  e.preventDefault()
  deleteService()
}

async function getServiceData() {
  const serviceNameValue = document.querySelector("input[name='serviceName']")
  const servicePriceValue = document.querySelector("input[name='servicePrice']")
  const serviceResponse = await getData('http://localhost:3000/api/services')
  let serviceObjectId
  serviceResponse.forEach((data) => {
    if (data.serviceName) {
      if (data.serviceName == serviceDropDown.value) {
        serviceObjectId = data._id
      }
    }
  })
  const getDataById = await getData(
    'http://localhost:3000/api/services/',
    `${serviceObjectId}`
  )
  serviceNameValue.value = getDataById.serviceName
  servicePriceValue.value = getDataById.servicePrice
}

async function createService() {
  const serviceNameValue = document.querySelector(
    "input[name='serviceName']"
  ).value
  const servicePriceValue = document.querySelector(
    "input[name='servicePrice']"
  ).value

  const dataPost = {
    serviceName: serviceNameValue,
    servicePrice: servicePriceValue,
  }

  const response = await postData(
    'http://localhost:3000/api/services/',
    dataPost
  )

  if (response.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${response.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Service successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function deleteService() {
  const serviceResponse = await getData('http://localhost:3000/api/services')
  let deleteServiceObjectId
  serviceResponse.forEach((data) => {
    if (data.serviceName) {
      if (data.serviceName == serviceDropDown.value) {
        deleteServiceObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/services/',
    `${deleteServiceObjectId}`
  )
  if (deleteResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${deleteResponse.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Service successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editService() {
  const serviceResponse = await getData('http://localhost:3000/api/services')
  let editServiceObjectId
  serviceResponse.forEach((data) => {
    if (data.serviceName) {
      if (data.serviceName == serviceDropDown.value) {
        editServiceObjectId = data._id
      }
    }
  })

  const serviceNameValue = document.querySelector(
    "input[name='serviceName']"
  ).value
  const servicePriceValue = document.querySelector(
    "input[name='servicePrice']"
  ).value

  const dataPost = {
    serviceName: serviceNameValue,
    servicePrice: servicePriceValue,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/services',
    `${editServiceObjectId}`,
    dataPost
  )
  if (updateResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${updateResponse.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Service successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
