// Teacher （ role: teacher, email: teacher@example.com, password: 12345678）
"use strict"
const bcrypt = require("bcryptjs")
const faker = require("faker")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Teachers", [
      {
        email: "teacher@example.com",
        name: "Cathy",
        password: await bcrypt.hash("12345678", 10),
        role: "teacher",
        introduction: faker.lorem.text().substring(0, 100),
        avatar: "https://loremflickr.com/320/240",
        total_favorite: 10,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teachers", null)
  },
}
