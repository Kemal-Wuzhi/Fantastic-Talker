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
}

module.exports = userController
