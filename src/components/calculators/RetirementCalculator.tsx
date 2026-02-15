import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function RetirementCalculator() {
  const { formatCurrency } = useCurrency();
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const months = yearsToRetirement * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;

    // Future value calculation
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    const fvContributions =
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalCorpus = fvCurrentSavings + fvContributions;

    // 4% rule - safe withdrawal rate
    const monthlyIncome = (totalCorpus * 0.04) / 12;

    // Calculate milestones
    const milestones = [1000000, 5000000, 10000000, 50000000, 100000000];
    const milestoneYears: { amount: number; year: number }[] = [];

    let balance = currentSavings;
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
      milestones.forEach((milestone) => {
        if (balance >= milestone && !milestoneYears.find((m) => m.amount === milestone)) {
          milestoneYears.push({ amount: milestone, year: currentAge + year });
        }
      });
    }

    return {
      totalCorpus,
      monthlyIncome,
      yearsToRetirement,
      realReturn,
      milestoneYears,
      totalContributions: currentSavings + monthlyContribution * months,
      totalGrowth: totalCorpus - (currentSavings + monthlyContribution * months),
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate]);

  return (
    <CalculatorLayout
      title="Retirement Planning Calculator"
      description="Plan your retirement corpus and see how much you need to save monthly to achieve your retirement goals."
      category="Planning"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Details</h2>

          <div className="space-y-6">
            {/* Current Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Age: {currentAge} years
              </label>
              <input
                type="range"
                min="18"
                max="60"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>

            {/* Retirement Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Retirement Age: {retirementAge} years
              </label>
              <input
                type="range"
                min={currentAge + 5}
                max="70"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>

            {/* Current Savings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Retirement Savings
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
                min="6"
                max="18"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Equity funds: 12-15% | Balanced funds: 10-12% | Debt funds: 7-9%
              </p>
            </div>

            {/* Inflation Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Inflation: {inflationRate}%
              </label>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Corpus Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-primary-100 text-sm font-medium">Estimated Retirement Corpus</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(results.totalCorpus)}
            </p>
            <p className="text-primary-200 mt-2">at age {retirementAge}</p>
          </div>

          {/* Monthly Income */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              Estimated Monthly Income (4% Rule)
            </p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">
              {formatCurrency(results.monthlyIncome)}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Safe withdrawal for 25+ years
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Years to Retirement</span>
                <span className="font-semibold text-gray-900 dark:text-white">{results.yearsToRetirement} years</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Contributions</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(results.totalContributions)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Investment Growth</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(results.totalGrowth)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Real Return (After Inflation)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{results.realReturn.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          {results.milestoneYears.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎯 Wealth Milestones</h3>
              <div className="space-y-2">
                {results.milestoneYears.slice(0, 4).map((milestone) => (
                  <div
                    key={milestone.amount}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(milestone.amount)}
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      Age {milestone.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
