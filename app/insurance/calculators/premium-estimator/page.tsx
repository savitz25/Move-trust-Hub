import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';

/**
 * Legacy multi-line premium lookup — replaced by the ACA Cost & Coverage Planner.
 * Keep URL for bookmarks/SEO; permanent product home is /tools/cost-estimator.
 */
export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'Insurance Premium Estimator → Cost & Coverage Planner',
  description:
    'Redirects to the Insurance Cost & Coverage Planner (ACA total-cost scenarios).',
  path: '/calculators/premium-estimator',
});

export default function PremiumEstimatorPage() {
  redirect('/tools/cost-estimator');
}
