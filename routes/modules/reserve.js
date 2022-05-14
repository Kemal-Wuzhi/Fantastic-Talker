const express = require("express")
const router = express.Router()
const reserveController = require("../../controllers/reserve-controller")
const { authenticatedUser } = require("../../middleware/auth")

router.post("/", authenticatedUser, reserveController.postReserves)
router.delete("/:id", authenticatedUser, reserveController.deleteReserves)

module.exports = router
