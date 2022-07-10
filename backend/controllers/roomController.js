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
  const { roomNumber, roomIsAvailable, roomType } = req.body

  // Check if the body don't have the required keys
  if ((!roomNumber, !roomIsAvailable, !roomType)) {
    res.status(400)
    throw new Error('Please add room number, isAvailable, and type')
  }

  // Create a new room
  const newRoom = await Room.create({
    roomNumber,
    roomIsAvailable,
    roomType,
  })

  // Check if newRoom is successful
  if (newRoom) {
    res.status(201).json(newRoom)
  } else {
    res.status(400)
    throw new Error('Invalid room data')
  }
})

module.exports = {
  getAllRooms,
  createRoom,
}
