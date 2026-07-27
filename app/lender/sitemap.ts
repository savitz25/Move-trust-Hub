import type { MetadataRoute } from 'next';
import { lenders } from '@/lib/lender/mockData';
import { stateData } from '@/lib/lender/fdic/stateData';
import { getStateSlugsWithLenders } from '@/lib/lender/mortgage/stateLenders';
import { getAllClusterParams } from '@/lib/lender/clusters/registry';
import { shouldIndexLenderCluster } from '@/lib/hub/indexability';
import { finalizeHubSitemap, hubSitemapEntry } from '@/lib/hub/sitemap-helpers';

const HUB = 'lender' as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-07-02');

  // Phase 0: omit Class D URLs (redundant legal, auto-loan thin vertical).
  // Empty/thin local-lender counties excluded via shouldIndexLenderCluster.
  const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/calculators',
    '/compare',
    '/local-lenders',
    '/fdic-insured-banks',
    '/resources',
    '/resources/first-time-homebuyer-programs',
    '/resources/how-to-choose-mortgage-lender',
    '/resources/fixed-vs-adjustable-rate-mortgages',
  ];

  const staticRoutes = staticPaths.map((path) =>
    hubSitemapEntry(HUB, path, {
      lastModified: now,
      priority: path === '/' ? 0.92 : path === '/local-lenders' ? 0.9 : 0.85,
    })
  );

  const fdicStates = Object.keys(stateData).map((state) =>
    hubSitemapEntry(HUB, `/fdic-insured-banks/${state}`, { lastModified: now, priority: 0.8 })
  );

  const mortgageStates = getStateSlugsWithLenders().map((state) =>
    hubSitemapEntry(HUB, `/local-lenders/${state}`, { lastModified: now, priority: 0.88 })
  );

  const clusters = getAllClusterParams()
    .filter(({ state, cluster }) => shouldIndexLenderCluster(state, cluster))
    .map(({ state, cluster }) =>
      hubSitemapEntry(HUB, `/local-lenders/${state}/${cluster}`, { lastModified: now, priority: 0.82 })
    );

  const profiles = lenders.map((l) =>
    hubSitemapEntry(HUB, `/lenders/${l.slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );

  return finalizeHubSitemap(HUB, [
    ...staticRoutes,
    ...fdicStates,
    ...mortgageStates,
    ...clusters,
    ...profiles,
  ]);
}