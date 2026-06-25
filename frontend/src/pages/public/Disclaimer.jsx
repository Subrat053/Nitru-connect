import React from 'react';
import SEO from '../../components/common/SEO';

const Disclaimer = () => {
  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Disclaimer"
        description="Read the Nitru Connect legal disclaimer regarding broker representation, financial advisory limitations, and commission models."
      />

      {/* Hero Header */}
      <section className="relative px-4 md:px-8 max-w-4xl mx-auto mb-8">
        <div className="rounded-[2rem] py-12 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-3 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Legal Document</span>
            <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Legal Disclaimer</h1>
            <p className="text-white/70 text-[10px] sm:text-xs font-semibold">Last updated: June 24, 2026</p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/40 shadow-xl text-left">
          <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">1. Operational Broker Disclosure</h2>
              <p>
                Nitru Connect is a trading name and operates as an independent commercial utility comparison and merchant solutions introductions broker. We are NOT an energy supplier, telecommunications operator, financial lender, or card payment acquirer. All utility supply contracts, ePOS installations, and business cash advances are executed directly between you (the business customer) and the respective third-party provider.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">2. No Financial or Investment Advice</h2>
              <p>
                The estimates, calculators, and rate comparisons provided on this website are for general informational purposes only. Nothing on this Site constitutes formal financial, legal, or investment advice. Business funding options (such as merchant cash advances or unsecured loans) should be carefully reviewed in the context of your company's repayment capacity.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">3. Savings & Quotations</h2>
              <p>
                Any stated percentage savings (e.g., "save up to 45%") are calculated based on historical customer switches compared against standard out-of-contract default rates. Actual savings vary depending on your location, meter usage profile, business transaction volumes, and credit standing. Nitru Connect does not guarantee that every audit will result in direct financial savings.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">4. Commission Disclosure</h2>
              <p>
                Our auditing and rate matching services are provided free of charge to business clients. We receive commissions directly from our partner utility suppliers, lenders, or payment acquirers upon the successful execution and activation of your contracts. This commission structure allows us to support our staff and maintain our platform.
              </p>
            </div>

            <div className="border-t border-white/60 pt-6 mt-4 text-[10px] text-gray-400 font-bold">
              For specific queries regarding partner arrangements or detailed commission policies, write to us at hello@nitruconnect.com or call +44 20 7946 0958.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
