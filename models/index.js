const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Charity = require('./charity')(sequelize, Sequelize.DataTypes);
const Donation = require('./donation')(sequelize, Sequelize.DataTypes);
const ImpactReport = require('./impactReport')(sequelize, Sequelize.DataTypes);

User.hasMany(Donation);
Donation.belongsTo(User);

Charity.hasMany(Donation);
Donation.belongsTo(Charity);

module.exports = {
  sequelize,
  User,
  Charity,
  Donation,
  ImpactReport,
};
