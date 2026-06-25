import React, { useState, useRef } from 'react';
import SEO from '../../components/common/SEO';
import Hero from '../../components/home/Hero';
import PartnerSlider from '../../components/home/PartnerSlider';
import FundingCalculator from '../../components/home/FundingCalculator';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CreditCard, Landmark, LineChart, Shield, ArrowRight, BookOpen, Star, HelpCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ onOpenQuote }) => {
  const reveal = useScrollReveal();
  const [activeFaq, setActiveFaq] = useState(null);

  const trustStats = [
    { value: '£500M+', label: 'Processed Annually', border: 'border-primary' },
    { value: '10k+', label: 'Active Partners', border: 'border-secondary-dark' },
    { value: '99.9%', label: 'Uptime Reliability', border: 'border-accent' },
  ];

  const testimonials = [
    {
      stars: 5,
      quote: '"Nitru Connect audited our utility billing and merchant services. They switched us to rolling contracts saving us £1,200 annually. Highly recommend!"',
      author: 'Sarah Jenkins',
      company: 'Bake & Brew Cafe',
      border: 'border-primary'
    },
    {
      stars: 5,
      quote: '"The cash advance was processed in 48 hours. Repayments adapt proportionally to our daily card sales, making it extremely stress-free to open our gym expansion."',
      author: 'Marcus Thorne',
      company: 'Apex Gym Group',
      border: 'border-secondary-dark'
    },
    {
      stars: 5,
      quote: '"Switching our VoIP system and launching Google Ads through Nitru has seen a 40% increase in patient bookings. Tech setup was completely seamless."',
      author: 'Elena Rostova',
      company: 'Lumina Skin Clinic',
      border: 'border-accent'
    }
  ];

  const highlights = [
    {
      title: 'Card Machines & POS',
      desc: 'Sleek contactless payment terminals and smart ePOS systems to power your in-store sales.',
      icon: <CreditCard className="text-primary" size={26} />,
      bg: 'bg-primary/5',
      hover: 'group-hover:bg-primary/20',
      link: '/services/card-machines'
    },
    {
      title: 'Business Funding',
      desc: 'Flexible business capital or merchant cash advances sized to your monthly transaction volume.',
      icon: <Landmark className="text-secondary-dark" size={26} />,
      bg: 'bg-secondary/10',
      hover: 'group-hover:bg-secondary/25',
      link: '/services/business-funding'
    },
    {
      title: 'Software & Marketing',
      desc: 'Google Ads local SEO, booking platforms, and custom operational software to scale your business.',
      icon: <LineChart className="text-primary" size={26} />,
      bg: 'bg-primary/5',
      hover: 'group-hover:bg-primary/20',
      link: '/services/digital-marketing'
    }
  ];

  const steps = [
    { num: '01', title: 'Tell us your requirement', desc: 'Fill out our quick business details form.' },
    { num: '02', title: 'We review your need', desc: 'Our agents analyze your statements and meter charges.' },
    { num: '03', title: 'We suggest solutions', desc: 'Compare lower tariffs and financing options.' },
    { num: '04', title: 'You choose and grow', desc: 'Settle contract switches with zero downtime.' }
  ];

  const faqs = [
    { q: 'How does Nitru Connect reduce my overheads?', a: 'We compare utility bills, card terminal fees, and telecoms packages against direct wholesale market tariffs. We negotiate volume pricing to pass lower contract rates to you.' },
    { q: 'Is there a consultation fee?', a: 'No. Our business audit reviews and consultations are completely free, with no obligation to switch.' },
    { q: 'How does the Funding Cash Advance work?', a: 'Eligibility is calculated based on your average card transactions. Repayments are a small percentage of your daily card sales, making it flexible if business volume fluctuates.' }
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#f4f7fc] min-h-screen">
      <SEO
        title="Nitru Connect - Connecting Businesses to Smarter Growth Solutions"
        description="Nitru Connect helps businesses find better merchant payment card terminals, unsecured loans, utility tariffs, VoIP systems, and eCommerce checkouts."
      />

      {/* Hero Section */}
      <Hero onOpenQuote={onOpenQuote} />

      {/* Partner Marquee Slider */}
      <div className="py-8 bg-white/40 border-y border-white/20 backdrop-blur-sm relative z-20">
        <PartnerSlider />
      </div>
      {/* Trust Numbers Section */}
      <section className="py-10 md:py-20 relative z-20 px-4 md:px-8" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustStats.map((stat, i) => (
              <div key={i} className={`glass-panel p-8 rounded-3xl smooth-shadow flex flex-col items-center justify-center text-center border-t-4 ${stat.border} bg-white/70 hover:scale-102 transition-transform`}>
                <span className="font-montserrat text-4xl sm:text-5xl font-extrabold text-neutral tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section id="highlights" className="scroll-mt-24 py-12 md:py-24 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">Nitru Focus Areas</span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-bold tracking-tight text-neutral">
              Comprehensive Growth Engine
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-2xl">
              Integrated, professional utility comparison, smart merchant settlement systems, and digital client acquisition built to help your business scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, i) => (
              <Link to={item.link} key={i} className="p-8 rounded-3xl glass-panel hover:bg-white/80 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group border border-white/50 flex flex-col justify-between items-start text-left bg-white/50">
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6 transition-colors ${item.hover}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-montserrat text-lg font-bold text-neutral mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 font-semibold">{item.desc}</p>
                </div>
                <span className="text-primary font-bold text-xs inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                  Learn More <ArrowRight size={14} className="text-secondary-dark" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Payments Solutions highlights */}
      <section id="payments" className="scroll-mt-28 py-10 md:py-20 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto text-left">
          <div className="glass-panel rounded-[2rem] p-8 md:p-12 border border-white/50 bg-white/60 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5">
                <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full self-start">Card Terminals & Gateways</span>
                <h2 className="font-montserrat text-2xl sm:text-4xl font-bold text-neutral">
                  Advanced Payment Solutions
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                  Reduce transaction costs with modern in-store card machines, payment gateways, and ePOS systems. Our merchant agreements guarantee low rates and next-day funding, helping salons, cafes, and shops save money on checkout fees.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex gap-3 bg-white/40 p-3 rounded-2xl border border-white/50">
                    <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-bold text-xs text-neutral">PCI Compliant</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Secure payment processing hardware</p>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-white/40 p-3 rounded-2xl border border-white/50">
                    <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-bold text-xs text-neutral">Next-Day Settlement</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Quick fund access in 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/80 p-6 sm:p-8 rounded-3xl border border-white smooth-shadow flex flex-col gap-5">
                <h3 className="font-montserrat text-base font-bold text-neutral border-b border-gray-100 pb-3">Our Processing Tariffs</h3>
                <div className="flex justify-between items-center text-xs py-1 border-b border-gray-50 font-semibold text-gray-500">
                  <span>In-Store Terminals</span>
                  <span className="font-bold text-neutral">Custom Low Rates</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1 border-b border-gray-50 font-semibold text-gray-500">
                  <span>Online Gateway API</span>
                  <span className="font-bold text-neutral">Instant Integrations</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1 border-b border-gray-50 font-semibold text-gray-500">
                  <span>Contract Locked terms</span>
                  <span className="font-bold text-neutral">None (Rolling Switch)</span>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold py-3.5 rounded-full mt-2 transition-all active:scale-95 shadow-[0_4px_12px_rgba(15,60,201,0.15)]"
                >
                  Request Payment Cost Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Estimator Calculator */}
      <FundingCalculator onOpenQuote={onOpenQuote} />

      {/* How it Works Section */}
      <section className="py-12 md:py-24 px-4 md:px-8 relative overflow-hidden" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">Our Methodology</span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-bold tracking-tight text-neutral">
              How Nitru Connect Works
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl font-semibold">
              We audit your business utility bills, payment charges, or loan requirements, and connect you with wholesale market rates.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((item, i) => (
              <div key={i} className="flex flex-col text-left glass-panel p-6 rounded-2xl border border-gray-200/80 relative group hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white/90 cursor-pointer">
                <span className="text-4xl font-extrabold text-primary/20 group-hover:text-primary/40 group-hover:scale-105 transition-all duration-300 absolute top-4 right-4 font-montserrat">{item.num}</span>
                <h3 className="font-montserrat text-sm font-bold text-neutral mb-2 mt-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Review Section */}
      <section className="py-10 md:py-20 relative overflow-hidden" ref={reveal}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">Client Reviews</span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-bold text-neutral">Partnering for Success</h2>
          </div>
        </div>

        <div className="w-full marquee-container relative py-2">
          {/* Left/Right soft gradients for overlay */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#f4f7fc] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#f4f7fc] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content flex gap-6 items-stretch">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, i) => (
              <div 
                key={i} 
                className="snap-center shrink-0 w-[290px] sm:w-[350px] md:w-[380px] glass-panel p-6 rounded-3xl border-t-4 border-primary text-left bg-white/80 flex flex-col justify-between hover:scale-102 transition-transform cursor-pointer"
                style={{ borderColor: item.border === 'border-primary' ? '#0f3cc9' : item.border === 'border-secondary-dark' ? '#b38f00' : '#e63946' }}
              >
                <div>
                  <div className="flex gap-1 text-secondary-dark mb-4">
                    {[...Array(item.stars)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6 font-montserrat italic whitespace-normal">
                    {item.quote}
                  </p>
                </div>
                <div className="border-t border-gray-100/50 pt-4 mt-auto">
                  <span className="font-bold text-xs text-neutral block">{item.author}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">{item.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Grid */}
      <section className="py-12 md:py-24 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-12 rounded-[2rem] border border-white/50 bg-white/60">
          <div className="text-center mb-12 flex flex-col items-center gap-3">
            <HelpCircle size={32} className="text-primary" />
            <h2 className="font-montserrat text-2xl font-bold text-neutral">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4 text-left">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="border border-gray-200/50 rounded-2xl bg-white/80 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-montserrat text-xs sm:text-sm font-bold text-neutral hover:bg-gray-50/50 transition-colors focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ${isOpen ? 'max-h-48 border-t border-gray-100 p-6' : 'max-h-0 pointer-events-none'}`}>
                    <p className="text-gray-500 text-xs leading-relaxed font-semibold">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Action CTA Block */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-primary text-white relative text-center overflow-hidden">
        {/* Decorative waves */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark" />
        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6 z-10">
          <h2 className="font-montserrat text-2xl sm:text-4xl font-bold tracking-tight">Ready to Optimize Your Business Cost?</h2>
          <p className="text-primary-light text-xs sm:text-sm max-w-xl leading-relaxed">
            Request a free business audit. Our utility comparison agents and merchant payment analysts will identify hidden charges and generate custom lower quotation tariffs.
          </p>
          <button
            onClick={onOpenQuote}
            className="bg-secondary hover:bg-secondary-dark text-neutral font-montserrat font-bold text-xs px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 mt-2"
          >
            Request Free Business Review
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
