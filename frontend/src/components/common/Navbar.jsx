import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle, Home, Briefcase, Coins, CreditCard, Info, PhoneCall, ChevronRight, BookOpen } from 'lucide-react';

const Navbar = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-4 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8`}>
      <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel py-3 px-6 md:px-10 smooth-shadow' 
          : 'bg-white/40 backdrop-blur-sm py-4 px-6 md:px-8 border border-white/20 shadow-sm'
      } flex justify-between items-center`}>
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img 
            src="/nitru-removebg.png" 
            alt="Nitru Connect Logo" 
            className="h-12 w-auto rounded-lg object-contain scale-125"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* <span className="font-montserrat text-lg md:text-xl font-bold tracking-tight text-primary">
            Nitru <span className="text-secondary-dark relative">Connect<span className="absolute -bottom-0.5 right-0 w-3 h-1 bg-accent rounded-full animate-pulse"></span></span>
          </span> */}
        </Link>

        {/* Desktop Navigation Link Pills */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 bg-gray-50/50 rounded-full px-6 py-2 border border-gray-100/50">
          <Link to="/" className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1">Home</Link>
          <Link to="/services" className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1">Services</Link>
          <button onClick={() => handleNavClick('funding')} className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1 focus:outline-none">Funding</button>
          <button onClick={() => handleNavClick('payments')} className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1 focus:outline-none">Payments</button>
          <Link to="/about" className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1">About Us</Link>
          <Link to="/contact" className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1">Contact</Link>
          <Link to="/blog" className="font-montserrat text-xs font-bold text-gray-600 hover:text-primary transition-colors py-1">Blog</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => onOpenQuote()}
            className="bg-primary hover:bg-primary-dark text-white font-montserrat text-xs font-bold px-6 py-3 rounded-full flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(15,60,201,0.2)] hover:shadow-[0_6px_20px_rgba(15,60,201,0.3)] hover:-translate-y-0.5 active:scale-95"
          >
            <span>Request Free Review</span>
            <ArrowRight size={14} className="text-secondary" />
          </button>
        </div>

        {/* Mobile Menu Toggle button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-neutral hover:text-primary focus:outline-none p-1.5 rounded-full hover:bg-gray-50 transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu Panel */}
      <div className={`fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-3xl shadow-xl z-50 md:hidden transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}>
        <nav className="flex flex-col p-5 gap-3 text-left">
          
          {/* Navigation Links */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Home size={16} />
              </div>
              <span>Home</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </Link>

          <Link 
            to="/services" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Briefcase size={16} />
              </div>
              <span>Services</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </Link>

          <button 
            onClick={() => { setIsOpen(false); handleNavClick('funding'); }} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group focus:outline-none w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Coins size={16} />
              </div>
              <span>Funding</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </button>

          <button 
            onClick={() => { setIsOpen(false); handleNavClick('payments'); }} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group focus:outline-none w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <CreditCard size={16} />
              </div>
              <span>Payments</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </button>

          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Info size={16} />
              </div>
              <span>About Us</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </Link>

          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <PhoneCall size={16} />
              </div>
              <span>Contact</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </Link>

          <Link 
            to="/blog" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-slate-700 hover:text-primary hover:bg-primary/5 hover:border-primary/10 transition-all font-montserrat text-sm font-bold group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <BookOpen size={16} />
              </div>
              <span>Blog</span>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
          </Link>
          
          {/* Action Buttons Stacked Vertically */}
          <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-slate-100">
            <button 
              onClick={() => { setIsOpen(false); onOpenQuote(); }}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-xs py-4 rounded-2xl shadow-[0_4px_12px_rgba(15,60,201,0.15)] active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Request Free Review</span>
              <ArrowRight size={14} className="text-secondary" />
            </button>
            <a 
              href="https://wa.me/447911123456" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full flex items-center justify-center gap-2 bg-green-50/50 border border-green-200/60 text-green-600 font-montserrat font-bold text-xs py-3 rounded-2xl transition-all active:scale-98 hover:bg-green-50"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;
