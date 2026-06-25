import React from 'react';
import SEO from '../../components/common/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Privacy Policy"
        description="Read the Privacy Policy for Nitru Connect to understand how we collect, store, and process your business and personal details."
      />

      {/* Hero Header */}
      <section className="relative px-4 md:px-8 max-w-4xl mx-auto mb-8">
        <div className="rounded-[2rem] py-12 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-3 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Legal Document</span>
            <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-white/70 text-[10px] sm:text-xs font-semibold">Last updated: June 24, 2026</p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/40 shadow-xl text-left">
          <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">1. Introduction</h2>
              <p>
                Welcome to Nitru Connect ("we," "our," or "us"). We value your privacy and are committed to protecting your personal and business data. This Privacy Policy outlines how we collect, use, store, and share information when you visit our website, submit utility bills, or request merchant fee audit consultations.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">2. Information We Collect</h2>
              <p className="mb-2">We collect information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><strong>Contact Details:</strong> Full name, email address, phone number, and mailing address.</li>
                <li><strong>Business Information:</strong> Company name, registration status, industry type, and utility usage statistics.</li>
                <li><strong>Financial Documents:</strong> Statements, bills, and transaction histories uploaded for utility or payment processing audits.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and traffic patterns collected via cookies.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">3. How We Use Your Information</h2>
              <p className="mb-2">We use the collected details to deliver our services, including:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Reviewing and auditing energy, water, waste, and payment processing statements.</li>
                <li>Sourcing cheaper commercial tariff quotes from our partner network.</li>
                <li>Managing switching logistics and following up on lead enquiries.</li>
                <li>Sending necessary communications, security notifications, and billing alerts.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">4. Information Sharing & Third Parties</h2>
              <p>
                We do not sell or rent your business data to external advertisers. To process utility contract switches or merchant cash advance estimates, we share your audited files only with authorized compliant partners (e.g., energy suppliers, payment processors, credit lenders) with your explicit consent.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">5. Data Retention & Security</h2>
              <p>
                We implement industry-standard encryption protocols (SSL/TLS) for data in transit and secure database storage. We retain customer profiles and uploaded statements only as long as necessary to fulfill the auditing services and comply with legal or accounting requirements.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">6. Your GDPR Rights</h2>
              <p className="mb-2">Under the UK and EU General Data Protection Regulations (GDPR), you have the right to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Request access to the personal data we store about you.</li>
                <li>Request correction or deletion of your records.</li>
                <li>Object to or restrict the processing of your data.</li>
                <li>Withdraw your consent at any time for future communication.</li>
              </ul>
              <p className="mt-3">To exercise these rights, please email us at <a href="mailto:privacy@nitruconnect.com" className="text-primary hover:underline">privacy@nitruconnect.com</a>.</p>
            </div>

            <div className="border-t border-white/60 pt-6 mt-4 text-[10px] text-gray-400 font-bold">
              If you have questions regarding this policy or our data security procedures, contact us at 100 Bishopsgate, London EC2M 1GT or call +44 20 7946 0958.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
