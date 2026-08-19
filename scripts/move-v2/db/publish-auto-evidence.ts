import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';
import { Client } from 'pg';
import { directDatabaseUrl, ssl } from './connection';

type Row = Record<string, string>;
const root = '.data/fmcsa/2026-08-16';
const normalizedUsdot = (value?: string) => (value ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
const docket = (value?: string) => (value ?? '').toUpperCase().replace(/[\s-]/g, '');
const providerId = (dot: string) => {
  const bytes = createHash('sha1').update(`movetrusthub:fmcsa:usdot:${dot}`).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 15) | 80; bytes[8] = (bytes[8] & 63) | 128;
  const hex = bytes.toString('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
const recordKey = (dataset: string, row: Row) => `${dataset}:${createHash('sha256').update(JSON.stringify(row)).digest('hex')}`;

async function rows(file: string, action: (row: Row) => Promise<void> | void) {
  for await (const raw of createReadStream(`${root}/${file}`).pipe(parse({ columns: true, bom: true, skip_empty_lines: true }))) await action(raw as Row);
}

async function main() {
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const autoDots = new Set<string>();
    await rows('company-census-auto.csv', (row) => { autoDots.add(normalizedUsdot(row.dot_number)); });
    const releaseRows = await client.query(`select dataset_id,source_release_id from move_v2.fmcsa_source_release where ingestion_status='PUBLISHED'`);
    const releases = new Map(releaseRows.rows.map((row) => [row.dataset_id as string, row.source_release_id as string]));
    const required = ['inys-ebih', 'yu5v-wbh6', 'c5y8-a4uz', 'wb4f-neki'];
    for (const dataset of required) if (!releases.has(dataset)) throw new Error(`Published source release missing: ${dataset}`);

    let batch: Row[] = [];
    let inserted = 0;
    const load = async (file: string, dataset: string, statement: (values: string) => string, fields: (row: Row) => string[]) => {
      batch = [];
      const flush = async () => {
        if (!batch.length) return;
        let parameter = 2;
        const parameters: string[] = [releases.get(dataset)!];
        const values = batch.map((row) => {
          const projected = fields(row); parameters.push(...projected);
          const tuple = `(${projected.map(() => `$${parameter++}`).join(',')})`;
          return tuple;
        }).join(',');
        const result = await client.query(statement(values), parameters);
        inserted += result.rowCount ?? 0;
        batch = [];
      };
      await rows(file, async (row) => {
        const dot = normalizedUsdot(row.usdot_number);
        if (!autoDots.has(dot)) return;
        batch.push(row);
        if (batch.length === 1_000) await flush();
      });
      await flush();
    };

    await load('motus-carrier.csv', 'inys-ebih', (values) =>
      `insert into move_v2.fmcsa_authority(provider_id,source_release_id,source_record_key,usdot,docket_number,docket_prefix,authority_type,authority_status,cargo_required,cargo_on_file,bond_required,bond_on_file,minimum_bipd_coverage,bipd_on_file,raw_record_reference)
       select v.provider_id::uuid,$1::uuid,v.source_key,v.usdot,nullif(v.docket,''),nullif(v.prefix,''),v.authority_type,v.authority_status,case v.cargo_req when 'Y' then true when 'N' then false end,case v.cargo_file when 'Y' then true when 'N' then false end,case v.bond_req when 'Y' then true when 'N' then false end,case v.bond_file when 'Y' then true when 'N' then false end,nullif(v.minimum,'')::numeric::bigint,nullif(v.bipd,'')::numeric::bigint,'artifact:motus-carrier.csv#'||v.source_key
       from (values ${values}) v(provider_id,source_key,usdot,docket,prefix,authority_type,authority_status,cargo_req,cargo_file,bond_req,bond_file,minimum,bipd) on conflict do nothing`,
      (row) => { const dot = normalizedUsdot(row.usdot_number); const d = docket(row.docket_number); return [providerId(dot), recordKey('inys-ebih', row), dot, d, d.slice(0, 2), row.op_auth_type, row.op_auth_status, row.cargo_req, row.cargo_file, row.bond_req, row.bond_file, row.min_cov_amount, row.bipd_file]; },
    );
    await load('motus-authhist.csv', 'yu5v-wbh6', (values) =>
      `insert into move_v2.fmcsa_authority_event(provider_id,source_release_id,source_record_key,usdot,docket_number,authority_type,authority_status,reason,status_change_date,event_kind,raw_record_reference)
       select v.provider_id::uuid,$1::uuid,v.source_key,v.usdot,nullif(v.docket,''),v.authority_type,v.authority_status,nullif(v.reason,''),case when v.event_date='' then null else to_date(v.event_date,'YYYYMMDD') end,'AUTHORITY_HISTORY','artifact:motus-authhist.csv#'||v.source_key
       from (values ${values}) v(provider_id,source_key,usdot,docket,authority_type,authority_status,reason,event_date) on conflict do nothing`,
      (row) => { const dot = normalizedUsdot(row.usdot_number); return [providerId(dot), recordKey('yu5v-wbh6', row), dot, docket(row.docket_number), row.op_auth_type, row.op_auth_status, row.reason, row.status_change_date]; },
    );
    await load('motus-insurance.csv', 'c5y8-a4uz', (values) =>
      `insert into move_v2.fmcsa_insurance_filing(provider_id,source_release_id,source_record_key,usdot,docket_number,filing_type,form_code,insurance_carrier,effective_date,policy_reference,filing_status,raw_record_reference)
       select v.provider_id::uuid,$1::uuid,v.source_key,v.usdot,nullif(v.docket,''),nullif(v.type_code,''),nullif(v.form_code,''),nullif(v.carrier,''),case when v.effective_date='' then null else to_date(v.effective_date,'YYYYMMDD') end,null,nullif(v.class_code,''),'artifact:motus-insurance.csv#'||v.source_key
       from (values ${values}) v(provider_id,source_key,usdot,docket,form_code,type_code,class_code,effective_date,carrier) on conflict do nothing`,
      (row) => { const dot = normalizedUsdot(row.usdot_number); return [providerId(dot), recordKey('c5y8-a4uz', row), dot, docket(row.docket_number), row.ins_form_code, row.ins_type_code, row.ins_class_code, row.effective_date, row.insurance_company_name]; },
    );
    await load('motus-revoke-suspend.csv', 'wb4f-neki', (values) =>
      `insert into move_v2.fmcsa_authority_event(provider_id,source_release_id,source_record_key,usdot,docket_number,authority_type,authority_status,reason,status_change_date,event_kind,raw_record_reference)
       select v.provider_id::uuid,$1::uuid,v.source_key,v.usdot,nullif(v.docket,''),v.authority_type,v.action_type,concat_ws('; ','serve='||nullif(v.serve_date,''),'effective='||nullif(v.effective_date,'')),case when v.effective_date='' then null else to_date(v.effective_date,'YYYYMMDD') end,'REVOKE_SUSPEND','artifact:motus-revoke-suspend.csv#'||v.source_key
       from (values ${values}) v(provider_id,source_key,usdot,docket,authority_type,serve_date,action_type,effective_date) on conflict do nothing`,
      (row) => { const dot = normalizedUsdot(row.usdot_number); return [providerId(dot), recordKey('wb4f-neki', row), dot, docket(row.docket_number), row.op_auth_type, row.order1_serve_date, row.order1_type_desc, row.order1_effective_date]; },
    );

    const censusRelease = releases.get('az4n-8mr2:auto-positive');
    if (!censusRelease) throw new Error('Published auto Census projection release missing');
    let docketBatch: string[][] = [];
    const flushDockets = async () => {
      if (!docketBatch.length) return;
      let parameter = 2; const parameters: string[] = [censusRelease];
      const values = docketBatch.map((entry) => { parameters.push(...entry); return `(${entry.map(() => `$${parameter++}`).join(',')})`; }).join(',');
      const result = await client.query(
        `insert into move_v2.fmcsa_docket_identifier(provider_id,source_release_id,usdot,docket_prefix,docket_number,official_value,status_code)
         select v.provider_id::uuid,$1::uuid,v.usdot,v.prefix,v.number,v.official_value,nullif(v.status,'')
         from (values ${values}) v(provider_id,usdot,prefix,number,official_value,status)
         on conflict do nothing`,
        parameters,
      );
      inserted += result.rowCount ?? 0; docketBatch = [];
    };
    await rows('company-census-auto.csv', async (row) => {
      const dot = normalizedUsdot(row.dot_number);
      for (const position of ['1', '2', '3']) {
        const prefix = (row[`docket${position}prefix`] ?? '').trim().toUpperCase();
        const number = normalizedUsdot(row[`docket${position}`]);
        if (!['MC', 'MX', 'FF'].includes(prefix) || !number) continue;
        docketBatch.push([providerId(dot), dot, prefix, number, `${prefix}${number}`, row[`docket${position}_status_code`] ?? '']);
        if (docketBatch.length === 1_000) await flushDockets();
      }
    });
    await flushDockets();
    console.log(`Auto official evidence publication: PASS (${inserted} new rows)`);
  } finally {
    await client.end();
  }
}

void main();
