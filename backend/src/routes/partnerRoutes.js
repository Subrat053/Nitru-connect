const express = require('express');
const router = express.Router();
const { getPartners, getPartnersAdmin, createPartner, updatePartner, deletePartner } = require('../controllers/partnerController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getPartners);

// Secure admin routes
router.get('/admin/partners', protect, getPartnersAdmin);
router.post('/admin/partners', protect, createPartner);
router.put('/admin/partners/:id', protect, updatePartner);
router.delete('/admin/partners/:id', protect, deletePartner);

module.exports = router;
