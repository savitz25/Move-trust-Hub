/**
 * Fetch WA UTC HHG active carrier registry into data/state-hhg/wa/.
 * Usage: npx tsx scripts/fetch-wa-utc-registry.ts [--limit=N]
 * Google Places requests: 0
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { fetchWaUtcHhgRegistry } from '@/lib/state-hhg/wa/fetch-utc-registry';

async function main() {
  const limitArg = process.argv.find((a) => a.startsWith('--limit='));
  const detailLimit = limitArg ? Number(limitArg.split('=')[1]) : undefined;
  const outDir = resolve(process.cwd(), 'data/state-hhg/wa');
  mkdirSync(outDir, { recursive: true });

  console.log(
    JSON.stringify({
      google_places_requests: 0,
      detailLimit: detailLimit ?? 'all',
      starting: true,
    })
  );

  const result = await fetchWaUtcHhgRegistry({
    delayMs: 350,
    detailLimit,
    includeAllList: false,
    outDir,
  });

  // Normalize snapshot shape expected by WashingtonStateMoverAdapter
  const adapterSnapshot = {
    retrievedAt: result.retrievedAt,
    googlePlacesRequests: 0 as const,
    source: 'wa_utc_hhg_html',
    sourceUrl:
      'https://www.utc.wa.gov/companies?combine=&usdot=&exposed_select_industry=568&regulatory_status=1',
    count: result.activeRecords.length,
    records: result.activeRecords.map((r) => ({
      companyNodeId: r.companyNodeId,
      utcId: r.detailUtcId ?? r.listUtcId,
      legalName: r.legalName,
      dba: r.dba,
      ubi: r.ubi,
      usdot: r.usdot,
      industries: r.industries,
      status: r.status,
      phone: r.phone,
      email: r.email,
      physicalAddress: r.physicalAddress,
      mailingAddress: r.mailingAddress,
      permitNumber: r.permitNumber,
      permitKind: r.permOrTemp,
      contactName: r.primaryContactName,
      contactTitle: r.primaryContactTitle,
      sourceUrl: r.sourceUrl,
      city: r.city,
      postalCode: r.postalCode,
      parseWarnings: r.parseWarnings,
    })),
  };

  const adapterPath = resolve(outDir, 'utc-hhg-active-raw.json');
  writeFileSync(adapterPath, JSON.stringify(adapterSnapshot, null, 2));

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        records: adapterSnapshot.count,
        fieldCoverage: result.fieldCoverage,
        adapterPath,
        summaryPath: result.summaryPath,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
