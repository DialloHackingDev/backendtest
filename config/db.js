require("dotenv").config();
const mongoose = require("mongoose");

//connection a la base de donnne 
mongoose.connect(process.env.MBEDB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(res =>{
    console.log("la base de donne est bien  connecter!");
    
}).catch(err => console.log("erreur de connection de db :",err));


module.exports =mongoose;