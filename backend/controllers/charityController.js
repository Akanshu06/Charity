const Charity = require('../models/charity');

exports.getAllCharities = async (req, res) => {
  try {
    const charities = await Charity.findAll();
    res.status(200).json({charities});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCharity = async (req, res) => {
  try {
    const { name, description, website,loction ,mission, goals, projects ,raised} = req.body;
    console.log('ihihiu',loction,name,description);
    
    const newCharity = new Charity({
        name,
        description,
        website,
        loction,
        mission,
        goals,
        projects,
        raised
    });
    const savedCharity = await newCharity.save();
    res.status(201).json(savedCharity);
} catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCharityProfile = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedCharity = await Charity.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCharity) return res.status(404).json({ message: 'Charity not found' });
      res.status(200).json(updatedCharity);
  } catch (error) {
      res.status(500).json({ message: 'Error updating charity profile', error });
  }
};
