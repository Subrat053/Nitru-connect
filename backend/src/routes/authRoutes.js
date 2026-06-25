const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, getDashboardStats } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.get('/dashboard/stats', protect, getDashboardStats);

module.exports = router;
