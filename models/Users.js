module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      username: DataTypes.STRING,
      last_update_ds: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      max_day_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
      },
    },
    {
      timestamps: false
    }
  );
};
