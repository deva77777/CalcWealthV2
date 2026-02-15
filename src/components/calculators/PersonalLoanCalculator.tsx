import { useState, useMemo } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { useCurrency } from '@/context/CurrencyContext';

export default function PersonalLoanCalculator() {
  const { formatCurrency, currencyInfo } = useCurrency();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(3);
  const [monthlyIncome, setMonthlyIncome] = useState(75000);

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return {
        emi: loanAmount / numPayments,
        totalPayment: loanAmount,
        totalInterest: 0,
        emiToIncomeRatio: (loanAmount / numPayments / monthlyIncome) * 100,
      };
    }

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = emi * numPayments;
    const totalInterest = totalPayment - loanAmount;
    const emiToIncomeRatio = (emi / monthlyIncome) * 100;

    // Calculate eligibility based on 50% FOIR (Fixed Obligations to Income Ratio)
    const maxAllowedEmi = monthlyIncome * 0.5;
    const eligibleAmount =
      (maxAllowedEmi * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments));

    return {
      emi,
      totalPayment,
      totalInterest,
      emiToIncomeRatio,
      maxAllowedEmi,
      eligibleAmount,
      isAffordable: emi <= maxAllowedEmi,
    };
  }, [loanAmount, interestRate, loanTerm, monthlyIncome]);

  // Compare different tenures
  const tenureComparison = useMemo(() => {
    const tenures = [1, 2, 3, 4, 5];
    return tenures.map((years) => {
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = years * 12;
      const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalInterest = emi * numPayments - loanAmount;
      return { years, emi, totalInterest };
    });
  }, [loanAmount, interestRate]);

  return (
    <CalculatorLayout
      title="Personal Loan Calculator"
      description="Calculate your personal loan EMI, check eligibility, and compare different loan tenures."
      category="Loans"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Loan Details</h2>

          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                min="10"
                max="24"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Typical range: 10.5% - 24% depending on credit score
              </p>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Term
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((term) => (
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

            {/* Monthly Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Monthly Income (for eligibility)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currencyInfo.symbol}
                </span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
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
            <p className="text-primary-200 mt-2">for {loanTerm} years ({loanTerm * 12} months)</p>
          </div>

          {/* Affordability Check */}
          <div
            className={`rounded-2xl p-6 border ${
              results.isAffordable
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`font-semibold ${
                    results.isAffordable ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                  }`}
                >
                  {results.isAffordable ? '✓ Loan is Affordable' : '⚠ EMI Too High'}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    results.isAffordable ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  }`}
                >
                  EMI is {results.emiToIncomeRatio.toFixed(0)}% of your income
                  {!results.isAffordable && '. Should be under 50%.'}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm ${results.isAffordable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  Max eligible
                </p>
                <p
                  className={`font-bold ${
                    results.isAffordable ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {formatCurrency(results.eligibleAmount || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loan Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Principal Amount</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(results.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Total Repayment</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(results.totalPayment)}
                </span>
              </div>
            </div>
          </div>

          {/* Tenure Comparison */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tenure Comparison</h3>
            <div className="space-y-2">
              {tenureComparison.map((item) => (
                <div
                  key={item.years}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    item.years === loanTerm
                      ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-50 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`font-medium ${
                      item.years === loanTerm ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.years} Year{item.years > 1 ? 's' : ''}
                  </span>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        item.years === loanTerm ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {formatCurrency(item.emi)}/mo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Interest: {formatCurrency(item.totalInterest)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <span className="mr-2">💡</span>
              Personal Loan Tips
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 text-sm mt-2 space-y-1">
              <li>• Higher credit score (750+) = Lower interest rate</li>
              <li>• Shorter tenure = Higher EMI but less total interest</li>
              <li>• Keep FOIR (EMI to income) below 50%</li>
              <li>• Compare rates from multiple lenders</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
