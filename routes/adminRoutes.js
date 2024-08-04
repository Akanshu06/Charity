const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware.admin, adminController.getUsers);
router.put('/users/:id', authMiddleware.admin, adminController.updateUserStatus);
router.get('/charities', authMiddleware.admin, adminController.getCharities);
router.put('/charities/:id', authMiddleware.admin, adminController.updateCharityStatus);

module.exports = router;
