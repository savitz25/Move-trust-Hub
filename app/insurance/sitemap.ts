import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/insurance/constants';
import { DESTINATION_STATES } from '@/lib/insurance/destinations/data';
import { ARTICLES } from '@/lib/insurance/resources/articles';
import { FALLBACK_PROVIDERS } from '@/lib/insurance/providers/fallback-data';
import { INSURANCE_HUBS, getAllStateSlugs } from '@/lib/insurance/hubs/registry';
import { SPECIALTY_TOPICS } from '@/lib/insurance/hubs/specialty-topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/directory',
    '/destinations',
    '/resources',
    '/tools',
    '/providers',
    '/hubs',
    '/hubs/browse',
    '/hubs/south-florida',
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
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'weekly',
    priority: path === '' ? 0.92 : path.startsWith('/hubs') ? 0.9 : 0.85,
  }));

  const browseStates = getAllStateSlugs().map((state) => ({
    url: `${SITE_URL}/hubs/browse/${state}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const specialtyTopics = SPECIALTY_TOPICS.map((topic) => ({
    url: `${SITE_URL}${topic.path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const destinationStates = DESTINATION_STATES.map((state) => ({
    url: `${SITE_URL}/destinations/${state.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const destinationCities = DESTINATION_STATES.flatMap((state) =>
    state.cities.map((city) => ({
      url: `${SITE_URL}/destinations/${state.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  const articles = ARTICLES.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const providers = FALLBACK_PROVIDERS.map((p) => ({
    url: `${SITE_URL}/providers/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const hubPages = INSURANCE_HUBS.map((hub) => ({
    url: `${SITE_URL}/hubs/${hub.stateSlug}/${hub.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: hub.priority <= 10 ? 0.9 : 0.85,
  }));

  const hubStatePages = getAllStateSlugs().map((state) => ({
    url: `${SITE_URL}/hubs/${state}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

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