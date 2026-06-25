import React from 'react';
import SEO from '../../components/common/SEO';

const CookiePolicy = () => {
  return (
    <div className="bg-[#f4f7fc] min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO 
        title="Cookie Policy"
        description="Review the Cookie Policy for Nitru Connect to learn about website cookies, analytics tools, and opt-out instructions."
      />

      {/* Hero Header */}
      <section className="relative px-4 md:px-8 max-w-4xl mx-auto mb-8">
        <div className="rounded-[2rem] py-12 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-r from-primary to-[#1844cb] text-white border border-white/10 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary-dark pointer-events-none" />
          <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-3 z-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Legal Document</span>
            <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Cookie Policy</h1>
            <p className="text-white/70 text-[10px] sm:text-xs font-semibold">Last updated: June 24, 2026</p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/50 bg-white/40 shadow-xl text-left">
          <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your computer or mobile device when you browse websites. They are widely used to make websites work efficiently, enhance user experience, and provide aggregated reporting information to site owners.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">2. How We Use Cookies</h2>
              <p className="mb-2">Nitru Connect uses cookies for the following purposes:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><strong>Essential Cookies:</strong> Necessary to navigate the site, load WebGL backgrounds, and process secure web forms.</li>
                <li><strong>Analytical Cookies:</strong> Help us measure site traffic, identify most-visited services, and monitor page load speeds.</li>
                <li><strong>Functional Cookies:</strong> Remember your selected business sector and input preferences on the funding calculator.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">3. Third-Party Analytics</h2>
              <p>
                We may utilize third-party analytics tools (such as Google Analytics) to compile anonymous metrics on page views, click durations, and referral source sites. These services do not collect personal identify information, and their cookies are strictly governed by their respective privacy standards.
              </p>
            </div>

            <div>
              <h2 className="font-montserrat text-base font-bold text-neutral mb-3">4. Controlling Your Cookie Settings</h2>
              <p>
                Most web browsers allow you to manage cookies through browser preference controls. You can configure your browser to block cookies, clear stored cookies, or notify you when a cookie is created. Please note that disabling essential cookies may impact certain dynamic features of the Site, such as submitting quotes or using slider tools.
              </p>
            </div>

            <div className="border-t border-white/60 pt-6 mt-4 text-[10px] text-gray-400 font-bold">
              For further information regarding how we handle data security, review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
