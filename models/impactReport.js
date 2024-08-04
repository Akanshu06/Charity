module.exports = (sequelize, DataTypes) => {
    const ImpactReport = sequelize.define('ImpactReport', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    return ImpactReport;
  };
  