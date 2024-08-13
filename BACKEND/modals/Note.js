const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {type : String, required : true}, // String is shorthand for {type: String}
    content : String,
    tag : {type : String, default : "Genrel"},
    date: { type: Date, default: Date.now },
    

})
const Note = mongoose.model('notes', NotesSchema);
module.exports = Note;