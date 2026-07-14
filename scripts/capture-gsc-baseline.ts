/**
 * GSC baseline snapshot — sitemap URL counts per state as pre/post deploy proxy.
 * Full impressions/clicks require Search Console API OAuth (not configured in CI).
 *
 * Run before deploy: npx tsx scripts/capture-gsc-baseline.ts
 * Env: GSC_BASELINE_ORIGIN (default production)
 */
import { writeFileSync } from 'node:fs';
import { localStates } from '../lib/local-movers/states';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';

const origin = process.env.GSC_BASELINE_ORIGIN ?? 'https://www.movetrusthub.com';

type StateBaseline = {
  stateSlug: string;
  stateCode: string;
  sitemapUrl: string;
  sitemapCountyUrls: number | null;
  sitemapFetchError?: string;
  tier1CountyCount: number;
};

async function countSitemapUrls(stateSlug: string): Promise<{ count: number | null; error?: string }> {
  const url = `${origin}/sitemap-local/sitemap/${stateSlug}.xml`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'MoveTrustHub-GSC-Baseline/1.1' },
    });
    if (!response.ok) {
      return { count: null, error: `http_${response.status}` };
    }
    const xml = await response.text();
    const locMatches = xml.match(/<loc>[^<]+<\/loc>/g) ?? [];
    const countyUrls = locMatches.filter((loc) => /\/local-movers\/[^/]+\/[^<]+<\/loc>/.test(loc));
    return { count: countyUrls.length };
  } catch (error) {
    return {
      count: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const { getAllCountyParams } = await import('../lib/local-movers/geography/index');
  const tier1ByState: Record<string, number> = {};

  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    if (evaluateCountyIndexability(stateSlug, countySlug).tier === 'index') {
      tier1ByState[stateSlug] = (tier1ByState[stateSlug] ?? 0) + 1;
    }
  }

  const perState: StateBaseline[] = [];
  for (const state of localStates) {
    const { count, error } = await countSitemapUrls(state.slug);
    perState.push({
      stateSlug: state.slug,
      stateCode: state.code,
      sitemapUrl: `${origin}/sitemap-local/sitemap/${state.slug}.xml`,
      sitemapCountyUrls: count,
      sitemapFetchError: error,
      tier1CountyCount: tier1ByState[state.slug] ?? 0,
    });
  }

  const report = {
    capturedAt: new Date().toISOString(),
    origin,
    note:
      'GSC indexed/impressions/clicks per state require Search Console API credentials. This baseline captures live sitemap county URL counts and evaluator Tier-1 counts per state as reproducible deploy proxies.',
    gscApiConfigured: Boolean(process.env.GSC_SERVICE_ACCOUNT_JSON?.trim()),
    totals: {
      tier1EvaluatorCount: Object.values(tier1ByState).reduce((a, b) => a + b, 0),
      sitemapCountyUrlsLive: perState.reduce((sum, s) => sum + (s.sitemapCountyUrls ?? 0), 0),
    },
    perState,
  };

  writeFileSync('scripts/output/gsc-baseline-snapshot.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});