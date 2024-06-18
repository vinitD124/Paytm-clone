const mongoose = require('mongoose')
const { string } = require('zod')

mongoose.connect("mongodb+srv://emailtakiern:pwwGZPixsfrhqDFh@projectone.e4f3fim.mongodb.net/payment").then(()=>{
    console.log("database connected succesfully")
}).catch((error)=>{
    console.log("something went wrong while connecting db " + error)
})

const userSchema = new mongoose.Schema({
    userName:String,
    password:String,
    firstName:String,
    lastName:String,
})


const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type: Number,
        required: true,
    }
})



const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountSchema)

module.exports = {
    User,Account
}