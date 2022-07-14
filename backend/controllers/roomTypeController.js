const asyncHandler = require('express-async-handler')
const RoomType = require('../models/roomTypeModel')

// Get all room types
const getAllRoomTypes = asyncHandler(async (req, res) => {
  const roomTypes = await RoomType.find()
  res.json(roomTypes)
})

const getRoomTypeWithId = asyncHandler(async (req, res) => {
  const roomType = await RoomType.findById(req.params.id)
  res.json(roomType)
})

// Create a room type
const createRoomType = asyncHandler(async (req, res) => {
  const { roomTypeName, roomTypePrice } = req.body

  if (!roomTypeName) {
    res.status(400)
    throw new Error('Please add a room type name')
  }

  const newRoomType = await RoomType.create({ roomTypeName, roomTypePrice })

  if (newRoomType) {
    res.status(201).json(newRoomType)
  } else {
    res.status(400)
    throw new Error('Invalid room type data')
  }
})

// Update a room
const updateRoomTypeById = asyncHandler(async (req, res) => {
  const { roomTypeName, roomTypePrice } = req.body

  if (!roomTypeName || !roomTypePrice) {
    res.status(400)
    throw new Error('Invalid room type data')
  }

  const updatedRoomType = await RoomType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  if (!updatedRoomType) {
    res.status(404)
    throw new Error('Room Type Id not found')
  }

  res.status(200).json(updatedRoomType)
})

// Delete room type
const deleteRoomTypeById = asyncHandler(async (req, res) => {
  const deleteRoomType = await RoomType.findByIdAndDelete(req.params.id)

  if (!deleteRoomType) {
    res.status(404)
    throw new Error('Room Type id not found')
  } else {
    res.status(200).json(deleteRoomType)
  }
})

module.exports = {
  getAllRoomTypes,
  getRoomTypeWithId,
  createRoomType,
  updateRoomTypeById,
  deleteRoomTypeById,
}
