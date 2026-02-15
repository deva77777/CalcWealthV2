import { useParams, Navigate } from 'react-router-dom';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator';
import LoanPayoffCalculator from '../components/calculators/LoanPayoffCalculator';
import RetirementCalculator from '../components/calculators/RetirementCalculator';
import BudgetPlanner from '../components/calculators/BudgetPlanner';
import NetWorthCalculator from '../components/calculators/NetWorthCalculator';
import EmergencyFundCalculator from '../components/calculators/EmergencyFundCalculator';
import InvestmentReturnCalculator from '../components/calculators/InvestmentReturnCalculator';
import CreditCardCalculator from '../components/calculators/CreditCardCalculator';
import CarLoanCalculator from '../components/calculators/CarLoanCalculator';
import PersonalLoanCalculator from '../components/calculators/PersonalLoanCalculator';

const calculatorComponents: Record<string, React.ComponentType> = {
  // New proper slugs matching calculator titles
  'home-loan-emi-calculator': MortgageCalculator,
  'car-loan-emi-calculator': CarLoanCalculator,
  'personal-loan-calculator': PersonalLoanCalculator,
  'sip-calculator': InvestmentReturnCalculator,
  'credit-card-calculator': CreditCardCalculator,
  'loan-prepayment-calculator': LoanPayoffCalculator,
  'retirement-calculator': RetirementCalculator,
  'net-worth-calculator': NetWorthCalculator,
  // Legacy slugs for backward compatibility
  'mortgage-calculator': MortgageCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'loan-payoff-calculator': LoanPayoffCalculator,
  'budget-planner': BudgetPlanner,
  'emergency-fund-calculator': EmergencyFundCalculator,
  'investment-returns-calculator': InvestmentReturnCalculator,
};

export default function CalculatorPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !calculatorComponents[slug]) {
    return <Navigate to="/calculators" replace />;
  }

  const CalculatorComponent = calculatorComponents[slug];
  return <CalculatorComponent />;
}
