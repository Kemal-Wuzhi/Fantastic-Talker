if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require("express")
const app = express()
const passport = require("./config/passport")
const routes = require("./routes")
const port = process.env.PORT || 3000
const helpers = require("./helpers/currentHelper")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(routes)
// app.use((req, res, next) => {
//   res.locals.teacher = helpers.getCurrentTeacher(req)
//   next()
// })
app.use((req, res, next) => {
  res.locals.user = helpers.getCurrentUser(req)
  next()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
