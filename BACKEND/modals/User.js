const mongoose = require("mongoose");
const {Schema} = mongoose;
const UserSchema = new Schema({

    username: {type : String, required : true, unique: true},
    email: {type : String, required : true, unique: true}, // String is shorthand for {type: String}
    password: {type : String, required : true},      
    date: { type: Date, default: Date.now },
    
})

const User = mongoose.model('auth', UserSchema);
// User.createIndexes();     A simple way to check for same entries for the part with prop unique eg. username
module.exports = User;