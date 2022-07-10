const mongoose = require('mongoose')

const roomTypeSchema = mongoose.Schema({
  roomTypeName: {
    type: String,
    required: [true, 'Please add room type name'],
  },
})

module.exports = mongoose.model('RoomType', roomTypeSchema)
