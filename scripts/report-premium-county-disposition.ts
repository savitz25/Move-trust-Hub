import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { scoreCountyQuality } from '../lib/local-movers/county-quality-score';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';

const candidates = getAllCountyParams()
  .flatMap(({ stateSlug, countySlug }) => {
    const decision = evaluateCountyIndexability(stateSlug, countySlug);
    if (decision.tier !== 'index' || decision.seoTier !== 1) return [];
    if (typeof decision.qualityScore !== 'number') {
      throw new Error(`Missing quality score for Premium candidate ${stateSlug}/${countySlug}`);
    }
    const result = getMoversForCounty(stateSlug, countySlug);
    if (!result) throw new Error(`Missing county inventory for ${stateSlug}/${countySlug}`);
    const quality = scoreCountyQuality({
      stateSlug,
      countySlug,
      county: result.county,
      movers: result.movers,
      isRegionalFallback: result.isRegionalFallback,
    });
    return [{
      stateSlug,
      countySlug,
      score: decision.qualityScore,
      reason: decision.reason,
      explicitMovers: quality.metadata.explicitMovers,
      localMovers: quality.metadata.localMovers,
      uniqueness: quality.components.uniqueness,
      utility: quality.components.utility,
    }];
  })
  .sort(
    (a, b) =>
      a.score - b.score ||
      a.explicitMovers - b.explicitMovers ||
      a.localMovers - b.localMovers ||
      a.uniqueness - b.uniqueness ||
      a.utility - b.utility ||
      a.stateSlug.localeCompare(b.stateSlug) ||
      a.countySlug.localeCompare(b.countySlug)
  );

if (candidates.length !== 408) {
  throw new Error(`Expected the reviewed 408-candidate baseline, got ${candidates.length}`);
}

const escapeCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;
const lines = [
  'priority_rank,state_slug,county_slug,quality_score,explicit_movers,local_movers,uniqueness_points,utility_points,indexability_reason,disposition',
  ...candidates.map((candidate, index) => {
    const rank = index < 8 ? String(index + 1) : '';
    const disposition = index < 8 ? 'FOUNDER_REVIEW_REQUIRED' : 'INVENTORY_CANDIDATE';
    return [
      rank,
      candidate.stateSlug,
      candidate.countySlug,
      String(candidate.score),
      String(candidate.explicitMovers),
      String(candidate.localMovers),
      String(candidate.uniqueness),
      String(candidate.utility),
      escapeCsv(candidate.reason),
      disposition,
    ].join(',');
  }),
];

const output = join(
  process.cwd(),
  'docs',
  'governance',
  'MOVE-COUNTY-PREMIUM-GUARD-008.csv'
);
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${candidates.length} Premium candidates to ${output}`);
console.log('First eight are deterministic review priority only; this script changes no publication state.');
