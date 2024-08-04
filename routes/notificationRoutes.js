const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/donation', notificationController.sendDonationConfirmation);
router.post('/impact', notificationController.sendImpactReport);

module.exports = router;
