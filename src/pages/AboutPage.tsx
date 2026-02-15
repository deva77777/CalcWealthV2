import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AboutPage() {
  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Clear Formulas',
      description: 'Every calculation uses standard, verified financial formulas'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'Transparent Calculations',
      description: 'See exactly how your results are computed'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Simple Interfaces',
      description: 'Clean, intuitive design that anyone can use'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Educational Explanations',
      description: 'Learn the concepts behind every calculation'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Practical Guidance',
      description: 'Actionable insights for real financial decisions'
    }
  ];

  const audiences = [
    {
      icon: '💼',
      title: 'Salaried Professionals',
      description: 'Managing income, expenses, and planning for the future'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Young Families',
      description: 'Planning long-term goals like education and home ownership'
    },
    {
      icon: '💳',
      title: 'Loan & Credit Managers',
      description: 'Understanding EMIs, interest costs, and debt payoff strategies'
    },
    {
      icon: '📈',
      title: 'Beginner Investors',
      description: 'Starting their investment journey with SIPs and mutual funds'
    },
    {
      icon: '🎯',
      title: 'Goal Planners',
      description: 'Working towards retirement, emergency funds, or major purchases'
    },
    {
      icon: '📊',
      title: 'Financial Learners',
      description: 'Anyone who wants to understand their finances better'
    }
  ];

  const commitments = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'Maintaining clear and unbiased tools'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'Protecting user privacy'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'Avoiding misleading financial claims'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'Providing educational-first content'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: 'No mandatory sign-ups — your data stays yours'
    }
  ];

  // Structured data for About page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "CalcWealth",
      "description": "CalcWealth makes financial decision-making easier, clearer, and more accessible for everyday professionals with free calculators and tools.",
      "url": "https://calcwealth.com",
      "logo": "https://calcwealth.com/logo.png",
      "foundingDate": "2024",
      "slogan": "Clarity for Every Financial Decision",
      "knowsAbout": [
        "Personal Finance",
        "Financial Planning",
        "EMI Calculations",
        "Investment Planning",
        "Retirement Planning",
        "Financial Health Assessment"
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "Salaried professionals, young families, beginner investors"
      }
    }
  };

  useEffect(() => {
    document.title = 'About CalcWealth - Our Mission to Simplify Financial Decisions';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Learn about CalcWealth's mission to make financial decision-making easier and more accessible. Free calculators, transparent formulas, and educational tools for everyone.");
    }
    
    // Add structured data
    const existingScript = document.querySelector('script[data-page="about"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page', 'about');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    return () => {
      const script = document.querySelector('script[data-page="about"]');
      if (script) script.remove();
    };
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Us
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">CalcWealth</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-primary-200 mb-8">
              Clarity for Every Financial Decision.
            </p>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Making financial decision-making easier, clearer, and more accessible for everyday professionals.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto mb-8"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 text-center">
              <p className="text-xl leading-relaxed">
                CalcWealth was created with one simple mission: <strong className="text-gray-900">To make financial decision-making easier, clearer, and more accessible for everyday professionals.</strong>
              </p>
              <p className="text-lg leading-relaxed mt-6">
                In a world filled with complex financial jargon, hidden loan costs, and overwhelming investment options, we believe everyone deserves simple tools that provide transparent answers.
              </p>
              <p className="text-lg leading-relaxed mt-6">
                Whether you're planning a home loan, calculating SIP returns, preparing for retirement, or evaluating your financial health — CalcWealth helps you understand the numbers behind your decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Why CalcWealth Exists */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why CalcWealth Exists
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mb-8"></div>
                
                <p className="text-gray-600 text-lg mb-6">
                  Many financial tools online are either:
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Overly complicated', 'Hidden behind sign-ups', 'Filled with distractions', 'Or lacking proper explanation'].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-xl font-semibold text-primary-600">
                  CalcWealth was built to change that.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-2xl font-light text-gray-700 italic">
                "No hype. No unrealistic promises. Just clarity."
              </p>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who We Serve
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                CalcWealth is designed for anyone who wants to understand their finances better.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((audience, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-primary-50 transition-colors group">
                  <span className="text-4xl mb-4 block">{audience.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{audience.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-emerald-50 rounded-2xl p-8 text-center">
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">You don't need to be a financial expert to use our tools.</strong>
                <br />
                <span className="text-primary-700">If you earn, save, invest, or borrow — CalcWealth is built for you.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Approach
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-emerald-400 mx-auto mb-6"></div>
              <p className="text-primary-200 text-lg">
                We believe financial awareness starts with understanding your numbers.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <p className="text-center text-lg mb-6">
                That's why every calculator on CalcWealth is:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Built using standard financial formulas',
                  'Structured for accuracy and transparency',
                  'Designed for ease of use',
                  'Accompanied by clear explanations',
                  'Continuously improved for reliability'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 text-lg">
                Our <Link to="/financial-health" className="text-primary-400 hover:text-primary-300 underline">Financial Health Score</Link> tool was created to give users a quick, practical snapshot of their financial position — helping them identify strengths, weaknesses, and areas for improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment to Education */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Commitment to Education
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto mb-6"></div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Educational Purposes Only</h3>
                  <p className="text-amber-800">
                    Financial decisions impact long-term stability and peace of mind. We take that responsibility seriously. All content on CalcWealth is created for <strong>educational purposes only</strong>. We do not provide financial, legal, or investment advice.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-lg text-gray-600">
              Our goal is to <strong className="text-gray-900">empower you with knowledge</strong> so you can make informed decisions with confidence.
            </p>
          </div>
        </section>

        {/* Transparency & Trust */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transparency & Trust
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg">
                We are committed to maintaining the highest standards of transparency.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      {commitment.icon}
                    </span>
                    <span className="text-gray-700">{commitment.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600">
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your data stays yours.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Vision
            </h2>
            <div className="w-20 h-1 bg-white/50 mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-primary-100">
              We aim to build CalcWealth into a <strong className="text-white">trusted financial clarity platform</strong> that helps millions of people make smarter, more confident financial decisions.
            </p>
            
            <p className="text-2xl md:text-3xl font-light italic">
              "Because better decisions begin with better understanding."
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                If you ever have suggestions, feedback, or ideas for improvement, feel free to contact us. We're always working to make CalcWealth better for our users.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </Link>
                <Link
                  to="/calculators"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Explore Calculators
                </Link>
              </div>
            </div>
            
            {/* Final tagline */}
            <div className="mt-12 text-center">
              <p className="text-2xl font-bold text-gray-900">CalcWealth</p>
              <p className="text-primary-600 font-medium">Clarity for Every Financial Decision.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
