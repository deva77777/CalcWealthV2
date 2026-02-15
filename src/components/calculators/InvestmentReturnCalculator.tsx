import { useState } from 'react';
import CalculatorLayout from './CalculatorLayout';

export default function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(25000);
  const [years, setYears] = useState(5);
  const [dividends, setDividends] = useState(500);
  const [mode, setMode] = useState<'return' | 'future'>('return');
  
  // For future value mode
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [monthlyContribution, setMonthlyContribution] = useState(200);

  // Calculate returns (return mode)
  const totalReturn = finalValue - initialInvestment + dividends;
  const totalReturnPercent = ((totalReturn) / initialInvestment) * 100;
  const annualizedReturn = (Math.pow((finalValue + dividends) / initialInvestment, 1 / years) - 1) * 100;

  // Calculate future value (future mode)
  const calculateFutureValue = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    
    // Future value of initial investment
    const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions
    const fvContributions = monthlyRate > 0 
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : monthlyContribution * months;
    
    return fvInitial + fvContributions;
  };

  const futureValue = calculateFutureValue();
  const totalContributions = initialInvestment + (monthlyContribution * years * 12);
  const totalEarnings = futureValue - totalContributions;

  // Generate projection data
  const generateProjection = () => {
    const data = [];
    const monthlyRate = expectedReturn / 100 / 12;
    
    for (let year = 0; year <= years; year++) {
      const months = year * 12;
      const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, months);
      const fvContributions = monthlyRate > 0 && months > 0
        ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : monthlyContribution * months;
      const contributions = initialInvestment + (monthlyContribution * months);
      
      data.push({
        year,
        value: fvInitial + fvContributions,
        contributions,
      });
    }
    return data;
  };

  const projectionData = generateProjection();
  const maxValue = Math.max(...projectionData.map(d => d.value));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const benchmarks = [
    { name: 'S&P 500 (Historical)', return: 10.5 },
    { name: 'Total Stock Market', return: 10.2 },
    { name: 'Bonds (Historical)', return: 5.3 },
    { name: 'High-Yield Savings', return: 4.5 },
    { name: 'Inflation (Historical)', return: 3.0 },
  ];

  return (
    <CalculatorLayout
      title="Investment Return Calculator"
      description="Calculate your investment returns or project future growth based on expected returns."
      category="Investing"
    >
      {/* Mode Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8 inline-flex">
        <button
          onClick={() => setMode('return')}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            mode === 'return'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Calculate Return
        </button>
        <button
          onClick={() => setMode('future')}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            mode === 'future'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Project Future Value
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {mode === 'return' ? 'Your Investment Details' : 'Investment Projection'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Initial Investment</span>
                <span className="text-primary-600 font-semibold">{formatCurrency(initialInvestment)}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$1,000</span>
                <span>$500,000</span>
              </div>
            </div>

            {mode === 'return' ? (
              <>
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Current/Final Value</span>
                    <span className="text-primary-600 font-semibold">{formatCurrency(finalValue)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="1000"
                    value={finalValue}
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$1,000,000</span>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Total Dividends Received</span>
                    <span className="text-primary-600 font-semibold">{formatCurrency(dividends)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="100"
                    value={dividends}
                    onChange={(e) => setDividends(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Expected Annual Return</span>
                    <span className="text-primary-600 font-semibold">{expectedReturn}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Monthly Contribution</span>
                    <span className="text-primary-600 font-semibold">{formatCurrency(monthlyContribution)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Time Period</span>
                <span className="text-primary-600 font-semibold">{years} years</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {mode === 'return' ? (
            <>
              {/* Return Results */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-lg font-medium text-primary-100 mb-4">Your Returns</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${totalReturn >= 0 ? '' : 'text-red-200'}`}>
                      {totalReturn >= 0 ? '+' : ''}{totalReturnPercent.toFixed(1)}%
                    </div>
                    <div className="text-primary-100 text-sm">Total Return</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${annualizedReturn >= 0 ? '' : 'text-red-200'}`}>
                      {annualizedReturn >= 0 ? '+' : ''}{annualizedReturn.toFixed(2)}%
                    </div>
                    <div className="text-primary-100 text-sm">Annualized Return</div>
                  </div>
                </div>

                <hr className="border-white/20 my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Initial Investment</span>
                    <span className="font-semibold">{formatCurrency(initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Capital Gains</span>
                    <span className={`font-semibold ${finalValue - initialInvestment >= 0 ? '' : 'text-red-200'}`}>
                      {finalValue - initialInvestment >= 0 ? '+' : ''}{formatCurrency(finalValue - initialInvestment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Dividends</span>
                    <span className="font-semibold">+{formatCurrency(dividends)}</span>
                  </div>
                  <hr className="border-white/20" />
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total Gain/Loss</span>
                    <span className={`font-bold ${totalReturn >= 0 ? '' : 'text-red-200'}`}>
                      {totalReturn >= 0 ? '+' : ''}{formatCurrency(totalReturn)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benchmark Comparison */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benchmark Comparison</h3>
                <div className="space-y-3">
                  {benchmarks.map((benchmark) => (
                    <div key={benchmark.name} className="flex items-center justify-between">
                      <span className="text-gray-600">{benchmark.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{benchmark.return}%</span>
                        {annualizedReturn > benchmark.return ? (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            +{(annualizedReturn - benchmark.return).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                            {(annualizedReturn - benchmark.return).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Future Value Results */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-lg font-medium text-primary-100 mb-4">Projected Value</h3>
                
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">
                    {formatCurrency(futureValue)}
                  </div>
                  <div className="text-primary-100">After {years} years at {expectedReturn}% return</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{formatCurrency(totalContributions)}</div>
                    <div className="text-primary-100 text-sm">Total Contributions</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
                    <div className="text-primary-100 text-sm">Investment Earnings</div>
                  </div>
                </div>
              </div>

              {/* Growth Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Projection</h3>
                <div className="h-48 flex items-end gap-1">
                  {projectionData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col justify-end h-40">
                        <div 
                          className="w-full bg-primary-200 rounded-t"
                          style={{ height: `${(data.contributions / maxValue) * 100}%` }}
                        />
                        <div 
                          className="w-full bg-primary-500 rounded-t -mt-1"
                          style={{ height: `${Math.max(0, ((data.value - data.contributions) / maxValue) * 100)}%` }}
                        />
                      </div>
                      {(idx === 0 || idx === projectionData.length - 1 || years <= 10 || idx % Math.ceil(years / 5) === 0) && (
                        <span className="text-xs text-gray-500">{data.year}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-200 rounded" />
                    <span className="text-sm text-gray-600">Contributions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-500 rounded" />
                    <span className="text-sm text-gray-600">Earnings</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <span>📊</span> Understanding Investment Returns
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-1">Total Return vs Annualized Return</h4>
            <p>Total return shows your overall gain/loss, while annualized return normalizes it per year for comparison.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">The Power of Compounding</h4>
            <p>Reinvesting earnings leads to exponential growth over time. Start early to maximize this effect.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Past Performance</h4>
            <p>Historical returns don't guarantee future results. Diversify your investments to manage risk.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Real vs Nominal Returns</h4>
            <p>Remember to account for inflation. A 7% return with 3% inflation means ~4% real growth.</p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
