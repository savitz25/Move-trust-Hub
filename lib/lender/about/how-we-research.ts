/**
 * Content model for /lender/about — How We Research Mortgage Lenders.
 */
import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Scale,
  MessageSquareWarning,
  Star,
  MapPin,
  GitCompare,
  ShieldCheck,
  Database,
  Search,
  FileSearch,
  Calculator,
  Users,
  Landmark,
} from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import { TRUST_STATS } from '@/lib/lender/mockData';

export const HOW_WE_RESEARCH_META = {
  title: 'How We Research Mortgage Lenders (2026)',
  description:
    'Why you can trust Lender Trust Hub: NMLS licensing context, Trust Scores, CFPB complaint signals, and independent methodology. No paid rankings. No lead fees. No paid placement.',
  path: '/about',
  canonical: 'https://www.movetrusthub.com/lender/about',
} as const;

export type HeroAction = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
};

export const HERO_ACTIONS: HeroAction[] = [
  {
    label: 'Research a lender',
    href: hubPath('lender', '/local-lenders'),
    variant: 'primary',
  },
  {
    label: 'Understand our scores',
    href: '#scores',
    variant: 'secondary',
  },
  {
    label: 'Find local lenders',
    href: hubPath('lender', '/local-lenders'),
    variant: 'outline',
  },
];

export type ResearchSignal = {
  id: string;
  number: string;
  title: string;
  whyItMatters: string;
  whatWeDo: string;
  icon: LucideIcon;
};

export const RESEARCH_SIGNALS: ResearchSignal[] = [
  {
    id: 'nmls',
    number: '01',
    title: 'Licensing / NMLS status',
    whyItMatters:
      'A mortgage company or loan officer without active authority may not legally originate in your state. Licensing is the floor — not a quality guarantee.',
    whatWeDo:
      'We surface NMLS-related identifiers and licensing context on profiles for research. You should always re-confirm company and individual IDs on NMLS Consumer Access before applying.',
    icon: BadgeCheck,
  },
  {
    id: 'reviews',
    number: '02',
    title: 'Consumer reviews & reputation',
    whyItMatters:
      'Service quality, communication, and closing reliability show up in public feedback — especially patterns across many reviews, not a single five-star quote.',
    whatWeDo:
      'Where available, we incorporate Google Places ratings/snippets and other public reputation signals. These are supplemental — not paid testimonials.',
    icon: Star,
  },
  {
    id: 'complaints',
    number: '03',
    title: 'Complaint data (CFPB)',
    whyItMatters:
      'Formal consumer complaints can highlight recurring issues with servicing, origination, or communication. Volume and type matter more than a single filing.',
    whatWeDo:
      'Where applicable, we reference CFPB complaint transparency so you can see public complaint patterns alongside other signals.',
    icon: MessageSquareWarning,
  },
  {
    id: 'trust-score',
    number: '04',
    title: 'Overall Trust Score',
    whyItMatters:
      'One number cannot capture everything — but a composite helps you scan a crowded market before deep-diving into Loan Estimates.',
    whatWeDo:
      'Our Trust Score combines licensing context, reputation signals, and complaint transparency into a research aid. It is not a credit decision or endorsement.',
    icon: Scale,
  },
  {
    id: 'county',
    number: '05',
    title: 'County / local market experience',
    whyItMatters:
      'Mortgage shopping is local. Lenders familiar with your county may better navigate local underwriting, property types, and market pace.',
    whatWeDo:
      'County Experience Scores highlight relative local presence across markets we cover — useful for orientation, not a guarantee of service quality.',
    icon: MapPin,
  },
  {
    id: 'compare',
    number: '06',
    title: 'Ability to compare alternatives',
    whyItMatters:
      'The right lender for you is relative. Comparing options side by side reduces pressure from a single sales path.',
    whatWeDo:
      'Our directory and compare tools let you shortlist multiple lenders without pay-to-play ranking. Always request written Loan Estimates.',
    icon: GitCompare,
  },
];

export type ScoreExplainer = {
  id: string;
  title: string;
  summary: string;
  inputs: string[];
  doesMean: string[];
  doesNotMean: string[];
  icon: LucideIcon;
};

export const SCORE_EXPLAINERS: ScoreExplainer[] = [
  {
    id: 'trust',
    title: 'Trust Score',
    summary:
      'A composite research score designed to help you scan licensing, reputation, and complaint transparency signals in one place.',
    inputs: [
      'NMLS / licensing context',
      'Public review ratings where available',
      'Complaint transparency (e.g. CFPB)',
      'BBB and other public profile signals when present',
    ],
    doesMean: [
      'A quick way to prioritize which lenders deserve deeper research',
      'A transparent combination of public signals we document on this site',
      'A starting point before you request Loan Estimates',
    ],
    doesNotMean: [
      'A guarantee of the best rate or service',
      'An endorsement or “seal of approval” from a regulator',
      'A substitute for underwriting, credit decisions, or legal advice',
      'A ranking you can buy — paid placement does not exist here',
    ],
    icon: Scale,
  },
  {
    id: 'county',
    title: 'County Experience Score',
    summary:
      'A relative signal of how often a lender appears associated with activity or presence in a given county market.',
    inputs: [
      'County-level directory associations',
      'Relative volume / presence signals in that market',
      'Local market mapping across counties we cover',
    ],
    doesMean: [
      'Useful orientation when comparing local vs. national options',
      'A prompt to ask lenders about recent closings in your area',
    ],
    doesNotMean: [
      'Proof that a lender is “best” for your specific loan',
      'A prediction of approval odds or closing speed',
      'A complete history of every loan originated in that county',
    ],
    icon: MapPin,
  },
];

