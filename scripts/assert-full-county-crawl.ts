/**
 * Full production crawl assertion — all county URLs.
 * Run: AUDIT_ORIGIN=https://www.movetrusthub.com npx tsx scripts/assert-full-county-crawl.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { getCounty } from '../lib/local-movers/geography/index';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { buildCountyPageTitle } from '../lib/local-movers/county-display-copy';
import { getSeoYear } from '../lib/local-movers/county-seo';
import { getAllCountyParams } from '../lib/local-movers/geography/index';

const origin = process.env.AUDIT_ORIGIN ?? 'https://www.movetrusthub.com';
const CONCURRENCY = Number(process.env.CRAWL_CONCURRENCY ?? 24);

const ARTIFACT_PATTERNS: ReadonlyArray<{ id: string; pattern: RegExp }> = [
  { id: 'loup_river_sherman', pattern: /\bloup river sherman\b/i },
  { id: 'concatenated_corridor_demand', pattern: /\b[a-z]+(?:\s+[a-z]+){1,3}\s+corridor\s+demand\b/i },
  { id: 'fabricated_testimonial_quote', pattern: /Loup River Sherman Moving/i },
];

const SEAT_BLEED_GUARDS: ReadonlyArray<{
  stateSlug: string;
  countySlug: string;
  forbiddenInTitle: RegExp;
  reason: string;
}> = [
  {
    stateSlug: 'colorado',
    countySlug: 'douglas',
    forbiddenInTitle: /\bArmour\b/i,
    reason: 'colorado_douglas_must_not_show_sd_seat_armour',
  },
];

type CrawlFailure = {
  stateSlug: string;
  countySlug: string;
  path: string;
  errors: string[];
};

function extractMeta(html: string, name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match =
    html.match(new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["']`, 'i')) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${escaped}["']`, 'i'));
  return match?.[1]?.trim() ?? null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

async function auditCounty(stateSlug: string, countySlug: string): Promise<CrawlFailure | null> {
  const path = `/local-movers/${stateSlug}/${countySlug}`;
  const url = `${origin}${path}`;
  const county = getCounty(stateSlug, countySlug);
  const indexDecision = evaluateCountyIndexability(stateSlug, countySlug);
  const errors: string[] = [];

  let html = '';
  let status = 0;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'MoveTrustHub-FullCountyCrawl/1.0' },
      redirect: 'follow',
    });
    status = response.status;
    html = await response.text();
  } catch (error) {
    errors.push(`fetch_failed:${error instanceof Error ? error.message : String(error)}`);
    return { stateSlug, countySlug, path, errors };
  }

  if (status !== 200) errors.push(`http_${status}`);
  if (/<meta[^>]+name=["']keywords["']/i.test(html)) errors.push('forbidden_keywords_meta');

  const decodedHtml = decodeHtmlEntities(html);

  for (const { id, pattern } of ARTIFACT_PATTERNS) {
    if (pattern.test(decodedHtml)) errors.push(`artifact_${id}`);
  }

  const title = extractTitle(html);
  const robots = extractMeta(html, 'robots');

  if (!title) errors.push('missing_title');
  if (!robots) errors.push('missing_robots_meta');

  if (county?.seat && title) {
    const expectedTitle = buildCountyPageTitle(county, getSeoYear());
    if (!title.includes(county.seat)) {
      errors.push(`title_seat_mismatch:expected_seat_${county.seat}`);
    }
    if (!title.includes('Movers Serving')) {
      errors.push('title_missing_movers_serving');
    }
  }

  for (const guard of SEAT_BLEED_GUARDS) {
    if (guard.stateSlug === stateSlug && guard.countySlug === countySlug && title) {
      if (guard.forbiddenInTitle.test(title)) errors.push(guard.reason);
    }
  }

  const expectIndex = indexDecision.tier === 'index';
  if (robots) {
    const hasNoindex = /noindex/i.test(robots);
    if (expectIndex && hasNoindex) errors.push('robots_noindex_expected_index');
    if (!expectIndex && !hasNoindex) errors.push('robots_index_expected_noindex');
  }

  if (errors.length === 0) return null;
  return { stateSlug, countySlug, path, errors };
}

async function runPool<T, R>(items: T[], worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let index = 0;
  async function next(): Promise<void> {
    const i = index++;
    if (i >= items.length) return;
    results[i] = await worker(items[i]);
    await next();
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, () => next()));
  return results;
}

async function main() {
  const counties = getAllCountyParams();
  const startedAt = Date.now();

  const results = await runPool(counties, ({ stateSlug, countySlug }) =>
    auditCounty(stateSlug, countySlug)
  );

  const failures = results.filter((r): r is CrawlFailure => r !== null);
  const report = {
    generatedAt: new Date().toISOString(),
    origin,
    totalCounties: counties.length,
    failureCount: failures.length,
    pass: failures.length === 0,
    durationMs: Date.now() - startedAt,
    failures,
    tierSpotCheck: {
      'nebraska/sherman': evaluateCountyIndexability('nebraska', 'sherman'),
      'colorado/douglas': evaluateCountyIndexability('colorado', 'douglas'),
    },
  };

  mkdirSync(join('scripts', 'output'), { recursive: true });
  writeFileSync('scripts/output/full-county-crawl-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, failures: failures.slice(0, 50) }, null, 2));

  if (!report.pass) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});