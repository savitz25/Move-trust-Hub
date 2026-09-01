import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import { loadEnvLocal } from '../lib/verification/load-env-local';

type CompanyRow = {
  id: string;
  slug: string;
  name: string;
  dot: string;
  entity_type: string | null;
  services: unknown;
  authority_active: boolean | null;
  out_of_service: boolean | null;
  fmcsa_last_checked: string | null;
};

type CensusRow = {
  dot_number: string;
  status_code?: string;
  crgo_motoveh?: string;
  crgo_drivetow?: string;
  mcs150_date?: string;
  add_date?: string;
};

function batches<T>(values: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < values.length; i += size) result.push(values.slice(i, i + size));
  return result;
}

async function main() {
  loadEnvLocal();
  const connectionString = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('Database connection is not configured');
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const result = await client.query<CompanyRow>(`
    select id,slug,name,regexp_replace(coalesce(usdot_number,''),'\\D','','g') dot,
      entity_type,services,authority_active,out_of_service,fmcsa_last_checked
    from companies
    where (publication_state is null or publication_state in ('PUBLISHABLE','INDEXABLE','VERIFIED'))
      and service_scope is distinct from 'intrastate'
      and nullif(regexp_replace(coalesce(usdot_number,''),'\\D','','g'),'') is not null
    order by id`);
  await client.end();

  const rows = result.rows;
  const census = new Map<string, CensusRow>();
  for (const batch of batches([...new Set(rows.map((row) => row.dot))], 100)) {
    const params = new URLSearchParams({
      '$select': 'dot_number,status_code,crgo_motoveh,crgo_drivetow,mcs150_date,add_date',
      '$where': `dot_number in (${batch.join(',')})`,
      '$limit': '50000',
    });
    const response = await fetch(`https://data.transportation.gov/resource/az4n-8mr2.json?${params}`);
    if (!response.ok) throw new Error(`Census request failed: ${response.status}`);
    for (const row of (await response.json()) as CensusRow[]) census.set(String(row.dot_number), row);
  }

  const evidence = rows.filter((row) => {
    const source = census.get(row.dot);
    return source?.crgo_motoveh === 'X' || source?.crgo_drivetow === 'X';
  });
  const legacy = rows.filter((row) => JSON.stringify(row.services).toLowerCase().includes('auto transport'));
  const roles = { carrier: 0, broker: 0, carrierBroker: 0, unknown: 0 };
  const authority = { current: 0, notCurrent: 0, unknown: 0 };
  for (const row of evidence) {
    const role = String(row.entity_type ?? '').toLowerCase();
    if (role.includes('carrier') && role.includes('broker')) roles.carrierBroker++;
    else if (role.includes('broker')) roles.broker++;
    else if (role.includes('carrier')) roles.carrier++;
    else roles.unknown++;
    if (row.out_of_service === true || row.authority_active === false) authority.notCurrent++;
    else if (row.authority_active === true) authority.current++;
    else authority.unknown++;
  }
  const evidenceDots = new Set(evidence.map((row) => row.dot));
  const legacyDots = new Set(legacy.map((row) => row.dot));
  const artifact = {
    generatedAt: new Date().toISOString(),
    source: { dataset: 'FMCSA Company Census File', id: 'az4n-8mr2', rowsUpdatedAt: 1788197008 },
    counts: {
      AT1: rows.length,
      AT2: evidence.length,
      AT3: roles.carrier,
      AT4: roles.broker,
      AT5: roles.carrierBroker,
      AT6: roles.unknown,
      AT7: authority.current,
      AT8: authority.notCurrent,
      AT9: authority.unknown,
      AT10: evidence.filter((row) => Boolean(census.get(row.dot)?.mcs150_date)).length,
      AT11: evidence.filter((row) => !census.get(row.dot)?.mcs150_date).length,
      AT12: legacy.filter((row) => evidenceDots.has(row.dot)).length,
      AT13: evidence.filter((row) => !legacyDots.has(row.dot)).length,
      AT14: legacy.filter((row) => !evidenceDots.has(row.dot)).length,
      publicRowsWithUsdot: rows.length,
      censusMatched: rows.filter((row) => census.has(row.dot)).length,
    },
    rows: evidence.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      usdot: row.dot,
      role: row.entity_type,
      authorityActive: row.authority_active,
      outOfService: row.out_of_service,
      motorVehicles: census.get(row.dot)?.crgo_motoveh === 'X',
      driveawayTowaway: census.get(row.dot)?.crgo_drivetow === 'X',
      mcs150Date: census.get(row.dot)?.mcs150_date ?? null,
      statusCode: census.get(row.dot)?.status_code ?? null,
      legacyAutoTag: legacyDots.has(row.dot),
    })),
    legacyWithoutEvidence: legacy.filter((row) => !evidenceDots.has(row.dot)).map((row) => ({id:row.id,slug:row.slug,name:row.name,usdot:row.dot,role:row.entity_type})),
  };
  mkdirSync(resolve('.tmp'), { recursive: true });
  writeFileSync(resolve('.tmp/move-dir-001-census.json'), `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(JSON.stringify(artifact.counts, null, 2));
  console.log(`artifact=.tmp/move-dir-001-census.json`);
}

main().catch((error) => { console.error(error); process.exit(1); });
