import type { LucideIcon } from 'lucide-react';
import {
  Home,
  PiggyBank,
  RefreshCw,
  Calendar,
  Scale,
  Building2,
  Landmark,
  TrendingUp,
  Calculator,
  Wallet,
  BadgePercent,
  GitCompare,
} from 'lucide-react';

export type CalcId =
  | 'payment'
  | 'affordability'
  | 'refinance'
  | 'amortization'
  | 'compare'
  | 'rent-vs-buy'
  | 'heloc'
  | 'down-payment'
  | 'rental'
  | 'dti'
  | 'closing';

export type CalcJourneyId = 'buying' | 'budget' | 'refinancing' | 'compare' | 'planning';

export interface CalcMeta {
  id: CalcId;
  title: string;
  /** Short marketing line */
  benefit: string;
  /** Plain-language “What does this tell me?” */
  whatItTellsMe: string;
  icon: LucideIcon;
  journey: CalcJourneyId;
  tag?: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface CalcJourney {
  id: CalcJourneyId;
  title: string;
  description: string;
  gatewayTitle: string;
  gatewayDescription: string;
  icon: LucideIcon;
  primaryCalc: CalcId;
  calcIds: CalcId[];
}

export const CALCULATORS: CalcMeta[] = [
  {
    id: 'payment',
    title: 'Mortgage Payment (PITI)',
    benefit: 'Full PITI with taxes, PMI, charts, amortization & extra payments.',
    whatItTellsMe:
      'Your estimated monthly housing cost including principal, interest, taxes, insurance, PMI, and HOA.',
    icon: Home,
    journey: 'buying',
    tag: 'Most Popular',
    featured: true,
    seoTitle: 'Mortgage Payment Calculator with PMI & Charts',
    seoDescription:
      'Calculate monthly PITI, total interest, payoff date, and export amortization schedules.',
  },
  {
    id: 'affordability',
    title: 'Home Affordability',
    benefit: 'Max home price from income, debts, and DTI guidelines.',
    whatItTellsMe:
      'How much home you can reasonably afford based on income, debts, and DTI guidelines.',
    icon: PiggyBank,
    journey: 'budget',
    tag: 'Best for First-Time Buyers',
    seoTitle: 'Home Affordability Calculator',
    seoDescription: 'Find how much house you can afford using front-end and back-end DTI ratios.',
  },
  {
    id: 'down-payment',
    title: 'Down Payment Planner',
    benefit: 'Savings timeline with growth projections.',
    whatItTellsMe: 'When you could hit your down-payment goal with monthly savings and growth.',
    icon: Wallet,
    journey: 'buying',
    seoTitle: 'Down Payment Savings Planner',
    seoDescription: 'Project when you will reach your down payment goal with monthly contributions.',
  },
  {
    id: 'closing',
    title: 'Closing Costs',
    benefit: 'Estimate fees before you shop lenders.',
    whatItTellsMe: 'A realistic cash-to-close range so you are not surprised at the table.',
    icon: Calculator,
    journey: 'buying',
    seoTitle: 'Closing Costs Estimator',
    seoDescription: 'Estimate mortgage closing costs by state and loan amount.',
  },
  {
    id: 'refinance',
    title: 'Refinance Savings',
    benefit: 'Breakeven months and lifetime interest comparison.',
    whatItTellsMe: 'Whether refinancing saves money after costs, and how long until you break even.',
    icon: RefreshCw,
    journey: 'refinancing',
    tag: 'Break-Even Focus',
    seoTitle: 'Refinance Breakeven Calculator',
    seoDescription: 'Compare current vs new loan payments and find your refinance breakeven point.',
  },
  {
    id: 'amortization',
    title: 'Payoff Planner',
    benefit: 'Extra payments, lump sums, and interest saved.',
    whatItTellsMe: 'How extra payments or a lump sum shorten your loan and cut interest.',
    icon: Calendar,
    journey: 'refinancing',
    seoTitle: 'Amortization & Payoff Planner',
    seoDescription: 'Model extra mortgage payments and see payoff acceleration with charts and CSV export.',
  },
  {
    id: 'heloc',
    title: 'HELOC / Equity',
    benefit: 'Borrowing power and payment scenarios.',
    whatItTellsMe: 'Rough equity you could access and what HELOC payments might look like.',
    icon: Landmark,
    journey: 'refinancing',
    tag: 'Cash-Out Style',
    seoTitle: 'HELOC & Home Equity Calculator',
    seoDescription: 'Estimate HELOC borrowing power, interest-only vs amortizing payments.',
  },
  {
    id: 'compare',
    title: 'Loan Comparison',
    benefit: 'Compare 2–3 scenarios side by side.',
    whatItTellsMe: 'Which rate/term/down-payment combo costs less over time.',
    icon: Scale,
    journey: 'compare',
    tag: 'Side-by-Side',
    seoTitle: 'Mortgage Loan Comparison Tool',
    seoDescription: 'Side-by-side comparison of rates, terms, down payments, and total cost.',
  },
  {
    id: 'dti',
    title: 'DTI Analyzer',
    benefit: 'Front/back-end ratios with lender-ready guidance.',
    whatItTellsMe:
      'Whether your debt-to-income ratios look lender-ready for conventional, FHA, or VA.',
    icon: BadgePercent,
    journey: 'compare',
    seoTitle: 'Debt-to-Income Ratio Analyzer',
    seoDescription: 'Calculate front-end and back-end DTI to assess mortgage readiness.',
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs. Buy',
    benefit: 'Net worth projection and break-even year.',
    whatItTellsMe: 'When buying may overtake renting financially in your scenario.',
    icon: Building2,
    journey: 'planning',
    seoTitle: 'Rent vs Buy Calculator',
    seoDescription: 'Compare renting vs buying over 5–30 years with appreciation and investment returns.',
  },
  {
    id: 'rental',
    title: 'Rental Cash Flow',
    benefit: 'Cap rate, cash-on-cash, and 5-year projection.',
    whatItTellsMe: 'Whether an investment property cash-flows after expenses and financing.',
    icon: TrendingUp,
    journey: 'planning',
    seoTitle: 'Rental Property Cash Flow Analyzer',
    seoDescription: 'Evaluate investment property cap rate, cash-on-cash return, and cash flow.',
  },
];

/** Intent gateway + grid section groupings (planning tools appear only in grid). */
export const CALC_JOURNEYS: CalcJourney[] = [
  {
    id: 'buying',
    title: 'Buying a Home',
    description: 'Payment, affordability, down payment, and closing costs.',
    gatewayTitle: "I'm Buying a Home",
    gatewayDescription:
      'Model monthly payment, how much house you can afford, and cash needed to close.',
    icon: Home,
    primaryCalc: 'payment',
    calcIds: ['payment', 'affordability', 'down-payment', 'closing'],
  },
  {
    id: 'budget',
    title: 'Figuring Out My Budget',
    description: 'Start with income, DTI, and max purchase price.',
    gatewayTitle: "I'm Figuring Out My Budget",
    gatewayDescription:
      'Use affordability and DTI tools before you fall in love with a listing.',
    icon: PiggyBank,
    primaryCalc: 'affordability',
    calcIds: ['affordability', 'dti', 'payment', 'down-payment'],
  },
  {
    id: 'refinancing',
    title: 'Refinancing',
    description: 'Refinance, break-even, HELOC / cash-out style equity, and payoff.',
    gatewayTitle: "I'm Considering Refinancing",
    gatewayDescription: 'Check break-even, interest savings, and equity options.',
    icon: RefreshCw,
    primaryCalc: 'refinance',
    calcIds: ['refinance', 'amortization', 'heloc'],
  },
  {
    id: 'compare',
    title: 'Loan Comparison',
    description: 'Compare scenarios, loan types, and total cost.',
    gatewayTitle: 'I Want to Compare Loans',
    gatewayDescription:
      'Side-by-side scenarios and DTI readiness for conventional, FHA, or VA paths.',
    icon: GitCompare,
    primaryCalc: 'compare',
    calcIds: ['compare', 'dti', 'payment'],
  },
];

/** Grid-only journey for planning tools not in the four gateway cards. */
export const PLANNING_JOURNEY: CalcJourney = {
  id: 'planning',
  title: 'Planning & Decision Tools',
  description: 'Rent vs buy, amortization, and investment cash flow.',
  gatewayTitle: 'Planning tools',
  gatewayDescription: 'Longer-horizon decisions beyond a single payment estimate.',
  icon: Building2,
  primaryCalc: 'rent-vs-buy',
  calcIds: ['rent-vs-buy', 'amortization', 'rental'],
};

export function getCalcById(id: CalcId): CalcMeta | undefined {
  return CALCULATORS.find((c) => c.id === id);
}

export function getCalcsForJourney(journey: CalcJourney): CalcMeta[] {
  return journey.calcIds
    .map((id) => getCalcById(id))
    .filter((c): c is CalcMeta => Boolean(c));
}

export const CALC_DISCLAIMER =
  'These tools provide estimates for educational purposes only. Actual rates, fees, terms, and approvals vary by lender, credit profile, property, and market conditions. Always consult a licensed mortgage professional. Assumptions (taxes, insurance, PMI) use simplified averages and can be adjusted in each tool.';
