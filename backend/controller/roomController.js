const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')

// Async handler is used to remove try catch block
// Controllers for each route

// Get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
  res.json(rooms)
})

// Create a room
const createRoom = asyncHandler(async (req, res) => {
  // If there's no roomType key on the json req send client error then show what's wrong to the client
  if (!req.body.roomType) {
    res.status(400)
    throw new Error('Please add a room type')
  }

  const room = new Room({
    roomType: req.body.roomType,
  })

  const savedRoom = await room.save()
  res.json(savedRoom)
})

module.exports = {
  getAllRooms,
  createRoom,
}
