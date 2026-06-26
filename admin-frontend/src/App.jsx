import React from 'react';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import { Agentation } from 'agentation';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Scroll listener to scroll viewport to top on path changes */}
      <ScrollToTop />
      
      {/* Route Content */}
      <main className="flex-grow">
        <AppRoutes />
      </main>

      {/* Visual feedback tool for AI agents during development */}
      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}

export default App;