export type DataSourceCard = {
  name: string;
  role: string;
  howUsed: string;
  officialHref?: string;
  officialLabel?: string;
  icon: LucideIcon;
};

export const DATA_SOURCES: DataSourceCard[] = [
  {
    name: 'NMLS Consumer Access',
    role: 'Licensing registry',
    howUsed:
      'Primary reference for company and loan officer licensing context. Official records always win over our summary.',
    officialHref: 'https://www.nmlsconsumeraccess.org/',
    officialLabel: 'Open NMLS',
    icon: BadgeCheck,
  },
  {
    name: 'CFPB',
    role: 'Complaint transparency',
    howUsed:
      'Public consumer complaint data helps surface patterns — not automatic proof of wrongdoing on any single file.',
    officialHref: 'https://www.consumerfinance.gov/',
    officialLabel: 'CFPB.gov',
    icon: MessageSquareWarning,
  },
  {
    name: 'BBB',
    role: 'Profile & accreditation signals',
    howUsed:
      'Where a public BBB profile exists, ratings and accreditation status can add reputation context.',
    icon: ShieldCheck,
  },
  {
    name: 'Google Places',
    role: 'Public review snapshots',
    howUsed:
      'Ratings and short attributed review snippets (when available) for service-quality orientation.',
    icon: Star,
  },
  {
    name: 'Trustpilot & similar',
    role: 'Supplemental reviews',
    howUsed:
      'Additional public review platforms may appear when relevant. No single platform is treated as perfect.',
    icon: Database,
  },
];

export type ProcessStep = {
  step: number;
  title: string;
  detail: string;
  icon: LucideIcon;
};

export const RESEARCH_PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: 'Identify the company',
    detail:
      'We start from publicly listed mortgage companies and brokers in markets we cover — not from paid advertising lists.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Check licensing context',
    detail:
      'We look for NMLS-related identifiers and licensing signals so you can re-verify on NMLS Consumer Access.',
    icon: BadgeCheck,
  },
  {
    step: 3,
    title: 'Review public feedback',
    detail:
      'Where available, we incorporate Google and other public review signals for service reputation patterns.',
    icon: Star,
  },
  {
    step: 4,
    title: 'Examine complaint transparency',
    detail:
      'CFPB and similar public complaint data help highlight recurring themes when present.',
    icon: FileSearch,
  },
  {
    step: 5,
    title: 'Evaluate local market association',
    detail:
      'County Experience Scores help you see relative local presence across markets we map.',
    icon: MapPin,
  },
  {
    step: 6,
    title: 'Surface data for comparison',
    detail:
      'Profiles and compare tools present signals side by side so you can shortlist — then get written Loan Estimates.',
    icon: GitCompare,
  },
];

export const LIMITATIONS: string[] = [
  'Scores are research aids, not credit, underwriting, or legal determinations.',
  'Public data can be incomplete, delayed, or disputed by the company involved.',
  'A high score does not guarantee the lowest rate, fastest closing, or best fit for your situation.',
  'A lower score does not automatically mean a lender is unfit — dig into the underlying signals.',
  'Licenses, complaints, and reviews change. Re-verify NMLS and request current Loan Estimates before you decide.',
  'We do not originate loans, set rates, or act as your agent. Always work with licensed professionals for binding offers.',
];

export type AboutCta = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

export const FINAL_CTAS: AboutCta[] = [
  {
    title: 'Explore the directory',
    description: 'Browse NMLS-screened mortgage lenders by county.',
    href: hubPath('lender', '/local-lenders'),
    cta: 'Find local lenders',
    icon: Users,
  },
  {
    title: 'Run the numbers first',
    description: 'Free payment, affordability, and refinance calculators.',
    href: hubPath('lender', '/calculators'),
    cta: 'Open calculators',
    icon: Calculator,
  },
  {
    title: 'Compare options',
    description: 'Shortlist lenders side by side — not by ad spend.',
    href: hubPath('lender', '/compare'),
    cta: 'Compare lenders',
    icon: GitCompare,
  },
  {
    title: 'Home Financing Decision Center',
    description: 'Guided path from education to verification.',
    href: hubPath('lender', '/resources'),
    cta: 'Open Decision Center',
    icon: Landmark,
  },
];

export const COVERAGE_STATS = [
  {
    value: `${TRUST_STATS.verifiedLenders.toLocaleString()}+`,
    label: 'Lenders in directory research set',
  },
  {
    value: TRUST_STATS.countiesCovered.toLocaleString(),
    label: 'Counties mapped for local experience',
  },
  {
    value: `${(TRUST_STATS.totalReviews / 1_000_000).toFixed(1)}M+`,
    label: 'Public review signals referenced*',
  },
] as const;

export const BUSINESS_MODEL_ANSWERS = [
  {
    q: 'How do you make money?',
    a: 'Lender Trust Hub is part of the independent Trust Hub network. We focus on directory research tools and education. We do not sell leads or charge for featured rankings. Any future monetization will not include pay-to-rank directory placement.',
  },
  {
    q: 'Can lenders pay for better placement?',
    a: 'No. Directory order and Trust Scores are not sold. Paid placement for ranking is not part of our model.',
  },
  {
    q: 'Do you share my contact info with lenders?',
    a: 'We do not operate a lead-sale marketplace that auctions your contact details to lenders for placement on this directory.',
  },
] as const;
