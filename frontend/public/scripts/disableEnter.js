document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    return false
  }
})
