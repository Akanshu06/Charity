const User = require('../models/User');
const Charity = require('../models/Charity');

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ users });
};

exports.getCharities = async (req, res) => {
  const charities = await Charity.findAll();
  res.json({ charities });
};

exports.approveCharity = async (req, res) => {
  const charity = await Charity.findByPk(req.params.id);
  charity.approved = true;
  await charity.save();
  res.json({ charity });
};
