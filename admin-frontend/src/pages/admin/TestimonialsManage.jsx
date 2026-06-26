import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Plus, Check, X, RefreshCw, Star, Trash2, Edit } from 'lucide-react';

const TestimonialsManage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    review: '',
    rating: 5,
    isActive: true,
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getTestimonialsAdmin();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load testimonials database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setFormData({
      clientName: item.clientName,
      companyName: item.companyName || '',
      review: item.review,
      rating: item.rating || 5,
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      companyName: '',
      review: '',
      rating: 5,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateTestimonial(editingId, formData);
      } else {
        await api.createTestimonial(formData);
      }
      setIsEditing(false);
      fetchTestimonials();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete testimonial from "${name}"?`)) return;
    try {
      await api.deleteTestimonial(id);
      fetchTestimonials();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.updateTestimonial(item._id, { ...item, isActive: !item.isActive });
      fetchTestimonials();
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  // Metrics
  const totalReviews = testimonials.length;
  const activeReviews = testimonials.filter(t => t.isActive).length;
  const avgRating = totalReviews > 0 
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / totalReviews).toFixed(1)
    : '0.0';

  return (
    <div className="flex flex-col gap-6 text-left font-montserrat">
      <SEO title="Manage Testimonials" />

      {/* Header Actions */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-md bg-white/40 border border-white/50 shrink-0">
        <div className="text-left">
          <h3 className="text-sm font-bold text-neutral">Client Testimonials</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Manage review quotes, ratings, and display switches.</p>
        </div>
        <button
          onClick={handleAddNewClick}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 bg-white/40 border border-white/50 shadow-md flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Reviews</span>
          <span className="text-3xl font-extrabold text-neutral">{totalReviews}</span>
        </div>
        <div className="glass-panel rounded-2xl p-6 bg-white/40 border border-white/50 shadow-md flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Reviews</span>
          <span className="text-3xl font-extrabold text-primary">{activeReviews}</span>
        </div>
        <div className="glass-panel rounded-2xl p-6 bg-white/40 border border-white/50 shadow-md flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Rating</span>
          <span className="text-3xl font-extrabold text-secondary-dark flex items-center gap-1">
            <span>{avgRating}</span>
            <Star className="fill-secondary-dark text-secondary-dark" size={24} />
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : errorMsg ? (
        <div className="glass-panel text-red-600 text-xs p-4 rounded-xl border border-red-200 text-center max-w-md mx-auto my-8 font-semibold bg-red-50/20">
          {errorMsg}
        </div>
      ) : (
        /* Testimonials Table/Grid List */
        <div className="glass-panel rounded-3xl p-6 shadow-md bg-white/40 border border-white/50">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/60 text-gray-400 text-[10px] font-bold uppercase tracking-wider text-left">
                  <th className="pb-3 pl-2">Client</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Rating</th>
                  <th className="pb-3">Quote Excerpt</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <tr key={item._id} className="hover:bg-white/30 transition-colors">
                      <td className="py-4 pl-2 font-bold text-neutral whitespace-nowrap">{item.clientName}</td>
                      <td className="py-4 font-semibold text-gray-500">{item.companyName || 'SME Business'}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-0.5 text-secondary-dark">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} size={13} className="fill-secondary-dark" />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-gray-400 font-semibold max-w-xs truncate leading-relaxed">
                        "{item.review}"
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`inline-flex text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                            item.isActive 
                              ? 'bg-green-50 text-green-700 border-green-100' 
                              : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}
                        >
                          {item.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-4 pr-2 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-1.5 border border-white text-primary bg-white/60 rounded-lg hover:bg-white/80 shadow-sm transition-all"
                            title="Edit Review"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.clientName)}
                            className="p-1.5 border border-white text-red-500 bg-white/60 rounded-lg hover:bg-white/80 shadow-sm transition-all"
                            title="Delete Review"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400 text-xs font-bold">
                      No testimonials registered. Click "Add Testimonial" to create your first client review.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Glassmorphic Modal Dialog Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-neutral/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 bg-white/85 border border-white/50 shadow-2xl flex flex-col gap-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-white/60 pb-3 flex justify-between items-center">
              <h4 className="font-bold text-neutral">{editingId ? 'Edit Testimonial' : 'Create Testimonial'}</h4>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-neutral focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Client Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="e.g. Sarah Jenkins"
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Company Name / Trade</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="e.g. Bloom & Co Cafe"
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rating selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral">Star Rating (1 - 5) *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold bg-white"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Critical)</option>
                  </select>
                </div>

                {/* Status Toggle */}
                <div className="flex flex-col gap-1.5 justify-center">
                  <span className="text-xs font-bold text-neutral mb-2">Display Switch</span>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-gray-500">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4"
                    />
                    <span>Active (Show in slider blocks)</span>
                  </label>
                </div>
              </div>

              {/* Quote message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Review Quote / Testimonial Message *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.review}
                  onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                  placeholder="Paste quote text from client here..."
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="border-t border-white/60 pt-4 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white/60 border border-white hover:bg-white/80 text-neutral text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManage;
