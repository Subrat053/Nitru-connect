import React, { useState, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { CreditCard, Landmark, Lightbulb, Wifi, Trash2, Droplets, Laptop, ShoppingCart, Search, FileText, ChevronRight, Store, Wallet, Code, Layers, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Icon map by slug — used to enrich API-returned services with icons
const iconMap = {
  'card-machines':        <CreditCard className="text-primary" size={24} />,
  'pos-systems':          <Store className="text-primary" size={24} />,
  'business-energy':      <Lightbulb className="text-primary" size={24} />,
  'water-and-waste-management': <Droplets className="text-primary" size={24} />,
  'business-funding':     <Landmark className="text-primary" size={24} />,
  'business-bank-accounts': <Wallet className="text-primary" size={24} />,
  'software-products':    <Code className="text-primary" size={24} />,
  'digital-marketing':    <Laptop className="text-primary" size={24} />,
  'broadband-telecoms':   <Wifi className="text-primary" size={24} />,
};

// Static fallback data in case backend is unreachable
const staticServices = [
  {
    title: 'Card Machines',
    slug: 'card-machines',
    category: 'Payments',
    shortDescription: 'Latest contactless card payment machines and mobile terminal readers with next-day settlement.',
    benefits: ['Next-day settlements', 'No hidden rolling contracts', 'Latest PCI security terminals'],
  },
  {
    title: 'POS Systems',
    slug: 'pos-systems',
    category: 'Payments',
    shortDescription: 'Integrated Point of Sale systems with inventory tracking, staff management, and table ordering.',
    benefits: ['Sleek touchscreen hardware', 'Real-time sales & stock reports', 'Seamless card machine syncs'],
  },
  {
    title: 'Electric & Gas',
    slug: 'business-energy',
    category: 'Utilities',
    shortDescription: 'Commercial electricity and gas comparison auditing to secure lower tariffs.',
    benefits: ['Save up to 45% on bills', 'Fixed tariff inflation protection', 'Seamless manager-led switches'],
  },
  {
    title: 'Water and waste management',
    slug: 'water-and-waste-management',
    category: 'Utilities',
    shortDescription: 'Commercial water auditing, retail switches, and waste disposal recycling contracts.',
    benefits: ['Meter refund billing audits', 'Duty of Care waste compliance', 'Cost-per-lift waste rate checks'],
  },
  {
    title: 'Business Funding',
    slug: 'business-funding',
    category: 'Finance',
    shortDescription: 'Merchant cash advances and business loans sized up to £250,000.',
    benefits: ['Repayments match card sales', 'Capital decisions in 24 hours', 'No compounding daily interest'],
  },
  {
    title: 'Business Bank Accounts',
    slug: 'business-bank-accounts',
    category: 'Finance',
    shortDescription: 'SME business bank accounts with low transaction fees, smart accounting integrations, and cashbacks.',
    benefits: ['Fast online setup in minutes', 'Accounting sync (Xero/QuickBooks)', 'Dedicated UK-based client support'],
  },
  {
    title: 'Software Products',
    slug: 'software-products',
    category: 'Growth',
    shortDescription: 'Custom operation management software, online booking engines, and CRM tools.',
    benefits: ['Automated booking & scheduling', 'Centralized client database (CRM)', 'Custom workflows to save hours'],
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    category: 'Growth',
    shortDescription: 'Google Ads, local maps SEO, and social performance lead generation.',
    benefits: ['ROI integration tracking POS sales', 'Ads search placement optimization', 'Daily cost-per-lead optimization'],
  },
  {
    title: 'Broadband & Telecoms',
    slug: 'broadband-telecoms',
    category: 'Telecoms',
    shortDescription: 'Business-grade fiber connections and cloud VoIP phone systems.',
    benefits: ['VoIP call routing auto-attendant', 'Postcode availability checks', 'Postcode backup connection failsafe'],
  },
];

const Services = ({ onOpenQuote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const categories = ['All', 'Payments', 'Finance', 'Utilities', 'Telecoms', 'Growth'];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await api.getServices();
        if (data && data.length > 0) {
          setServices(data);
          setUsingFallback(false);
        } else {
          // API returned empty — use static fallback
          setServices(staticServices);
          setUsingFallback(true);
        }
      } catch (err) {
        console.warn('Could not load services from API, using static fallback.', err.message);
        setServices(staticServices);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Normalise a service object: map API fields to what the template expects
  const normalise = (service) => ({
    ...service,
    desc: service.shortDescription || service.desc || '',
    icon: iconMap[service.slug] || <Layers className="text-primary" size={24} />,
    benefits: service.benefits || [],
  });

  const filteredServices = services
    .map(normalise)
    .filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === 'All' ||
        (service.category || '').toLowerCase() === activeTab.toLowerCase();
      return matchesSearch && matchesTab;
    });

  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16">
      <SEO
        title="Business Cost Reduction Services"
        description="Explore Nitru Connect's range of business services: card payment terminals, unsecured business loans, business energy audits, VoIP lines, and digital marketing."
      />

      {/* Hero Section */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="rounded-[2rem] py-16 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Nitru Catalog</span>
            <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Business Services Built to Reduce Cost &amp; Drive Growth
            </h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
              From smart merchant POS checkouts and loans to commercial utility audits, Nitru Connect provides SME owners with trusted cost reduction.
            </p>

            {/* Search Box */}
            <div className="w-full max-w-md mt-4 relative">
              <input
                type="text"
                placeholder="Search services (e.g. Payments, Utility)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-neutral rounded-full px-6 py-3.5 pl-12 text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-secondary-dark smooth-shadow font-montserrat font-semibold transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`font-montserrat text-xs font-bold px-5 py-2.5 rounded-full border transition-all active:scale-95 ${
              activeTab === cat
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white/60 text-gray-500 border-white/80 hover:border-primary/30 hover:text-primary backdrop-blur-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <RefreshCw size={28} className="animate-spin text-primary" />
            <p className="text-xs font-semibold font-montserrat">Loading services…</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-semibold text-xs glass-panel rounded-3xl bg-white/60 border border-white">
            No services found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, i) => (
              <div key={service._id || service.slug || i} className="p-8 rounded-3xl glass-panel hover:bg-white/80 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-stretch text-left group bg-white/50 border border-white">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {service.icon}
                    </div>
                    <span className="text-[10px] bg-white/90 border border-gray-100 font-bold px-3 py-1.5 rounded-full text-gray-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-montserrat text-base font-bold text-neutral mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 font-semibold">{service.desc}</p>

                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="flex flex-col gap-2.5 text-xs text-gray-400 border-t border-gray-100/50 pt-4 mb-8 font-semibold">
                      {service.benefits.slice(0, 3).map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary-dark rounded-full shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link
                    to={`/services/${service.slug}`}
                    className="border border-primary text-primary hover:bg-primary/5 text-center font-montserrat text-xs font-bold py-3 rounded-full transition-all flex items-center justify-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onOpenQuote(service.title)}
                    className="bg-primary hover:bg-primary-dark text-white text-center font-montserrat text-xs font-bold py-3 rounded-full transition-all active:scale-95 shadow-md"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Multi-service Cost Audit Checklist Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-panel border-white bg-white/60 p-8 md:p-12 rounded-[2rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left shadow-xl">
          <div className="flex flex-col gap-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full self-start">Consolidated Audit</span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-bold text-neutral tracking-tight">
              Complete Business Growth Audit
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
              Select multiple utility meters, terminal accounts, and digital marketing services below. Our cost reduction analysts will compile a unified, flat-rate tariff proposal for your business.
            </p>
            <div className="flex items-center gap-3">
              <FileText className="text-primary shrink-0" size={20} />
              <span className="text-[11px] text-gray-400 font-bold">Includes full merchant card fee breakdown and network backup checks.</span>
            </div>
          </div>

          <div className="bg-white/80 p-6 md:p-8 rounded-3xl border border-white smooth-shadow flex flex-col gap-4">
            <h4 className="font-montserrat text-xs font-bold text-neutral uppercase tracking-wider">Select Services of Interest:</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 font-bold">
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Card Machines &amp; POS</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Funding &amp; Banking</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Electricity, Gas &amp; Water</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Commercial Waste</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Telecoms &amp; VoIP</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300 h-4 w-4" />
                <span>Software &amp; Marketing</span>
              </label>
            </div>
            <button
              onClick={() => onOpenQuote('Multi-Service Audit')}
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold py-3.5 rounded-full transition-colors active:scale-95 shadow-md"
            >
              Start Complete Audit Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
