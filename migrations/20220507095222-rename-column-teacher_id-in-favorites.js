"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Favorites", "teacher_id", "teacherId")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Favorites", "teacherId", "teacher_id")
  },
}
