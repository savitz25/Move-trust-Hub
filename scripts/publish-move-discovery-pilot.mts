/**
 * ASK-SEARCH-006A.1 — emit Move discovery pilot JSON (read-only catalog).
 *
 * Usage: npx tsx scripts/publish-move-discovery-pilot.mts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PILOT_ARTIFACT, publishMoveDiscoveryPilot } from '../lib/network-discovery/publish';

const root = process.cwd();
const outDir = join(root, 'data', 'network-discovery');
mkdirSync(outDir, { recursive: true });

const result = publishMoveDiscoveryPilot(root);
if (!result.validationOk) {
  console.error('VALIDATION FAILED', result.validationIssues.slice(0, 20));
  process.exit(1);
}

const outPath = join(outDir, PILOT_ARTIFACT);
writeFileSync(outPath, JSON.stringify(result.manifest, null, 2) + '\n', 'utf8');

console.log(
  JSON.stringify(
    {
      wrote: outPath,
      entity_count: result.manifest.entity_count,
      fingerprint: result.manifest.content_fingerprint,
      eligibility: result.manifest.eligibility,
      entity_type_breakdown: result.manifest.entity_type_breakdown,
      geography: result.manifest.geography,
      query_readiness: result.manifest.query_readiness,
      identity_continuity: result.manifest.identity_continuity,
      catalog_stats: result.catalog_stats,
      timings_ms: result.timings_ms,
      external_calls: { Google: 0, LLM: 0, external_geo: 0, other_enrichment: 0 },
    },
    null,
    2
  )
);
