"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reservations", "user_id", "userId")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reservations", "userId", "user_id")
  },
}
