import React from 'react';

const PartnerSlider = () => {
  // Grayscale logos to animate infinitely
  const partners = [
    { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { name: 'Square', logo: 'https://cdn.worldvectorlogo.com/logos/square-4.svg' },
    { name: 'WooCommerce', logo: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg' },
    { name: 'Elavon', logo: 'https://cdn.worldvectorlogo.com/logos/elavon.svg' },
    { name: 'Worldpay', logo: 'https://cdn.worldvectorlogo.com/logos/worldpay.svg' },
  ];

  // Double list to allow seamless loop scrolling
  const list = [...partners, ...partners];

  return (
    <section className="py-12 bg-white border-y border-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8">
        
        {/* Section label */}
        <div className="shrink-0 text-center md:text-left">
          <span className="font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest block">Trusted Integrations</span>
          <span className="font-montserrat text-sm font-semibold text-neutral block mt-0.5">Compatible Networks</span>
        </div>

        {/* Marquee Slider Container */}
        <div className="w-full marquee-container relative pointer-events-none md:pointer-events-auto">
          {/* Left/Right soft gradients for overlay */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div className="marquee-content flex gap-12 items-center">
            {list.map((partner, index) => (
              <div 
                key={index} 
                className="w-28 shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 hover:scale-105 filter grayscale hover:grayscale-0 transition-all duration-300 py-2 cursor-pointer"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-8 object-contain"
                  onError={(e) => {
                    // Fallback to text label if SVG fails
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="font-montserrat text-sm font-bold text-gray-500">${partner.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerSlider;
