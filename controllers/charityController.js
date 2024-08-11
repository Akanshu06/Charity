const Charity = require('../models/Charity');
//const { get } = require('../routes/charityRoutes');

// Register a new charity
const createCharity = async (req, res) => {
  const { name, mission, goal, category, location, description } = req.body;
  try {
    const charity = await Charity.create({ name, mission, goal, category, location, description });
    res.status(201).json({ charity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register charity' });
  }
};

// Update charity profile information
const updateCharity = async (req, res) => {
  const { name, mission, goal, category, location, description } = req.body;
  try {
    const charity = await Charity.findByPk(req.params.id);
    if (charity) {
      await charity.update({ name, mission, goal, category, location, description });
      res.status(200).json({ charity });
    } else {
      res.status(404).json({ error: 'Charity not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update charity' });
  }
};

// List all charities with optional search and filter
const listCharities = async (req, res) => {
  const { category, location } = req.query;
  const whereClause = {};
  if (category) whereClause.category = category;
  if (location) whereClause.location = location;

  try {
    const charities = await Charity.findAll({ where: whereClause });
    res.status(200).json({ charities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch charities' });
  }
};

// View individual charity details
const getCharity = async (req, res) => {
  try {
    const charity = await Charity.findByPk(req.params.id);
    if (charity) {
      res.status(200).json({ charity });
    } else {
      res.status(404).json({ error: 'Charity not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch charity details' });
  }
};

module.exports={
  createCharity,updateCharity,listCharities,getCharity
}