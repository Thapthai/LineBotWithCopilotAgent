module.exports = function (sequelize, Sequelize) {
  const { DataTypes } = require("sequelize");
  const Tokens = sequelize.define(
    "tokens",
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      access_token: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
      token_expire_at: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Tokens.sync();

  return Tokens;
};
