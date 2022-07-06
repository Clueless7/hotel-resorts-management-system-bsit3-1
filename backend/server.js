// Import modules
const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorHandler')
const port = process.env.PORT || 3000

connectDB()

const app = express()

// Middlewares for accepting data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/rooms', require('./routes/roomsRoute'))

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))
