const { Favorite, Teacher, sequelize } = require("../models")
const getCurrentTeacher = require("../helpers/currentDataHelper")
const getCurrentUser = require("../helpers/currentDataHelper")

const favoriteController = {
  postFavorites: async (req, res, next) => {
    try {
      const currentUserId = getCurrentTeacher.getUser(req).id
      const targetTeacherId = Number(req.body.teacherId)
      const targetTeacher = await Teacher.findByPk(targetTeacherId)
      if (!targetTeacher) throw new Error("此名老師不存在")

      const favorite = await Favorite.findOne({
        where: { userId: currentUserId, teacherId: targetTeacherId },
      })
      if (favorite) {
        return res.status(403).json({
          status: "error",
          message: "無法重複收藏該名老師",
        })
      }

      const result = await sequelize.transaction(async (transaction) => {
        const [favoriteRecord] = await Promise.all([
          Favorite.create({
            userId: currentUserId,
            teacherId: targetTeacherId,
            transaction,
          }),
          //增加 total_favorite
          Teacher.increment("total_favorite", {
            where: { id: targetTeacherId },
            by: 1,
            transaction,
          }),
        ])
        return favoriteRecord
      })

      const data = result.toJSON()
      return res.json({ status: "success", data, message: "成功追蹤該名老師" })
    } catch (err) {
      next(err)
    }
  },
  deleteFavorites: async (req, res, next) => {
    try {
      const targetFavoriteId = req.params.id
      const targetFavorite = await Favorite.findByPk(targetFavoriteId)
      if (!targetFavorite) throw new Error("該筆收藏不存在！")

      Teacher.decrement("total_favorite", {
        where: { id: targetFavorite.teacherId },
        by: 1,
      })

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
