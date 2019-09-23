module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user_update",
    {
      user_id: DataTypes.STRING,
      update: DataTypes.STRING,
      date: DataTypes.STRING,
      day_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
      }
    },
    {
      timestamps: false
    }
  );
};
