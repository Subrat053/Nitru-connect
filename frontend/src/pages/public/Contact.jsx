import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import { Phone, Mail, Clock, Send, Upload, CheckCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

const Contact = () => {
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
    honeypot: '',
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      let fileUrl = '';
      if (file) {
        setUploading(true);
        const uploadResult = await api.uploadFile(file);
        fileUrl = uploadResult.url;
        setUploading(false);
      }

      const payload = {
        ...formData,
        uploadedFile: fileUrl || formData.uploadedFile,
        sourcePage: '/contact',
      };

      await api.submitEnquiry(payload);
      setSuccess(true);
      
      // Reset form
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
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Contact Us"
        description="Get in touch with the Nitru Connect team. Request a free business consultation, submit utility bills, or send customer enquiries."
      />

      {/* Hero section */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="rounded-[2rem] py-16 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Help Desk</span>
            <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Request a Free Business Consultation</h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
              Get direct support from comparison agents. Upload bill details to receive rate audits.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card list on Left */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 bg-white/85 shadow-md">
              <h2 className="font-montserrat text-xl font-bold text-neutral mb-3">Contact Details</h2>
              <p className="text-gray-500 text-xs leading-relaxed font-semibold mb-6">
                Reach out via phone, email, or WhatsApp. We reply to all digital business review requests within 1 business day.
              </p>

              <div className="flex flex-col gap-4">
                {/* Phone */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Phone className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Call Us</h4>
                    <a href="tel:+442079460958" className="text-gray-600 text-xs mt-0.5 block hover:text-primary transition-colors font-semibold">+44 20 7946 0958</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Email Support</h4>
                    <a href="mailto:hello@nitruconnect.com" className="text-gray-500 text-xs mt-0.5 block hover:text-primary transition-colors font-semibold">hello@nitruconnect.com</a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Send className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">WhatsApp Support</h4>
                    <a href="https://wa.me/447911123456" target="_blank" rel="noreferrer" className="text-gray-500 text-xs mt-0.5 block hover:text-primary transition-colors font-semibold">Chat on Mobile App</a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Clock className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Working Hours</h4>
                    <span className="text-gray-500 text-xs mt-0.5 block font-semibold">Monday - Friday: 9:00 AM - 6:00 PM</span>
                    <span className="text-gray-400 text-[10px] block font-medium">Closed weekends and bank holidays</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form on Right */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white/85 shadow-xl">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/25">
                  <CheckCircle size={36} className="text-green-500 animate-pulse" />
                </div>
                <h3 className="font-montserrat text-2xl font-bold text-neutral">Thank you!</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm font-semibold">
                  The Nitru Connect team has received your enquiry. We will contact you soon.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold px-6 py-2.5 rounded-full transition-colors active:scale-95 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                {/* Honeypot hidden input field */}
                <div className="hidden">
                  <input 
                    type="text" 
                    name="honeypot" 
                    value={formData.honeypot} 
                    onChange={handleChange} 
                    autoComplete="off" 
                  />
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200 font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7911 123456"
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Company Name *</label>
                    <input 
                      type="text" 
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Ltd"
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Business Type *</label>
                    <select 
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white text-neutral"
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
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Primary Service *</label>
                    <select 
                      name="selectedService"
                      required
                      value={formData.selectedService}
                      onChange={handleChange}
                      className="border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white text-neutral"
                    >
                      <option value="">Select service...</option>
                      <option value="Merchant Services">Merchant Services</option>
                      <option value="Business Funding">Business Funding</option>
                      <option value="Business Energy">Business Energy</option>
                      <option value="Broadband & Telecoms">Broadband & Telecoms</option>
                      <option value="Waste Management">Waste Management</option>
                      <option value="Water Bills">Water Bills</option>
                      <option value="Digital Marketing">Digital Marketing & Web</option>
                      <option value="eCommerce Solutions">eCommerce Solutions</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral">Message / Specific Questions</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Provide details on monthly sales volume, current tariffs, or requirements..."
                    className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none text-neutral placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral">Upload Statement / Copy of Bill (Optional)</label>
                  <div className="border border-dashed border-slate-300 rounded-2xl p-4 transition-colors flex flex-col items-center justify-center text-center gap-2 cursor-pointer relative bg-white/55 hover:border-primary hover:bg-white/80">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.avif,.csv,.xlsx,.xls"
                    />
                    <Upload size={20} className="text-primary/70 animate-pulse" />
                    <span className="text-[10px] text-slate-600 font-bold">
                      {file ? `Selected: ${file.name}` : 'Drag & drop or click to browse (Max 10MB)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-left mt-2">
                  <input 
                    type="checkbox" 
                    name="consentAccepted"
                    id="consentAccepted"
                    required
                    checked={formData.consentAccepted}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-primary focus:ring-primary border-slate-300 h-4 w-4 bg-white"
                  />
                  <label htmlFor="consentAccepted" className="text-[10px] text-slate-600 leading-normal font-bold">
                    I consent to Nitru Connect storing my data to process this business review and follow up with quotations. *
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-montserrat font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-gray-300 disabled:pointer-events-none mt-2 shadow-md hover:shadow-lg"
                >
                  {submitting || uploading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      {uploading ? 'Uploading bill...' : 'Submitting request...'}
                    </>
                  ) : (
                    'Request Consultation'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
