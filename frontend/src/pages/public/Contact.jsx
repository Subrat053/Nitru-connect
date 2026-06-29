import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { Phone, Mail, Clock, Send, CheckCircle, RefreshCw, MapPin, ShieldCheck } from 'lucide-react';
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
    consentAccepted: true,
    honeypot: '',
  });

  const [services, setServices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services in contact form:', err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        consentAccepted: true,
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
        consentAccepted: true,
        honeypot: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
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

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card list on Left */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 bg-white/85 shadow-md">
              <h2 className="font-montserrat text-xl font-bold text-neutral mb-6">Contact Nitru Connect</h2>

              <div className="flex flex-col gap-6">
                {/* Phone */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Phone className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Phone</h4>
                    <a href="tel:+447721809769" className="text-primary text-xs mt-0.5 block hover:underline transition-colors font-bold">+44 7721809769</a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Send className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">WhatsApp</h4>
                    <a href="https://wa.me/447721809769" target="_blank" rel="noreferrer" className="text-primary text-xs mt-0.5 block hover:underline transition-colors font-bold">+44 7721809769</a>
                    <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">Message us for a quick business review enquiry.</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Email</h4>
                    <a href="mailto:info@nitruconnectltd.com" className="text-primary text-xs mt-0.5 block hover:underline transition-colors font-bold">info@nitruconnectltd.com</a>
                  </div>
                </div>

                {/* Registered Office */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <MapPin className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Registered Office</h4>
                    <span className="text-gray-500 text-xs mt-0.5 block font-semibold leading-relaxed">
                      Nitru Connect Ltd<br />
                      87 high street south, East Ham, E66EJ.
                    </span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-center bg-white/85 p-4 rounded-2xl border border-slate-100 shadow-sm hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                    <Clock className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral">Opening Hours</h4>
                    <span className="text-gray-500 text-xs mt-0.5 block font-semibold">Monday - Friday: 9:00 AM - 5:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GDPR Box */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white/85 shadow-md text-left">
              <h3 className="font-montserrat text-sm font-bold text-neutral mb-2">Your GDPR Protection</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">
                Nitru Connect handles enquiry details confidentially and only uses your information to respond to your request or support your business cost review.
              </p>
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
              <div className="flex flex-col gap-5">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">FREE CONSULTATION</span>
                  <h2 className="font-montserrat text-3xl font-extrabold text-neutral mb-2">Request a Free Quote</h2>
                  <p className="text-gray-500 text-xs leading-relaxed font-semibold">
                    Tell us what your business needs reviewed and our team will come back to you with the next steps.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left mt-2">
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
                        placeholder="e.g. John Smith"
                        className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400 shadow-sm"
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
                        placeholder="e.g. john@yourcompany.co.uk"
                        className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400 shadow-sm"
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
                        placeholder="e.g. 07123 456789"
                        className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400 shadow-sm"
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
                        placeholder="e.g. Apex Ltd"
                        className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-neutral placeholder:text-gray-400 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Primary Service *</label>
                    <select 
                      name="selectedService"
                      required
                      value={formData.selectedService}
                      onChange={handleChange}
                      className="border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold bg-white text-neutral shadow-sm cursor-pointer"
                    >
                      <option value="">Select a business service</option>
                      {services && services.length > 0 ? (
                        services.map((srv) => (
                          <option key={srv._id || srv.slug} value={srv.title}>
                            {srv.title}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Merchant Services">Merchant Services</option>
                          <option value="Business Funding">Business Funding</option>
                          <option value="Business Energy">Business Energy</option>
                          <option value="Broadband & Telecoms">Broadband & Telecoms</option>
                          <option value="Waste Management">Waste Management</option>
                          <option value="Water Bills">Water Bills</option>
                          <option value="Digital Marketing">Digital Marketing & Web</option>
                          <option value="eCommerce Solutions">eCommerce Solutions</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral">Details of Enquiry</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please tell us your current supplier, contract dates, or what you would like us to review..."
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none text-neutral placeholder:text-gray-400 shadow-sm"
                    />
                  </div>

                  {/* Spam protection and privacy box */}
                  <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-emerald-600" size={16} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-xs font-bold text-neutral">Spam protection and privacy</h4>
                      <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                        This form uses server-side validation and a hidden spam check. Your details are only used to respond to your enquiry and prepare your business cost review.
                      </p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0a3a70] hover:bg-[#082f5b] text-white font-montserrat font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-gray-300 disabled:pointer-events-none mt-2 shadow-md hover:shadow-lg text-xs"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} />
                        Submitting request...
                      </>
                    ) : (
                      'Request Free Quote'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
