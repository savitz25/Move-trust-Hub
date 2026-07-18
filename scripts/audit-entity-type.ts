import { loadEnvLocal } from '../lib/verification/load-env-local';
import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('companies')
    .select('slug, name, fmcsa_raw, fmcsa_last_checked, services')
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '');

  if (error) throw error;
  const rows = data ?? [];

  let noRaw = 0;
  let hasRawNoEntity = 0;
  let hasEntity = 0;
  const entityCounts: Record<string, number> = {};
  const missingSamples: Array<Record<string, unknown>> = [];

  for (const row of rows) {
    const raw = row.fmcsa_raw as Record<string, unknown> | null;
    if (!raw) {
      noRaw++;
      continue;
    }
    const entityType = extractEntityType(raw);
    if (entityType) {
      hasEntity++;
      entityCounts[entityType] = (entityCounts[entityType] ?? 0) + 1;
    } else {
      hasRawNoEntity++;
      if (missingSamples.length < 12) {
        missingSamples.push({
          slug: row.slug,
          name: row.name,
          censusTypeId: raw.censusTypeId,
          commonAuthorityStatus: raw.commonAuthorityStatus,
          brokerAuthorityStatus: raw.brokerAuthorityStatus,
          contractAuthorityStatus: raw.contractAuthorityStatus,
          services: row.services,
        });
      }
    }
  }

  console.log('=== Entity Type Audit ===\n');
  console.log(`Total with USDOT: ${rows.length}`);
  console.log(`No fmcsa_raw (FMCSA refresh failed/skipped): ${noRaw}`);
  console.log(`Has fmcsa_raw + entity type: ${hasEntity}`);
  console.log(`Has fmcsa_raw but entity type empty: ${hasRawNoEntity}`);
  console.log('\nEntity type distribution:');
  for (const [k, v] of Object.entries(entityCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }
  console.log('\nSamples with fmcsa_raw but no entity type:');
  for (const s of missingSamples) {
    console.log(JSON.stringify(s));
  }

  let carrierOnly = 0;
  let brokerOnly = 0;
  let both = 0;
  let neither = 0;
  for (const row of rows) {
    const raw = row.fmcsa_raw as Record<string, unknown> | null;
    if (!raw) continue;
    const common = String(raw.commonAuthorityStatus ?? '').toUpperCase();
    const broker = String(raw.brokerAuthorityStatus ?? '').toUpperCase();
    const commonActive = common === 'A' || common === 'ACTIVE';
    const brokerActive = broker === 'A' || broker === 'ACTIVE';
    if (commonActive && brokerActive) both++;
    else if (brokerActive) brokerOnly++;
    else if (commonActive) carrierOnly++;
    else neither++;
  }

  console.log('\nAuthority breakdown (companies with fmcsa_raw):');
  console.log(`  Carrier authority only: ${carrierOnly}`);
  console.log(`  Broker authority only: ${brokerOnly}`);
  console.log(`  Both carrier + broker: ${both}`);
  console.log(`  Neither active: ${neither}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});