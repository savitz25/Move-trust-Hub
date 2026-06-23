import type { MetadataRoute } from 'next';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin'],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      ...localStates.map(
        (state) => `${SITE_URL}/sitemap-local/sitemap/${state.slug}.xml`
      ),
    ],
  };
}