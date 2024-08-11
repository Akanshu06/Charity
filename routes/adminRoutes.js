const express = require('express');
const { getUsers, getCharities, approveCharity } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/charities', getCharities);
router.put('/charity/:id/approve', approveCharity);

module.exports = router;
