export interface GAEventParameters {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  necessary: boolean;
}

export type CookieType = 'analytics' | 'marketing' | 'preferences' | 'necessary';