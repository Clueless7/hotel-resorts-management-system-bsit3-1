const express = require('express')
const router = express.Router()
// Import Controllers
const { getAllRooms } = require('../controller/roomsController')

// Routes

// Get all rooms
router.get('/', getAllRooms)

module.exports = router
