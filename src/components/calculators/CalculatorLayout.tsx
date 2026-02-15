import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { CurrencySelector } from '@/components/CurrencySelector';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category: string;
  children: ReactNode;
}

export default function CalculatorLayout({ title, description, category, children }: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/calculators" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Calculators</Link>
            <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 dark:text-white font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                {category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">{title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-3xl">{description}</p>
            </div>
            <div className="flex items-center gap-2 sm:mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Currency:</span>
              <CurrencySelector />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </div>
  );
}
