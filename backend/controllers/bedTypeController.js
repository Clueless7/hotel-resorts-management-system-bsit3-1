const asyncHandler = require('express-async-handler')
const BedType = require('../models/bedTypeModel')

// Async handler is used to remove try catch block
// Controllers for each route

// Get all rooms
const getAllBedTypes = asyncHandler(async (req, res) => {
  const rooms = await BedType.find()
  res.json(rooms)
})

// Get Bed with id
const getBedTypeWithId = asyncHandler(async (req, res) => {
  const bedtype = await BedType.findById(req.params.id)

  if (!bedtype) {
    res.send(404)
    throw new Error('Bed Type not found')
  }

  res.json(bedtype)
})

// Create a Bed Type
const createBedType = asyncHandler(async (req, res) => {
  const { bedTypeName, bedTypeSize, bedTypePrice } = req.body

  // Check if the body don't have the required keys
  if (!bedTypeName || !bedTypeSize || !bedTypePrice) {
    res.status(400)
    throw new Error('Invalid Bed Type data')
  }

  // Create a new Bed Type
  const newBedType = await BedType.create({
    bedTypeName,
    bedTypeSize,
    bedTypePrice,
  })

  // Check if newBedType is successful
  if (newBedType) {
    res.status(201).json(newBedType)
  } else {
    res.status(400)
    throw new Error('Invalid Bed Type Data')
  }
})

// Update a Bed Type
const updateBedTypeById = asyncHandler(async (req, res) => {
  const { bedTypeName, bedTypeSize, bedTypePrice } = req.body

  if (!bedTypeName || !bedTypeSize || !bedTypePrice) {
    res.status(400)
    throw new Error('Invalid Bed Type Data')
  }

  const updatedBedType = await BedType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  if (!updatedBedType) {
    res.status(404)
    throw new Error('Bed Type Id not found')
  }
  res.status(200).json(updatedBedType)
})

// Delete a Bed Type
const deleteBedTypeById = asyncHandler(async (req, res) => {
  const deleteBedType = await BedType.findByIdAndDelete(req.params.id)

  if (!deleteBedType) {
    res.status(404)
    throw new Error('Bed Type Id not found')
  }
  res.status(200).json(deleteBedType)
})

module.exports = {
  getAllBedTypes,
  getBedTypeWithId,
  createBedType,
  updateBedTypeById,
  deleteBedTypeById,
}
