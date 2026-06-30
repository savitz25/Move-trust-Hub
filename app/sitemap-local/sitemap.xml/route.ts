import { COUNTY_INDEX_POLICY_UPDATED } from '@/components/local-movers/county-editorial-trust';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

export async function GET() {
  const lastmod = new Date(COUNTY_INDEX_POLICY_UPDATED).toISOString();
  const entries = localStates
    .map(
      (state) => `  <sitemap>
    <loc>${SITE_URL}/sitemap-local/sitemap/${state.slug}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}