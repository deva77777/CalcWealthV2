import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function CreditCardCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [balance, setBalance] = useState(50000);
  const [interestRate, setInterestRate] = useState(36);
  const [minimumPayment, setMinimumPayment] = useState(5);
  const [fixedPayment, setFixedPayment] = useState(5000);

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const minPaymentAmount = Math.max((balance * minimumPayment) / 100, 500);

    // Calculate payoff with minimum payment
    const calculatePayoff = (payment: number) => {
      let bal = balance;
      let months = 0;
      let totalPaid = 0;
      let totalInterest = 0;

      while (bal > 0 && months < 600) {
        const interest = bal * monthlyRate;
        const actualPayment = Math.min(payment, bal + interest);
        const principal = actualPayment - interest;
        bal -= principal;
        totalPaid += actualPayment;
        totalInterest += interest;
        months++;
        if (payment <= interest) break; // Can't pay off
      }

      return {
        months: bal > 0 ? Infinity : months,
        totalPaid: bal > 0 ? Infinity : totalPaid,
        totalInterest: bal > 0 ? Infinity : totalInterest,
      };
    };

    const minPaymentResults = calculatePayoff(minPaymentAmount);
    const fixedPaymentResults = calculatePayoff(fixedPayment);

    return {
      minPaymentAmount,
      minPaymentResults,
      fixedPaymentResults,
      monthsSaved:
        isFinite(minPaymentResults.months) && isFinite(fixedPaymentResults.months)
          ? minPaymentResults.months - fixedPaymentResults.months
          : 0,
      interestSaved:
        isFinite(minPaymentResults.totalInterest) && isFinite(fixedPaymentResults.totalInterest)
          ? minPaymentResults.totalInterest - fixedPaymentResults.totalInterest
          : 0,
    };
  }, [balance, interestRate, minimumPayment, fixedPayment]);

  const formatMonths = (months: number) => {
    if (!isFinite(months)) return 'Never';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 ? `${years}y ${remainingMonths}m` : `${months}m`;
  };

  return (
    <CalculatorLayout
      title="Credit Card Interest Calculator"
      description="Calculate how long it will take to pay off your credit card and how much interest you'll pay."
      category="Loans"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Credit Card Details</h2>

          <div className="space-y-6">
            {/* Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Interest Rate: {interestRate}%
              </label>
              <input
                type="range"
                min="12"
                max="48"
                step="1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Most credit cards charge 36-42% annually in India
              </p>
            </div>

            {/* Minimum Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Payment: {minimumPayment}% of balance
              </label>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={minimumPayment}
                onChange={(e) => setMinimumPayment(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum payment: {formatCurrency(results.minPaymentAmount)}
              </p>
            </div>

            {/* Fixed Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Planned Monthly Payment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={fixedPayment}
                  onChange={(e) => setFixedPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min={Math.ceil(results.minPaymentAmount)}
                max={Math.max(balance / 6, fixedPayment)}
                step="500"
                value={fixedPayment}
                onChange={(e) => setFixedPayment(Number(e.target.value))}
                className="w-full mt-2 accent-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Savings Card */}
          {results.interestSaved > 0 && (
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white">
              <p className="text-green-100 text-sm font-medium">You Can Save</p>
              <p className="text-4xl md:text-5xl font-bold mt-2">
                {formatCurrency(results.interestSaved)}
              </p>
              <p className="text-green-200 mt-2">
                Pay off {results.monthsSaved} months earlier
              </p>
            </div>
          )}

          {/* Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Minimum Payment */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-5">
              <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-3">
                ❌ Minimum Payment Only
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {formatMonths(results.minPaymentResults.months)}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">To Pay Off</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-red-700 dark:text-red-300">
                    {isFinite(results.minPaymentResults.totalInterest)
                      ? formatCurrency(results.minPaymentResults.totalInterest)
                      : '∞'}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">Total Interest</p>
                </div>
              </div>
            </div>

            {/* Fixed Payment */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-5">
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">
                ✓ Your Plan ({formatCurrency(fixedPayment)}/mo)
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {formatMonths(results.fixedPaymentResults.months)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">To Pay Off</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                    {isFinite(results.fixedPaymentResults.totalInterest)
                      ? formatCurrency(results.fixedPaymentResults.totalInterest)
                      : '∞'}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Total Interest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <h3 className="font-semibold text-red-800 dark:text-red-300 flex items-center">
              <span className="mr-2">⚠️</span>
              Credit Card Debt Warning
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              Credit card interest rates are extremely high (36-42% APR). Always pay more than
              the minimum. Consider a personal loan to consolidate high-interest credit card debt.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <span className="mr-2">💡</span>
              Smart Strategies
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 text-sm mt-2 space-y-1">
              <li>• Pay full balance monthly to avoid interest</li>
              <li>• If carrying a balance, pay as much as possible</li>
              <li>• Consider balance transfer to 0% APR card</li>
              <li>• Use personal loan to consolidate at lower rate</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
