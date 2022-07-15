const asyncHandler = require('express-async-handler')
const PaymentMethod = require('../models/paymentMethodModel')

// Async handler is used to remove try catch block
// Controllers for each route

// Get all payment methods
const getAllPaymentMethods = asyncHandler(async (req, res) => {
  const paymentMethods = await PaymentMethod.find()
  res.json(paymentMethods)
})

// Get payment method with id
const getPaymentMethodWithId = asyncHandler(async (req, res) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id)

  if (!paymentMethod) {
    res.send(404)
    throw new Error('Payment method not found')
  }

  res.json(paymentMethod)
})

// Create a payment method
const createPaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodName, paymentMethodIsOnline } = req.body

  // Check if the body don't have the required keys
  if (!paymentMethodName || !paymentMethodIsOnline) {
    res.status(400)
    throw new Error('Invalid payment method data')
  }

  // Create a new Payment Method
  const newPaymentMethod = await PaymentMethod.create({
    paymentMethodName,
    paymentMethodIsOnline,
  })

  // Check if newPaymentMethod is successful
  if (newPaymentMethod) {
    res.status(201).json(newPaymentMethod)
  } else {
    res.status(400)
    throw new Error('Invalid Payment Method Data')
  }
})

// Update a Payment Method
const updatePaymentMethodById = asyncHandler(async (req, res) => {
  const { paymentMethodName, paymentMethodIsOnline } = req.body

  if (!paymentMethodName || !paymentMethodIsOnline) {
    res.status(400)
    throw new Error('Invalid Payment Method Data')
  }

  const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  if (!updatedPaymentMethod) {
    res.status(404)
    throw new Error('Payment Method Id not found')
  }
  res.status(200).json(updatedPaymentMethod)
})

// Delete a Payment Method
const deletePaymentMethodById = asyncHandler(async (req, res) => {
  const deletePaymentMethod = await PaymentMethod.findByIdAndDelete(
    req.params.id
  )

  if (!deletePaymentMethod) {
    res.status(404)
    throw new Error('Payment Method Id not found')
  }
  res.status(200).json(deletePaymentMethod)
})

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodWithId,
  createPaymentMethod,
  updatePaymentMethodById,
  deletePaymentMethodById,
}
