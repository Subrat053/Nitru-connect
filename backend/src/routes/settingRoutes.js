const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getSettings);

// Secure admin route
router.put('/admin/settings', protect, updateSettings);

module.exports = router;
