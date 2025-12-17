const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const employeeRoutes = require('./src/routes/employeeRoutes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error.', err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/employees', employeeRoutes)

app.listen(PORT, () => {
  console.log(`UKI Employees app running on port ${PORT}`)
})