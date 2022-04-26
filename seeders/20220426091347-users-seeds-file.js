// User 2 個學生（role: user, email: user1@example.com, password: 12345678…）
"use strict"
const bcrypt = require("bcryptjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@example.com",
        name: "admin",
        password: await bcrypt.hash("12345678", 10),
        role: "admin",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        email: "user1@example.com",
        name: "user1",
        password: await bcrypt.hash("12345678", 10),
        role: "user",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        email: "user2@example.com",
        name: "user2",
        password: await bcrypt.hash("12345678", 10),
        role: "user",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null)
  },
}
