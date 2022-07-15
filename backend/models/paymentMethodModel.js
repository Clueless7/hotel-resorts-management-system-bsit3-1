const mongoose = require('mongoose')

const paymentMethodSchema = mongoose.Schema({
  paymentMethodName: {
    type: String,
    required: [true, 'Please add a payment method name'],
    unique: true,
  },
  paymentMethodIsOnline: {
    type: Boolean,
    required: [true, 'Please indicate if payment method is online'],
  },
})

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema)
