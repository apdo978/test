const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' })
})
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})