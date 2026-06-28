import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterParentMarkets,
  getMarketBySlug,
  getMarketPath,
} from '@/lib/destinations/markets';
import { destinationGuides } from '@/lib/resources/destination-guides';
import { guides } from '@/lib/resources/guides';
import { routeGuides } from '@/lib/resources/routes';
import {
  CITY_HUBS_CONTENT_UPDATED,
  DESTINATION_CLUSTERS_CONTENT_UPDATED,
  RESOURCES_CONTENT_UPDATED,
} from '@/lib/seo/content-dates';

const SITE = 'https://www.movetrusthub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();
  const autoTransportCompanies = await getAllAutoTransportCompanies();

  const clusterRoutes = getClusterParentMarkets().map(
    (market) => `/moving-to/${market.slug}`
  );

  const resourceRoutes = [
    '/resources',
    ...guides.map((guide) => guide.href),
    '/resources/routes',
    ...routeGuides.map((route) => `/resources/routes/${route.slug}`),
    ...destinationGuides.map((guide) => `/resources/guides/${guide.slug}`),
  ];

  const coreStaticRoutes = [
    '',
    '/companies',
    '/local-movers',
    '/moving-to',
    ...clusterRoutes,
    '/auto-transport',
    '/moving-calculator',
    '/compare',
    '/about',
    '/contact',
    ...resourceRoutes,
  ];

  const staticPages = coreStaticRoutes.map((route) => {
    const isCluster = route.startsWith('/moving-to/') && route !== '/moving-to';
    const isResource =
      route.startsWith('/resources') || route === '/moving-calculator';

    return {
      url: `${SITE}${route}`,
      lastModified: isCluster
        ? DESTINATION_CLUSTERS_CONTENT_UPDATED
        : isResource
          ? RESOURCES_CONTENT_UPDATED
          : new Date(),
      changeFrequency: 'weekly' as const,
      priority:
        route === ''
          ? 1
          : route === '/local-movers'
            ? 0.9
            : route.startsWith('/resources/guides/')
              ? 0.9
              : route.startsWith('/resources/routes/')
                ? 0.85
                : route === '/resources/interstate-moving-costs'
                  ? 0.9
                  : isCluster
                    ? 0.88
                    : 0.8,
    };
  });

  const companyPages = companies.map((company) => ({
    url: `${SITE}/companies/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const destinationPages = getPublishedCityHubSlugs()
    .map((slug) => getMarketBySlug(slug))
    .filter((market): market is NonNullable<typeof market> => Boolean(market))
    .map((market) => ({
      url: `${SITE}${getMarketPath(market)}`,
      lastModified: CITY_HUBS_CONTENT_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    }));

  const autoTransportPages = autoTransportCompanies.map((company) => ({
    url: `${SITE}/auto-transport/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...destinationPages, ...companyPages, ...autoTransportPages];
}