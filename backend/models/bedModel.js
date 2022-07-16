const mongoose = require('mongoose')

const bedSchema = mongoose.Schema({
  bedType: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add bed type'],
    ref: 'BedType',
    unique: true,
  },
  bedQuantity: {
    type: Number,
    required: [true, 'Please add Quantity'],
  },
  bedPrice: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add bed Price'],
    ref: 'BedType',
    unique: true,
  },
})

module.exports = mongoose.model('Bed', bedSchema)
