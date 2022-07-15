const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please Add Customer Name'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please Add Contact Number'],
  },
  email: {
    type: String,
    required: [true, 'Please Add an Email'],
    unique: true,
  },
  gender: {
    type: String,
    required: [true, 'Please Add a Gender'],
  },
  address: {
    type: String,
    required: [true, 'Please Add Address'],
  },
  roomNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  checkInDate: {
    type: Date,
    required: [true, 'Please Add Check in date'],
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Please Add Check out date'],
  },
  durationOfStay: {
    type: Number,
    required: [true, 'Please Add Duration of Stay'],
  },
  balance: {
    type: Number,
    required: [true, 'Invalid balance'],
  },
})

module.exports = mongoose.model('Reservation', reservationSchema)
