import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.movetrusthub.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/lender/admin',
          '/insurance/admin',
          '/_next/',
        ],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-local/sitemap.xml`,
      `${SITE_URL}/lender/sitemap.xml`,
      `${SITE_URL}/insurance/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}