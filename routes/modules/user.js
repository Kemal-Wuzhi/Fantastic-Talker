const express = require("express")
const router = express.Router()
const userController = require("../../controllers/user-controller")
const { authenticatedUser } = require("../../middleware/auth")

//取得學生個人資料
router.get("/:id", authenticatedUser, userController.getUser)
//修改學生個人資料
router.put("/:id", authenticatedUser, userController.putUser)

//學生註冊功能
router.post("/", userController.signUp)

module.exports = router
