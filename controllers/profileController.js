const User = require('../models/User');
const Donation = require('../models/Donation');

// Get user profile information
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

// Update user profile information
exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    if (user) {
      await user.update({ username, email });
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Get user donation history
exports.getDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.findAll({ where: { userId: req.userId } });
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve donation history' });
  }
};
