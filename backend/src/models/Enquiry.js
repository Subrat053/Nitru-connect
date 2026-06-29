const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    businessType: {
      type: String,
      default: '',
    },
    selectedService: {
      type: String,
      required: [true, 'Please select a primary service'],
    },
    message: {
      type: String,
      default: '',
    },
    uploadedFile: {
      type: String, // URL to statement/bill uploaded
      default: '',
    },
    sourcePage: {
      type: String,
      default: '/',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Rejected'],
      default: 'New',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    adminNotes: [
      {
        note: { type: String, required: true },
        addedBy: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    consentAccepted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
