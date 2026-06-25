import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Plus, X, RefreshCw, Upload, Globe, Trash2, Edit } from 'lucide-react';

const PartnersManage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Payments',
    logoUrl: '',
    websiteUrl: '',
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getPartners();
      setPartners(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load partners database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      category: item.category || 'Payments',
      logoUrl: item.logoUrl || '',
      websiteUrl: item.websiteUrl || '',
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Payments',
      logoUrl: '',
      websiteUrl: '',
    });
    setIsEditing(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const result = await api.uploadFile(file, 'nitru_partners');
      setFormData(prev => ({ ...prev, logoUrl: result.url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updatePartner(editingId, formData);
      } else {
        await api.createPartner(formData);
      }
      setIsEditing(false);
      fetchPartners();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete partner logo "${name}"?`)) return;
    try {
      await api.deletePartner(id);
      fetchPartners();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left font-montserrat">
      <SEO title="Manage Partners" />

      {/* Header Actions */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-md bg-white/40 border border-white/50 shrink-0">
        <div className="text-left">
          <h3 className="text-sm font-bold text-neutral">Corporate Partners & Sliders</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Configure partner logo matrices showing on comparison pages.</p>
        </div>
        <button
          onClick={handleAddNewClick}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Plus size={16} />
          <span>Add Partner</span>
        </button>
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
        /* Partners Grid List */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.length > 0 ? (
            partners.map((partner) => (
              <div 
                key={partner._id} 
                className="glass-panel border border-white/50 rounded-2xl p-4 flex flex-col items-center justify-between shadow-md bg-white/40 hover:-translate-y-0.5 transition-all text-center gap-4 group relative"
              >
                {/* Logo Image Preview */}
                <div className="w-20 h-20 bg-white/80 rounded-2xl flex items-center justify-center border border-white/80 p-2 shadow-inner shrink-0 overflow-hidden relative">
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-neutral font-bold text-xs">{partner.name.substring(0, 3).toUpperCase()}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="font-bold text-neutral text-xs truncate max-w-full">{partner.name}</h4>
                  <span className="inline-block text-[9px] text-primary bg-primary/5 px-2 py-0.5 rounded font-bold border border-primary/10 self-center">
                    {partner.category}
                  </span>
                </div>

                {/* Bottom details & actions */}
                <div className="flex items-center gap-2 mt-1">
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 border border-white text-gray-500 bg-white/60 rounded-lg hover:bg-white/80 shadow-sm transition-all"
                      title="Visit Site"
                    >
                      <Globe size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => handleEditClick(partner)}
                    className="p-1.5 border border-white text-primary bg-white/60 rounded-lg hover:bg-white/80 shadow-sm transition-all"
                    title="Edit Partner"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id, partner.name)}
                    className="p-1.5 border border-white text-red-500 bg-white/60 rounded-lg hover:bg-white/80 shadow-sm transition-all"
                    title="Delete Partner"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 text-xs font-bold bg-white/20 border border-dashed border-white rounded-3xl">
              No corporate partners registered. Click "Add Partner" to set logos.
            </div>
          )}
        </div>
      )}

      {/* Glassmorphic Modal Dialog Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-neutral/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 md:p-8 bg-white/85 border border-white/50 shadow-2xl flex flex-col gap-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-white/60 pb-3 flex justify-between items-center">
              <h4 className="font-bold text-neutral">{editingId ? 'Edit Partner Details' : 'Create Partner Logo'}</h4>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-neutral focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Partner Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Partner Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. EcoConnect Power"
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Partner Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold bg-white"
                >
                  <option value="Payments">Payments & Acquirers</option>
                  <option value="Finance">Business Funding / Lenders</option>
                  <option value="Utilities">Utilities & Energy</option>
                  <option value="Telecoms">Broadband & Voip</option>
                  <option value="Growth">Marketing & Tech</option>
                </select>
              </div>

              {/* Website URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Website URL</label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="https://partner-website.com"
                  className="border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                />
              </div>

              {/* Logo File Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Logo Image (URL or Upload)</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                    className="flex-1 border border-white/80 rounded-xl p-3 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <div className="relative shrink-0">
                    <input
                      type="file"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      disabled={uploadingLogo}
                      className="bg-white/60 border border-white hover:bg-white/80 text-neutral text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      {uploadingLogo ? <RefreshCw className="animate-spin" size={14} /> : <Upload size={14} />}
                      <span>Upload Logo</span>
                    </button>
                  </div>
                </div>
                {formData.logoUrl && (
                  <div className="mt-2 w-24 h-16 bg-white/80 rounded-xl flex items-center justify-center p-2 border border-white/60 shadow-sm overflow-hidden">
                    <img src={formData.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersManage;
