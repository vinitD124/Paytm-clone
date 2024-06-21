const mongoose = require('mongoose')

require('dotenv').config();


exports.dbConnect = async () =>{

    console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database connected succesfully")
}).catch((error)=>{
    console.log("something went wrong while connecting db " + error)
})

}