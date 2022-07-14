const mongoose = require('mongoose')

const bedTypeSchema = mongoose.Schema({
  bedTypeName: {
    type: String,
    required: [true, 'Please add bed type'],
    unique: true,
  },
  bedTypeSize: {
    type: String,
    required: [true, 'Please add bed size'],
  },
  bedTypePrice: {
    type: Number,
    required: [true, 'Please add bed type price'],
  },
})

module.exports = mongoose.model('BedType', bedTypeSchema)
