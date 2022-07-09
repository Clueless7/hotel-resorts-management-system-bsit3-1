let today = new Date().toISOString().split('T')[0];
document.querySelector('#inputCheckInDate').setAttribute('min', today);
document.querySelector('#inputCheckInDate').setAttribute('value', today);