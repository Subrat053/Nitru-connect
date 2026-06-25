import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

const QuoteForm = ({ isOpen, onClose, defaultService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: '',
    selectedService: '',
    message: '',
    uploadedFile: '',
    consentAccepted: false,
    honeypot: '', // bot field
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, selectedService: defaultService }));
    }
  }, [defaultService, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMsg('File size exceeds the 10MB limit.');
        return;
      }
      setFile(selectedFile);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      // 1. If file selected, upload it first
      let fileUrl = '';
      if (file) {
        setUploading(true);
        const uploadResult = await api.uploadFile(file);
        fileUrl = uploadResult.url;
        setUploading(false);
      }

      // 2. Submit enquiry details
      const payload = {
        ...formData,
        uploadedFile: fileUrl || formData.uploadedFile,
        sourcePage: window.location.pathname,
      };

      await api.submitEnquiry(payload);
      setSuccess(true);
      
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        businessType: '',
        selectedService: '',
        message: '',
        uploadedFile: '',
        consentAccepted: false,
        honeypot: '',
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md z-[100] flex justify-center items-center p-4">
      {/* Modal Container */}
      <div className="glass-panel rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative border-t-8 border-primary flex flex-col no-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-neutral transition-all hover:rotate-90 p-1.5 rounded-full hover:bg-gray-100/50 focus:outline-none"
        >
          <X size={20} />
        </button>

        {success ? (
          /* Success Screen */
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
              <CheckCircle size={36} className="animate-bounce" />
            </div>
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-neutral">Enquiry Submitted!</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              Thank you. The Nitru Connect team has received your request and is reviewing your statement details. We will contact you shortly.
            </p>
            <button 
              onClick={() => { setSuccess(false); onClose(); }}
              className="bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold px-8 py-3.5 rounded-full transition-all active:scale-95 mt-2 shadow-[0_4px_15px_rgba(15,60,201,0.2)]"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
            <div className="text-left border-b border-gray-100 pb-4 mb-2">
              <h3 className="font-montserrat text-lg font-bold text-neutral flex items-center gap-2">
                <span>Free Business Consultation</span>
                <span className="w-2.5 h-2.5 bg-secondary-dark rounded-full animate-pulse"></span>
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Submit your details and get quotes for utilities, merchant charges, and loans.</p>
            </div>

            {/* Spam honeypot field - HIDDEN FROM HUMANS */}
            <div className="hidden">
              <label>Leave this field blank:</label>
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot} 
                onChange={handleChange} 
                autoComplete="off" 
              />
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200 text-left">
                {errorMsg}
              </div>
            )}

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. name@company.com"
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                />
              </div>
            </div>

            {/* Row 2: Phone and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +44 7911 123456"
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Company Name *</label>
                <input 
                  type="text" 
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Bake & Brew Cafe"
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                />
              </div>
            </div>

            {/* Row 3: Business Type and Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Business Type *</label>
                <select 
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                >
                  <option value="">Select industry...</option>
                  <option value="Retail">Retail Store</option>
                  <option value="Restaurant">Restaurant / Cafe</option>
                  <option value="Salon">Salon / Clinic</option>
                  <option value="Office">Office / Professional Services</option>
                  <option value="eCommerce">eCommerce Business</option>
                  <option value="Other">Other SME</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Select Service *</label>
                <select 
                  name="selectedService"
                  required
                  value={formData.selectedService}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white/70"
                >
                  <option value="">Select service...</option>
                  <option value="Merchant Services">Merchant / Payment Solutions</option>
                  <option value="Business Funding">Business Funding</option>
                  <option value="Business Energy">Business Energy</option>
                  <option value="Broadband & Telecoms">Broadband & Telecoms</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Water Bills">Water Bills</option>
                  <option value="Digital Marketing">Digital Marketing & Web</option>
                  <option value="eCommerce Solutions">eCommerce Growth Solutions</option>
                </select>
              </div>
            </div>

            {/* Message Detail */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Requirements Details</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                placeholder="Let us know what you need, current provider rates, or estimated volume..."
                className="border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none bg-white/70"
              />
            </div>

            {/* Statement File Upload */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Upload Statement/Bill (Optional)</label>
              <div className="border border-dashed border-gray-300 hover:border-primary rounded-2xl p-4 transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer relative bg-white/40 hover:bg-white/60">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.avif,.csv,.xlsx,.xls"
                />
                <Upload size={18} className="text-gray-400" />
                <span className="text-[11px] text-gray-500 font-bold">
                  {file ? `Selected: ${file.name}` : 'Drag & drop or click to browse'}
                </span>
                <span className="text-[9px] text-gray-400">PDF, JPG, XLSX up to 10MB</span>
              </div>
            </div>

            {/* Consent accepted checkbox */}
            <div className="flex items-start gap-2 text-left">
              <input 
                type="checkbox" 
                name="consentAccepted"
                id="consentAccepted"
                required
                checked={formData.consentAccepted}
                onChange={handleChange}
                className="mt-0.5 rounded text-primary focus:ring-primary border-gray-300 h-4 w-4"
              />
              <label htmlFor="consentAccepted" className="text-[10px] text-gray-400 font-semibold leading-normal">
                I consent to Nitru Connect storing my data to process this business review and follow up with quotations. *
              </label>
            </div>

            {/* Submit CTA button */}
            <button 
              type="submit"
              disabled={submitting || uploading}
              className="mt-1 w-full bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-gray-300 disabled:pointer-events-none shadow-[0_4px_15px_rgba(15,60,201,0.2)]"
            >
              {submitting || uploading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  {uploading ? 'Uploading statement...' : 'Submitting request...'}
                </>
              ) : (
                'Request Consultation'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
