/**
 * Post-sync: prefix remaining internal links in hub-scoped folders.
 *   npx tsx scripts/prefix-hub-links.ts
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const TEXT = /\.(tsx?|jsx?|md)$/;

const TARGETS: { dir: string; prefix: string }[] = [
  { dir: 'app/lender', prefix: '/lender' },
  { dir: 'app/insurance', prefix: '/insurance' },
  { dir: 'components/lender', prefix: '/lender' },
  { dir: 'components/insurance', prefix: '/insurance' },
  { dir: 'lib/lender', prefix: '/lender' },
  { dir: 'lib/insurance', prefix: '/insurance' },
];

function walk(dir: string, files: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (TEXT.test(p)) files.push(p);
  }
  return files;
}

function prefixPath(path: string, hubPrefix: string): string {
  if (!path.startsWith('/')) return path;
  if (path.startsWith('//') || path.startsWith('/http')) return path;
  if (path.startsWith(hubPrefix + '/') || path === hubPrefix) return path;
  if (path.startsWith('/lender/') || path.startsWith('/insurance/')) return path;
  return `${hubPrefix}${path}`;
}

function transform(content: string, hubPrefix: string): string {
  let out = content;

  // href="/foo" and href='/foo'
  out = out.replace(/href=(["'])(\/[^"']*)\1/g, (_, q, p) => {
    return `href=${q}${prefixPath(p, hubPrefix)}${q}`;
  });

  // href={`/foo${var}`} and href={`/foo`}
  out = out.replace(/href=\{`(\/[^`]*?)`\}/g, (_, p) => {
    if (p.includes('${')) {
      const base = p.split('${')[0];
      const rest = p.slice(base.length);
      return `href={\`${prefixPath(base, hubPrefix)}${rest}\`}`;
    }
    return `href={\`${prefixPath(p, hubPrefix)}\`}`;
  });

  // path: '/foo' in metadata objects
  out = out.replace(/path:\s*(["'])(\/[^"']*)\1/g, (_, q, p) => {
    return `path: ${q}${prefixPath(p, hubPrefix)}${q}`;
  });

  // router.push('/foo')
  out = out.replace(
    /router\.(push|replace)\((["'])(\/[^"']*)\2/g,
    (_, method, q, p) => `router.${method}(${q}${prefixPath(p, hubPrefix)}${q}`
  );

  return out;
}

let changed = 0;
for (const { dir, prefix } of TARGETS) {
  const full = join(ROOT, dir);
  try {
    for (const file of walk(full)) {
      const raw = readFileSync(file, 'utf8');
      const next = transform(raw, prefix);
      if (next !== raw) {
        writeFileSync(file, next, 'utf8');
        changed++;
      }
    }
  } catch {
    console.warn(`Skip ${dir}`);
  }
}
console.log(`prefix-hub-links: ${changed} files updated`);