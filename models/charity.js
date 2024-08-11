const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Charity extends Model {}

Charity.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  goal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  raised: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, { sequelize, modelName: 'Charity' });

module.exports = Charity;
