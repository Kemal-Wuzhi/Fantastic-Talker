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
<<<<<<< Updated upstream
      email: {
        type: DataTypes.STRING,
        unique: true,
        // allowNull: false
      },
      name: {
        type: DataTypes.STRING,
=======
      name: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
>>>>>>> Stashed changes
        // allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< Updated upstream
=======
        defaultValue: "user",
>>>>>>> Stashed changes
      },
    },
    {
      modelName: "User",
      tableName: "Users",
    }
  )
  return User
}
