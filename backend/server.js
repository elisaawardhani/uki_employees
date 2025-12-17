const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/uki');
}

main()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/employees', (req, res) => {
    
  res.json({"note":"get all employees"})
})

app.post('/api/employees', (req, res) => {
    console.log(req.body)
  res.json({"note":"Add employee"})
})

app.listen(port, () => {
  console.log(`UKI Employees app listening on port ${port}`)
})