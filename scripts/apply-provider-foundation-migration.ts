/**
 * Apply Task 001.1 additive migration. Never prints connection strings.
 *
 * Usage:
 *   npx tsx scripts/apply-provider-foundation-migration.ts --dry-run
 *   npx tsx scripts/apply-provider-foundation-migration.ts
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import pg from 'pg';
import { classifyProvider } from '../lib/provider/classification';
import { detectIdentityCollisions } from '../lib/provider/identity';

const { Client } = pg;

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

function resolveDatabaseUrl(): string {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (direct) return direct;
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!password || !ref) {
    throw new Error(
      'BLOCKED — DATABASE ACCESS: need SUPABASE_DB_URL or DATABASE_URL or SUPABASE_DB_PASSWORD'
    );
  }
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`;
}

function sanitizeError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  return raw
    .replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@')
    .replace(/password[=:][^\s]+/gi, 'password=***');
}

function stripLineComments(sql: string): string {
  return sql
    .split('\n')
    .map((line) => {
      const inSingle = line.split("'").length % 2 === 0;
      if (inSingle) return line;
      const index = line.indexOf('--');
      return index >= 0 ? line.slice(0, index) : line;
    })
    .join('\n');
}

/** Split SQL on top-level semicolons, preserving DO $$ ... $$ bodies. */
function splitSqlStatements(sql: string): string[] {
  const stripped = stripLineComments(sql)
    .replace(/^\s*BEGIN\s*;/i, '')
    .replace(/COMMIT\s*;\s*$/i, '');
  const parts: string[] = [];
  let buf = '';
  let inDollar = false;
  for (let i = 0; i < stripped.length; i += 1) {
    if (stripped.startsWith('$$', i)) {
      inDollar = !inDollar;
      buf += '$$';
      i += 1;
      continue;
    }
    if (!inDollar && stripped[i] === ';') {
      const stmt = buf.trim();
      if (stmt) parts.push(stmt);
      buf = '';
      continue;
    }
    buf += stripped[i];
  }
  const stmt = buf.trim();
  if (stmt) parts.push(stmt);
  return parts;
}

const IDENTITY_SQL = `
SELECT md5(string_agg(
  id || ':' || coalesce(slug, '') || ':' || coalesce(usdot_number, '') || ':' || coalesce(mc_number, ''),
  '|' ORDER BY id
)) AS fingerprint,
count(*)::int AS total
FROM public.companies
`;

type CompanyAuditRow = {
  id: string;
  slug: string;
  name: string;
  usdot_number: string | null;
  mc_number: string | null;
  entity_type: string | null;
  service_scope: string | null;
  services: unknown;
  headquarters: string | null;
  out_of_service: boolean | null;
  authority_active: boolean | null;
  publication_state?: string | null;
  indexable?: boolean | null;
};

