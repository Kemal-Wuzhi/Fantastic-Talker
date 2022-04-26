const express = require("express")
const router = express.Router()
const passport = require("../config/passport")

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
