"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reservations", "startTime", {
      allowNull: false,
      type: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reservations", "startTime")
  },
}
