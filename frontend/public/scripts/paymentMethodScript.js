// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage

const paymentMethodDropDown = document.querySelector('.paymentMethodDropDown')
const paymentMethodContainer = document.querySelector(
  '.paymentMethod-container'
)
const paymentMethodFormButtonsContainer =
  document.querySelector('.paymentMethod')
const paymentMethodFormButtons = document.querySelectorAll(
  '.paymentMethod button'
)

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/paymentmethods')
  response.forEach((data) => {
    const paymentMethodOptions = document.createElement('option')
    if (data.paymentMethodName) {
      paymentMethodOptions.value = data.paymentMethodName
      paymentMethodOptions.innerHTML = `${data.paymentMethodName}`
      paymentMethodDropDown.append(paymentMethodOptions)
    }
  })

  const paymentMethodAdd = document.createElement('option')
  paymentMethodAdd.value = 'Add new payment method'
  paymentMethodAdd.innerHTML = 'Add new payment method'
  paymentMethodDropDown.append(paymentMethodAdd)
}

paymentMethodDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new payment method') {
    paymentMethodContainerDisplay('block', 'flex')
    paymentMethodContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    paymentMethodContainerDisplay('none', 'none')
  } else {
    paymentMethodContainerDisplay('block', 'flex')
    paymentMethodContainerChange('EDIT', 'ADD', 'block')
    getPaymentMethodData()
  }
})

function paymentMethodContainerDisplay(display, buttonsDisplay) {
  paymentMethodContainer.setAttribute('style', `display:${display}`)
  paymentMethodFormButtonsContainer.setAttribute(
    'style',
    `display:${buttonsDisplay}`
  )
}

function paymentMethodContainerChange(newVal, oldVal, display) {
  const containerContent = `Payment Method Name: <input type='Text' name='paymentMethodName' required> 
                            Payment Method status: <select name='paymentMethodIsOnline' required>
                            <option value='Active'>Active</option>
                            <option value='Inactive'> Inactive</option>
                            </select>`
  paymentMethodContainer.innerHTML = containerContent
  paymentMethodFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    } else {
    }
  })
  const deleteButton = document.querySelector('.paymentMethod #DELETE')
  const addButton = document.querySelector('.paymentMethod #ADD')
  const editButton = document.querySelector('.paymentMethod #EDIT')

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
  createPaymentMethod()
}

function editListener(e) {
  e.preventDefault()
  editPaymentMethod()
}

function deleteListener(e) {
  e.preventDefault()
  deletePaymentMethod()
}
async function getPaymentMethodData() {
  const paymentMethodNameValue = document.querySelector(
    "input[name='paymentMethodName']"
  )
  const paymentMethodStatusValue = document.querySelector(
    "select[name='paymentMethodIsOnline']"
  )
  const paymentMethodResponse = await getData(
    'http://localhost:3000/api/paymentmethods'
  )
  let paymentMethodObjectId
  paymentMethodResponse.forEach((data) => {
    if (data.paymentMethodName) {
      if (data.paymentMethodName == paymentMethodDropDown.value) {
        paymentMethodObjectId = data._id
      }
    }
  })

  const getDataById = await getData(
    'http://localhost:3000/api/paymentmethods',
    `${paymentMethodObjectId}`
  )
  paymentMethodNameValue.value = getDataById.paymentMethodName
  paymentMethodStatusValue.value = getDataById.paymentMethodIsOnline
    ? 'Active'
    : 'Inactive'
}

async function createPaymentMethod() {
  const paymentMethodNameValue = document.querySelector(
    "input[name='paymentMethodName']"
  ).value
  const paymentMethodStatusValue =
    document.querySelector("select[name='paymentMethodIsOnline']").value ===
    'Inactive'
      ? 'false'
      : 'true'

  const dataPost = {
    paymentMethodName: paymentMethodNameValue,
    paymentMethodIsOnline: paymentMethodStatusValue,
  }

  const response = await postData(
    'http://localhost:3000/api/paymentmethods/',
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
    text: 'Payment method successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function deletePaymentMethod() {
  const paymentMethodResponse = await getData(
    'http://localhost:3000/api/paymentmethods'
  )
  let paymentMethodObjectId
  paymentMethodResponse.forEach((data) => {
    if (data.paymentMethodName) {
      if (data.paymentMethodName == paymentMethodDropDown.value) {
        paymentMethodObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/paymentmethods/',
    `${paymentMethodObjectId}`
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
    text: 'Payment method successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editPaymentMethod() {
  const paymentMethodResponse = await getData(
    'http://localhost:3000/api/paymentmethods'
  )
  let paymentMethodObjectId
  paymentMethodResponse.forEach((data) => {
    if (data.paymentMethodName) {
      if (data.paymentMethodName == paymentMethodDropDown.value) {
        paymentMethodObjectId = data._id
      }
    }
  })

  const paymentMethodNameValue = document.querySelector(
    "input[name='paymentMethodName']"
  ).value
  const paymentMethodStatusValue =
    document.querySelector("select[name='paymentMethodIsOnline']").value ===
    'Inactive'
      ? 'false'
      : 'true'

  const dataPost = {
    paymentMethodName: paymentMethodNameValue,
    paymentMethodIsOnline: paymentMethodStatusValue,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/paymentmethods',
    `${paymentMethodObjectId}`,
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
    text: 'Payment method successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
