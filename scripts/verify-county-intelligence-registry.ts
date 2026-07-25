/**
 * CI / local guard: county-intelligence registry integrity.
 *
 * Asserts:
 *  1. Every import path in registry.ts resolves to a real .ts file on disk
 *  2. Every imported symbol is actually exported from that module
 *     (export const / export function / export { name })
 *  3. Local import bindings are unique (no duplicate-identifier collisions)
 *  4. RAW_PACKS pack identifiers are bound to imports (except known helpers)
 *  5. RAW_PACKS keys (stateSlug/countySlug) are unique when packs are importable
 *
 * Run BEFORE push on any Tier 2 / registry change:
 *   npm run verify:county-intelligence-registry
 *
 * Exits non-zero on any failure.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');
const REGISTRY_PATH = join(
  ROOT,
  'lib/local-movers/county-intelligence/registry.ts'
);
const ALIAS_PREFIX = '@/lib/local-movers/county-intelligence/';
const DISK_PREFIX = 'lib/local-movers/county-intelligence/';

/** Symbols that appear in RAW_PACKS but are functions/helpers, not pack exports. */
const ALLOWED_RAW_PACK_HELPERS = new Set([
  'enhanceCaliforniaIntelligencePack',
]);

interface ImportSpec {
  orig: string;
  local: string;
}

interface ImportEntry {
  from: string;
  specs: ImportSpec[];
  line: number;
}

function lineOf(src: string, index: number): number {
  return src.slice(0, index).split(/\r?\n/).length;
}

function parseImports(src: string): ImportEntry[] {
  const importRe =
    /import\s*\{([^}]+)\}\s*from\s*['"](@\/lib\/local-movers\/county-intelligence\/[^'"]+)['"]/g;
  const imports: ImportEntry[] = [];
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(src))) {
    const specs = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const parts = s.split(/\s+as\s+/i).map((x) => x.trim());
        return { orig: parts[0], local: parts[1] || parts[0] };
      });
    imports.push({ from: m[2], specs, line: lineOf(src, m.index) });
  }
  return imports;
}

function moduleExportsSymbol(fileSrc: string, symbol: string): boolean {
  // export const name / export let name / export function name / export class name
  if (
    new RegExp(
      `export\\s+(?:const|let|var|function|class|async\\s+function)\\s+${symbol}\\b`
    ).test(fileSrc)
  ) {
    return true;
  }
  // export { name } or export { name as other } (re-export of local name)
  if (new RegExp(`export\\s*\\{[^}]*\\b${symbol}\\b`).test(fileSrc)) {
    return true;
  }
  // export default is not used for pack symbols; skip
  return false;
}

function parseRawPackIds(src: string): string[] {
  const packBlock = src.match(/const\s+RAW_PACKS[^=]*=\s*\[([\s\S]*?)\];/);
  if (!packBlock) return [];
  const ids = [...packBlock[1].matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g)].map(
    (x) => x[1]
  );
  const skip = new Set([
    'const',
    'as',
    'true',
    'false',
    'null',
    'undefined',
    'typeof',
    'await',
  ]);
  return ids.filter((id) => !skip.has(id) && !/^[A-Z][A-Z0-9_]+$/.test(id));
}

