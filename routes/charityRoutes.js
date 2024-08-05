const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const {verifyToken,admin} = require('../middlewares/authMiddleware');

router.post('/register', verifyToken,admin, charityController.registerCharity);
router.put('/:id', verifyToken,admin, charityController.updateCharityProfile);
router.post('/:id/impact', verifyToken,admin, charityController.addImpactReport);

module.exports = router;
