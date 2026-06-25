import React from 'react';
import SEO from '../../components/common/SEO';

const Terms = () => {
  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Terms of Use"
        description="Read the Terms of Use for Nitru Connect to understand client agreements, service limitations, and auditing authorization."
      />

      {/* Hero Header */}
      <section className="relative px-4 md:px-8 max-w-4xl mx-auto mb-8">
        <div className="rounded-[2rem] py-12 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-3 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Legal Document</span>
            <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Terms of Use</h1>
            <p className="text-white/70 text-[10px] sm:text-xs font-semibold">Last updated: June 24, 2026</p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/40 shadow-xl text-left">
          <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Nitru Connect website (the "Site"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree to these terms, you are prohibited from using or accessing this Site.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">2. Description of Services</h2>
              <p>
                Nitru Connect provides business cost-auditing consultations, statement reviews, utility supplier comparison services, and business funding introduction assistance. We act as an independent operations broker. We do not charge business clients direct fees for performing statement reviews; our revenue is earned via commission payouts paid by merchant acquirers or utility suppliers when switches are successfully completed.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">3. Authorization to Audit & Compare</h2>
              <p>
                By submitting utility or merchant processing bills and statements via our web forms, you explicitly authorize Nitru Connect and its representatives to analyze details, contact energy meters/acquirers for verification, and prepare comparison quotes. This authorization does NOT bind you to switch suppliers; any transition requires your signature on a final supplier contract.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">4. Intellectual Property Rights</h2>
              <p>
                The content on this Site, including text, graphics, logos, images, code, and custom calculator widgets, is the intellectual property of Nitru Connect and is protected by copyright, trademark, and other proprietary laws. You may view and download pages for internal business review purposes only.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">5. Disclaimer & Limitation of Liability</h2>
              <p>
                While we strive to source the most competitive utility tariffs and funding quotes, we do not guarantee that the rates presented represent the absolute lowest cost in the entire retail market. The final contract rate is determined by the suppliers. Nitru Connect is not liable for any operational losses, billing errors, or service outages caused by third-party energy, water, or payment processing suppliers.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of England & Wales. Any legal disputes arising out of the use of our services must be resolved in the courts of London, UK.
              </p>
            </div>

            <div className="border-t border-white/60 pt-6 mt-4 text-[10px] text-gray-400 font-bold">
              For questions about these terms, contact us via email at <a href="mailto:support@nitruconnect.com" className="text-primary hover:underline">support@nitruconnect.com</a>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
