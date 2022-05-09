const express = require("express")
const router = express.Router()
const favoriteController = require("../../controllers/favorite-controller")
const { authenticatedUser } = require("../../middleware/auth")

router.post("/", authenticatedUser, favoriteController.postFavorites)
router.delete("/:id", authenticatedUser, favoriteController.deleteFavorites)

module.exports = router
