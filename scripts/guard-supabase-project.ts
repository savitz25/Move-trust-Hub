/**
 * Fail the Vercel build unless Supabase is the canonical Move project, or the
 * exact reviewed isolated project under the non-production browser-auth contract.
 * ALLOW_NON_CANONICAL_SUPABASE does not admit a Vercel preview or production build.
 *
 * Usage:
 *   npx tsx scripts/guard-supabase-project.ts
 *   ENFORCE_CANONICAL_SUPABASE=1 npx tsx scripts/guard-supabase-project.ts
 */
import { readFileSync } from 'node:fs';
import {
  CANONICAL_SUPABASE_PROJECT_REF,
  extractSupabaseProjectRef,
  FORBIDDEN_SUPABASE_PROJECT_REF,
} from '../lib/supabase/canonical-project';
import { assessSupabaseProjectGuard } from './supabase-project-guard';

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

const result = assessSupabaseProjectGuard();
if (!result.ok) {
  console.error('FAIL:', result.message);
  process.exit(1);
}

console.log('OK: Supabase project guard passed', result.mode);
