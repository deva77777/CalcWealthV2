import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function EmergencyFundCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [monthlyExpenses, setMonthlyExpenses] = useState({
    rent: 20000,
    utilities: 3000,
    groceries: 8000,
    transportation: 5000,
    insurance: 2000,
    emi: 15000,
    other: 5000,
  });
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlySavings, setMonthlySavings] = useState(15000);

  const results = useMemo(() => {
    const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((a, b) => a + b, 0);
    const targetFund = totalMonthlyExpenses * targetMonths;
    const amountNeeded = Math.max(0, targetFund - currentSavings);
    const monthsToGoal = monthlySavings > 0 ? Math.ceil(amountNeeded / monthlySavings) : Infinity;
    const progress = Math.min((currentSavings / targetFund) * 100, 100);
    const currentMonthsCovered = totalMonthlyExpenses > 0 ? currentSavings / totalMonthlyExpenses : 0;

    return {
      totalMonthlyExpenses,
      targetFund,
      amountNeeded,
      monthsToGoal,
      progress,
      currentMonthsCovered,
    };
  }, [monthlyExpenses, targetMonths, currentSavings, monthlySavings]);

  const expenseCategories = [
    { key: 'rent', label: 'Rent / EMI Housing', icon: '🏠' },
    { key: 'utilities', label: 'Utilities', icon: '💡' },
    { key: 'groceries', label: 'Groceries', icon: '🛒' },
    { key: 'transportation', label: 'Transportation', icon: '🚗' },
    { key: 'insurance', label: 'Insurance Premiums', icon: '🛡️' },
    { key: 'emi', label: 'Loan EMIs', icon: '💳' },
    { key: 'other', label: 'Other Essentials', icon: '📦' },
  ];

  return (
    <CalculatorLayout
      title="Emergency Fund Calculator"
      description="Calculate how much you need in your emergency fund and track your progress towards financial security."
      category="Planning"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Monthly Expenses */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Essential Expenses
            </h2>
            <div className="space-y-4">
              {expenseCategories.map(({ key, label, icon }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {icon} {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      {currencyInfo.symbol}
                    </span>
                    <input
                      type="number"
                      value={monthlyExpenses[key as keyof typeof monthlyExpenses]}
                      onChange={(e) =>
                        setMonthlyExpenses((prev) => ({
                          ...prev,
                          [key]: Number(e.target.value),
                        }))
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Situation</h2>
            <div className="space-y-6">
              {/* Target Months */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Fund Target: {targetMonths} months
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>3 months (minimum)</span>
                  <span>12 months (secure)</span>
                </div>
              </div>

              {/* Current Savings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Emergency Savings
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Monthly Savings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Savings Towards Goal
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Target Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-primary-100 text-sm font-medium">Emergency Fund Target</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(results.targetFund)}
            </p>
            <p className="text-primary-200 mt-2">{targetMonths} months of expenses</p>
          </div>

          {/* Progress */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h3>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {formatCurrency(currentSavings)} saved
                </span>
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  {results.progress.toFixed(0)}%
                </span>
              </div>
              <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                  style={{ width: `${results.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Still Needed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(results.amountNeeded)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Months to Goal</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {isFinite(results.monthsToGoal) ? `${results.monthsToGoal} months` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Current Coverage */}
          <div
            className={`rounded-2xl p-6 border ${
              results.currentMonthsCovered >= 3
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            }`}
          >
            <h3
              className={`font-semibold ${
                results.currentMonthsCovered >= 3 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              }`}
            >
              Current Coverage: {results.currentMonthsCovered.toFixed(1)} months
            </h3>
            <p
              className={`text-sm mt-2 ${
                results.currentMonthsCovered >= 3 ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'
              }`}
            >
              {results.currentMonthsCovered >= 6
                ? '✓ Excellent! You have a solid emergency fund.'
                : results.currentMonthsCovered >= 3
                ? '✓ Good start! Consider building to 6 months.'
                : '⚠ Build your emergency fund to at least 3 months.'}
            </p>
          </div>

          {/* Expense Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Summary</h3>
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Total Monthly Expenses</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatCurrency(results.totalMonthlyExpenses)}
              </span>
            </div>
            <div className="space-y-2 mt-4">
              {expenseCategories.map(({ key, label, icon }) => {
                const value = monthlyExpenses[key as keyof typeof monthlyExpenses];
                const percent =
                  results.totalMonthlyExpenses > 0
                    ? (value / results.totalMonthlyExpenses) * 100
                    : 0;
                return (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {icon} {label}
                    </span>
                    <span className="text-gray-900 dark:text-white">{percent.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <span className="mr-2">💡</span>
              Tips
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 text-sm mt-2 space-y-1">
              <li>• Keep emergency fund in a separate high-yield savings account</li>
              <li>• Aim for 6 months if you have variable income</li>
              <li>• Don't invest emergency fund in volatile assets</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
