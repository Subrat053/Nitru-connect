import React, { useState } from 'react';
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

      {/* Render public navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />
      
      {/* Route Content */}
      <main className="flex-grow">
        <AppRoutes onOpenQuote={handleOpenQuote} />
      </main>

      {/* Render public footer */}
      <Footer />

      {/* Floating scroll to top button */}
      <BackToTopButton />

      {/* Floating WhatsApp chat button */}
      <FloatingWhatsApp />

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
