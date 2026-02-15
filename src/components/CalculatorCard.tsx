import { Link } from 'react-router-dom';
import { 
  Home, Sunset, TrendingUp, CreditCard, PieChart, 
  BarChart3, Shield, Wallet, ArrowRight
} from 'lucide-react';
import type { Calculator } from '@/data/calculators';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sunset,
  TrendingUp,
  CreditCard,
  PieChart,
  BarChart3,
  Shield,
  Wallet,
};

interface CalculatorCardProps {
  calculator: Calculator;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const IconComponent = iconMap[calculator.icon] || TrendingUp;

  return (
    <Link
      to={`/calculators/${calculator.slug}`}
      className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
            {calculator.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {calculator.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {calculator.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Use Calculator</span>
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  );
}