function classifyCounts(rows: CompanyAuditRow[]) {
  const counts = {
    total: rows.length,
    interstate_hhg_carrier: 0,
    hhg_broker: 0,
    hhg_carrier_broker: 0,
    local_intrastate_mover: 0,
    auto_carrier: 0,
    auto_broker: 0,
    auto_carrier_broker: 0,
    multi_service_hhg_auto: 0,
    unknown_unclassified: 0,
    inactive: 0,
    review_required: 0,
    publishable: 0,
    indexable: 0,
  };
  for (const row of rows) {
    const classified = classifyProvider({
      serviceScope: row.service_scope,
      entityType: row.entity_type,
      services: Array.isArray(row.services) ? (row.services as string[]) : [],
      usdotNumber: row.usdot_number,
      mcNumber: row.mc_number,
    });
    if (row.out_of_service || row.authority_active === false) counts.inactive += 1;
    if (classified.roles.includes('hhg_carrier')) counts.interstate_hhg_carrier += 1;
    if (classified.roles.includes('hhg_broker')) counts.hhg_broker += 1;
    if (classified.roles.includes('hhg_carrier_broker')) counts.hhg_carrier_broker += 1;
    if (classified.roles.includes('local_mover')) counts.local_intrastate_mover += 1;
    if (classified.roles.includes('auto_carrier')) counts.auto_carrier += 1;
    if (classified.roles.includes('auto_broker')) counts.auto_broker += 1;
    if (classified.roles.includes('auto_carrier_broker')) counts.auto_carrier_broker += 1;
    if (classified.roles.includes('multi_service')) counts.multi_service_hhg_auto += 1;
    if (classified.capabilities.length === 0) counts.unknown_unclassified += 1;
    if (row.publication_state === 'REVIEW_REQUIRED') counts.review_required += 1;
    if (row.publication_state === 'PUBLISHABLE' || row.publication_state === 'INDEXABLE') {
      counts.publishable += 1;
    }
    if (row.indexable === true) counts.indexable += 1;
  }
  const collisions = detectIdentityCollisions(
    rows.map((row) => ({
      id: row.id,
      name: row.name,
      usdotNumber: row.usdot_number,
      mcNumber: row.mc_number,
      headquarters: row.headquarters,
    }))
  );
  return {
    ...counts,
    duplicate_usdot_groups: collisions.filter((item) => item.kind === 'usdot').length,
    duplicate_mc_groups: collisions.filter((item) => item.kind === 'mc').length,
    duplicate_name_address_groups: collisions.filter((item) => item.kind === 'legal_name_address')
      .length,
    collisions,
  };
}

async function loadCompanies(client: pg.Client): Promise<CompanyAuditRow[]> {
  const result = await client.query(`
    SELECT id, slug, name, usdot_number, mc_number, entity_type, service_scope,
           services, headquarters, out_of_service, authority_active
      FROM public.companies
     ORDER BY id
  `);
  return result.rows as CompanyAuditRow[];
}

async function loadCompaniesAfter(client: pg.Client): Promise<CompanyAuditRow[]> {
  const result = await client.query(`
    SELECT id, slug, name, usdot_number, mc_number, entity_type, service_scope,
           services, headquarters, out_of_service, authority_active,
           publication_state, indexable
      FROM public.companies
     ORDER BY id
  `);
  return result.rows as CompanyAuditRow[];
}

async function schemaSnapshot(client: pg.Client) {
  const tables = await client.query(`
    SELECT table_name FROM information_schema.tables
     WHERE table_schema='public'
       AND table_name IN (
         'provider_authority','provider_capability','provider_location',
         'provider_service_area','provider_identity_review'
       )
     ORDER BY 1
  `);
  const columns = await client.query(`
    SELECT column_name FROM information_schema.columns
     WHERE table_schema='public' AND table_name='companies'
       AND column_name IN ('publication_state','indexable','legacy_directory_row')
     ORDER BY 1
  `);
  const constraints = await client.query(`
    SELECT conname FROM pg_constraint
     WHERE conname IN (
       'companies_publication_state_check',
       'companies_indexable_publication_gate'
     )
     ORDER BY 1
  `);
  const identity = await client.query(IDENTITY_SQL);
  const idType = await client.query(`
    SELECT data_type FROM information_schema.columns
     WHERE table_schema='public' AND table_name='companies' AND column_name='id'
  `);
  return {
    id_type: idType.rows[0]?.data_type ?? null,
    identity_fingerprint: identity.rows[0]?.fingerprint ?? null,
    total: identity.rows[0]?.total ?? null,
    provider_tables: tables.rows.map((row: { table_name: string }) => row.table_name),
    publication_columns: columns.rows.map((row: { column_name: string }) => row.column_name),
    constraints: constraints.rows.map((row: { conname: string }) => row.conname),
  };
}

function collisionNotes(kind: string, key: string): string {
  if (kind === 'usdot' && key === '125563') {
    return 'Shared placeholder USDOT 125563 on national brand catalog rows (Allied, Mayflower, Atlas, Wheaton, Graebel, Arpin). Treat as identity/data-quality, not a merge key. Do not invent replacement USDOT numbers.';
  }
  if (kind === 'usdot') {
    return 'Duplicate USDOT across separate company rows. Do not merge by name.';
  }
  if (kind === 'mc') {
    return 'Duplicate MC/docket across separate company rows. Do not merge by name.';
  }
  return 'Duplicate legal-name/address cluster. Persist as REVIEW_REQUIRED; do not merge or delete.';
}

async function persistIdentityReviews(client: pg.Client, rows: CompanyAuditRow[]) {
  const collisions = detectIdentityCollisions(
    rows.map((row) => ({
      id: row.id,
      name: row.name,
      usdotNumber: row.usdot_number,
      mcNumber: row.mc_number,
      headquarters: row.headquarters,
    }))
  );
  for (const collision of collisions) {
    await client.query(
      `INSERT INTO public.provider_identity_review (
         collision_kind, collision_key, company_ids, resolution, notes
       ) VALUES ($1, $2, $3::text[], 'REVIEW_REQUIRED', $4)
       ON CONFLICT (collision_kind, collision_key) DO UPDATE
         SET company_ids = EXCLUDED.company_ids,
             notes = EXCLUDED.notes`,
      [
        collision.kind,
        collision.key,
        collision.companyIds,
        collisionNotes(collision.kind, collision.key),
      ]
    );
  }
  await client.query(`
    UPDATE public.companies c
       SET publication_state = 'REVIEW_REQUIRED',
           indexable = false
      FROM public.provider_identity_review r
     WHERE c.id = ANY (r.company_ids)
       AND r.resolution = 'REVIEW_REQUIRED'
  `);
  return collisions.length;
}

async function postCounts(client: pg.Client) {
  const counts = await client.query(`
    SELECT
      (SELECT count(*)::int FROM public.companies) AS companies,
      (SELECT count(*)::int FROM public.provider_capability) AS capabilities,
      (SELECT count(*)::int FROM public.provider_authority) AS authorities,
      (SELECT count(*)::int FROM public.provider_identity_review) AS identity_reviews,
      (SELECT count(*) FILTER (WHERE publication_state='REVIEW_REQUIRED')::int FROM public.companies) AS review_required,
      (SELECT count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int FROM public.companies) AS publishable,
      (SELECT count(*) FILTER (WHERE publication_state='INACTIVE')::int FROM public.companies) AS inactive,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM public.companies) AS indexable,
      (SELECT count(*) FILTER (WHERE evidence_state='INFERRED')::int FROM public.provider_capability) AS inferred_capabilities,
      (SELECT count(*) FILTER (WHERE evidence_state='VERIFIED')::int FROM public.provider_capability) AS verified_capabilities,
      (SELECT count(*) FILTER (WHERE evidence_state='REVIEW_REQUIRED')::int FROM public.provider_capability) AS review_capabilities
  `);
  return counts.rows[0];
}

async function main() {
  loadEnvFiles();
  const dry = process.argv.includes('--dry-run');
  const validate = process.argv.includes('--validate');
  const client = new Client({
    connectionString: resolveDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const schemaBefore = await schemaSnapshot(client);
    const companiesBefore = await loadCompanies(client);
    const classificationBefore = classifyCounts(companiesBefore);
    const report: Record<string, unknown> = {
      dry,
      google_places_requests: 0,
      timestamp: new Date().toISOString(),
      schema_before: schemaBefore,
      classification_before: {
        ...classificationBefore,
        collisions: classificationBefore.collisions,
      },
      applied: false,
    };

    if (dry && !validate) {
      writeFileSync(
        resolve(process.cwd(), 'docs/task-0011-pre-migration-snapshot.json'),
        JSON.stringify(report, null, 2) + '\n'
      );
      console.log(
        JSON.stringify(
          {
            dry: true,
            id_type: schemaBefore.id_type,
            total: schemaBefore.total,
            fingerprint_present: Boolean(schemaBefore.identity_fingerprint),
            classification: {
              total: classificationBefore.total,
              interstate_hhg_carrier: classificationBefore.interstate_hhg_carrier,
              hhg_broker: classificationBefore.hhg_broker,
              hhg_carrier_broker: classificationBefore.hhg_carrier_broker,
              local_intrastate_mover: classificationBefore.local_intrastate_mover,
              auto_carrier: classificationBefore.auto_carrier,
              auto_broker: classificationBefore.auto_broker,
              auto_carrier_broker: classificationBefore.auto_carrier_broker,
              multi_service_hhg_auto: classificationBefore.multi_service_hhg_auto,
              unknown_unclassified: classificationBefore.unknown_unclassified,
              duplicate_usdot_groups: classificationBefore.duplicate_usdot_groups,
              duplicate_mc_groups: classificationBefore.duplicate_mc_groups,
              duplicate_name_address_groups: classificationBefore.duplicate_name_address_groups,
            },
            google_places_requests: 0,
          },
          null,
          2
        )
      );
      return;
    }

    const sql = readFileSync(
      join(process.cwd(), 'supabase/migrations/20260819010000_provider_capability_architecture.sql'),
      'utf8'
    );
    await client.query('BEGIN');
    try {
      const statements = splitSqlStatements(sql);
      for (let i = 0; i < statements.length; i += 1) {
        const statement = statements[i]!;
        try {
          await client.query(statement);
        } catch (error) {
          const preview = statement.replace(/\s+/g, ' ').slice(0, 160);
          throw new Error(`SQL statement ${i + 1}/${statements.length} failed (${preview}): ${sanitizeError(error)}`);
        }
      }
      const persisted = await persistIdentityReviews(client, companiesBefore);
      report.identity_reviews_upserted = persisted;
      if (validate) {
        const schemaAfter = await schemaSnapshot(client);
        const companiesAfter = await loadCompaniesAfter(client);
        const classificationAfter = classifyCounts(companiesAfter);
        const counts = await postCounts(client);
        await client.query('ROLLBACK');
        console.log(
          JSON.stringify(
            {
              validate: true,
              rolled_back: true,
              identity_unchanged:
                schemaBefore.identity_fingerprint === schemaAfter.identity_fingerprint &&
                schemaBefore.total === schemaAfter.total,
              post_counts: counts,
              classification_after: {
                total: classificationAfter.total,
                review_required: classificationAfter.review_required,
                publishable: classificationAfter.publishable,
                indexable: classificationAfter.indexable,
                duplicate_usdot_groups: classificationAfter.duplicate_usdot_groups,
                duplicate_mc_groups: classificationAfter.duplicate_mc_groups,
                duplicate_name_address_groups: classificationAfter.duplicate_name_address_groups,
              },
              google_places_requests: 0,
            },
            null,
            2
          )
        );
        return;
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }

    const schemaAfter = await schemaSnapshot(client);
    const companiesAfter = await loadCompaniesAfter(client);
    const classificationAfter = classifyCounts(companiesAfter);
    const counts = await postCounts(client);
    report.applied = true;
    report.schema_after = schemaAfter;
    report.classification_after = classificationAfter;
    report.post_counts = counts;
    report.identity_unchanged =
      schemaBefore.identity_fingerprint === schemaAfter.identity_fingerprint &&
      schemaBefore.total === schemaAfter.total;

    writeFileSync(
      resolve(process.cwd(), 'docs/task-0011-post-migration-snapshot.json'),
      JSON.stringify(report, null, 2) + '\n'
    );
    console.log(
      JSON.stringify(
        {
          applied: true,
          identity_unchanged: report.identity_unchanged,
          post_counts: counts,
          classification_after: {
            total: classificationAfter.total,
            review_required: classificationAfter.review_required,
            publishable: classificationAfter.publishable,
            indexable: classificationAfter.indexable,
            duplicate_usdot_groups: classificationAfter.duplicate_usdot_groups,
            duplicate_mc_groups: classificationAfter.duplicate_mc_groups,
            duplicate_name_address_groups: classificationAfter.duplicate_name_address_groups,
          },
          google_places_requests: 0,
        },
        null,
        2
      )
    );
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(sanitizeError(error));
  process.exit(1);
});
