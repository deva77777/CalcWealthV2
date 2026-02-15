import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  AlertTriangle, 
  BookOpen, 
  Scale, 
  ExternalLink, 
  Megaphone,
  AlertCircle,
  CheckCircle,
  Mail,
  FileText
} from 'lucide-react';

export default function DisclaimerPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Disclaimer | CalcWealth - Educational Financial Tools';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the CalcWealth disclaimer. Our calculators and content are for educational purposes only and do not constitute financial advice.');
    }

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Disclaimer",
      "description": "Legal disclaimer for CalcWealth financial calculators and educational content",
      "url": "https://calcwealth.finance/disclaimer",
      "publisher": {
        "@type": "Organization",
        "name": "CalcWealth",
        "url": "https://calcwealth.finance"
      },
      "dateModified": new Date().toISOString().split('T')[0]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldAlert className="w-4 h-4" />
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Disclaimer
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Important information about using CalcWealth
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* General Information */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">General Information</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-4">
              The information provided on CalcWealth (<a href="https://calcwealth.finance" className="text-primary-600 hover:underline">https://calcwealth.finance</a>) is for <strong>educational and informational purposes only</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              All calculators, tools, articles, and resources available on this website are designed to help users better understand financial concepts and perform general financial calculations. The content is not intended to serve as financial, investment, legal, tax, or professional advice.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-blue-800 font-medium">
                By using this website, you acknowledge and agree to this disclaimer.
              </p>
            </div>
          </div>
        </section>

        {/* No Financial Advice */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">No Financial Advice</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
              <p className="text-red-800 font-semibold">
                CalcWealth does not provide personalized financial advice.
              </p>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-4">
              The calculators and content on this website are based on commonly accepted financial formulas and general assumptions. However, financial situations vary from person to person.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Before making any financial decisions — including taking loans, investing, refinancing, or changing financial strategies — you should consult with a <strong>qualified financial advisor, accountant, or other licensed professional</strong>.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
              <p className="text-amber-800 font-semibold">
                ⚠️ Your financial decisions are your sole responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* Accuracy of Information */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Accuracy of Information</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-6">
              We strive to ensure that all tools, formulas, and content provided on CalcWealth are accurate and up to date. However:
            </p>
            
            <ul className="space-y-3 mb-6">
              {[
                'We do not guarantee the completeness, reliability, or accuracy of any information.',
                'Financial rates, tax laws, and regulations may change over time.',
                'Calculation results are estimates and may vary depending on actual terms, lender policies, or market conditions.'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-slate-500 text-sm">{index + 1}</span>
                  </div>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-slate-100 rounded-xl p-4">
              <p className="text-slate-700">
                CalcWealth shall not be held liable for any errors, omissions, or outcomes resulting from the use of our tools or content.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Purpose Only */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Educational Purpose Only</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-800 font-medium">
                📚 All content on this website is provided strictly for educational purposes.
              </p>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-4">
              Nothing on this website should be interpreted as:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Investment advice',
                'Financial planning advice',
                'Loan approval guidance',
                'Tax advice',
                'Legal advice'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-lg">
                  <span className="text-red-500">✕</span>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            
            <p className="text-slate-600 leading-relaxed mt-6">
              Users are encouraged to <strong>independently verify information</strong> before making financial decisions.
            </p>
          </div>
        </section>

        {/* No Guarantees */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">No Guarantees</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-4">
              CalcWealth does not guarantee:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                'Specific financial outcomes',
                'Investment returns',
                'Loan approvals',
                'Interest rate availability',
                'Savings projections'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-orange-50 px-4 py-3 rounded-lg">
                  <span className="text-orange-500">⚡</span>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-100 rounded-xl p-4">
              <p className="text-slate-700">
                All examples and scenarios shown are <strong>hypothetical</strong> and intended for illustrative purposes only.
              </p>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">External Links</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-4">
              This website may contain links to third-party websites or services.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We do not control and are not responsible for the content, policies, or practices of any third-party websites. Visiting external links is done at your own discretion.
            </p>
          </div>
        </section>

        {/* Affiliate & Advertising Disclosure */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Affiliate & Advertising Disclosure</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-4">
              CalcWealth may display advertisements or participate in affiliate marketing programs in the future.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              This means we may earn a commission if users click on certain links or sign up for services through our website. However:
            </p>
            
            <div className="space-y-3">
              {[
                'This does not influence our educational content.',
                'We aim to maintain objectivity and transparency.',
                'Any sponsored or affiliate content will be clearly disclosed where applicable.'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Limitation of Liability</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-4">
              By using CalcWealth, you agree that:
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                'You use the website and its tools at your own risk.',
                'CalcWealth shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.',
                'We are not responsible for financial losses resulting from reliance on our calculators or content.'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consent */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Consent</h2>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
            <p className="text-slate-700 leading-relaxed mb-4">
              By accessing and using CalcWealth, you consent to this Disclaimer and agree to its terms.
            </p>
            <p className="text-slate-700 leading-relaxed">
              If you do not agree with any part of this Disclaimer, you should discontinue use of the website.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Contact</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-slate-600 leading-relaxed mb-6">
              If you have any questions regarding this Disclaimer, please contact us through the Contact page on our website.
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-500">
            <strong>Last Updated:</strong> {currentDate}
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Explore Our Tools?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Now that you understand our terms, start using our free financial calculators to make smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/financial-health"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Check Financial Health Score
            </Link>
            <Link
              to="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
