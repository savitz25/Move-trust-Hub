import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse';
import { classifyFmcsaProvider } from '../../../lib/move-v2/fmcsa/classifier';
import { FMCSA_CLASSIFICATION_RULE_VERSION, type AuthorityEvent, type CurrentAuthorityFact } from '../../../lib/move-v2/fmcsa/types';
import { selectDisplayName } from '../../../lib/move-v2/identity';
import { loadEnvLocal } from '../../../lib/verification/load-env-local';

type CsvRow = Record<string, string>;
type RowsByUsdot = Map<string, CsvRow[]>;

const RELEASE_DATE = process.env.FMCSA_RELEASE_DATE ?? '2026-08-16';
const root = resolve(process.env.FMCSA_ARTIFACT_DIR ?? `.data/fmcsa/${RELEASE_DATE}`);
const output = join(root, 'normalized');
mkdirSync(output, { recursive: true });

const files = {
  census: join(root, 'company-census-projected.csv'),
  dockets: join(root, 'company-census-hhg-dockets.csv'),
  carrier: join(root, 'motus-carrier.csv'),
  authhist: join(root, 'motus-authhist.csv'),
  insurance: join(root, 'motus-insurance.csv'),
  boc3: join(root, 'motus-boc3.csv'),
  revoke: join(root, 'motus-revoke-suspend.csv'),
};

function assertArtifacts() {
  for (const file of Object.values(files)) if (!existsSync(file)) throw new Error(`Missing release artifact: ${file}`);
}

function normalizedUsdot(value: string | undefined): string { return (value ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, ''); }
function yes(value: string | undefined): boolean | null { return value === 'Y' ? true : value === 'N' ? false : null; }
function integer(value: string | undefined): number | null { const n = Number(value); return value?.trim() && Number.isFinite(n) ? Math.trunc(n) : null; }
function docket(value: string | undefined): string { return (value ?? '').toUpperCase().replace(/[\s-]/g, ''); }
function recordKey(dataset: string, row: CsvRow): string { return `${dataset}:${createHash('sha256').update(JSON.stringify(row)).digest('hex')}`; }
function uuidForUsdot(usdot: string): string {
  const bytes = createHash('sha1').update(`movetrusthub:fmcsa:usdot:${usdot}`).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50; bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString('hex'); return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
function csvCell(value: unknown): string { const text = value == null ? '' : typeof value === 'string' ? value : JSON.stringify(value); return `"${text.replace(/"/g, '""')}"`; }
function csvLine(values: unknown[]): string { return `${values.map(csvCell).join(',')}\n`; }

async function readCsv(file: string, each: (row: CsvRow) => void | Promise<void>): Promise<number> {
  let count = 0;
  const parser = createReadStream(file).pipe(parse({ columns: true, bom: true, relax_column_count: false, skip_empty_lines: true }));
  for await (const row of parser) { count++; await each(row as CsvRow); }
  return count;
}

async function rowsByUsdot(file: string): Promise<{ rows: RowsByUsdot; count: number }> {
  const rows: RowsByUsdot = new Map();
  const count = await readCsv(file, (row) => { const usdot = normalizedUsdot(row.usdot_number); if (!usdot) return; const list = rows.get(usdot) ?? []; list.push(row); rows.set(usdot, list); });
  return { rows, count };
}

async function loadV1Usdots(): Promise<Set<string>> {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return new Set();
  const client = createClient(url, key, { auth: { persistSession: false } });
  const found = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client.from('companies').select('usdot_number').not('usdot_number', 'is', null).range(from, from + 999);
    if (error) throw new Error(`V1 coverage query failed: ${error.message}`);
    for (const row of data ?? []) { const value = normalizedUsdot(row.usdot_number ?? ''); if (value) found.add(value); }
    if ((data?.length ?? 0) < 1000) break;
  }
  return found;
}

