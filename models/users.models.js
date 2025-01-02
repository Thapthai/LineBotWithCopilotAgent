module.exports = function (sequelize, Sequelize) {
  const { DataTypes } = require("sequelize");
  const Users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
      },
      line_user_id: {
        type: DataTypes.STRING,
      },

      name: {
        type: DataTypes.STRING,
      },
      last_active: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Users.sync();

  return Users;
};
