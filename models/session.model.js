module.exports = function (sequelize, Sequelize) {
  const { DataTypes } = require("sequelize");
  const Sessions = sequelize.define(
    "sessions",
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      session_date: {
        type: DataTypes.STRING,
      },
      conversation_id: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      last_message: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Sessions.sync();

  return Sessions;
};
