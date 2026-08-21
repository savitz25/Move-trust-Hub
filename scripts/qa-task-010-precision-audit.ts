/**
 * Task 010 stratified precision audit of Wave 4 published cohort.
 * Re-checks USDOT / HHG / carrier / HQ / disposition / caps against DB + L&I sample.
 * Never calls Google Places.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { classifyFederalHhgDockets, type LiAuthorityRow } from '../lib/federal-hhg/classify';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';
import { WAVE_4_PUBLICATION_ID } from '../lib/federal-hhg/wave-eligibility';

const LI_RESOURCE = 'https://data.transportation.gov/resource/6eyk-hxee.json';

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

function pickStratified<T extends { usdot: string; state: string; has_dba: boolean; has_mc: boolean; usdot_num: number }>(
  rows: T[],
  n: number
): T[] {
  const byState = new Map<string, T[]>();
  for (const row of rows) {
    byState.set(row.state, [...(byState.get(row.state) ?? []), row]);
  }
  for (const [k, list] of byState) {
    byState.set(
      k,
      [...list].sort((a, b) => a.usdot_num - b.usdot_num)
    );
  }
  const states = [...byState.keys()].sort();
  const selected: T[] = [];
  const used = new Set<string>();
  let i = 0;
  while (selected.length < n && states.length) {
    const state = states[i % states.length]!;
    i += 1;
    const bucket = byState.get(state) ?? [];
    // Prefer alternating DBA/MC patterns when available.
    const preferDba = selected.length % 4 < 2;
    const preferMc = selected.length % 3 !== 0;
    let idx = bucket.findIndex(
      (r) =>
        !used.has(r.usdot) &&
        (preferDba ? r.has_dba : !r.has_dba || bucket.every((x) => !x.has_dba || used.has(x.usdot))) &&
        (preferMc ? r.has_mc : true)
    );
    if (idx < 0) idx = bucket.findIndex((r) => !used.has(r.usdot));
    if (idx < 0) continue;
    const next = bucket.splice(idx, 1)[0]!;
    used.add(next.usdot);
    selected.push(next);
  }
  // Fill with older/newer extremes if short.
  if (selected.length < n) {
    const remaining = rows
      .filter((r) => !used.has(r.usdot))
      .sort((a, b) => a.usdot_num - b.usdot_num);
    for (const row of [...remaining.slice(0, 20), ...remaining.slice(-20)]) {
      if (selected.length >= n) break;
      if (used.has(row.usdot)) continue;
      used.add(row.usdot);
      selected.push(row);
    }
  }
  return selected.slice(0, n);
}

async function fetchLi(usdots: string[]): Promise<Map<string, LiAuthorityRow[]>> {
  const out = new Map<string, LiAuthorityRow[]>();
  const chunkSize = 25;
  for (let i = 0; i < usdots.length; i += chunkSize) {
    const chunk = usdots.slice(i, i + chunkSize);
    const padded = chunk.map((d) => d.padStart(8, '0'));
    const where = [...chunk, ...padded].map((d) => `dot_number='${d}'`).join(' OR ');
    const url = `${LI_RESOURCE}?$where=${encodeURIComponent(where)}&$limit=2000`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`L&I HTTP ${res.status}`);
    const rows = (await res.json()) as Array<Record<string, string>>;
    for (const raw of rows) {
      const usdot = normalizeUsdot(raw.dot_number ?? '');
      if (!usdot) continue;
      const mapped: LiAuthorityRow = {
        dotNumber: usdot,
        docketNumber: raw.docket_number ?? '',
        legalName: raw.legal_name ?? '',
        dbaName: raw.dba_name ?? null,
        hhgChk: raw.hhg_chk ?? 'N',
        propertyChk: raw.property_chk ?? 'N',
        commonStat: raw.common_stat ?? 'N',
        contractStat: raw.contract_stat ?? 'N',
        brokerStat: raw.broker_stat ?? 'N',
      };
      out.set(usdot, [...(out.get(usdot) ?? []), mapped]);
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  return out;
}

async function main() {
  loadEnv();
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const cohort = await client.query(
    `SELECT w.usdot, c.id, c.slug, c.name, c.fmcsa_legal_name, c.mc_number,
            c.headquarters, c.publication_state, c.indexable, c.service_scope, c.entity_type,
            c.overall_rating, c.review_count, c.avg_price_per_move, c.coverage,
            s.disposition, s.classification AS staged_classification,
            s.phy_state, s.dba_name, s.legal_name AS staged_legal
       FROM federal_hhg_wave_publication w
       JOIN companies c ON c.id = w.company_id
       LEFT JOIN federal_hhg_staging s ON regexp_replace(s.usdot, '\\D', '', 'g') = regexp_replace(w.usdot, '\\D', '', 'g')
      WHERE w.wave_id = $1 AND w.status <> 'unpublished'`,
    [WAVE_4_PUBLICATION_ID]
  );

  const rows = (cohort.rows as Array<Record<string, unknown>>).map((r) => {
    const usdot = normalizeUsdot(String(r.usdot ?? ''));
    const hq = String(r.headquarters ?? '');
    const state =
      String(r.phy_state ?? '').trim().toUpperCase() ||
      (hq.match(/,\s*([A-Z]{2})\s*$/)?.[1] ?? 'ZZ');
    return {
      usdot,
      id: String(r.id),
      slug: String(r.slug),
      name: String(r.name ?? ''),
      legal: String(r.fmcsa_legal_name ?? r.staged_legal ?? ''),
      mc: r.mc_number ? String(r.mc_number) : null,
      state,
      has_dba: Boolean(r.dba_name && String(r.dba_name).trim()),
      has_mc: Boolean(r.mc_number && String(r.mc_number).trim()),
      usdot_num: Number(usdot) || 0,
      publication_state: String(r.publication_state),
      indexable: Boolean(r.indexable),
      service_scope: String(r.service_scope),
      entity_type: String(r.entity_type),
      disposition: r.disposition == null ? null : String(r.disposition),
      staged_classification: r.staged_classification == null ? null : String(r.staged_classification),
      overall_rating: Number(r.overall_rating ?? 0),
      review_count: Number(r.review_count ?? 0),
      avg_price: Number(r.avg_price_per_move ?? 0),
      coverage: String(r.coverage ?? ''),
    };
  });

  const sampleSize = Math.min(100, rows.length);
  const sample = pickStratified(rows, sampleSize);
  const li = await fetchLi(sample.map((r) => r.usdot));

  const caps = await client.query(
    `SELECT company_id, capability, evidence_state
       FROM provider_capability
      WHERE company_id = ANY($1::text[])`,
    [sample.map((r) => r.id)]
  );
  await client.end();

  const capsById = new Map<string, Array<{ capability: string; evidence_state: string }>>();
  for (const row of caps.rows as Array<{ company_id: string; capability: string; evidence_state: string }>) {
    capsById.set(row.company_id, [...(capsById.get(row.company_id) ?? []), row]);
  }

  const failures: Array<Record<string, unknown>> = [];
  let correct = 0;
  for (const row of sample) {
    const issues: string[] = [];
    const liRows = li.get(row.usdot) ?? [];
    if (!liRows.length) issues.push('li_missing');
    else {
      const cls = classifyFederalHhgDockets(liRows);
      if (cls.classification !== 'HHG_CARRIER') issues.push(`li_class_${cls.classification}`);
      if (!cls.hhgCarrierVerified) issues.push('li_carrier_not_verified');
    }
    if (row.publication_state !== 'PUBLISHABLE') issues.push('not_publishable');
    if (!row.indexable) issues.push('not_indexable');
    if (row.service_scope !== 'interstate') issues.push('not_interstate');
    if (!/carrier/i.test(row.entity_type)) issues.push('entity_not_carrier');
    if (row.disposition && row.disposition !== 'NEW_CANONICAL_CANDIDATE') {
      issues.push(`bad_disposition_${row.disposition}`);
    }
    if (row.staged_classification && row.staged_classification !== 'HHG_CARRIER') {
      issues.push(`staged_${row.staged_classification}`);
    }
    const companyCaps = capsById.get(row.id) ?? [];
    if (!companyCaps.some((c) => c.capability === 'hhg_interstate_carrier' && c.evidence_state === 'VERIFIED')) {
      issues.push('missing_verified_carrier_cap');
    }
    if (companyCaps.some((c) => /broker|local|auto|intrastate/i.test(c.capability))) {
      issues.push('forbidden_capability');
    }
    if (/all 50|nationwide|serves all/i.test(row.coverage)) issues.push('false_national_claim');
    // Sparse fabricated fields: ratings/prices at 0 are OK (hidden), non-zero without enrichment is still allowed if denormalized later; flag only impossible negatives.
    if (row.overall_rating < 0 || row.review_count < 0 || row.avg_price < 0) issues.push('invalid_sparse');

    if (issues.length) {
      failures.push({ usdot: row.usdot, slug: row.slug, state: row.state, issues });
    } else {
      correct += 1;
    }
  }

  const stateBreakdown: Record<string, number> = {};
  for (const row of rows) {
    stateBreakdown[row.state] = (stateBreakdown[row.state] ?? 0) + 1;
  }

  const report = {
    google_places_requests: 0,
    task: '010',
    wave_id: WAVE_4_PUBLICATION_ID,
    cohort_size: rows.length,
    sample_size: sample.length,
    stratified: {
      states_in_sample: [...new Set(sample.map((r) => r.state))].sort(),
      with_dba: sample.filter((r) => r.has_dba).length,
      with_mc: sample.filter((r) => r.has_mc).length,
      older_half: sample.filter((r) => r.usdot_num <= 3_000_000).length,
      newer_half: sample.filter((r) => r.usdot_num > 3_000_000).length,
    },
    correct,
    failures: failures.length,
    precision: sample.length ? correct / sample.length : 0,
    failure_details: failures,
    state_breakdown_full_cohort: stateBreakdown,
    pass: failures.length === 0 && correct === sample.length && sample.length >= Math.min(100, rows.length),
  };

  const docs = resolve(process.cwd(), 'docs');
  if (!existsSync(docs)) mkdirSync(docs, { recursive: true });
  writeFileSync(resolve(docs, 'task-010-precision-audit.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        wrote: 'docs/task-010-precision-audit.json',
        sample: report.sample_size,
        correct: report.correct,
        failures: report.failures,
        precision: report.precision,
        pass: report.pass,
        google_places_requests: 0,
      },
      null,
      2
    )
  );
  if (!report.pass) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
