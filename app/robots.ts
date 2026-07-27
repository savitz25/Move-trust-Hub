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
          disallow: ['/admin', '/api/', '/insurance/admin', '/_next/', '/lender'],
        },
      ],
      sitemap: `${INSURANCE_SITE_URL}/sitemap.xml`,
      host: INSURANCE_SITE_URL,
    };
  }

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
      `${MOVE_SITE_URL}/sitemap.xml`,
      `${MOVE_SITE_URL}/sitemap-local/sitemap.xml`,
      `${MOVE_SITE_URL}/lender/sitemap.xml`,
      `${MOVE_SITE_URL}/insurance/sitemap.xml`,
    ],
    host: MOVE_SITE_URL,
  };
}
