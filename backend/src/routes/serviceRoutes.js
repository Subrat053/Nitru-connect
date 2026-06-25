const express = require('express');
const router = express.Router();
const { getServices, getServiceBySlug, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Secure admin routes
router.post('/admin/services', protect, createService);
router.put('/admin/services/:id', protect, updateService);
router.delete('/admin/services/:id', protect, deleteService);

module.exports = router;
