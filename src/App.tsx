import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import CalculatorsPage from '@/pages/CalculatorsPage';
import CalculatorPage from '@/pages/CalculatorPage';
import FinancialHealthPage from '@/pages/FinancialHealthPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import AboutPage from '@/pages/AboutPage';
import DisclaimerPage from '@/pages/DisclaimerPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import ContactPage from '@/pages/ContactPage';
import GoogleAnalytics from '@/components/Analytics/GoogleAnalytics';

export function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <BrowserRouter>
        {/* Google Analytics - automatically tracks page views */}
        <GoogleAnalytics />
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="calculators" element={<CalculatorsPage />} />
          <Route path="calculators/:slug" element={<CalculatorPage />} />
          <Route path="financial-health" element={<FinancialHealthPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
