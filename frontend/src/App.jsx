import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import QuoteForm from './components/forms/QuoteForm';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTopButton from './components/common/BackToTopButton';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import { Agentation } from 'agentation';

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('');
  const location = useLocation();

  // Determine if current path belongs to the administrative panel
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleOpenQuote = (serviceName = '') => {
    setDefaultService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setDefaultService('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Scroll listener to scroll viewport to top on path changes */}
      <ScrollToTop />

      {/* Conditionally render public navbar */}
      {!isAdminRoute && <Navbar onOpenQuote={() => handleOpenQuote()} />}
      
      {/* Route Content */}
      <main className="flex-grow">
        <AppRoutes onOpenQuote={handleOpenQuote} />
      </main>

      {/* Conditionally render public footer */}
      {!isAdminRoute && <Footer />}

      {/* Floating scroll to top button */}
      {!isAdminRoute && <BackToTopButton />}

      {/* Floating WhatsApp chat button */}
      {!isAdminRoute && <FloatingWhatsApp />}

      {/* Shared consultation quotation request form */}
      <QuoteForm 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        defaultService={defaultService} 
      />

      {/* Visual feedback tool for AI agents during development */}
      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}

export default App;
