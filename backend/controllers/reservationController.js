const asyncHandler = require('express-async-handler')
const Reservation = require('../models/reservationModel')

// Get all reservation
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find()
    .populate('roomNumber', {
      _id: 0,
      roomNumber: 1,
    })
    .populate({
      path: 'roomType',
      select: {
        _id: 0,
        roomType: 1,
      },
      populate: {
        path: 'roomType',
        select: {
          _id: 0,
          roomTypeName: 1,
        },
      },
    })
    .populate({
      path: 'bed',
      select: {
        _id: 0,
        bedType: 1,
      },
      populate: {
        path: 'roomBed',
        select: {
          _id: 0,
          bedType: 1,
        },
        populate: [
          {
            path: 'bedType',
            select: {
              _id: 0,
              bedTypeName: 1,
            },
          },
          {
            path: 'bedPrice',
            select: {
              _id: 0,
              bedTypePrice: 1,
            },
          },
        ],
      },
    })

  if (!reservations) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json(reservations)
})

// Get a reservation by id
const getReservationWithId = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)

  await reservation.populate({
    path: 'roomType',
    select: {
      _id: 0,
      roomType: 1,
    },
    populate: {
      path: 'roomType',
      select: {
        _id: 0,
        roomTypeName: 1,
      },
    },
  })

  await reservation.populate({
    path: 'bed',
    select: {
      _id: 0,
      bedType: 1,
    },
    populate: {
      path: 'roomBed',
      select: {
        _id: 0,
        bedType: 1,
      },
      populate: [
        {
          path: 'bedType',
          select: {
            _id: 0,
            bedTypeName: 1,
          },
        },
        {
          path: 'bedPrice',
          select: {
            _id: 0,
            bedTypePrice: 1,
          },
        },
      ],
    },
  })

  if (!reservation) {
    res.status(500)
    throw new Error('Server error')
  }

  res.status(200).json(reservation)
})

// Create a room type
const createReservation = asyncHandler(async (req, res) => {
  const {
    customerName,
    contactNumber,
    email,
    gender,
    address,
    roomNumber,
    roomType,
    roomBed,
    checkInDate,
    checkOutDate,
    durationOfStay,
    balance,
  } = req.body

  if (
    !customerName ||
    !contactNumber ||
    !email ||
    !gender ||
    !address ||
    !roomNumber ||
    !roomType ||
    !roomBed ||
    !checkInDate ||
    !checkOutDate ||
    !durationOfStay ||
    !balance
  ) {
    res.status(400)
    throw new Error('Please afill all data')
  }

  const newReservation = await Reservation.create({
    customerName,
    contactNumber,
    email,
    gender,
    address,
    roomNumber,
    roomType,
    roomBed,
    checkInDate,
    checkOutDate,
    durationOfStay,
    balance,
  })

  await newReservation.populate('roomNumber', {
    _id: 0,
    roomNumber: 1,
  })

  await newReservation.populate({
    path: 'roomType',
    select: {
      _id: 0,
      roomType: 1,
    },
    populate: {
      path: 'roomType',
      select: {
        _id: 0,
        roomTypeName: 1,
      },
    },
  })

  await newReservation.populate({
    path: 'bed',
    select: {
      _id: 0,
      bedType: 1,
    },
    populate: {
      path: 'roomBed',
      select: {
        _id: 0,
        bedType: 1,
      },
      populate: [
        {
          path: 'bedType',
          select: {
            _id: 0,
            bedTypeName: 1,
          },
        },
        {
          path: 'bedPrice',
          select: {
            _id: 0,
            bedTypePrice: 1,
          },
        },
      ],
    },
  })

  if (newReservation) {
    res.status(201).json(newReservation)
  } else {
    res.status(400)
    throw new Error('Invalid reservation data')
  }
})

// Update a room
const updateReservationById = asyncHandler(async (req, res) => {
  const {
    customerName,
    contactNumber,
    email,
    gender,
    address,
    roomNumber,
    roomType,
    roomBed,
    checkInDate,
    checkOutDate,
    durationOfStay,
    balance,
  } = req.body

  if (
    !customerName ||
    !contactNumber ||
    !email ||
    !gender ||
    !address ||
    !roomNumber ||
    !roomType ||
    !roomBed ||
    !checkInDate ||
    !checkOutDate ||
    !durationOfStay ||
    !balance
  ) {
    res.status(400)
    throw new Error('Invalid reservation data')
  }

  const updatedReservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  await updatedReservation.populate('roomNumber', {
    _id: 0,
    roomNumber: 1,
  })

  await updatedReservation.populate({
    path: 'roomType',
    select: {
      _id: 0,
      roomType: 1,
    },
    populate: {
      path: 'roomType',
      select: {
        _id: 0,
        roomTypeName: 1,
      },
    },
  })

  await updatedReservation.populate({
    path: 'bed',
    select: {
      _id: 0,
      bedType: 1,
    },
    populate: {
      path: 'roomBed',
      select: {
        _id: 0,
        bedType: 1,
      },
      populate: [
        {
          path: 'bedType',
          select: {
            _id: 0,
            bedTypeName: 1,
          },
        },
        {
          path: 'bedPrice',
          select: {
            _id: 0,
            bedTypePrice: 1,
          },
        },
      ],
    },
  })

  if (!updatedReservation) {
    res.status(404)
    throw new Error('Reservation Id not found')
  }

  res.status(200).json(updatedReservation)
})

// Delete room type
const deleteReservationById = asyncHandler(async (req, res) => {
  const deleteReservation = await Reservation.findByIdAndDelete(req.params.id)

  if (!deleteReservation) {
    res.status(404)
    throw new Error('Reservation Id not found')
  }

  res.status(200).json(deleteReservation)
})

module.exports = {
  getAllReservations,
  getReservationWithId,
  createReservation,
  updateReservationById,
  deleteReservationById,
}
