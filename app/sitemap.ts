import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug, getMarketPath } from '@/lib/destinations/markets';
import {
  CITY_HUBS_CONTENT_UPDATED,
  DESTINATION_CLUSTERS_CONTENT_UPDATED,
} from '@/lib/seo/content-dates';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();
  const autoTransportCompanies = await getAllAutoTransportCompanies();

  const resourcePages = [
    '/resources/move-size-weight',
    '/resources/carrier-vs-broker',
    '/resources/how-to-choose',
    '/resources/fmcsa',
    '/resources/scams',
    '/resources/checklist',
    '/resources/packing-checklist',
    '/resources/routes',
    '/resources/routes/california-to-texas',
    '/resources/routes/los-angeles-to-dallas-fort-worth',
    '/resources/routes/san-francisco-to-austin',
    '/resources/routes/san-diego-to-houston',
    '/resources/routes/new-york-to-texas',
    '/resources/routes/new-york-to-florida',
    '/resources/routes/california-to-new-york',
    '/resources/routes/florida-to-new-york',
    '/resources/routes/texas-to-california',
    '/resources/routes/east-coast-to-west-coast',
    '/resources/routes/new-york-to-myrtle-beach',
    '/resources/guides/moving-to-myrtle-beach-2026',
  ];

  const staticPages = [
    '',
    '/companies',
    '/local-movers',
    '/moving-to',
    '/moving-to/south-carolina',
    '/moving-to/north-carolina',
    '/moving-to/florida',
    '/moving-to/tennessee',
    '/moving-to/texas',
    '/moving-to/idaho',
    '/moving-to/oregon',
    '/moving-to/oklahoma',
    '/moving-to/arizona',
    '/moving-to/arkansas',
    '/moving-to/california',
    '/moving-to/alabama',
    '/moving-to/virginia',
    '/auto-transport',
    '/moving-calculator',
    '/compare',
    '/resources',
    '/about',
    '/contact',
    ...resourcePages,
  ].map((route) => {
    const isCluster = route.startsWith('/moving-to/') && route !== '/moving-to';
    return {
      url: `https://www.movetrusthub.com${route}`,
      lastModified: isCluster ? DESTINATION_CLUSTERS_CONTENT_UPDATED : new Date(),
      changeFrequency: 'weekly' as const,
      priority:
        route === ''
          ? 1
          : route === '/local-movers'
            ? 0.9
            : isCluster
              ? 0.88
              : 0.8,
    };
  });

  const companyPages = companies.map((company) => ({
    url: `https://www.movetrusthub.com/companies/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const destinationPages = getPublishedCityHubSlugs()
    .map((slug) => getMarketBySlug(slug))
    .filter((market): market is NonNullable<typeof market> => Boolean(market))
    .map((market) => ({
      url: `https://www.movetrusthub.com${getMarketPath(market)}`,
      lastModified: CITY_HUBS_CONTENT_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    }));

  const autoTransportPages = autoTransportCompanies.map((company) => ({
    url: `https://www.movetrusthub.com/auto-transport/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...destinationPages, ...companyPages, ...autoTransportPages];
}
