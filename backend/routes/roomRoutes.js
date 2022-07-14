const express = require('express')
const router = express.Router()
// Import Controllers
const {
  getAllRooms,
  getRoomWithId,
  createRoom,
  updateRoomById,
  deleteRoomById,
} = require('../controllers/roomController')

// Routes

// Get all rooms
router.get('/', getAllRooms)

// Get a room with id
router.get('/:id', getRoomWithId)

// Create a room
router.post('/', createRoom)

// Update a room
router.put('/:id', updateRoomById)

// Delet room by id
router.delete('/:id', deleteRoomById)

module.exports = router
