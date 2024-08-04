const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.register);
router.post('/login', authController.login);

module.exports = router;
