const express = require('express')
const router = express.Router()

let {signup, signin,updateUser, getBulkUser,getUser,googleHandler} = require('../controller/userController')
let authMiddlelware = require("../middleware")

router.post("/signup",signup)
router.post("/signin",signin)
router.put("/user",authMiddlelware ,updateUser)
router.get("/bulk",authMiddlelware,getBulkUser)
router.get("/getUser",authMiddlelware,getUser)
router.post("/google",googleHandler)




module.exports = router

