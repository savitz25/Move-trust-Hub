/**
 * Content model for /lender/resources — Mortgage Decision Center.
 * Intent-first structure (not a flat article archive).
 */
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  PiggyBank,
  Users,
  BadgeCheck,
  RefreshCw,
  Calculator,
  Wallet,
  Scale,
  ShieldCheck,
  Search,
  Compass,
  GitCompare,
  CheckCircle2,
  BookOpen,
  Landmark,
  HelpCircle,
} from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import { CALCULATORS, type CalcId } from '@/lib/lender/calculators/registry';
import { lenderGuides } from '@/lib/lender/resources/guides';

export const DECISION_CENTER_META = {
  title: 'Your Home Financing Decision Center (2026)',
  description:
    'Buying a home or refinancing? Start here. Free mortgage calculators, NMLS verification guidance, and independent lender research — no paid placements, no lead fees.',
  path: '/resources',
  canonical: 'https://www.movetrusthub.com/lender/resources',
} as const;

export type IntentCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
  secondaryHref?: string;
  secondaryCta?: string;
};

export const INTENT_GATEWAY: IntentCard[] = [
  {
    id: 'first-home',
    title: "I'm Buying My First Home",
    description:
      'Programs, down payment options, and a clear path from “can I buy?” to comparing lenders.',
    icon: Home,
    href: hubPath('lender', '/resources/first-time-homebuyer-programs'),
    cta: 'Start first-home path',
    secondaryHref: hubPath('lender', '/calculators?calc=affordability'),
    secondaryCta: 'Affordability calculator',
  },
  {
    id: 'afford',
    title: 'I Want to Know What I Can Afford',
    description:
      'Run payment, DTI, and max purchase price before you tour homes or talk to a lender.',
    icon: PiggyBank,
    href: hubPath('lender', '/calculators?calc=affordability'),
    cta: 'Open affordability tools',
    secondaryHref: hubPath('lender', '/calculators?calc=payment'),
    secondaryCta: 'Monthly payment (PITI)',
  },
  {
    id: 'find-compare',
    title: 'I Need to Find / Compare Lenders',
    description:
      'Browse NMLS-screened mortgage lenders by county and compare options side by side.',
    icon: Users,
    href: hubPath('lender', '/local-lenders'),
    cta: 'Browse lender directory',
    secondaryHref: hubPath('lender', '/compare'),
    secondaryCta: 'Compare lenders',
  },
  {
    id: 'verify',
    title: 'I Want to Verify a Lender',
    description:
      'Confirm NMLS licensing and learn how we score trust — then double-check on official sources.',
    icon: BadgeCheck,
    href: hubPath('lender', '/about'),
    cta: 'How we verify lenders',
    secondaryHref: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
    secondaryCta: 'Choosing a lender guide',
  },
  {
    id: 'refinance',
    title: "I'm Refinancing",
    description:
      'Break-even math, payoff planning, and HELOC/equity tools for cash-out or rate/term refis.',
    icon: RefreshCw,
    href: hubPath('lender', '/calculators?calc=refinance'),
    cta: 'Refinance calculator',
    secondaryHref: hubPath('lender', '/calculators?calc=amortization'),
    secondaryCta: 'Payoff planner',
  },
];

export type JourneyStage = {
  id: string;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'understand',
    label: 'Understand',
    short: 'Learn the basics',
    description: 'Loan types, programs, and what “good” looks like.',
    icon: BookOpen,
    href: hubPath('lender', '/resources/first-time-homebuyer-programs'),
  },
  {
    id: 'calculate',
    label: 'Calculate',
    short: 'Know your numbers',
    description: 'Payment, affordability, down payment, and cash to close.',
    icon: Calculator,
    href: hubPath('lender', '/calculators'),
  },
  {
    id: 'explore',
    label: 'Explore',
    short: 'Find lenders',
    description: 'County directory with NMLS-screened listings.',
    icon: Search,
    href: hubPath('lender', '/local-lenders'),
  },
  {
    id: 'compare',
    label: 'Compare',
    short: 'Side by side',
    description: 'Rates, fees, service, and loan products — not ad spend.',
    icon: GitCompare,
    href: hubPath('lender', '/compare'),
  },
  {
    id: 'verify',
    label: 'Verify',
    short: 'Check credentials',
    description: 'NMLS Consumer Access and our independent methodology.',
    icon: ShieldCheck,
    href: hubPath('lender', '/about'),
  },
  {
    id: 'decide',
    label: 'Decide',
    short: 'Move with confidence',
    description: 'Choose a lender after education — not sales pressure.',
    icon: CheckCircle2,
    href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
  },
];

