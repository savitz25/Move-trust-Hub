/**
 * Reference service-area evidence for model calibration.
 * Sources: curated company_destination_assignments (local_intrastate*), no Google.
 */
import type pg from 'pg';
import type {
  CalibrationCohortMember,
  ReferenceCountyEvidence,
} from '@/lib/state-hhg/calibration/types';

export async function loadCuratedDestinationEvidence(
  client: pg.Client,
  members: readonly CalibrationCohortMember[],
  slugToFips: Map<string, string>
): Promise<ReferenceCountyEvidence[]> {
  const ids = members.map((m) => m.providerId);
  if (!ids.length) return [];
  const res = await cQuery(client, ids);
  const byId = new Map(members.map((m) => [m.providerId, m]));
  const retrievedAt = new Date().toISOString();
  const out: ReferenceCountyEvidence[] = [];

  for (const row of res.rows) {
    const member = byId.get(String(row.company_id));
    if (!member) continue;
    const stateSlug = String(row.state_slug);
    const expected =
      member.stateCode === 'FL' ? 'florida' : member.stateCode === 'WA' ? 'washington' : '';
    if (stateSlug !== expected) continue;

    const source = String(row.source ?? '');
    // Prefer attributable local/curated sources; skip blank national-seed noise later by size filter
    const countySlug = String(row.county_slug);
    const fips = slugToFips.get(`${stateSlug}:${countySlug}`);
    if (!fips) continue;

    const allowedSource =
      /local_intrastate|onboarding|portal|curated|manual|admin/i.test(source) ||
      source.length > 0;

    if (!allowedSource) continue;

    out.push({
      providerId: member.providerId,
      stateCode: member.stateCode,
      countyFips: fips,
      evidenceType: 'CURATED_INTERNAL',
      source: source || 'company_destination_assignments',
      sourceUrl: null,
      retrievedAt,
      confidence: /local_intrastate/i.test(source) ? 0.85 : 0.7,
      verificationState: 'VERIFIED',
    });
  }

  // Drop seed-like providers assigned to too many counties (>= 25 in FL / >= 20 in WA)
  const counts = new Map<string, number>();
  for (const e of out) {
    counts.set(e.providerId, (counts.get(e.providerId) ?? 0) + 1);
  }
  return out.filter((e) => {
    const n = counts.get(e.providerId) ?? 0;
    const max = e.stateCode === 'FL' ? 25 : 20;
    return n > 0 && n <= max;
  });
}

async function cQuery(client: pg.Client, ids: string[]) {
  return client.query(
    `
    SELECT company_id, state_slug, county_slug, source
      FROM company_destination_assignments
     WHERE company_id = ANY($1::text[])
       AND state_slug IN ('florida','washington')
    `,
    [ids]
  );
}

export function summarizeReference(evidence: readonly ReferenceCountyEvidence[]) {
  const byProvider = new Map<string, { state: string; n: number }>();
  for (const e of evidence) {
    const cur = byProvider.get(e.providerId) ?? { state: e.stateCode, n: 0 };
    cur.n += 1;
    byProvider.set(e.providerId, cur);
  }
  const fl = [...byProvider.values()].filter((v) => v.state === 'FL');
  const wa = [...byProvider.values()].filter((v) => v.state === 'WA');
  const typeDist: Record<string, number> = {};
  for (const e of evidence) {
    typeDist[e.evidenceType] = (typeDist[e.evidenceType] ?? 0) + 1;
  }
  return {
    flProviders: fl.length,
    waProviders: wa.length,
    countyObservations: evidence.length,
    evidenceTypeDistribution: typeDist,
    flCountyObs: evidence.filter((e) => e.stateCode === 'FL').length,
    waCountyObs: evidence.filter((e) => e.stateCode === 'WA').length,
  };
}

/** Deterministic 70/30 split stratified by state. */
export function splitCalibrationHoldout(
  providerIds: readonly string[],
  providerState: Map<string, string>,
  holdoutFraction = 0.3
): { calibration: string[]; holdout: string[] } {
  const byState = new Map<string, string[]>();
  for (const id of [...providerIds].sort()) {
    const st = providerState.get(id) ?? 'XX';
    const arr = byState.get(st) ?? [];
    arr.push(id);
    byState.set(st, arr);
  }
  const calibration: string[] = [];
  const holdout: string[] = [];
  for (const [, ids] of [...byState.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    const nHold = Math.max(1, Math.round(ids.length * holdoutFraction));
    // Take every k-th for holdout for determinism
    const holdSet = new Set<string>();
    if (ids.length <= 2) {
      holdSet.add(ids[ids.length - 1]);
    } else {
      const step = Math.max(1, Math.floor(ids.length / nHold));
      for (let i = step - 1; i < ids.length && holdSet.size < nHold; i += step) {
        holdSet.add(ids[i]);
      }
      while (holdSet.size < nHold) holdSet.add(ids[holdSet.size % ids.length]);
    }
    for (const id of ids) {
      if (holdSet.has(id)) holdout.push(id);
      else calibration.push(id);
    }
  }
  return {
    calibration: calibration.sort(),
    holdout: holdout.sort(),
  };
}
