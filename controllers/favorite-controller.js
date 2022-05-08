const { Favorite, Teacher, User, sequelize } = require("../models")
const getCurrentTeacher = require("../helpers/currentDataHelper")

const favoriteController = {
  //postFavorites 只有學生對老師
  postFavorites: async (req, res, next) => {
    try {
      const currentUserId = getCurrentTeacher.getUser(req).id
      const targetTeacherId = Number(req.body.teacherId)
      const targetTeacher = await Teacher.findByPk(targetTeacherId)
      if (!targetTeacher) throw new Error("此名老師不存在")
      //判斷是否重複收藏
      const favorite = await Favorite.findOne({
        where: { userId: currentUserId, teacherId: targetTeacherId },
      })
      if (favorite) {
        return res.status(403).json({
          status: "error",
          message: "無法重複收藏該名老師",
        })
      }
      //建立收藏關係
      const result = await Favorite.create({
        userId: currentUserId,
        teacherId: targetTeacherId,
      })
      const data = result.toJSON()
      return res.json({ status: "success", data, message: "成功追蹤該名老師" })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = favoriteController
