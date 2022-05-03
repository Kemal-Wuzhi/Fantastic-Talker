const passport = require("../config/passport")
const helpers = require("../helpers/currentHelper") // for admin

module.exports = {
  authenticated: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
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
  // admin authenticate
}
