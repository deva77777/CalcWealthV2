import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  category: string;
  question: string;
  options: { label: string; value: number }[];
}

const questions: Question[] = [
  // Emergency Fund
  {
    id: 'emergency_fund',
    category: 'Emergency Fund',
    question: 'How many months of expenses do you have saved in an emergency fund?',
    options: [
      { label: 'No emergency fund', value: 0 },
      { label: 'Less than 1 month', value: 25 },
      { label: '1-3 months', value: 50 },
      { label: '3-6 months', value: 75 },
      { label: '6+ months', value: 100 },
    ],
  },
  // Debt Management
  {
    id: 'debt_income_ratio',
    category: 'Debt Management',
    question: 'What percentage of your monthly income goes to debt payments (excluding mortgage)?',
    options: [
      { label: 'More than 50%', value: 0 },
      { label: '36-50%', value: 25 },
      { label: '20-35%', value: 50 },
      { label: '10-19%', value: 75 },
      { label: 'Less than 10% or no debt', value: 100 },
    ],
  },
  {
    id: 'credit_card_debt',
    category: 'Debt Management',
    question: 'How do you handle credit card balances?',
    options: [
      { label: 'Only pay minimum, balances growing', value: 0 },
      { label: 'Pay minimum, balances stable', value: 25 },
      { label: 'Pay more than minimum', value: 50 },
      { label: 'Pay in full most months', value: 75 },
      { label: 'Always pay in full', value: 100 },
    ],
  },
  // Savings Rate
  {
    id: 'savings_rate',
    category: 'Savings Rate',
    question: 'What percentage of your income do you save each month?',
    options: [
      { label: 'I don\'t save regularly', value: 0 },
      { label: 'Less than 5%', value: 25 },
      { label: '5-10%', value: 50 },
      { label: '10-20%', value: 75 },
      { label: 'More than 20%', value: 100 },
    ],
  },
  // Retirement Planning
  {
    id: 'retirement_savings',
    category: 'Retirement',
    question: 'Are you contributing to retirement accounts (401k, IRA, etc.)?',
    options: [
      { label: 'No retirement savings', value: 0 },
      { label: 'Occasionally contribute', value: 25 },
      { label: 'Contribute regularly but below match', value: 50 },
      { label: 'Get full employer match', value: 75 },
      { label: 'Max out contributions', value: 100 },
    ],
  },
  {
    id: 'retirement_track',
    category: 'Retirement',
    question: 'Based on your current savings, are you on track for retirement?',
    options: [
      { label: 'Haven\'t thought about it', value: 0 },
      { label: 'Significantly behind', value: 25 },
      { label: 'Somewhat behind', value: 50 },
      { label: 'On track', value: 75 },
      { label: 'Ahead of schedule', value: 100 },
    ],
  },
  // Insurance Coverage
  {
    id: 'insurance',
    category: 'Insurance',
    question: 'Do you have adequate insurance coverage (health, life, disability)?',
    options: [
      { label: 'No insurance', value: 0 },
      { label: 'Only basic health insurance', value: 25 },
      { label: 'Health + one other type', value: 50 },
      { label: 'Most types covered', value: 75 },
      { label: 'Fully covered with appropriate amounts', value: 100 },
    ],
  },
  // Financial Planning
  {
    id: 'budget',
    category: 'Financial Planning',
    question: 'Do you follow a budget or spending plan?',
    options: [
      { label: 'No budget at all', value: 0 },
      { label: 'Rough idea of spending', value: 25 },
      { label: 'Track spending occasionally', value: 50 },
      { label: 'Follow a budget most months', value: 75 },
      { label: 'Strict budget with regular reviews', value: 100 },
    ],
  },
  {
    id: 'financial_goals',
    category: 'Financial Planning',
    question: 'Do you have clear financial goals with timelines?',
    options: [
      { label: 'No specific goals', value: 0 },
      { label: 'Vague goals, no timeline', value: 25 },
      { label: 'Some goals with rough timelines', value: 50 },
      { label: 'Clear goals with plans', value: 75 },
      { label: 'Written goals with action plans', value: 100 },
    ],
  },
  // Net Worth
  {
    id: 'net_worth_trend',
    category: 'Net Worth',
    question: 'How has your net worth changed over the past year?',
    options: [
      { label: 'Decreased significantly', value: 0 },
      { label: 'Decreased slightly', value: 25 },
      { label: 'Stayed about the same', value: 50 },
      { label: 'Increased slightly', value: 75 },
      { label: 'Increased significantly', value: 100 },
    ],
  },
];

interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface Recommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

