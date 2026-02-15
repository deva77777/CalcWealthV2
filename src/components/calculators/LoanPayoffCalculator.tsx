import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function LoanPayoffCalculator() {
  const { formatCurrency } = useCurrency();
  const [loanBalance, setLoanBalance] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [extraPayment, setExtraPayment] = useState(100);

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;

    // Calculate without extra payment
    const calculatePayoff = (payment: number) => {
      if (payment <= loanBalance * monthlyRate) {
        return { months: Infinity, totalPaid: Infinity, totalInterest: Infinity };
      }

      let balance = loanBalance;
      let months = 0;
      let totalPaid = 0;

      while (balance > 0 && months < 600) {
        const interest = balance * monthlyRate;
        const principal = Math.min(payment - interest, balance);
        balance -= principal;
        totalPaid += payment;
        months++;
      }

      return {
        months,
        totalPaid,
        totalInterest: totalPaid - loanBalance,
      };
    };

    const withoutExtra = calculatePayoff(monthlyPayment);
    const withExtra = calculatePayoff(monthlyPayment + extraPayment);

    return {
      withoutExtra,
      withExtra,
      monthsSaved: withoutExtra.months - withExtra.months,
      interestSaved: withoutExtra.totalInterest - withExtra.totalInterest,
    };
  }, [loanBalance, interestRate, monthlyPayment, extraPayment]);

  const formatMonths = (months: number) => {
    if (!isFinite(months)) return 'N/A';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 ? `${years}y ${remainingMonths}m` : `${months}m`;
  };

  return (
    <CalculatorLayout
      title="Loan Payoff Calculator"
      description="See how extra payments can help you pay off your loan faster and save thousands in interest."
      category="Loans"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Loan Details</h2>

          <div className="space-y-6">
            {/* Loan Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Loan Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={loanBalance}
                onChange={(e) => setLoanBalance(Number(e.target.value))}
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Monthly Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Monthly Payment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Extra Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Extra Monthly Payment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Savings Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white">
            <p className="text-green-100 text-sm font-medium">Interest Savings</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {isFinite(results.interestSaved) ? formatCurrency(results.interestSaved) : 'N/A'}
            </p>
            <p className="text-green-200 mt-2">
              {isFinite(results.monthsSaved)
                ? `Pay off ${results.monthsSaved} months earlier`
                : 'Increase payment to see savings'}
            </p>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Without Extra */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Current Plan</p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatMonths(results.withoutExtra.months)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Payoff Time</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isFinite(results.withoutExtra.totalInterest)
                      ? formatCurrency(results.withoutExtra.totalInterest)
                      : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Interest</p>
                </div>
              </div>
            </div>

            {/* With Extra */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-6">
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">With Extra Payment</p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {formatMonths(results.withExtra.months)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Payoff Time</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                    {isFinite(results.withExtra.totalInterest)
                      ? formatCurrency(results.withExtra.totalInterest)
                      : 'N/A'}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Total Interest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <span className="mr-2">💡</span>
              Pro Tips
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 text-sm mt-2 space-y-1">
              <li>• Even small extra payments make a big difference</li>
              <li>• Pay biweekly instead of monthly for extra savings</li>
              <li>• Apply windfalls (bonuses, tax refunds) to principal</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
