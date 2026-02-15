# CalcWealth Setup Guide

This guide covers the configuration of Google Analytics, Google AdSense, and other third-party services.

---

## 📊 Google Analytics Setup

### Step 1: Create a GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: `CalcWealth`
5. Select your timezone and currency (INR)
6. Click **Create**

### Step 2: Set Up Data Stream
1. Choose **Web** as platform
2. Enter your website URL: `https://calcwealth.finance`
3. Enter stream name: `CalcWealth Website`
4. Click **Create Stream**
5. Copy your **Measurement ID** (starts with `G-`)

### Step 3: Configure in CalcWealth
1. Open `src/config/analytics.ts`
2. Replace `G-XXXXXXXXXX` with your Measurement ID:
   ```typescript
   MEASUREMENT_ID: 'G-YOUR_ACTUAL_ID',
   ```
3. Set `ANALYTICS_ENABLED` to `true`:
   ```typescript
   ANALYTICS_ENABLED: true,
   ```

### Step 4: Test Your Setup
1. Set `DEBUG_MODE: true` temporarily
2. Open browser console
3. Navigate through the site
4. You should see `[GA] Page view tracked:` messages

---

## 💰 Google AdSense Setup

### Step 1: Apply for AdSense
1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign up with your Google account
3. Enter website: `https://calcwealth.finance`
4. Complete the application form

### Step 2: Verify Site Ownership
AdSense will provide a verification code. Add it to your site:

1. Open `index.html`
2. Add the AdSense verification code in `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```

### Step 3: Update ads.txt
1. Open `public/ads.txt`
2. Replace with your Publisher ID:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

### Step 4: Configure in CalcWealth
1. Open `src/config/analytics.ts`
2. Update AdSense config:
   ```typescript
   PUBLISHER_ID: 'ca-pub-YOUR_ACTUAL_ID',
   ADSENSE_ENABLED: true,
   ```

### AdSense Approval Requirements ✅
CalcWealth already meets these requirements:
- ✅ Privacy Policy page
- ✅ Terms of Service page
- ✅ Contact page
- ✅ About page
- ✅ Original, valuable content
- ✅ Mobile-responsive design
- ✅ Clean navigation
- ✅ No prohibited content

---

## 🔍 Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix**
4. Enter: `https://calcwealth.finance`

### Step 2: Verify Ownership
Choose **HTML tag** method:
1. Copy the meta tag content value
2. Open `index.html`
3. Add in `<head>`:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

### Step 3: Submit Sitemap
1. In Search Console, go to **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

---

## 📈 Event Tracking Usage

CalcWealth includes a custom `useAnalytics` hook for tracking user interactions.

### Import the Hook
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';
```

### Available Tracking Functions

```typescript
const { 
  trackEvent,              // Custom events
  trackCalculatorUse,      // Calculator usage
  trackCTAClick,           // CTA button clicks
  trackFinancialHealthScore, // Health score completion
  trackBlogRead,           // Blog article reads
  trackNewsletterSignup,   // Newsletter signups
  trackExternalLink,       // External link clicks
  trackFormSubmit,         // Form submissions
  trackDownload,           // File downloads
  trackScrollDepth,        // Scroll tracking
  trackSearch,             // Search queries
  trackError,              // Error tracking
} = useAnalytics();
```

### Example Usage

```typescript
// Track calculator usage
trackCalculatorUse('home-loan-emi-calculator', {
  loan_amount: 5000000,
  interest_rate: 8.5,
  tenure_years: 20,
});

// Track CTA click
trackCTAClick('hero_section', 'Check My Score Free');

// Track blog read
trackBlogRead('build-emergency-fund-6-months', 'How to Build Emergency Fund', 8);

// Track form submission
trackFormSubmit('contact_form', {
  subject: 'general_inquiry',
});
```

---

## 🔒 Security Considerations

### Environment Variables (Production)
For production, consider using environment variables:

```typescript
// vite.config.ts
export default defineConfig({
  define: {
    'import.meta.env.VITE_GA_ID': JSON.stringify(process.env.VITE_GA_ID),
  },
});
```

Then in your config:
```typescript
MEASUREMENT_ID: import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX',
```

### Data Privacy
- Analytics only tracks page views and custom events
- No personal financial data is sent to Google
- All calculations happen client-side
- User data stays on their device

---

## 📱 Social Media Meta Tags

The `index.html` already includes Open Graph and Twitter Card meta tags. Update these for social sharing:

```html
<meta property="og:title" content="CalcWealth - Financial Calculators & Tools" />
<meta property="og:description" content="Free financial calculators for EMI, SIP, retirement planning, and more." />
<meta property="og:image" content="https://calcwealth.finance/og-image.png" />
<meta property="og:url" content="https://calcwealth.finance" />
```

---

## 📋 Checklist Before Launch

### Technical
- [ ] Replace GA Measurement ID
- [ ] Enable Analytics
- [ ] Verify Search Console ownership
- [ ] Submit sitemap
- [ ] Test all calculator links
- [ ] Test mobile responsiveness

### Content
- [ ] Review all blog articles
- [ ] Check calculator accuracy
- [ ] Verify contact form works
- [ ] Update privacy policy dates

### SEO
- [ ] Add social sharing images
- [ ] Test meta descriptions
- [ ] Verify structured data (Google Rich Results Test)
- [ ] Check page load speed (PageSpeed Insights)

### Legal
- [ ] Update company/individual name in legal pages
- [ ] Add actual contact email
- [ ] Review disclaimer accuracy

---

## 🆘 Troubleshooting

### Analytics Not Working
1. Check `ANALYTICS_ENABLED` is `true`
2. Verify Measurement ID format (`G-XXXXXXXXXX`)
3. Check browser console for errors
4. Disable ad blockers for testing

### AdSense Not Showing
1. Wait for approval (can take 2-4 weeks)
2. Verify ads.txt is accessible: `yourdomain.com/ads.txt`
3. Check for policy violations
4. Ensure sufficient content on pages

### Search Console Issues
1. Wait 24-48 hours after verification
2. Check for crawl errors
3. Verify sitemap format
4. Check robots.txt isn't blocking Google

---

## 📞 Support

If you need help with setup or have questions:
- Create an issue on GitHub
- Contact us through the website contact form

---

*Last updated: January 2025*
