const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')

// Async handler is used to remove try catch block
// Controllers for each route

// Get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
    .populate('roomType')
    .populate({
      path: 'bed',
      populate: [
        {
          path: 'bedType',
          select: {
            _id: 0,
            bedTypeName: 1,
          },
        },
        {
          path: 'bedPrice',
          select: {
            _id: 0,
            bedTypePrice: 1,
          },
        },
      ],
    })

  if (!rooms) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json(rooms)
})

// Get room with id
const getRoomWithId = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)

  if (!room) {
    res.status(404)
    throw new Error('Room not found')
  }

  res.json(room)
})

// Create a room
const createRoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomIsAvailable, roomType, bed } = req.body

  // Check if the body don't have the required keys
  if (!roomNumber || !roomIsAvailable || !roomType || !bed) {
    res.status(400)
    throw new Error('Please add room number, isAvailable, and type')
  }

  // Create a new room
  const newRoom = await Room.create({
    roomNumber,
    roomIsAvailable,
    roomType,
    bed,
  })

  if (!newRoom) {
    res.status(400)
    throw new Error('Invalid room data')
  }

  const populatedData = await newRoom.populate('roomType')

  await populatedData.populate({
    path: 'bed',
    populate: [
      {
        path: 'bedType',
        select: {
          _id: 0,
          bedTypeName: 1,
        },
      },
      {
        path: 'bedPrice',
        select: {
          _id: 0,
          bedTypePrice: 1,
        },
      },
    ],
  })

  if (!populatedData) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(201).json(populatedData)
})

// Update a room by id
const updateRoomById = asyncHandler(async (req, res) => {
  const { roomNumber, roomIsAvailable, roomType, bed } = req.body

  if (!roomNumber || !roomIsAvailable || !roomType || !bed) {
    res.status(400)
    throw new Error('Invalid room data')
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!updatedRoom) {
    res.status(404)
    throw new Error('Room Id not found')
  }

  res.status(200).json(updatedRoom)
})

// Delete a room
const deleteRoomById = asyncHandler(async (req, res) => {
  const deleteRoom = await Room.findByIdAndDelete(req.params.id)

  if (!deleteRoom) {
    res.status(404)
    throw new Error('Room id not found')
  } else {
    res.status(200).json(deleteRoom)
  }
})

module.exports = {
  getAllRooms,
  getRoomWithId,
  createRoom,
  updateRoomById,
  deleteRoomById,
}
