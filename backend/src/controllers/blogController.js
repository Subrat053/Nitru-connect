const Blog = require('../models/Blog');
const slugify = require('../utils/slugify');

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blogs (Admin - including drafts)
// @route   GET /api/admin/blogs
// @access  Private
const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog article (Admin)
// @route   POST /api/admin/blogs
// @access  Private
const createBlog = async (req, res) => {
  const { title, excerpt, content, coverImage, category, tags, seoTitle, seoDescription, status } = req.body;

  try {
    const generatedSlug = slugify(title);

    const slugExists = await Blog.findOne({ slug: generatedSlug });
    if (slugExists) {
      return res.status(400).json({ message: 'A blog with a similar title/slug already exists' });
    }

    const blog = new Blog({
      title,
      slug: generatedSlug,
      excerpt,
      content,
      coverImage: coverImage || '',
      category,
      tags: tags || [],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedService = savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog article (Admin)
// @route   PUT /api/admin/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  const { title, excerpt, content, coverImage, category, tags, seoTitle, seoDescription, status } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title || blog.title;
      if (title) {
        blog.slug = slugify(title);
      }
      blog.excerpt = excerpt || blog.excerpt;
      blog.content = content || blog.content;
      blog.coverImage = coverImage !== undefined ? coverImage : blog.coverImage;
      blog.category = category || blog.category;
      blog.tags = tags || blog.tags;
      blog.seoTitle = seoTitle || blog.seoTitle;
      blog.seoDescription = seoDescription || blog.seoDescription;
      
      if (status && status !== blog.status) {
        blog.status = status;
        if (status === 'published' && !blog.publishedAt) {
          blog.publishedAt = new Date();
        } else if (status === 'draft') {
          blog.publishedAt = null;
        }
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog article (Admin)
// @route   DELETE /api/admin/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog article deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
};
