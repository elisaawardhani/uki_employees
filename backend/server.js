const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/employees', (req, res) => {
  res.json({"note":"get all employees"})
})

app.post('/api/employees', (req, res) => {
  res.json({"note":"Add employee"})
})

app.listen(port, () => {
  console.log(`UKI Employees app listening on port ${port}`)
})