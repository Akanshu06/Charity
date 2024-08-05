const { Charity, ImpactReport } = require('../models');

const registerCharity = async (req, res) => {
  const { name, email, password, mission, goals, projects } = req.body;

  // Validate input
  if (!name || !email || !password || !mission || !goals) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if charity already exists
    const existingCharity = await Charity.findOne({ where: { email } });
    if (existingCharity) {
      return res.status(409).json({ error: 'Charity already exists' });
    }

    // Create new charity
    const charity = await Charity.create({ name, email, password, mission, goals, projects });
    res.status(201).json({ id: charity.id, name: charity.name });
  } catch (err) {
    console.error('Error during charity registration:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCharityProfile = async (req, res) => {
  const { id } = req.params;
  const { mission, goals } = req.body;
  try {
    const charity = await Charity.findByPk(id);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });
    await charity.update({ mission, goals });
    res.json(charity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addImpactReport = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const charity = await Charity.findByPk(id);
    if (!charity) return res.status(404).json({ error: 'Charity not found' });
    const report = await ImpactReport.create({ title, description, CharityId: id });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerCharity, updateCharityProfile, addImpactReport };
