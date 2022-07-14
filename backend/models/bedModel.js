const mongoose = require('mongoose')

const bedSchema = mongoose.Schema({
  bedType: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add bed type'],
    ref: 'BedType',
  },
  bedQuantity: {
    type: Number,
    required: [true, 'Please add Quantity'],
  },
  bedPrice: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add bed Price'],
    ref: 'BedType',
  },
})

module.exports = mongoose.model('Bed', bedSchema)
