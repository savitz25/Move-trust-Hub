/**
 * Site-wide internal link migration for Trust Hub subdirectory architecture.
 *
 * Rewrites bare /insurance and /lender paths to canonical /insurance/* and /lender/*
 * while preserving Move hub root paths (/companies, /resources/guides, /compare, etc.).
 *
 * Usage:
 *   npm run fix:all-hub-links              # apply fixes
 *   npm run fix:all-hub-links -- --dry-run # preview only
 *   npm run fix:all-hub-links -- --report  # list remaining bare hub paths
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import {
  inferHubContext,
  isMigratableHubPath,
  resolveCanonicalHubPath,
} from '../lib/migration/hub-link-rules';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const REPORT_ONLY = args.includes('--report');

const SCAN_DIRS = ['app', 'components', 'lib'] as const;
const TEXT = /\.(tsx?|jsx?)$/;
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
const SKIP_FILES = new Set([
  'lib/migration/hub-link-rules.ts',
  'lib/migration/hub-redirects.ts',
  'lib/insurance/paths.ts',
  'lib/hub/paths.ts',
]);

type Replacement = { from: string; to: string; line?: number };

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (TEXT.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function transformPath(path: string, context: ReturnType<typeof inferHubContext>): string {
  return resolveCanonicalHubPath(path, context);
}

function applyPatternReplacements(
  content: string,
  context: ReturnType<typeof inferHubContext>,
  log: Replacement[]
): string {
  let out = content;

  const replacePath = (path: string) => {
    const next = transformPath(path, context);
    if (next !== path) log.push({ from: path, to: next });
    return next;
  };

  // href="/path" | href='/path'
  out = out.replace(/href=(["'])(\/[^"']*)\1/g, (_, quote, path) => {
    return `href=${quote}${replacePath(path)}${quote}`;
  });

  // href: '/path' (object literals)
  out = out.replace(/href:\s*(["'])(\/[^"']*)\1/g, (_, quote, path) => {
    return `href: ${quote}${replacePath(path)}${quote}`;
  });

  // href={`/path`} and href={`/path${var}`}
  out = out.replace(/href=\{`(\/[^`]*?)`\}/g, (_, path) => {
    if (path.includes('${')) {
      const base = path.split('${')[0];
      const rest = path.slice(base.length);
      return `href={\`${replacePath(base)}${rest}\`}`;
    }
    return `href={\`${replacePath(path)}\`}`;
  });

  // path: '/path' (metadata)
  out = out.replace(/path:\s*(["'])(\/[^"']*)\1/g, (_, quote, path) => {
    return `path: ${quote}${replacePath(path)}${quote}`;
  });

  // router.push('/path')
  out = out.replace(
    /router\.(push|replace)\((["'])(\/[^"']*)\2/g,
    (_, method, quote, path) => `router.${method}(${quote}${replacePath(path)}${quote}`
  );

  // canonical: 'https://www.movetrusthub.com/path'
  out = out.replace(
    /(canonical:\s*['"]https:\/\/www\.movetrusthub\.com)(\/[^'"]*)(['"])/g,
    (_, prefix, path, suffix) => `${prefix}${replacePath(path)}${suffix}`
  );

  return out;
}

function scanForRemaining(content: string, relPath: string): { path: string; context: string }[] {
  const context = inferHubContext(relPath);
  const found: { path: string; context: string }[] = [];
  const patterns = [
    /href=(["'])(\/[^"']*)\1/g,
    /href:\s*(["'])(\/[^"']*)\1/g,
    /path:\s*(["'])(\/[^"']*)\1/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      const p = match[2];
      if (isMigratableHubPath(p, context)) {
        found.push({ path: p, context });
      }
    }
  }

  return found;
}

function main() {
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    const full = join(ROOT, dir);
    try {
      allFiles.push(...walk(full));
    } catch {
      console.warn(`Skip missing dir: ${dir}`);
    }
  }

  let changedFiles = 0;
  let totalReplacements = 0;
  const remaining: { file: string; paths: { path: string; context: string }[] }[] = [];

  for (const file of allFiles) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    if (SKIP_FILES.has(rel)) continue;

    const raw = readFileSync(file, 'utf8');
    const context = inferHubContext(rel);
    const replacements: Replacement[] = [];
    const next = applyPatternReplacements(raw, context, replacements);

    const leftover = scanForRemaining(next, rel);
    if (leftover.length) {
      remaining.push({ file: rel, paths: leftover });
    }

    if (replacements.length === 0) continue;

    totalReplacements += replacements.length;
    if (!DRY_RUN && !REPORT_ONLY) {
      writeFileSync(file, next, 'utf8');
    }
    changedFiles++;

    if (DRY_RUN || process.env.VERBOSE) {
      console.log(`\n${rel} (${replacements.length} changes)`);
      for (const r of replacements.slice(0, 8)) {
        console.log(`  ${r.from} → ${r.to}`);
      }
      if (replacements.length > 8) console.log(`  … +${replacements.length - 8} more`);
    }
  }

  console.log('\n=== fix-all-hub-links ===');
  console.log(`Mode: ${REPORT_ONLY ? 'report' : DRY_RUN ? 'dry-run' : 'apply'}`);
  console.log(`Files scanned: ${allFiles.length}`);
  console.log(`Files ${DRY_RUN || REPORT_ONLY ? 'with changes' : 'updated'}: ${changedFiles}`);
  console.log(`Replacements: ${totalReplacements}`);

  if (remaining.length) {
    console.log(`\nRemaining migratable paths in ${remaining.length} file(s):`);
    for (const entry of remaining.slice(0, 25)) {
      const unique = [...new Map(entry.paths.map((p) => [p.path, p])).values()];
      console.log(`  ${entry.file}`);
      for (const p of unique.slice(0, 5)) {
        console.log(`    ${p.path} → ${resolveCanonicalHubPath(p.path, inferHubContext(entry.file))}`);
      }
    }
    if (remaining.length > 25) console.log(`  … +${remaining.length - 25} more files`);
  } else {
    console.log('\nNo remaining bare hub paths detected.');
  }

  if (DRY_RUN) {
    console.log('\nRe-run without --dry-run to apply.');
  }
}

main();