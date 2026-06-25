const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Nitru Connect',
    },
    logo: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    whatsapp: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    footerDescription: {
      type: String,
      default: 'Nitru Connect helps businesses find better solutions for payments, funding, digital growth, telecoms, and essential business services.',
    },
    defaultSeoTitle: {
      type: String,
      default: 'Nitru Connect - Connecting Businesses to Smarter Growth Solutions',
    },
    defaultSeoDescription: {
      type: String,
      default: 'Find better merchant services, business funding, business energy, telecom and broadband connections, waste management solutions, and digital growth with Nitru Connect.',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
