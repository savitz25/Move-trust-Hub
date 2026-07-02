/**
 * Audits hub pages for SEO metadata patterns, missing buildHubMetadata usage,
 * and potential duplicate title suffixes.
 *
 * Usage: npm run audit:hub-seo
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');
const HUB_DIRS = ['app/lender', 'app/insurance'] as const;

type Finding = { file: string; issue: string; severity: 'error' | 'warn' | 'info' };

const findings: Finding[] = [];

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (/\.(tsx|ts)$/.test(entry.name)) return [full];
    return [];
  });
}

function relative(file: string) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

for (const hubDir of HUB_DIRS) {
  const abs = path.join(ROOT, hubDir);
  if (!fs.existsSync(abs)) continue;

  for (const file of walk(abs)) {
    const rel = relative(file);
    const content = fs.readFileSync(file, 'utf8');

    if (rel.includes('/admin/')) {
      if (!content.includes('noIndex') && !content.includes('index: false')) {
        findings.push({
          file: rel,
          issue: 'Admin route may be missing noindex metadata',
          severity: 'warn',
        });
      }
      continue;
    }

    if (!rel.endsWith('page.tsx') && !rel.endsWith('layout.tsx')) continue;

    const hasMetadata =
      content.includes('export const metadata') ||
      content.includes('export async function generateMetadata') ||
      content.includes('export function generateMetadata');

    if (!hasMetadata && !rel.includes('not-found')) {
      findings.push({ file: rel, issue: 'No metadata export found', severity: 'error' });
    }

    if (hasMetadata) {
      const usesHubHelper =
        content.includes('buildHubMetadata') ||
        content.includes('wrapHubPageMetadata') ||
        content.includes('buildHubLayoutMetadata');

      if (!usesHubHelper && rel.endsWith('page.tsx')) {
        findings.push({
          file: rel,
          issue: 'Metadata not using buildHubMetadata / wrapHubPageMetadata',
          severity: 'warn',
        });
      }

      if (content.includes('| Move Trust Hub | Move Trust Hub')) {
        findings.push({
          file: rel,
          issue: 'Duplicate Move Trust Hub title suffix detected',
          severity: 'error',
        });
      }

      if (
        content.match(/title:\s*['"`][^'"`]*Move Trust Hub[^'"`]*['"`]/) &&
        (rel.startsWith('app/lender/') || rel.startsWith('app/insurance/'))
      ) {
        findings.push({
          file: rel,
          issue: 'Hard-coded Move Trust Hub in hub page title — prefer hub-specific suffix',
          severity: 'info',
        });
      }
    }

    if (content.includes('dangerouslySetInnerHTML') && content.includes('application/ld+json')) {
      if (!content.includes('SchemaInjector') && !content.includes('JsonLd')) {
        findings.push({
          file: rel,
          issue: 'Inline JSON-LD — consider SchemaInjector for consistency',
          severity: 'info',
        });
      }
    }

    if (content.match(/router\.(push|replace)\(\/[^'"]/)) {
      findings.push({
        file: rel,
        issue: 'Possible corrupted router.push (missing quote)',
        severity: 'error',
      });
    }
  }
}

const bySeverity = { error: 0, warn: 0, info: 0 };
for (const f of findings) bySeverity[f.severity]++;

console.log('\n=== Trust Hub SEO Audit ===\n');
console.log(`Files scanned under: ${HUB_DIRS.join(', ')}`);
console.log(`Findings: ${findings.length} (${bySeverity.error} errors, ${bySeverity.warn} warnings, ${bySeverity.info} info)\n`);

for (const severity of ['error', 'warn', 'info'] as const) {
  const group = findings.filter((f) => f.severity === severity);
  if (!group.length) continue;
  console.log(`--- ${severity.toUpperCase()} (${group.length}) ---`);
  for (const f of group.slice(0, 50)) {
    console.log(`  [${f.file}] ${f.issue}`);
  }
  if (group.length > 50) console.log(`  ... and ${group.length - 50} more`);
  console.log('');
}

process.exit(bySeverity.error > 0 ? 1 : 0);