const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Please add a service name'],
    unique: true,
  },
  servicePrice: {
    type: Number,
    required: [true, 'Please add a service price'],
  },
})

module.exports = mongoose.model('Service', serviceSchema)
