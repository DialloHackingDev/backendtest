const mongoose = require("mongoose");



//shema du model de la base de donne 
const NoteSchema = mongoose.Schema({
    matiere:String,
    note:Number,
    fichier:String
})

module.exports = mongoose.model("Notes",NoteSchema);

