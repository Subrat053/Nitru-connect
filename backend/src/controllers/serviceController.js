const Service = require('../models/Service');
const slugify = require('../utils/slugify');

// @desc    Get all active services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).select('-longDescription -faqs -processSteps');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true })
      .populate('relatedServices', 'title slug category shortDescription');

    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new service (Admin)
// @route   POST /api/admin/services
// @access  Private
const createService = async (req, res) => {
  const { title, category, shortDescription, longDescription, heroImage, galleryImages, benefits, processSteps, faqs, relatedServices, seoTitle, seoDescription, isActive } = req.body;

  try {
    const generatedSlug = slugify(title);
    
    // Check if slug already exists
    const slugExists = await Service.findOne({ slug: generatedSlug });
    if (slugExists) {
      return res.status(400).json({ message: 'A service with a similar title/slug already exists' });
    }

    const service = new Service({
      title,
      slug: generatedSlug,
      category,
      shortDescription,
      longDescription,
      heroImage: heroImage || '',
      galleryImages: galleryImages || [],
      benefits: benefits || [],
      processSteps: processSteps || [],
      faqs: faqs || [],
      relatedServices: relatedServices || [],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || shortDescription,
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update service (Admin)
// @route   PUT /api/admin/services/:id
// @access  Private
const updateService = async (req, res) => {
  const { title, category, shortDescription, longDescription, heroImage, galleryImages, benefits, processSteps, faqs, relatedServices, seoTitle, seoDescription, isActive } = req.body;

  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      if (title) {
        service.slug = slugify(title);
      }
      service.category = category || service.category;
      service.shortDescription = shortDescription || service.shortDescription;
      service.longDescription = longDescription || service.longDescription;
      service.heroImage = heroImage !== undefined ? heroImage : service.heroImage;
      service.galleryImages = galleryImages || service.galleryImages;
      service.benefits = benefits || service.benefits;
      service.processSteps = processSteps || service.processSteps;
      service.faqs = faqs || service.faqs;
      service.relatedServices = relatedServices || service.relatedServices;
      service.seoTitle = seoTitle || service.seoTitle;
      service.seoDescription = seoDescription || service.seoDescription;
      service.isActive = isActive !== undefined ? isActive : service.isActive;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete service (Admin)
// @route   DELETE /api/admin/services/:id
// @access  Private
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Service record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Service record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
