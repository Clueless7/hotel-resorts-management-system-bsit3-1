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
      bedTypeOptions.value = `${data.bedTypeName}`
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
    setSelectedBedTypeData()
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
    if (button.id === `${oldVal}`) {
      button.id = `${newVal}`
      button.innerHTML = `${newVal}`
    } else if (button.id === 'DELETE') {
      button.setAttribute('style', `display:${display}`)
    } else {
    }
  })
  const deleteButton = document.querySelector('.bed-type #DELETE')
  const addButton = document.querySelector('.bed-type #ADD')
  const editButton = document.querySelector('.bed-type #EDIT')

  if (deleteButton) {
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault()
      deleteBedType()
    })
  }
  if (addButton) {
    addButton.addEventListener('click', (e) => {
      e.preventDefault()
      createBedType()
    })
  }
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault()
      editBedType()
    })
  }
}

async function setSelectedBedTypeData() {
  const bedTypeNameInputElement = document.querySelector(
    "input[name='bedTypeName']"
  )
  const bedTypeSizeInputElement = document.querySelector(
    "input[name='bedTypeSize']"
  )
  const bedTypePriceInputElement = document.querySelector(
    "input[name='bedTypePrice']"
  )
  const selectedBedIdName = bedTypeDropDown.value

  const selectedBedInfo = await getData('http://localhost:3000/api/beds/types')

  selectedBedInfo.forEach((data) => {
    if (data.bedTypeName == selectedBedIdName) {
      bedTypeNameInputElement.value =
        data.bedTypeName ?? 'Bed type name does not exist'
      bedTypeSizeInputElement.value =
        data.bedTypeSize ?? 'Bed type size does not exist'
      bedTypePriceInputElement.value =
        data.bedTypePrice ?? 'Bed type price does not exist'
    }
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
    text: 'Bed type successfully Added',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function deleteBedType() {
  const bedTypeResponse = await getData('http://localhost:3000/api/beds/types')
  let bedTypeObjectId
  bedTypeResponse.forEach((data) => {
    if (data.bedTypeName) {
      if (data.bedTypeName == bedTypeDropDown.value) {
        bedTypeObjectId = data._id
      }
    }
  })
  const deleteResponse = await deleteData(
    'http://localhost:3000/api/beds/types/',
    `${bedTypeObjectId}`
  )
  if (deleteResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Bed type successfully deleted',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}

async function editBedType() {
  const bedTypeResponse = await getData('http://localhost:3000/api/beds/types')
  let bedTypeObjectId
  bedTypeResponse.forEach((data) => {
    if (data.bedTypeName) {
      if (data.bedTypeName == bedTypeDropDown.value) {
        bedTypeObjectId = data._id
      }
    }
  })

  const bedTypeNameValue = document.querySelector(
    "input[name='bedTypeName']"
  ).value
  const bedTypeSizeValue = document.querySelector(
    "input[name='bedTypeSize']"
  ).value
  const bedTypePriceValue = document.querySelector(
    "input[name='bedTypePrice']"
  ).value

  const dataPost = {
    bedTypeName: bedTypeNameValue,
    bedTypeSize: bedTypeSizeValue,
    bedTypePrice: bedTypePriceValue,
  }

  const updateResponse = await putData(
    'http://localhost:3000/api/beds/types/',
    `${bedTypeObjectId}`,
    dataPost
  )
  if (updateResponse.message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#ff2e63',
    })
  }

  Swal.fire({
    icon: 'success',
    iconColor: '#54bab9',
    title: 'Success!',
    text: 'Bed type successfully updated!',
    showConfirmButton: true,
    confirmButtonColor: '#ff2e63',
  }).then((result) => {
    location.reload()
  })
}
