import React from 'react';
import SEO from '../../components/common/SEO';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Compass, Eye, ShieldCheck, HeartHandshake, Award, Users } from 'lucide-react';

const About = ({ onOpenQuote }) => {
  const reveal = useScrollReveal();

  const principles = [
    { title: 'Transparency', desc: 'No hidden commission markups or rolling contract locks. Clear quotes and flat pricing structures.', icon: <ShieldCheck className="text-primary" size={20} /> },
    { title: 'Practical Support', desc: 'We take care of the administrative switching process with current utility or merchant providers.', icon: <HeartHandshake className="text-primary" size={20} /> },
    { title: 'Customer-First', desc: 'No aggressive cold sales. We present data audits and let business owners make the final decision.', icon: <Users className="text-primary" size={20} /> },
    { title: 'Trusted Network', desc: 'We work only with fully compliant payment processors, lenders, and utilities in the UK.', icon: <Award className="text-primary" size={20} /> },
  ];

  const milestones = [
    { year: '2024', title: 'Nitru Connect Founded', desc: 'Launched with a core focus on merchant payment processing and statement auditing.' },
    { year: '2025', title: 'Utility Comparison Launch', desc: 'Expanded services into commercial electricity, gas, waste, and sewerage contract audits.' },
    { year: '2026', title: 'Platform Launch', desc: 'Deployed full-stack lead scoring CMS to process business reviews in under 24 hours.' }
  ];

  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16">
      <SEO 
        title="About Us"
        description="Learn more about Nitru Connect: our brand story, SME utility mission, transparency core principles, and partner milestones."
      />

      {/* Hero section */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="rounded-[2rem] py-16 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Our Story</span>
            <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">About Nitru Connect</h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
              We are dedicated to helping small and medium enterprises (SMEs) reduce overhead costs and simplify connection logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Brand story & vision/mission split layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-neutral leading-tight">Connecting People, Possibilities, and Growth</h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">
              Nitru Connect was established to bridge the gap between complex utility retail markets, merchant credit card acquirers, and busy independent business owners. Operating a retail store, cafe, clinic, or office is demanding. Finding time to call dozens of utility brokers and card processors for cost estimates is nearly impossible.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">
              We compile billing details and statement audits, and present them in a simplified cost comparison format. We then handle the switching administration so you can focus entirely on operations and customers.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/50 flex flex-col gap-4 shadow-md bg-white/40">
              <Compass className="text-primary animate-pulse" size={28} />
              <h3 className="font-montserrat text-sm font-bold text-neutral">Our Mission</h3>
              <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">
                Simplify services procurement, reduce monthly utility overheads, and connect SMEs with reliable, transparent digital growth and financial funding solutions.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-3xl border border-white/50 flex flex-col gap-4 shadow-md bg-white/40">
              <Eye className="text-primary animate-pulse" size={28} />
              <h3 className="font-montserrat text-sm font-bold text-neutral">Our Vision</h3>
              <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">
                Become the UK’s most trusted SME growth and operational solutions consultancy partner, helping 50,000+ businesses achieve sustainable savings.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">Our Standards</span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-bold text-neutral">Core Brand Principles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl text-left flex flex-col gap-4 shadow-md hover:-translate-y-1 transition-all bg-white/50 border-white">
                <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 border border-primary/10">
                  {item.icon}
                </div>
                <h3 className="font-montserrat text-sm font-bold text-neutral">{item.title}</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-20 px-4 md:px-8 relative" ref={reveal}>
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/60 shadow-xl">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-neutral">Our Journey</h2>
          </div>

          <div className="flex flex-col gap-8 relative border-l border-gray-200 pl-6 text-left">
            {milestones.map((milestone, i) => (
              <div key={i} className="relative group">
                {/* timeline bullet */}
                <div className="absolute -left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary group-hover:scale-125 transition-transform flex items-center justify-center shadow-sm" />
                <span className="text-xs font-bold text-primary block">{milestone.year}</span>
                <h3 className="font-montserrat text-sm font-bold text-neutral mb-2 mt-1">{milestone.title}</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action Call to About Page */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto my-8 overflow-hidden relative">
        <div className="border border-white/10 bg-gradient-to-r from-primary to-[#1844cb] text-white p-8 md:p-12 rounded-[2rem] text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative flex flex-col items-center gap-5 z-10">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold">Start Saving On Operations Today</h2>
            <p className="text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed font-semibold">
              Connect with our cost audit analysts to review merchant terminals, broadband VoIP line configurations, and gas/electric meters.
            </p>
            <button 
              onClick={onOpenQuote}
              className="bg-secondary hover:bg-secondary-dark text-neutral font-montserrat text-xs font-bold px-8 py-3.5 rounded-full transition-all active:scale-95 shadow-md mt-2"
            >
              Start Your Business Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
