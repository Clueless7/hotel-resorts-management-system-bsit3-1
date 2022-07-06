// Import modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()

app.use('/rooms', require('./routes/roomsRoute'))

app.listen(port, () => console.log(`Listening on port ${port}`))
