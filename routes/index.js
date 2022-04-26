const express = require("express")
const router = express.Router()
const passport = require("../config/passport")

router.post(
  "/api/signin",
  passport.authenticate("local", { session: false }),
  userController.signIn
)

module.exports = router
