import React, { useState, useEffect } from 'react';
import { ConsentState } from '../../types/analytics';
import { getStoredConsent, storeConsent, updateGoogleConsentMode } from '../../utils/cookieManager';
import { trackEvent } from '../../utils/analytics';
import styles from './CookieConsent.module.css';

interface CookieConsentProps {
  onConsentChange?: (consent: ConsentState) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    preferences: false,
    necessary: true,
  });

  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      updateGoogleConsentMode(storedConsent);
      onConsentChange?.(storedConsent);
    } else {
      setShowBanner(true);
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      marketing: true,
      preferences: true,
      necessary: true,
    };
    
    setConsent(newConsent);
    storeConsent(newConsent);
    setShowBanner(false);
    onConsentChange?.(newConsent);
    
    trackEvent('cookie_consent', {
      event_category: 'consent',
      event_label: 'accept_all',
    });
  };

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      analytics: false,
      marketing: false,
      preferences: false,
      necessary: true,
    };
    
    setConsent(newConsent);
    storeConsent(newConsent);
    setShowBanner(false);
    onConsentChange?.(newConsent);
    
    trackEvent('cookie_consent', {
      event_category: 'consent',
      event_label: 'reject_all',
    });
  };

  const handleCustomize = () => {
    setShowPreferences(true);
    trackEvent('cookie_consent', {
      event_category: 'consent',
      event_label: 'customize',
    });
  };

  const handleSavePreferences = () => {
    storeConsent(consent);
    setShowBanner(false);
    setShowPreferences(false);
    onConsentChange?.(consent);
    
    trackEvent('cookie_consent', {
      event_category: 'consent',
      event_label: 'save_preferences',
      custom_parameters: {
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
      },
    });
  };

  const handleToggleConsent = (type: keyof ConsentState) => {
    if (type === 'necessary') return; // Necessary cookies can't be toggled
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h3 className={styles.title}>Cookie Preferences</h3>
            <p className={styles.description}>
              We use cookies to enhance your experience, analyze our traffic, and provide personalized content. 
              You can manage your preferences or learn more in our{' '}
              <a href="#privacy" className={styles.link}>Privacy Policy</a>.
            </p>
          </div>
          
          <div className={styles.actions}>
            <button 
              className={`${styles.button} ${styles.acceptAll}`}
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
            <button 
              className={`${styles.button} ${styles.rejectAll}`}
              onClick={handleRejectAll}
            >
              Reject All
            </button>
            <button 
              className={`${styles.button} ${styles.customize}`}
              onClick={handleCustomize}
            >
              Customize
            </button>
          </div>
        </div>

        {showPreferences && (
          <div className={styles.preferences}>
            <h4 className={styles.preferencesTitle}>Cookie Preferences</h4>
            <div className={styles.cookieTypes}>
              <div className={styles.cookieType}>
                <div className={styles.cookieTypeInfo}>
                  <h5 className={styles.cookieTypeTitle}>Necessary Cookies</h5>
                  <p className={styles.cookieTypeDescription}>
                    Essential for website functionality and security. These cannot be disabled.
                  </p>
                </div>
                <div className={styles.toggle}>
                  <div className={`${styles.toggleSwitch} ${styles.active} ${styles.disabled}`}>
                    <div className={`${styles.toggleHandle} ${styles.active}`} />
                  </div>
                  <span className={styles.toggleLabel}>Always Active</span>
                </div>
              </div>

              <div className={styles.cookieType}>
                <div className={styles.cookieTypeInfo}>
                  <h5 className={styles.cookieTypeTitle}>Analytics Cookies</h5>
                  <p className={styles.cookieTypeDescription}>
                    Help us understand how visitors interact with our website through Google Analytics.
                  </p>
                </div>
                <div className={styles.toggle}>
                  <div 
                    className={`${styles.toggleSwitch} ${consent.analytics ? styles.active : ''}`}
                    onClick={() => handleToggleConsent('analytics')}
                  >
                    <div className={`${styles.toggleHandle} ${consent.analytics ? styles.active : ''}`} />
                  </div>
                  <span className={styles.toggleLabel}>
                    {consent.analytics ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className={styles.cookieType}>
                <div className={styles.cookieTypeInfo}>
                  <h5 className={styles.cookieTypeTitle}>Marketing Cookies</h5>
                  <p className={styles.cookieTypeDescription}>
                    Used to track visitors across websites for advertising and remarketing purposes.
                  </p>
                </div>
                <div className={styles.toggle}>
                  <div 
                    className={`${styles.toggleSwitch} ${consent.marketing ? styles.active : ''}`}
                    onClick={() => handleToggleConsent('marketing')}
                  >
                    <div className={`${styles.toggleHandle} ${consent.marketing ? styles.active : ''}`} />
                  </div>
                  <span className={styles.toggleLabel}>
                    {consent.marketing ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className={styles.cookieType}>
                <div className={styles.cookieTypeInfo}>
                  <h5 className={styles.cookieTypeTitle}>Preference Cookies</h5>
                  <p className={styles.cookieTypeDescription}>
                    Remember your preferences and settings for a personalized experience.
                  </p>
                </div>
                <div className={styles.toggle}>
                  <div 
                    className={`${styles.toggleSwitch} ${consent.preferences ? styles.active : ''}`}
                    onClick={() => handleToggleConsent('preferences')}
                  >
                    <div className={`${styles.toggleHandle} ${consent.preferences ? styles.active : ''}`} />
                  </div>
                  <span className={styles.toggleLabel}>
                    {consent.preferences ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              className={`${styles.button} ${styles.savePreferences}`}
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;