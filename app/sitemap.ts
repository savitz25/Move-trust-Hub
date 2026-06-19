import { MetadataRoute } from 'next';
import { getAllCompanies, getAllAutoTransportCompanies } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();
  const autoTransportCompanies = await getAllAutoTransportCompanies();

  const resourcePages = [
    '/resources/move-size-weight',
    '/resources/how-to-choose',
    '/resources/fmcsa',
    '/resources/scams',
    '/resources/checklist',
  ];

  const staticPages = [
    '',
    '/companies',
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
