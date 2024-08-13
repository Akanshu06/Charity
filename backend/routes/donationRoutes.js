const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, donationController.getAllDonations);
router.post('/', authenticate, donationController.createDonation);
router.post('/verify', authenticate , donationController.verifyDonation)
module.exports = router;
