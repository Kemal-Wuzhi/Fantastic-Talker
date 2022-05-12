"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reservations", "teacher_id", "teacherId")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reservations", "teacherId", "teacher_id")
  },
}
