// import fetch.js
import { getData, postData, putData, deleteData } from './fetch.js'
// Room type maintenance/manage
const bedTypeDropDown = document.querySelector('.bedTypeDropDown')
const bedTypeContainer = document.querySelector('.bedType-container')
const bedTypeFormButtonsContainer = document.querySelector('.bed-type')
const bedTypeFormButtons = document.querySelectorAll('.bed-type button')

dynamicDropDown()

async function dynamicDropDown() {
  const response = await getData('http://localhost:3000/api/beds/types')
  response.forEach((data) => {
    const bedTypeOptions = document.createElement('option')
    if (data.bedTypeName) {
      bedTypeOptions.value = data.bedTypeName
      bedTypeOptions.innerHTML = `${data.bedTypeName}`
      bedTypeDropDown.append(bedTypeOptions)
    }
  })

  const bedTypeAdd = document.createElement('option')
  bedTypeAdd.value = 'Add new bed type'
  bedTypeAdd.innerHTML = 'Add new bed type'
  bedTypeDropDown.append(bedTypeAdd)
}

bedTypeDropDown.addEventListener('change', (event) => {
  if (event.target.value === 'Add new bed type') {
    bedTypeContainerDisplay('block', 'flex')
    bedTypeContainerChange('ADD', 'EDIT', 'none')
  } else if (event.target.value === '-') {
    bedTypeContainerDisplay('none', 'none')
  } else {
    bedTypeContainerDisplay('block', 'flex')
    bedTypeContainerChange('EDIT', 'ADD', 'block')
  }
})

function bedTypeContainerDisplay(display, buttonsDisplay) {
  bedTypeContainer.setAttribute('style', `display:${display}`)
  bedTypeFormButtonsContainer.setAttribute('style', `display:${buttonsDisplay}`)
}

function bedTypeContainerChange(newVal, oldVal, display) {
  const containerContent = `Bed Type Name: <input type='Text' name='bedTypeName'> 
                            Bed Type Size: <input type='Text' name='bedTypeSize'> 
                            Bed Type Price: <input type='Number' name='bedTypePrice'>`
  bedTypeContainer.innerHTML = containerContent
  bedTypeFormButtons.forEach((button) => {
    if (button.innerHTML === `${oldVal}`) {
      button.innerHTML = `${newVal}`
    } else if (button.innerHTML === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    }
  })
  const addButton = document.querySelector(
    '.newroom-btn-group.bed-type > a:nth-child(4) > button'
  )
  addButton.addEventListener('click', (e) => {
    e.preventDefault()
    createBedType()
    form.reset()
  })
}

async function createBedType() {
  const bedTypeNameValue = document.querySelector(
    "input[name='bedTypeName']"
  ).value
  const bedTypeSizeValue = document.querySelector(
    "input[name='bedTypeSize']"
  ).value
  const bedTypePriceValue = document.querySelector(
    "input[name='bedTypePrice']"
  ).value

  try {
    const dataPost = {
      bedTypeName: bedTypeNameValue,
      bedTypeSize: bedTypeSizeValue,
      bedTypePrice: bedTypePriceValue,
    }

    const response = await postData(
      'http://localhost:3000/api/beds/types',
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
