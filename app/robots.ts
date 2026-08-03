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

  // Move host only — never advertise Insurance or Lender standalone sitemaps.
  // /insurance/* and /lender/* 301 to their own domains; do not list those prefixes here.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/insurance/admin',
          // Residual hub prefixes redirect off-host; discourage crawl on Move.
          '/insurance',
          '/lender',
          '/_next/',
        ],
      },
    ],
    sitemap: [
      `${MOVE_SITE_URL}/sitemap.xml`,
      `${MOVE_SITE_URL}/sitemap-local/sitemap.xml`,
    ],
    host: MOVE_SITE_URL,
  };
}
