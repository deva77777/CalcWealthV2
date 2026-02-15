export interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  slug: string;
}

export const calculators: Calculator[] = [
  {
    id: "1",
    title: "Home Loan EMI Calculator",
    description: "Calculate your monthly home loan EMI, total interest payable, and complete amortization schedule.",
    icon: "🏠",
    category: "Loans",
    slug: "home-loan-emi-calculator"
  },
  {
    id: "2",
    title: "Car Loan EMI Calculator",
    description: "Plan your car purchase with accurate EMI calculations and total cost breakdown.",
    icon: "🚗",
    category: "Loans",
    slug: "car-loan-emi-calculator"
  },
  {
    id: "3",
    title: "Personal Loan Calculator",
    description: "Compare personal loan EMIs across different tenures and interest rates.",
    icon: "💳",
    category: "Loans",
    slug: "personal-loan-calculator"
  },
  {
    id: "4",
    title: "SIP Calculator",
    description: "See how your monthly SIP investments grow with the power of compounding over time.",
    icon: "📈",
    category: "Investing",
    slug: "sip-calculator"
  },
  {
    id: "5",
    title: "Credit Card Interest Calculator",
    description: "Understand your credit card interest charges and plan your debt payoff strategy.",
    icon: "💳",
    category: "Budgeting",
    slug: "credit-card-calculator"
  },
  {
    id: "6",
    title: "Loan Prepayment Calculator",
    description: "Calculate savings from prepaying your loan and reduce your interest burden.",
    icon: "💰",
    category: "Loans",
    slug: "loan-prepayment-calculator"
  },
  {
    id: "7",
    title: "Retirement Planning Calculator",
    description: "Plan your retirement corpus and monthly savings needed to retire comfortably.",
    icon: "🌅",
    category: "Planning",
    slug: "retirement-calculator"
  },
  {
    id: "8",
    title: "Net Worth Calculator",
    description: "Track your complete financial picture - assets, liabilities, and net worth growth.",
    icon: "💼",
    category: "Planning",
    slug: "net-worth-calculator"
  }
];
