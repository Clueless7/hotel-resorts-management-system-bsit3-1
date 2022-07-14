const express = require('express')
const router = express.Router()
// Import Controllers
const {
  getAllBeds,
  getBedWithId,
  createBed,
  updateBedById,
  deleteBedById,
} = require('../controllers/bedController')

// Routes

// Get all rooms
router.get('/', getAllBeds)

// Get a room with id
router.get('/:id', getBedWithId)

// Create a room
router.post('/', createBed)

// Update a bed
router.put('/:id', updateBedById)

// Delete a bed
router.delete('/:id', deleteBedById)

module.exports = router
