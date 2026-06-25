const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, getEnquiryById, updateEnquiryStatus, addEnquiryNote, deleteEnquiry } = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { validateEnquiry } = require('../middleware/validateMiddleware');

// Public route
router.post('/', validateEnquiry, createEnquiry);

// Secure admin routes
router.get('/admin/enquiries', protect, getEnquiries);
router.get('/admin/enquiries/:id', protect, getEnquiryById);
router.patch('/admin/enquiries/:id/status', protect, updateEnquiryStatus);
router.patch('/admin/enquiries/:id/notes', protect, addEnquiryNote);
router.delete('/admin/enquiries/:id', protect, deleteEnquiry);

module.exports = router;
