import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();
  const autoTransportCompanies = await getAllAutoTransportCompanies();

  const resourcePages = [
    '/resources/move-size-weight',
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
  ];

  const localMoverPages = [
    '/local-movers',
    ...localStates.map((state) => `/local-movers/${state.slug}`),
    ...getAllCountyParams().map(
      ({ stateSlug, countySlug }) => `/local-movers/${stateSlug}/${countySlug}`
    ),
  ];

  const staticPages = [
    '',
    '/companies',
    ...localMoverPages,
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
    priority: route === '' ? 1 : 0.8,
  }));

  const companyPages = companies.map((company) => ({
    url: `https://www.movetrusthub.com/companies/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const autoTransportPages = autoTransportCompanies.map((company) => ({
    url: `https://www.movetrusthub.com/auto-transport/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...companyPages, ...autoTransportPages];
}
