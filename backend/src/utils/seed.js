const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Service = require('../models/Service');
const SiteSetting = require('../models/SiteSetting');
const Testimonial = require('../models/Testimonial');
const Partner = require('../models/Partner');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nitru_connect';
  await mongoose.connect(connStr);
  console.log('MongoDB connected for seeding...');
};

const defaultServices = [
  {
    title: 'Card Machines',
    slug: 'card-machines',
    category: 'Payments',
    shortDescription: 'Latest contactless card payment machines and mobile terminal readers with next-day settlement.',
    longDescription: 'Nitru Connect provides secure, industry-leading merchant card machines and mobile readers. We audit your card processing statements to eliminate hidden broker markups, offering clear, flat rates and fast next-day business settlement.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'POS Systems',
    slug: 'pos-systems',
    category: 'Payments',
    shortDescription: 'Integrated Point of Sale systems with inventory tracking, staff management, and table ordering.',
    longDescription: 'Upgrade your checkout with powerful, easy-to-use ePOS systems. Designed specifically for retail, hospitality, and service businesses, our POS solutions sync real-time stock levels, employee timetables, and customer loyalty rewards directly with card terminals.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Electric & Gas',
    slug: 'business-energy',
    category: 'Utilities',
    shortDescription: 'Save up to 45% on corporate electricity and gas utility connections.',
    longDescription: 'Compare commercial utility tariffs from top business energy providers. Nitru Connect negotiates directly to secure lower fixed-rate tariffs, protecting your company from market price volatility.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Water and waste management',
    slug: 'water-and-waste-management',
    category: 'Utilities',
    shortDescription: 'Commercial water auditing, retail switches, and waste disposal recycling contracts.',
    longDescription: 'Optimize both your commercial water billing and waste disposal schedules. We audit sewerage charges and waste lift tariffs, helping businesses stay compliant and lower overheads for high-usage sites.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Business Funding',
    slug: 'business-funding',
    category: 'Finance',
    shortDescription: 'Flexible capital solutions tailored to accelerate your strategic business expansion.',
    longDescription: 'Unlock merchant cash advances or unsecured business loans designed for SMEs. Repay flexibly as your business grows, with eligibility calculations based on card sales volume or general business turnover.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Business Bank Accounts',
    slug: 'business-bank-accounts',
    category: 'Finance',
    shortDescription: 'SME business bank accounts with low transaction fees, smart accounting integrations, and cashbacks.',
    longDescription: 'Open a dedicated business bank account tailored for UK small business owners. Enjoy seamless integration with accounting software like Xero or QuickBooks, lower transfer fees, local support, and cashbacks on monthly operating spend.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Software Products',
    slug: 'software-products',
    category: 'Growth',
    shortDescription: 'Custom operation management software, online booking engines, and CRM tools.',
    longDescription: 'Scale your business efficiency with modern software products. We set up online booking engines for clinics/salons, centralized CRM platforms to manage client details, and automated digital workflows to eliminate hours of manual entry.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    category: 'Growth',
    shortDescription: 'Data-driven customer acquisition campaigns to drive retail and service sales.',
    longDescription: 'Nitru Connect manages performance marketing, local SEO, Google Ads, and social media campaigns designed to generate direct phone enquiries, walk-ins, and online leads.',
    heroImage: '',
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
    isActive: true
  },
  {
    title: 'Broadband & Telecoms',
    slug: 'broadband-telecoms',
    category: 'Telecoms',
    shortDescription: 'High-speed business fiber internet, VoIP phone systems, and corporate connectivity.',
    longDescription: 'Ensure reliable communication with business-grade broadband, leased fiber lines, and modern cloud VoIP telephony systems. Tailored packages for offices, retail shops, and remote teams.',
    heroImage: '',
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
    isActive: true
  }
];

const defaultTestimonials = [
  {
    clientName: 'Sarah Jenkins',
    companyName: 'Bake & Brew Cafe',
    rating: 5,
    review: 'Nitru Connect helped us switch our card machine terminal and audited our business utility bills. We are saving £1,200 annually on electricity, and our card machines settle funds next-day without issue. Highly recommend their reviews!',
    isActive: true
  },
  {
    clientName: 'Marcus Thorne',
    companyName: 'Apex Gym Group',
    rating: 5,
    review: 'The merchant cash advance funding we secured through Nitru Connect allowed us to open our second location. The process was completed in 48 hours, and repayments are perfectly in sync with our monthly membership card collections.',
    isActive: true
  },
  {
    clientName: 'Elena Rostova',
    companyName: 'Lumina Skin Clinic',
    rating: 5,
    review: 'Our clinic switched telecoms to their VoIP system and launched a local Google Ads campaign. We have seen a 40% increase in patient bookings, and the phone setup works seamlessly on both clinic handsets and mobile apps.',
    isActive: true
  }
];

const defaultPartners = [
  { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', website: 'https://shopify.com' },
  { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg', website: 'https://stripe.com' },
  { name: 'Square', logo: 'https://cdn.worldvectorlogo.com/logos/square-4.svg', website: 'https://squareup.com' },
  { name: 'WooCommerce', logo: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg', website: 'https://woocommerce.com' }
];

const seedDB = async () => {
  try {
    await connectDB();

    // 1. Seed Services
    console.log('Clearing existing services...');
    await Service.deleteMany({});
    await Service.insertMany(defaultServices);
    console.log(`Seeded ${defaultServices.length} default services.`);

    // 3. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(defaultTestimonials);
      console.log('Seeded 3 default testimonials.');
    } else {
      console.log('Testimonials already seeded.');
    }

    // 4. Seed Partners
    const partnerCount = await Partner.countDocuments();
    if (partnerCount === 0) {
      await Partner.insertMany(defaultPartners);
      console.log('Seeded partner placeholders.');
    } else {
      console.log('Partners already seeded.');
    }

    // 5. Seed SiteSettings
    const settingsCount = await SiteSetting.countDocuments();
    if (settingsCount === 0) {
      const settings = new SiteSetting({
        companyName: 'Nitru Connect',
        phone: '+44 20 7946 0958',
        whatsapp: '+44 7911 123456',
        email: 'hello@nitruconnect.com',
        address: '100 Bishopsgate, London EC2M 1GT, United Kingdom',
        socialLinks: {
          facebook: 'https://facebook.com/nitruconnect',
          twitter: 'https://twitter.com/nitruconnect',
          linkedin: 'https://linkedin.com/company/nitruconnect',
          instagram: 'https://instagram.com/nitruconnect'
        }
      });
      await settings.save();
      console.log('Seeded default Site Settings.');
    } else {
      console.log('Site Settings already exist.');
    }

    console.log('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed:', error);
    process.exit(1);
  }
};

seedDB();
