const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const authenticate = require('../middleware/authenticate');

router.get('/', charityController.getAllCharities);
router.post('/', authenticate, charityController.createCharity);
router.put('/:id', authenticate, charityController.updateCharityProfile);

module.exports = router;
