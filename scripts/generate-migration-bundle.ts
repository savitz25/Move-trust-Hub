/**
 * Regenerate supabase/run-key-migrations-bundle.sql (schema + key migrations).
 * Run: npx tsx scripts/generate-migration-bundle.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const MIGRATIONS = [
  '20260702120000_fmcsa_refresh_pipeline.sql',
  '20260705120000_company_suggestions.sql',
  '20260707120000_multi_source_verification.sql',
] as const;

const schema = readFileSync(join(ROOT, 'supabase/schema.sql'), 'utf8');
let bundle =
  '-- FULL SETUP: baseline schema + key migrations\n' +
  '-- Paste and run this ENTIRE file in Supabase SQL Editor.\n\n' +
  '-- ===== BASELINE: supabase/schema.sql =====\n' +
  schema +
  '\n';

for (const file of MIGRATIONS) {
  bundle += `\n-- ===== ${file} =====\n`;
  bundle += readFileSync(join(ROOT, 'supabase/migrations', file), 'utf8');
  bundle += '\n';
}

writeFileSync(join(ROOT, 'supabase/run-key-migrations-bundle.sql'), bundle);
console.log(`Wrote supabase/run-key-migrations-bundle.sql (${bundle.length} bytes)`);