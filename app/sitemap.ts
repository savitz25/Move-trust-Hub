import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug, getMarketPath } from '@/lib/destinations/markets';
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
    '/auto-transport',
    '/moving-calculator',
    '/compare',
    '/resources',
    '/about',
    '/contact',
    ...resourcePages,
  ].map((route) => ({
    url: `https://www.movetrusthub.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/local-movers' ? 0.9 : 0.8,
  }));

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
      lastModified: new Date(),
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
