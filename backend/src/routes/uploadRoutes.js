const express = require('express');
const router = express.Router();
const { uploadFile, listMedia, deleteMedia } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public upload route (e.g., statements submitted by customers in leads form)
router.post('/upload', upload.single('file'), uploadFile);

// Secure admin upload route (e.g., logo, testimonials, blog cover images)
router.post('/admin/upload', protect, upload.single('file'), uploadFile);

// Secure media library routes
router.get('/admin/media', protect, listMedia);
router.delete('/admin/media/:id', protect, deleteMedia);

module.exports = router;
