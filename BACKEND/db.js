const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotes"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(()=>console.log('Connected to MongoDB'));
}
module.exports = connectToMongo;