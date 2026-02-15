import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Database, 
  Cookie, 
  Lock, 
  Users, 
  Share2, 
  UserCheck, 
  Baby, 
  Clock, 
  Globe, 
  Mail,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy - CalcWealth | Your Data Protection Rights';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'CalcWealth Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy matters to us.');
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - CalcWealth",
      "description": "CalcWealth Privacy Policy. Learn how we collect, use, and protect your personal information.",
      "url": "https://calcwealth.finance/privacy-policy",
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
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'data-storage', title: 'Data Storage & Security' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'data-sharing', title: 'Data Sharing' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'retention', title: 'Data Retention' },
    { id: 'international', title: 'International Users' },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
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
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Your Privacy Matters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">
            How we collect, use, and protect your information
          </p>
          <p className="text-sm text-blue-300 mt-4">
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
                className="flex items-center gap-2 text-left text-gray-600 hover:text-emerald-600 transition-colors py-1"
              >
                <span className="text-sm text-gray-400">{index + 1}.</span>
                <span className="text-sm">{item.title}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to CalcWealth (<a href="https://calcwealth.finance" className="text-emerald-600 hover:underline">https://calcwealth.finance</a>). 
                We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                and use our financial calculators and tools.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-emerald-800 text-sm">
                  <strong>Please read this Privacy Policy carefully.</strong> By accessing or using CalcWealth, you acknowledge that you have read, 
                  understood, and agree to be bound by this Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-collect" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We may collect information about you in various ways. The information we may collect includes:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-600 mb-3">
                    Information you voluntarily provide when using our services:
                  </p>
                  <ul className="space-y-2">
                    {['Email address (if you subscribe to our newsletter)', 'Name (if provided through contact forms)', 'Any information you enter into our calculators'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-900">Data Type</th>
                          <th className="text-left p-3 font-semibold text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="p-3 text-gray-700">Device Information</td>
                          <td className="p-3 text-gray-600">Browser type, operating system, device type</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">Usage Data</td>
                          <td className="p-3 text-gray-600">Pages visited, time spent, click patterns</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">IP Address</td>
                          <td className="p-3 text-gray-600">For analytics and security purposes</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">Referral Source</td>
                          <td className="p-3 text-gray-600">How you found our website</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Calculator inputs are processed locally in your browser. We do not store your financial calculations on our servers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="how-we-use" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We use the information we collect for the following purposes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Provide Services', desc: 'To operate and maintain our calculators and tools' },
                  { title: 'Improve Experience', desc: 'To understand how users interact with our website' },
                  { title: 'Send Updates', desc: 'To send newsletters and educational content (with consent)' },
                  { title: 'Analytics', desc: 'To analyze trends and optimize website performance' },
                  { title: 'Security', desc: 'To detect and prevent fraud or abuse' },
                  { title: 'Legal Compliance', desc: 'To comply with applicable laws and regulations' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section id="cookies" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Cookie className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Cookies & Tracking Technologies</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Types of Cookies We Use:</h3>
                
                <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                    <h4 className="font-medium text-gray-900">Essential Cookies</h4>
                    <p className="text-sm text-gray-600 mt-1">Required for the website to function properly. These cannot be disabled.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600 mt-1">Help us understand how visitors interact with our website (e.g., Google Analytics).</p>
                  </div>
                  <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                    <h4 className="font-medium text-gray-900">Preference Cookies</h4>
                    <p className="text-sm text-gray-600 mt-1">Remember your settings and preferences for a better experience.</p>
                  </div>
                  <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                    <h4 className="font-medium text-gray-900">Advertising Cookies</h4>
                    <p className="text-sm text-gray-600 mt-1">Used to deliver relevant advertisements (if applicable in the future).</p>
                  </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Managing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    You can control and manage cookies through your browser settings. Please note that disabling certain cookies 
                    may affect the functionality of our website.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Storage & Security */}
          <section id="data-storage" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Data Storage & Security</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We take the security of your information seriously and implement appropriate technical and organizational measures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: '🔒', title: 'SSL Encryption', desc: 'All data transmitted is encrypted using SSL/TLS' },
                  { icon: '🛡️', title: 'Secure Servers', desc: 'Data stored on secure, protected servers' },
                  { icon: '👁️', title: 'Access Controls', desc: 'Limited access to personal information' },
                  { icon: '🔄', title: 'Regular Updates', desc: 'Security measures regularly reviewed and updated' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="font-medium text-gray-900 mt-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Local Storage:</strong> Most calculator data is processed and stored locally in your browser. 
                  Your financial calculations are not transmitted to or stored on our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section id="third-party" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Third-Party Services</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We may use third-party services that collect, monitor, and analyze data:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Google Analytics</h4>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-sm flex items-center gap-1 hover:underline">
                      Privacy Policy <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">Used to analyze website traffic and user behavior.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Google AdSense</h4>
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-sm flex items-center gap-1 hover:underline">
                      Ad Policy <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">May be used to display relevant advertisements (if applicable).</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                These third-party services have their own privacy policies governing the use of your information.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="data-sharing" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">7. Data Sharing</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium">
                  We do not sell, trade, or rent your personal information to third parties.
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information only in the following circumstances:
              </p>
              
              <ul className="space-y-3">
                {[
                  'With service providers who assist in operating our website',
                  'To comply with legal obligations or court orders',
                  'To protect our rights, privacy, safety, or property',
                  'In connection with a merger, acquisition, or sale of assets (with notice)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">8. Your Rights</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Right to Access', desc: 'Request a copy of your personal data' },
                  { title: 'Right to Rectification', desc: 'Request correction of inaccurate data' },
                  { title: 'Right to Erasure', desc: 'Request deletion of your personal data' },
                  { title: 'Right to Restrict', desc: 'Request limitation of data processing' },
                  { title: 'Right to Portability', desc: 'Receive your data in a portable format' },
                  { title: 'Right to Object', desc: 'Object to certain types of processing' },
                ].map((right, i) => (
                  <div key={i} className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h4 className="font-medium text-teal-900">{right.title}</h4>
                    <p className="text-sm text-teal-700 mt-1">{right.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-6">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Baby className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">9. Children's Privacy</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                CalcWealth is not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13.
              </p>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-pink-800 text-sm">
                  If you are a parent or guardian and believe your child has provided us with personal information, 
                  please contact us immediately so we can delete such information.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="retention" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">10. Data Retention</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, unless a longer retention period is required by law.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span><strong>Newsletter subscribers:</strong> Until you unsubscribe</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span><strong>Analytics data:</strong> As per third-party service policies</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span><strong>Calculator data:</strong> Stored locally in your browser only</span>
                </li>
              </ul>
            </div>
          </section>

          {/* International Users */}
          <section id="international" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">11. International Users</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                CalcWealth is operated from India. If you are accessing our website from outside India, please be 
                aware that your information may be transferred to, stored, and processed in India.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you consent to the transfer of your information to India and agree that your 
                information will be subject to Indian data protection laws.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section id="changes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">12. Changes to This Policy</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                <p className="text-violet-800 text-sm">
                  We encourage you to review this Privacy Policy periodically for any changes. Your continued use 
                  of CalcWealth after changes are posted constitutes your acceptance of the revised policy.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section id="contact" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">13. Contact Us</h2>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <Link to="/" className="text-emerald-600 hover:underline mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your Privacy is Our Priority</h2>
          <p className="text-emerald-100 mb-6">
            We're committed to being transparent about our data practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/financial-health"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Check Financial Health
            </Link>
            <Link
              to="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
