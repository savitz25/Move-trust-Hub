import { hubPath } from '@/lib/hub/paths';
import type { HubSectionPreset } from '@/lib/hub/templates/types';

export const INSURANCE_SECTION_PRESETS: Record<
  HubSectionPreset['section'],
  HubSectionPreset
> = {
  resources: {
    hub: 'insurance',
    section: 'resources',
    eyebrow: 'Insurance Trust Hub · Guides',
    title: 'Insurance resources & comparisons',
    description:
      'Independent guides on Medicare, ACA, auto, and homeowners coverage. Educational content only — verify quotes and licensing with state DOI sources.',
    primaryCta: {
      href: hubPath('insurance', '/resources'),
      label: 'Browse all guides',
    },
    secondaryCta: {
      href: hubPath('insurance', '/directory'),
      label: 'Agency directory',
    },
    links: [
      {
        href: hubPath('insurance', '/resources/medicare-advantage-vs-medigap'),
        label: 'Medicare Advantage vs Medigap',
        description: 'Side-by-side comparison for seniors',
      },
      {
        href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
        label: 'Choose a health plan',
      },
      {
        href: hubPath('insurance', '/resources/aca-obamacare-guide'),
        label: 'ACA enrollment guide',
      },
    ],
    faq: [
      {
        question: 'Does Insurance Trust Hub sell insurance?',
        answer:
          'No. We are an independent directory and education site. Licensed agents and agencies are listed for research — always verify licensing with your state Department of Insurance.',
      },
    ],
  },
  guides: {
    hub: 'insurance',
    section: 'guides',
    eyebrow: 'Insurance Trust Hub · Education',
    title: 'Insurance guides by topic',
    description: 'Topic-based explainers to help you compare coverage types before contacting a licensed agent.',
    primaryCta: {
      href: hubPath('insurance', '/hubs/health-insurance'),
      label: 'Health insurance hubs',
    },
    links: [
      { href: hubPath('insurance', '/hubs/medicare'), label: 'Medicare specialists' },
      { href: hubPath('insurance', '/hubs/aca'), label: 'ACA marketplace agents' },
      { href: hubPath('insurance', '/destinations'), label: 'State destination guides' },
    ],
  },
  calculators: {
    hub: 'insurance',
    section: 'calculators',
    eyebrow: 'Insurance Trust Hub · Tools',
    title: 'Insurance calculators',
    description:
      'Free premium, Medicare gap, and ACA subsidy estimators. Outputs are educational estimates — not binding quotes.',
    primaryCta: {
      href: hubPath('insurance', '/calculators/premium-estimator'),
      label: 'Premium estimator',
    },
    secondaryCta: {
      href: hubPath('insurance', '/calculators'),
      label: 'All calculators',
    },
    links: [
      { href: hubPath('insurance', '/calculators/medicare-gap'), label: 'Medicare gap analyzer' },
      { href: hubPath('insurance', '/calculators/aca-subsidy'), label: 'ACA subsidy estimator' },
      { href: hubPath('insurance', '/tools/license-verification'), label: 'License verification' },
    ],
  },
  directories: {
    hub: 'insurance',
    section: 'directories',
    eyebrow: 'Insurance Trust Hub · Directory',
    title: 'Licensed insurance agency directory',
    description:
      'Search DOI-screened agencies by state, coverage type, and specialty. Zero paid placements.',
    primaryCta: {
      href: hubPath('insurance', '/directory'),
      label: 'Search agencies',
    },
    secondaryCta: {
      href: hubPath('insurance', '/hubs/browse'),
      label: 'Browse health hubs',
    },
    links: [
      { href: hubPath('insurance', '/hubs'), label: 'Market hubs' },
      { href: hubPath('insurance', '/providers'), label: 'Featured providers' },
      { href: hubPath('insurance', '/destinations/florida'), label: 'Florida guide' },
    ],
  },
  compare: {
    hub: 'insurance',
    section: 'compare',
    eyebrow: 'Insurance Trust Hub · Compare',
    title: 'Compare coverage options',
    description: 'Side-by-side educational comparisons — not a quote engine.',
    primaryCta: {
      href: hubPath('insurance', '/resources/medicare-advantage-vs-medigap'),
      label: 'Medicare comparison',
    },
    links: [
      { href: hubPath('insurance', '/resources/independent-vs-captive'), label: 'Independent vs captive agents' },
      { href: hubPath('insurance', '/resources/auto-insurance-costs-by-state'), label: 'Auto costs by state' },
    ],
  },
};

export const LENDER_SECTION_PRESETS: Partial<Record<HubSectionPreset['section'], HubSectionPreset>> = {
  resources: {
    hub: 'lender',
    section: 'resources',
    eyebrow: 'Lender Trust Hub · Guides',
    title: 'Mortgage lender resources & guides',
    description:
      'Independent guides on NMLS verification, lender comparison, and home financing decisions. Educational content only — verify licensing through NMLS Consumer Access.',
    primaryCta: {
      href: hubPath('lender', '/resources'),
      label: 'Browse all guides',
    },
    secondaryCta: {
      href: hubPath('lender', '/local-lenders'),
      label: 'Lender directory',
    },
    links: [
      {
        href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
        label: 'How to choose a mortgage lender',
        description: 'Key factors, red flags & comparison tips for 2026',
      },
      {
        href: hubPath('lender', '/compare'),
        label: 'Side-by-side lender comparison',
      },
      {
        href: hubPath('lender', '/about#nmls'),
        label: 'NMLS verification guide',
      },
    ],
    faq: [
      {
        question: 'Does Lender Trust Hub originate loans?',
        answer:
          'No. We are an independent directory and education site. NMLS-registered lenders and brokers are listed for research — always verify licensing through NMLS Consumer Access.',
      },
    ],
  },
  calculators: {
    hub: 'lender',
    section: 'calculators',
    eyebrow: 'Lender Trust Hub · Tools',
    title: 'Mortgage & home-finance calculators',
    description: 'Free PITI, affordability, refinance, and rent-vs-buy tools with NMLS-verified lender matching.',
    primaryCta: { href: hubPath('lender', '/calculators'), label: 'Open calculator hub' },
    secondaryCta: { href: hubPath('lender', '/local-lenders'), label: 'Find lenders' },
    links: [
      { href: `${hubPath('lender', '/calculators')}?calc=payment`, label: 'Mortgage payment' },
      { href: `${hubPath('lender', '/calculators')}?calc=affordability`, label: 'Affordability' },
      { href: `${hubPath('lender', '/calculators')}?calc=refinance`, label: 'Refinance savings' },
    ],
  },
  directories: {
    hub: 'lender',
    section: 'directories',
    eyebrow: 'Lender Trust Hub · Directory',
    title: 'Mortgage lender directories',
    description: 'NMLS-verified lenders by state, county cluster, FDIC banks, and auto loan providers.',
    primaryCta: { href: hubPath('lender', '/local-lenders'), label: 'Local lenders' },
    links: [
      { href: hubPath('lender', '/fdic-insured-banks'), label: 'FDIC insured banks' },
      { href: hubPath('lender', '/auto-loan-companies'), label: 'Auto loan companies' },
      { href: hubPath('lender', '/compare'), label: 'Compare lenders' },
    ],
  },
};