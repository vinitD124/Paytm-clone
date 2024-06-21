const zod = require("zod");
const { User, Account,Transaction } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");



exports.getBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({
    success: true,
    balance: account.balance,
  });
};

const { ObjectId } = mongoose.Types;

exports.transferFund = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

  
    console.log(amount)

    const toUserId =  to
    const userId = req.userId

    console.log(req.userId)

    if (toUserId === userId) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "Cannot Transfer to yourself!",
      });
    }

    console.log(userId)

    const account = await Account.findOne({
      userId: userId,
    }).session(session);

    console.log(account)


    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }




    const toAccount = await Account.findOne({
      userId: toUserId,
    }).session(session);



    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid account",
      });
    }


    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);



    await Account.updateOne(
      { userId: toUserId },
      { $inc: { balance: amount } }
    ).session(session);


    await Transaction.create({
        type: 'send',
        fromUserId: userId,
        toUserId: toUserId,
        amount: amount,
    })


    await Transaction.create({
        type: 'receive',
        fromUserId: userId, 
        toUserId: toUserId,
        amount: amount,
    })


    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Transfer successful",
    });


  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: "Transaction failed",
      error: error.message,
    });

  } finally {
    session.endSession();
  }
};



exports.getTransactionHistory = async (req,res)=>{

    try {

        const transactions = await Transaction.find({
            $or:[
                { fromUserId: req.userId , type:'send'},
                { toUserId: req.userId, type:'receive' },
            ]
        }).populate('fromUserId')
        .populate('toUserId')
        .exec()

        res.status(200).json({
            success: true,
            transactions: transactions,
          });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching transaction history',
            error: error.message,
          });
    }


}