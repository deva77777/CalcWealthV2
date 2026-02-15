import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function NetWorthCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [assets, setAssets] = useState({
    bankAccounts: 500000,
    investments: 1000000,
    retirement: 800000,
    realEstate: 5000000,
    vehicles: 500000,
    otherAssets: 200000,
  });

  const [liabilities, setLiabilities] = useState({
    homeLoan: 3000000,
    carLoan: 200000,
    personalLoan: 100000,
    creditCards: 50000,
    otherDebts: 0,
  });

  const results = useMemo(() => {
    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    const liquidAssets = assets.bankAccounts + assets.investments;
    const liquidityRatio = totalLiabilities > 0 ? (liquidAssets / totalLiabilities) * 100 : 100;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      liquidAssets,
      liquidityRatio,
    };
  }, [assets, liabilities]);

  const assetCategories = [
    { key: 'bankAccounts', label: 'Bank Accounts', icon: '🏦' },
    { key: 'investments', label: 'Investments (Stocks, MF)', icon: '📈' },
    { key: 'retirement', label: 'Retirement (PF, NPS)', icon: '👴' },
    { key: 'realEstate', label: 'Real Estate', icon: '🏠' },
    { key: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { key: 'otherAssets', label: 'Other Assets', icon: '💎' },
  ];

  const liabilityCategories = [
    { key: 'homeLoan', label: 'Home Loan', icon: '🏠' },
    { key: 'carLoan', label: 'Car Loan', icon: '🚗' },
    { key: 'personalLoan', label: 'Personal Loan', icon: '💳' },
    { key: 'creditCards', label: 'Credit Card Debt', icon: '💳' },
    { key: 'otherDebts', label: 'Other Debts', icon: '📋' },
  ];

  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      description="Calculate your total net worth by summing up all your assets and subtracting liabilities."
      category="Planning"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Assets */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 text-green-600 dark:text-green-400">+</span>
              Assets
            </h2>
            <div className="space-y-4">
              {assetCategories.map(({ key, label, icon }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {icon} {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">{currencyInfo.symbol}</span>
                    <input
                      type="number"
                      value={assets[key as keyof typeof assets]}
                      onChange={(e) =>
                        setAssets((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 text-red-600 dark:text-red-400">−</span>
              Liabilities
            </h2>
            <div className="space-y-4">
              {liabilityCategories.map(({ key, label, icon }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {icon} {label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">{currencyInfo.symbol}</span>
                    <input
                      type="number"
                      value={liabilities[key as keyof typeof liabilities]}
                      onChange={(e) =>
                        setLiabilities((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Net Worth Card */}
          <div
            className={`rounded-2xl p-6 md:p-8 text-white ${
              results.netWorth >= 0
                ? 'bg-gradient-to-br from-green-600 to-green-700'
                : 'bg-gradient-to-br from-red-600 to-red-700'
            }`}
          >
            <p className="text-white/80 text-sm font-medium">Your Net Worth</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(Math.abs(results.netWorth))}
            </p>
            <p className="text-white/80 mt-2">
              {results.netWorth >= 0 ? 'Positive Net Worth ✓' : 'Negative Net Worth - Focus on paying down debt'}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Assets</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">
                {formatCurrency(results.totalAssets)}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">
                {formatCurrency(results.totalLiabilities)}
              </p>
            </div>
          </div>

          {/* Financial Ratios */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Health Ratios</h3>
            <div className="space-y-4">
              {/* Debt to Asset Ratio */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Debt-to-Asset Ratio</span>
                  <span
                    className={`font-medium ${
                      results.debtToAssetRatio < 30
                        ? 'text-green-600 dark:text-green-400'
                        : results.debtToAssetRatio < 50
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {results.debtToAssetRatio.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      results.debtToAssetRatio < 30
                        ? 'bg-green-500'
                        : results.debtToAssetRatio < 50
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.debtToAssetRatio, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.debtToAssetRatio < 30
                    ? 'Excellent - Low debt burden'
                    : results.debtToAssetRatio < 50
                    ? 'Good - Manageable debt'
                    : 'High - Consider debt reduction'}
                </p>
              </div>

              {/* Liquidity Ratio */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Liquid Assets</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(results.liquidAssets)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cash + Investments that can be quickly accessed
                </p>
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h3>
            <div className="space-y-2">
              {assetCategories.map(({ key, label, icon }) => {
                const value = assets[key as keyof typeof assets];
                const percent = results.totalAssets > 0 ? (value / results.totalAssets) * 100 : 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-8">{icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{label}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{percent.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
