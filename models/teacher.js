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
      // define association here
    }
  }
  Teacher.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      total_favorite: DataTypes.INTEGER,
    },
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  )
  return Teacher
}
