import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Financial Health', href: '/financial-health' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-gray-100 dark:border-dark-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 dark:bg-dark-accent">
              <TrendingUp className="h-5 w-5 text-white dark:text-dark-bg" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-dark-text">
              Calc<span className="text-primary-600 dark:text-dark-accent">Wealth</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-dark-accent",
                  location.pathname === link.href
                    ? "text-primary-600 dark:text-dark-accent"
                    : "text-gray-600 dark:text-dark-text-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <ThemeToggle />
            <Link
              to="/financial-health"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 dark:bg-dark-accent px-4 py-2 text-sm font-semibold text-white dark:text-dark-bg shadow-sm hover:bg-primary-700 dark:hover:bg-emerald-400 transition-colors"
            >
              Check Your Score
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-dark-border py-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-primary-50 dark:bg-dark-card text-primary-600 dark:text-dark-accent"
                      : "text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-card"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/financial-health"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 block w-full rounded-lg bg-primary-600 dark:bg-dark-accent px-3 py-2.5 text-center text-base font-semibold text-white dark:text-dark-bg"
              >
                Check Your Score
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
