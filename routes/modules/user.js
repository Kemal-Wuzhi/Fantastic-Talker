const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user-controller")

//學生註冊功能
router.post("/", userController.signUp)
//取得學生個人資料
router.get("/:id", userController.getUser)

module.exports = router
