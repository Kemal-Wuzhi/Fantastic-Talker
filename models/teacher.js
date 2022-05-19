"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.associate = function (models) {
        User.hasMany(models.Favorite, { foreignKey: "teacherId" })
        User.hasMany(models.Reservation, { foreignKey: "teacherId" })
      }
    }
  }
  Teacher.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: { type: DataTypes.JSON },
      role: DataTypes.STRING,

      introduction: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      total_favorite: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Teacher",
      tableName: "Teachers",
    }
  )
  return Teacher
}
