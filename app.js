if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
//google api
const { google } = require("googleapis")
const { OAuth2 } = google.auth
const Oauth2Client = new OAuth2(process.env.ClientId, process.env.ClientSecret)
Oauth2Client.setCredentials({
  refresh_token: process.env.refresh_token,
})
const calendar = google.calendar({ version: "v3", auth: "Oauth2Client" })

const eventStartTime = new Date()
//this will insert the calendar tomorrow
eventStartTime.setDate(eventStartTime.getDay() + 2)
const eventEndTime = new Date()
//this will set the end times at the same day but 45 minutes latter than the start time
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
  summary: "test the google api",
  location: "Taipei,Taiwan",
  description: "practice how to use google api.",
  start: { dateTime: eventStartTime, timeZone: "Japan/Tokyo" },
  end: { dateTime: eventEndTime, timeZone: "Asia/Taipei" },
  colorId: 1,
}

// free busy query
// need to give valid api keys
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: "Asia/Taipei",
//       items: [{ id: "primary" }],
//     },
//   },
//   (err, res) => {
//     if (err) return console.error("Free Busy Query Error:", err)
//     const eventsArr = res.data.calendars.primary.busy
//     console.log("eventsArr:", eventArr)
//     if (eventsArr.length === 0) {
//       return calendar.events.insert(
//         {
//           calendarId: "primary",
//           resource: event,
//         },
//         (err) => {
//           if (err) return console.error("Calendar Event Creation Error:", err)
//           return console.log("Calendar Event Created.")
//         }
//       )
//     }
//     return console.log("Sorry I'm Busy")
//   }
// )

const express = require("express")
const app = express()
const passport = require("./config/passport")
const routes = require("./routes")
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.use(routes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
