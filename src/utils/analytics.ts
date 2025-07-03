import ReactGA from 'react-ga4';
import { GAEventParameters } from '../types/analytics';

// Initialize GA4
export const initializeGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: GAEventParameters) => {
  ReactGA.event(eventName, parameters);
};

// Track scroll events
export const trackScrollEvent = (scrollPercentage: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${scrollPercentage}%`,
    value: scrollPercentage,
  });
};

// Track click events
export const trackClickEvent = (elementName: string, elementType: string) => {
  trackEvent('click', {
    event_category: 'interaction',
    event_label: `${elementType}: ${elementName}`,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formName,
  });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'navigation',
    event_label: sectionName,
  });
};

// Set consent mode
export const setConsentMode = (consent: {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', consent);
  }
};