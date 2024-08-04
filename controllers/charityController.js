const { Charity, ImpactReport } = require('../models');

const registerCharity = async (req, res) => {
  const { name, email, password, mission, goals } = req.body;
  try {
    const charity = await Charity.create({ name, email, password, mission, goals });
    res.status(201).json({ id: charity.id, name: charity.name });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
