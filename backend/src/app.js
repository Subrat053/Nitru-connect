const express = require('express');
const cors = require('cors');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const settingRoutes = require('./routes/settingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const partnerRoutes = require('./routes/partnerRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (fallback when Cloudinary is not configured)
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Routes Hookup
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api', uploadRoutes); // Handles POST /api/upload and POST /api/admin/upload
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/partners', partnerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Nitru Connect API running successfully.');
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
