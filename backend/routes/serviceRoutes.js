const express = require('express')
const router = express.Router()
// Import Controllers
const {
  getAllService,
  getServiceWithId,
  createService,
  updateServiceById,
  deleteService,
} = require('../controllers/serviceController')

// Routes

// Get all services
router.get('/', getAllService)

// Get a service with id
router.get('/:id', getServiceWithId)

// Create a service
router.post('/', createService)

// Update a service by id
router.put('/:id', updateServiceById)

// Delet service by id
router.delete('/:id', deleteService)

module.exports = router
