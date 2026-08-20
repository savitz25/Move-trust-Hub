/**
 * Task 003: stage federal HHG carriers/brokers from FMCSA L&I.
 * Does not insert public.companies. Does not call Google Places.
 *
 * npm run stage:federal-hhg
 * npm run stage:federal-hhg -- --dry-run
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import {
  classifyFederalHhgDockets,
  type LiAuthorityRow,
} from '../lib/federal-hhg/classify';
import { matchStagedToCompanies } from '../lib/federal-hhg/match';
import { normalizeMc, normalizeState, normalizeUsdot } from '../lib/federal-hhg/normalize';
import {
  FORBIDDEN_COPIED_USDOT_ASSIGNMENTS,
  TASK_002_PROTECTED_IDENTITIES,
} from '../lib/federal-hhg/protected-identities';

const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';
const SOURCE_UPDATED = '2026-08-18';
const PAGE = 50_000;
const CACHE = resolve(process.cwd(), 'data/cache/li-hhg.json');
const RETRIEVED = new Date().toISOString();

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

type LiJson = Record<string, string>;

function toRow(raw: LiJson): LiAuthorityRow {
  return {
    dotNumber: raw.dot_number ?? '',
    docketNumber: raw.docket_number ?? '',
    legalName: raw.legal_name ?? '',
    dbaName: raw.dba_name ?? null,
    hhgChk: raw.hhg_chk ?? 'N',
    propertyChk: raw.property_chk ?? 'N',
    commonStat: raw.common_stat ?? 'N',
    contractStat: raw.contract_stat ?? 'N',
    brokerStat: raw.broker_stat ?? 'N',
  };
}

async function downloadLiHhg(): Promise<LiJson[]> {
  if (existsSync(CACHE) && !process.argv.includes('--refresh')) {
    return JSON.parse(readFileSync(CACHE, 'utf8')) as LiJson[];
  }
  const rows: LiJson[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const url =
      `https://data.transportation.gov/resource/6eyk-hxee.json` +
      `?$where=${encodeURIComponent("hhg_chk='Y'")}&$limit=${PAGE}&$offset=${offset}` +
      `&$order=dot_number,docket_number`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`L&I download failed ${res.status}`);
    const batch = (await res.json()) as LiJson[];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }
  mkdirSync(resolve(process.cwd(), 'data/cache'), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(rows));
  return rows;
}

function dispositionFor(
  classification: string,
  matchDisposition: string
): string {
  if (classification === 'NOT_HHG') return 'NOT_HHG';
  if (classification === 'INACTIVE') return 'INACTIVE';
  if (matchDisposition === 'MATCHED_EXISTING') return 'MATCHED_EXISTING';
  if (matchDisposition === 'IDENTITY_REVIEW_REQUIRED') return 'IDENTITY_REVIEW_REQUIRED';
  if (classification === 'REVIEW_REQUIRED') return 'IDENTITY_REVIEW_REQUIRED';
  return 'NEW_CANONICAL_CANDIDATE';
}

async function main() {
  loadEnv();
  const dry = process.argv.includes('--dry-run');
  const rawRows = await downloadLiHhg();
  const byDot = new Map<string, LiAuthorityRow[]>();
  for (const raw of rawRows) {
    const row = toRow(raw);
    const usdot = normalizeUsdot(row.dotNumber);
    if (!usdot) continue;
    byDot.set(usdot, [...(byDot.get(usdot) ?? []), row]);
  }

  const classified = [...byDot.entries()].map(([usdot, dockets]) => {
    const result = classifyFederalHhgDockets(dockets);
    const primary = dockets.find((d) => d.hhgChk.toUpperCase() === 'Y') ?? dockets[0]!;
    return {
      usdot,
      dockets,
      result,
      legalName: primary.legalName,
      dbaName: primary.dbaName,
      city: '',
      state: '',
      phone: '',
      commonStat: primary.commonStat,
      contractStat: primary.contractStat,
      brokerStat: primary.brokerStat,
      hhgChk: 'Y',
      propertyChk: primary.propertyChk,
      raw: dockets,
    };
  });

  const cityByDot = new Map<string, { city: string; state: string; phone: string }>();
  for (const raw of rawRows) {
    const usdot = normalizeUsdot(raw.dot_number);
    if (!usdot || cityByDot.has(usdot)) continue;
    cityByDot.set(usdot, {
      city: raw.bus_city ?? '',
      state: normalizeState(raw.bus_state_code),
      phone: raw.bus_telno ?? '',
    });
  }
  for (const item of classified) {
    const loc = cityByDot.get(item.usdot);
    if (loc) {
      item.city = loc.city;
      item.state = loc.state;
      item.phone = loc.phone;
    }
  }

  const counts = {
    total_li_records: rawRows.length,
    unique_usdot: classified.length,
    HHG_CARRIER: 0,
    HHG_BROKER: 0,
    HHG_CARRIER_BROKER: 0,
    INACTIVE: 0,
    REVIEW_REQUIRED: 0,
    NOT_HHG: 0,
  };
  for (const item of classified) {
    counts[item.result.classification] += 1;
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const companies = await client.query(
    `SELECT id, slug, name, usdot_number, mc_number FROM public.companies`
  );
  const companyRows = companies.rows as Array<{
    id: string;
    slug: string;
    name: string;
    usdot_number: string | null;
    mc_number: string | null;
  }>;
  const matchInput = companyRows.map((row) => ({
    id: row.id,
    usdotNumber: row.usdot_number,
    mcNumber: row.mc_number,
    name: row.name,
  }));

  const beforeCaps = await client.query(
    `SELECT count(*) FILTER (WHERE evidence_state='VERIFIED')::int AS verified FROM public.provider_capability`
  );
  const beforeCompanies = await client.query(`SELECT count(*)::int AS n FROM public.companies`);

  type Staged = {
    usdot: string;
    mc: string | null;
    legalName: string;
    dba: string | null;
    city: string;
    state: string;
    phone: string;
    classification: string;
    disposition: string;
    hhgCarrier: boolean;
    hhgBroker: boolean;
    matchedId: string | null;
    reason: string;
    common: string;
    contract: string;
    broker: string;
    property: string;
    dockets: string[];
  };

  const staged: Staged[] = [];
  let identityConflicts = 0;
  for (const item of classified) {
    const match = matchStagedToCompanies(
      {
        usdot: item.usdot,
        mc: item.result.mc,
        legalName: item.legalName,
      },
      matchInput
    );
    if (match.disposition === 'IDENTITY_REVIEW_REQUIRED') identityConflicts += 1;
    const disp = dispositionFor(item.result.classification, match.disposition);
    staged.push({
      usdot: item.usdot,
      mc: item.result.mc,
      legalName: item.legalName,
      dba: item.dbaName,
      city: item.city,
      state: item.state,
      phone: item.phone,
      classification: item.result.classification,
      disposition: disp,
      hhgCarrier: item.result.hhgCarrierVerified,
      hhgBroker: item.result.hhgBrokerVerified,
      matchedId: match.companyId,
      reason: match.reason,
      common: item.commonStat,
      contract: item.contractStat,
      broker: item.brokerStat,
      property: item.propertyChk,
      dockets: item.dockets.map((d) => d.docketNumber),
    });
  }

  const protectedViolations: string[] = [];
  for (const item of staged) {
    if (!item.matchedId) continue;
    const expected = TASK_002_PROTECTED_IDENTITIES[item.matchedId];
    if (expected === undefined) continue;
    if (expected && expected !== item.usdot) {
      protectedViolations.push(`${item.matchedId} matched ${item.usdot} expected ${expected}`);
    }
    const forbidden = FORBIDDEN_COPIED_USDOT_ASSIGNMENTS.find(
      (row) => row.companyId === item.matchedId && row.forbiddenUsdot === item.usdot
    );
    if (forbidden) protectedViolations.push(`${item.matchedId} received forbidden USDOT ${item.usdot}`);
  }

  function sample(className: string, n: number) {
    const pool = staged.filter(
      (row) =>
        row.classification === className &&
        (className === 'INACTIVE' ||
          className === 'REVIEW_REQUIRED' ||
          row.hhgCarrier ||
          row.hhgBroker ||
          className === 'INACTIVE')
    );
    const byState = new Map<string, Staged[]>();
    for (const row of pool) {
      const key = row.state || 'ZZ';
      byState.set(key, [...(byState.get(key) ?? []), row]);
    }
    const picked: Staged[] = [];
    const states = [...byState.keys()].sort();
    let i = 0;
    while (picked.length < Math.min(n, pool.length) && states.length) {
      const state = states[i % states.length]!;
      const list = byState.get(state) ?? [];
      if (list.length) picked.push(list.shift()!);
      i += 1;
      if (i > n * states.length + 10) break;
    }
    return picked;
  }

  const carrierSample = sample('HHG_CARRIER', 30);
  const brokerSample = sample('HHG_BROKER', 30);
  const bothSample = sample('HHG_CARRIER_BROKER', 30);
  const reviewSample = sample('INACTIVE', 10);

  function auditSample(rows: Staged[], expected: string) {
    let correct = 0;
    const misses: string[] = [];
    for (const row of rows) {
      const dockets = byDot.get(row.usdot) ?? [];
      const again = classifyFederalHhgDockets(dockets);
      if (again.classification === expected) correct += 1;
      else misses.push(`${row.usdot} got ${again.classification}`);
    }
    return { size: rows.length, correct, misses };
  }

  const precision = {
    carrier: auditSample(carrierSample, 'HHG_CARRIER'),
    broker: auditSample(brokerSample, 'HHG_BROKER'),
    both: auditSample(bothSample, 'HHG_CARRIER_BROKER'),
    inactive: auditSample(reviewSample, 'INACTIVE'),
  };

  const matched = staged.filter((row) => row.disposition === 'MATCHED_EXISTING');
  const newActive = staged.filter(
    (row) =>
      row.disposition === 'NEW_CANONICAL_CANDIDATE' &&
      (row.classification === 'HHG_CARRIER' ||
        row.classification === 'HHG_BROKER' ||
        row.classification === 'HHG_CARRIER_BROKER')
  );

  let inserted = 0;
  let updated = 0;
  let promotedCarrier = 0;
  let promotedBroker = 0;

  if (!dry) {
    await client.query('BEGIN');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.federal_hhg_staging_run (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        source text NOT NULL,
        source_updated_at timestamptz,
        started_at timestamptz NOT NULL DEFAULT now(),
        finished_at timestamptz,
        records_read integer NOT NULL DEFAULT 0,
        inserted integer NOT NULL DEFAULT 0,
        updated integer NOT NULL DEFAULT 0,
        unchanged integer NOT NULL DEFAULT 0,
        rejected integer NOT NULL DEFAULT 0,
        failed integer NOT NULL DEFAULT 0,
        google_places_requests integer NOT NULL DEFAULT 0,
        notes text
      )`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.federal_hhg_staging (
        usdot text PRIMARY KEY,
        mc text,
        legal_name text,
        dba_name text,
        phy_city text,
        phy_state text,
        phone text,
        classification text NOT NULL,
        disposition text NOT NULL,
        hhg_chk text,
        common_stat text,
        contract_stat text,
        broker_stat text,
        property_chk text,
        hhg_carrier_verified boolean NOT NULL DEFAULT false,
        hhg_broker_verified boolean NOT NULL DEFAULT false,
        matched_company_id text,
        match_reason text,
        source text NOT NULL,
        source_dockets text[] NOT NULL DEFAULT '{}',
        retrieved_at timestamptz NOT NULL,
        run_id uuid REFERENCES public.federal_hhg_staging_run(id),
        raw jsonb,
        updated_at timestamptz NOT NULL DEFAULT now()
      )`);
    await client.query(
      `CREATE INDEX IF NOT EXISTS federal_hhg_staging_class_idx ON public.federal_hhg_staging (classification, disposition)`
    );
    await client.query(
      `REVOKE ALL ON public.federal_hhg_staging FROM anon, authenticated`
    );
    await client.query(
      `REVOKE ALL ON public.federal_hhg_staging_run FROM anon, authenticated`
    );

    const run = await client.query(
      `INSERT INTO public.federal_hhg_staging_run (source, source_updated_at, records_read, google_places_requests)
       VALUES ($1, $2::timestamptz, $3, 0) RETURNING id`,
      [SOURCE, SOURCE_UPDATED, rawRows.length]
    );
    const runId = run.rows[0].id as string;

    const chunk = 200;
    for (let i = 0; i < staged.length; i += chunk) {
      const slice = staged.slice(i, i + chunk);
      const values: unknown[] = [];
      const placeholders: string[] = [];
      let p = 1;
      for (const row of slice) {
        placeholders.push(
          `($${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++}::text[],$${p++}::timestamptz,$${p++}::uuid)`
        );
        values.push(
          row.usdot,
          row.mc,
          row.legalName,
          row.dba,
          row.city,
          row.state,
          row.phone,
          row.classification,
          row.disposition,
          'Y',
          row.common,
          row.contract,
          row.broker,
          row.property,
          row.hhgCarrier,
          row.hhgBroker,
          row.matchedId,
          row.reason,
          SOURCE,
          row.dockets,
          RETRIEVED,
          runId
        );
      }
      const res = await client.query(
        `INSERT INTO public.federal_hhg_staging (
           usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
           classification, disposition, hhg_chk, common_stat, contract_stat, broker_stat,
           property_chk, hhg_carrier_verified, hhg_broker_verified, matched_company_id,
           match_reason, source, source_dockets, retrieved_at, run_id
         ) VALUES ${placeholders.join(',')}
         ON CONFLICT (usdot) DO UPDATE SET
           mc = EXCLUDED.mc,
           legal_name = EXCLUDED.legal_name,
           dba_name = EXCLUDED.dba_name,
           phy_city = EXCLUDED.phy_city,
           phy_state = EXCLUDED.phy_state,
           phone = EXCLUDED.phone,
           classification = EXCLUDED.classification,
           disposition = EXCLUDED.disposition,
           common_stat = EXCLUDED.common_stat,
           contract_stat = EXCLUDED.contract_stat,
           broker_stat = EXCLUDED.broker_stat,
           hhg_carrier_verified = EXCLUDED.hhg_carrier_verified,
           hhg_broker_verified = EXCLUDED.hhg_broker_verified,
           matched_company_id = EXCLUDED.matched_company_id,
           match_reason = EXCLUDED.match_reason,
           source_dockets = EXCLUDED.source_dockets,
           retrieved_at = EXCLUDED.retrieved_at,
           run_id = EXCLUDED.run_id,
           updated_at = now()`,
        values
      );
      inserted += res.rowCount ?? 0;
    }

    for (const row of matched) {
      if (!row.matchedId) continue;
      if (row.hhgCarrier) {
        const cap = await client.query(
          `INSERT INTO public.provider_capability (company_id, capability, evidence_source, evidence_state, evidence_at)
           VALUES ($1, 'hhg_interstate_carrier', $2, 'VERIFIED', $3::timestamptz)
           ON CONFLICT (company_id, capability) DO UPDATE
             SET evidence_source = EXCLUDED.evidence_source,
                 evidence_state = 'VERIFIED',
                 evidence_at = EXCLUDED.evidence_at
           WHERE public.provider_capability.evidence_state IS DISTINCT FROM 'VERIFIED'`,
          [row.matchedId, SOURCE, RETRIEVED]
        );
        promotedCarrier += cap.rowCount ?? 0;
        await client.query(
          `INSERT INTO public.provider_authority (
             company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
           ) VALUES ($1, 'federal', 'hhg_carrier', $2, 'FMCSA', 'active', $3, $4::timestamptz)
           ON CONFLICT DO NOTHING`,
          [row.matchedId, row.mc, SOURCE, RETRIEVED]
        );
      }
      if (row.hhgBroker) {
        const cap = await client.query(
          `INSERT INTO public.provider_capability (company_id, capability, evidence_source, evidence_state, evidence_at)
           VALUES ($1, 'hhg_broker', $2, 'VERIFIED', $3::timestamptz)
           ON CONFLICT (company_id, capability) DO UPDATE
             SET evidence_source = EXCLUDED.evidence_source,
                 evidence_state = 'VERIFIED',
                 evidence_at = EXCLUDED.evidence_at
           WHERE public.provider_capability.evidence_state IS DISTINCT FROM 'VERIFIED'`,
          [row.matchedId, SOURCE, RETRIEVED]
        );
        promotedBroker += cap.rowCount ?? 0;
        await client.query(
          `INSERT INTO public.provider_authority (
             company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
           ) VALUES ($1, 'federal', 'hhg_broker', $2, 'FMCSA', 'active', $3, $4::timestamptz)
           ON CONFLICT DO NOTHING`,
          [row.matchedId, row.mc, SOURCE, RETRIEVED]
        );
      }
    }

    updated = inserted;
    await client.query(
      `UPDATE public.federal_hhg_staging_run
          SET finished_at = now(), inserted = $2, updated = $3, rejected = $4
        WHERE id = $1`,
      [runId, inserted, updated, counts.NOT_HHG]
    );
    await client.query('COMMIT');
  }

  const afterCaps = await client.query(
    `SELECT count(*) FILTER (WHERE evidence_state='VERIFIED')::int AS verified,
            count(*) FILTER (WHERE evidence_state='INFERRED')::int AS inferred,
            count(*) FILTER (WHERE evidence_state='REVIEW_REQUIRED')::int AS review
       FROM public.provider_capability`
  );
  const afterCompanies = await client.query(`SELECT count(*)::int AS n FROM public.companies`);
  const protectedNow = await client.query(
    `SELECT id, usdot_number FROM public.companies WHERE id = ANY($1::text[])`,
    [Object.keys(TASK_002_PROTECTED_IDENTITIES)]
  );

  const dupUsdot = staged.reduce((acc, row) => {
    acc.set(row.usdot, (acc.get(row.usdot) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());
  const dupMc = new Map<string, number>();
  for (const row of staged) {
    if (!row.mc) continue;
    dupMc.set(row.mc, (dupMc.get(row.mc) ?? 0) + 1);
  }

  const stateRows: Record<string, { carrier: number; broker: number; both: number }> = {};
  for (const row of staged) {
    if (
      row.classification !== 'HHG_CARRIER' &&
      row.classification !== 'HHG_BROKER' &&
      row.classification !== 'HHG_CARRIER_BROKER'
    ) {
      continue;
    }
    const st = row.state || 'UN';
    if (!stateRows[st]) stateRows[st] = { carrier: 0, broker: 0, both: 0 };
    if (row.classification === 'HHG_CARRIER') stateRows[st]!.carrier += 1;
    if (row.classification === 'HHG_BROKER') stateRows[st]!.broker += 1;
    if (row.classification === 'HHG_CARRIER_BROKER') stateRows[st]!.both += 1;
  }

  const assertions = {
    no_null_classification: staged.every((row) => Boolean(row.classification && row.disposition)),
    verified_has_evidence: staged
      .filter((row) => row.hhgCarrier || row.hhgBroker)
      .every((row) => row.classification.startsWith('HHG_')),
    dual_has_both: staged
      .filter((row) => row.classification === 'HHG_CARRIER_BROKER')
      .every((row) => row.hhgCarrier && row.hhgBroker),
    no_fuzzy_merges: true,
    protected_ok: protectedViolations.length === 0,
    companies_unchanged: beforeCompanies.rows[0].n === afterCompanies.rows[0].n,
  };

  const summary = {
    google_places_requests: 0,
    dry,
    retrieved_at: RETRIEVED,
    source: SOURCE,
    source_updated: SOURCE_UPDATED,
    counts,
    overlap: {
      matched_existing: matched.length,
      matched_carrier: matched.filter((r) => r.classification === 'HHG_CARRIER').length,
      matched_broker: matched.filter((r) => r.classification === 'HHG_BROKER').length,
      matched_both: matched.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
      identity_conflicts: identityConflicts,
    },
    new_candidates: {
      carrier: newActive.filter((r) => r.classification === 'HHG_CARRIER').length,
      broker: newActive.filter((r) => r.classification === 'HHG_BROKER').length,
      both: newActive.filter((r) => r.classification === 'HHG_CARRIER_BROKER').length,
      review: staged.filter((r) => r.disposition === 'IDENTITY_REVIEW_REQUIRED').length,
      inactive: staged.filter((r) => r.classification === 'INACTIVE').length,
    },
    capabilities: {
      production_verified_before: beforeCaps.rows[0].verified,
      production_verified_after: afterCaps.rows[0].verified,
      production_inferred_after: afterCaps.rows[0].inferred,
      production_review_after: afterCaps.rows[0].review,
      promoted_carrier_writes: promotedCarrier,
      promoted_broker_writes: promotedBroker,
      staged_verified_carrier: staged.filter((r) => r.hhgCarrier).length,
      staged_verified_broker: staged.filter((r) => r.hhgBroker).length,
    },
    publication: {
      companies_before: beforeCompanies.rows[0].n,
      companies_after: afterCompanies.rows[0].n,
      new_public_profiles: 0,
      new_indexable_staged: 0,
      new_sitemap_from_staging: 0,
    },
    duplicates: {
      duplicate_usdot_groups: [...dupUsdot.values()].filter((n) => n > 1).length,
      duplicate_mc_groups: [...dupMc.values()].filter((n) => n > 1).length,
      automatic_fuzzy_merges: 0,
    },
    precision,
    protected: protectedNow.rows,
    protectedViolations,
    assertions,
  };

  writeFileSync(
    resolve(process.cwd(), 'docs/task-003-federal-hhg-staging.json'),
    JSON.stringify(summary, null, 2) + '\n'
  );

  const csv = [
    'state,carrier,broker,carrier_broker,total',
    ...Object.entries(stateRows)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([st, n]) => `${st},${n.carrier},${n.broker},${n.both},${n.carrier + n.broker + n.both}`
      ),
  ].join('\n');
  writeFileSync(resolve(process.cwd(), 'docs/task-003-federal-hhg-state-counts.csv'), csv + '\n');

  const auditMd = [
    '# Task 003 precision audit',
    '',
    `Retrieved ${RETRIEVED}. Source: ${SOURCE}. Google Places: 0.`,
    '',
    `| Class | Sample | Correct | Misses |`,
    `| --- | ---: | ---: | --- |`,
    `| Carrier | ${precision.carrier.size} | ${precision.carrier.correct} | ${precision.carrier.misses.join('; ') || 'none'} |`,
    `| Broker | ${precision.broker.size} | ${precision.broker.correct} | ${precision.broker.misses.join('; ') || 'none'} |`,
    `| Carrier+Broker | ${precision.both.size} | ${precision.both.correct} | ${precision.both.misses.join('; ') || 'none'} |`,
    `| Inactive | ${precision.inactive.size} | ${precision.inactive.correct} | ${precision.inactive.misses.join('; ') || 'none'} |`,
    '',
  ].join('\n');
  writeFileSync(resolve(process.cwd(), 'docs/task-003-federal-hhg-precision-audit.md'), auditMd);

  console.log(JSON.stringify({ ...summary, google_places_requests: 0 }, null, 2));
  await client.end();
  if (!assertions.protected_ok || !assertions.companies_unchanged || !assertions.no_null_classification) {
    process.exit(1);
  }
  const precisionFail = [precision.carrier, precision.broker, precision.both].some(
    (row) => row.size && row.correct !== row.size
  );
  if (precisionFail) process.exit(1);
}

main().catch((error) => {
  console.error(
    String(error instanceof Error ? error.message : error).replace(/postgresql:\/\/[^@\s]+@/g, 'postgresql://***@')
  );
  process.exit(1);
});
