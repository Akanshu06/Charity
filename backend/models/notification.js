
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Charity = require('./charity');


class Notification extends Model {}

Notification.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  charityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { sequelize, modelName: 'Notification' });

module.exports = Notification;
