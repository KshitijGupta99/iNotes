const connectToMongo = require('./db');
const express = require('express')
const { query } = require('express-validator');
var cors = require('cors');

connectToMongo()
const app = express()
app.use(express.json())
app.use(cors())

const port = 3000
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})

app.use('/notes',require('./routes/notes'))
app.use('/auth',require('./routes/auth'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
