import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Plus, X, RefreshCw, Upload, Trash2, Edit, Calendar, BookOpen } from 'lucide-react';

const BlogsManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Payments',
    excerpt: '',
    content: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    tags: [],
    status: 'published',
  });

  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getBlogsAdmin();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      // Fallback to public blogs if admin endpoint has issues during testing
      try {
        const fallbackData = await api.getBlogs();
        setBlogs(fallbackData);
      } catch (fallbackErr) {
        setErrorMsg('Failed to load blogs database.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category || 'Payments',
      excerpt: item.excerpt || '',
      content: item.content || '',
      coverImage: item.coverImage || '',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      tags: item.tags || [],
      status: item.status || 'draft',
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Payments',
      excerpt: '',
      content: '',
      coverImage: '',
      seoTitle: '',
      seoDescription: '',
      tags: [],
      status: 'published',
    });
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    if (!editingId) {
      const slugVal = titleVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ 
        ...prev, 
        title: titleVal, 
        slug: slugVal,
        seoTitle: titleVal.substring(0, 60)
      }));
    } else {
      setFormData(prev => ({ ...prev, title: titleVal }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const result = await api.uploadFile(file, 'nitru_blogs');
      setFormData(prev => ({ ...prev, coverImage: result.url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Tags Handlers
  const addTag = () => {
    if (!tagInput.trim()) return;
    const cleaned = tagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleaned && !formData.tags.includes(cleaned)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, cleaned]
      }));
    }
    setTagInput('');
  };

  const removeTag = (idx) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateBlog(editingId, formData);
      } else {
        await api.createBlog(formData);
      }
      setIsEditing(false);
      fetchBlogs();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete blog "${title}"?`)) return;
    try {
      await api.deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left font-montserrat">
      <SEO title="Manage Blogs" />

      {/* Header Actions */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-md bg-white/40 border border-white/50 shrink-0">
        <div className="text-left">
          <h3 className="text-sm font-bold text-neutral">Content Manager (Blogs)</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Write and manage guides, industry comparisons, and cost audit advice.</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAddNewClick}
            className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>Write Article</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : errorMsg ? (
        <div className="glass-panel text-red-600 text-xs p-4 rounded-xl border border-red-200 text-center max-w-md mx-auto my-8 font-semibold bg-red-50/20">
          {errorMsg}
        </div>
      ) : isEditing ? (
        /* Blog Editor Panel Card */
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 shadow-md flex flex-col gap-6 bg-white/40 border border-white/50">
          <div className="border-b border-white/60 pb-4 flex justify-between items-center">
            <h4 className="font-bold text-neutral">{editingId ? 'Edit Article Details' : 'Write New Article'}</h4>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-neutral focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Article Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. 5 Ways to Lower Card Processing Fees"
                className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-slate-700"
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Article Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="lower-card-processing-fees"
                className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white text-slate-700"
              >
                <option value="Payments">Payments</option>
                <option value="Finance">Finance</option>
                <option value="Utilities">Utilities</option>
                <option value="Telecoms">Telecoms</option>
                <option value="Growth">Growth</option>
              </select>
            </div>

            {/* Publication Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Publication Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white text-slate-700"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Tags Adder */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Tag Chips</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. fees"
                  className="flex-1 border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary font-semibold text-slate-700"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 rounded-xl shadow-sm transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                    <span>#{tag}</span>
                    <button type="button" onClick={() => removeTag(idx)} className="text-red-500 hover:text-red-700 ml-1">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Excerpt (Short Summary) *</label>
            <input
              type="text"
              required
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Short teaser summary that will show on the blogs list grid card..."
              className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-slate-700"
            />
          </div>

          {/* Content Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Article Rich Content *</label>
            <textarea
              rows="10"
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write the full markdown or plaintext content of the guide..."
              className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none text-slate-700"
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Cover Image (URL or Upload)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                placeholder="https://example.com/cover.png"
                className="flex-1 border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary font-semibold text-slate-700"
              />
              <div className="relative shrink-0">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept="image/*"
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  {uploadingImage ? <RefreshCw className="animate-spin" size={14} /> : <Upload size={14} />}
                  <span>Upload Image</span>
                </button>
              </div>
            </div>
            {formData.coverImage && (
              <img 
                src={formData.coverImage} 
                alt="Cover Preview" 
                className="h-28 w-48 object-cover rounded-xl mt-2 border border-slate-200 shadow-sm"
              />
            )}
          </div>

          {/* SEO Parameters */}
          <div className="border-t border-white/60 pt-6 flex flex-col gap-4">
            <h5 className="text-xs font-bold text-neutral">Search Engine Optimization (SEO) Metadata</h5>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">SEO Meta Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Max 60 characters for best display on Google search"
                  className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary font-semibold text-slate-700"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">SEO Meta Description</label>
                <input
                  type="text"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Max 160 characters summary for Google description snippets"
                  className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary font-semibold text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t border-white/60 pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              Save Article
            </button>
          </div>
        </form>
      ) : (
        /* Blog list grid layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="glass-panel border border-white/50 rounded-3xl overflow-hidden shadow-md bg-white/40 flex flex-col h-full hover:-translate-y-0.5 transition-all"
            >
              {/* Cover Image */}
              <div className="h-36 bg-gradient-to-r from-primary to-[#1844cb] relative flex items-center justify-center shrink-0 text-white font-bold font-montserrat text-sm">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <span>{blog.category}</span>
                )}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="bg-secondary text-neutral font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                    {blog.category}
                  </span>
                  <span className={`font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm ${
                    blog.status === 'published' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    {blog.status || 'draft'}
                  </span>
                </div>
                <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded border bg-white/60 text-gray-500 border-white shadow-sm flex items-center gap-1">
                  <Calendar size={10} className="text-primary/70" />
                  <span>
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </span>
              </div>

              {/* Info Block */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-neutral text-xs sm:text-sm line-clamp-2 leading-snug">{blog.title}</h4>
                  <p className="text-gray-400 text-[10px] font-bold">SLUG: <code>/{blog.slug}</code></p>
                  <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3 font-semibold">{blog.excerpt}</p>
                </div>

                <div className="flex gap-2 justify-end border-t border-white/60 pt-3">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="text-[11px] font-bold text-primary hover:text-primary-dark bg-white/60 border border-white px-3 py-1 rounded-lg shadow-sm transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 bg-white/60 border border-white px-3 py-1 rounded-lg shadow-sm transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400 text-xs font-bold bg-white/20 border border-dashed border-white rounded-3xl">
              No blog articles found. Click "Write Article" to publish.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsManage;
