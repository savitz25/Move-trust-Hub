/**
 * Production backfill — all ~392 unified directory movers.
 *
 * Enriches Google Places + BBB public scrape (and Trustpilot/Yelp scrape).
 * NEVER overwrites FMCSA or official BBB table columns.
 *
 * Usage:
 *   # 1. Preview first batch
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-all-companies.ts --dry-run --batch 25
 *
 *   # 2. Live batches (repeat with increasing offset)
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-all-companies.ts --batch 25 --offset 0
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-all-companies.ts --batch 25 --offset 25
 *   # ... through offset 375 for ~392 companies
 *
 *   # Force refresh (ignore 30-day stale guard)
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-all-companies.ts --batch 25 --force
 *
 * Env (.env.local or Vercel):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   GOOGLE_PLACES_API_KEY
 *   BBB_API_KEY (optional — improves BBB match rate)
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  parseProductionBackfillArgs,
  runProductionBackfill,
} from '../lib/verification/run-production-backfill';

loadEnvLocal();

const opts = parseProductionBackfillArgs(process.argv.slice(2));
opts.scriptName = 'backfill-all-companies';

runProductionBackfill(opts)
  .then(({ exitCode }) => process.exit(exitCode))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });