import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Client } from 'pg';
import { databaseUrl, ssl } from './connection';

const migrations = [
  ['20260816120000', 'move_v2_provider_identity_foundation'],
  ['20260816190000', 'move_v2_fmcsa_national_spine'],
  ['20260816200000', 'move_v2_fmcsa_publication_readiness'],
  ['20260816210000', 'move_v2_fmcsa_publication_gate'],
  ['20260816220000', 'move_v2_fmcsa_census_dockets'],
  ['20260816230000', 'move_v2_fmcsa_query_indexes'],
  ['20260816240000', 'move_v2_auto_transport_roles'],
  ['20260816250000', 'move_v2_all_service_roles_view'],
  ['20260816260000', 'move_v2_auto_official_contacts'],
  ['20260816300000', 'move_v2_business_identity_enrichment'],
  ['20260816310000', 'move_v2_google_place_review_identity'],
  ['20260816320000', 'move_v2_enrichment_idempotency'],
  ['20260816400000', 'move_v2_state_authority_pilot'],
  ['20260816410000', 'move_v2_state_observations'],
  ['20260816420000', 'move_v2_derived_local_placement'],
  ['20260816430000', 'move_v2_origin_search_calibration'],
  ['20260817150000', 'move_v2_task007_illinois_claim_semantics'],
  ['20260817190000', 'move_v2_consumer_discovery'],
  ['20260817210000', 'move_v2_consumer_discovery_v2'],
  ['20260818010000', 'move_v2_evidence_operations'],
  ['20260818020000', 'move_v2_authenticated_operations_pilot'],
] as const;

async function main() {
  const client = new Client({ connectionString: databaseUrl(), ssl });
  await client.connect();
  try {
    await client.query('begin');
    for (const [version, name] of migrations) {
      const sql = readFileSync(`supabase/migrations/${version}_${name}.sql`, 'utf8');
      const sha = createHash('sha256').update(sql).digest('hex');
      const exists = await client.query('select to_regclass($1) is not null as exists', ['move_v2.schema_migration']);
      if (exists.rows[0].exists) {
        const applied = await client.query('select sha256 from move_v2.schema_migration where version=$1', [version]);
        if (applied.rowCount) {
          if (applied.rows[0].sha256 !== sha) throw new Error(`Applied migration checksum mismatch: ${version}`);
          continue;
        }
      }
      await client.query(sql);
      await client.query('insert into move_v2.schema_migration(version,name,sha256) values($1,$2,$3)', [version, name, sha]);
    }
    await client.query('commit');
    console.log('Move V2 migrations: PASS');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally { await client.end(); }
}
void main();
