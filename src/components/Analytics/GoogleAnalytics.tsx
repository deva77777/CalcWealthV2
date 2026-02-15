import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ANALYTICS_CONFIG } from '../../config/analytics';

// Extend window type for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics Component
 * 
 * This component:
 * 1. Loads the GA4 script
 * 2. Tracks page views automatically on route changes
 * 3. Provides event tracking utilities
 */
export const GoogleAnalytics: React.FC = () => {
  const location = useLocation();
  const { MEASUREMENT_ID, ANALYTICS_ENABLED, DEBUG_MODE } = ANALYTICS_CONFIG;

  // Load GA script on mount
  useEffect(() => {
    if (!ANALYTICS_ENABLED || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      if (DEBUG_MODE) {
        console.log('[GA] Analytics disabled or Measurement ID not configured');
      }
      return;
    }

    // Check if script already exists
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
      return;
    }

    // Create and append the GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      debug_mode: DEBUG_MODE,
    });

    if (DEBUG_MODE) {
      console.log('[GA] Google Analytics initialized with ID:', MEASUREMENT_ID);
    }
  }, [MEASUREMENT_ID, ANALYTICS_ENABLED, DEBUG_MODE]);

  // Track page views on route change
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !window.gtag || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    const pagePath = location.pathname + location.search;
    
    window.gtag('config', MEASUREMENT_ID, {
      page_path: pagePath,
    });

    if (DEBUG_MODE) {
      console.log('[GA] Page view tracked:', pagePath);
    }
  }, [location, MEASUREMENT_ID, ANALYTICS_ENABLED, DEBUG_MODE]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
