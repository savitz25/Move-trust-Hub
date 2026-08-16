import { createReadStream, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'csv-parse';

async function main() {
 const wanted = new Set(['INTERSTATE_CARRIER','LOCAL_INTRASTATE_CARRIER_CANDIDATE','AUTHORIZED_BROKER','DUAL_ROLE_CARRIER_BROKER','INACTIVE_ENTITY','NEEDS_REGULATORY_REVIEW']);
 const selected: Record<string, Record<string, string>> = {};
 const input = resolve('.data/fmcsa/2026-08-16/normalized/providers.csv');
 for await (const row of createReadStream(input).pipe(parse({ columns: true }))) {
  const record = row as Record<string, string>;
  if (wanted.has(record.classification) && !selected[record.classification] && ['CA','FL','IL','IN','NJ','TX','WA','NY'].includes(record.physical_state)) selected[record.classification] = record;
  if (Object.keys(selected).length === wanted.size) break;
 }
 const samples = Object.values(selected).map((row) => ({
  providerId: row.provider_id, usdot: row.usdot, displayName: row.display_name,
  legalName: row.legal_name, dbaName: row.dba_name || null, classification: row.classification,
  state: row.physical_state, city: row.physical_city, powerUnits: Number(row.power_units) || null,
  drivers: Number(row.total_drivers) || null, reasonCodes: JSON.parse(row.reason_codes),
  conflicts: JSON.parse(row.conflict_codes), sourceRelease: row.source_release_date,
 }));
 writeFileSync(resolve('lib/move-v2/fmcsa/real-qa-sample.json'), `${JSON.stringify(samples, null, 2)}\n`);
 console.log(`Wrote ${samples.length} bounded real-data QA records.`);
}

void main();
