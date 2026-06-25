const SiteSetting = require('../models/SiteSetting');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    
    // Fallback: If settings table is empty, create default entry
    if (!settings) {
      settings = new SiteSetting({
        companyName: 'Nitru Connect',
      });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update site settings (Admin)
// @route   PUT /api/admin/settings
// @access  Private
const updateSettings = async (req, res) => {
  const { companyName, logo, phone, whatsapp, email, address, socialLinks, footerDescription, defaultSeoTitle, defaultSeoDescription } = req.body;

  try {
    let settings = await SiteSetting.findOne();

    if (!settings) {
      settings = new SiteSetting();
    }

    settings.companyName = companyName || settings.companyName;
    settings.logo = logo !== undefined ? logo : settings.logo;
    settings.phone = phone !== undefined ? phone : settings.phone;
    settings.whatsapp = whatsapp !== undefined ? whatsapp : settings.whatsapp;
    settings.email = email !== undefined ? email : settings.email;
    settings.address = address !== undefined ? address : settings.address;
    
    if (socialLinks) {
      settings.socialLinks = {
        facebook: socialLinks.facebook !== undefined ? socialLinks.facebook : settings.socialLinks.facebook,
        twitter: socialLinks.twitter !== undefined ? socialLinks.twitter : settings.socialLinks.twitter,
        linkedin: socialLinks.linkedin !== undefined ? socialLinks.linkedin : settings.socialLinks.linkedin,
        instagram: socialLinks.instagram !== undefined ? socialLinks.instagram : settings.socialLinks.instagram,
      };
    }

    settings.footerDescription = footerDescription !== undefined ? footerDescription : settings.footerDescription;
    settings.defaultSeoTitle = defaultSeoTitle !== undefined ? defaultSeoTitle : settings.defaultSeoTitle;
    settings.defaultSeoDescription = defaultSeoDescription !== undefined ? defaultSeoDescription : settings.defaultSeoDescription;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
