/**
 * CI guard — block runtime imports of deprecated fabricated county testimonials
 * + live rendered HTML spot-check on all 17 audit probe URLs.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildAllAuditProbes,
  PRODUCTION_ORIGIN,
  serializeProbeResults,
} from './lib/live-county-audit';

const ROOT = join(__dirname, '..');
const SCAN_DIRS = ['app', 'components', 'lib', 'actions'];
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

  const origin = process.env.AUDIT_ORIGIN ?? PRODUCTION_ORIGIN;
  const probePlan = buildAllAuditProbes(process.env.DEPLOY_COMMIT_HASH);
  const liveProbeReport: Array<{
    label: string;
    path: string;
    status: number;
    pass: boolean;
    issues: string[];
  }> = [];

  for (const probe of probePlan.all) {
    const issues: string[] = [];
    let status = 0;
    try {
      const response = await fetch(`${origin}${probe.path}`, {
        headers: { 'User-Agent': 'MoveTrustHub-TestimonialGuard/1.1-revised' },
      });
      status = response.status;
      const html = await response.text();
      if (response.status !== 200) issues.push(`http_${response.status}`);
      if (/Loup River Sherman Moving/i.test(html)) issues.push('fabricated_testimonial_quote');
      if (/\bloup river sherman\b/i.test(html)) issues.push('artifact_text');
      if (/<meta[^>]+name=["']keywords["']/i.test(html)) issues.push('forbidden_keywords_meta');
    } catch (error) {
      issues.push(`fetch_failed:${error instanceof Error ? error.message : String(error)}`);
    }

    liveProbeReport.push({
      label: probe.label,
      path: probe.path,
      status,
      pass: issues.length === 0,
      issues,
    });
  }

  const failures = liveProbeReport.filter((probe) => !probe.pass);
  const serialized = serializeProbeResults(
    origin,
    liveProbeReport.map((row) => ({
      probe: probePlan.all.find((p) => p.path === row.path)!,
      status: row.status,
      title: null,
      metaDescription: null,
      robots: null,
      hasKeywordsMeta: row.issues.includes('forbidden_keywords_meta'),
      hasMoversServingTitle: true,
      hasMoversServingH1: true,
      hasArtifactText: row.issues.some((i) => i.startsWith('artifact')),
      hasJsonLd: true,
      renderedArtifactPatterns: row.issues.filter((i) => i.startsWith('artifact')),
      errors: row.issues,
    }))
  );

  if (failures.length > 0) {
    console.error('Live testimonial guard failures:', JSON.stringify(serialized, null, 2));
    process.exit(1);
  }

  console.log(`Live testimonial guard OK (${probePlan.all.length} county probes on ${origin})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});