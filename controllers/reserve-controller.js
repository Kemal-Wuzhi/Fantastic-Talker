const { Reservation, Teacher } = require("../models")
const getCurrentUser = require("../helpers/currentDataHelper")

const reserveController = {
  postReserves: async (req, res, next) => {
    try {
      // reservation feature
      // front-end will offer timetable for user to choose
      const { startTime, endTime, teacherId } = req.body
      const userId = getCurrentUser.getUser(req).id

      const checkTeacherTime = await Reservation.findOne({
        where: {
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          teacherId: req.body.teacherId,
        },
      })
      if (checkTeacherTime) throw new Error("該時段已被預約！")

      const checkUserTime = await Reservation.findOne({
        where: {
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          userId,
        },
      })
      if (checkUserTime) throw new Error("您該時段已有課程！")

      const reservation = await Reservation.create({
        userId,
        teacherId,
        startTime,
        endTime,
      })

      // google calendar api
      // const shareLink ="https://calendar.google.com/calendar/u/0?cid=Z21oNGFyMDR1Y2p2ZHFvOWZvdjRvbTl1YXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
      const { google } = require("googleapis")
      require("dotenv").config()
      const calendar = google.calendar({ version: "v3" })
      const calendarId = process.env.CALENDAR_ID
      const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
      const SCOPES = "https://www.googleapis.com/auth/calendar"
      const auth = new google.auth.JWT(
        CREDENTIALS.client_email,
        null,
        CREDENTIALS.private_key,
        SCOPES
      )
      const teacherName = (await Teacher.findByPk(teacherId)).dataValues.name
      const teacherIntro = (await Teacher.findByPk(teacherId)).dataValues
        .introduction

      let event = {
        summary: `${teacherName}'s class`,
        description: `${teacherIntro}`,
        start: {
          dateTime: startTime,
          timeZone: "Asia/Taipei",
        },
        end: {
          dateTime: endTime,
          timeZone: "Asia/Taipei",
        },
      }

      const insertEvent = (async () => {
        try {
          let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event,
          })
        } catch (error) {
          return false
        }
      })()

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
