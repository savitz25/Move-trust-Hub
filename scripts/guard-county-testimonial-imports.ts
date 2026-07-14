/**
 * CI guard — block runtime imports of deprecated fabricated county testimonials.
 * Run: npx tsx scripts/guard-county-testimonial-imports.ts
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '..');
const SCAN_DIRS = ['app', 'components', 'lib', 'actions'];
/** Match deprecated data module imports only — not aria ids like county-testimonials-heading */
const FORBIDDEN =
  /(?:import\s+[^'"]+\s+from\s+['"][^'"]*county-testimonials|from\s+['"][^'"]*county-testimonials)/;
const ALLOWED_PREFIXES = ['scripts/', 'data/'];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = full.slice(ROOT.length + 1).replace(/\\/g, '/');
    if (ALLOWED_PREFIXES.some((p) => rel.startsWith(p))) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(entry)) files.push(rel);
  }
  return files;
}

const violations: string[] = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const content = readFileSync(join(ROOT, file), 'utf8');
    if (FORBIDDEN.test(content)) {
      violations.push(file);
    }
  }
}

if (violations.length > 0) {
  console.error('Forbidden county-testimonials imports in runtime code:');
  violations.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}

console.log('OK: no runtime imports of deprecated county-testimonials modules');