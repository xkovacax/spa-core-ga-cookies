import React, { useState, useEffect } from 'react';
import { initializeGA, trackPageView } from './utils/analytics';
import { getStoredConsent } from './utils/cookieManager';
import { useScrollTracking } from './hooks/useScrollTracking';
import { ConsentState } from './types/analytics';

// Components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CookieConsent from './components/CookieConsent/CookieConsent';

// Replace with your actual GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-D3P5ZET45L';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useScrollTracking();

  useEffect(() => {
    // Initialize GA4 when consent is available
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      if (storedConsent.analytics) {
        initializeGA(GA4_MEASUREMENT_ID);
        trackPageView('/');
      }
    }
  }, []);

  useEffect(() => {
    // Track section changes
    const handleSectionChange = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
              
              // Track virtual pageview for section changes
              if (consent?.analytics) {
                trackPageView(`/#${sectionId}`, `Section: ${sectionId}`);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionChange, { passive: true });
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, [activeSection, consent]);

  const handleConsentChange = (newConsent: ConsentState) => {
    setConsent(newConsent);
    
    // Initialize GA4 if analytics consent is granted
    if (newConsent.analytics && !consent?.analytics) {
      initializeGA(GA4_MEASUREMENT_ID);
      trackPageView('/');
    }
  };

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <CookieConsent onConsentChange={handleConsentChange} />
    </div>
  );
}

export default App;