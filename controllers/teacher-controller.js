const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Teacher, Favorite, Reservation } = require("../models")
const getCurrentTeacher = require("../helpers/currentDataHelper")
// const { imgurFileHandler } = require("../helpers/file-helper")
const upload = require("../middleware/multer")

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
      console.log("teacherData:", teacher)
      if (!teacher) throw new Error("該老師不存在！")
      return res.json({ status: "success", teacher: teacher })
    } catch (err) {
      next(err)
    }
  },
  getTeachers: async (req, res, next) => {
    try {
      const teachers = await Teacher.findAll({
        where: { role: "teacher" },
        attributes: { exclude: ["password"] },
        raw: true,
      })
      if (!teachers.length) throw new Error("沒有任何使用者!")

      return res.status(200).json(teachers)
    } catch (err) {
      next(err)
    }
  },
  putTeacher: async (req, res, next) => {
    try {
      let targetTeacherId = req.params.id
      const teacher =
        !isNaN(targetTeacherId) && (await Teacher.findByPk(targetTeacherId))
      targetTeacherId = Number(targetTeacherId)
      console.log("teacher:", teacher)
      if (!teacher) throw new Error("該老師不存在！")
      const currentTeacherId = getCurrentTeacher.getTeacher(req).id
      if (targetTeacherId !== currentTeacherId) {
        return res.status(400).json({
          status: "error",
          message: "只能修改自己的資料！",
        })
      }
      const currentTeacher = await Teacher.findByPk(currentTeacherId)
      const { email, name, introduction } = req.body
      // const { files } = req
      // let uploadAvatar = ""
      // const filesAvatar = files ? files.avatar : null

      // uploadAvatar = filesAvatar
      //   ? await imgurFileHandler(files.avatar[0], res)
      //   : currentTeacher.avatar

      // await teacher.update({
      //   email,
      //   name,
      //   introduction,
      //   avatar: uploadAvatar,
      // })
      const { ImgurClient } = require("imgur")
      const uploadAvatar = upload(req, res, async () => {
        const client = new ImgurClient({
          clientId: process.env.IMGUR_CLIENT_ID,
          clientSecret: process.env.IMGUR_CLIENT_SECRET,
          refreshToken: process.env.IMGUR_REFRESH_TOKEN,
        })
        const response = await client.upload({
          image: req.files[0].buffer.toString("base64"),
          type: "base64",
          album: process.env.IMGUR_ALBUM_ID,
        })
        return response.data.link
        // res.send({ url: response.data.link })
      })
      console.log("uploadAvatar:", uploadAvatar)

      await teacher.update({
        email,
        name,
        introduction,
        avatar: uploadAvatar,
      })
      const updatedTeacher = {
        email: teacher.email,
        name: teacher.name,
        introduction: teacher.introduction,
        avatar: uploadAvatar,
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
  getTeacherFavorites: async (req, res, next) => {
    try {
      const targetTeacherId = req.params.id
      const targetTeacherFav = await Favorite.findOne({
        where: { teacherId: targetTeacherId },
      })
      if (!targetTeacherFav) throw new Error("查無該老師收藏資訊")
      return res.json({ status: "success", teacherFav: targetTeacherFav })
    } catch (err) {
      next(err)
    }
  },
  getTeacherReservations: async (req, res, next) => {
    try {
      //需要確認是否為本人？還是前面 authentication 就已經測試過了？
      const currentTeacherId = getCurrentTeacher.getTeacher(req).id
      const reservations = await Reservation.findAll({
        where: { teacherId: currentTeacherId },
      })
      if (!reservations) throw new Error("尚未有人預定課程")
      console.log("reservations:", reservations)
      return res.json({
        status: "success",
        reservations,
      })
    } catch (err) {
      next(err)
    }
  },
  // 串接 google api，讓學生預定的時間可以顯示在老師的 google calendar 上之
}
module.exports = teacherController
