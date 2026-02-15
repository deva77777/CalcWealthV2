import { useCallback } from 'react';
import { ANALYTICS_CONFIG } from '../config/analytics';

/**
 * Custom hook for tracking analytics events
 * 
 * Usage:
 * const { trackEvent, trackCalculatorUse, trackCTAClick } = useAnalytics();
 * 
 * // Track custom event
 * trackEvent('button_click', { button_name: 'signup' });
 * 
 * // Track calculator usage
 * trackCalculatorUse('mortgage-calculator', { loan_amount: 5000000 });
 * 
 * // Track CTA clicks
 * trackCTAClick('hero_cta', 'Check My Score Free');
 */
export const useAnalytics = () => {
  const { ANALYTICS_ENABLED, DEBUG_MODE, MEASUREMENT_ID } = ANALYTICS_CONFIG;

  const isEnabled = ANALYTICS_ENABLED && MEASUREMENT_ID !== 'G-XXXXXXXXXX' && typeof window !== 'undefined' && window.gtag;

  /**
   * Track a custom event
   */
  const trackEvent = useCallback((
    eventName: string,
    eventParams?: Record<string, unknown>
  ) => {
    if (!isEnabled) {
      if (DEBUG_MODE) {
        console.log('[GA Debug] Event:', eventName, eventParams);
      }
      return;
    }

    window.gtag('event', eventName, eventParams);

    if (DEBUG_MODE) {
      console.log('[GA] Event tracked:', eventName, eventParams);
    }
  }, [isEnabled, DEBUG_MODE]);

  /**
   * Track calculator usage
   */
  const trackCalculatorUse = useCallback((
    calculatorName: string,
    calculatorData?: Record<string, unknown>
  ) => {
    trackEvent('calculator_use', {
      calculator_name: calculatorName,
      ...calculatorData,
    });
  }, [trackEvent]);

  /**
   * Track CTA button clicks
   */
  const trackCTAClick = useCallback((
    ctaLocation: string,
    ctaText: string
  ) => {
    trackEvent('cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
    });
  }, [trackEvent]);

  /**
   * Track Financial Health Score completion
   */
  const trackFinancialHealthScore = useCallback((
    score: number,
    categories?: Record<string, number>
  ) => {
    trackEvent('financial_health_complete', {
      score,
      ...categories,
    });
  }, [trackEvent]);

  /**
   * Track blog article read
   */
  const trackBlogRead = useCallback((
    articleSlug: string,
    articleTitle: string,
    readTime: number
  ) => {
    trackEvent('blog_read', {
      article_slug: articleSlug,
      article_title: articleTitle,
      read_time: readTime,
    });
  }, [trackEvent]);

  /**
   * Track newsletter signup
   */
  const trackNewsletterSignup = useCallback((
    location: string
  ) => {
    trackEvent('newsletter_signup', {
      signup_location: location,
    });
  }, [trackEvent]);

  /**
   * Track external link clicks
   */
  const trackExternalLink = useCallback((
    url: string,
    linkText: string
  ) => {
    trackEvent('external_link_click', {
      url,
      link_text: linkText,
    });
  }, [trackEvent]);

  /**
   * Track form submissions
   */
  const trackFormSubmit = useCallback((
    formName: string,
    formData?: Record<string, unknown>
  ) => {
    trackEvent('form_submit', {
      form_name: formName,
      ...formData,
    });
  }, [trackEvent]);

  /**
   * Track file downloads
   */
  const trackDownload = useCallback((
    fileName: string,
    fileType: string
  ) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  }, [trackEvent]);

  /**
   * Track scroll depth
   */
  const trackScrollDepth = useCallback((
    depth: number,
    pagePath: string
  ) => {
    trackEvent('scroll_depth', {
      depth_percentage: depth,
      page_path: pagePath,
    });
  }, [trackEvent]);

  /**
   * Track search queries
   */
  const trackSearch = useCallback((
    searchTerm: string,
    resultsCount: number
  ) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }, [trackEvent]);

  /**
   * Track errors
   */
  const trackError = useCallback((
    errorType: string,
    errorMessage: string,
    errorLocation?: string
  ) => {
    trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackCalculatorUse,
    trackCTAClick,
    trackFinancialHealthScore,
    trackBlogRead,
    trackNewsletterSignup,
    trackExternalLink,
    trackFormSubmit,
    trackDownload,
    trackScrollDepth,
    trackSearch,
    trackError,
  };
};

export default useAnalytics;
