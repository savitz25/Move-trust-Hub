import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildMetadata } from '@/lib/insurance/seo/metadata';

/** Legacy URL — planner is the flagship total-cost experience. */
export const metadata: Metadata = buildMetadata({
  title: 'Insurance Quote Comparison → Cost & Coverage Planner',
  description:
    'Redirects to the Insurance Cost & Coverage Planner for ACA total-cost scenarios.',
  path: '/tools/quote-comparison',
});

export default function QuoteComparisonPage() {
  redirect('/tools/cost-estimator');
}
