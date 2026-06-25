const Partner = require('../models/Partner');

// @desc    Get all active partners
// @route   GET /api/partners
// @access  Public
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new partner (Admin)
// @route   POST /api/admin/partners
// @access  Private
const createPartner = async (req, res) => {
  const { name, logo, website, category, isActive } = req.body;

  try {
    const partner = new Partner({
      name,
      logo,
      website: website || '',
      category: category || 'Integration',
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedPartner = await partner.save();
    res.status(201).json(savedPartner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update partner details (Admin)
// @route   PUT /api/admin/partners/:id
// @access  Private
const updatePartner = async (req, res) => {
  const { name, logo, website, category, isActive } = req.body;

  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      partner.name = name || partner.name;
      partner.logo = logo || partner.logo;
      partner.website = website !== undefined ? website : partner.website;
      partner.category = category || partner.category;
      partner.isActive = isActive !== undefined ? isActive : partner.isActive;

      const updatedPartner = await partner.save();
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete partner (Admin)
// @route   DELETE /api/admin/partners/:id
// @access  Private
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      await partner.deleteOne();
      res.json({ message: 'Partner deleted successfully' });
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
};
