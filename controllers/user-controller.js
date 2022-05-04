const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const userController = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error("所有欄位都要填寫")
      }
      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error("帳號不存在")
      const matchedUser = bcrypt.compare(password, user.password)
      if (!matchedUser) {
        throw new Error("密碼錯誤")
      }
      const userData = user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "2d",
      })
      return res.json({ status: "success", token, user: userData })
    } catch (err) {
      next(err)
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { email, name, password, checkPassword } = req.body
      if (password !== checkPassword) throw new Error("兩次密碼輸入不同！")
      const userEmail = await User.findOne({ where: { email } })
      if (userEmail) throw new Error("該使用者信箱已註冊！")
      const userName = await User.findOne({ where: { name } })
      if (userName) throw new Error("該使用者名稱已註冊！")
      const hashUser = bcrypt.hashSync(req.body.password, 10)
      const registerUser = await User.create({
        email,
        name,
        password: hashUser,
      })
      const user = registerUser.toJSON()
      delete user.password
      return res.json({ status: "success", user: user })
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const targetUserId = req.params.id
      const user = await User.findByPk(targetUserId, {
        attributes: { exclude: ["password"] },
      })
      if (!user) throw new Error("使用者不存在！")
      return res.json({ status: "success", user: user })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
