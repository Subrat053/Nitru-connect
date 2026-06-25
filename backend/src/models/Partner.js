const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a partner name'],
      unique: true,
    },
    logo: {
      type: String,
      required: [true, 'Please add a partner logo URL'],
    },
    website: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Integration',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Partner', partnerSchema);
