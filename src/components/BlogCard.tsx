import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

const categoryColors: Record<string, string> = {
  Savings: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Budgeting: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Investing: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Retirement: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Debt: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Credit: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryColor = categoryColors[post.category] || 'bg-gray-50 text-gray-700';

  if (featured) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group relative bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-lg dark:hover:shadow-primary-900/20 transition-all duration-200"
      >
        <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <span className="text-6xl">📊</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
              {post.category}
            </span>
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="mr-1 h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
            <span>Read Article</span>
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
    >
      <div className="shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
        <span className="text-2xl">📈</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
        </div>
        <h3 className="mt-1 font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
