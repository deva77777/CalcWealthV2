import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const footerLinks = {
  calculators: [
    { name: 'Home Loan EMI Calculator', href: '/calculators/home-loan-emi-calculator' },
    { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
    { name: 'Retirement Planning', href: '/calculators/retirement-calculator' },
    { name: 'Net Worth Calculator', href: '/calculators/net-worth-calculator' },
  ],
  resources: [
    { name: 'Financial Health Score', href: '/financial-health' },
    { name: 'All Calculators', href: '/calculators' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-dark-bg text-gray-300 dark:text-dark-text-muted border-t border-transparent dark:border-dark-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Calc<span className="text-primary-400">Wealth</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Making smarter financial decisions accessible to everyone with free tools and resources.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Calculators
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.calculators.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto mb-4">
            <strong className="text-gray-400">Disclaimer:</strong> CalcWealth provides financial calculators and tools for educational and informational purposes only. 
            The calculations and results are estimates and should not be considered as financial advice. Please consult a qualified financial advisor before making any financial decisions.
          </p>
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} CalcWealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
