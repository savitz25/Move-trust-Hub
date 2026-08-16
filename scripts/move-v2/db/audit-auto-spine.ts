import { writeFileSync } from 'node:fs';
import { Client } from 'pg';
import { directDatabaseUrl, ssl } from './connection';

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const one = async (sql: string) => (await client.query(sql)).rows;
    const classifications = await one(
      `select classification,count(*)::integer providers
       from move_v2.provider_service_role
       where vertical='AUTO_TRANSPORT' and superseded_at is null group by classification order by classification`,
    );
    const coverage = (await one(
      `select count(*)::integer providers,
              count(*) filter(where dba_name is not null)::integer dba,
              count(*) filter(where phone is not null)::integer phone,
              count(*) filter(where email is not null)::integer email,
              count(*) filter(where physical_address <> '{}'::jsonb)::integer physical_address,
              count(*) filter(where mailing_address <> '{}'::jsonb)::integer mailing_address,
              (select count(distinct d.provider_id)::integer from move_v2.fmcsa_docket_identifier d join move_v2.fmcsa_auto_provider_fact af using(provider_id)) docket
       from move_v2.fmcsa_auto_provider_fact f`,
    ))[0];
    const overlap = await one(
      `select h.classification hhg_classification,a.classification auto_classification,count(*)::integer providers
       from move_v2.provider_service_role a join move_v2.fmcsa_classification_result h using(provider_id)
       where a.vertical='AUTO_TRANSPORT' and a.superseded_at is null and h.superseded_at is null
       group by h.classification,a.classification order by providers desc`,
    );
    const stateDistribution = await one(
      `select coalesce(f.state,'UNKNOWN') state,r.classification,count(*)::integer providers
       from move_v2.fmcsa_auto_provider_fact f join move_v2.provider_service_role r using(provider_id)
       where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null
       group by coalesce(f.state,'UNKNOWN'),r.classification order by state,r.classification`,
    );
    const relations = await one(
      `select c.relname relation,pg_total_relation_size(c.oid)::bigint total_bytes,
              pg_relation_size(c.oid)::bigint table_bytes,pg_indexes_size(c.oid)::bigint index_bytes
       from pg_class c join pg_namespace n on n.oid=c.relnamespace
       where n.nspname='move_v2' and c.relkind in ('r','m') order by total_bytes desc`,
    );
    const totals = (await one(
      `select sum(pg_total_relation_size(c.oid))::bigint total_bytes,
              sum(pg_indexes_size(c.oid))::bigint index_bytes
       from pg_class c join pg_namespace n on n.oid=c.relnamespace
       where n.nspname='move_v2' and c.relkind in ('r','m')`,
    ))[0];
    const releases = await one(
      `select source_name,dataset_id,source_data_updated_at,retrieved_at,record_count,file_size,sha256,schema_version,source_era,ingestion_status
       from move_v2.fmcsa_source_release where dataset_id='az4n-8mr2:auto-positive'`,
    );
    const v1 = (await one(`select (select count(*) from public.companies)::integer companies,(select count(*) from public.reviews)::integer reviews`))[0];
    const migration = await one(`select version,name,applied_at from move_v2.schema_migration where version between '20260816240000' and '20260816269999' order by version`);
    writeFileSync('docs/task-002a-auto-db-audit.json', JSON.stringify({ classifications, coverage, overlap, overlap_total: overlap.reduce((sum, row) => sum + Number(row.providers), 0), state_distribution: stateDistribution, storage: { totals, relations }, releases, v1, migrations: migration }, null, 2) + '\n');
    console.log('Auto database audit: PASS');
  } finally {
    await client.end();
  }
}

void main();
