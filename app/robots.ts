import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import {
  INSURANCE_SITE_URL,
  MOVE_SITE_URL,
  isInsuranceStandaloneHost,
} from '@/lib/hub/domains';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host');

  if (isInsuranceStandaloneHost(host)) {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/admin',
            '/api/',
            '/insurance/admin',
            '/_next/',
            '/lender',
            '/local-movers',
            '/companies',
            '/auto-transport',
            '/moving-to',
            '/verify-dot',
            '/sitemap-local',
            '/compare',
            '/review',
          ],
        },
      ],
      sitemap: `${INSURANCE_SITE_URL}/sitemap.xml`,
      host: INSURANCE_SITE_URL,
    };
  }

  // Move host only — never advertise InsuranceTrustHub (standalone domain) sitemaps.
  // /insurance/* 301s to insurancetrusthub.com; do not list /insurance/sitemap.xml here
  // (that endpoint previously emitted insurancetrusthub.com URLs and confused entity SEO).
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
          // Residual /insurance/* paths redirect; discourage crawl of the prefix on Move.
          '/insurance',
          '/_next/',
        ],
      },
    ],
    sitemap: [
      `${MOVE_SITE_URL}/sitemap.xml`,
      `${MOVE_SITE_URL}/sitemap-local/sitemap.xml`,
      `${MOVE_SITE_URL}/lender/sitemap.xml`,
    ],
    host: MOVE_SITE_URL,
  };
}
