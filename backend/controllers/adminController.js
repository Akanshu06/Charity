const User = require('../models/user');
const Charity = require('../models/charity');

exports.getCharities = async (req,res)=>{
  try {
    const charities =await Charity.findAll();
    res.status(200).json({charities});
  } catch (error) {
    res.status(404).json({message:'somthing went wrong in gettingcharity'})
  }
};

// Fetch all users for admin management
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Approve or reject a charity
exports.approveCharity = async (req, res) => {
    try {

        const { id } = req.params;
        console.log('id',id);
        
        const { approved } = req.body;
        const charity = await Charity.findById(id);
        if (!charity) return res.status(404).json({ message: 'Charity not found' });

        charity.approved = approved;
        const updatedCharity = await charity.save();
        res.status(200).json(updatedCharity);
    } catch (error) {
        res.status(500).json({ message: 'Error updating charity status', error });
    }
};

// Delete a charity by admin
exports.deleteCharity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCharity = await Charity.findByIdAndDelete(id);
        if (!deletedCharity) return res.status(404).json({ message: 'Charity not found' });
        res.status(200).json({ message: 'Charity deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting charity', error });
    }
};
