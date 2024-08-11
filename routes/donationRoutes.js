const express = require('express');
const { createDonation, verifyDonation, } = require('../controllers/donationController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, createDonation);
router.post('/verify', authenticate, verifyDonation);

module.exports = router;
