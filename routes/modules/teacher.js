const express = require("express")
const router = express.Router()
const teacherController = require("../../controllers/teacher-controller")

//老師註冊功能
router.post("/", teacherController.signUp)
//取得老師個人資料
router.get("/:id", teacherController.getTeacher)
//修改老師個人資料
router.put("/:id", teacherController.putTeacher)
//取得現在登入的老師
router.get("/current_user", teacherController.getCurrentTeacher)

module.exports = router