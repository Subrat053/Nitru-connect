const express = require('express');
const router = express.Router();
const { getTestimonials, getTestimonialsAdmin, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getTestimonials);

// Secure admin routes
router.get('/admin/testimonials', protect, getTestimonialsAdmin);
router.post('/admin/testimonials', protect, createTestimonial);
router.put('/admin/testimonials/:id', protect, updateTestimonial);
router.delete('/admin/testimonials/:id', protect, deleteTestimonial);

module.exports = router;
