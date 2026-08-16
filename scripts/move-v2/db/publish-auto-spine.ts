import { createReadStream, statSync } from 'node:fs';
import { parse } from 'csv-parse';
import { Client } from 'pg';
import { directDatabaseUrl, ssl } from './connection';

const artifact = '.data/fmcsa/2026-08-16/company-census-auto.csv';
const normalized = '.data/fmcsa/2026-08-16/auto-normalized/auto-provider-roles.csv';
const sha256 = 'bf988cf42c788c3d9490ff15471e564c1664c77cc54092b3af498e480470f909';
const expectedRows = 350_706;
const ruleVersion = 'MOVE_AUTO_CLASSIFICATION_RULESET_2026_08_V1';
type Row = Record<string, string>;

function tuples(rows: Row[], start: number) {
  let parameter = start;
  const parameters: string[] = [];
  const values = rows.map((row) => {
    const tuple = `($${parameter++}::uuid,$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},$${parameter++},nullif($${parameter++},'')::integer,nullif($${parameter++},'')::integer,$${parameter++},$${parameter++},$${parameter++},$${parameter++}::jsonb,$${parameter++}::jsonb,$${parameter++}::jsonb)`;
    parameters.push(
      row.provider_id, row.usdot, row.legal_name, row.dba_name, row.display_name,
      row.status_code, row.carrier_operation, row.state, row.city, row.phone, row.email,
      row.physical_street, row.physical_zip, row.physical_country,
      row.mailing_street, row.mailing_city, row.mailing_state, row.mailing_zip, row.mailing_country,
      row.power_units, row.drivers, row.relevance, row.classification,
      row.rule_version, row.reason_codes, row.conflict_codes, row.supporting_source_keys,
    );
    return tuple;
  });
  return { sql: values.join(','), parameters };
}

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  const started = Date.now();
  try {
    const existing = await client.query(
      `select
         (select count(*) from move_v2.fmcsa_source_release where dataset_id='az4n-8mr2:auto-positive' and sha256=$1 and ingestion_status='PUBLISHED')::integer releases,
         (select count(*) from move_v2.provider_service_role where vertical='AUTO_TRANSPORT' and rule_version=$2)::integer roles`,
      [sha256, ruleVersion],
    );
    if (existing.rows[0].releases === 1 && existing.rows[0].roles === expectedRows) {
      console.log('Auto transport publication: IDEMPOTENT NO-OP');
      return;
    }

    const releaseResult = await client.query(
      `insert into move_v2.fmcsa_source_release
       (source_name,dataset_id,dataset_url,publisher,retrieved_at,source_data_updated_at,source_metadata_updated_at,record_count,file_size,sha256,schema_version,data_dictionary_reference,source_era,ingestion_status)
       values ('Company Census Auto-Positive Projection','az4n-8mr2:auto-positive','https://data.transportation.gov/resource/az4n-8mr2','Federal Motor Carrier Safety Administration',now(),'2026-08-15T10:52:32Z','2026-08-16T10:22:57Z',$1,$2,$3,'AUTO_POSITIVE_2026_08_V1','https://data.transportation.gov/api/views/az4n-8mr2','MCMIS_CENSUS_CURRENT','STAGED')
       on conflict(dataset_id,sha256) do update set ingestion_status=case when move_v2.fmcsa_source_release.ingestion_status='PUBLISHED' then 'PUBLISHED' else 'STAGED' end
       returning source_release_id`,
      [expectedRows, statSync(artifact).size, sha256],
    );
    const releaseId = releaseResult.rows[0].source_release_id as string;
    const parser = createReadStream(normalized).pipe(parse({ columns: true, bom: true, skip_empty_lines: true }));
    let batch: Row[] = [];
    let processed = 0;

    const flush = async () => {
      if (!batch.length) return;
      const providerParameters = batch.map((row) => row.provider_id);
      const providerValues = providerParameters.map((_, index) => `($${index + 1}::uuid)`).join(',');
      const data = tuples(batch, 2);
      await client.query('begin');
      try {
        await client.query(
          `insert into move_v2.provider(provider_id) values ${providerValues} on conflict(provider_id) do nothing`,
          providerParameters,
        );
        await client.query(
          `insert into move_v2.fmcsa_auto_provider_fact
           (provider_id,source_release_id,usdot,legal_name,dba_name,display_name,usdot_status,carrier_operation,state,city,phone,email,physical_address,mailing_address,power_units,drivers,motor_vehicle_cargo_reported)
           select v.provider_id,$1::uuid,v.usdot,v.legal,nullif(v.dba,''),v.display,v.status,v.operation,v.state,v.city,nullif(v.phone,''),nullif(v.email,''),
                  jsonb_strip_nulls(jsonb_build_object('street',nullif(v.physical_street,''),'city',nullif(v.city,''),'state',nullif(v.state,''),'postal_code',nullif(v.physical_zip,''),'country',nullif(v.physical_country,''))),
                  jsonb_strip_nulls(jsonb_build_object('street',nullif(v.mailing_street,''),'city',nullif(v.mailing_city,''),'state',nullif(v.mailing_state,''),'postal_code',nullif(v.mailing_zip,''),'country',nullif(v.mailing_country,''))),
                  v.power,v.drivers,true
           from (values ${data.sql}) v(provider_id,usdot,legal,dba,display,status,operation,state,city,phone,email,physical_street,physical_zip,physical_country,mailing_street,mailing_city,mailing_state,mailing_zip,mailing_country,power,drivers,relevance,class,rule,reasons,conflicts,keys)
           on conflict(provider_id) do update set source_release_id=excluded.source_release_id,legal_name=excluded.legal_name,dba_name=excluded.dba_name,display_name=excluded.display_name,usdot_status=excluded.usdot_status,carrier_operation=excluded.carrier_operation,state=excluded.state,city=excluded.city,phone=excluded.phone,email=excluded.email,physical_address=excluded.physical_address,mailing_address=excluded.mailing_address,power_units=excluded.power_units,drivers=excluded.drivers`,
          [releaseId, ...data.parameters],
        );
        await client.query(
          `insert into move_v2.provider_service_role
           (provider_id,vertical,relevance,classification,rule_version,reason_codes,conflicts,supporting_source_keys,source_release_ids)
           select v.provider_id,'AUTO_TRANSPORT',v.relevance,v.class,v.rule,
             array(select jsonb_array_elements_text(v.reasons)),array(select jsonb_array_elements_text(v.conflicts)),array(select jsonb_array_elements_text(v.keys)),array[$1::uuid]
           from (values ${data.sql}) v(provider_id,usdot,legal,dba,display,status,operation,state,city,phone,email,physical_street,physical_zip,physical_country,mailing_street,mailing_city,mailing_state,mailing_zip,mailing_country,power,drivers,relevance,class,rule,reasons,conflicts,keys)
           on conflict(provider_id,vertical,rule_version) do update set relevance=excluded.relevance,classification=excluded.classification,reason_codes=excluded.reason_codes,conflicts=excluded.conflicts,supporting_source_keys=excluded.supporting_source_keys,source_release_ids=excluded.source_release_ids`,
          [releaseId, ...data.parameters],
        );
        await client.query('commit');
      } catch (error) {
        await client.query('rollback');
        throw error;
      }
      processed += batch.length;
      if (processed % 25_000 === 0) console.log(`Auto transport staged: ${processed}`);
      batch = [];
    };

    for await (const raw of parser) {
      batch.push(raw as Row);
      if (batch.length === 1_000) await flush();
    }
    await flush();

    const validation = await client.query(
      `select count(*)::integer roles,
              count(*) filter(where f.provider_id is null)::integer missing_facts,
              count(*) filter(where p.provider_id is null)::integer missing_providers
       from move_v2.provider_service_role r
       left join move_v2.fmcsa_auto_provider_fact f using(provider_id)
       left join move_v2.provider p using(provider_id)
       where r.vertical='AUTO_TRANSPORT' and r.rule_version=$1`,
      [ruleVersion],
    );
    const result = validation.rows[0];
    if (result.roles !== expectedRows || result.missing_facts !== 0 || result.missing_providers !== 0) {
      throw new Error(`Auto role reconciliation failed: ${JSON.stringify(result)}`);
    }
    await client.query('begin');
    try {
      await client.query(`update move_v2.fmcsa_source_release set ingestion_status='PUBLISHED' where source_release_id=$1`, [releaseId]);
      await client.query('commit');
    } catch (error) {
      await client.query('rollback');
      throw error;
    }
    console.log(`Auto transport publication: PASS (${((Date.now() - started) / 1000).toFixed(2)}s)`);
  } finally {
    await client.end();
  }
}

void main();
