const { Favorite } = require("../models")

const favoriteController = {
  //postFavorites 只有學生對老師
  postFavorites: async (req, res, next) => {
    try {
      const targetTeacherId = Number(req.body.id)
      if (!targetTeacherId) throw new Error("此名老師不存在")
      //判斷是否重複收藏
      //建立收藏關係
      const result = await Promise.all(Favorite.create({}))
      //model 是否需要設立關連
    } catch (err) {
      next(err)
    }
  },
}

module.exports = favoriteController