function authorityFact(row: CsvRow): CurrentAuthorityFact {
  return { sourceRecordKey: recordKey('inys-ebih', row), docketNumber: docket(row.docket_number), authorityType: row.op_auth_type ?? '', authorityStatus: row.op_auth_status ?? '', cargoRequired: yes(row.cargo_req), cargoOnFile: yes(row.cargo_file), bondRequired: yes(row.bond_req), bondOnFile: yes(row.bond_file), minimumBipdCoverage: integer(row.min_cov_amount), bipdOnFile: integer(row.bipd_file) };
}
function authorityEvents(history: CsvRow[], revocations: CsvRow[]): AuthorityEvent[] {
  return [
    ...history.map((row) => ({ sourceRecordKey: recordKey('yu5v-wbh6', row), docketNumber: docket(row.docket_number), authorityType: row.op_auth_type ?? '', authorityStatus: row.op_auth_status ?? '', eventDate: row.status_change_date, reason: row.reason, sourceEra: 'MOTUS_CURRENT' as const })),
    ...revocations.map((row) => ({ sourceRecordKey: recordKey('wb4f-neki', row), docketNumber: docket(row.docket_number), authorityType: row.op_auth_type ?? '', authorityStatus: row.order1_type_desc ?? 'Revoked/Suspended', eventDate: row.order1_effective_date || row.order1_serve_date, reason: row.order1_type_desc, sourceEra: 'MOTUS_CURRENT' as const })),
  ];
}

