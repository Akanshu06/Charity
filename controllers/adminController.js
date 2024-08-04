const { User, Charity } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Update user status logic (if any)
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCharities = async (req, res) => {
  try {
    const charities = await Charity.findAll();
    res.json(charities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCharityStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const charity = await Charity.findByPk(id);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });
    // Update charity status logic (if any)
    res.json(charity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUsers, updateUserStatus, getCharities, updateCharityStatus };
