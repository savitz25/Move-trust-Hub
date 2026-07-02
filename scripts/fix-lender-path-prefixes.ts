/**
 * One-shot repair for lender hrefs missing the /lender prefix after hub migration.
 * Safe to re-run — skips paths already prefixed.
 *
 * Usage: npm run fix:lender-paths
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const TEXT = /\.(tsx?|jsx?)$/;
const TARGETS = ['app/lender', 'components/lender', 'lib/lender'] as const;

const ROUTE_ROOTS = [
  '/local-lenders',
  '/fdic-insured-banks',
  '/auto-loan-companies',
  '/calculators',
  '/lenders',
  '/about',
  '/contact',
  '/compare',
  '/credit-repair',
  '/mca-companies',
];

function walk(dir: string, files: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (TEXT.test(p)) files.push(p);
  }
  return files;
}

function prefixPath(path: string): string {
  if (!path.startsWith('/')) return path;
  if (path.startsWith('/lender')) return path;
  if (path === '/') return '/lender';
  for (const root of ROUTE_ROOTS) {
    if (path === root || path.startsWith(`${root}/`) || path.startsWith(`${root}#`)) {
      return `/lender${path}`;
    }
  }
  return path;
}

function transform(content: string): string {
  let out = content;

  out = out.replace(/href=(["'])(\/[^"']*)\1/g, (_, q, p) => `href=${q}${prefixPath(p)}${q}`);

  out = out.replace(/href=\{`(\/[^`]*?)`\}/g, (_, p) => {
    if (p.includes('${')) {
      const base = p.split('${')[0];
      const rest = p.slice(base.length);
      return `href={\`${prefixPath(base)}${rest}\`}`;
    }
    return `href={\`${prefixPath(p)}\`}`;
  });

  out = out.replace(
    /router\.(push|replace)\((["'])(\/[^"']*)\2/g,
    (_, method, q, p) => `router.${method}(${q}${prefixPath(p)}${q}`
  );

  return out;
}

let changed = 0;
for (const dir of TARGETS) {
  const full = join(ROOT, dir);
  try {
    for (const file of walk(full)) {
      if (file.endsWith('paths.ts')) continue;
      const raw = readFileSync(file, 'utf8');
      const next = transform(raw);
      if (next !== raw) {
        writeFileSync(file, next, 'utf8');
        changed++;
      }
    }
  } catch {
    // directory may not exist
  }
}

console.log(`fix-lender-path-prefixes: updated ${changed} file(s)`);