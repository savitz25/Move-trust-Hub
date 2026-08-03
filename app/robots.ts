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

  // Move host only — never advertise Insurance/Lender sitemaps (standalone domains).
  // CRITICAL: Do NOT Disallow /insurance or /lender — crawlers must hit those paths
  // so they can process the live 301/308 redirects and transfer equity. Blocking them
  // freezes old URLs as "Indexed, though blocked by robots.txt".
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          // Keep monorepo admin isolation only — not the public hub prefixes.
          '/insurance/admin',
          '/lender/admin',
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
