const express = require('express');
const router = express.Router();
const psychiatristController = require('../controllers/psychiatristController');

router.post('/fetch', psychiatristController.fetchPsychiatrists);

module.exports = router;
