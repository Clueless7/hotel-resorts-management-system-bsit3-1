const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Please add a service name'],
  },
})

module.exports = mongoose.model('Service', serviceSchema)
