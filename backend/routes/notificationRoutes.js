const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const notificationController = require('../controllers/notificationController')

router.post('/donation-confirmation', authenticate, notificationController.sendDonationConfirmation);

module.exports=router;