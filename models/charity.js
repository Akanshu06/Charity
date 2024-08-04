module.exports = (sequelize, DataTypes) => {
    const Charity = sequelize.define('Charity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mission: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      goals: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    return Charity;
  };
  