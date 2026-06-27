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
    '/resources/interstate-moving-costs',
    '/resources/carrier-vs-broker',
    '/resources/how-to-choose',
    '/resources/fmcsa',
    '/resources/scams',
    '/resources/checklist',
    '/resources/packing-checklist',
    '/resources/routes',
    '/resources/routes/california-to-oregon',
    '/resources/routes/california-to-washington',
    '/resources/routes/california-to-idaho',
    '/resources/routes/california-to-wyoming',
    '/resources/routes/california-to-texas',
    '/resources/routes/california-to-arizona',
    '/resources/routes/california-to-north-carolina',
    '/resources/routes/california-to-south-carolina',
    '/resources/routes/california-to-florida',
    '/resources/routes/california-to-tennessee',
    '/resources/routes/los-angeles-to-dallas-fort-worth',
    '/resources/routes/san-francisco-to-austin',
    '/resources/routes/san-diego-to-houston',
    '/resources/routes/new-york-to-texas',
    '/resources/routes/new-jersey-to-south-carolina',
    '/resources/routes/new-jersey-to-florida',
    '/resources/routes/new-jersey-to-georgia',
    '/resources/routes/new-jersey-to-texas',
    '/resources/routes/pennsylvania-to-south-carolina',
    '/resources/routes/pennsylvania-to-north-carolina',
    '/resources/routes/pennsylvania-to-florida',
    '/resources/routes/pennsylvania-to-texas',
    '/resources/routes/massachusetts-to-south-carolina',
    '/resources/routes/massachusetts-to-north-carolina',
    '/resources/routes/massachusetts-to-georgia',
    '/resources/routes/massachusetts-to-tennessee',
    '/resources/routes/massachusetts-to-florida',
    '/resources/routes/massachusetts-to-texas',
    '/resources/routes/minnesota-to-texas',
    '/resources/routes/minnesota-to-arizona',
    '/resources/routes/minnesota-to-tennessee',
    '/resources/routes/minnesota-to-south-carolina',
    '/resources/routes/minnesota-to-north-carolina',
    '/resources/routes/minnesota-to-georgia',
    '/resources/routes/minnesota-to-florida',
    '/resources/routes/illinois-to-tennessee',
    '/resources/routes/illinois-to-georgia',
    '/resources/routes/illinois-to-north-carolina',
    '/resources/routes/illinois-to-south-carolina',
    '/resources/routes/illinois-to-louisiana',
    '/resources/routes/illinois-to-texas',
    '/resources/routes/illinois-to-florida',
    '/resources/routes/illinois-to-arizona',
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
    '/moving-to/west-virginia',
    '/moving-to/pennsylvania',
    '/moving-to/new-jersey',
    '/moving-to/new-york',
    '/moving-to/massachusetts',
    '/moving-to/rhode-island',
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
