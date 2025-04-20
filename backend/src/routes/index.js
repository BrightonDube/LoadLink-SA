const express = require('express');
const router = express.Router();
const { getApiStatus } = require('../controllers');

// Root route
router.get('/', getApiStatus);

module.exports = router; 