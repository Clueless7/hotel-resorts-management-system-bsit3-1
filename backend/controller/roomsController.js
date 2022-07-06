const asyncHandler = require('express-async-handler')
const Room = require('../models/rooms')

// async handler is used to remove try catch block
// Controllers for each route

const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
  res.json(rooms)
})

module.exports = {
  getAllRooms,
}
