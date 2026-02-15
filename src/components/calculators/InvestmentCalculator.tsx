import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function InvestmentCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [mode, setMode] = useState<'return' | 'future'>('future');
  
  // Future value mode
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);

  // Return calculation mode
  const [investedAmount, setInvestedAmount] = useState(500000);
  const [currentValue, setCurrentValue] = useState(750000);
  const [investmentYears, setInvestmentYears] = useState(3);

  const futureResults = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;

    const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
    const fvMonthly = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalValue = fvInitial + fvMonthly;
    const totalInvested = initialInvestment + monthlyInvestment * months;
    const totalGains = totalValue - totalInvested;

    const yearlyData = [];
    for (let y = 0; y <= years; y++) {
      const m = y * 12;
      const fvI = initialInvestment * Math.pow(1 + monthlyRate, m);
      const fvM = m === 0 ? 0 : monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
      const invested = initialInvestment + monthlyInvestment * m;
      yearlyData.push({
        year: y,
        total: fvI + fvM,
        invested,
        gains: fvI + fvM - invested,
      });
    }

    return {
      totalValue,
      totalInvested,
      totalGains,
      yearlyData,
    };
  }, [initialInvestment, monthlyInvestment, expectedReturn, years]);

  const returnResults = useMemo(() => {
    const absoluteReturn = currentValue - investedAmount;
    const percentageReturn = ((currentValue - investedAmount) / investedAmount) * 100;
    const cagr = (Math.pow(currentValue / investedAmount, 1 / investmentYears) - 1) * 100;
    const xirr = cagr; // Simplified - actual XIRR requires cash flow dates

    return {
      absoluteReturn,
      percentageReturn,
      cagr,
      xirr,
    };
  }, [investedAmount, currentValue, investmentYears]);

  return (
    <CalculatorLayout
      title="Investment Return Calculator"
      description="Calculate your investment returns, CAGR, and project future values of your investments."
      category="Investing"
    >
      {/* Mode Toggle */}
      <div className="mb-8">
        <div className="inline-flex rounded-xl bg-gray-100 dark:bg-slate-800 p-1">
          <button
            onClick={() => setMode('future')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mode === 'future'
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Project Future Value
          </button>
          <button
            onClick={() => setMode('return')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mode === 'return'
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Calculate Returns
          </button>
        </div>
      </div>

      {mode === 'future' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Investment Details</h2>

            <div className="space-y-6">
              {/* Initial Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Monthly Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly SIP Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full mt-2 accent-primary-600"
                />
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return: {expectedReturn}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Equity: 12-15% | Balanced: 10-12% | Debt: 7-9%
                </p>
              </div>

              {/* Years */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period: {years} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Total Value */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white">
              <p className="text-green-100 text-sm font-medium">Projected Value</p>
              <p className="text-4xl md:text-5xl font-bold mt-2">
                {formatCurrency(futureResults.totalValue)}
              </p>
              <p className="text-green-200 mt-2">in {years} years</p>
            </div>

            {/* Breakdown */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Invested</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(futureResults.totalInvested)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Gains</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(futureResults.totalGains)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Wealth Multiplier</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {(futureResults.totalValue / futureResults.totalInvested).toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Year-wise Growth</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {futureResults.yearlyData
                  .filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === years)
                  .map((data) => (
                    <div
                      key={data.year}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">Year {data.year}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(data.total)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Investment</h2>

            <div className="space-y-6">
              {/* Amount Invested */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Amount Invested
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={investedAmount}
                    onChange={(e) => setInvestedAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Current Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {currencyInfo.symbol}
                  </span>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period: {investmentYears} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* CAGR */}
            <div
              className={`rounded-2xl p-6 md:p-8 text-white ${
                returnResults.cagr >= 0
                  ? 'bg-gradient-to-br from-green-600 to-green-700'
                  : 'bg-gradient-to-br from-red-600 to-red-700'
              }`}
            >
              <p className="text-white/80 text-sm font-medium">CAGR (Compounded Annual Growth)</p>
              <p className="text-4xl md:text-5xl font-bold mt-2">{returnResults.cagr.toFixed(2)}%</p>
              <p className="text-white/80 mt-2">per year</p>
            </div>

            {/* Other Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Absolute Return</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    returnResults.absoluteReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {formatCurrency(returnResults.absoluteReturn)}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Percentage Return</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    returnResults.percentageReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {returnResults.percentageReturn.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Understanding CAGR</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
                CAGR shows the average annual growth rate of your investment, assuming profits
                are reinvested. It's the best way to compare investments of different durations.
              </p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
