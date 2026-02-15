import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculators } from '../data/calculators';

const categories = ['All', 'Loans', 'Investing', 'Budgeting', 'Planning'];

export default function CalculatorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCalculators = activeCategory === 'All' 
    ? calculators 
    : calculators.filter(calc => calc.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Free, accurate calculators to help you make smarter financial decisions. 
            From mortgages to retirement planning, we've got you covered.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-dark-card border-b dark:border-dark-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calculator) => (
              <Link
                key={calculator.id}
                to={`/calculators/${calculator.slug}`}
                className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-primary-900/20 transition-all duration-300 border border-gray-100 dark:border-dark-border group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-2xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    {calculator.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                      {calculator.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                      {calculator.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                  Use Calculator
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-dark-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Take our free Financial Health Assessment to get personalized recommendations.
          </p>
          <Link
            to="/financial-health"
            className="inline-flex items-center px-8 py-4 bg-accent-500 dark:bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-600 dark:hover:bg-accent-500 transition-colors"
          >
            Check Your Financial Health
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
