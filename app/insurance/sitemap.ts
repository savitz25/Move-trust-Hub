import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { isInsuranceStandaloneHost } from '@/lib/hub/domains';
import { generateInsuranceSitemap } from '@/lib/insurance/seo/generate-insurance-sitemap';

/**
 * /insurance/sitemap.xml
 *
 * - On insurancetrusthub.com (rewritten from /sitemap.xml): full ITH URL set.
 * - On movetrusthub.com: empty. Public /insurance/* 301s to ITH, but Next sitemap
 *   routes ending in `.xml` can bypass middleware matchers — never emit ITH
 *   absolute URLs under the Move host (entity / GSC isolation).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const host = (await headers()).get('host');
    // Only suppress when we know the request is on Move (or another non-ITH host).
    // Missing host during static generation: still emit ITH entries for the ITH host rewrite.
    if (host && !isInsuranceStandaloneHost(host)) {
      return [];
    }
  } catch {
    // headers() unavailable — emit full ITH set (used via ITH host rewrite).
  }

  return generateInsuranceSitemap();
}
