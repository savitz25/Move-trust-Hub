/**
 * Dedicated InsuranceTrustHub sitemap entries — insurancetrusthub.com URLs only.
 * Used by app/insurance/sitemap.ts and host-aware root sitemap fallback.
 */
import type { MetadataRoute } from 'next';
import { DESTINATION_STATES } from '@/lib/insurance/destinations/data';
import { ARTICLES } from '@/lib/insurance/resources/articles';
import { FALLBACK_PROVIDERS } from '@/lib/insurance/providers/fallback-data';
import { INSURANCE_HUBS, getAllStateSlugs } from '@/lib/insurance/hubs/registry';
import { SPECIALTY_TOPICS } from '@/lib/insurance/hubs/specialty-topics';
import { finalizeHubSitemap, hubSitemapEntry } from '@/lib/hub/sitemap-helpers';

const HUB = 'insurance' as const;

/** Canonical public paths only — no 301 targets, no Move URLs, no /insurance prefix. */
const STATIC_PATHS: Array<{ path: string; priority: number; changeFrequency?: 'daily' | 'weekly' }> =
  [
    { path: '/', priority: 1, changeFrequency: 'daily' },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/directory', priority: 0.9 },
    { path: '/providers', priority: 0.75 },
    { path: '/hubs', priority: 0.9 },
    { path: '/hubs/browse', priority: 0.8 },
    { path: '/tools', priority: 0.95 },
    { path: '/tools/cost-estimator', priority: 0.95 },
    { path: '/tools/needs-assessment', priority: 0.85 },
    { path: '/tools/license-verification', priority: 0.85 },
    { path: '/tools/medicare-plan-finder', priority: 0.9 },
    { path: '/tools/medicare-provider-lookup', priority: 0.95 },
    { path: '/calculators', priority: 0.85 },
    { path: '/calculators/aca-subsidy', priority: 0.95 },
    { path: '/calculators/premium-estimator', priority: 0.75 },
    { path: '/calculators/medicare-gap', priority: 0.75 },
    { path: '/data/plan-complaint-index', priority: 0.95 },
    { path: '/data/counties', priority: 0.9 },
    { path: '/data/counties/miami-dade-fl', priority: 0.9 },
    { path: '/data/counties/broward-fl', priority: 0.9 },
    { path: '/data/counties/palm-beach-fl', priority: 0.9 },
    { path: '/resources', priority: 0.8 },
    { path: '/destinations', priority: 0.75 },
    { path: '/tools/prescription-drug-list', priority: 0.7 },
  ];

export function generateInsuranceSitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_PATHS.map(({ path, priority, changeFrequency }) =>
    hubSitemapEntry(HUB, path, {
      priority,
      changeFrequency: changeFrequency ?? 'weekly',
    })
  );

  const browseStates = getAllStateSlugs().map((state) =>
    hubSitemapEntry(HUB, `/hubs/browse/${state}`, { priority: 0.8 })
  );

  const specialtyTopics = SPECIALTY_TOPICS.map((topic) =>
    hubSitemapEntry(HUB, `/hubs/${topic.slug}`, { priority: 0.85 })
  );

  const destinationStates = DESTINATION_STATES.map((state) =>
    hubSitemapEntry(HUB, `/destinations/${state.slug}`, {
      lastModified: new Date(),
      priority: 0.75,
    })
  );

  const destinationCities = DESTINATION_STATES.flatMap((state) =>
    state.cities.map((city) =>
      hubSitemapEntry(HUB, `/destinations/${state.slug}/${city.slug}`, { priority: 0.7 })
    )
  );

  const articles = ARTICLES.map((article) =>
    hubSitemapEntry(HUB, `/resources/${article.slug}`, {
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly',
      priority: article.variant === 'comparison' ? 0.85 : 0.8,
    })
  );

  const providers = FALLBACK_PROVIDERS.map((p) =>
    hubSitemapEntry(HUB, `/providers/${p.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  );

  const hubPages = INSURANCE_HUBS.map((hub) =>
    hubSitemapEntry(HUB, `/hubs/${hub.stateSlug}/${hub.slug}`, {
      priority: hub.priority <= 10 ? 0.9 : 0.85,
    })
  );

  const hubStatePages = getAllStateSlugs().map((state) =>
    hubSitemapEntry(HUB, `/hubs/${state}`, { priority: 0.8 })
  );

  return finalizeHubSitemap(HUB, [
    ...staticRoutes,
    ...browseStates,
    ...specialtyTopics,
    ...destinationStates,
    ...destinationCities,
    ...articles,
    ...providers,
    ...hubPages,
    ...hubStatePages,
  ]);
}

/** Counts for QA / deploy reports — by path prefix. */
export function countInsuranceSitemapBySection(
  entries: MetadataRoute.Sitemap = generateInsuranceSitemap()
): Record<string, number> {
  const counts: Record<string, number> = {
    home: 0,
    about_contact_legal: 0,
    directory_providers: 0,
    hubs: 0,
    tools: 0,
    calculators: 0,
    data: 0,
    resources: 0,
    destinations: 0,
    other: 0,
  };

  for (const e of entries) {
    const path = e.url.replace(/^https?:\/\/[^/]+/, '') || '/';
    if (path === '/') counts.home++;
    else if (
      path === '/about' ||
      path === '/contact' ||
      path === '/privacy' ||
      path === '/terms'
    )
      counts.about_contact_legal++;
    else if (path.startsWith('/directory') || path.startsWith('/providers'))
      counts.directory_providers++;
    else if (path.startsWith('/hubs')) counts.hubs++;
    else if (path.startsWith('/tools')) counts.tools++;
    else if (path.startsWith('/calculators')) counts.calculators++;
    else if (path.startsWith('/data')) counts.data++;
    else if (path.startsWith('/resources')) counts.resources++;
    else if (path.startsWith('/destinations')) counts.destinations++;
    else counts.other++;
  }

  return counts;
}
