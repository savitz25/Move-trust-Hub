/**
 * @deprecated Use scripts/backfill-all-companies.ts — this entry delegates to the same runner.
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  parseProductionBackfillArgs,
  runProductionBackfill,
} from '../lib/verification/run-production-backfill';

loadEnvLocal();

const opts = parseProductionBackfillArgs(process.argv.slice(2));
opts.scriptName = 'backfill-company-verification';

runProductionBackfill(opts)
  .then(({ exitCode }) => process.exit(exitCode))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });