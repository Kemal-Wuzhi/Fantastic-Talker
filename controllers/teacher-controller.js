const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
<<<<<<< Updated upstream
const { Teacher } = require("../models")
=======
const { Teacher, User } = require("../models")
>>>>>>> Stashed changes

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
      console.log("matchedTeacher:", matchedTeacher)
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
      const hashTeacher = bcrypt.hashSync(req.body.password, 10)
      // const hashTeacher = bcrypt.hash(password, 10)
      // 處理大頭貼上傳問題
      const registerTeacher = await Teacher.create({
        email,
        name,
        password: hashTeacher,
        introduction,
        avatar,
      })

      const teacher = registerTeacher.toJSON()
      // delete teacher.password
      return res.status(200).json(teacher)
    } catch (err) {
      next(err)
    }
  },
  getTeacher: async (req, res, next) => {
    try {
      const targetTeacherId = req.params.id
      const teacher = await Teacher.findByPk(targetTeacherId, {
        attributes: { exclude: ["password"] },
      })
      if (!teacher) throw new Error("該老師不存在！")
      return res.json({ status: "success", teacher: teacher })
    } catch (err) {
      next(err)
    }
  },
  putTeacher: async (req, res, next) => {
    try {
      let targetTeacherId = req.params.id
      const teacher =
        !isNaN(targetTeacherId) && (await Teacher.findByPk(targetTeacherId))
<<<<<<< Updated upstream
      // console.log("teacherData:", teacher)
      if (!teacher) throw new Error("該老師不存在！")
      const currentTeacherId = req.body.id
      targetTeacherId = Number(targetTeacherId)
=======
      targetTeacherId = Number(targetTeacherId)
      console.log("teacher:", teacher)
      if (!teacher) throw new Error("該老師不存在！")
      const currentTeacherId = req.body.id
      console.log("currentTeacherId:", currentTeacherId)
>>>>>>> Stashed changes
      if (targetTeacherId !== currentTeacherId) {
        return res.status(400).json({
          status: "error",
          message: "只能修改自己的資料！",
        })
      }
      const { email, name, introduction, avatar } = req.body
      //解決老師大頭貼上傳修改的問題
      await teacher.update({
        email,
        name,
        introduction,
        avatar,
      })
      const updatedTeacher = {
        email: teacher.email,
        name: teacher.name,
        introduction: teacher.introduction,
        avatar: teacher.avatar,
      }
      return res.status(200).json({
        status: "success",
        data: updatedTeacher,
        message: "修改成功",
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = teacherController
