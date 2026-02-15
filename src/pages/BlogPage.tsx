import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostsByCategory } from '../data/blogPosts';

const categories = ['All', 'Savings', 'Budgeting', 'Investing', 'Retirement', 'Debt', 'Credit'];

const categoryColors: Record<string, string> = {
  Savings: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Budgeting: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Investing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Retirement: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Debt: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Credit: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const categoryIcons: Record<string, string> = {
  Savings: '💰',
  Budgeting: '📊',
  Investing: '📈',
  Retirement: '🏖️',
  Debt: '💳',
  Credit: '⭐',
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredPosts = getPostsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-slate-800 dark:to-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Financial Insights & Guides
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Expert advice, practical tips, and in-depth guides to help you master your money
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {category !== 'All' && <span className="mr-1">{categoryIcons[category]}</span>}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-slate-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && (
                <> in <span className="font-semibold text-gray-900 dark:text-white">{selectedCategory}</span></>
              )}
            </p>
          </div>

          {/* Featured Post (First Post) */}
          {filteredPosts.length > 0 && (
            <Link
              to={`/blog/${filteredPosts[0].slug}`}
              className="block mb-12 group"
            >
              <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden md:flex hover:shadow-xl transition-shadow">
                <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-8xl">{categoryIcons[filteredPosts[0].category]}</span>
                </div>
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[filteredPosts[0].category]}`}>
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">Featured</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300 mb-6 line-clamp-3">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold flex items-center justify-center">
                        {filteredPosts[0].author.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{filteredPosts[0].author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{filteredPosts[0].date}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-slate-400">{filteredPosts[0].readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Rest of Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                    <span className="text-6xl">{categoryIcons[post.category]}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-semibold flex items-center justify-center">
                        {post.author.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                There are no articles in this category yet.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-900 dark:bg-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Weekly Financial Tips
          </h2>
          <p className="text-primary-200 dark:text-slate-400 mb-8">
            Join 10,000+ readers getting practical money advice delivered to their inbox every week.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-primary-300 dark:text-slate-500 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
