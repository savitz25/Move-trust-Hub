import type { MetadataRoute } from 'next';

const SITE = 'https://www.movetrusthub.com';

/** Lender hub sitemap — extend as routes are synced from lender-trust-hub */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/local-lenders',
    '/fdic-insured-banks',
    '/calculators',
    '/about',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${SITE}/lender${route}`,
    lastModified: new Date('2026-06-30'),
    changeFrequency: route === '' ? 'weekly' : 'weekly',
    priority: route === '' ? 0.92 : route === '/local-lenders' ? 0.9 : 0.85,
  }));
}