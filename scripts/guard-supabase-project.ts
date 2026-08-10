/**
 * Fail build/CI if Supabase URL is missing, is the legacy free project (uvq),
 * or is not the canonical Move DB (are) when ENFORCE_CANONICAL_SUPABASE=1 / CI / production.
 *
 * Usage:
 *   npx tsx scripts/guard-supabase-project.ts
 *   ENFORCE_CANONICAL_SUPABASE=1 npx tsx scripts/guard-supabase-project.ts
 */
import { readFileSync } from 'node:fs';
import {
  assertCanonicalSupabaseUrl,
  CANONICAL_SUPABASE_PROJECT_REF,
  extractSupabaseProjectRef,
  FORBIDDEN_SUPABASE_PROJECT_REF,
  isForbiddenSupabaseUrl,
} from '../lib/supabase/canonical-project';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local', '.env']) {
    try {
      const raw = readFileSync(file, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const i = t.indexOf('=');
        if (i < 0) continue;
        const k = t.slice(0, i).trim();
        let v = t.slice(i + 1).trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        if (!process.env[k]) process.env[k] = v;
      }
    } catch {
      /* optional */
    }
  }
}

loadEnvFiles();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const ref = extractSupabaseProjectRef(url);

console.log('NEXT_PUBLIC_SUPABASE_URL ref:', ref ?? '(missing)');
console.log('canonical:', CANONICAL_SUPABASE_PROJECT_REF);
console.log('forbidden:', FORBIDDEN_SUPABASE_PROJECT_REF);

if (!url) {
  console.error('FAIL: NEXT_PUBLIC_SUPABASE_URL is not set');
  process.exit(1);
}

if (isForbiddenSupabaseUrl(url)) {
  console.error(
    `FAIL: URL host contains forbidden project ${FORBIDDEN_SUPABASE_PROJECT_REF}`
  );
  process.exit(1);
}

try {
  assertCanonicalSupabaseUrl(url, {
    requireCanonical:
      process.env.ENFORCE_CANONICAL_SUPABASE === '1' ||
      process.env.CI === 'true' ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.NODE_ENV === 'production',
  });
} catch (err) {
  console.error('FAIL:', err instanceof Error ? err.message : err);
  process.exit(1);
}

console.log('OK: Supabase project guard passed');
