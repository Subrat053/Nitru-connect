const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new testimonial (Admin)
// @route   POST /api/admin/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
  const { clientName, companyName, rating, review, image, isActive } = req.body;

  try {
    const testimonial = new Testimonial({
      clientName,
      companyName,
      rating,
      review,
      image: image || '',
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedTestimonial = await testimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update testimonial (Admin)
// @route   PUT /api/admin/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
  const { clientName, companyName, rating, review, image, isActive } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.clientName = clientName || testimonial.clientName;
      testimonial.companyName = companyName || testimonial.companyName;
      testimonial.rating = rating !== undefined ? rating : testimonial.rating;
      testimonial.review = review || testimonial.review;
      testimonial.image = image !== undefined ? image : testimonial.image;
      testimonial.isActive = isActive !== undefined ? isActive : testimonial.isActive;

      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete testimonial (Admin)
// @route   DELETE /api/admin/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial deleted successfully' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
