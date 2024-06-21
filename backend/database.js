const mongoose = require('mongoose')
const { string } = require('zod')

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database connected succesfully")
}).catch((error)=>{
    console.log("something went wrong while connecting db " + error)
})

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    fullName:String,
    profilePicture:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    }
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

const transactionSchema = new mongoose.Schema({

    type:{
        type:String,
        enum: ['send', 'receive'],

    },

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },


})



const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountSchema)
const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = {
    User,Account,Transaction
}