const mongoose = require('mongoose')

const roomTypeSchema = mongoose.Schema({
  roomTypeName: {
    type: String,
    required: [true, 'Please add room type name'],
    unique: true,
  },
  roomTypePrice: {
    type: Number,
    required: [true, 'Please add room type price'],
  },
})

module.exports = mongoose.model('RoomType', roomTypeSchema)
