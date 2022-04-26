const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Teacher } = require("../models")

const teacherController = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error("所有欄位都要填寫")
      }
      const teacher = await Teacher.findOne({ where: { email } })
      if (!teacher) throw new Error("帳號不存在")
      const matchedTeacher = bcrypt.compare(password, teacher.password)
      if (!matchedTeacher) {
        throw new Error("密碼錯誤")
      }
      const teacherData = teacher.toJSON()
      delete teacherData.password
      const token = jwt.sign(teacherData, process.env.JWT_SECRET, {
        expiresIn: "2d",
      })
      return res.json({ status: "success", token, user: teacherData })
    } catch (err) {
      next(err)
    }
  },
}
