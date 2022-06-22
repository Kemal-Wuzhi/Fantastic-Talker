const express = require("express")
const router = express.Router()
const teacherController = require("../../controllers/teacher-controller")
const { authenticatedTeacher } = require("../../middleware/auth")
const upload = require("../../middleware/multer")

//顯示該老師被預定的時段
router.get(
  "/reservations",
  authenticatedTeacher,
  teacherController.getTeacherReservations
)

router.get("/", teacherController.getTeachers)
//取得老師個人資料
router.get("/:id", teacherController.getTeacher)
//顯示收藏該老師的使用者
router.get("/favorites/:id", teacherController.getTeacherFavorites)
//修改老師個人資料
router.put("/:id", authenticatedTeacher, teacherController.putTeacher)
//顯示全部老師資料
router.get("/", teacherController.getTeachers)
//老師註冊功能
router.post("/", teacherController.signUp)

module.exports = router
