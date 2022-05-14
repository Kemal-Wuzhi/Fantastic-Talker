const { Favorite, Teacher, User, sequelize } = require("../models")
const getCurrentTeacher = require("../helpers/currentDataHelper")
const getCurrentUser = require("../helpers/currentDataHelper")

const favoriteController = {
  //postFavorites 只有學生對老師
  postFavorites: async (req, res, next) => {
    try {
      const currentUserId = getCurrentTeacher.getUser(req).id
      const targetTeacherId = Number(req.body.teacherId)
      const targetTeacher = await Teacher.findByPk(targetTeacherId)
      const test = targetTeacher.populate("introduction")
      console.log("test:", test)
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
  deleteFavorites: async (req, res, next) => {
    try {
      //找到要刪除的資料
      const targetFavoriteId = req.params.id
      const userId = getCurrentUser.getUser(req).id
      const targetFavorite = await Favorite.findOne({
        where: { id: targetFavoriteId, userId: userId },
      })
      console.log("targetFavorite:", targetFavorite)
      //確認要刪除的資料是否存在
      if (!targetFavorite) throw new Error("該筆收藏不存在！")
      //刪除資料
      return res.json({
        status: "success",
        data: await targetFavorite.destroy(),
        message: "刪除成功！",
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = favoriteController
