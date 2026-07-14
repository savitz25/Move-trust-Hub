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

async function main() {
  console.log('OK: no runtime imports of deprecated county-testimonials modules');

  const { fetchAllRequiredLiveCounties, PRODUCTION_ORIGIN } = await import('./lib/live-county-audit');
  const liveResults = await fetchAllRequiredLiveCounties();
  const liveProbeReport: Array<{ label: string; path: string; status: number; pass: boolean; issues: string[] }> = [];

  for (const result of liveResults) {
    const issues: string[] = [];
    let html = '';
    try {
      const response = await fetch(`${PRODUCTION_ORIGIN}${result.probe.path}`, {
        headers: { 'User-Agent': 'MoveTrustHub-TestimonialGuard/1.1' },
      });
      html = await response.text();
      if (response.status !== 200) issues.push(`http_${response.status}`);
      if (/Loup River Sherman Moving/i.test(html)) issues.push('fabricated_testimonial_quote');
      if (/\bloup river sherman\b/i.test(html)) issues.push('artifact_text');
      if (/<meta[^>]+name=["']keywords["']/i.test(html)) issues.push('forbidden_keywords_meta');
    } catch (error) {
      issues.push(`fetch_failed:${error instanceof Error ? error.message : String(error)}`);
    }

    liveProbeReport.push({
      label: result.probe.label,
      path: result.probe.path,
      status: result.status,
      pass: issues.length === 0,
      issues,
    });
  }

  const failures = liveProbeReport.filter((probe) => !probe.pass);
  if (failures.length > 0) {
    console.error('Live testimonial guard failures:');
    failures.forEach((probe) => console.error(`  - ${probe.label}: ${probe.issues.join(', ')}`));
    process.exit(1);
  }

  console.log(`Live testimonial guard OK (${liveResults.length} county probes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});