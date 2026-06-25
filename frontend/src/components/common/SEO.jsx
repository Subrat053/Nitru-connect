import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update Title
    const defaultTitle = 'Nitru Connect - Connecting Businesses to Smarter Growth Solutions';
    document.title = title ? `${title} | Nitru Connect` : defaultTitle;

    // Update Description Meta Tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      description ||
        'Nitru Connect helps businesses find better merchant solutions, funding capital, utilities, telecoms and digital growth.'
    );

    // Update Keywords Meta Tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      keywords || 'payments, card machine, merchant services, business utility audit, telecom VoIP'
    );
  }, [title, description, keywords]);

  return null;
};

export default SEO;
