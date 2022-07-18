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
const form = document.querySelector('form')

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
  const containerContent = `Payment Method Name: <input type='Text' name='paymentMethodName'> 
                            Payment Method status: <select name='paymentMethodIsOnline'>
                            <option value='Active'>Active</option>
                            <option value='Inactive'> Inactive</option>
                            </select>`
  paymentMethodContainer.innerHTML = containerContent
  paymentMethodFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })
  const deleteButton = document.querySelector(
    '.newroom-btn-group.paymentMethod > a:nth-child(3) > button'
  )
  const addButton = document.querySelector(
    '.newroom-btn-group.paymentMethod > a:nth-child(4) > button'
  )
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    deletePaymentMethod()
  })
  addButton.addEventListener('click', (e) => {
    e.preventDefault()
    createPaymentMethod()
    form.reset()
  })
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

  try {
    const response = await postData(
      'http://localhost:3000/api/paymentmethods/',
      dataPost
    )

    if (response.message) {
      return swal('Error!', `${response.message}`, 'error')
    }

    swal('Success', 'Room successfully added', 'success')
  } catch (error) {
    swal('Error!', `${error}`, 'error')
  }
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
    return swal('Error!', `${deleteResponse.message}`, 'error')
  }

  swal('Success', 'Payment method successfully deleted!', 'success')

  refreshPage()
}

function refreshPage() {
  location.href = 'http://localhost:3000/rooms(paymentManage).html'
}
