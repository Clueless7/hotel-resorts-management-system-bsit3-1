// Import modules
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

// Middlewares for accepting data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/rooms', require('./routes/roomsRoute'))

app.listen(port, () => console.log(`Listening on port ${port}`))
