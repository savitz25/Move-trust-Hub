/**
 * Post-deploy verification wrapper.
 * Ensures the target server is reachable, then runs the full hub 404 audit.
 *
 *   npm run verify:hub
 *   npm run verify:hub -- --base=http://localhost:3000
 *   npm run verify:hub -- --base=https://www.movetrusthub.com
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const args = process.argv.slice(2);

function parseBaseUrl(argv: string[]): string | undefined {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--base=')) return arg.slice('--base='.length);
    if (arg === '--base' && argv[i + 1]) return argv[i + 1];
  }
  return process.env.AUDIT_BASE_URL;
}

const base = parseBaseUrl(args);
const auditScript = path.join(__dirname, 'audit-hub-404s.ts');
const auditArgs = ['tsx', auditScript, ...(base ? [`--base=${base.replace(/\/$/, '')}`] : [])];

console.log('=== Hub production verification ===\n');
if (base) console.log(`Target: ${base.replace(/\/$/, '')}\n`);

const result = spawnSync('npx', auditArgs, {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

if (result.error) {
  console.error('\nFailed to launch audit:', result.error.message);
  process.exit(3);
}

if (result.status === 2) {
  console.error('\nVerification aborted: server unreachable (preflight failed).');
  process.exit(2);
}

if (result.status !== 0) {
  console.error(`\nVerification failed with exit code ${result.status ?? 'unknown'}.`);
  process.exit(result.status ?? 1);
}

console.log('\n=== Verification passed ===');