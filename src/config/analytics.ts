// ============================================
// Google Analytics Configuration
// ============================================
// 
// HOW TO SET UP:
// 1. Go to https://analytics.google.com
// 2. Create a new property for your website
// 3. Get your Measurement ID (starts with 'G-')
// 4. Replace 'G-XXXXXXXXXX' below with your actual ID
// 5. Set ANALYTICS_ENABLED to true
//
// ============================================

export const ANALYTICS_CONFIG = {
  // Your Google Analytics Measurement ID
  // Replace with your actual GA4 Measurement ID
  MEASUREMENT_ID: 'G-P36BS959T1',
  
  // Set to true after adding your Measurement ID
  ANALYTICS_ENABLED: false,
  
  // Enable debug mode (logs events to console)
  DEBUG_MODE: false,
};

// ============================================
// Google AdSense Configuration
// ============================================

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID
  // Replace with your actual Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
  PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  
  // Set to true after AdSense approval
  ADSENSE_ENABLED: false,
};

// ============================================
// Google Search Console
// ============================================

export const SEARCH_CONSOLE_CONFIG = {
  // Your Search Console verification code
  // Get this from: Google Search Console > Settings > Ownership verification > HTML tag
  VERIFICATION_CODE: '',
};
