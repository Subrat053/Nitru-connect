const Admin = require('../models/Admin');
const Enquiry = require('../models/Enquiry');
const Service = require('../models/Service');
const jwt = require('jsonwebtoken');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'nitru_connect_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  if (req.admin) {
    res.json({
      _id: req.admin._id,
      email: req.admin.email,
      role: req.admin.role,
    });
  } else {
    res.status(404).json({ message: 'Admin profile not found' });
  }
};

// @desc    Get dashboard metrics / stats
// @route   GET /api/admin/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newLeads = await Enquiry.countDocuments({ status: 'New' });
    const inProgressLeads = await Enquiry.countDocuments({ status: 'In Progress' });
    const convertedLeads = await Enquiry.countDocuments({ status: 'Converted' });
    
    // Group enquiries by service name to count service-wise leads
    const serviceStats = await Enquiry.aggregate([
      { $group: { _id: '$selectedService', count: { $sum: 1 } } }
    ]);

    // Group enquiries by month for a monthly graph (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyStats = await Enquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format monthly data for easy charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedMonthlyData = monthlyStats.map(stat => {
      return {
        month: `${months[stat._id.month - 1]} ${stat._id.year}`,
        count: stat.count
      };
    });

    res.json({
      totalEnquiries,
      newLeads,
      inProgressLeads,
      convertedLeads,
      serviceWiseLeads: serviceStats.map(s => ({ service: s._id, count: s.count })),
      monthlyEnquiryGraph: formattedMonthlyData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  getDashboardStats,
};
