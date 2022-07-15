// Import modules
require('dotenv').config()
const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 3000

connectDB()

const app = express()

// Middlewares for accepting data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/api/rooms/types', require('./routes/roomTypeRoutes'))
app.use('/api/rooms', require('./routes/roomRoutes'))
app.use('/api/beds/types', require('./routes/bedTypeRoutes'))
app.use('/api/beds', require('./routes/bedRoutes'))

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/public')))
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../', 'frontend', 'public', 'index.html')
  )
})

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))
