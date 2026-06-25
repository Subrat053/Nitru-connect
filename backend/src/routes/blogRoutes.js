const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Secure admin routes
router.get('/admin/blogs', protect, getAllBlogsAdmin);
router.post('/admin/blogs', protect, createBlog);
router.put('/admin/blogs/:id', protect, updateBlog);
router.delete('/admin/blogs/:id', protect, deleteBlog);

module.exports = router;
