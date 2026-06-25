import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#f4f7fc] to-[#e8eef8] pt-12 pb-16 px-4 md:px-8">
      {/* Curved connection line graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M -100 200 C 300 50, 600 450, 1100 200 C 1300 100, 1600 300, 1800 150" 
            fill="none" 
            stroke="#0f3cc9" 
            strokeWidth="2" 
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto rounded-3xl glass-panel p-8 md:p-12 relative z-10 smooth-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-10 border-b border-gray-200/50">
          {/* Logo and Tagline */}
          <div className="lg:col-span-4 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-3">
              <img 
                src="/nitru_connect.jpeg" 
                alt="Nitru Connect Logo" 
                className="h-9 w-auto rounded-lg object-contain border border-gray-100 bg-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-montserrat text-xl font-bold tracking-tight text-primary">
                Nitru <span className="text-secondary-dark">Connect</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              Connecting People, Creating Possibilities, and Driving Growth. The trusted cost-reduction partner for SMEs seeking optimized card terminals, finance, and utilities.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/nitruconnect" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100 shadow-sm" title="Facebook">
                <Facebook size={14} />
              </a>
              <a href="https://twitter.com/nitruconnect" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100 shadow-sm" title="Twitter">
                <Twitter size={14} />
              </a>
              <a href="https://linkedin.com/company/nitruconnect" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100 shadow-sm" title="LinkedIn">
                <Linkedin size={14} />
              </a>
              <a href="https://instagram.com/nitruconnect" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100 shadow-sm" title="Instagram">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500">
              <li><Link to="/services/card-machines" className="hover:text-primary transition-colors">Card Machines</Link></li>
              <li><Link to="/services/pos-systems" className="hover:text-primary transition-colors">POS Systems</Link></li>
              <li><Link to="/services/business-funding" className="hover:text-primary transition-colors">Business Funding</Link></li>
              <li><Link to="/services/business-bank-accounts" className="hover:text-primary transition-colors">Business Bank Accounts</Link></li>
              <li><Link to="/services/software-products" className="hover:text-primary transition-colors">Software Products</Link></li>
              <li><Link to="/services/business-energy" className="hover:text-primary transition-colors">Electric & Gas</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Insights Blog</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Contact Details</h4>
            <div className="flex flex-col gap-3 text-xs font-semibold text-gray-500">
              <span className="flex items-start gap-2.5">
                <MapPin size={16} className="text-secondary-dark shrink-0 mt-0.5" />
                <span>100 Bishopsgate, London EC2M 1GT, United Kingdom</span>
              </span>
              <span className="flex items-center gap-2.5">
                <Phone size={16} className="text-secondary-dark shrink-0" />
                <a href="tel:+442079460958" className="hover:text-primary transition-colors">+44 20 7946 0958</a>
              </span>
              <span className="flex items-center gap-2.5">
                <Mail size={16} className="text-secondary-dark shrink-0" />
                <a href="mailto:hello@nitruconnect.com" className="hover:text-primary transition-colors">hello@nitruconnect.com</a>
              </span>
              
              <div className="mt-2 flex gap-2">
                <a 
                  href="https://wa.me/447911123456" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[10px] px-4 py-2.5 rounded-full transition-colors shadow-sm"
                >
                  <Send size={12} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer base copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-semibold text-gray-400">
          <span>&copy; {new Date().getFullYear()} Nitru Connect. All rights reserved. Registered in England & Wales.</span>
          <div className="flex gap-4">
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
