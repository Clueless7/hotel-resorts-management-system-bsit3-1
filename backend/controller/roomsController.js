const asyncHandler = require('express-async-handler')

// async handler is used to remove try catch block
const getAllRooms = asyncHandler(async (req, res) => {})

module.exports = {
  getAllRooms,
}
