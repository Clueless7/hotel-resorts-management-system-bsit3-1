const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  roomNumber: {
    type: Number,
    required: [true, 'Please add a room number'],
    unique: true,
  },
  roomIsAvailable: {
    type: Boolean,
    required: [true, 'Please indicate if room is available (true or false)'],
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add a room type'],
    ref: 'RoomType',
  },
  roomBed: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add a bed'],
    ref: 'Bed',
  },
})

module.exports = mongoose.model('Room', roomSchema)
