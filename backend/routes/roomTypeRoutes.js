const express = require('express')
const router = express.Router()

const {
  getAllRoomTypes,
  getRoomTypeWithId,
  createRoomType,
  updateRoomTypeById,
  deleteRoomTypeById,
} = require('../controllers/roomTypeController')

// Get all room types
router.get('/', getAllRoomTypes)

// Get roomtype by id
router.get('/:id', getRoomTypeWithId)

// Create a room type
router.post('/', createRoomType)

// Update a room type
router.put('/:id', updateRoomTypeById)

// Delete a room type
router.delete('/:id', deleteRoomTypeById)

module.exports = router
