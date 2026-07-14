/**
 * CI guard — no content class may bypass template/quality detection.
 * Fails if exemption flags reappear in detection logic.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '..');
const SCAN_ROOTS = ['lib/local-movers', 'app/(move)/(marketing)/local-movers'];

const FORBIDDEN_PATTERNS: ReadonlyArray<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /isGenericTemplateCountyResearch[\s\S]{0,120}hasDeepCountyResearch[\s\S]{0,40}return\s+false/,
    reason: 'deep-county bypass in isGenericTemplateCountyResearch',
  },
  {
    pattern: /if\s*\(\s*hasDeepCountyResearch[^)]*\)\s*return\s+false/,
    reason: 'hasDeepCountyResearch short-circuit returning false (template exemption)',
  },
  {
    pattern: /if\s*\(\s*hasDeepCountyResearch[^)]*\)\s*return\s+'grok_heavy_original'/,
    reason: 'hasDeepCountyResearch auto-classifies grok_heavy_original without quality detection',
  },
  {
    pattern: /hasDeepCountyResearch[\s\S]{0,80}return\s+true\s*;?\s*\/\/.*(?:skip|exempt|bypass)/i,
    reason: 'commented deep-county detection bypass',
  },
];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
  }
  return files;
}

const violations: string[] = [];

for (const relRoot of SCAN_ROOTS) {
  const abs = join(ROOT, relRoot);
  for (const file of walk(abs)) {
    const rel = file.slice(ROOT.length + 1).replace(/\\/g, '/');
    const content = readFileSync(file, 'utf8');
    for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        violations.push(`${rel}: ${reason}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Forbidden content-tier exemption patterns detected:');
  violations.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}

console.log('OK: no content-tier exemption bypasses in county detection logic');