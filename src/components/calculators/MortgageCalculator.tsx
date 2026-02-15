import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function MortgageCalculator() {
  const { formatCurrency } = useCurrency();
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / numPayments,
        totalPayment: principal,
        totalInterest: 0,
        principal,
      };
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment, total interest, and see the full breakdown of your home loan costs."
      category="Loans"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Loan Details</h2>
          
          <div className="space-y-6">
            {/* Home Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Down Payment ({downPaymentPercent}%)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <input
                type="range"
                min="0"
                max={homePrice * 0.5}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Term
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`py-3 rounded-xl font-medium transition-colors ${
                      loanTerm === term
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Monthly Payment Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-primary-100 text-sm font-medium">Monthly Payment</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(results.monthlyPayment)}
            </p>
            <p className="text-primary-200 mt-2">
              Principal & Interest only
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(results.principal)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
                <span className="font-bold text-gray-900 dark:text-white text-lg">{formatCurrency(results.totalPayment)}</span>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div className="mt-6">
              <div className="flex rounded-full overflow-hidden h-4">
                <div
                  className="bg-primary-500"
                  style={{ width: `${(results.principal / results.totalPayment) * 100}%` }}
                />
                <div
                  className="bg-red-400"
                  style={{ width: `${(results.totalInterest / results.totalPayment) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
                  Principal
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-2" />
                  Interest
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-800 dark:text-amber-400 flex items-center">
              <span className="mr-2">💡</span>
              Pro Tip
            </h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-2">
              A 20% down payment helps you avoid Private Mortgage Insurance (PMI) and get better interest rates.
              {Number(downPaymentPercent) < 20 && (
                <span className="block mt-1 font-medium">
                  You need {formatCurrency(homePrice * 0.2 - downPayment)} more for 20%.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
