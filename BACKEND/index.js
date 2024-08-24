require("dotenv").config()
const connectToMongo = require('./db');
const express = require('express')
const { query } = require('express-validator');
var cors = require('cors');

connectToMongo()
const app = express()
app.use(express.json())
const corsOptions = {
  origin: [
    "https://i-notes-t76y.vercel.app",
    "http://localhost:5173",
    "https://inotes-kwax.onrender.com/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})

app.use('/notes', require('./routes/notes'))
app.use('/auth', require('./routes/auth'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
