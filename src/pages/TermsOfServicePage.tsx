import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Scale, 
  Shield, 
  Globe,
  Link as LinkIcon,
  Edit,
  Gavel,
  Mail,
  ChevronRight,
  Calculator,
  BookOpen,
  Users
} from 'lucide-react';

export default function TermsOfServicePage() {
  useEffect(() => {
    document.title = 'Terms of Service - CalcWealth | Usage Terms & Conditions';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'CalcWealth Terms of Service. Read our terms and conditions for using our financial calculators and educational resources.');
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service - CalcWealth",
      "description": "CalcWealth Terms of Service. Terms and conditions for using our financial calculators.",
      "url": "https://calcwealth.finance/terms-of-service",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "name": "CalcWealth",
        "url": "https://calcwealth.finance"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const tableOfContents = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'description', title: 'Description of Service' },
    { id: 'eligibility', title: 'User Eligibility' },
    { id: 'permitted-use', title: 'Permitted Use' },
    { id: 'prohibited', title: 'Prohibited Activities' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'calculator-disclaimer', title: 'Calculator Disclaimer' },
    { id: 'no-financial-advice', title: 'No Financial Advice' },
    { id: 'disclaimer-warranties', title: 'Disclaimer of Warranties' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'third-party-links', title: 'Third-Party Links' },
    { id: 'modifications', title: 'Modifications to Terms' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact', title: 'Contact Information' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-indigo-100">
            Please read these terms carefully before using CalcWealth
          </p>
          <p className="text-sm text-indigo-300 mt-4">
            Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tableOfContents.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 text-left text-gray-600 hover:text-indigo-600 transition-colors py-1"
              >
                <span className="text-sm text-gray-400">{index + 1}.</span>
                <span className="text-sm">{item.title}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
          <p className="text-indigo-900 leading-relaxed">
            Welcome to CalcWealth (<a href="https://calcwealth.finance" className="text-indigo-600 hover:underline font-medium">https://calcwealth.finance</a>). 
            These Terms of Service ("Terms") govern your access to and use of our website, calculators, tools, and content. 
            By accessing or using CalcWealth, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Acceptance of Terms */}
          <section id="acceptance" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using CalcWealth, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              
              <div className="space-y-3">
                {[
                  'I accept these Terms of Service in their entirety',
                  'I am of legal age to enter into this agreement',
                  'I will use this website in compliance with all applicable laws',
                  'I understand that these terms may be updated periodically',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm">
                    <strong>Important:</strong> If you do not agree with any part of these Terms, you must discontinue use of the website immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Description of Service */}
          <section id="description" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Description of Service</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                CalcWealth provides free online financial calculators and educational resources designed to help users understand financial concepts and make informed decisions.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-4">Our services include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Calculator, title: 'Financial Calculators', desc: 'EMI, SIP, loan, retirement calculators' },
                  { icon: Shield, title: 'Financial Health Score', desc: 'Personalized financial assessment' },
                  { icon: BookOpen, title: 'Educational Content', desc: 'Blog articles and guides' },
                  { icon: Users, title: 'Free Access', desc: 'No mandatory registration required' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* User Eligibility */}
          <section id="eligibility" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. User Eligibility</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                To use CalcWealth, you must meet the following requirements:
              </p>
              
              <div className="space-y-3">
                {[
                  'Be at least 13 years of age',
                  'Have the legal capacity to enter into a binding agreement',
                  'Not be prohibited from using the service under applicable laws',
                  'Agree to use the website for lawful purposes only',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Permitted Use */}
          <section id="permitted-use" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Permitted Use</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                You are granted a limited, non-exclusive, non-transferable license to:
              </p>
              
              <div className="space-y-3">
                {[
                  'Access and use our calculators for personal, non-commercial purposes',
                  'Read and share our educational content with proper attribution',
                  'Use calculation results for your personal financial planning',
                  'Bookmark and return to our website at any time',
                  'Share links to our website with others',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section id="prohibited" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Prohibited Activities</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree NOT to engage in any of the following activities:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Copy, modify, or distribute our content without permission',
                  'Use automated systems (bots, scrapers) to access the website',
                  'Attempt to hack, disable, or interfere with our systems',
                  'Use our calculators for fraudulent purposes',
                  'Misrepresent calculation results as professional advice',
                  'Remove any copyright or proprietary notices',
                  'Sublicense or sell access to our tools',
                  'Use the website to violate any laws or regulations',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700 bg-red-50 p-3 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                <p className="text-red-800 text-sm">
                  <strong>Violation of these terms may result in immediate termination of your access to CalcWealth and potential legal action.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Intellectual Property</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                All content on CalcWealth is protected by intellectual property laws.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-3">We Own:</h3>
                  <ul className="space-y-2">
                    {['Website design and layout', 'Calculator code and algorithms', 'Original written content', 'Graphics and visual elements', 'CalcWealth brand and logo'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-purple-800">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">You May Not:</h3>
                  <ul className="space-y-2">
                    {['Reproduce content without permission', 'Create derivative works', 'Use our branding', 'Claim ownership of our materials', 'Resell or redistribute our tools'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <XCircle className="w-4 h-4 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Tools Disclaimer */}
          <section id="calculator-disclaimer" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">7. Calculator Tools Disclaimer</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
                    <p className="text-amber-800">
                      All calculators on CalcWealth provide <strong>estimates only</strong>. Results are based on standard financial formulas 
                      and general assumptions. Actual outcomes may vary based on lender policies, market conditions, and individual circumstances.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  'Calculations are for educational and illustrative purposes only',
                  'Results should not be considered as guaranteed outcomes',
                  'We do not guarantee the accuracy of any calculation',
                  'Interest rates and terms may differ from actual offers',
                  'Always verify with qualified professionals before making decisions',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* No Financial Advice */}
          <section id="no-financial-advice" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">8. No Financial Advice</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-red-900 text-lg mb-3">CalcWealth Does NOT Provide:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Financial Advice', 'Investment Advice', 'Tax Advice', 'Legal Advice', 'Loan Approvals', 'Insurance Guidance'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                All content is for <strong>educational purposes only</strong>. Before making any financial decisions, 
                consult with qualified professionals such as certified financial planners, accountants, or legal advisors. 
                Your financial decisions are your sole responsibility.
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section id="disclaimer-warranties" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">9. Disclaimer of Warranties</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 font-mono text-sm">
                <p className="text-gray-800 mb-4">
                  CALCWEALTH IS PROVIDED <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> WITHOUT ANY WARRANTIES OF ANY KIND, 
                  EITHER EXPRESS OR IMPLIED.
                </p>
                <p className="text-gray-700">
                  We do not warrant that:
                </p>
                <ul className="mt-3 space-y-1 text-gray-600">
                  <li>• The website will be uninterrupted or error-free</li>
                  <li>• All information will be accurate or complete</li>
                  <li>• The website will meet your specific requirements</li>
                  <li>• Any errors will be corrected</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section id="limitation-liability" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">10. Limitation of Liability</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-900 font-medium">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, CALCWEALTH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                This includes, but is not limited to, damages for:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { num: '1', title: 'Financial Losses', desc: 'Any monetary loss from using our tools' },
                  { num: '2', title: 'Lost Opportunities', desc: 'Missed financial opportunities' },
                  { num: '3', title: 'Decision Outcomes', desc: 'Results of decisions based on our content' },
                ].map((item) => (
                  <div key={item.num} className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">{item.num}</span>
                    </div>
                    <h4 className="font-medium text-red-900">{item.title}</h4>
                    <p className="text-sm text-red-700 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section id="indemnification" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">11. Indemnification</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless CalcWealth and its operators from any claims, damages, 
                losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              
              <ul className="space-y-3">
                {[
                  'Your use or misuse of the website',
                  'Your violation of these Terms',
                  'Your violation of any third-party rights',
                  'Any content you submit or share',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Third-Party Links */}
          <section id="third-party-links" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">12. Third-Party Links</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                CalcWealth may contain links to third-party websites or services that are not owned or controlled by us.
              </p>
              
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <p className="text-cyan-800 text-sm">
                  We have no control over, and assume no responsibility for, the content, privacy policies, or practices 
                  of any third-party websites. You access third-party links at your own risk.
                </p>
              </div>
            </div>
          </section>

          {/* Modifications to Terms */}
          <section id="modifications" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Edit className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">13. Modifications to Terms</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. When we do:
              </p>
              
              <ul className="space-y-3">
                {[
                  'We will update the "Effective Date" at the top of this page',
                  'We may notify users through the website',
                  'Continued use after changes constitutes acceptance',
                  'Material changes will be prominently posted',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mt-4">
                <p className="text-violet-800 text-sm">
                  We encourage you to review these Terms periodically to stay informed of any updates.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section id="governing-law" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Gavel className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">14. Governing Law</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to 
                its conflict of law provisions.
              </p>
              
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <p className="text-indigo-800 text-sm">
                    Any disputes arising from these Terms or your use of CalcWealth will be subject to the exclusive 
                    jurisdiction of the courts in India.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Severability</h3>
                <p className="text-gray-600 text-sm">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited 
                  or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">15. Contact Information</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 mb-4">
                  <strong>CalcWealth</strong><br />
                  Website: <a href="https://calcwealth.finance" className="text-emerald-600 hover:underline">https://calcwealth.finance</a>
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Agreement Box */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">By Using CalcWealth</h2>
          <p className="text-indigo-100 mb-6">
            You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/financial-health"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Check Financial Health
            </Link>
            <Link
              to="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
            >
              Explore Calculators
            </Link>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <Link to="/" className="text-emerald-600 hover:underline mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
