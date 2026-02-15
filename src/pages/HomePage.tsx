import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Target, BookOpen, Calculator, Heart, TrendingUp, HelpCircle, Users } from 'lucide-react';
import { calculators } from '@/data/calculators';
import { blogPosts } from '@/data/blogPosts';
import { BlogCard } from '@/components/BlogCard';

const trustReasons = [
  {
    icon: Shield,
    title: 'Verified Financial Formulas',
    description: 'All calculators use industry-standard financial formulas verified by experts.',
  },
  {
    icon: Target,
    title: 'Built for Salaried Professionals',
    description: 'Designed specifically for working professionals managing salary, EMIs, and investments.',
  },
  {
    icon: BookOpen,
    title: 'Transparent Calculations',
    description: 'See exactly how every number is calculated. No hidden logic or confusing results.',
  },
  {
    icon: Heart,
    title: 'Education-First Approach',
    description: 'We help you understand your finances, not just show numbers.',
  },
];

const popularQuestions = [
  {
    question: 'How much EMI can I afford on my salary?',
    link: '/calculators/mortgage-calculator',
    icon: '💰',
  },
  {
    question: 'How to save ₹1 Crore for retirement?',
    link: '/calculators/retirement-calculator',
    icon: '🎯',
  },
  {
    question: 'Should I prepay my home loan or invest in SIP?',
    link: '/calculators/emergency-fund-calculator',
    icon: '🤔',
  },
  {
    question: 'How much emergency fund do I need?',
    link: '/calculators/emergency-fund-calculator',
    icon: '🛡️',
  },
  {
    question: 'What is my actual net worth?',
    link: '/calculators/net-worth-calculator',
    icon: '📊',
  },
  {
    question: 'How to plan for my child\'s education?',
    link: '/calculators/investment-returns-calculator',
    icon: '🎓',
  },
];

const stats = [
  { value: '50,000+', label: 'Calculations Done' },
  { value: '8+', label: 'Free Calculators' },
  { value: '100%', label: 'Free Forever' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero Section - Financial Health Score Focus */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.15%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Stress Awareness Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-sm text-amber-300 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              87% of Indians worry about their financial future
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              What's Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                Financial Health Score?
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              In 60 seconds, discover how financially strong you really are — and how to improve it.
              <span className="block mt-2 text-gray-400">No sign-up. No spam. Just clarity.</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/financial-health"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all hover:shadow-xl hover:scale-105"
              >
                <Heart className="h-5 w-5" />
                Check My Score Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/calculators"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all"
              >
                <Calculator className="h-5 w-5" />
                Explore Calculators
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Connection Section */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b border-amber-100 dark:border-amber-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">💭</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Feeling stressed about money decisions?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  You're not alone. We built CalcWealth to help you understand your finances — not to confuse you with jargon.
                </p>
              </div>
            </div>
            <Link
              to="/financial-health"
              className="flex-shrink-0 inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
            >
              Get your free assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Trust CalcWealth Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              <Shield className="h-4 w-4" />
              Built with Trust
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Why Trust CalcWealth?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing accurate, transparent, and educational financial tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustReasons.map((reason) => (
              <div key={reason.title} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-dark-border dark:bg-dark-card group-hover:border-primary-200 dark:group-hover:border-primary-700 transition-colors">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                    <reason.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-sm">ℹ️</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">Educational Purposes Only:</span>{' '}
                  CalcWealth provides financial calculators and tools for educational and informational purposes only. 
                  Our tools are not a substitute for professional financial advice. Please consult a qualified financial 
                  advisor before making any financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              <Calculator className="h-4 w-4" />
              Free Tools
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Financial Calculators
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Accurate, easy-to-use calculators built for Indian professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {calculators.map((calculator) => (
              <Link
                key={calculator.id}
                to={`/calculators/${calculator.slug}`}
                className="group relative bg-white dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border p-5 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg dark:hover:shadow-primary-900/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-2xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    {calculator.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {calculator.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Use Calculator</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              View All Calculators
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Financial Questions Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              <HelpCircle className="h-4 w-4" />
              Common Questions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Popular Financial Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to the money questions that keep you up at night.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularQuestions.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group flex items-center gap-4 p-5 bg-gray-50 dark:bg-dark-card rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 border border-gray-100 dark:border-dark-border hover:border-primary-200 dark:hover:border-primary-700 transition-all"
              >
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                    {item.question}
                  </h3>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Health CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <Users className="h-4 w-4" />
              Join 50,000+ users who checked their score
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="mt-6 text-lg text-primary-100 max-w-2xl mx-auto">
              Your financial health score reveals where you stand and exactly what to improve. 
              It takes just 60 seconds and it's completely free.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/financial-health"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg hover:bg-gray-50 transition-all hover:scale-105"
              >
                Check My Score Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent-400" />
                No sign-up required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent-400" />
                Takes only 60 seconds
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent-400" />
                Get personalized tips
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                <TrendingUp className="h-4 w-4" />
                Learn & Grow
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Latest Financial Insights
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Practical tips to improve your money habits.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id} post={post} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl px-6 py-12 sm:px-12 sm:py-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-gray-300 text-sm mb-6">
                📧 Join 10,000+ subscribers
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Get Financial Tips in Your Inbox
              </h2>
              <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                Weekly insights on saving, investing, and building wealth — written in plain English.
              </p>
              <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  Subscribe Free
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
