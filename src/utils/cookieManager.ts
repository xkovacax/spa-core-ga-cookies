import Cookies from 'js-cookie';
import { ConsentState, CookieType } from '../types/analytics';
import { setConsentMode } from './analytics';

const CONSENT_COOKIE_NAME = 'user_consent';
const COOKIE_EXPIRY_DAYS = 365;

export const getStoredConsent = (): ConsentState | null => {
  const consentString = Cookies.get(CONSENT_COOKIE_NAME);
  if (!consentString) return null;
  
  try {
    return JSON.parse(consentString);
  } catch {
    return null;
  }
};

export const storeConsent = (consent: ConsentState): void => {
  Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(consent), {
    expires: COOKIE_EXPIRY_DAYS,
    secure: true,
    sameSite: 'strict'
  });
  
  updateGoogleConsentMode(consent);
};

export const updateGoogleConsentMode = (consent: ConsentState): void => {
  setConsentMode({
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    functionality_storage: consent.preferences ? 'granted' : 'denied',
    personalization_storage: consent.preferences ? 'granted' : 'denied',
  });
};

export const setCookie = (name: string, value: string, type: CookieType): void => {
  const consent = getStoredConsent();
  if (!consent) return;
  
  const canSetCookie = 
    type === 'necessary' || 
    (type === 'analytics' && consent.analytics) ||
    (type === 'marketing' && consent.marketing) ||
    (type === 'preferences' && consent.preferences);
  
  if (canSetCookie) {
    Cookies.set(name, value, {
      expires: type === 'necessary' ? 365 : 30,
      secure: true,
      sameSite: 'strict'
    });
  }
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const clearNonEssentialCookies = (): void => {
  const consent = getStoredConsent();
  if (!consent) return;
  
  // Clear analytics cookies if consent withdrawn
  if (!consent.analytics) {
    const analyticsCookies = ['_ga', '_ga_', '_gid', '_gat'];
    analyticsCookies.forEach(cookie => {
      removeCookie(cookie);
    });
  }
  
  // Clear marketing cookies if consent withdrawn
  if (!consent.marketing) {
    const marketingCookies = ['_fbp', '_fbc', '__utm'];
    marketingCookies.forEach(cookie => {
      removeCookie(cookie);
    });
  }
};