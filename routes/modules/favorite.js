const express = require("express")
const router = express.Router()
const favoriteController = require("../../controllers/favorite-controller")

router.post("/", favoriteController.postFavorites)

module.exports = router
