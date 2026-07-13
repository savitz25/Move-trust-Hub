/**
 * County content tier audit: programmatic shell vs batch research vs deep original.
 * Run: node .\node_modules\tsx\dist\cli.mjs scripts/audit-county-content-tiers.ts
 */
import { writeFileSync } from 'node:fs';
import {
  DEEP_COUNTY_UPGRADE_WAVE_1,
  DEEP_COUNTY_UPGRADE_WAVE_2,
} from '../data/deep-county-research';
import { classifyCountyContentTier } from '../lib/local-movers/county-content-quality';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import {
  hasCountyResearch,
  isGenericTemplateCountyResearch,
} from '../lib/local-movers/county-research';

/** Post wave-1 baseline (pre wave-2 content upgrades). */
const BASELINE = {
  batch_template_research: 1498,
  grok_heavy_original: 1595,
  runtime_programmatic_shell: 50,
};

const params = getAllCountyParams();
const byTier = {
  runtime_programmatic_shell: [] as string[],
  batch_template_research: [] as string[],
  grok_heavy_original: [] as string[],
};

const indexedByTier = {
  runtime_programmatic_shell: [] as string[],
  batch_template_research: [] as string[],
  grok_heavy_original: [] as string[],
};

const tierMoverCounts = {
  runtime_programmatic_shell: [] as number[],
  batch_template_research: [] as number[],
  grok_heavy_original: [] as number[],
};

const upgradedWave1: string[] = [];
const upgradedWave2: string[] = [];
const genericFlagged = { count: 0, list: [] as string[] };

for (const { stateSlug, countySlug } of params) {
  const hasResearch = hasCountyResearch(stateSlug, countySlug);
  const tier = classifyCountyContentTier(stateSlug, countySlug, hasResearch);
  const key = `${stateSlug}/${countySlug}`;
  byTier[tier].push(key);

  const result = getMoversForCounty(stateSlug, countySlug);
  const movers = result?.movers.length ?? 0;
  tierMoverCounts[tier].push(movers);

  const decision = evaluateCountyIndexability(stateSlug, countySlug);
  if (decision.tier === 'index') {
    indexedByTier[tier].push(key);
  }

  const isWave1 = DEEP_COUNTY_UPGRADE_WAVE_1.some(
    (p) => p.stateSlug === stateSlug && p.countySlug === countySlug
  );
  const isWave2 = DEEP_COUNTY_UPGRADE_WAVE_2.some(
    (p) => p.stateSlug === stateSlug && p.countySlug === countySlug
  );
  if (isWave1 && tier === 'grok_heavy_original') upgradedWave1.push(key);
  if (isWave2 && tier === 'grok_heavy_original') upgradedWave2.push(key);

  if (hasResearch && isGenericTemplateCountyResearch(stateSlug, countySlug)) {
    genericFlagged.count += 1;
    genericFlagged.list.push(key);
  }
}

const total = params.length;
const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`;
const avgMovers = (arr: number[]) =>
  arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : '0';

const wave1ByState = DEEP_COUNTY_UPGRADE_WAVE_1.reduce<Record<string, number>>(
  (acc, { stateSlug }) => {
    acc[stateSlug] = (acc[stateSlug] ?? 0) + 1;
    return acc;
  },
  {}
);

const summary = {
  generatedAt: new Date().toISOString(),
  total,
  baseline: BASELINE,
  progress: {
    wave1DeepOriginal: upgradedWave1.length,
    wave1Target: DEEP_COUNTY_UPGRADE_WAVE_1.length,
    wave2DeepOriginal: upgradedWave2.length,
    wave2Target: DEEP_COUNTY_UPGRADE_WAVE_2.length,
    batchTemplateDelta: byTier.batch_template_research.length - BASELINE.batch_template_research,
    deepOriginalDelta: byTier.grok_heavy_original.length - BASELINE.grok_heavy_original,
    wave1ByState,
    wave2ByState: DEEP_COUNTY_UPGRADE_WAVE_2.reduce<Record<string, number>>((acc, { stateSlug }) => {
      acc[stateSlug] = (acc[stateSlug] ?? 0) + 1;
      return acc;
    }, {}),
  },
  allPagesUseSameTemplate: true,
  genericTipHeuristic: genericFlagged,
  tiers: {
    runtime_programmatic_shell: {
      count: byTier.runtime_programmatic_shell.length,
      pct: pct(byTier.runtime_programmatic_shell.length),
      indexed: indexedByTier.runtime_programmatic_shell.length,
      avgMovers: avgMovers(tierMoverCounts.runtime_programmatic_shell),
      description:
        'No county-research entry — content from runtime hash generators (buildCountyTips, buildCountyCostGuide)',
    },
    batch_template_research: {
      count: byTier.batch_template_research.length,
      pct: pct(byTier.batch_template_research.length),
      indexed: indexedByTier.batch_template_research.length,
      avgMovers: avgMovers(tierMoverCounts.batch_template_research),
      description:
        'Bulk batch research in data/*-county-research.ts — locality names swapped into a fixed 5-tip template',
    },
    grok_heavy_original: {
      count: byTier.grok_heavy_original.length,
      pct: pct(byTier.grok_heavy_original.length),
      indexed: indexedByTier.grok_heavy_original.length,
      avgMovers: avgMovers(tierMoverCounts.grok_heavy_original),
      description:
        'Deep original research — unique marketNotes, local tips, varied FAQs (CA/FL/NY/NJ + wave-1 priority metros)',
    },
  },
  indexedTotal: Object.values(indexedByTier).reduce((s, a) => s + a.length, 0),
  upgradedWave1,
  upgradedWave2,
  samples: {
    grok_heavy_original: byTier.grok_heavy_original.slice(0, 15),
    batch_template_research: byTier.batch_template_research.slice(0, 10),
    runtime_programmatic_shell: byTier.runtime_programmatic_shell.slice(0, 10),
    indexed_grok_heavy: indexedByTier.grok_heavy_original.slice(0, 25),
    indexed_batch: indexedByTier.batch_template_research.slice(0, 15),
  },
};

console.log('County content tier audit');
console.log('=========================');
console.log(`Total counties: ${total}`);
console.log('');
console.log('Progress');
console.log(`  Wave 1 deep original: ${summary.progress.wave1DeepOriginal}/${summary.progress.wave1Target}`);
console.log(`  Wave 2 deep original: ${summary.progress.wave2DeepOriginal}/${summary.progress.wave2Target}`);
console.log(`  Net tier change vs post-wave-1: ${summary.progress.deepOriginalDelta} deep / ${summary.progress.batchTemplateDelta} batch`);
console.log('');
for (const [tier, data] of Object.entries(summary.tiers)) {
  console.log(`${tier}: ${data.count} (${data.pct})`);
  console.log(`  indexed: ${data.indexed} | avg movers: ${data.avgMovers}`);
}
console.log(`\nTotal indexed: ${summary.indexedTotal} (quality gates unchanged)`);

writeFileSync(
  'scripts/output/county-content-tier-report.json',
  JSON.stringify({ ...summary, byTier, indexedByTier }, null, 2)
);
console.log('\nWrote scripts/output/county-content-tier-report.json');