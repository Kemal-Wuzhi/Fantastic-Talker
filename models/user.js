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
      name: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        // allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      modelName: "User",
      tableName: "Users",
    }
  )
  // 印出 models 看一下是什麼東西
  User.associate = function (models) {
    User.hasMany(models.Favorite, { foreignKey: "userId" })
    User.hasMnay(models.Reservation, { foreignKey: "userId" })
  }
  return User
}
