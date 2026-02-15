import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function BudgetPlanner() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [expenses, setExpenses] = useState({
    rent: 20000,
    utilities: 3000,
    groceries: 8000,
    transportation: 5000,
    insurance: 2000,
    entertainment: 5000,
    dining: 4000,
    shopping: 3000,
    subscriptions: 1500,
    other: 2000,
  });

  const results = useMemo(() => {
    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    const remaining = monthlyIncome - totalExpenses;
    const savingsRate = (remaining / monthlyIncome) * 100;

    // 50/30/20 targets
    const needs = expenses.rent + expenses.utilities + expenses.groceries + expenses.transportation + expenses.insurance;
    const wants = expenses.entertainment + expenses.dining + expenses.shopping + expenses.subscriptions;
    const savings = remaining;

    const needsPercent = (needs / monthlyIncome) * 100;
    const wantsPercent = (wants / monthlyIncome) * 100;
    const savingsPercent = (savings / monthlyIncome) * 100;

    return {
      totalExpenses,
      remaining,
      savingsRate,
      needs,
      wants,
      savings,
      needsPercent,
      wantsPercent,
      savingsPercent,
      needsTarget: monthlyIncome * 0.5,
      wantsTarget: monthlyIncome * 0.3,
      savingsTarget: monthlyIncome * 0.2,
    };
  }, [monthlyIncome, expenses]);

  const expenseCategories = [
    { key: 'rent', label: 'Rent / EMI', icon: '🏠', category: 'needs' },
    { key: 'utilities', label: 'Utilities', icon: '💡', category: 'needs' },
    { key: 'groceries', label: 'Groceries', icon: '🛒', category: 'needs' },
    { key: 'transportation', label: 'Transportation', icon: '🚗', category: 'needs' },
    { key: 'insurance', label: 'Insurance', icon: '🛡️', category: 'needs' },
    { key: 'entertainment', label: 'Entertainment', icon: '🎬', category: 'wants' },
    { key: 'dining', label: 'Dining Out', icon: '🍽️', category: 'wants' },
    { key: 'shopping', label: 'Shopping', icon: '🛍️', category: 'wants' },
    { key: 'subscriptions', label: 'Subscriptions', icon: '📱', category: 'wants' },
    { key: 'other', label: 'Other', icon: '📦', category: 'other' },
  ];

  const updateExpense = (key: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CalculatorLayout
      title="Budget Planner (50/30/20 Rule)"
      description="Plan your monthly budget using the 50/30/20 rule. Allocate your income to needs, wants, and savings."
      category="Budgeting"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Income */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Monthly Income</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">{currencyInfo.symbol}</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-xl font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Monthly Expenses</h2>
            <div className="grid grid-cols-2 gap-4">
              {expenseCategories.map(({ key, label, icon }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {icon} {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">{currencyInfo.symbol}</span>
                    <input
                      type="number"
                      value={expenses[key as keyof typeof expenses]}
                      onChange={(e) => updateExpense(key, Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Remaining */}
          <div
            className={`rounded-2xl p-6 ${
              results.remaining >= 0
                ? 'bg-gradient-to-br from-green-600 to-green-700'
                : 'bg-gradient-to-br from-red-600 to-red-700'
            } text-white`}
          >
            <p className="text-white/80 text-sm font-medium">
              {results.remaining >= 0 ? 'Available for Savings' : 'Over Budget'}
            </p>
            <p className="text-4xl font-bold mt-2">{formatCurrency(Math.abs(results.remaining))}</p>
            <p className="text-white/80 mt-2">
              {results.savingsRate.toFixed(1)}% savings rate
            </p>
          </div>

          {/* 50/30/20 Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">50/30/20 Analysis</h3>
            
            <div className="space-y-4">
              {/* Needs */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Needs (Target: 50%)</span>
                  <span className={`font-medium ${results.needsPercent > 50 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {results.needsPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${results.needsPercent > 50 ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(results.needsPercent, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatCurrency(results.needs)} / {formatCurrency(results.needsTarget)}
                </p>
              </div>

              {/* Wants */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Wants (Target: 30%)</span>
                  <span className={`font-medium ${results.wantsPercent > 30 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {results.wantsPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${results.wantsPercent > 30 ? 'bg-red-500' : 'bg-purple-500'}`}
                    style={{ width: `${Math.min((results.wantsPercent / 30) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatCurrency(results.wants)} / {formatCurrency(results.wantsTarget)}
                </p>
              </div>

              {/* Savings */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Savings (Target: 20%)</span>
                  <span className={`font-medium ${results.savingsPercent < 20 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                    {results.savingsPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${results.savingsPercent >= 20 ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min((results.savingsPercent / 20) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatCurrency(results.savings)} / {formatCurrency(results.savingsTarget)}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Income</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Expenses</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(results.totalExpenses)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Net Savings</span>
                <span className={`font-bold ${results.remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(results.remaining)}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center">
              <span className="mr-2">💡</span>
              Budget Tips
            </h3>
            <ul className="text-amber-700 dark:text-amber-300 text-sm mt-2 space-y-1">
              <li>• Aim for 50% or less on essential needs</li>
              <li>• Track subscriptions - they add up quickly</li>
              <li>• Automate your savings at the start of each month</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
