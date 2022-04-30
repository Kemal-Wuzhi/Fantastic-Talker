const express = require("express")
const router = express.Router()
const passport = require("../config/passport")
const admin = require("./modules/admin")
const teacher = require("./modules/teacher")
const teacherController = require("../controllers/teacher-controller")
const userController = require("../controllers/user-controller")
const adminController = require("../controllers/admin-controller")

//老師登入
router.post(
  "/api/teacher/signin",
  passport.authenticate("local", { session: false }),
  teacherController.signIn
)
//學生登入
router.post(
  "/api/user/signin",
  passport.authenticate("local", { session: false }),
  userController.signIn
)
//管理者登入
router.post("/api/admin/signin", adminController.signIn)
//補上 admin 的 authenticate process
router.use("/api/admin", admin)
router.use("/api/teachers", teacher)

module.exports = router
