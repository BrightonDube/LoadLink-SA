const express = require('express');
const router = express.Router();
const {
  createLoad,
  getAvailableLoads,
  getMyLoads,
  getLoad,
  updateLoad,
  deleteLoad
} = require('../controllers/loadController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { loadValidation } = require('../middleware/validators');

// Routes for all authenticated users
router.get('/:id', protect, getLoad);

// Routes for customers only
router.post('/', protect, authorize('customer'), loadValidation, validate, createLoad);
router.get('/myloads', protect, authorize('customer'), getMyLoads);
router.put('/:id', protect, authorize('customer'), loadValidation, validate, updateLoad);
router.delete('/:id', protect, authorize('customer'), deleteLoad);

// Routes for drivers only
router.get('/', protect, authorize('driver'), getAvailableLoads);

module.exports = router; 