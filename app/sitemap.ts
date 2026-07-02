import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data-server';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterParentMarkets,
  getMarketBySlug,
  getMarketPath,
} from '@/lib/destinations/markets';
import { destinationGuides } from '@/lib/resources/destination-guides';
import { guides } from '@/lib/resources/guides';
import { routeGuides } from '@/lib/resources/routes';
import { getExtendedRouteSlugs } from '@/lib/resources/routes/content';
import {
  CITY_HUBS_CONTENT_UPDATED,
  DESTINATION_CLUSTERS_CONTENT_UPDATED,
  RESOURCES_CONTENT_UPDATED,
} from '@/lib/seo/content-dates';
import { getMovingCompanySlugsForSitemap } from '@/lib/reviews/bridge';
import {
  getCityHubSitemapPriority,
  getRouteGuideSitemapPriority,
} from '@/lib/seo/sitemap-priority';

const SITE = 'https://www.movetrusthub.com';

/** High-intent corridor guides — elevated sitemap priority */
const PRIORITY_ROUTE_SLUGS = new Set([
  'california-to-texas',
  'california-to-florida',
  'california-to-arizona',
  'california-to-new-york',
  'new-york-to-texas',
  'new-york-to-florida',
  'new-york-to-myrtle-beach',
  'florida-to-new-york',
  'new-jersey-to-florida',
  'new-jersey-to-texas',
  'pennsylvania-to-florida',
  'massachusetts-to-florida',
  'illinois-to-texas',
  'texas-to-california',
  'east-coast-to-west-coast',
  'los-angeles-to-dallas-fort-worth',
  'san-francisco-to-austin',
  'san-diego-to-houston',
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const extendedRouteSlugs = new Set(getExtendedRouteSlugs());
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

  const hubLandingRoutes = [
    '/lender',
    '/insurance',
    '/lender/local-lenders',
    '/lender/calculators',
    '/lender/fdic-insured-banks',
    '/lender/about',
    '/insurance/directory',
    '/insurance/hubs',
    '/insurance/hubs/browse',
    '/insurance/calculators',
    '/insurance/about',
  ];

  const coreStaticRoutes = [
    '',
    ...hubLandingRoutes,
    '/companies',
    '/local-movers',
    '/moving-to',
    ...clusterRoutes,
    '/auto-transport',
    '/moving-calculator',
    '/verify-dot',
    '/review',
    '/compare',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
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
          : route === '/lender' || route === '/insurance'
            ? 0.92
            : route.startsWith('/lender/') || route.startsWith('/insurance/')
              ? 0.88
          : route === '/local-movers'
            ? 0.9
            : route === '/verify-dot' || route === '/review'
              ? 0.88
            : route.startsWith('/resources/guides/')
              ? 0.9
              : route.startsWith('/resources/routes/')
                ? getRouteGuideSitemapPriority(
                    route.replace('/resources/routes/', ''),
                    extendedRouteSlugs.has(route.replace('/resources/routes/', ''))
                  )
                : route === '/resources/interstate-moving-costs' ||
                    route === '/resources/best-time-to-move'
                  ? 0.9
                  : route === '/moving-calculator'
                    ? 0.87
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
      priority: getCityHubSitemapPriority(market.priority, market.slug),
    }));

  const autoTransportPages = autoTransportCompanies.map((company) => ({
    url: `${SITE}/auto-transport/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const reviewCompanyPages = (await getMovingCompanySlugsForSitemap()).map((row) => ({
    url: `${SITE}/company/${row.slug}`,
    lastModified: new Date(row.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...destinationPages,
    ...companyPages,
    ...reviewCompanyPages,
    ...autoTransportPages,
  ];
}