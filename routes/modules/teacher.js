const express = require("express")
const router = express.Router()
const teacherController = require("../../controllers/teacher-controller")

//老師註冊功能
router.post("/", teacherController.signUp)

module.exports = router
