/**
 * Reusable provider-universe audit.
 * Run: npx tsx --require ./scripts/stub-server-only.cjs scripts/audit-provider-universe.ts
 * Writes docs/task-001-provider-universe-audit.json
 *
 * Does not call Google Places.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { classifyProvider } from '../lib/provider/classification';
import { detectIdentityCollisions } from '../lib/provider/identity';
import { seedAutoTransportCompanies } from '../data/seed-auto-transport';
import { seedCompanies } from '../data/seed-companies';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
}

loadEnvFiles();

type Row = {
  id: string;
  slug: string;
  name: string;
  usdot_number: string | null;
  mc_number: string | null;
  entity_type: string | null;
  service_scope: string | null;
  services: unknown;
  headquarters: string | null;
  is_verified: boolean | null;
  out_of_service: boolean | null;
  authority_active: boolean | null;
  publication_state?: string | null;
  indexable?: boolean | null;
};

function bump(counts: Record<string, number>, key: string) {
  counts[key] = (counts[key] ?? 0) + 1;
}

async function loadCompanies(): Promise<Row[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('Supabase not configured — auditing seed catalogs only.');
    return [];
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const rows: Row[] = [];
  let from = 0;
  const page = 1000;
  for (;;) {
    const { data, error } = await supabase
      .from('companies')
      .select(
        'id,slug,name,usdot_number,mc_number,entity_type,service_scope,services,headquarters,is_verified,out_of_service,authority_active,publication_state,indexable'
      )
      .range(from, from + page - 1);
    if (error) {
      console.warn('companies query failed, using available columns:', error.message);
      const fallback = await supabase
        .from('companies')
        .select('id,slug,name,usdot_number,mc_number,services,headquarters,is_verified,out_of_service')
        .range(from, from + page - 1);
      if (fallback.error) throw fallback.error;
      const batch = (fallback.data ?? []) as Row[];
      rows.push(...batch);
      if (batch.length < page) break;
      from += page;
      continue;
    }
    const batch = (data ?? []) as Row[];
    rows.push(...batch);
    if (batch.length < page) break;
    from += page;
  }
  return rows;
}

function classifyRow(row: Row) {
  return classifyProvider({
    serviceScope: row.service_scope,
    entityType: row.entity_type,
    services: Array.isArray(row.services) ? (row.services as string[]) : [],
    usdotNumber: row.usdot_number,
    mcNumber: row.mc_number,
  });
}

async function main() {
  const dbRows = await loadCompanies();
  const seedRows: Row[] = [...seedCompanies, ...seedAutoTransportCompanies].map((company) => ({
    id: company.id,
    slug: company.slug,
    name: company.name,
    usdot_number: company.usdotNumber,
    mc_number: company.mcNumber,
    entity_type: company.entityType ?? null,
    service_scope: company.serviceScope ?? null,
    services: company.services,
    headquarters: company.headquarters,
    is_verified: company.isVerified,
    out_of_service: company.outOfService ?? false,
    authority_active: company.authorityActive ?? null,
  }));

  const source = dbRows.length ? dbRows : seedRows;
  const counts: Record<string, number> = {
    total: source.length,
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

  let hhgAndAuto = 0;
  for (const row of source) {
    const classified = classifyRow(row);
    if (row.out_of_service || row.authority_active === false) bump(counts, 'inactive');
    if (classified.roles.includes('hhg_carrier')) bump(counts, 'interstate_hhg_carrier');
    if (classified.roles.includes('hhg_broker')) bump(counts, 'hhg_broker');
    if (classified.roles.includes('hhg_carrier_broker')) bump(counts, 'hhg_carrier_broker');
    if (classified.roles.includes('local_mover')) bump(counts, 'local_intrastate_mover');
    if (classified.roles.includes('auto_carrier')) bump(counts, 'auto_carrier');
    if (classified.roles.includes('auto_broker')) bump(counts, 'auto_broker');
    if (classified.roles.includes('auto_carrier_broker')) bump(counts, 'auto_carrier_broker');
    if (classified.roles.includes('multi_service')) {
      bump(counts, 'multi_service_hhg_auto');
      hhgAndAuto += 1;
    }
    if (classified.capabilities.length === 0) bump(counts, 'unknown_unclassified');
    if (row.publication_state === 'REVIEW_REQUIRED') bump(counts, 'review_required');
    if (row.publication_state === 'PUBLISHABLE' || row.publication_state === 'INDEXABLE') {
      bump(counts, 'publishable');
    }
    if (row.indexable === true) bump(counts, 'indexable');
  }

  const collisions = detectIdentityCollisions(
    source.map((row) => ({
      id: row.id,
      name: row.name,
      usdotNumber: row.usdot_number,
      mcNumber: row.mc_number,
      headquarters: row.headquarters,
    }))
  );

  const report = {
    generated_at: new Date().toISOString(),
    source: dbRows.length ? 'supabase.companies' : 'seed catalogs',
    google_places_requests: 0,
    counts: {
      ...counts,
      companies_in_both_hhg_and_auto: hhgAndAuto,
      duplicate_usdot_groups: collisions.filter((item) => item.kind === 'usdot').length,
      duplicate_mc_groups: collisions.filter((item) => item.kind === 'mc').length,
      duplicate_name_address_groups: collisions.filter((item) => item.kind === 'legal_name_address')
        .length,
    },
    collisions: collisions.slice(0, 50),
  };

  const docsDir = resolve(process.cwd(), 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir);
  const jsonPath = resolve(docsDir, 'task-001-provider-universe-audit.json');
  writeFileSync(jsonPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify(report.counts, null, 2));
  console.log(`Wrote ${jsonPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
