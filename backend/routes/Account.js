const express = require('express')
const router = express.Router()

let {getBalance,transferFund} = require("../controller/AccountController")
let authMiddlelware = require("../middleware")

router.get("/balance",authMiddlelware,getBalance)
router.post("/transfer",authMiddlelware,transferFund)



module.exports = router

