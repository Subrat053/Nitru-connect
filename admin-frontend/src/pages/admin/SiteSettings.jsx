import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Settings, RefreshCw, Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram, Save } from 'lucide-react';

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Form fields state
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    }
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await api.getSettings();
      setSettings(data);
      if (data) {
        setFormData({
          companyName: data.companyName || 'Nitru Connect',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          address: data.address || '',
          socialLinks: {
            facebook: data.socialLinks?.facebook || '',
            twitter: data.socialLinks?.twitter || '',
            linkedin: data.socialLinks?.linkedin || '',
            instagram: data.socialLinks?.instagram || '',
          }
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to query site settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const updated = await api.updateSettings(formData);
      setSettings(updated);
      setSuccessMsg('Branding metadata and contact routes updated successfully.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to update settings parameters.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <RefreshCw className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 text-left font-montserrat">
      <SEO title="Site Settings" />

      {/* Header Info */}
      <div className="glass-panel p-4 rounded-2xl shadow-md bg-white/40 border border-white/50 shrink-0 flex items-center justify-between">
        <div className="text-left">
          <h3 className="text-sm font-bold text-neutral">Global Site Settings</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Configure global metadata, contact details, and social routes.</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-green-50 text-green-700 text-xs p-3.5 rounded-xl border border-green-200 font-semibold">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200 font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Settings Panel Shell */}
      <div className="glass-panel rounded-3xl shadow-md flex flex-col overflow-hidden bg-white/40 border border-white/50">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/60 bg-white/20">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-4 text-xs font-bold transition-all focus:outline-none ${
              activeTab === 'general'
                ? 'bg-white/50 text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-neutral'
            }`}
          >
            General & Contacts
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-6 py-4 text-xs font-bold transition-all focus:outline-none ${
              activeTab === 'social'
                ? 'bg-white/50 text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-neutral'
            }`}
          >
            Social Networks
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {/* Company Name */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-neutral">Company Branding Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Nitru Connect"
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Globe className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Corporate Hotline Phone</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +44 20 7946 0958"
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Phone className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">WhatsApp Enquiries Link</label>
                <div className="relative">
                  <input
                    type="text"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. +44 7911 123456"
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Phone className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-neutral">Support Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. hello@nitruconnect.com"
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Mail className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-neutral">Physical HQ Address</label>
                <div className="relative">
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="100 Bishopsgate, London EC2M 1GT"
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold resize-none"
                  />
                  <MapPin className="absolute left-3 top-4 text-primary/70" size={14} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {/* Facebook */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Facebook Handle URL</label>
                <div className="relative">
                  <input
                    type="url"
                    name="facebook"
                    value={formData.socialLinks.facebook}
                    onChange={handleSocialChange}
                    placeholder="https://facebook.com/..."
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Facebook className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* Twitter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Twitter (X) URL</label>
                <div className="relative">
                  <input
                    type="url"
                    name="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleSocialChange}
                    placeholder="https://twitter.com/..."
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Twitter className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">LinkedIn Page URL</label>
                <div className="relative">
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleSocialChange}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Linkedin className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral">Instagram Handle URL</label>
                <div className="relative">
                  <input
                    type="url"
                    name="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleSocialChange}
                    placeholder="https://instagram.com/..."
                    className="w-full border border-white/80 rounded-xl pl-9 pr-4 py-2.5 text-xs bg-white/60 focus:outline-none focus:border-primary font-semibold"
                  />
                  <Instagram className="absolute left-3 top-3.5 text-primary/70" size={14} />
                </div>
              </div>
            </div>
          )}

          {/* Footer Save Row */}
          <div className="border-t border-white/60 pt-5 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-md disabled:bg-gray-300 disabled:pointer-events-none"
            >
              {saving ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
              <span>Save System Parameters</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteSettings;
