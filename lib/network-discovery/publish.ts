/**
 * Read-only Move discovery publisher (ASK-SEARCH-006A).
 * Reads offline snapshot only — no DB writes, no enrichment APIs.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { selectPilotCohort } from './cohort';
import { evaluatePilotEligibility } from './eligibility';
import { contentFingerprint } from './fingerprint';
import { mapCompanyToDiscovery } from './map-company';
import type {
  EligibilityFailureReason,
  MoveCompanySnapshotRow,
  NetworkDiscoveryEntity,
  PilotExportManifest,
} from './types';
import { validateDiscoveryExport } from './validate';

export const DEFAULT_SOURCE_PATH = 'scripts/output/active-verified-companies.json';

export type PublishResult = {
  manifest: PilotExportManifest;
  validationOk: boolean;
  validationIssues: { path: string; message: string }[];
  timings_ms: Record<string, number>;
};

export function loadCompanySnapshot(rootDir: string, relativePath = DEFAULT_SOURCE_PATH): {
  rows: MoveCompanySnapshotRow[];
  sourceVersion: string;
} {
  const abs = join(rootDir, relativePath);
  const raw = JSON.parse(readFileSync(abs, 'utf8')) as MoveCompanySnapshotRow[];
  if (!Array.isArray(raw)) throw new Error('Company snapshot must be a JSON array');
  // Fingerprint source file length + first/last slug for version label
  const sourceVersion = `active-verified-companies.json#n=${raw.length}`;
  return { rows: raw, sourceVersion };
}

export function publishMoveDiscoveryPilot(rootDir: string): PublishResult {
  const timings: Record<string, number> = {};
  const t0 = performance.now();

  const tLoad = performance.now();
  const { rows, sourceVersion } = loadCompanySnapshot(rootDir);
  timings.load_ms = performance.now() - tLoad;

  const ineligibleReasons: Record<string, number> = {};
  const eligibleRows: MoveCompanySnapshotRow[] = [];

  const tElig = performance.now();
  for (const row of rows) {
    const ev = evaluatePilotEligibility(row);
    if (ev.ok) eligibleRows.push(row);
    else {
      ineligibleReasons[ev.reason] = (ineligibleReasons[ev.reason] || 0) + 1;
    }
  }
  timings.eligibility_ms = performance.now() - tElig;

  const tNorm = performance.now();
  const generatedAt = new Date().toISOString();
  // Detect USDOT collisions among eligible rows (franchises sharing one USDOT)
  const usdotCounts = new Map<string, number>();
  for (const row of eligibleRows) {
    const d = row.usdot_number?.replace(/\D/g, '') || '';
    if (d.length >= 5) usdotCounts.set(d, (usdotCounts.get(d) || 0) + 1);
  }
  const eligibleEntities: NetworkDiscoveryEntity[] = eligibleRows.map((row) => {
    const d = row.usdot_number?.replace(/\D/g, '') || '';
    const usdotIsUnique = !(d.length >= 5 && (usdotCounts.get(d) || 0) > 1);
    return mapCompanyToDiscovery(row, { sourceVersion, updatedAt: generatedAt, usdotIsUnique });
  });
  timings.normalize_ms = performance.now() - tNorm;

  const tCohort = performance.now();
  const pilot = selectPilotCohort(eligibleEntities);
  timings.cohort_ms = performance.now() - tCohort;

  const tVal = performance.now();
  const validation = validateDiscoveryExport(pilot);
  timings.validate_ms = performance.now() - tVal;

  const entity_type_breakdown: Record<string, number> = {};
  const states: Record<string, number> = {};
  let with_city = 0;
  let with_zip = 0;
  let with_county = 0;
  for (const e of pilot) {
    entity_type_breakdown[e.entity_type] = (entity_type_breakdown[e.entity_type] || 0) + 1;
    if (e.state) states[e.state] = (states[e.state] || 0) + 1;
    if (e.city) with_city++;
    if (e.zip) with_zip++;
    if (e.county) with_county++;
  }

  const fingerprint = contentFingerprint(pilot);
  timings.total_ms = performance.now() - t0;

  const manifest: PilotExportManifest = {
    schema_version: 'ask-network-discovery-v1',
    hub: 'move',
    generated_at: generatedAt,
    source_version: sourceVersion,
    source_path: DEFAULT_SOURCE_PATH,
    pilot_label: 'PILOT / NOT YET CONSUMED BY ASK PRODUCTION',
    entity_count: pilot.length,
    content_fingerprint: fingerprint,
    eligibility: {
      considered: rows.length,
      eligible: eligibleEntities.length,
      ineligible: rows.length - eligibleEntities.length,
      ineligible_reasons: ineligibleReasons as Record<EligibilityFailureReason, number>,
      pilot_selected: pilot.length,
    },
    entity_type_breakdown,
    geography: { states, with_city, with_zip, with_county },
    entities: pilot,
  };

  return {
    manifest,
    validationOk: validation.ok,
    validationIssues: validation.issues,
    timings_ms: Object.fromEntries(
      Object.entries(timings).map(([k, v]) => [k, Number(v.toFixed(3))])
    ),
  };
}
