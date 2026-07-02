import type { MetadataRoute } from 'next';

const SITE = 'https://www.movetrusthub.com';

/** Insurance hub sitemap — extend as routes are synced from insurance-trust-hub */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/directory',
    '/hubs',
    '/hubs/browse',
    '/calculators',
    '/resources',
    '/destinations',
    '/about',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${SITE}/insurance${route}`,
    lastModified: new Date('2026-06-30'),
    changeFrequency: 'weekly' as const,
    priority:
      route === ''
        ? 0.92
        : route === '/hubs' || route === '/hubs/browse'
          ? 0.9
          : 0.85,
  }));
}