const express = require("express")
const router = express.Router()
const teacherController = require("../../controllers/teacher-controller")
const { authenticatedTeacher } = require("../../middleware/auth")

//取得老師個人資料
router.get("/:id", authenticatedTeacher, teacherController.getTeacher)
//修改老師個人資料
router.put("/:id", authenticatedTeacher, teacherController.putTeacher)

//老師註冊功能
router.post("/", teacherController.signUp)

//顯示收藏該老師的使用者
router.get("/favorites/:id", teacherController.getTeacherFavorites)

module.exports = router
