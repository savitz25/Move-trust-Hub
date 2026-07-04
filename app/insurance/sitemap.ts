import type { MetadataRoute } from 'next';
import { DESTINATION_STATES } from '@/lib/insurance/destinations/data';
import { ARTICLES } from '@/lib/insurance/resources/articles';
import { FALLBACK_PROVIDERS } from '@/lib/insurance/providers/fallback-data';
import { INSURANCE_HUBS, getAllStateSlugs } from '@/lib/insurance/hubs/registry';
import { SPECIALTY_TOPICS } from '@/lib/insurance/hubs/specialty-topics';
import { hubSitemapEntry } from '@/lib/hub/sitemap-helpers';

const HUB = 'insurance' as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/directory',
    '/destinations',
    '/resources',
    '/tools',
    '/providers',
    '/hubs',
    '/hubs/browse',

    '/hubs/health-insurance',
    '/hubs/medicare',
    '/hubs/aca',
    '/calculators',
    '/calculators/premium-estimator',
    '/calculators/medicare-gap',
    '/calculators/aca-subsidy',
    '/tools/cost-estimator',
    '/tools/needs-assessment',
    '/tools/license-verification',
    '/tools/quote-comparison',
    '/tools/medicare-plan-finder',
    '/tools/aca-eligibility-checker',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const staticRoutes = staticPaths.map((path) =>
    hubSitemapEntry(HUB, path, {
      priority: path === '/' ? 0.92 : path.startsWith('/hubs') ? 0.9 : 0.85,
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

  return [
    ...staticRoutes,
    ...browseStates,
    ...specialtyTopics,
    ...destinationStates,
    ...destinationCities,
    ...articles,
    ...providers,
    ...hubPages,
    ...hubStatePages,
  ];
}