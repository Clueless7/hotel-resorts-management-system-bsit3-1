const express = require('express')
const router = express.Router()
// Import Controllers
const {
  getAllBedTypes,
  getBedTypeWithId,
  createBedType,
  updateBedTypeById,
  deleteBedTypeById,
} = require('../controllers/bedTypeController')

// Routes

// Get all rooms
router.get('/', getAllBedTypes)

// Get a room with id
router.get('/:id', getBedTypeWithId)

// Create a room
router.post('/', createBedType)

// Update a bed
router.put('/:id', updateBedTypeById)

// Delete a bed
router.delete('/:id', deleteBedTypeById)

module.exports = router
