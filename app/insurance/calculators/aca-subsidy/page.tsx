import type { Metadata } from 'next';
import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';
import { insuranceHref } from '@/lib/insurance/paths';
import { CalculatorPageShell } from '@/components/calculators/calculator-page-shell';
import { AcaSubsidyCalculator } from '@/components/insurance/calculators/aca-subsidy-calculator';

export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'ACA Subsidy Estimator (2026)',
  description: 'Estimate marketplace premium tax credits by income and household size. Educational tool only.',
  path: '/calculators/aca-subsidy',
});

const FAQ = [
  {
    question: 'Is this an official Healthcare.gov subsidy calculation?',
    answer:
      'No. This is an educational estimator. Official premium tax credits are determined on HealthCare.gov or your state marketplace using current federal poverty level tables.',
  },
  {
    question: 'What inputs affect my ACA subsidy estimate?',
    answer:
      'Household size, modified adjusted gross income, ZIP code, and plan metal tier all influence subsidy eligibility and amount.',
  },
];

export default function AcaSubsidyPage() {
  return (
    <CalculatorPageShell
      title="ACA Subsidy Estimator"
      description="Rough 2026 estimate of marketplace premium tax credits by income and household size. Use before open enrollment to compare metal tiers with licensed agents in your market."
      methodology={[
        'Uses simplified federal poverty level brackets for educational planning — not IRS tax filing logic.',
        'Subsidy amounts vary by ZIP rating area and plan selection on the ACA marketplace.',
        'Results do not constitute tax, legal, or enrollment advice.',
      ]}
      faq={FAQ}
      breadcrumbs={[
        { label: 'Insurance', href: insuranceHref('/') },
        { label: 'Calculators', href: insuranceHref('/calculators') },
        { label: 'ACA Subsidy' },
      ]}
    >
      <AcaSubsidyCalculator />
    </CalculatorPageShell>
  );
}