import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Plus, Check, X, RefreshCw, Layers, Upload, HelpCircle, ArrowRight, Eye, Play, EyeOff, Trash2 } from 'lucide-react';

const ServicesManage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Editor form toggle
  const [isEditing, setIsEditing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Payments',
    shortDescription: '',
    longDescription: '',
    heroImage: '',
    benefits: [],
    processSteps: [],
    faqs: [],
    isActive: true,
  });

  // Array support helper fields
  const [benefitInput, setBenefitInput] = useState('');
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null

  const fetchServices = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getServicesAdmin();
      setServices(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load services database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditClick = (service) => {
    setEditingServiceId(service._id);
    setFormData({
      title: service.title,
      slug: service.slug,
      category: service.category || 'Payments',
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      heroImage: service.heroImage || '',
      benefits: service.benefits || [],
      processSteps: service.processSteps || [],
      faqs: service.faqs || [],
      isActive: service.isActive !== undefined ? service.isActive : true,
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setEditingServiceId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Payments',
      shortDescription: '',
      longDescription: '',
      heroImage: '',
      benefits: [],
      processSteps: [],
      faqs: [],
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    // Auto generate slug during creation if not editing a pre-existing item
    if (!editingServiceId) {
      const slugVal = titleVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, title: titleVal, slug: slugVal }));
    } else {
      setFormData(prev => ({ ...prev, title: titleVal }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    setUploadStatus(null);
    try {
      const result = await api.uploadFile(file, 'nitru_services');
      setFormData(prev => ({ ...prev, heroImage: result.url }));
      setUploadStatus('success');
      // Auto-clear success message after 4 seconds
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadStatus('error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Benefits handlers
  const addBenefit = () => {
    if (!benefitInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, benefitInput.trim()]
    }));
    setBenefitInput('');
  };
  const removeBenefit = (idx) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== idx)
    }));
  };

  // Process Steps handlers
  const addProcessStep = () => {
    if (!stepTitle.trim() || !stepDesc.trim()) return;
    setFormData(prev => ({
      ...prev,
      processSteps: [...prev.processSteps, { title: stepTitle.trim(), description: stepDesc.trim() }]
    }));
    setStepTitle('');
    setStepDesc('');
  };
  const removeProcessStep = (idx) => {
    setFormData(prev => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== idx)
    }));
  };

  // FAQs handlers
  const addFAQ = () => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: faqQuestion.trim(), answer: faqAnswer.trim() }]
    }));
    setFaqQuestion('');
    setFaqAnswer('');
  };
  const removeFAQ = (idx) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServiceId) {
        await api.updateService(editingServiceId, formData);
      } else {
        await api.createService(formData);
      }
      setIsEditing(false);
      fetchServices();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete service "${title}"?`)) return;
    try {
      await api.deleteService(id);
      fetchServices();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left font-montserrat">
      <SEO title="Services Settings" />

      {/* Header Actions */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-md bg-white/40 border border-white/50 shrink-0">
        <div className="text-left">
          <h3 className="text-sm font-bold text-neutral">Service Modules</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Total services: {services.length}</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAddNewClick}
            className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>Create Service</span>
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
        /* Form Editor Card */
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 shadow-md flex flex-col gap-6 bg-white/40 border border-white/50">
          <div className="border-b border-white/60 pb-4 flex justify-between items-center">
            <h4 className="font-bold text-neutral">{editingServiceId ? 'Edit Service Details' : 'Create New Service'}</h4>
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
              <label className="text-xs font-bold text-neutral">Service Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Waste Management"
                className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Service Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="waste-management"
                className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="border border-white/80 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white/60"
              >
                <option value="Payments">Payments & Acquirers</option>
                <option value="Finance">Business Finance / Capital</option>
                <option value="Utilities">Commercial Utilities</option>
                <option value="Telecoms">Telecoms & Broadband</option>
                <option value="Growth">Marketing & Web Growth</option>
              </select>
            </div>

            {/* Active Status */}
            <div className="flex flex-col gap-1.5 justify-center">
              <span className="text-xs font-bold text-neutral mb-2">Display Status</span>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4"
                />
                <span>Active (Show in comparisons and home grids)</span>
              </label>
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Short Card Description *</label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief summary displaying in stats cards or lists (e.g. Card terminals & online gateway comparisons)"
              className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
            />
          </div>

          {/* Long Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Main Detail Story (Long Description)</label>
            <textarea
              rows="4"
              value={formData.longDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
              placeholder="Introduce the problem details, available provider channels, and custom audits we carry out..."
              className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none"
            />
          </div>

          {/* Hero Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Hero Image Cover (URL or Upload)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => { setFormData(prev => ({ ...prev, heroImage: e.target.value })); setUploadStatus(null); }}
                placeholder="https://example.com/image.jpg"
                className="flex-1 border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
              />
              <div className="relative shrink-0">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  className={`border text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-sm transition-all ${
                    uploadingImage
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white/60 border-white hover:bg-white/80 text-neutral cursor-pointer'
                  }`}
                >
                  {uploadingImage ? <RefreshCw className="animate-spin" size={14} /> : <Upload size={14} />}
                  <span>{uploadingImage ? 'Uploading…' : 'Upload Cover'}</span>
                </button>
              </div>
            </div>

            {/* Upload status message */}
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs font-bold mt-1">
                <Check size={14} />
                <span>Image uploaded successfully!</span>
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs font-bold mt-1">
                <X size={14} />
                <span>Upload failed. Please check file type (JPG, PNG, AVIF, WebP) and try again.</span>
              </div>
            )}

            {/* Image preview */}
            {formData.heroImage && (
              <div className="flex items-start gap-3 mt-2">
                <img
                  src={formData.heroImage}
                  alt="Cover Preview"
                  className="h-28 w-48 object-cover rounded-xl border border-white/60 shadow-sm"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preview</span>
                  <button
                    type="button"
                    onClick={() => { setFormData(prev => ({ ...prev, heroImage: '' })); setUploadStatus(null); }}
                    className="text-[10px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition-colors"
                  >
                    <X size={10} /> Remove image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Benefits Array List Editor */}
          <div className="border-t border-white/60 pt-6 flex flex-col gap-3">
            <h5 className="text-xs font-bold text-neutral">Service Benefits & Audits Highlights</h5>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  placeholder="e.g. Free energy meter audits"
                  className="flex-1 border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="bg-primary text-white font-bold text-xs px-4 rounded-xl transition-all shadow-sm hover:bg-primary-dark"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                    <span>{benefit}</span>
                    <button type="button" onClick={() => removeBenefit(idx)} className="text-red-500 hover:text-red-700 ml-1">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Process Timeline Steps Editor */}
          <div className="border-t border-white/60 pt-6 flex flex-col gap-4">
            <h5 className="text-xs font-bold text-neutral">Process Steps / Timelines</h5>
            <div className="bg-white/20 border border-white/40 p-4 rounded-2xl flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={stepTitle}
                  onChange={(e) => setStepTitle(e.target.value)}
                  placeholder="Step title (e.g. 1. Submit Statement)"
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
                <input
                  type="text"
                  value={stepDesc}
                  onChange={(e) => setStepDesc(e.target.value)}
                  placeholder="Step details..."
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
              </div>
              <button
                type="button"
                onClick={addProcessStep}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-sm self-start"
              >
                Add Timeline Step
              </button>
            </div>
            {formData.processSteps.length > 0 && (
              <div className="flex flex-col gap-2 relative border-l border-primary/30 pl-4 ml-2 mt-2">
                {formData.processSteps.map((step, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 bg-white/60 border border-white p-3 rounded-xl shadow-sm text-xs relative">
                    <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow-sm" />
                    <div>
                      <h6 className="font-bold text-neutral">{step.title}</h6>
                      <p className="text-gray-400 font-semibold">{step.description}</p>
                    </div>
                    <button type="button" onClick={() => removeProcessStep(idx)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQs List Editor */}
          <div className="border-t border-white/60 pt-6 flex flex-col gap-4">
            <h5 className="text-xs font-bold text-neutral">Frequently Asked Questions (FAQs)</h5>
            <div className="bg-white/20 border border-white/40 p-4 rounded-2xl flex flex-col gap-3">
              <input
                type="text"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                placeholder="Question..."
                className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
              />
              <textarea
                rows="2"
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                placeholder="Answer..."
                className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold resize-none"
              />
              <button
                type="button"
                onClick={addFAQ}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-sm self-start"
              >
                Add FAQ
              </button>
            </div>
            {formData.faqs.length > 0 && (
              <div className="flex flex-col gap-3">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 bg-white/60 border border-white p-3.5 rounded-xl shadow-sm text-xs">
                    <div>
                      <h6 className="font-bold text-neutral flex items-center gap-1">
                        <HelpCircle size={14} className="text-primary/70" />
                        <span>{faq.question}</span>
                      </h6>
                      <p className="text-gray-400 font-semibold mt-1">{faq.answer}</p>
                    </div>
                    <button type="button" onClick={() => removeFAQ(idx)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="border-t border-white/60 pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-white/60 border border-white hover:bg-white/80 text-neutral text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              Save Service Module
            </button>
          </div>
        </form>
      ) : (
        /* Services grid display list */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service._id} 
              className="glass-panel border border-white/50 rounded-3xl overflow-hidden shadow-md bg-white/40 flex flex-col h-full hover:-translate-y-0.5 transition-all"
            >
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-primary to-[#1844cb] relative flex items-center justify-center shrink-0 text-white font-bold font-montserrat text-sm">
                {service.heroImage ? (
                  <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <span>{service.category}</span>
                )}
                <span className="absolute top-3 left-3 bg-secondary text-neutral font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  {service.category}
                </span>
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded border ${
                  service.isActive 
                    ? 'bg-green-50 text-green-700 border-green-100' 
                    : 'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {service.isActive ? 'Active' : 'Draft'}
                </span>
              </div>

              {/* Service Info */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-neutral text-sm">{service.title}</h4>
                  <p className="text-gray-400 text-[10px] font-bold">SLUG: <code>/{service.slug}</code></p>
                  <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3 font-semibold">{service.shortDescription}</p>
                </div>

                <div className="flex gap-2 justify-end border-t border-white/60 pt-3">
                  <button
                    onClick={() => handleEditClick(service)}
                    className="text-[11px] font-bold text-primary hover:text-primary-dark bg-white/60 border border-white px-3 py-1 rounded-lg shadow-sm transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id, service.title)}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 bg-white/60 border border-white px-3 py-1 rounded-lg shadow-sm transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesManage;
