/**
 * One-shot repair for insurance hrefs missing the /insurance prefix after hub migration.
 * Safe to re-run — skips paths already prefixed.
 *
 * Usage: npm run fix:insurance-paths
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const TEXT = /\.(tsx?|jsx?)$/;
const TARGETS = ['app/insurance', 'components/insurance', 'components/hub', 'lib/insurance'] as const;

const ROUTE_ROOTS = [
  '/resources',
  '/destinations',
  '/directory',
  '/hubs',
  '/calculators',
  '/providers',
  '/tools',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
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
  if (path.startsWith('/insurance')) return path;
  if (path.startsWith('/lender') || path.startsWith('/http')) return path;
  if (path === '/') return '/insurance';
  for (const root of ROUTE_ROOTS) {
    if (path === root || path.startsWith(`${root}/`) || path.startsWith(`${root}?`) || path.startsWith(`${root}#`)) {
      return `/insurance${path}`;
    }
  }
  return path;
}

function replaceHref(content: string, replacer: (path: string) => string): string {
  return content
    .replace(/href=(["'])(\/[^"']*)\1/g, (_, q, p) => `href=${q}${replacer(p)}${q}`)
    .replace(/href:\s*(["'])(\/[^"']*)\1/g, (_, q, p) => `href: ${q}${replacer(p)}${q}`);
}

function transform(content: string): string {
  let out = content;

  out = replaceHref(out, prefixPath);

  out = out.replace(/href=\{`(\/[^`]*?)`\}/g, (_, p) => {
    if (p.includes('${')) {
      const base = p.split('${')[0];
      const rest = p.slice(base.length);
      return `href={\`${prefixPath(base)}${rest}\`}`;
    }
    return `href={\`${prefixPath(p)}\`}`;
  });

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
        console.log(`  updated ${file.replace(ROOT + '\\', '')}`);
      }
    }
  } catch {
    // directory may not exist
  }
}

console.log(`fix-insurance-path-prefixes: updated ${changed} file(s)`);