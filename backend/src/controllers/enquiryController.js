const Enquiry = require('../models/Enquiry');
const { sendEmail, getLeadNotificationHtml } = require('../utils/sendEmail');

// @desc    Submit a new enquiry (Public)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  const { fullName, email, phone, companyName, businessType, selectedService, message, uploadedFile, sourcePage, consentAccepted } = req.body;

  try {
    const enquiry = new Enquiry({
      fullName,
      email,
      phone,
      companyName,
      businessType,
      selectedService,
      message,
      uploadedFile: uploadedFile || '',
      sourcePage: sourcePage || '/',
      consentAccepted,
    });

    const savedEnquiry = await enquiry.save();

    // Trigger asynchronous notification email alert to Admin
    try {
      const emailHtml = getLeadNotificationHtml(savedEnquiry);
      await sendEmail({
        subject: `New Lead: ${selectedService} - ${companyName}`,
        html: emailHtml,
      });
    } catch (emailError) {
      // Log error but don't fail client request
      console.error('Failed to dispatch admin notification email:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you. Nitru Connect team will contact you soon.',
      data: savedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/admin/enquiries
// @access  Private
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single enquiry (Admin)
// @route   GET /api/admin/enquiries/:id
// @access  Private
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      res.json(enquiry);
    } else {
      res.status(404).json({ message: 'Enquiry record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (Admin)
// @route   PATCH /api/admin/enquiries/:id/status
// @access  Private
const updateEnquiryStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = status;
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add admin note (Admin)
// @route   PATCH /api/admin/enquiries/:id/notes
// @access  Private
const addEnquiryNote = async (req, res) => {
  const { note, addedBy } = req.body;

  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.adminNotes.push({
        note,
        addedBy: addedBy || 'Admin',
      });
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete enquiry / Spam enquiry (Admin)
// @route   DELETE /api/admin/enquiries/:id
// @access  Private
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      await enquiry.deleteOne();
      res.json({ message: 'Enquiry record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Enquiry record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  addEnquiryNote,
  deleteEnquiry,
};
