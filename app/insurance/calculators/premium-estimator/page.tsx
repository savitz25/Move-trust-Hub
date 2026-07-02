import type { Metadata } from 'next';
import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';
import { insuranceHref } from '@/lib/insurance/paths';
import { CalculatorPageShell } from '@/components/calculators/calculator-page-shell';
import { CostEstimatorTool } from '@/components/insurance/tools/cost-estimator-tool';

export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'Insurance Premium Estimator (2026)',
  description:
    'Estimate auto, health, homeowners, and Medicare premium ranges by state. Estimates only.',
  path: '/calculators/premium-estimator',
});

const FAQ = [
  {
    question: 'Are these premium ranges actual quotes?',
    answer:
      'No. The estimator uses seeded average premium bands by state and coverage type. Licensed agents provide binding quotes after reviewing your full profile.',
  },
  {
    question: 'Which coverage types are included?',
    answer:
      'Auto, homeowners, health (ACA marketplace), and Medicare Advantage/Supplement ranges are modeled separately so you can compare line items.',
  },
  {
    question: 'Why do premiums vary by ZIP code?',
    answer:
      'Rating areas, local claims costs, provider networks, and state mandates all affect premiums. Always verify with carriers licensed in your destination state.',
  },
];

export default function PremiumEstimatorPage() {
  return (
    <CalculatorPageShell
      title="Insurance Premium Estimator"
      description="Estimate auto, homeowners, health, and Medicare premium ranges by state and profile. Seeded averages for educational comparison — verify every figure with licensed agents before enrolling."
      methodology={[
        'Uses 2026 seeded average premium bands by state, age tier, and coverage type from public rate-filing summaries.',
        'Health and Medicare outputs are ranges, not plan-specific premiums — metal tier and network choice shift results significantly.',
        'Auto and homeowners estimates assume standard deductibles; actual quotes depend on driving record, claims history, and dwelling details.',
        'Insurance Trust Hub is independent — we do not sell policies or receive carrier commissions.',
      ]}
      faq={FAQ}
      breadcrumbs={[
        { label: 'Insurance', href: insuranceHref('/') },
        { label: 'Calculators', href: insuranceHref('/calculators') },
        { label: 'Premium Estimator' },
      ]}
    >
      <CostEstimatorTool />
    </CalculatorPageShell>
  );
}