async function main() {
  assertArtifacts(); const startedAt = new Date().toISOString(); const started = performance.now();
  const [carrier, authhist, insurance, boc3, revoke, v1] = await Promise.all([rowsByUsdot(files.carrier), rowsByUsdot(files.authhist), rowsByUsdot(files.insurance), rowsByUsdot(files.boc3), rowsByUsdot(files.revoke), loadV1Usdots()]);
  const hhgAuthorityUsdots = new Set([...carrier.rows].filter(([, rows]) => rows.some((row) => /household goods/i.test(row.op_auth_type ?? ''))).map(([usdot]) => usdot));
  const relevant = new Map<string, CsvRow>(); const censusDups = new Set<string>(); const allSeen = new Set<string>();
  const censusStats = { rows: 0, blankUsdot: 0, duplicateUsdot: 0, blankLegalName: 0, parseFailures: 0 };
  censusStats.rows = await readCsv(files.census, (row) => {
    const usdot = normalizedUsdot(row.dot_number); if (!usdot) { censusStats.blankUsdot++; return; }
    if (allSeen.has(usdot)) { censusStats.duplicateUsdot++; censusDups.add(usdot); } else allSeen.add(usdot);
    if (!row.legal_name?.trim()) censusStats.blankLegalName++;
    if (row.crgo_household === 'X' || hhgAuthorityUsdots.has(usdot) || v1.has(usdot)) relevant.set(usdot, row);
  });
  for (const usdot of hhgAuthorityUsdots) if (!relevant.has(usdot)) relevant.set(usdot, {});

  const docketRows = new Map<string, CsvRow>();
  await readCsv(files.dockets, (row) => { const usdot = normalizedUsdot(row.dot_number); if (usdot) docketRows.set(usdot, row); });

  const providerOut = createWriteStream(join(output, 'providers.csv'));
  const authorityOut = createWriteStream(join(output, 'authorities.csv'));
  const historyOut = createWriteStream(join(output, 'authority-history.csv'));
  const insuranceOut = createWriteStream(join(output, 'insurance.csv'));
  const revokeOut = createWriteStream(join(output, 'revoke-suspend.csv'));
  const boc3Out = createWriteStream(join(output, 'boc3.csv'));
  providerOut.write(csvLine(['provider_id','usdot','display_name','legal_name','dba_name','census_status','carrier_operation','physical_street','physical_city','physical_state','physical_zip','physical_country','mailing_street','mailing_city','mailing_state','mailing_zip','mailing_country','phone','email','power_units','truck_units','total_drivers','mcs150_date','moving_relevance','relevance_reasons','classification','rule_version','reason_codes','conflict_codes','supporting_source_keys','source_release_date']));
  authorityOut.write(csvLine(['source_record_key','provider_id','usdot','docket_number','docket_prefix','authority_type','authority_status','min_cov_amount','cargo_required','bond_required','bipd_on_file','cargo_on_file','bond_on_file','source_release_date']));
  historyOut.write(csvLine(['source_record_key','provider_id','usdot','docket_number','authority_type','authority_status','reason','status_change_date','source_release_date']));
  insuranceOut.write(csvLine(['source_record_key','provider_id','usdot','docket_number','form_code','type_code','class_code','max_cov_amount','underlying_amount','effective_date','insurance_company_name','transaction_date','source_release_date']));
  revokeOut.write(csvLine(['source_record_key','provider_id','usdot','docket_number','authority_type','serve_date','action_type','effective_date','source_release_date']));
  boc3Out.write(csvLine(['source_record_key','provider_id','usdot','docket_number','blanket_company_name','source_release_date']));

  const counts: Record<string, number> = { movingRelevantProviders: 0, reviewRelevanceProviders: 0 };
  const coverage = { dba: 0, phone: 0, physicalAddress: 0, mailingAddress: 0, docket: 0, authority: 0, financial: 0, powerUnits: 0, drivers: 0 };
  const byState: Record<string, Record<string, number>> = {};
  const v1Audit = { withUsdot: v1.size, matched: 0, missingCensus: 0, relevant: 0, review: 0, classifications: {} as Record<string, number> };
  const classifications = new Map<string, string>();
  for (const [usdot, census] of relevant) {
    const motus = carrier.rows.get(usdot) ?? []; const histories = authhist.rows.get(usdot) ?? []; const insurances = insurance.rows.get(usdot) ?? []; const revocations = revoke.rows.get(usdot) ?? [];
    const currentAuthorities = motus.map(authorityFact); const events = authorityEvents(histories, revocations);
    const brokerFinancial = insurances.some((row) => row.ins_form_code === '84' || row.ins_form_code === '85' || row.ins_type_code === '3' || row.ins_type_code === '4');
    const result = classifyFmcsaProvider({ usdot, censusStatus: (['A','I','P'].includes(census.status_code) ? census.status_code : 'UNKNOWN') as 'A'|'I'|'P'|'UNKNOWN', carrierOperation: census.carrier_operation, householdGoodsCargo: census.crgo_household === 'X', powerUnits: integer(census.power_units), currentAuthorities, authorityEvents: events, brokerFinancialResponsibilityReported: brokerFinancial, knownV1Provider: v1.has(usdot) });
    const identity = motus.find((row) => row.legal_name || row.dba_name) ?? census; const legal = (identity.legal_name || census.legal_name || '').trim(); const dba = (identity.dba_name || census.dba_name || '').trim();
    const relevanceReasons = [census.crgo_household === 'X' && 'FMCSA_CARGO_HOUSEHOLD_GOODS', hhgAuthorityUsdots.has(usdot) && 'CURRENT_OR_HISTORIC_HHG_MOTUS_AUTHORITY', v1.has(usdot) && 'EXISTING_V1_PROVIDER_MATCH'].filter(Boolean);
    const relevance = legal ? 'RELEVANT' : 'REVIEW'; if (relevance === 'RELEVANT') counts.movingRelevantProviders++; else counts.reviewRelevanceProviders++;
    counts[result.classification] = (counts[result.classification] ?? 0) + 1; classifications.set(usdot, result.classification);
    const dockets = new Set([...motus.map((row) => docket(row.docket_number)), ...Object.keys(docketRows.get(usdot) ?? {}).filter((key) => /^docket\d$/.test(key)).map((key) => docket(docketRows.get(usdot)?.[key]))].filter(Boolean));
    if (dba) coverage.dba++; if (census.phone || identity.bus_telno) coverage.phone++; if (census.phy_street || identity.bus_street_po) coverage.physicalAddress++; if (census.carrier_mailing_street || identity.mail_street_po) coverage.mailingAddress++; if (dockets.size) coverage.docket++; if (motus.length) coverage.authority++; if (insurances.length) coverage.financial++; if (integer(census.power_units) != null) coverage.powerUnits++; if (integer(census.total_drivers) != null) coverage.drivers++;
    const state = (census.phy_state || identity.bus_state_code || 'UNKNOWN').toUpperCase(); byState[state] ??= {}; byState[state][result.classification] = (byState[state][result.classification] ?? 0) + 1;
    const providerId = uuidForUsdot(usdot);
    providerOut.write(csvLine([providerId,usdot,selectDisplayName(legal || `USDOT ${usdot}`,dba),legal,dba,census.status_code || '',census.carrier_operation || '',census.phy_street || identity.bus_street_po,census.phy_city || identity.bus_city,state,census.phy_zip || identity.bus_zip_code,census.phy_country || identity.bus_ctry_code,census.carrier_mailing_street || identity.mail_street_po,census.carrier_mailing_city || identity.mail_city,census.carrier_mailing_state || identity.mail_state_code,census.carrier_mailing_zip || identity.mail_zip_code,census.carrier_mailing_country || identity.mail_ctry_code,census.phone || identity.bus_telno,census.email_address,integer(census.power_units),integer(census.truck_units),integer(census.total_drivers),census.mcs150_date,relevance,relevanceReasons,result.classification,result.ruleVersion,result.reasonCodes,result.conflictCodes,result.supportingSourceRecordKeys,RELEASE_DATE]));
    for (const row of motus) authorityOut.write(csvLine([recordKey('inys-ebih',row),providerId,usdot,docket(row.docket_number),docket(row.docket_number).slice(0,2),row.op_auth_type,row.op_auth_status,integer(row.min_cov_amount),yes(row.cargo_req),yes(row.bond_req),integer(row.bipd_file),yes(row.cargo_file),yes(row.bond_file),RELEASE_DATE]));
    for (const row of histories) historyOut.write(csvLine([recordKey('yu5v-wbh6',row),providerId,usdot,docket(row.docket_number),row.op_auth_type,row.op_auth_status,row.reason,row.status_change_date,RELEASE_DATE]));
    for (const row of insurances) insuranceOut.write(csvLine([recordKey('c5y8-a4uz',row),providerId,usdot,docket(row.docket_number),row.ins_form_code,row.ins_type_code,row.ins_class_code,integer(row.max_cov_amount),integer(row.underl_lim_amount),row.effective_date,row.insurance_company_name,row.trans_date,RELEASE_DATE]));
    for (const row of revocations) revokeOut.write(csvLine([recordKey('wb4f-neki',row),providerId,usdot,docket(row.docket_number),row.op_auth_type,row.order1_serve_date,row.order1_type_desc,row.order1_effective_date,RELEASE_DATE]));
    for (const row of boc3.rows.get(usdot) ?? []) boc3Out.write(csvLine([recordKey('6snj-ed7q',row),providerId,usdot,docket(row.docket_number),row.co_name,RELEASE_DATE]));
    if (v1.has(usdot)) { v1Audit.matched++; if (!census.dot_number) v1Audit.missingCensus++; if (relevance === 'RELEVANT') v1Audit.relevant++; else v1Audit.review++; v1Audit.classifications[result.classification] = (v1Audit.classifications[result.classification] ?? 0) + 1; }
  }
  await Promise.all([providerOut,authorityOut,historyOut,insuranceOut,revokeOut,boc3Out].map((stream) => new Promise<void>((resolve, reject) => { stream.on('error', reject); stream.end(resolve); })));
  const total = relevant.size; const pct = Object.fromEntries(Object.entries(coverage).map(([key,value]) => [key, { count:value, percent:Number((value/total*100).toFixed(2)) }]));
  const report = { releaseDate: RELEASE_DATE, startedAt, completedAt: new Date().toISOString(), durationSeconds: Number(((performance.now()-started)/1000).toFixed(2)), ruleVersion: FMCSA_CLASSIFICATION_RULE_VERSION, sourceRows: { census:censusStats.rows, motusCarrier:carrier.count, authorityHistory:authhist.count, insurance:insurance.count, boc3:boc3.count, revokeSuspend:revoke.count }, censusQuality:censusStats, relevantProviders:total, counts, coverage:pct, stateDistribution:byState, v1Audit, outputFiles:Object.fromEntries(Object.entries({providers:'providers.csv',authorities:'authorities.csv',authorityHistory:'authority-history.csv',insurance:'insurance.csv',revokeSuspend:'revoke-suspend.csv',boc3:'boc3.csv'}).map(([key,file])=>[key,{file,sizeBytes:statSync(join(output,file)).size}])) };
  writeFileSync(join(output,'national-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}

main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
