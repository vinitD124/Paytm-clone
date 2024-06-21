const express = require('express')
const router = express.Router()

let {getBalance,transferFund,getTransactionHistory} = require("../controller/AccountController")
let authMiddlelware = require("../middleware")

router.get("/balance",authMiddlelware,getBalance)
router.post("/transfer",authMiddlelware,transferFund)
router.get("/getTransactionHistory",authMiddlelware,getTransactionHistory)



module.exports = router

