const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const User = require('../models/user');

// Middleware to ensure the user is an admin
const isAdmin = async(req, res, next) => {
   // console.log('admin',req.userId);
    const user = await User.findOne({where:{id:req.userId.id}})
    console.log(user.admin);
    
     if (!user.admin) {
         return res.status(403).json({ message: 'Access denied' });
     }
     next();
};

router.get('/users', authenticate, isAdmin ,adminController.getAllUsers);
router.put('/charity/:id/approve' ,authenticate,isAdmin,  adminController.approveCharity);
router.delete('/charity/:id', authenticate,isAdmin,  adminController.deleteCharity);
router.get('/charities',authenticate,isAdmin,adminController.getCharities);

module.exports = router;