export type FeaturedTool = {
  calcId: CalcId;
  title: string;
  description: string;
  href: string;
  tag?: string;
  icon: LucideIcon;
};

const FEATURED_CALC_IDS: CalcId[] = [
  'payment',
  'affordability',
  'down-payment',
  'refinance',
  'compare',
  'dti',
];

export const FEATURED_TOOLS: FeaturedTool[] = FEATURED_CALC_IDS.map((id) => {
  const calc = CALCULATORS.find((c) => c.id === id)!;
  return {
    calcId: id,
    title: calc.title,
    description: calc.whatItTellsMe,
    href: hubPath('lender', `/calculators?calc=${id}`),
    tag: calc.tag,
    icon: calc.icon,
  };
});

export type PlaybookStep = {
  step: number;
  stageId: JourneyStage['id'];
  title: string;
  description: string;
  whoFor: string;
  readTime?: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const HOMEBUYER_PLAYBOOK: PlaybookStep[] = [
  {
    step: 1,
    stageId: 'understand',
    title: 'First-time homebuyer programs (2026)',
    description:
      'FHA, VA, USDA, low-down conventional loans, and down payment assistance — what to compare beyond the rate.',
    whoFor: 'First-time buyers and anyone new to mortgage jargon',
    readTime: '20 min',
    href: hubPath('lender', '/resources/first-time-homebuyer-programs'),
    icon: Home,
  },
  {
    step: 2,
    stageId: 'calculate',
    title: 'Run your affordability and payment numbers',
    description:
      'Estimate max purchase price and full PITI before you shop homes or apply with a lender.',
    whoFor: 'Buyers who want a realistic budget',
    href: hubPath('lender', '/calculators?calc=affordability'),
    icon: Calculator,
  },
  {
    step: 3,
    stageId: 'understand',
    title: 'Fixed-rate vs. adjustable-rate mortgages',
    description:
      'Pros, cons, break-even thinking, and when each structure fits your timeline and risk tolerance.',
    whoFor: 'Anyone choosing a loan product',
    readTime: '12 min',
    href: hubPath('lender', '/resources/fixed-vs-adjustable-rate-mortgages'),
    icon: Scale,
  },
  {
    step: 4,
    stageId: 'explore',
    title: 'Find lenders in your market',
    description:
      'Browse the independent directory by county — NMLS-screened listings, not paid placements.',
    whoFor: 'Shoppers ready to research real companies',
    href: hubPath('lender', '/local-lenders'),
    icon: Search,
  },
  {
    step: 5,
    stageId: 'compare',
    title: 'How to choose the right mortgage lender',
    description:
      'Evaluation criteria, red flags, and a practical comparison checklist for 2026.',
    whoFor: 'Buyers narrowing a shortlist',
    readTime: '12 min',
    href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
    icon: Compass,
  },
  {
    step: 6,
    stageId: 'verify',
    title: 'Verify licensing on NMLS Consumer Access',
    description:
      'Confirm the company and loan officer before you share documents or pay fees.',
    whoFor: 'Everyone before signing',
    href: hubPath('lender', '/about'),
    icon: ShieldCheck,
  },
];

export type GuideCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  href: string;
  readTime: string;
  whoFor: string;
  stageLabel: string;
  icon: LucideIcon;
};

const GUIDE_ENRICHMENT: Record<
  string,
  { whoFor: string; stageLabel: string; icon: LucideIcon }
> = {
  'first-time-homebuyer-programs': {
    whoFor: 'First-time and low-down-payment buyers',
    stageLabel: 'Understand',
    icon: Home,
  },
  'how-to-choose-mortgage-lender': {
    whoFor: 'Buyers shortlisting lenders',
    stageLabel: 'Compare & Verify',
    icon: Users,
  },
  'fixed-vs-adjustable-rate-mortgages': {
    whoFor: 'Anyone choosing fixed vs. ARM',
    stageLabel: 'Understand',
    icon: Scale,
  },
};

export const GUIDED_CONTENT_CARDS: GuideCard[] = lenderGuides.map((g) => {
  const extra = GUIDE_ENRICHMENT[g.slug] ?? {
    whoFor: 'Homebuyers and refinancers',
    stageLabel: g.category,
    icon: BookOpen,
  };
  return {
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    category: g.category,
    href: g.href,
    readTime: g.readTime,
    whoFor: extra.whoFor,
    stageLabel: extra.stageLabel,
    icon: extra.icon,
  };
});

export type MythCard = {
  myth: string;
  reality: string;
};

