const express = require('express')
const router = express.Router()
// Import Controllers
const {
  getAllPaymentMethods,
  getPaymentMethodWithId,
  createPaymentMethod,
  updatePaymentMethodById,
  deletePaymentMethodById,
} = require('../controllers/paymentMethodController')

// Routes

// Get all rooms
router.get('/', getAllPaymentMethods)

// Get a room with id
router.get('/:id', getPaymentMethodWithId)

// Create a room
router.post('/', createPaymentMethod)

// Update a bed
router.put('/:id', updatePaymentMethodById)

// Delete a bed
router.delete('/:id', deletePaymentMethodById)

module.exports = router
