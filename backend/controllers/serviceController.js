const asyncHandler = require('express-async-handler')
const Service = require('../models/serviceModel')

// Async handler is used to remove try catch block
// Controllers for each route

const getAllService = asyncHandler(async (req, res) => {
  const services = await Service.find()
  res.json(services)
})

const getServiceWithId = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error('Service not found')
  }

  res.json(service)
})

const createService = asyncHandler(async (req, res) => {
  const { serviceName, servicePrice } = req.body

  // Check if the body don't have the required keys
  if (!serviceName || !servicePrice) {
    res.status(400)
    throw new Error('Invalid service data')
  }

  // Create a new service
  const newService = await Service.create({
    serviceName,
    servicePrice,
  })

  // Check if newService is successful
  if (newService) {
    res.status(201).json(newService)
  } else {
    res.status(400)
    throw new Error('Invalid service Data')
  }
})

const updateServiceById = asyncHandler(async (req, res) => {
  const { serviceName, servicePrice } = req.body

  if (!serviceName || !servicePrice) {
    res.status(400)
    throw new Error('Invalid service Data')
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  if (!updatedService) {
    res.status(404)
    throw new Error('Service Id not found')
  }
  res.status(200).json(updatedService)
})

const deleteService = asyncHandler(async (req, res) => {
  const deletedService = await Service.findByIdAndDelete(req.params.id)

  if (!deletedService) {
    res.status(404)
    throw new Error('Service Id not found')
  }
  res.status(200).json(deletedService)
})

module.exports = {
  getAllService,
  getServiceWithId,
  createService,
  updateServiceById,
  deleteService,
}
