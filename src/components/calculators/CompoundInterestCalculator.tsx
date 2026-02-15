import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function CompoundInterestCalculator() {
  const { formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(20);

  const results = useMemo(() => {
    const rate = annualRate / 100;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of initial principal
    const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const futureValueContributions =
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + monthlyContribution * months;
    const totalInterest = totalValue - totalContributions;

    // Calculate yearly breakdown for chart
    const yearlyData = [];
    for (let y = 0; y <= years; y++) {
      const m = y * 12;
      const fvPrincipal = principal * Math.pow(1 + monthlyRate, m);
      const fvContributions =
        m === 0 ? 0 : monthlyContribution * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
      const totalAtYear = fvPrincipal + fvContributions;
      const contributionsAtYear = principal + monthlyContribution * m;
      yearlyData.push({
        year: y,
        total: totalAtYear,
        contributions: contributionsAtYear,
        interest: totalAtYear - contributionsAtYear,
      });
    }

    return {
      totalValue,
      totalContributions,
      totalInterest,
      yearlyData,
    };
  }, [principal, monthlyContribution, annualRate, years]);

  const maxTotal = results.yearlyData[results.yearlyData.length - 1]?.total || 1;

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="See how your money grows over time with the power of compound interest. Visualize your wealth building journey."
      category="Investing"
    >
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Annual Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                S&P 500 historical average: ~10% annually
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
                max="40"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Total Value Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-green-100 text-sm font-medium">Future Value</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(results.totalValue)}
            </p>
            <p className="text-green-200 mt-2">in {years} years</p>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investment Breakdown</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Contributions</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(results.totalContributions)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Interest Earned</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(results.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 dark:text-gray-400">Interest % of Total</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {((results.totalInterest / results.totalValue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div className="mt-6">
              <div className="flex rounded-full overflow-hidden h-4">
                <div
                  className="bg-primary-500"
                  style={{
                    width: `${(results.totalContributions / results.totalValue) * 100}%`,
                  }}
                />
                <div
                  className="bg-green-500"
                  style={{ width: `${(results.totalInterest / results.totalValue) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
                  Contributions
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                  Interest
                </span>
              </div>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Over Time</h3>
            <div className="space-y-2">
              {results.yearlyData
                .filter((_, i) => i % Math.ceil(years / 8) === 0 || i === years)
                .map((data) => (
                  <div key={data.year} className="flex items-center gap-3">
                    <span className="w-12 text-sm text-gray-500 dark:text-gray-400">Y{data.year}</span>
                    <div className="flex-1 h-6 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-primary-500 transition-all duration-500"
                          style={{ width: `${(data.contributions / maxTotal) * 100}%` }}
                        />
                        <div
                          className="bg-green-500 transition-all duration-500"
                          style={{ width: `${(data.interest / maxTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-24 text-sm font-medium text-right text-gray-900 dark:text-white">
                      {formatCurrency(data.total)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
