import { Calculator, Heart, PiggyBank, Shield } from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import { insuranceHref } from '@/lib/insurance/paths';
import type { CalculatorCardData, HealthHubDirectoryData } from '@/lib/hub/templates/types';

export const INSURANCE_CALCULATOR_CARDS: CalculatorCardData[] = [
  {
    href: insuranceHref('/calculators/premium-estimator'),
    icon: Calculator,
    title: 'Premium Estimator',
    description:
      'Estimate auto, homeowners, health, and Medicare premium ranges by state and profile. Clearly labeled estimates only.',
  },
  {
    href: insuranceHref('/calculators/medicare-gap'),
    icon: Heart,
    title: 'Medicare Gap Analyzer',
    description:
      'Identify potential coverage gaps when moving states, aging into Medicare, or transitioning from employer plans.',
  },
  {
    href: insuranceHref('/calculators/aca-subsidy'),
    icon: PiggyBank,
    title: 'ACA Subsidy Estimator',
    description:
      'Rough 2026 marketplace subsidy estimate based on household size, income, and ZIP. Not official CMS data.',
  },
  {
    href: insuranceHref('/tools/license-verification'),
    icon: Shield,
    title: 'License Verification Guide',
    description:
      'Step-by-step instructions to verify agent licensing with your state Department of Insurance.',
  },
];

export const INSURANCE_CALCULATOR_FAQ = [
  {
    question: 'Are Insurance Trust Hub calculators free?',
    answer:
      'Yes. All tools are free, require no account, and produce educational estimates only — not binding quotes or enrollment decisions.',
  },
  {
    question: 'Can I use these results to enroll in a plan?',
    answer:
      'Use them for planning, then verify premiums, networks, and eligibility with licensed agents and official marketplace or Medicare sources.',
  },
];

export const INSURANCE_DIRECTORY_LANDING: HealthHubDirectoryData = {
  title: 'Licensed insurance agency directory',
  subtitle: 'Search DOI-screened agencies by state, coverage type, and specialty — zero paid placements.',
  marketSnapshot:
    'Insurance Trust Hub lists independent and captive agencies screened against state Department of Insurance records. Filter by health, Medicare, auto, homeowners, and commercial lines. Ratings reflect verified customer reviews — not advertising spend.',
  focusPoints: [
    'State DOI license verification on every listing',
    'Medicare, ACA, auto, and homeowners specialties',
    'Independent agents with multi-carrier access',
    'No pay-to-play ranking or sponsored placements',
  ],
  featuredMetros: [
    {
      href: hubPath('insurance', '/hubs/florida/miami-fort-lauderdale'),
      label: 'South Florida',
      description: 'Medicare Advantage and ACA specialists',
    },
    {
      href: hubPath('insurance', '/hubs/texas/houston'),
      label: 'Houston',
      description: 'Employer and individual health plans',
    },
    {
      href: hubPath('insurance', '/hubs/california/los-angeles'),
      label: 'Los Angeles',
      description: 'ACA marketplace and group transitions',
    },
    {
      href: hubPath('insurance', '/destinations/florida'),
      label: 'Florida guide',
      description: 'Coastal wind, flood, and auto considerations',
    },
    {
      href: hubPath('insurance', '/hubs/medicare'),
      label: 'Medicare specialists',
      description: 'Advantage vs supplement counseling',
    },
    {
      href: hubPath('insurance', '/hubs/aca'),
      label: 'ACA marketplace agents',
      description: 'Open enrollment and SEP support',
    },
  ],
  trustLabel: 'Verified · Independent · Licensed Only',
};