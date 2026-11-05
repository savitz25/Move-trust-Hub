import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import { MetadataRoute } from 'next';
import { getAllAutoTransportCompanies, getIndexableCompanySitemapEntries } from '@/lib/data-server';
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
  DESTINATION_CLUSTERS_CONTENT_UPDATED,
  RESOURCES_CONTENT_UPDATED,
} from '@/lib/seo/content-dates';
import { getMovingCompanySlugsForSitemap } from '@/lib/reviews/bridge';
import {
  getCityHubSitemapPriority,
  getRouteGuideSitemapPriority,
} from '@/lib/seo/sitemap-priority';
import { isEnrichedCompanyProfile } from '@/lib/seo/company-index-eligibility';
import { isGates014HeldSlug } from '@/lib/seo/gates-014-hold';
import { evaluateCityHubIndexability } from '@/lib/seo/city-indexability';
import { isForbiddenMoveSitemapPath } from '@/lib/seo/move-sitemap-paths';
import { rowLastModified } from '@/lib/seo/sitemap-lastmod';

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
  // Never fail the whole sitemap (or CI prerender) on a bad local Supabase URL.
  let companySitemap: Awaited<ReturnType<typeof getIndexableCompanySitemapEntries>> = [];
  let autoTransportCompanies: Awaited<ReturnType<typeof getAllAutoTransportCompanies>> = [];
  try {
    companySitemap = await getIndexableCompanySitemapEntries();
  } catch {
    companySitemap = [];
  }
  try {
    autoTransportCompanies = await getAllAutoTransportCompanies();
  } catch {
    autoTransportCompanies = [];
  }

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

  // Lender + Insurance are standalone apexes — never list /lender or /insurance on Move sitemap.
  const coreStaticRoutes = [
    '',
    '/companies',
    '/states',
    ...STATEWIDE_ROUTES,
    '/local-movers',
    '/moving-to',
    ...clusterRoutes,
    '/auto-transport',
    '/moving-calculator',
    '/tools/move-quote-check',
    '/tools/move-quote-check/compare',
    '/verify-dot',
    '/review',
    '/compare',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    ...resourceRoutes,
  ];

  const staticPages = coreStaticRoutes
    .filter((route) => !isForbiddenMoveSitemapPath(route))
    .map((route) => {
    const isCluster = route.startsWith('/moving-to/') && route !== '/moving-to';
    const isResource =
      route.startsWith('/resources') || route === '/moving-calculator';
    const lastModified = isCluster
      ? DESTINATION_CLUSTERS_CONTENT_UPDATED
      : isResource
        ? RESOURCES_CONTENT_UPDATED
        : undefined;

    return {
      url: `${SITE}${route}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'weekly' as const,
      priority:
        route === ''
          ? 1
        : route === '/local-movers' || route === '/california' || route === '/connecticut' || route === '/maryland' || route === '/wisconsin' || route === '/utah' || route === '/new-mexico' || route === '/idaho' || route === '/west-virginia' || route === '/montana' || route === '/indiana' || route === '/alabama' || route === '/louisiana' || route === '/kentucky' || route === '/south-carolina' || route === '/mississippi' || route === '/oklahoma' || route === '/missouri' || route === '/iowa' || route === '/arkansas' || route === '/nebraska' || route === '/florida' || route === '/georgia' || route === '/massachusetts' || route === '/tennessee' || route === '/nevada' || route === '/minnesota' || route === '/michigan' || route === '/new-jersey' || route === '/texas' || route === '/washington' || route === '/colorado' || route === '/virginia' || route === '/new-york' || route === '/illinois' || route === '/oregon' || route === '/pennsylvania' || route === '/north-carolina' || route === '/ohio'
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
                    route === '/resources/best-time-to-move' ||
                    route === '/resources/interstate-moving-insurance' ||
                    route === '/resources/interstate-moving-damage-claims'
                  ? 0.9
                  : route === '/moving-calculator'
                    ? 0.87
                  : isCluster
                    ? 0.88
                    : 0.8,
    };
  });

  const companyPages = companySitemap.flatMap((company) => {
    if (isForbiddenMoveSitemapPath(`/companies/${company.slug}`)) return [];
    const lastModified = rowLastModified(company.lastUpdated);
    return [{
      url: `${SITE}/companies/${company.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }];
  });

  const destinationPages = getPublishedCityHubSlugs()
    .map((slug) => getMarketBySlug(slug))
    .filter((market): market is NonNullable<typeof market> => Boolean(market))
    .filter((market) => evaluateCityHubIndexability(market).tier === 'index')
    .filter((market) => !isForbiddenMoveSitemapPath(getMarketPath(market)))
    .map((market) => ({
      url: `${SITE}${getMarketPath(market)}`,
      changeFrequency: 'weekly' as const,
      priority: getCityHubSitemapPriority(market.priority, market.slug),
    }));

  const autoTransportPages = autoTransportCompanies
    .filter((company) => isEnrichedCompanyProfile(company))
    .map((company) => {
    const lastModified = rowLastModified(company.lastUpdated);
    return {
    url: `${SITE}/auto-transport/${company.slug}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  };
  });

  const reviewCompanyPages = (await getMovingCompanySlugsForSitemap()).flatMap((row) => {
    const path = `/company/${row.slug}`;
    if (isGates014HeldSlug(row.slug) || isForbiddenMoveSitemapPath(path)) return [];
    const lastModified = rowLastModified(row.updated_at);
    return [{
      url: `${SITE}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }];
  });

  return [
    ...staticPages,
    ...destinationPages,
    ...companyPages,
    ...reviewCompanyPages,
    ...autoTransportPages,
  ];
}
