const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' })
})
app.listen(80,() => {
    console.log('Server running on port 80')
})