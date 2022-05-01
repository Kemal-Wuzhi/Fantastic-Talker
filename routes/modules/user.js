const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user-controller")

//學生註冊功能
router.post("/", userController.signUp)

module.exports = router
