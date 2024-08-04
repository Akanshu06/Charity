const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken, donationController.makeDonation);
router.get('/history', authMiddleware.verifyToken, donationController.getDonationHistory);

module.exports = router;
