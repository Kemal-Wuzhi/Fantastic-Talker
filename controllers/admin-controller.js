const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { User, Teacher } = require("../models")

const adminController = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const admin = await User.findOne({ where: { email } })
      if (!admin || admin.role !== "admin") {
        return res.status(403).json({
          status: "error",
          message: "非管理員禁止登入",
        })
      }
      if (!bcrypt.compareSync(password, admin.password)) {
        return res.status(403).json({
          status: "error",
          message: "密碼錯誤",
        })
      }
      const adminData = admin.toJSON()
      delete adminData.password
      const token = jwt.sign(adminData, process.env.JWT_SECRET, {
        expiresIn: "2d",
      })
      res.json({
        status: "success",
        data: {
          token,
          admin: adminData,
        },
        message: "管理員登入成功！",
      })
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        where: { role: "user" },
        order: ["id"],
        attributes: { exclude: ["password"] },
        raw: true,
      })
      if (!users.length) throw new Error("沒有任何使用者！")
      return res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      if (!user) throw new Error("使用者不存在！")
      return res.json({
        status: "success",
        data: await user.destroy(),
        message: "成功刪除使用者！",
      })
    } catch (err) {
      next(err)
    }
  },
  deleteTeacher: async (req, res, next) => {
    try {
      const teacherId = req.params.id
      const teacher = await Teacher.findByPk(teacherId)
      if (!teacher) throw new Error("老師不存在！")
      return res.json({
        status: "success",
        data: await teacher.destroy(),
        message: "成功刪除老師！",
      })
    } catch (err) {
      next(err)
    }
  },
}
module.exports = adminController
