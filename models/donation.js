module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      donationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
    return Donation;
  };
  