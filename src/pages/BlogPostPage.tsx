import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { Calculator, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const categoryColors: Record<string, string> = {
  Savings: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Budgeting: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Investing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Retirement: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Debt: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Credit: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

// Ad placement component (placeholder for future AdSense)
function AdPlacement({ position }: { position: 'top' | 'mid' | 'bottom' }) {
  return (
    <div className="my-8 bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 text-center">
      <p className="text-gray-500 dark:text-slate-500 text-sm">
        {/* AdSense placeholder - {position} position */}
        <span className="hidden">Ad placement: {position}</span>
      </p>
    </div>
  );
}

// FAQ Accordion Component
function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <div className="mt-12 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 md:p-8 border border-primary-100 dark:border-slate-600">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-600 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Related Calculators Component
function RelatedCalculators({ calculators }: { calculators: string[] }) {
  if (!calculators || calculators.length === 0) return null;
  
  const calculatorInfo: Record<string, { title: string; icon: string }> = {
    'emergency-fund-calculator': { title: 'Emergency Fund Calculator', icon: '🛡️' },
    'budget-planner': { title: 'Budget Planner', icon: '📊' },
    'net-worth-calculator': { title: 'Net Worth Calculator', icon: '💼' },
    'investment-returns-calculator': { title: 'SIP Calculator', icon: '📈' },
    'retirement-calculator': { title: 'Retirement Calculator', icon: '🏖️' },
    'loan-payoff-calculator': { title: 'Loan Payoff Calculator', icon: '💳' },
    'compound-interest-calculator': { title: 'Compound Interest Calculator', icon: '💰' },
    'mortgage-calculator': { title: 'Home Loan EMI Calculator', icon: '🏠' },
  };
  
  return (
    <div className="my-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Try Our Free Calculators</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {calculators.map((slug) => {
          const info = calculatorInfo[slug];
          if (!info) return null;
          return (
            <Link
              key={slug}
              to={`/calculators/${slug}`}
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg text-emerald-700 dark:text-emerald-400 font-medium hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors border border-emerald-200 dark:border-slate-600"
            >
              <span>{info.icon}</span>
              {info.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const categoryIcons: Record<string, string> = {
  Savings: '💰',
  Budgeting: '📊',
  Investing: '📈',
  Retirement: '🏖️',
  Debt: '💳',
  Credit: '⭐',
};

// Simple markdown-like parser for content
function parseContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactElement[] = [];
  let currentList: string[] = [];
  let isInList = false;
  let listType: 'ul' | 'ol' = 'ul';

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 text-gray-700 dark:text-slate-200">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${elements.length}`} className="list-decimal list-inside space-y-2 my-4 text-gray-700 dark:text-slate-200">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      }
      currentList = [];
      isInList = false;
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-primary-600 dark:text-primary-400 text-sm">$1</code>');
  };

  let inTable = false;
  let tableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) {
      flushList();
      if (inTable) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-slate-600">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  {tableRows[0]?.map((cell, j) => (
                    <th key={j} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-200 uppercase tracking-wider">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                {tableRows.slice(2).map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-700/50'}>
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-sm text-gray-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
      continue;
    }

    // Table
    if (line.startsWith('|')) {
      inTable = true;
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      tableRows.push(cells);
      continue;
    }

    // Headers
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="border-l-4 border-primary-500 dark:border-primary-400 pl-4 py-2 my-6 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg">
          <p className="text-gray-700 dark:text-slate-200 italic" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^[-*✅❌] /)) {
      if (!isInList || listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      isInList = true;
      currentList.push(line.slice(2));
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      if (!isInList || listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      isInList = true;
      currentList.push(line.replace(/^\d+\. /, ''));
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="text-gray-700 dark:text-slate-200 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
    );
  }

  flushList();

  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Set SEO metadata and structured data
  useEffect(() => {
    if (post) {
      // Set page title
      document.title = post.seoTitle || post.title;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.metaDescription || post.excerpt);
      }

      // Add Article structured data
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.credentials
        },
        "publisher": {
          "@type": "Organization",
          "name": "CalcWealth",
          "url": "https://calcwealth.finance"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://calcwealth.finance/blog/${post.slug}`
        }
      };

      // Add FAQ structured data if FAQs exist
      const faqSchema = post.faqs && post.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      } : null;

      // Create script elements
      const articleScriptId = 'article-schema';
      const faqScriptId = 'faq-schema';
      
      // Remove existing scripts
      document.getElementById(articleScriptId)?.remove();
      document.getElementById(faqScriptId)?.remove();

      // Add article schema
      const articleScript = document.createElement('script');
      articleScript.id = articleScriptId;
      articleScript.type = 'application/ld+json';
      articleScript.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(articleScript);

      // Add FAQ schema if exists
      if (faqSchema) {
        const faqScript = document.createElement('script');
        faqScript.id = faqScriptId;
        faqScript.type = 'application/ld+json';
        faqScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqScript);
      }

      // Cleanup
      return () => {
        document.getElementById(articleScriptId)?.remove();
        document.getElementById(faqScriptId)?.remove();
      };
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 dark:text-slate-400 hover:text-primary-600">Home</Link>
            <span className="text-gray-400 dark:text-slate-500">/</span>
            <Link to="/blog" className="text-gray-500 dark:text-slate-400 hover:text-primary-600">Blog</Link>
            <span className="text-gray-400 dark:text-slate-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-slate-800 dark:to-slate-900 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white`}>
              {categoryIcons[post.category]} {post.category}
            </span>
            <span className="text-primary-200">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 text-white font-semibold flex items-center justify-center text-lg">
              {post.author.avatar}
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-primary-200 text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ad Placement - Top */}
        <AdPlacement position="top" />
        
        <div className="prose prose-lg max-w-none">
          {parseContent(post.content)}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-slate-400">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 pt-8 border-t dark:border-slate-700">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-slate-400">Share this article:</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                title="Copy link"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <RelatedCalculators calculators={post.relatedCalculators || []} />

        {/* FAQ Section */}
        <FAQSection faqs={post.faqs || []} />

        {/* Author Box */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-xl flex items-center justify-center flex-shrink-0">
              {post.author.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">About {post.author.name}</h3>
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">{post.author.credentials || 'Financial Expert'}</p>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-3">
                Financial writer helping people make smarter money decisions through educational content and practical guides.
              </p>
              <Link to="/blog" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300">
                View all articles →
              </Link>
            </div>
          </div>
        </div>

        {/* Ad Placement - Bottom */}
        <AdPlacement position="bottom" />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-slate-800 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-600 dark:to-slate-500 flex items-center justify-center">
                    <span className="text-5xl">{categoryIcons[relatedPost.category]}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[relatedPost.category]}`}>
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary-900 dark:bg-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-primary-200 dark:text-slate-400 mb-8">
            Use our free financial tools to plan your future and make smarter money decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/financial-health"
              className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Check Your Financial Health
            </Link>
            <Link
              to="/calculators"
              className="px-6 py-3 bg-primary-700 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-primary-600 dark:hover:bg-slate-600 transition-colors"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
