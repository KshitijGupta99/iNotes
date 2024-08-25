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
    "https://i-notes-tajc.vercel.app",
    "http://localhost:5173",
    "https://inotes-kwax.onrender.com"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,auth-token",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Add your manual CORS handling middleware here
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://i-notes-tajc.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,auth-token');
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Handle preflight request
    }
    next();
});
const port = "https://inotes-kwax.onrender.com"
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})

app.use('/notes', require('./routes/notes'))
app.use('/auth', require('./routes/auth'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
