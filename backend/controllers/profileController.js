const { where } = require('sequelize');
const User = require('../models/user');

exports.getProfile = async (req, res) => {
  console.log('user',req.userId);
  try {
    const user = await User.findOne({where:{id:req.userId}});

   
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.username = username || user.username;
    user.email = email || user.email;
    
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
