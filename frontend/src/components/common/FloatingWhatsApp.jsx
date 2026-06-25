import React from 'react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/447911123456"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BA56] text-white flex items-center justify-center shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 hover:shadow-[0_8px_25px_rgba(37,211,102,0.3)] focus:outline-none"
      title="Chat on WhatsApp"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.475 1.33 4.99L2 22l5.163-1.353a9.923 9.923 0 0 0 4.848 1.265c5.508 0 9.99-4.482 9.99-9.988 0-2.66-1.035-5.16-2.915-7.04C17.18 3.037 14.678 2 12.012 2zm5.72 13.918c-.244.686-1.42 1.34-1.95 1.41-.49.07-.98.31-3.13-.57-2.73-1.12-4.47-3.9-4.61-4.08-.135-.18-1.1-1.46-1.1-2.785 0-1.327.69-1.98.94-2.24.25-.26.54-.33.72-.33h.52c.16 0 .38-.06.6.46.22.54.76 1.86.83 2 .07.14.12.3.02.5-.1.2-.15.32-.3.5-.15.18-.32.4-.46.54-.16.16-.33.33-.14.66.19.32.84 1.39 1.81 2.25.97.86 1.79 1.13 2.12 1.29.33.16.52.12.72-.1.2-.23.87-1.01 1.1-1.36.23-.35.46-.29.77-.18s1.95.92 2.29 1.09c.33.16.56.24.64.38.085.14.085.81-.16 1.5z" />
      </svg>
      {/* Pulse ring indicator */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 pointer-events-none"></span>
    </a>
  );
};

export default FloatingWhatsApp;
