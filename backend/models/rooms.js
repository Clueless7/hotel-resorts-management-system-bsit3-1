const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  roomType: {
    type: String,
    required: [true, 'Please add a room type'],
  },
})

module.exports = mongoose.model('Room', RoomSchema)
