const express = require("express")
const router = express.Router()
const teacherController = require("../../controllers/teacher-controller")

//老師註冊功能
router.post("/", teacherController.signUp)

//取得老師個人資料
router.get("/:id", teacherController.getTeacher)

module.exports = router
