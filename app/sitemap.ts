import { MetadataRoute } from 'next';
import { getAllCompanies } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();

  const staticPages = [
    '',
    '/companies',
    '/compare',
    '/resources',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `https://interstatemoversusa.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const companyPages = companies.map((company) => ({
    url: `https://interstatemoversusa.com/companies/${company.slug}`,
    lastModified: new Date(company.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...companyPages];
}
