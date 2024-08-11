const express = require('express');
const { getProfile, updateProfile, getDonationHistory } = require('../controllers/profileController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/get', authenticate, getProfile);
router.put('/put', authenticate, updateProfile);
router.get('/donations', authenticate, getDonationHistory);

module.exports = router;