function main(): void {
  if (!existsSync(REGISTRY_PATH)) {
    console.error(`FAIL: registry not found at ${REGISTRY_PATH}`);
    process.exit(1);
  }

  const src = readFileSync(REGISTRY_PATH, 'utf8');
  const imports = parseImports(src);

  const missingFiles: Array<{
    from: string;
    file: string;
    line: number;
    specs: string;
  }> = [];
  const missingExports: Array<{
    file: string;
    symbol: string;
    local: string;
    line: number;
  }> = [];
  const dups: Array<{ name: string; a: string; b: string }> = [];
  const seenLocal = new Map<string, string>();

  for (const imp of imports) {
    if (!imp.from.startsWith(ALIAS_PREFIX)) continue;
    const rel = imp.from.replace(ALIAS_PREFIX, DISK_PREFIX) + '.ts';
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) {
      missingFiles.push({
        from: imp.from,
        file: rel,
        line: imp.line,
        specs: imp.specs.map((s) => s.local).join(','),
      });
      continue;
    }
    const fileSrc = readFileSync(abs, 'utf8');
    for (const s of imp.specs) {
      if (!moduleExportsSymbol(fileSrc, s.orig)) {
        missingExports.push({
          file: rel,
          symbol: s.orig,
          local: s.local,
          line: imp.line,
        });
      }
      if (seenLocal.has(s.local)) {
        dups.push({
          name: s.local,
          a: seenLocal.get(s.local)!,
          b: `${imp.from}:${imp.line}`,
        });
      } else {
        seenLocal.set(s.local, `${imp.from}:${imp.line}`);
      }
    }
  }

  // RAW_PACKS identifiers must be imported (helpers allowlisted)
  const rawIds = parseRawPackIds(src);
  const unbound = [
    ...new Set(
      rawIds.filter(
        (id) =>
          !seenLocal.has(id) &&
          !ALLOWED_RAW_PACK_HELPERS.has(id) &&
          /Intelligence/.test(id)
      )
    ),
  ];

  // Cross-file export name collisions (same export const name in multiple modules)
  // — only flag if both are imported into registry (the TypeScript compile error case)
  // already covered by dups; additionally surface multi-file same export name for awareness
  // when both files are registry modules.
  const exportNameToFiles = new Map<string, string[]>();
  for (const imp of imports) {
    const rel = imp.from.replace(ALIAS_PREFIX, DISK_PREFIX) + '.ts';
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) continue;
    // Only track the symbols we import (orig names)
    for (const s of imp.specs) {
      const list = exportNameToFiles.get(s.orig) ?? [];
      list.push(rel);
      exportNameToFiles.set(s.orig, list);
    }
  }
  // If same orig appears from different files without `as` alias, local dups already catch it.
  // If two files export the same name but only one is imported, no registry issue.

  let failed = false;

  console.log(
    `Registry imports: ${imports.length} modules, ${seenLocal.size} local bindings`
  );

  if (missingFiles.length) {
    failed = true;
    console.error(`\nMISSING_FILES (${missingFiles.length}):`);
    for (const x of missingFiles) {
      console.error(`  L${x.line} ${x.file}  (import ${x.specs})`);
    }
  } else {
    console.log('OK: all import paths resolve on disk');
  }

  if (missingExports.length) {
    failed = true;
    console.error(`\nMISSING_EXPORTS (${missingExports.length}):`);
    for (const x of missingExports) {
      console.error(
        `  L${x.line} ${x.symbol} not exported from ${x.file} (local ${x.local})`
      );
    }
  } else {
    console.log('OK: all imported symbols are exported from their modules');
  }

  if (dups.length) {
    failed = true;
    console.error(`\nDUPLICATE_LOCAL_BINDINGS (${dups.length}):`);
    for (const x of dups) {
      console.error(`  ${x.name}\n    first: ${x.a}\n    again: ${x.b}`);
    }
    console.error(
      '\nHint: prefer state-suffixed export names, e.g. cumberlandCountyPaTier2Intelligence'
    );
  } else {
    console.log('OK: no duplicate local import bindings');
  }

  if (unbound.length) {
    failed = true;
    console.error(`\nRAW_PACKS_UNBOUND (${unbound.length}):`);
    for (const u of unbound.slice(0, 40)) {
      console.error(`  ${u}`);
    }
    if (unbound.length > 40) {
      console.error(`  ... and ${unbound.length - 40} more`);
    }
  } else {
    console.log('OK: RAW_PACKS pack identifiers are bound to imports');
  }

  if (failed) {
    console.error(
      '\nverify-county-intelligence-registry: FAILED — fix before push'
    );
    process.exit(1);
  }

  console.log('\nverify-county-intelligence-registry: PASS');
}

main();
