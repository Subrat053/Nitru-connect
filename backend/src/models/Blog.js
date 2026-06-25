const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a blog title'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please add a blog excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please add blog content'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Please add a blog category'],
      trim: true,
    },
    tags: [String],
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