export const MORTGAGE_MYTHS: MythCard[] = [
  {
    myth: 'You should always pick the lowest advertised rate.',
    reality:
      'APR, points, fees, lock terms, and service matter. A slightly higher rate with lower costs can win over a “teaser” quote.',
  },
  {
    myth: 'You need 20% down to buy a home.',
    reality:
      'Many first-time programs allow 3–3.5% down (or $0 for some VA/USDA). Lower down payment often means PMI or guarantee fees — model the full payment.',
  },
  {
    myth: 'Pre-approval means the loan is guaranteed.',
    reality:
      'Pre-approval is conditional. Underwriting still reviews income, assets, credit, and the property. Keep documentation ready and avoid new debt.',
  },
  {
    myth: 'Online lenders are always cheaper or better.',
    reality:
      'Channel doesn’t equal value. Compare total cost and verify NMLS licensing for every company and loan officer — digital or local.',
  },
];

export type DecisionFaq = {
  question: string;
  answer: string;
};

export const DECISION_FAQS: DecisionFaq[] = [
  {
    question: 'Where should I start if I’ve never bought a home?',
    answer:
      'Start with the first-time homebuyer programs guide, then run the affordability and payment calculators. When your budget feels real, browse lenders in your county and verify NMLS IDs before you apply.',
  },
  {
    question: 'How do I know a lender is legitimate?',
    answer:
      'Look up the company and individual loan officer on NMLS Consumer Access. Confirm active licenses for your state. Lender Trust Hub surfaces licensing context for research — always re-verify on the official NMLS site before you share personal data.',
  },
  {
    question: 'What’s a Trust Score on this site?',
    answer:
      'Our scores combine public signals such as licensing status, complaints transparency, and attributed review data where available. They are research aids — not credit decisions or endorsements. Full methodology is on our About page.',
  },
  {
    question: 'Do you sell my information or take lead fees?',
    answer:
      'No. Lender Trust Hub is an independent research directory. We do not sell leads or accept paid placements for rankings. Tools and guides are free educational resources.',
  },
  {
    question: 'Should I get pre-approved before shopping homes?',
    answer:
      'Yes for most buyers. Pre-approval clarifies budget and strengthens offers. Use our calculators first so you enter pre-approval with realistic payment and cash-to-close expectations.',
  },
  {
    question: 'When does refinancing make sense?',
    answer:
      'When the interest saved exceeds refinance costs within a timeline you’ll stay in the loan. Use the refinance break-even calculator, then compare total cost — not rate alone.',
  },
];

export type NextStepCta = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  variant: 'primary' | 'secondary';
};

export const NEXT_STEP_CTAS: NextStepCta[] = [
  {
    title: 'Know your numbers',
    description: 'Free calculators for payment, affordability, and cash needed to close.',
    href: hubPath('lender', '/calculators'),
    cta: 'Open calculators',
    icon: Calculator,
    variant: 'primary',
  },
  {
    title: 'Research lenders near you',
    description: 'Independent directory of NMLS-screened mortgage lenders and brokers.',
    href: hubPath('lender', '/local-lenders'),
    cta: 'Browse directory',
    icon: Landmark,
    variant: 'secondary',
  },
  {
    title: 'Compare side by side',
    description: 'Shortlist lenders and evaluate total cost, not ads.',
    href: hubPath('lender', '/compare'),
    cta: 'Compare lenders',
    icon: GitCompare,
    variant: 'secondary',
  },
  {
    title: 'Verify before you sign',
    description: 'How we research lenders and how you can double-check NMLS.',
    href: hubPath('lender', '/about'),
    cta: 'Trust & methodology',
    icon: ShieldCheck,
    variant: 'secondary',
  },
];

export const TRUST_POINTS = [
  {
    title: 'NMLS licensing context',
    detail:
      'We surface NMLS-related credentials for research. Always confirm company and LO IDs on NMLS Consumer Access before applying.',
    icon: BadgeCheck,
  },
  {
    title: 'Independent Trust Scores',
    detail:
      'Scores help you compare public signals — licensing, complaints transparency, and attributed reviews where available. Never pay-to-rank.',
    icon: Scale,
  },
  {
    title: 'No lead fees · no paid placements',
    detail:
      'Lender Trust Hub does not sell your contact info or charge lenders for directory placement. Education and tools stay free.',
    icon: ShieldCheck,
  },
  {
    title: 'You still verify',
    detail:
      'Licenses and rates change. Use official NMLS, CFPB, and written Loan Estimates before you commit.',
    icon: HelpCircle,
  },
] as const;
