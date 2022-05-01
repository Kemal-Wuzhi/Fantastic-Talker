const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
  signUp: async (req, res, next) => {
    try {
      const { email, name, password, checkPassword, introduction, avatar } =
        req.body
      if (password !== checkPassword) throw new Error("兩次密碼輸入不同！")
      const teacherEmail = await Teacher.findOne({ where: { email } })
      if (teacherEmail) throw new Error("該老師信箱已註冊！")
      const teacherName = await Teacher.findOne({ where: { name } })
      if (teacherName) throw new Error("該老師名稱已註冊！")
      // const hashTeacher = { password: bcrypt.hashSync(req.body.password, 10) }
      const hashTeacher = bcrypt.hash(password, 10)
      // 處理大頭貼上傳問題
      const registerTeacher = await Teacher.create({
        email,
        name,
        password: hashTeacher,
        introduction,
        avatar,
      })
      // console.log("teacherData", registerTeacher)
      const user = registerTeacher.toJSON()
      return res.json({ status: "success", user: user })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = teacherController
