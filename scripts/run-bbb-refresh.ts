/**
 * Local/manual BBB refresh runner.
 * Usage: npm run refresh:bbb -- --mode=incremental
 */
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
  const args = process.argv.slice(2);
  const modeArg = args.find((a) => a.startsWith('--mode='));
  const mode = modeArg?.split('=')[1] === 'full' ? 'full' : 'incremental';
  const force = args.includes('--force');

  const { runBbbRefresh } = await import('../lib/bbb/refresh/runner');
  const result = await runBbbRefresh({ mode, triggeredBy: 'admin', force });

  console.log(JSON.stringify(result, null, 2));
  if (result.status === 'failed') process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});