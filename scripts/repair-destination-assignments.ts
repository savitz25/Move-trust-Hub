/**
 * Re-run destination/county assignment for verified companies.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/repair-destination-assignments.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/repair-destination-assignments.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/repair-destination-assignments.ts --slug=usa-family-moving-of-atlanta-llc
 */
import { resolveDestinationsWithDebug } from '../lib/destinations/resolve-from-headquarters';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slugArg = args.find((a) => a.startsWith('--slug='))?.split('=')[1];

  const samples = [
    'Alpharetta, GA',
    '1230 Union Center Dr, Alpharetta, GA 30004',
    'Atlanta, GA',
    '123 Main St, Alpharetta, GA 30009',
  ];

  console.log('--- Resolution samples ---');
  for (const sample of samples) {
    const debug = resolveDestinationsWithDebug({ headquarters: sample });
    console.log({
      sample,
      primaryCity: debug.primaryCity,
      counties: debug.assignments.map((a) => `${a.stateSlug}/${a.countySlug}`),
      destinations: debug.assignments.flatMap((a) => a.marketSlugs),
    });
  }

  const { reassignDestinationsForVerifiedCompanies } = await import(
    '../lib/suggestions/reassign-destinations'
  );

  console.log(`\n--- Reassign verified companies ${dryRun ? '(dry-run)' : ''} ---`);
  const result = await reassignDestinationsForVerifiedCompanies({ slug: slugArg, dryRun });
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});