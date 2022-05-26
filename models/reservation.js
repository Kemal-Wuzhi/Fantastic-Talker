"use strict"
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: "Reservation",
      tableName: "Reservations",
    }
  )
  // 印出 models 看一下是什麼東西
  Reservation.associate = function (models) {
    Reservation.belongsTo(models.User, { foreignKey: "userId" })
    Reservation.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
    })
  }
  return Reservation
}
