/**
 * Sync lender-trust-hub and insurance-trust-hub routes into movetrusthub.com subdirectories.
 *
 * Usage (from repo root):
 *   LENDER_SRC=../lender-trust-hub INSURANCE_SRC=../insurance-trust-hub npx tsx scripts/sync-trust-hub-subapps.ts
 *
 * This script copies app routes (excluding root layout), lib, components, and data into
 * hubs/lender and hubs/insurance, then generates thin wrappers under app/lender and app/insurance.
 * Run after initial hub shell is in place (HubSelector, middleware, sitemaps).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const LENDER_SRC = process.env.LENDER_SRC ?? join(ROOT, '..', 'lender-trust-hub');
const INSURANCE_SRC = process.env.INSURANCE_SRC ?? join(ROOT, '..', 'insurance-trust-hub');

function copyTree(src: string, dest: string, skip: RegExp[] = []) {
  if (!existsSync(src)) {
    console.warn(`Skip missing: ${src}`);
    return;
  }
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (skip.some((re) => re.test(entry))) continue;
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) {
      copyTree(from, to, skip);
    } else {
      cpSync(from, to);
    }
  }
}

console.log('Trust Hub sub-app sync — scaffold only.');
console.log('Lender source:', LENDER_SRC);
console.log('Insurance source:', INSURANCE_SRC);
console.log('');
console.log('Manual steps after running full sync:');
console.log('1. Copy lender-trust-hub/app/* → app/lender/ (skip app/layout.tsx)');
console.log('2. Copy insurance-trust-hub/app/* → app/insurance/ (skip app/layout.tsx)');
console.log('3. Prefix internal href="/ with href="/lender/ or /insurance/');
console.log('4. Add tsconfig paths @lender/* and @insurance/* if using hubs/ namespace');
console.log('5. npm run build && verify /lender and /insurance routes');