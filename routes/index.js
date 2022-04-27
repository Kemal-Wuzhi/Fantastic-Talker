const express = require("express")
const router = express.Router()
const passport = require("../config/passport")
const teacherController = require("../controllers/teacher-controller")
const userController = require("../controllers/user-controller")

// 老師登入
router.post(
  "/api/teacher/signin",
  passport.authenticate("local", { session: false }),
  teacherController.signIn
)

// 學生登入
router.post(
  "/api/user/signin",
  passport.authenticate("local", { session: false }),
  userController.signIn
)

module.exports = router
