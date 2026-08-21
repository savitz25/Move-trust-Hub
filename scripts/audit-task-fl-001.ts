/**
 * Task FL-001 — read-only Florida regulatory discovery audit.
 * Does not publish, mutate companies, or call Google Places.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { FloridaStateMoverAdapter, parseFdacsCsv } from '../lib/state-hhg/fl/adapter';
import { matchStateRegistryIdentity, type CanonicalProviderIdentity } from '../lib/state-hhg/identity';
import { loadFdacsLegacyXls } from '../lib/state-hhg/fl/legacy-xls';

function loadEnv() {
  for (const file of [
    resolve(process.cwd(), '.env.local'),
    resolve('C:/Users/makei/move-trust-hub-task004/.env.local'),
    resolve(process.cwd(), '.env.production.local'),
  ]) {
    if (!existsSync(file)) continue;
    for (const raw of readFileSync(file, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

function coverage(n: number, d: number): string {
  if (!d) return '0%';
  return `${((100 * n) / d).toFixed(1)}%`;
}

async function main() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const baseline = await client.query(`
    WITH fl AS (
      SELECT
        c.id,
        c.name,
        c.fmcsa_legal_name,
        c.slug,
        c.entity_type,
        c.service_scope,
        c.headquarters,
        c.physical_address,
        c.phone,
        c.email,
        c.website,
        c.usdot_number,
        c.mc_number,
        c.publication_state,
        c.indexable,
        regexp_replace(coalesce(c.usdot_number,''), '\\D', '', 'g') AS usdot_norm
      FROM companies c
      WHERE
        c.headquarters ~* '(^|[,\\s])FL(\\s|$|,)'
        OR c.headquarters ILIKE '%Florida%'
        OR c.physical_address ~* '(^|[,\\s])FL(\\s|$|,)'
    )
    SELECT
      count(*)::int AS total,
      count(*) FILTER (WHERE nullif(usdot_norm,'') IS NOT NULL)::int AS with_usdot,
      count(*) FILTER (WHERE nullif(regexp_replace(coalesce(mc_number,''),'\\D','','g'),'') IS NOT NULL)::int AS with_mc,
      count(*) FILTER (WHERE nullif(usdot_norm,'') IS NULL)::int AS without_federal_id,
      count(*) FILTER (WHERE nullif(phone,'') IS NOT NULL)::int AS with_phone,
      count(*) FILTER (WHERE nullif(email,'') IS NOT NULL)::int AS with_email,
      count(*) FILTER (WHERE nullif(website,'') IS NOT NULL)::int AS with_website,
      count(*) FILTER (WHERE physical_address ~ '[0-9]' AND physical_address ~* '(street|st|ave|blvd|rd|dr|ln|way|hwy|ct|pkwy|circle|cir|suite|ste|#)' )::int AS with_streetish,
      count(*) FILTER (WHERE nullif(physical_address,'') IS NOT NULL)::int AS with_physical_address,
      count(*) FILTER (WHERE nullif(headquarters,'') IS NOT NULL)::int AS with_hq,
      count(*) FILTER (WHERE service_scope = 'interstate')::int AS interstate,
      count(*) FILTER (WHERE service_scope = 'intrastate')::int AS intrastate,
      count(*) FILTER (WHERE entity_type ILIKE '%carrier/broker%' OR entity_type ILIKE '%carrier + broker%')::int AS dual_entity,
      count(*) FILTER (WHERE entity_type ILIKE '%broker%' AND entity_type NOT ILIKE '%carrier%')::int AS broker_entity,
      count(*) FILTER (WHERE entity_type ILIKE '%carrier%' AND entity_type NOT ILIKE '%broker%')::int AS carrier_entity,
      count(*) FILTER (WHERE entity_type ILIKE '%auto%')::int AS auto_entity,
      count(DISTINCT lower(trim(name)))::int AS unique_public_names,
      count(DISTINCT lower(trim(coalesce(fmcsa_legal_name, name))))::int AS unique_legalish_names
    FROM fl
  `);

  const roles = await client.query(`
    WITH fl AS (
      SELECT c.id, c.entity_type, c.service_scope
      FROM companies c
      WHERE c.headquarters ~* '(^|[,\\s])FL(\\s|$|,)'
         OR c.headquarters ILIKE '%Florida%'
         OR c.physical_address ~* '(^|[,\\s])FL(\\s|$|,)'
    )
    SELECT
      coalesce(pc.capability, 'none') AS capability,
      count(DISTINCT fl.id)::int AS n
    FROM fl
    LEFT JOIN provider_capability pc ON pc.company_id = fl.id
    GROUP BY 1
    ORDER BY n DESC
  `);

  const dupes = await client.query(`
    WITH fl AS (
      SELECT id, name, usdot_number, headquarters
      FROM companies
      WHERE headquarters ~* '(^|[,\\s])FL(\\s|$|,)'
         OR headquarters ILIKE '%Florida%'
         OR physical_address ~* '(^|[,\\s])FL(\\s|$|,)'
    )
    SELECT lower(trim(name)) AS nkey, count(*)::int AS n, array_agg(id ORDER BY id) AS ids
      FROM fl
     GROUP BY 1
    HAVING count(*) > 1
     ORDER BY n DESC, nkey
     LIMIT 25
  `);

  const universe = await client.query(`
    SELECT id, name, fmcsa_legal_name, usdot_number, phone, physical_address, headquarters,
           publication_state, indexable
      FROM companies
  `);

  const flAuthority = await client.query(`
    SELECT
      count(*)::int AS n,
      count(*) FILTER (WHERE verification_state='VERIFIED')::int AS verified,
      count(*) FILTER (WHERE company_id IS NOT NULL)::int AS attached
    FROM provider_state_authority
    WHERE state_code='FL'
  `).catch(() => ({ rows: [{ n: 0, verified: 0, attached: 0 }] }));

  await client.end();

  const adapter = new FloridaStateMoverAdapter({ retrievedAt: '2026-08-21T00:00:00.000Z' });
  const raw = await adapter.fetchOrLoadRegistry();
  const normalized = raw.map((row) => adapter.normalizeRecord(row));

  const movers = normalized.filter((r) => r.raw.roleClass !== 'broker');
  const brokers = normalized.filter((r) => r.raw.roleClass === 'broker');
  const contracted = normalized.filter((r) => String(r.raw.contractedMovers ?? '').trim());

  const csvMoverPath = resolve(process.cwd(), 'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv');
  const csvBrokerPath = resolve(process.cwd(), 'data/state-hhg/fl/fdacs-moving-brokers-newdb.csv');
  const csvMovers = existsSync(csvMoverPath) ? parseFdacsCsv(readFileSync(csvMoverPath, 'utf8')) : [];
  const csvBrokers = existsSync(csvBrokerPath) ? parseFdacsCsv(readFileSync(csvBrokerPath, 'utf8')) : [];
  const csvContracted = [...csvMovers, ...csvBrokers].filter((r) => r.contractedMovers.trim());

  const legacyIm = existsSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-im-active.xls'))
    ? loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-im-active.xls'))
    : [];
  const legacyMb = existsSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-mb-active.xls'))
    ? loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-mb-active.xls'))
    : [];

  const providers: CanonicalProviderIdentity[] = (
    universe.rows as Array<{
      id: string;
      name: string;
      fmcsa_legal_name: string | null;
      usdot_number: string | null;
      phone: string | null;
      physical_address: string | null;
      headquarters: string | null;
      publication_state: string | null;
      indexable: boolean | null;
    }>
  ).map((row) => ({
    companyId: row.id,
    legalName: row.fmcsa_legal_name,
    dbaName: null,
    publicName: row.name,
    usdot: row.usdot_number,
    phone: row.phone,
    address: row.physical_address,
    city: (row.headquarters ?? '').split(',')[0] ?? null,
    state: 'FL',
    postalCode: null,
    publicationState: row.publication_state,
    indexable: row.indexable,
  }));

  const samplePool = [...normalized].sort((a, b) =>
    String(a.authorityNumber ?? '').localeCompare(String(b.authorityNumber ?? ''))
  );
  const picks: typeof samplePool = [];
  const used = new Set<string>();
  const take = (pred: (r: (typeof samplePool)[number]) => boolean, n: number) => {
    let added = 0;
    for (const row of samplePool) {
      const key = String(row.authorityNumber ?? row.legalName);
      if (used.has(key)) continue;
      if (!pred(row)) continue;
      used.add(key);
      picks.push(row);
      added += 1;
      if (added >= n || picks.length >= 40) break;
    }
  };
  take((r) => r.raw.roleClass === 'broker', 6);
  take((r) => r.status !== 'active', 4);
  take((r) => Boolean(r.dba), 8);
  take((r) => Boolean(r.email) && r.raw.roleClass !== 'broker', 10);
  take((r) => !r.email && r.raw.roleClass !== 'broker', 4);
  take(() => true, 40);

  const matchRows = picks.slice(0, 40).map((record) => {
    const result = matchStateRegistryIdentity(
      {
        legalName: record.legalName,
        dba: record.dba,
        usdot: record.usdot,
        phone: record.phone,
        physicalAddress: record.physicalAddress,
        city: record.city,
        postalCode: record.postalCode,
        statusNormalized: record.status,
        roleClass: (record.raw.roleClass as 'mover' | 'broker') ?? 'mover',
        authorityNumber: record.authorityNumber,
      },
      providers
    );
    let linkStatus: 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_FOUND' | 'NOT_APPLICABLE' =
      'NOT_FOUND';
    if (result.disposition === 'HISTORICAL' || result.disposition === 'OUT_OF_SCOPE') {
      linkStatus = 'NOT_APPLICABLE';
    } else if (result.disposition === 'REVIEW_REQUIRED') {
      linkStatus = 'REVIEW_REQUIRED';
    } else if (result.disposition === 'MATCHED_EXISTING') {
      linkStatus = 'VERIFIED';
    } else {
      linkStatus = 'NOT_FOUND';
    }
    return {
      license: record.authorityNumber,
      legalName: record.legalName,
      dba: record.dba,
      city: record.city,
      role: record.raw.roleClass,
      status: record.status,
      phone: Boolean(record.phone),
      email: Boolean(record.email),
      hasUsdotInSource: Boolean(record.usdot),
      disposition: result.disposition,
      matchMethod: result.matchMethod,
      linkStatus,
      matchedCompanyId: result.matchedCompanyId,
      reviewReason: result.reviewReason,
      franchiseSafetyHold: result.franchiseSafetyHold,
    };
  });

  const linkCounts = {
    VERIFIED: matchRows.filter((r) => r.linkStatus === 'VERIFIED').length,
    REVIEW_REQUIRED: matchRows.filter((r) => r.linkStatus === 'REVIEW_REQUIRED').length,
    NOT_FOUND: matchRows.filter((r) => r.linkStatus === 'NOT_FOUND').length,
    NOT_APPLICABLE: matchRows.filter((r) => r.linkStatus === 'NOT_APPLICABLE').length,
  };

  const report = {
    google_places_requests: 0,
    published: false,
    db_mutated: false,
    baseline: baseline.rows[0],
    capability_mix: roles.rows,
    duplicate_name_groups: dupes.rows.length,
    duplicate_name_sample: dupes.rows.slice(0, 10),
    existing_fl_state_authority: flAuthority.rows[0],
    fdacs_universe: {
      combined_normalized: normalized.length,
      movers: movers.length,
      brokers: brokers.length,
      with_phone: normalized.filter((r) => r.phone).length,
      with_email: normalized.filter((r) => r.email).length,
      with_address: normalized.filter((r) => r.physicalAddress).length,
      with_dba: normalized.filter((r) => r.dba).length,
      with_usdot: normalized.filter((r) => r.usdot).length,
      with_website: normalized.filter((r) => r.website).length,
      contracted_movers_nonempty: contracted.length,
      statuses: normalized.reduce((acc: Record<string, number>, r) => {
        acc[r.status] = (acc[r.status] ?? 0) + 1;
        return acc;
      }, {}),
    },
    snapshots: {
      legacy_im: legacyIm.length,
      legacy_mb: legacyMb.length,
      new_portal_movers: csvMovers.length,
      new_portal_brokers: csvBrokers.length,
      new_portal_contracted_nonempty: csvContracted.length,
    },
    sample_match: {
      sampled: matchRows.length,
      ...linkCounts,
      methods: matchRows.reduce((acc: Record<string, number>, r) => {
        acc[r.matchMethod] = (acc[r.matchMethod] ?? 0) + 1;
        return acc;
      }, {}),
      rows: matchRows,
    },
  };

  const outDir = resolve(process.cwd(), 'data/regulatory/florida/normalized');
  mkdirSync(outDir, { recursive: true });
  mkdirSync(resolve(process.cwd(), 'data/regulatory/florida/raw'), { recursive: true });
  writeFileSync(
    resolve(outDir, 'fl-001-audit.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-001-audit.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        baseline: report.baseline,
        fdacs_universe: report.fdacs_universe,
        snapshots: report.snapshots,
        sample_match: {
          sampled: report.sample_match.sampled,
          VERIFIED: linkCounts.VERIFIED,
          REVIEW_REQUIRED: linkCounts.REVIEW_REQUIRED,
          NOT_FOUND: linkCounts.NOT_FOUND,
          NOT_APPLICABLE: linkCounts.NOT_APPLICABLE,
          methods: report.sample_match.methods,
        },
        duplicate_name_groups: report.duplicate_name_groups,
        existing_fl_state_authority: report.existing_fl_state_authority,
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        baseline: {
          ...baseline.rows[0],
          usdot_pct: coverage(baseline.rows[0].with_usdot, baseline.rows[0].total),
          mc_pct: coverage(baseline.rows[0].with_mc, baseline.rows[0].total),
          phone_pct: coverage(baseline.rows[0].with_phone, baseline.rows[0].total),
          email_pct: coverage(baseline.rows[0].with_email, baseline.rows[0].total),
          website_pct: coverage(baseline.rows[0].with_website, baseline.rows[0].total),
        },
        fdacs: report.fdacs_universe,
        snapshots: report.snapshots,
        sample_match: report.sample_match.sampled && {
          sampled: matchRows.length,
          ...linkCounts,
          methods: report.sample_match.methods,
        },
        duplicate_name_groups: dupes.rows.length,
        fl_state_authority: flAuthority.rows[0],
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
