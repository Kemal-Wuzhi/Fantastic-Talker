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

passport.use(
  "local_user_signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, cb) => {
      try {
        //user
        const user = await User.findOne({ where: { email } })
        if (!user) throw new Error("使用者電子信箱錯誤或不存在！")
        const res = await bcrypt.compare(password, user.password)
        if (!res) throw new Error("使用者密碼錯誤！")
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.use(
  "local_teacher_signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    //改寫成 async await 的形式
    async (email, password, cb) => {
      try {
        //將原本 findOne 找 email 的動作存到 teacher 變數中
        const teacher = await Teacher.findOne({ where: { email } })
        if (!teacher) throw new Error("電子信箱錯誤或不存在！")
        const res = await bcrypt.compare(password, teacher.password)
        if (!res) throw new Error("密碼錯誤！")
        return cb(null, teacher)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.use(
  "jwt_user_signin",
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        //一併把使用者所收藏的老師給帶進來
        include: [{ model: Favorites, as: "Favorites_teacher" }],
        nest: true,
      })
      if (!user) cb(null, false)
      return cb(null, user.toJSON())
    } catch (err) {
      return cb(err)
    }
  })
)
passport.use(
  "jwt_teacher_signin",
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      const teacher = await Teacher.findByPk(jwtPayload.id, {
        //一併把收藏老師的使用者帶進
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

exports = module.exports = passport
