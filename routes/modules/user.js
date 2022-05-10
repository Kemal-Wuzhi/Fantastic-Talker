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

//顯示該使用者收藏的老師
router.get("/favorites/:id", userController.getUserFavorites)

module.exports = router
