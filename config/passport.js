//user 和 teacher 是否需要分開寫？還有更好的寫法嗎？
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { User, Teacher } = require("../models")
const bcrypt = require("bcryptjs")

//JWT
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "test",
}
//在 passport 中，同時驗證 teacher 和 user
//teacher
//驗證 teacher (第一次登入時，比對 email 和 password 是否正確)
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      try {
        const teacher = await Teacher.findOne({ where: { email } })
        console.log("teacher:", teacher)
        if (!teacher) throw new Error("電子信箱錯誤或不存在！")
        const res = await bcrypt.compare(password, teacher.password)
        console.log("res:", res)
        console.log("resData_1:", password)
        console.log("resData_2:", teacher.password)
        if (!res) throw new Error("密碼錯誤！")
        return cb(null, teacher)
      } catch (err) {
        return cb(err)
      }
    }
  )
)
//驗證 teacher(成功登入後，後續進入網站時確認 teacher 是否攜帶合法 token)
passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      const teacher = await Teacher.findByPk(jwtPayload.id, {
        //一併把收藏老師的使用者殆盡
        include: [{ model: Favorites, as: "Favorites_user" }],
        nest: true,
      })
      if (!teacher) cb(null, false)
      return cb(null, teacher.toJSON())
    } catch (err) {
      return cb(err)
    }
  })
)

//user
// 驗證 user (第一次登入時，比對 email 和 password 是否正確)
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     //改寫成 async await 的形式
//     async (email, password, cb) => {
//       try {
//         //將原本 findOne 找 email 的動作存到 user 變數中
//         const user = await User.findOne({ where: { email } })
//         if (!user) throw new Error("電子信箱錯誤或不存在！")
//         const res = await bcrypt.compare(password, user.password)
//         if (!res) throw new Error("密碼錯誤！")
//         return cb(null, user)
//       } catch (err) {
//         return cb(err)
//       }
//     }
//   )
// )
// 驗證 user(成功登入後，後續進入網站時確認 user 是否攜帶合法 token)
// 改寫成 async await 的形式

module.exports = passport
