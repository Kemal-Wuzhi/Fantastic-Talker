const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User, Favorite, Reservation } = require("../models")
const getCurrentUser = require("../helpers/currentDataHelper")

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
        role: "user",
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
  putUser: async (req, res, next) => {
    try {
      let targetUserId = req.params.id
      const user = !isNaN(targetUserId) && (await User.findByPk(targetUserId))
      targetUserId = Number(targetUserId)
      console.log("user:", user)
      if (!user) throw new Error("該使用者不存在！")
      const currentUserId = getCurrentUser.getUser(req).id
      // console.log("currentUserId:", currentUserId)
      if (targetUserId !== currentUserId) {
        return res.status(400).json({
          status: "error",
          message: "只能修改自己的資料！",
        })
      }
      const { email, name } = req.body
      await user.update({
        email,
        name,
      })
      const updatedUser = {
        email: user.email,
        name: user.name,
      }
      console.log("updatedUser:", updatedUser)
      return res.status(200).json({
        status: "success",
        data: updatedUser,
        message: "修改成功",
      })
    } catch (err) {
      next(err)
    }
  },
  getUserFavorites: async (req, res, next) => {
    try {
      const targetUserId = req.params.id
      const targetUserFav = await Favorite.findOne({
        where: { userId: targetUserId },
      })
      if (!targetUserFav) throw new Error("查無收藏資訊")
      return res.json({ status: "success", teacherFav: targetUserFav })
    } catch (err) {
      next(err)
    }
  },
  getUserReservations: async (req, res, next) => {
    try {
      //需要確認是否為本人？還是前面 authentication 就已經測試過了？
      const currentUserId = getCurrentUser.getUser(req).id
      const reservations = await Reservation.findAll({
        where: { userId: currentUserId },
      })
      if (!reservations) throw new Error("尚未預定課程！")
      console.log("reservations:", reservations)
      return res.json({
        status: "success",
        reservations,
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
