const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authMiddleware.admin, charityController.registerCharity);
router.put('/:id', authMiddleware.admin, charityController.updateCharityProfile);
router.post('/:id/impact', authMiddleware.admin, charityController.addImpactReport);

module.exports = router;
