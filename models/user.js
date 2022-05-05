"use strict"
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        // allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "User",
      tableName: "Users",
    }
  )
  return User
}
