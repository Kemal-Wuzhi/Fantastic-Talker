const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Reservation, sequelize } = require("../models")
const getCurrentUser = require("../helpers/currentDataHelper")

const reserveController = {
  postReserves: async (req, res, next) => {
    try {
      const { startTime, endTime, teacherId } = req.body
      const userId = getCurrentUser.getUser(req).id
      // 前端提供時間的區段，而非讓學生自己填時段，ex:15:00~15:25, 15:30~16:00
      const checkTeacherTime = await Reservation.findOne({
        where: { startTime, endTime, teacherId },
      })
      if (checkTeacherTime) throw new Error("該時段已被預約！")
      const checkUserTime = await Reservation.findOne({
        where: { startTime, endTime, userId },
      })
      if (checkUserTime) throw new Error("您該時段已有課程！")
      const reservation = await Reservation.create({
        userId,
        teacherId,
        startTime,
        endTime,
      })
      console.log("reservation:", reservation)
      return res.json({
        status: "success",
        reservation,
        message: "已成功預約該時段！",
      })
    } catch (err) {
      next(err)
    }
  },
  deleteReserves: async (req, res, next) => {
    const reserveId = req.params.id
    const targetReserve = await Reservation.findByPk(reserveId)
    return res.json({
      status: "success",
      data: await targetReserve.destroy(),
      message: "成功取消預約！",
    })
  },
}
module.exports = reserveController
