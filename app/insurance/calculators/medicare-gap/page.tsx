import type { Metadata } from 'next';
import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';
import { insuranceHref } from '@/lib/insurance/paths';
import { CalculatorPageShell } from '@/components/calculators/calculator-page-shell';
import { MedicareGapCalculator } from '@/components/insurance/calculators/medicare-gap-calculator';

export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'Medicare Coverage Gap Analyzer',
  description:
    'Identify Medicare and health insurance gaps when moving, retiring, or losing employer coverage.',
  path: '/calculators/medicare-gap',
});

const FAQ = [
  {
    question: 'What is a Medicare coverage gap?',
    answer:
      'A coverage gap occurs when you lose employer or marketplace coverage before Medicare begins, or when moving states leaves you without a valid plan in your new ZIP code.',
  },
  {
    question: 'Does this tool replace advice from a licensed agent?',
    answer:
      'No. This analyzer highlights common transition scenarios for educational planning. Always confirm enrollment windows and plan options with a licensed Medicare or health insurance agent.',
  },
  {
    question: 'When should I run this before a move?',
    answer:
      'Run it 60–90 days before your move date so you can coordinate Special Enrollment Periods, COBRA timelines, and Medicare Part B effective dates without a lapse.',
  },
];

export default function MedicareGapPage() {
  return (
    <CalculatorPageShell
      title="Medicare Coverage Gap Analyzer"
      description="Identify potential coverage gaps when moving states, aging into Medicare, or transitioning from employer plans. Educational guidance for common transition scenarios — not medical or legal advice."
      methodology={[
        'Maps common life events (job change, retirement, interstate move) to typical Medicare and ACA enrollment windows.',
        'Flags overlapping or missing coverage periods based on your stated transition date and current plan type.',
        'Does not access CMS, SSA, or carrier systems — outputs are planning prompts only.',
        'Cross-check results with Medicare.gov, your state DOI, and a licensed agent before changing coverage.',
      ]}
      faq={FAQ}
      breadcrumbs={[
        { label: 'Insurance', href: insuranceHref('/') },
        { label: 'Calculators', href: insuranceHref('/calculators') },
        { label: 'Medicare Gap' },
      ]}
    >
      <MedicareGapCalculator />
    </CalculatorPageShell>
  );
}