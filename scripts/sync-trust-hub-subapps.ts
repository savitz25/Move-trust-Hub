/**
 * Phase 2 — Sync lender-trust-hub and insurance-trust-hub into move-trust-hub-temp.
 *
 * Usage (from move-trust-hub-temp root):
 *   npx tsx scripts/sync-trust-hub-subapps.ts
 *   npx tsx scripts/sync-trust-hub-subapps.ts --hub lender
 *   npx tsx scripts/sync-trust-hub-subapps.ts --hub insurance
 *   npx tsx scripts/sync-trust-hub-subapps.ts --dry-run
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const LENDER_SRC = process.env.LENDER_SRC ?? join(ROOT, '..', 'lender-trust-hub');
const INSURANCE_SRC = process.env.INSURANCE_SRC ?? join(ROOT, '..', 'insurance-trust-hub');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const HUB_FILTER = args.includes('--hub')
  ? args[args.indexOf('--hub') + 1]
  : 'both';

type HubId = 'lender' | 'insurance';

const HUB_CONFIG: Record<
  HubId,
  { src: string; prefix: string; skipAppFiles: Set<string> }
> = {
  lender: {
    src: LENDER_SRC,
    prefix: '/lender',
    skipAppFiles: new Set([
      'layout.tsx',
      'page.tsx',
      'not-found.tsx',
      'sitemap.ts',
      'globals.css',
      'favicon.ico',
      'icon.png',
      'apple-icon.png',
    ]),
  },
  insurance: {
    src: INSURANCE_SRC,
    prefix: '/insurance',
    skipAppFiles: new Set([
      'layout.tsx',
      'page.tsx',
      'not-found.tsx',
      'sitemap.ts',
      'globals.css',
      'favicon.ico',
      'icon.png',
      'apple-icon.png',
      'robots.ts',
    ]),
  },
};

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.css',
  '.mjs',
  '.sql',
]);

let filesCopied = 0;
let filesTransformed = 0;

function walkDir(dir: string, cb: (file: string) => void) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkDir(full, cb);
    else cb(full);
  }
}

function shouldTransform(file: string): boolean {
  return TEXT_EXTENSIONS.has(file.slice(file.lastIndexOf('.')));
}

/** Rewrite internal paths for hub prefix. */
function transformContent(content: string, hub: HubId, prefix: string): string {
  let out = content;

  // Import aliases: @/lib → @/lib/{hub}, etc.
  const importRoots = ['lib', 'components', 'data', 'hooks', 'types'] as const;
  for (const root of importRoots) {
    out = out.replace(
      new RegExp(`@/${root}/`, 'g'),
      `@/${root}/${hub}/`
    );
    out = out.replace(
      new RegExp(`from '@/${root}'`, 'g'),
      `from '@/${root}/${hub}'`
    );
  }

  // href="/path" → href="/lender/path" (not //, not http, not already prefixed)
  out = out.replace(
    /href=(["'])\/(?!\/|lender\/|insurance\/|http)([^"']*)\1/g,
    `href=$1${prefix}/$2$1`
  );
  out = out.replace(
    /href=\{`\/(?!\/|lender\/|insurance\/)([^`}]*)`\}/g,
    `href={\`${prefix}/$1\`}`
  );

  // router.push/replace('/...')
  out = out.replace(
    /router\.(push|replace)\((['"])\/(?!\/|lender\/|insurance\/)/g,
    `router.$1($2${prefix}/`
  );

  // fetch('/api/...') and action="/api/..."
  out = out.replace(
    /fetch\((['"])\/api\//g,
    `fetch($1${prefix}/api/`
  );
  out = out.replace(
    /action=(["'])\/api\//g,
    `action=$1${prefix}/api/`
  );

  // Canonical / site URLs in constants (standalone domain → subdirectory)
  if (hub === 'lender') {
    out = out.replace(/https:\/\/www\.lendertrusthub\.com/g, 'https://www.movetrusthub.com/lender');
    out = out.replace(/https:\/\/lendertrusthub\.com/g, 'https://www.movetrusthub.com/lender');
  } else {
    out = out.replace(/https:\/\/www\.insurancetrusthub\.com/g, 'https://www.movetrusthub.com/insurance');
    out = out.replace(/https:\/\/insurancetrusthub\.com/g, 'https://www.movetrusthub.com/insurance');
  }

  // Strip standalone Navbar/Footer imports (HubShell handles chrome)
  out = out.replace(
    /^import.*from ['"]@\/components\/(?:lender|insurance)\/(?:Navbar|Footer|navbar|footer)['"];?\r?\n/gm,
    ''
  );

  return out;
}

function copyWithTransform(
  srcFile: string,
  destFile: string,
  hub: HubId,
  prefix: string
) {
  const destDir = destFile.slice(0, destFile.lastIndexOf('\\') > destFile.lastIndexOf('/')
    ? Math.max(destFile.lastIndexOf('\\'), destFile.lastIndexOf('/'))
    : destFile.lastIndexOf('/'));
  if (!DRY_RUN) mkdirSync(destDir, { recursive: true });

  if (shouldTransform(srcFile)) {
    const raw = readFileSync(srcFile, 'utf8');
    const transformed = transformContent(raw, hub, prefix);
    if (!DRY_RUN) writeFileSync(destFile, transformed, 'utf8');
    if (raw !== transformed) filesTransformed++;
  } else if (!DRY_RUN) {
    cpSync(srcFile, destFile);
  }
  filesCopied++;
}

function syncAppRoutes(hub: HubId) {
  const { src, prefix, skipAppFiles } = HUB_CONFIG[hub];
  const appSrc = join(src, 'app');
  const appDest = join(ROOT, 'app', hub);

  if (!existsSync(appSrc)) {
    console.warn(`Missing app dir: ${appSrc}`);
    return;
  }

  walkDir(appSrc, (file) => {
    const rel = relative(appSrc, file).replace(/\\/g, '/');
    const base = rel.split('/').pop() ?? '';
    if (skipAppFiles.has(base) && !rel.includes('/')) return;
    if (skipAppFiles.has(base) && rel.split('/').length === 1) return;

    const dest = join(appDest, rel);
    copyWithTransform(file, dest, hub, prefix);
  });

  console.log(`  app/${hub}/ routes synced from ${appSrc}`);
}

function syncFolder(hub: HubId, folder: string) {
  const { src, prefix } = HUB_CONFIG[hub];
  const folderSrc = join(src, folder);
  const folderDest = join(ROOT, folder, hub);

  if (!existsSync(folderSrc)) {
    console.warn(`Skip missing: ${folderSrc}`);
    return;
  }

  walkDir(folderSrc, (file) => {
    const rel = relative(folderSrc, file);
    const dest = join(folderDest, rel);
    copyWithTransform(file, dest, hub, prefix);
  });

  console.log(`  ${folder}/${hub}/ synced`);
}

function syncPublicBrand(hub: HubId) {
  const { src } = HUB_CONFIG[hub];
  const brandSrc = join(src, 'public', 'brand');
  const brandDest = join(ROOT, 'public', hub, 'brand');
  if (!existsSync(brandSrc)) return;
  if (!DRY_RUN) {
    mkdirSync(brandDest, { recursive: true });
    cpSync(brandSrc, brandDest, { recursive: true });
  }
  console.log(`  public/${hub}/brand/ synced`);
}

function syncHub(hub: HubId) {
  console.log(`\n=== Syncing ${hub} ===`);
  syncAppRoutes(hub);
  for (const folder of ['lib', 'components', 'hooks', 'types']) {
    syncFolder(hub, folder);
  }
  if (hub === 'lender') syncFolder(hub, 'data');
  syncPublicBrand(hub);
}

function main() {
  console.log('Trust Hub Phase 2 sync');
  console.log(`Root: ${ROOT}`);
  console.log(`Lender src: ${LENDER_SRC}`);
  console.log(`Insurance src: ${INSURANCE_SRC}`);
  if (DRY_RUN) console.log('DRY RUN — no files written');

  if (HUB_FILTER === 'both' || HUB_FILTER === 'lender') syncHub('lender');
  if (HUB_FILTER === 'both' || HUB_FILTER === 'insurance') syncHub('insurance');

  console.log(`\nDone: ${filesCopied} files, ${filesTransformed} transformed`);
  console.log('\nNext steps:');
  console.log('  1. npm install (add missing deps from sibling package.json)');
  console.log('  2. Update tsconfig paths if needed');
  console.log('  3. Expand app/lender/sitemap.ts and app/insurance/sitemap.ts');
  console.log('  4. npm run build');
}

main();