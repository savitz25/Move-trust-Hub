import { buildLocalStateSitemap } from '@/lib/local-movers/local-sitemap';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ state: string }> }
) {
  const { state } = await params;
  const entries = await buildLocalStateSitemap(state);
  const body = entries.map((entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date(entry.lastModified ?? Date.now()).toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`, { headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  }});
}
