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
        const { approved } = req.body;

        // Use findByPk instead of findById to fetch the charity by its primary key
        const charity = await Charity.findByPk(id);
        console.log(charity);
        
        if (!charity) return res.status(404).json({ message: 'Charity not found' });

        charity.approved = approved;
        const updatedCharity = await charity.save();
        console.log('Updated Charity:', updatedCharity);
        
        res.status(200).json(updatedCharity);
    } catch (error) {
        console.error('Error in approveCharity:', error);
        res.status(500).json({ message: 'Error updating charity status', error });
    }
};

// Delete a charity by admin
exports.deleteCharity = async (req, res) => {
    try {
        const { id } = req.params;

        // Use findByPk to fetch the charity and then destroy it
        const charity = await Charity.findByPk(id);
        if (!charity) return res.status(404).json({ message: 'Charity not found' });

        await charity.destroy();
        res.status(200).json({ message: 'Charity deleted' });
    } catch (error) {
        console.error('Error in deleteCharity:', error);
        res.status(500).json({ message: 'Error deleting charity', error });
    }
};
