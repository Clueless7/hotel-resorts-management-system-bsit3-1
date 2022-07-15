const express = require('express')
const router = express.Router()
const {
  getAllReservations,
  getReservationWithId,
  createReservation,
  updateReservationById,
  deleteReservationById,
} = require('../controllers/reservationController')

// Get all reservations
router.get('/', getAllReservations)

// Get a reservation with id
router.get('/:id', getReservationWithId)

// Create a reservation
router.post('/', createReservation)

// Update a reservation
router.put('/:id', updateReservationById)

// Delet reservation by id
router.delete('/:id', deleteReservationById)

module.exports = router
