/**
 * Audit published city hubs for render readiness.
 *
 * Modes:
 *   local (default) — classify registry/market readiness without HTTP
 *   live            — optional HTTP probe of production/local base URL
 *
 * Usage:
 *   npx tsx scripts/audit-city-hub-health.ts
 *   npx tsx scripts/audit-city-hub-health.ts --live
 *   npx tsx scripts/audit-city-hub-health.ts --live --base=https://www.movetrusthub.com
 *
 * Classes:
 *   A — content+market OK, required fields present (local) / 200 + city hub title (live)
 *   B — would crash / HTTP 500
 *   C — 200 but ZIP Planner / generic fallback (live only)
 *   D — missing content or market / HTTP 404
 */
import fs from 'fs';
import path from 'path';
import { getCityHubContent, getPublishedCityHubSlugs } from '../lib/destinations/content';
import { getMarketBySlug, getMarketPath } from '../lib/destinations/markets';
import { CITY_HUB_SLUG_ALIASES } from '../lib/destinations/city-hub-slug-aliases';
import { parseCountyKey } from '../lib/destinations/county-keys';
import { getMoversForMarket } from '../lib/destinations/get-movers-for-market';

type ClassKey = 'A' | 'B' | 'C' | 'D';

type Row = {
  slug: string;
  path: string;
  class: ClassKey;
  reason?: string;
  title?: string;
  status?: number;
};

const REQUIRED_FIELDS = [
  'h1',
  'heroSubheadline',
  'introParagraphs',
  'costTableRows',
  'insightCards',
  'bodySections',
  'resourceLinks',
  'testimonials',
  'faqItems',
  'featuredInterstateSlugs',
] as const;

function classifyLocal(slug: string): Row {
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  const pathStr = market ? getMarketPath(market) : `/moving-to/?/${slug}`;

  if (!content || !market) {
    return {
      slug,
      path: pathStr,
      class: 'D',
      reason: !content && !market ? 'no content or market' : !content ? 'no content' : 'no market',
    };
  }

  for (const field of REQUIRED_FIELDS) {
    const v = (content as Record<string, unknown>)[field];
    if (v == null) {
      return {
        slug,
        path: pathStr,
        class: 'B',
        reason: `null required field: ${field}`,
      };
    }
  }

  try {
    // Sync path used as seed fallback in CityHubTemplate — must not throw.
    getMoversForMarket(market, 10);
    for (const key of market.primaryCounties ?? []) {
      parseCountyKey(key); // null is OK; throw is not
    }
  } catch (e) {
    return {
      slug,
      path: pathStr,
      class: 'B',
      reason: `sync movers/county throw: ${e instanceof Error ? e.message : String(e)}`,
    };
  }

  return {
    slug,
    path: pathStr,
    class: 'A',
    title: content.seo?.title,
  };
}

async function classifyLive(slug: string, base: string): Promise<Row> {
  const market = getMarketBySlug(slug);
  const pathStr = market ? getMarketPath(market) : `/moving-to/${slug}`;
  const url = `${base.replace(/\/$/, '')}${pathStr}`;

  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'mth-city-hub-audit/1.0' },
    });
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() ?? '';

    if (res.status >= 500) {
      return { slug, path: pathStr, class: 'B', status: res.status, title, reason: 'HTTP 5xx' };
    }
    if (res.status === 404) {
      return { slug, path: pathStr, class: 'D', status: 404, title, reason: 'HTTP 404' };
    }
    if (
      /ZIP Planner|Where Are You Moving|NEXT_HTTP_ERROR_FALLBACK/i.test(title) ||
      /NEXT_HTTP_ERROR_FALLBACK/i.test(html)
    ) {
      return {
        slug,
        path: pathStr,
        class: 'C',
        status: res.status,
        title,
        reason: 'ZIP Planner / notFound fallback metadata',
      };
    }
    if (res.status === 200 && (/Moving to/i.test(title) || /Moving to/i.test(h1))) {
      return { slug, path: pathStr, class: 'A', status: 200, title, reason: h1.slice(0, 80) };
    }
    return {
      slug,
      path: pathStr,
      class: 'C',
      status: res.status,
      title,
      reason: '200 without city hub title/H1',
    };
  } catch (e) {
    return {
      slug,
      path: pathStr,
      class: 'B',
      reason: `fetch error: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

function counts(rows: Row[]): Record<ClassKey, number> {
  return {
    A: rows.filter((r) => r.class === 'A').length,
    B: rows.filter((r) => r.class === 'B').length,
    C: rows.filter((r) => r.class === 'C').length,
    D: rows.filter((r) => r.class === 'D').length,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const live = args.includes('--live');
  const baseArg = args.find((a) => a.startsWith('--base='));
  const base = baseArg?.slice('--base='.length) || 'https://www.movetrusthub.com';

  const published = getPublishedCityHubSlugs();
  // Also probe alias URLs in live mode (not in published list)
  const aliasSlugs = live ? Object.keys(CITY_HUB_SLUG_ALIASES) : [];

  console.log(`Published city hubs: ${published.length}`);
  console.log(`Mode: ${live ? `live (${base})` : 'local readiness'}`);

  const localRows = published.map(classifyLocal);
  const localCounts = counts(localRows);

  let liveRows: Row[] = [];
  if (live) {
    const all = [...published, ...aliasSlugs];
    // concurrency-limited
    const concurrency = 8;
    for (let i = 0; i < all.length; i += concurrency) {
      const chunk = all.slice(i, i + concurrency);
      const part = await Promise.all(chunk.map((s) => classifyLive(s, base)));
      liveRows.push(...part);
      process.stdout.write(`\rLive probed ${Math.min(i + concurrency, all.length)}/${all.length}`);
    }
    process.stdout.write('\n');
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: live ? 'live' : 'local',
    base: live ? base : null,
    publishedCount: published.length,
    local: {
      counts: localCounts,
      failures: localRows.filter((r) => r.class !== 'A').slice(0, 100),
    },
    live: live
      ? {
          counts: counts(liveRows),
          failures: liveRows.filter((r) => r.class !== 'A').slice(0, 150),
          sampleA: liveRows.filter((r) => r.class === 'A').slice(0, 10),
        }
      : null,
    aliases: CITY_HUB_SLUG_ALIASES,
  };

  const outDir = path.join('scripts', 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'city-hub-health-report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\n=== LOCAL readiness (published slugs) ===');
  console.log(`A (ready): ${localCounts.A}`);
  console.log(`B (would crash): ${localCounts.B}`);
  console.log(`C (n/a local): ${localCounts.C}`);
  console.log(`D (missing): ${localCounts.D}`);

  if (live) {
    const lc = counts(liveRows);
    console.log('\n=== LIVE HTTP ===');
    console.log(`A (200 city hub): ${lc.A}`);
    console.log(`B (500): ${lc.B}`);
    console.log(`C (ZIP/fallback): ${lc.C}`);
    console.log(`D (404): ${lc.D}`);
    if (lc.B || lc.C || lc.D) {
      console.log('\nFailures (first 30):');
      for (const row of liveRows.filter((r) => r.class !== 'A').slice(0, 30)) {
        console.log(`  [${row.class}] ${row.path} status=${row.status ?? '-'} ${row.reason ?? ''} ${row.title ?? ''}`);
      }
    }
  }

  console.log(`\nWrote ${outPath}`);

  const failLocal = localCounts.B + localCounts.D;
  const failLive = live ? counts(liveRows).B + counts(liveRows).C : 0;
  if (failLocal > 0 || failLive > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
