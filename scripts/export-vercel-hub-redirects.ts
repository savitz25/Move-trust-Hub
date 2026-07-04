/**
 * Sync vercel.json redirects from lib/migration/hub-redirects.ts (single source of truth).
 *
 *   npx tsx scripts/export-vercel-hub-redirects.ts
 *   npx tsx scripts/export-vercel-hub-redirects.ts --write
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getVercelHubRedirects, HUB_DOMAIN_REDIRECTS } from '../lib/migration/hub-redirects';

const ROOT = process.cwd();
const write = process.argv.includes('--write');
const redirects = [...getVercelHubRedirects(), ...HUB_DOMAIN_REDIRECTS];

if (write) {
  const vercelPath = join(ROOT, 'vercel.json');
  const vercel = JSON.parse(readFileSync(vercelPath, 'utf8')) as Record<string, unknown>;
  vercel.redirects = redirects;
  writeFileSync(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`, 'utf8');
  console.log(`Updated vercel.json with ${redirects.length} redirects`);
} else {
  console.log(JSON.stringify(redirects, null, 2));
}