const asyncHandler = require('express-async-handler')
const Bed = require('../models/bedModel')

// Async handler is used to remove try catch block
// Controllers for each route

// Get all room
const getAllBeds = asyncHandler(async (req, res) => {
  const beds = await Bed.find()
    .populate('bedType', {
      _id: 0,
      bedTypeName: 1,
    })
    .populate('bedPrice', {
      _id: 0,
      bedTypePrice: 1,
    })

  if (!beds) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json(beds)
})

// Get bed with id
const getBedWithId = asyncHandler(async (req, res) => {
  const bed = await Bed.findById(req.params.id)

  if (!bed) {
    res.send(404)
    throw new Error('Bed not found')
  }

  res.json(bed)
})

// Create a bed
const createBed = asyncHandler(async (req, res) => {
  const { bedType, bedQuantity, bedPrice } = req.body

  // Check if the body don't have the required keys
  if (!bedType || !bedQuantity || !bedPrice) {
    res.status(400)
    throw new Error('Please add bed type, bed quantity, and bed price')
  }

  // Create a new room
  const newBed = await Bed.create({
    bedType,
    bedQuantity,
    bedPrice,
  })

  if (!newBed) {
    res.status(400)
    throw new Error('Invalid bed data')
  }

  const populatedData = await newBed.populate('bedType', {
    _id: 0,
    bedTypeName: 1,
  })

  await populatedData.populate('bedPrice', {
    _id: 0,
    bedTypePrice: 1,
  })

  if (!populatedData) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(201).json(populatedData)
})

// Update a Bed
const updateBedById = asyncHandler(async (req, res) => {
  const { bedType, bedQuantity, bedPrice } = req.body

  if (!bedType || !bedQuantity || !bedPrice) {
    res.status(400)
    throw new Error('Invalid bed data')
  }

  const updatedBed = await Bed.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!updatedBed) {
    res.status(404)
    throw new Error('Bed Id not found')
  }

  res.status(200).json(updatedBed)
})

// Delete a Bed
const deleteBedById = asyncHandler(async (req, res) => {
  const deleteBed = await Bed.findByIdAndDelete(req.params.id)

  if (!deleteBed) {
    res.status(404)
    throw new Error('Bed Id not Found')
  }
  res.status(200).json(deleteBed)
})

module.exports = {
  getAllBeds,
  getBedWithId,
  createBed,
  updateBedById,
  deleteBedById,
}
