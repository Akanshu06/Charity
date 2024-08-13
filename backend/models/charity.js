const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Charity extends Model {}

Charity.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming website is optional
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Unknown',  // Set a default value
  },
  mission: {
    type: DataTypes.TEXT,
    allowNull: true, // Assuming mission is optional
  },
  goals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projects: {
    type: DataTypes.TEXT,
    allowNull: true, // Assuming projects are optional
  },
  
  raised: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    default: false // Charities need admin approval to be active
}
}, { sequelize, modelName: 'Charity' });

module.exports = Charity;