const express = require("express")
const router = express.Router()
const adminController = require("../../controllers/admin-controller")

router.get("/users", adminController.getUsers)
router.delete("/users/:id", adminController.deleteUser)
router.delete("/teachers/:id", adminController.deleteTeacher)

module.exports = router
