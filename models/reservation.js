// "use strict"
// const { Model } = require("sequelize")
// module.exports = (sequelize, DataTypes) => {
//   class Reservation extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Reservation.init(
//     {
//       teacherId: DataTypes.INTEGER,
//       userId: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Reservation",
//     }
//   )
//   return Reservation
// }

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
  Reservation.associate = function (models) {}
  return Reservation
}
