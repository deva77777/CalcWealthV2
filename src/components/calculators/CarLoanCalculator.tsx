import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function CarLoanCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [carPrice, setCarPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTerm, setLoanTerm] = useState(5);

  const results = useMemo(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return {
        emi: principal / numPayments,
        totalPayment: principal,
        totalInterest: 0,
        principal,
      };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = emi * numPayments;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const schedule = [];
    let balance = principal;
    for (let month = 1; month <= Math.min(numPayments, 12); month++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      schedule.push({
        month,
        emi,
        principal: principalPaid,
        interest,
        balance: Math.max(0, balance),
      });
    }

    return {
      emi,
      totalPayment,
      totalInterest,
      principal,
      schedule,
    };
  }, [carPrice, downPayment, interestRate, loanTerm]);

  const downPaymentPercent = ((downPayment / carPrice) * 100).toFixed(0);

  return (
    <CalculatorLayout
      title="Car Loan EMI Calculator"
      description="Calculate your car loan EMI, total interest, and see the complete breakdown of your auto loan."
      category="Loans"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Loan Details</h2>

          <div className="space-y-6">
            {/* Car Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Car Price (On-Road)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Down Payment ({downPaymentPercent}%)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max={carPrice * 0.5}
                step="10000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interest Rate: {interestRate}%
              </label>
              <input
                type="range"
                min="7"
                max="18"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                New car: 7-10% | Used car: 12-18%
              </p>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Term
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 7].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`py-3 rounded-xl font-medium transition-colors ${
                      loanTerm === term
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {term}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* EMI Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-primary-100 text-sm font-medium">Monthly EMI</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(results.emi)}
            </p>
            <p className="text-primary-200 mt-2">for {loanTerm} years</p>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loan Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(results.principal)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(results.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Total Payment</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(results.totalPayment)}
                </span>
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
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
                  Principal ({((results.principal / results.totalPayment) * 100).toFixed(0)}%)
                </span>
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-2" />
                  Interest ({((results.totalInterest / results.totalPayment) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Affordability Check */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center">
              <span className="mr-2">💡</span>
              Affordability Rule
            </h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-2">
              Your car EMI should not exceed <strong>15%</strong> of your monthly income.
              For EMI of {formatCurrency(results.emi)}, you should earn at least{' '}
              <strong>{formatCurrency(results.emi / 0.15)}</strong>/month.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <span className="mr-2">🚗</span>
              Car Loan Tips
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 text-sm mt-2 space-y-1">
              <li>• Larger down payment = Lower EMI & interest</li>
              <li>• Shorter tenure = More EMI but less total interest</li>
              <li>• Compare rates from multiple banks</li>
              <li>• Check for zero processing fee offers</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