const getRecommendations = (categoryScores: CategoryScore[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  categoryScores.forEach(({ category, percentage }) => {
    if (category === 'Emergency Fund' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'high' : 'medium',
        title: 'Build Your Emergency Fund',
        description: 'Aim to save 3-6 months of expenses. Start by setting aside a small amount each paycheck into a high-yield savings account.',
      });
    }
    if (category === 'Debt Management' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'high' : 'medium',
        title: 'Create a Debt Payoff Strategy',
        description: 'Consider the debt avalanche (highest interest first) or snowball method (smallest balance first). Always pay more than the minimum when possible.',
      });
    }
    if (category === 'Savings Rate' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'high' : 'medium',
        title: 'Increase Your Savings Rate',
        description: 'Try to save at least 15-20% of your income. Automate transfers to savings accounts right after payday.',
      });
    }
    if (category === 'Retirement' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'high' : 'medium',
        title: 'Boost Retirement Contributions',
        description: 'At minimum, contribute enough to get your full employer match. Consider increasing contributions by 1% each year.',
      });
    }
    if (category === 'Insurance' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'high' : 'medium',
        title: 'Review Insurance Coverage',
        description: 'Ensure you have adequate health, life (if you have dependents), and disability insurance. Consider umbrella policies for additional protection.',
      });
    }
    if (category === 'Financial Planning' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'medium' : 'low',
        title: 'Create a Financial Plan',
        description: 'Set SMART financial goals (Specific, Measurable, Achievable, Relevant, Time-bound). Use budgeting apps to track spending.',
      });
    }
    if (category === 'Net Worth' && percentage < 75) {
      recommendations.push({
        category,
        priority: percentage < 50 ? 'medium' : 'low',
        title: 'Focus on Growing Net Worth',
        description: 'Track your net worth monthly. Focus on paying down debt and increasing investments to build wealth over time.',
      });
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const getScoreLabel = (score: number): { label: string; color: string; description: string } => {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-600', description: 'You\'re in great financial shape! Keep up the excellent work.' };
  if (score >= 75) return { label: 'Good', color: 'text-green-500', description: 'You\'re on the right track with solid financial habits.' };
  if (score >= 60) return { label: 'Fair', color: 'text-yellow-500', description: 'You have a decent foundation but there\'s room for improvement.' };
  if (score >= 40) return { label: 'Needs Work', color: 'text-orange-500', description: 'Focus on building better financial habits in key areas.' };
  return { label: 'Critical', color: 'text-red-500', description: 'Your finances need immediate attention. Start with the basics.' };
};

export default function FinancialHealthPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateResults = () => {
    const categories = [...new Set(questions.map(q => q.category))];
    const categoryScores: CategoryScore[] = categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const totalScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxScore = categoryQuestions.length * 100;
      return {
        category,
        score: totalScore,
        maxScore,
        percentage: Math.round((totalScore / maxScore) * 100),
      };
    });

    const overallScore = Math.round(
      categoryScores.reduce((sum, c) => sum + c.percentage, 0) / categoryScores.length
    );

    return { categoryScores, overallScore };
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    const { categoryScores, overallScore } = calculateResults();
    const scoreInfo = getScoreLabel(overallScore);
    const recommendations = getRecommendations(categoryScores);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Score Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 p-8 mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Financial Health Score</h1>
            
            {/* Score Circle */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-gray-200 dark:stroke-slate-700"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={overallScore >= 75 ? '#22c55e' : overallScore >= 50 ? '#eab308' : '#ef4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(overallScore / 100) * 553} 553`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">{overallScore}</span>
                <span className={`text-lg font-semibold ${scoreInfo.color}`}>{scoreInfo.label}</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-slate-300 max-w-md mx-auto">{scoreInfo.description}</p>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h2>
            <div className="space-y-4">
              {categoryScores.map(({ category, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{category}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personalized Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      rec.priority === 'high'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        rec.priority === 'high'
                          ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                          : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Retake Assessment
            </button>
            <Link
              to="/calculators"
              className="px-6 py-3 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-500 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors text-center"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Health Assessment</h1>
          <p className="text-gray-600 dark:text-slate-300">Answer 10 questions to get your personalized financial health score</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 p-8 mb-6">
          <div className="mb-2">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{currentQuestion.category}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span className={`font-medium ${
                  answers[currentQuestion.id] === option.value 
                    ? 'text-primary-700 dark:text-primary-300' 
                    : 'text-gray-700 dark:text-slate-200'
                }`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion.id] === undefined}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              answers[currentQuestion.id] === undefined
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
