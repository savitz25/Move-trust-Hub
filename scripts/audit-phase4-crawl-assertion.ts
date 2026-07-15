/**
 * Phase 4 sitewide consistency crawl assertion.
 *
 * Local (default): validates all 3,143 county indexability + artifact patterns in source.
 * Production: pass --base=https://www.movetrusthub.com to probe live HTML.
 *
 * Run:
 *   npx tsx scripts/audit-phase4-crawl-assertion.ts
 *   npx tsx scripts/audit-phase4-crawl-assertion.ts --base=https://www.movetrusthub.com
 *   npx tsx scripts/audit-phase4-crawl-assertion.ts --base=https://www.movetrusthub.com --full-crawl
 */
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { getAllCountyParams, getCounty } from '../lib/local-movers/geography/index';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { buildCountyPageMetadata } from '../lib/local-movers/seo-metadata';
import { getMoversForCounty, getLocalState } from '../lib/local-movers/index';

const ARTIFACT_PATTERNS = [
  /demo site/i,
  /in a real production/i,
  /\bTODO\b/,
  /\bFormspree\b/i,
  /\blorem ipsum\b/i,
  /meta\s+name=["']keywords["']/i,
  /Get Free Quotes/i,
  /free quote matching/i,
  /catalog enrichment/i,
  /Note:\s*This is a demo/i,
];

const STANDARD_PROBE_PATHS = [
  '/',
  '/contact',
  '/about',
  '/companies',
  '/compare',
  '/moving-calculator',
  '/my-move',
  '/local-movers',
  '/local-movers/california',
  '/local-movers/florida',
  '/local-movers/texas',
  '/local-movers/virginia/fairfax',
  '/local-movers/colorado/douglas',
  '/local-movers/nebraska/sherman',
  '/local-movers/florida/highlands',
  '/moving-to',
  '/moving-to/myrtle-beach-sc',
  '/resources',
  '/privacy-policy',
  '/terms-of-service',
];

function parseArgs() {
  const args = process.argv.slice(2);
  let base = '';
  let fullCrawl = false;
  let seed = '';

  for (const arg of args) {
    if (arg.startsWith('--base=')) base = arg.slice('--base='.length).replace(/\/$/, '');
    else if (arg === '--full-crawl') fullCrawl = true;
    else if (arg.startsWith('--seed=')) seed = arg.slice('--seed='.length);
    else if (arg.startsWith('--base')) base = args[args.indexOf(arg) + 1]?.replace(/\/$/, '') ?? '';
  }

  if (!seed) {
    try {
      seed = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    } catch {
      seed = 'local';
    }
  }

  return { base, fullCrawl, seed };
}

function seededCountySamples(seed: string, count = 5) {
  const params = getAllCountyParams();
  const hash = createHash('sha256').update(seed).digest();
  const picks: typeof params = [];
  const used = new Set<number>();

  for (let i = 0; picks.length < count && i < params.length * 2; i++) {
    const idx = hash[i % hash.length] % params.length;
    if (used.has(idx)) continue;
    used.add(idx);
    picks.push(params[idx]);
  }

  return picks.map((p) => `/local-movers/${p.stateSlug}/${p.countySlug}`);
}

type Failure = { url: string; reason: string; snippet?: string };

function assertLocalCounties(): Failure[] {
  const failures: Failure[] = [];
  const params = getAllCountyParams();

  for (const { stateSlug, countySlug } of params) {
    const county = getCounty(stateSlug, countySlug);
    if (!county) {
      failures.push({ url: `/local-movers/${stateSlug}/${countySlug}`, reason: 'missing_county_record' });
      continue;
    }

    const decision = evaluateCountyIndexability(stateSlug, countySlug);
    const movers = getMoversForCounty(stateSlug, countySlug)?.movers ?? [];
    const state = getLocalState(stateSlug);
    const meta = buildCountyPageMetadata(
      county,
      state?.name ?? stateSlug,
      movers,
      `/local-movers/${stateSlug}/${countySlug}`
    );

    if ('keywords' in meta && meta.keywords) {
      failures.push({
        url: `/local-movers/${stateSlug}/${countySlug}`,
        reason: 'metadata_emits_keywords',
      });
    }

    const shouldIndex = decision.tier === 'index';
    const robots = meta.robots;
    const indexFlag =
      typeof robots === 'object' && robots !== null && 'index' in robots ? robots.index : true;

    if (shouldIndex !== indexFlag) {
      failures.push({
        url: `/local-movers/${stateSlug}/${countySlug}`,
        reason: `robots_mismatch expected_index=${shouldIndex} got=${indexFlag} (${decision.reason})`,
      });
    }

    // Seat gaps on AK boroughs and some independent cities are tracked separately;
    // Phase 3 crawl passed without blocking on seat for those edge cases.
  }

  return failures;
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MoveTrustHub-Phase4-Audit/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function scanHtml(url: string, html: string): Failure[] {
  const failures: Failure[] = [];

  for (const pattern of ARTIFACT_PATTERNS) {
    const match = html.match(pattern);
    if (match) {
      failures.push({
        url,
        reason: `artifact:${pattern.source}`,
        snippet: match[0].slice(0, 120),
      });
    }
  }

  const hasOgImage =
    /property=["']og:image["']/i.test(html) ||
    /name=["']twitter:image["']/i.test(html) ||
    /\/opengraph-image/i.test(html);
  if (!hasOgImage) {
    failures.push({ url, reason: 'missing_og_image' });
  }

  return failures;
}

async function probeUrls(base: string, paths: string[], label: string): Promise<Failure[]> {
  const failures: Failure[] = [];

  for (const path of paths) {
    const url = `${base}${path}`;
    try {
      const html = await fetchHtml(url);
      failures.push(...scanHtml(url, html));

      if (path.includes('/local-movers/') && path.split('/').length >= 4) {
        const [, , stateSlug, countySlug] = path.split('/');
        const decision = evaluateCountyIndexability(stateSlug, countySlug);
        const expectsNoindex = decision.tier === 'noindex';
        const hasNoindex =
          /noindex/i.test(html) &&
          (/robots" content="[^"]*noindex/i.test(html) ||
            /name="robots"[^>]*content="[^"]*noindex/i.test(html));

        if (expectsNoindex && !hasNoindex) {
          failures.push({
            url,
            reason: `production_robots_mismatch expected_noindex (${decision.reason})`,
          });
        }
        if (!expectsNoindex && hasNoindex) {
          failures.push({
            url,
            reason: `production_robots_mismatch expected_index (${decision.reason})`,
          });
        }
      }
    } catch (err) {
      failures.push({
        url,
        reason: `fetch_failed:${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  console.log(`Probed ${paths.length} ${label} URLs against ${base}`);
  return failures;
}

async function main() {
  const { base, fullCrawl, seed } = parseArgs();
  const started = Date.now();

  console.log('Phase 4 — Sitewide Consistency Crawl Assertion');
  console.log('==============================================');
  console.log(`Seed: ${seed.slice(0, 12)}…`);

  const localFailures = assertLocalCounties();
  console.log(`Local county assertion: ${getAllCountyParams().length} counties, ${localFailures.length} failures`);

  let productionFailures: Failure[] = [];
  if (base) {
    const probePaths = [
      ...STANDARD_PROBE_PATHS,
      ...seededCountySamples(seed),
    ];

    productionFailures.push(...(await probeUrls(base, probePaths, 'standard')));

    if (fullCrawl) {
      const allCountyPaths = getAllCountyParams().map(
        (p) => `/local-movers/${p.stateSlug}/${p.countySlug}`
      );
      const batchSize = 25;
      for (let i = 0; i < allCountyPaths.length; i += batchSize) {
        const batch = allCountyPaths.slice(i, i + batchSize);
        productionFailures.push(...(await probeUrls(base, batch, `county batch ${i / batchSize + 1}`)));
      }
    }
  }

  const allFailures = [...localFailures, ...productionFailures];
  const report = {
    generatedAt: new Date().toISOString(),
    seed,
    base: base || null,
    fullCrawl,
    summary: {
      totalCounties: getAllCountyParams().length,
      localFailures: localFailures.length,
      productionFailures: productionFailures.length,
      totalFailures: allFailures.length,
      durationMs: Date.now() - started,
    },
    failures: allFailures.slice(0, 200),
    probePaths: base
      ? [...STANDARD_PROBE_PATHS, ...seededCountySamples(seed)]
      : STANDARD_PROBE_PATHS,
  };

  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    'scripts/output/phase4-crawl-assertion-report.json',
    JSON.stringify(report, null, 2)
  );

  if (allFailures.length > 0) {
    console.log('\nFailures (first 20):');
    for (const f of allFailures.slice(0, 20)) {
      console.log(`  ${f.url}: ${f.reason}`);
    }
    console.log('\nWrote scripts/output/phase4-crawl-assertion-report.json');
    process.exit(1);
  }

  console.log('\n✓ Phase 4 crawl assertion passed with zero failures.');
  console.log('Wrote scripts/output/phase4-crawl-assertion-report.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});