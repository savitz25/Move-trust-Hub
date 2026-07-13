import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';
import type { Metadata } from 'next';
import { HubPageView } from '@/components/insurance/hub-page-view';
import { getSouthFloridaHub } from '@/lib/insurance/hubs/specialty-topics';
import { SITE_URL } from '@/lib/insurance/constants';

const hub = getSouthFloridaHub();

export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'South Florida Insurance Agents (2026) | Miami-Dade, Broward & Palm Beach',
  description: 'Compare 12 verified health insurance agents across South Florida tri-county. Medicare Advantage, ACA, supplement plans — FL DFS verified.',
  path: '/hubs/south-florida',
});

export default function SouthFloridaHubPage() {
  return <HubPageView hub={hub} canonicalPath="/hubs/south-florida" />;
}