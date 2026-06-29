import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowRight, CheckCircle, HelpCircle, FileText, ChevronRight, ChevronDown } from 'lucide-react';

const ServiceDetails = ({ onOpenQuote }) => {
  const { slug } = useParams();
  const reveal = useScrollReveal();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  // Local fallback mock data matching slug details if API is offline
  const fallbackServices = {
    'card-machines': {
      title: 'Card Machines',
      category: 'Payments',
      shortDescription: 'Latest contactless card payment machines and mobile terminal readers with next-day settlement.',
      longDescription: 'Get secure, industry-leading contactless card payment terminals and mobile readers. Nitru Connect audits card processing statements to eliminate hidden broker markup fees, offering transparent flat rates and fast next-day business settlement.',
      benefits: [
        'Next-day transaction settlement (including weekends)',
        'No exit fees or hidden rolling contract locks',
        'PCI-DSS secure terminals and mobile card readers',
        'Free merchant fee statement audits'
      ],
      processSteps: [
        { title: 'Upload Statement', description: 'Submit a copy of your current card statement.' },
        { title: 'Rate Analysis', description: 'Our payments analyst highlights hidden processing fees.' },
        { title: 'Hardware Delivery', description: 'Get your pre-configured, secure terminal delivered.' }
      ],
      faqs: [
        { question: 'How quickly are card transactions settled?', answer: 'We support next-day settlements, including weekends, to keep your cash flow moving.' },
        { question: 'Are there exit fees?', answer: 'No. We provide flexible, rolling monthly agreements with no exit penalties.' }
      ],
      related: [
        { title: 'POS Systems', slug: 'pos-systems', category: 'Payments', desc: 'Integrated checkout and stock systems.' },
        { title: 'Business Funding', slug: 'business-funding', category: 'Finance', desc: 'Merchant cash advances based on sales volume.' }
      ]
    },
    'pos-systems': {
      title: 'POS Systems',
      category: 'Payments',
      shortDescription: 'Integrated Point of Sale systems with inventory tracking, staff management, and table ordering.',
      longDescription: 'Upgrade your checkout with powerful, easy-to-use ePOS systems. Designed specifically for retail, hospitality, and service businesses, our POS solutions sync real-time stock levels, employee timetables, and customer loyalty rewards directly with card terminals.',
      benefits: [
        'Sleek touchscreen hardware layouts and mobile tablets',
        'Real-time sales, inventory, and profit reports',
        'Seamless card machine terminal integrations',
        'Cloud-based remote store management'
      ],
      processSteps: [
        { title: 'Define Checkout Needs', description: 'Select retail, cafe, restaurant, or clinic layouts.' },
        { title: 'System Setup', description: 'We configure your inventory lists, menus, and user permissions.' },
        { title: 'Staff Training', description: 'Plug-and-play installation with quick 10-minute tutorials.' }
      ],
      faqs: [
        { question: 'Does the POS work offline?', answer: 'Yes. Our POS systems can process offline transactions and will automatically sync once your internet connection is restored.' },
        { question: 'Can it connect to my online store?', answer: 'Absolutely. We support inventory syncs with Shopify, WooCommerce, and custom web storefronts.' }
      ],
      related: [
        { title: 'Card Machines', slug: 'card-machines', category: 'Payments', desc: 'Next-day card terminal solutions.' },
        { title: 'Software Products', slug: 'software-products', category: 'Growth', desc: 'Custom operations management platforms.' }
      ]
    },
    'business-energy': {
      title: 'Electric & Gas',
      category: 'Utilities',
      shortDescription: 'Save up to 45% on corporate electricity and gas utility connections.',
      longDescription: 'Compare commercial utility tariffs from top business energy providers. Nitru Connect negotiates directly to secure lower fixed-rate tariffs, protecting your company from market price volatility.',
      benefits: [
        'Compare tariffs from 20+ leading energy suppliers',
        'Fixed price protection packages to block out inflation',
        'Hassle-free contract switches managed by utility agents',
        'Green energy carbon-neutral business tariffs available'
      ],
      processSteps: [
        { title: 'Send Recent Bill', description: 'Share a photo or copy of your current utility bill.' },
        { title: 'Compare Tariffs', description: 'We analyze and source cheaper rates for your meter.' },
        { title: 'Switch Contract', description: 'Our agents complete the migration with zero service disruption.' }
      ],
      faqs: [
        { question: 'Will my energy supply cut out during switching?', answer: 'No. The switch is purely administrative. Your physical electricity and gas supply remains continuous.' },
        { question: 'How long does a utility switch take?', answer: 'Typically between 14 to 28 days depending on your current contract terms.' }
      ],
      related: [
        { title: 'Water and waste management', slug: 'water-and-waste-management', category: 'Utilities', desc: 'Water billing audits and waste lift schedules.' }
      ]
    },
    'water-and-waste-management': {
      title: 'Water and waste management',
      category: 'Utilities',
      shortDescription: 'Commercial water auditing, retail switches, and waste disposal recycling contracts.',
      longDescription: 'Optimize both your commercial water billing and waste disposal schedules. We audit sewerage charges and waste lift tariffs, helping businesses stay compliant and lower overheads for high-usage sites.',
      benefits: [
        'Historical water bill audits for wastewater charge refunds',
        'Tailored collections for general, recycling, and food waste',
        'Flexible bin lift frequencies (daily, weekly, bi-weekly)',
        'Consolidated multi-site utility and waste accounts'
      ],
      processSteps: [
        { title: 'Audit Bills & Waste', description: 'Submit previous water charges and waste lift statement copies.' },
        { title: 'Source Quotations', description: 'We identify lower wholesale tariffs and cost-per-lift options.' },
        { title: 'Switch Contracts', description: 'Migrate both billing structures seamlessly with zero disruption.' }
      ],
      faqs: [
        { question: 'Can businesses choose their water provider?', answer: 'Yes, in deregulated regions, commercial customers can choose their retail water provider.' },
        { question: 'What waste collection compliance is managed?', answer: 'We ensure full Duty of Care compliance documentation is set up for all waste transfers.' }
      ],
      related: [
        { title: 'Electric & Gas', slug: 'business-energy', category: 'Utilities', desc: 'Electricity and gas supplier auditing.' }
      ]
    },
    'business-funding': {
      title: 'Business Funding',
      category: 'Finance',
      shortDescription: 'Flexible capital solutions tailored to accelerate your strategic business expansion.',
      longDescription: 'Unlock merchant cash advances or unsecured business loans designed for SMEs. Repay flexibly as your business grows, with eligibility calculations based on card sales volume or general business turnover.',
      benefits: [
        'Funding sizes from £5,000 up to £250,000',
        'High approval rates based on monthly card sales volume',
        'Simple, single fixed cost with no daily interest compounding',
        'Decisions in as little as 24 hours'
      ],
      processSteps: [
        { title: 'Request Estimate', description: 'Calculate potential eligible amounts using our estimator.' },
        { title: 'Submit Statements', description: 'Provide 3 months of bank and card merchant statements.' },
        { title: 'Get Funded', description: 'Approve terms and receive capital directly in your bank account.' }
      ],
      faqs: [
        { question: 'What is a merchant cash advance?', answer: 'A merchant cash advance is unsecured capital repaid as a small percentage of your daily card transactions. If sales slow down, repayments adjust proportionally.' },
        { question: 'Can I qualify if I have bad credit?', answer: 'Yes. Approvals are primarily based on your business transaction history rather than strict personal credit history.' }
      ],
      related: [
        { title: 'Card Machines', slug: 'card-machines', category: 'Payments', desc: 'Lower transaction card machine rates.' },
        { title: 'Business Bank Accounts', slug: 'business-bank-accounts', category: 'Finance', desc: 'High-yield SME banking accounts.' }
      ]
    },
    'business-bank-accounts': {
      title: 'Business Bank Accounts',
      category: 'Finance',
      shortDescription: 'SME business bank accounts with low transaction fees, smart accounting integrations, and cashbacks.',
      longDescription: 'Open a dedicated business bank account tailored for UK small business owners. Enjoy seamless integration with accounting software like Xero or QuickBooks, lower transfer fees, local support, and cashbacks on monthly operating spend.',
      benefits: [
        'Fast online application and approval in minutes',
        'Seamless API integrations with Xero, QuickBooks, and FreeAgent',
        'Low domestic and international transaction and transfer rates',
        'Dedicated UK-based client relationship support'
      ],
      processSteps: [
        { title: 'Submit Company Info', description: 'Provide UK Companies House registration details.' },
        { title: 'Identity Check', description: 'Complete quick online ID verification.' },
        { title: 'Account Open', description: 'Receive your card and IBAN details immediately.' }
      ],
      faqs: [
        { question: 'How long does setup take?', answer: 'Most business accounts are verified and open in under 24 hours.' },
        { question: 'Is my money protected?', answer: 'Yes, all our partnered banking providers are regulated by the FCA and protected by the FSCS.' }
      ],
      related: [
        { title: 'Business Funding', slug: 'business-funding', category: 'Finance', desc: 'Merchant cash advances and loans.' },
        { title: 'Software Products', slug: 'software-products', category: 'Growth', desc: 'Integrated CRM and operation software.' }
      ]
    },
    'software-products': {
      title: 'Software Products',
      category: 'Growth',
      shortDescription: 'Custom operation management software, online booking engines, and CRM tools.',
      longDescription: 'Scale your business efficiency with modern software products. We set up online booking engines for clinics/salons, centralized CRM platforms to manage client details, and automated digital workflows to eliminate hours of manual entry.',
      benefits: [
        'Automated scheduling, appointment alerts, and online booking',
        'Centralized customer databases (CRM) to track leads and history',
        'Automated invoice generation and digital contract signing',
        'Custom API integrations between POS and software tools'
      ],
      processSteps: [
        { title: 'Select Solution', description: 'Identify bottlenecks in booking, scheduling, or lead tracking.' },
        { title: 'Configure Platform', description: 'We design custom booking pages or database layouts.' },
        { title: 'Go Live', description: 'Train your staff and integrate the software onto your website.' }
      ],
      faqs: [
        { question: 'Can I migrate my existing customer list?', answer: 'Yes. We handle the full database migration from CSV or previous software securely.' }
      ],
      related: [
        { title: 'POS Systems', slug: 'pos-systems', category: 'Payments', desc: 'Integrated point-of-sale setups.' },
        { title: 'Digital Marketing', slug: 'digital-marketing', category: 'Growth', desc: 'Customer lead acquisition campaigns.' }
      ]
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      category: 'Growth',
      shortDescription: 'Data-driven customer acquisition campaigns to drive retail and service sales.',
      longDescription: 'Nitru Connect manages performance marketing, local SEO, Google Ads, and social media campaigns designed to generate direct phone enquiries, walk-ins, and online leads.',
      benefits: [
        'ROI tracking integrated directly with POS sales volume data',
        'Expert Google Ads and Meta campaigns search placement optimization',
        'Local SEO setup for Google Maps supremacy',
        'Professional monthly performance analytics reviews'
      ],
      processSteps: [
        { title: 'Define Objective', description: 'Identify target customer profiles and monthly leads budget.' },
        { title: 'Launch Campaigns', description: 'Set up ad copy, optimized landing pages, and target keyword maps.' },
        { title: 'Optimize & Scale', description: 'Daily budget optimization to lower cost-per-lead.' }
      ],
      faqs: [
        { question: 'How long before we see leads?', answer: 'Paid ads launch leads in 48 hours; organic SEO maps show results in 60-90 days.' }
      ],
      related: [
        { title: 'Software Products', slug: 'software-products', category: 'Growth', desc: 'CRM platforms and booking engines.' },
        { title: 'POS Systems', slug: 'pos-systems', category: 'Payments', desc: 'Integrated in-store checkout systems.' }
      ]
    },
    'broadband-telecoms': {
      title: 'Broadband & Telecoms',
      category: 'Telecoms',
      shortDescription: 'High-speed business fiber internet, VoIP phone systems, and corporate connectivity.',
      longDescription: 'Ensure reliable communication with business-grade broadband, leased fiber lines, and modern cloud VoIP telephony systems. Tailored packages for offices, retail shops, and remote teams.',
      benefits: [
        'Ultrafast business-grade fiber with guaranteed SLA uptimes',
        'Cloud-based VoIP solutions with auto-attendant and mobile sync',
        'Dedicated account managers and local technical support teams',
        'Unified billing for landlines, broadband, and cloud phones'
      ],
      processSteps: [
        { title: 'Check Availability', description: 'Enter your postcode to search local fiber infrastructure.' },
        { title: 'Build VoIP System', description: 'Select number of lines, handsets, and routing options.' },
        { title: 'Install & Setup', description: 'Telecom engineers set up and configure hardware.' }
      ],
      faqs: [
        { question: 'Do you offer backup connections?', answer: 'Yes, we provide 4G/5G backup failover systems to keep your business online during outages.' },
        { question: 'Can we keep our existing business phone numbers?', answer: 'Absolutely. We handle the full number porting process with no loss of calls.' }
      ],
      related: [
        { title: 'Electric & Gas', slug: 'business-energy', category: 'Utilities', desc: 'Electricity and gas supplier auditing.' },
        { title: 'Card Machines', slug: 'card-machines', category: 'Payments', desc: 'Contactless card payment terminals.' }
      ]
    }
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const data = await api.getServiceBySlug(slug);
        setService(data);
      } catch (err) {
        console.warn('API error fetching service details slug. Using fallback data.', err.message);
        // Use fallback if present
        const fallback = fallbackServices[slug] || {
          title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          category: 'Solutions',
          shortDescription: 'Reduce your business operational cost with our expert auditing.',
          longDescription: 'Nitru Connect helps businesses find better utility tariffs, merchant processing card terminals, and VoIP telecom systems.',
          benefits: ['Expert auditing reviews', 'Rolling contract options', 'Next-day switches managed by agents'],
          processSteps: [
            { title: 'Submit Requirement', description: 'Provide details on current provider utility bills.' },
            { title: 'Agent Review', description: 'Our specialist reviews contract charges.' },
            { title: 'Switch Settle', description: 'Migrate contract details to lower rate tariffs.' }
          ],
          faqs: [{ question: 'How do I start?', answer: 'Simply request a consultation quote or submit an enquiry statement.' }],
          related: []
        };
        setService(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug]);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f7fc]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f4f7fc] gap-4">
        <h2 className="text-base font-bold text-neutral">Service details not found.</h2>
        <Link to="/services" className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-24 pb-16">
      <SEO 
        title={service.title}
        description={service.shortDescription}
      />

      {/* Header Breadcrumbs */}
      <nav className="py-4 px-4 md:px-8 border-b border-gray-200/40 text-left">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight size={10} />
          <span className="text-gray-600">{service.title}</span>
        </div>
      </nav>

      {/* Service Hero */}
      <section className="py-16 px-4 md:px-8 bg-transparent text-left">
        <div className="max-w-7xl mx-auto glass-panel rounded-[2rem] p-6 sm:p-12 border border-white/50 bg-white/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full self-start">{service.category}</span>
              <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral leading-tight">
                {service.title}
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                {service.longDescription || service.shortDescription}
              </p>
              <button 
                onClick={() => onOpenQuote(service.title)}
                className="bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95 self-start mt-2 shadow-md"
              >
                Request Free Review
              </button>
            </div>

            <div className="lg:col-span-5 relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden shadow-xl border-t-4 border-secondary bg-white">
              {service.heroImage ? (
                <img 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src={service.heroImage}
                  alt={`${service.title} solutions layout`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-primary/10', 'to-secondary/10');
                  }}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-primary font-montserrat text-4xl font-extrabold opacity-20">
                      {service.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution block */}
      <section className="py-12 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Problem card */}
            <div className="glass-panel p-8 rounded-3xl border-l-4 border-red-500 text-left flex flex-col gap-4 bg-white/60 shadow-md">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">The Overhead Problem</span>
              <h3 className="font-montserrat text-base font-bold text-neutral">Hidden fee markups and locked contracts decrease margins.</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                Most SME business utility accounts and card terminal processing systems come with locked exit contracts and hidden price indexations that increase monthly rates. Overpaying directly decreases net operating cash reserves.
              </p>
            </div>

            {/* Solution card */}
            <div className="glass-panel p-8 rounded-3xl border-l-4 border-green-500 text-left flex flex-col gap-4 bg-white/60 shadow-md">
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Nitru Solution</span>
              <h3 className="font-montserrat text-base font-bold text-neutral">Direct wholesale comparison and rolling service agreements.</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                We compare metering options and card processing statements against direct wholesale rates, negotiating contracts to strip out hidden broker fees and provide flat-rate, rolling transaction agreements.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits checklist */}
      <section className="py-12 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/60">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-neutral">Key Solution Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-2xl bg-white/80 border border-gray-100 hover:scale-102 transition-transform shadow-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                <h4 className="font-montserrat text-xs sm:text-sm font-bold text-neutral">{benefit}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-neutral">Switching Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/50 text-left relative bg-white/40 shadow-md">
                <span className="text-[10px] bg-primary/10 font-bold px-3 py-1.5 rounded-full text-primary absolute top-4 right-4 uppercase">Step 0{i + 1}</span>
                <h3 className="font-montserrat text-sm font-bold text-neutral mb-2 mt-4">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-semibold">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document requirements block */}
      <section className="py-16 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel border-white bg-white/60 p-8 md:p-12 rounded-[2rem] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left shadow-xl">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full self-start">Audit Checklist</span>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-neutral tracking-tight">Required Billing Documents</h2>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                To perform a cost reduction switch or utility tariff review, we require simple information about your current setups. Preparing these files accelerates our audit turnaround.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-bold text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  <span>Business address postcode</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  <span>Recent provider bill upload</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  <span>Average monthly sales volume</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  <span>Current contract exit terms</span>
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl smooth-shadow border border-gray-100 flex flex-col items-center justify-center text-center gap-5">
              <FileText className="text-primary animate-pulse" size={40} />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-neutral">Got a statement ready?</h4>
                <p className="text-[10px] text-gray-400 mt-1">Upload PDF, PNG, or Excel bills securely in our enquiry form.</p>
              </div>
              <button 
                onClick={() => onOpenQuote(service.title)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold py-3.5 rounded-full transition-colors active:scale-95 shadow-md"
              >
                Upload Bill & Apply
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 px-4 md:px-8 relative" ref={reveal}>
          <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-12 rounded-[2rem] border border-white/50 bg-white/60">
            <div className="text-center mb-10 flex flex-col items-center gap-3">
              <HelpCircle size={32} className="text-primary" />
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-neutral">Service FAQs</h2>
            </div>
            <div className="flex flex-col gap-4 text-left">
              {service.faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div key={i} className="border border-gray-200/50 rounded-2xl bg-white/80 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-montserrat text-xs sm:text-sm font-bold text-neutral hover:bg-gray-50/50 transition-colors focus:outline-none"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 ${isOpen ? 'max-h-48 border-t border-gray-100 p-6' : 'max-h-0 pointer-events-none'}`}>
                      <p className="text-gray-500 text-xs leading-relaxed font-semibold">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services navigation */}
      {(() => {
        // API returns relatedServices as populated objects; fallback uses service.related
        const relatedItems = (service.relatedServices && service.relatedServices.length > 0)
          ? service.relatedServices.map(r => ({
              title: r.title,
              slug: r.slug,
              category: r.category,
              desc: r.shortDescription || r.desc || ''
            }))
          : (service.related || []);

        if (!relatedItems.length) return null;

        return (
          <section className="py-16 px-4 md:px-8 relative" ref={reveal}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-neutral">Related Growth Services</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedItems.map((item, i) => (
                  <div key={item.slug || i} className="p-8 rounded-3xl glass-panel border border-white/50 flex flex-col justify-between items-start text-left hover:-translate-y-1 hover:shadow-lg transition-all bg-white/50">
                    <div>
                      <span className="text-[9px] bg-primary/5 border border-primary/10 font-bold px-3 py-1.5 rounded-full text-primary mb-4 inline-block uppercase tracking-wider">{item.category}</span>
                      <h3 className="font-montserrat text-sm sm:text-base font-bold text-neutral mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 font-semibold">{item.desc}</p>
                    </div>
                    <Link 
                      to={`/services/${item.slug}`}
                      className="text-primary font-bold text-xs inline-flex items-center gap-1.5 hover:translate-x-1 transition-all"
                    >
                      <span>View Service</span>
                      <ArrowRight size={12} className="text-secondary-dark" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
};

export default ServiceDetails;
