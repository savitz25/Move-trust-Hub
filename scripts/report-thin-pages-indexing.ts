/**
 * Writes the kept vs dropped URL list for MOVE-THIN-PAGES-INDEXING-001.
 * Seed catalog only. Does not deploy, resubmit sitemaps, or call the Indexing API.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cityIndexRollup, countyIndexRollup } from '@/lib/seo/thin-pages-inventory';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs/seo/move-thin-pages-indexing-001.md');

function counts(rows: { state: string; kept: string[]; dropped: string[] }[]): string {
  const lines = ['| State | Kept | Dropped |', '| --- | ---: | ---: |'];
  let kept = 0;
  let dropped = 0;
  for (const row of rows) {
    lines.push(`| ${row.state} | ${row.kept.length} | ${row.dropped.length} |`);
    kept += row.kept.length;
    dropped += row.dropped.length;
  }
  lines.push(`| **Total** | **${kept}** | **${dropped}** |`);
  return lines.join('\n');
}

function urlList(title: string, urls: string[]): string {
  if (urls.length === 0) return `### ${title}\n\nNone.\n`;
  return `### ${title}\n\n${urls.map((url) => `- ${url}`).join('\n')}\n`;
}

const counties = countyIndexRollup();
const cities = cityIndexRollup();

const countyKept = counties.reduce((sum, row) => sum + row.kept.length, 0);
const countyDropped = counties.reduce((sum, row) => sum + row.dropped.length, 0);
const cityKept = cities.reduce((sum, row) => sum + row.kept.length, 0);
const cityDropped = cities.reduce((sum, row) => sum + row.dropped.length, 0);

const body = `# MOVE-THIN-PAGES-INDEXING-001

Builder GB1. Threshold: at least 3 movers based in or licensed for that county or city. A mover counts when the catalog classifies them as local, or as regional without a confirmed out-of-state headquarters. Confirmed cross-state carriers do not count. Existing quality hard blocks still apply, so a county with 3 qualifying movers and uncited or batch research stays noindex. Counts come from the seed catalog. This list does not invent listings.

County pages below the threshold are noindex, follow and are omitted from sitemap-local. City pages below the threshold are noindex, follow and are omitted from the Move sitemap. Cluster landings at \`/moving-to/<state>\` are not city pages and stay in the sitemap.

## County pages

Kept ${countyKept}. Dropped ${countyDropped}.

${counts(counties)}

${counties
  .map(
    (row) =>
      `## County ${row.state}\n\n${urlList('Kept', row.kept)}\n${urlList('Dropped', row.dropped)}`
  )
  .join('\n')}

## City pages

Kept ${cityKept}. Dropped ${cityDropped}.

${counts(cities)}

${cities
  .map(
    (row) =>
      `## City ${row.state}\n\n${urlList('Kept', row.kept)}\n${urlList('Dropped', row.dropped)}`
  )
  .join('\n')}

## HTTP

\`http://www.movetrusthub.com/\` and \`http://www.movetrusthub.com/companies\` respond 308 to the matching \`https://www.movetrusthub.com\` URL. Confirmed with \`curl.exe -sI --max-redirs 0\` on 2026-11-04. Middleware also redirects when \`x-forwarded-proto\` is \`http\` and the host is not local.

## Not done in this change

No deploy. No sitemap resubmit. No Indexing API call.
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, body);
console.log(
  `wrote ${out} counties kept=${countyKept} dropped=${countyDropped} cities kept=${cityKept} dropped=${cityDropped}`
);
