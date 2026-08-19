import { writeFileSync } from 'node:fs';
import { Client } from 'pg';
import { seedAutoTransportCompanies } from '../../../data/seed-auto-transport';
import { loadEnvLocal } from '../../../lib/verification/load-env-local';
import { fetchCarrierByDot } from '../../../lib/fmcsa/refresh/fetch-carrier-core';
import { directDatabaseUrl, ssl } from './connection';

const targets: Record<string, number> = {
  AUTO_TRANSPORT_CARRIER: 25,
  AUTO_TRANSPORT_BROKER: 25,
  AUTO_TRANSPORT_DUAL_ROLE: 10,
  AUTO_TRANSPORT_INACTIVE: 10,
  AUTO_TRANSPORT_REVIEW: 20,
};
const cell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

async function main() {
  loadEnvLocal();
  const client = new Client({ connectionString: directDatabaseUrl(), ssl });
  await client.connect();
  try {
    const rows: Record<string, unknown>[] = [];
    for (const [classification, limit] of Object.entries(targets)) {
      const result = await client.query(
        `select f.*,r.classification,r.reason_codes,r.conflicts,r.source_release_ids,
                (select count(*) from move_v2.fmcsa_authority a where a.provider_id=f.provider_id) authority_rows,
                (select count(*) from move_v2.fmcsa_authority_event e where e.provider_id=f.provider_id) history_rows,
                (select count(*) from move_v2.fmcsa_insurance_filing i where i.provider_id=f.provider_id) insurance_rows,
                (select count(*) from move_v2.fmcsa_docket_identifier d where d.provider_id=f.provider_id) docket_rows
         from move_v2.provider_service_role r join move_v2.fmcsa_auto_provider_fact f using(provider_id)
         where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null and r.classification=$1
         limit $2`,
        [classification, limit],
      );
      rows.push(...result.rows);
    }
    const overlap = await client.query(
      `select f.*,r.classification,r.reason_codes,r.conflicts,r.source_release_ids,h.classification hhg_classification,
              (select count(*) from move_v2.fmcsa_authority a where a.provider_id=f.provider_id) authority_rows,
              (select count(*) from move_v2.fmcsa_authority_event e where e.provider_id=f.provider_id) history_rows,
              (select count(*) from move_v2.fmcsa_insurance_filing i where i.provider_id=f.provider_id) insurance_rows,
              (select count(*) from move_v2.fmcsa_docket_identifier d where d.provider_id=f.provider_id) docket_rows
       from move_v2.fmcsa_auto_provider_fact f
       join move_v2.provider_service_role r using(provider_id)
       join move_v2.fmcsa_classification_result h using(provider_id)
       where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null and h.superseded_at is null
       limit 20`,
    );
    rows.push(...overlap.rows.map((row) => ({ ...row, sample_group: 'HHG_AUTO_OVERLAP' })));
    const checked: Record<string, unknown>[] = rows.map((row) => ({
      ...row,
      sample_group: row.sample_group ?? row.classification,
      dba_display_pass: row.dba_name ? row.display_name === row.dba_name : row.display_name === row.legal_name,
      official_trace_pass: Array.isArray(row.source_release_ids) && row.source_release_ids.length > 0,
    }));
    const headers = [...new Set(checked.flatMap((row) => Object.keys(row)))];
    writeFileSync('docs/task-002a-auto-entity-qa.csv', [headers.map(cell).join(','), ...checked.map((row) => headers.map((header) => cell(row[header])).join(','))].join('\n') + '\n');

    const validSeeds = seedAutoTransportCompanies.filter((company) => /^\d+$/.test(company.usdotNumber ?? ''));
    const seedDots = validSeeds.map((company) => company.usdotNumber);
    const coverage = await client.query(
      `select f.usdot,r.classification from move_v2.fmcsa_auto_provider_fact f
       join move_v2.provider_service_role r using(provider_id)
       where r.vertical='AUTO_TRANSPORT' and f.usdot=any($1::text[])`,
      [seedDots],
    );
    const found = new Map(coverage.rows.map((row) => [row.usdot as string, row.classification as string]));
    const v1Coverage = {
      total_seeds: seedAutoTransportCompanies.length,
      seeds_with_numeric_usdot: validSeeds.length,
      exact_provider_matches: validSeeds.filter((company) => found.has(company.usdotNumber)).length,
      classifications: Object.fromEntries([...found.values()].map((classification) => [classification, [...found.values()].filter((value) => value === classification).length])),
      unresolved_usdots: validSeeds.filter((company) => !found.has(company.usdotNumber)).map((company) => company.usdotNumber),
    };

    const plans: Record<string, unknown> = {};
    const benchmarks: Array<[string, string, unknown[]]> = [
      ['provider_auto_roles', `select * from move_v2.provider_service_role where provider_id=$1::uuid and vertical='AUTO_TRANSPORT' and superseded_at is null`, [checked[0].provider_id]],
      ['usdot_auto_classification', `select f.provider_id,r.classification from move_v2.fmcsa_auto_provider_fact f join move_v2.provider_service_role r using(provider_id) where f.usdot=$1`, [checked[0].usdot]],
      ['state_active_auto_carriers', `select f.provider_id,f.display_name from move_v2.provider_service_role r join move_v2.fmcsa_auto_provider_fact f using(provider_id) where f.state=$1 and r.vertical='AUTO_TRANSPORT' and r.classification='AUTO_TRANSPORT_CARRIER' limit 50`, ['FL']],
      ['state_active_auto_brokers', `select f.provider_id,f.display_name from move_v2.provider_service_role r join move_v2.fmcsa_auto_provider_fact f using(provider_id) where f.state=$1 and r.vertical='AUTO_TRANSPORT' and r.classification='AUTO_TRANSPORT_BROKER' limit 50`, ['FL']],
      ['provider_all_service_roles', `select * from move_v2.provider_all_service_roles where provider_id=$1::uuid and superseded_at is null`, [checked[0].provider_id]],
    ];
    for (const [name, sql, parameters] of benchmarks) {
      const plan = await client.query(`explain (analyze,buffers,format json) ${sql}`, parameters);
      plans[name] = plan.rows[0]['QUERY PLAN'][0];
    }

    const key = process.env.FMCSA_WEB_KEY?.trim();
    if (!key) throw new Error('FMCSA_WEB_KEY missing for bounded official spot check');
    const spotChecks = [];
    for (const row of checked.filter((_, index) => index % 7 === 0).slice(0, 16)) {
      const api = await fetchCarrierByDot(String(row.usdot), key);
      spotChecks.push({
        usdot: row.usdot, classification: row.classification, bulk_legal_name: row.legal_name,
        public_legal_name: api?.legalName ?? null, bulk_dba: row.dba_name,
        public_dba: api?.dbaName ?? null, bulk_status: row.usdot_status,
        public_allowed_to_operate: api?.allowedToOperate ?? null,
        bulk_power_units: row.power_units, public_power_units: api?.totalPowerUnits ?? null,
        bulk_drivers: row.drivers, public_drivers: api?.totalDrivers ?? null,
        exact_legal_name_match: Boolean(api) && api?.legalName?.trim().toUpperCase() === String(row.legal_name).trim().toUpperCase(),
      });
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    writeFileSync('docs/task-002a-auto-official-spot-check.json', JSON.stringify(spotChecks, null, 2) + '\n');
    writeFileSync('docs/task-002a-auto-db-qa.json', JSON.stringify({ sample_count: checked.length, v1_coverage: v1Coverage, query_plans: plans }, null, 2) + '\n');
    console.log(`Auto entity QA: ${checked.length}; display PASS ${checked.filter((row) => row.dba_display_pass).length}; trace PASS ${checked.filter((row) => row.official_trace_pass).length}`);
    console.log(`V1 numeric-USDOT coverage: ${v1Coverage.exact_provider_matches}/${v1Coverage.seeds_with_numeric_usdot}`);
    console.log(`Bounded official spot checks: ${spotChecks.length}`);
  } finally {
    await client.end();
  }
}

void main();
