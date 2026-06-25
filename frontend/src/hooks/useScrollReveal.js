import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Margins to delay reveal slightly
      }
    );

    const currentElements = elementsRef.current;
    currentElements.forEach((el) => {
      if (el) {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
      }
    });

    return () => {
      currentElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToReveal = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addToReveal;
};
