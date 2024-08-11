const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Charity = require('./Charity');

class Donation extends Model {}

Donation.init({
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  charityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Charity,
      key: 'id',
    }
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, { sequelize, modelName: 'Donation' });

module.exports = Donation;
