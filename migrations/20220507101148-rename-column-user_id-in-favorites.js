"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Favorites", "user_id", "userId")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Favorites", "userId", "user_id")
  },
}
