const zod = require("zod");
const { User, Account } = require("../database");
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

    if (!ObjectId.isValid(req.userId) || !ObjectId.isValid(to)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const userId = req.userId
    const toUserId =  to

    if (toUserId === userId) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "Cannot Transfer to yourself!",
      });
    }

    const account = await Account.findOne({
      userId: userId,
    }).session(session);



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
