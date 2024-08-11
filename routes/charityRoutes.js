const express = require('express');
const { createCharity, listCharities, updateCharity, getCharity } = require('../controllers/charityController');

const router = express.Router();

router.post('/create', createCharity);
router.get('/', listCharities);
router.put('/:id',updateCharity);
router.get('/:id',getCharity);

module.exports = router;
