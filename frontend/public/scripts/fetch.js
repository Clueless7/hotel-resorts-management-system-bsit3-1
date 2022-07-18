async function getData(url = '', id = '') {
  try {
    const response = await fetch(`${url}/${id}`)

    return response.json()
  } catch (error) {
    return error
  }
}

async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  } catch (error) {
    return error
  }
}

async function putData(url = '', id = '', data = {}) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  } catch (error) {
    return error
  }
}

async function deleteData(url = '', id = '') {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export { getData, postData, putData, deleteData }
