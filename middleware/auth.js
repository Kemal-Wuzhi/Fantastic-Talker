const passport = require("../config/passport")

module.exports = {
  authenticatedUser: (req, res, next) => {
    passport.authenticate("jwt_user", { session: false }, (err, user) => {
      console.log("authUser:", user)
      if (err || !user) {
        return res.status(401).json({
          status: "error",
          message: "No JWT token",
        })
      }
      req.user = user

      next()
    })(req, res, next)
  },
  authenticatedTeacher: (req, res, next) => {
    passport.authenticate("jwt_teacher", { session: false }, (err, teacher) => {
      console.log("teacher:", teacher)
      if (err || !teacher) {
        return res.status(401).json({
          status: "error",
          message: "No JWT token",
        })
      }
      req.teacher = teacher
      next()
    })(req, res, next)
  },
  // admin authenticate
}
