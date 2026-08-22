/**
 * FL-C011 — apply STRATEGY_3 selective transplant into current working tree.
 * Expectation: run from task-fl-c011 branch cut from origin/main.
 * Source package: C010 head checkout (SOURCE_ROOT env or sibling path).
 */
import { createHash } from 'crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { dirname, join, resolve, sep } from 'path';

const DEST = resolve('.');
const SOURCE =
  process.env.C011_SOURCE_ROOT ||
  resolve('C:/Users/makei/move-trust-hub-fl-county');

const sha256File = (p) =>
  createHash('sha256').update(readFileSync(p)).digest('hex');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));

const allow = readJson(
  join(SOURCE, 'data/county-regulatory/fl/architecture/c010/transplant-allowlist.json')
);

const REVIEW_TO_INCLUDE = [
  'data/county-regulatory/fl/miami-dade/evidence/florida-im-company-crosswalk.json',
  'data/county-regulatory/fl/palm-beach/evidence/florida-im-company-crosswalk.json',
];
const REVIEW_TO_EXCLUDE = [
  {
    path: 'data/county-regulatory/fl/miami-dade/raw/gis-mdc-opendata-arcgis-com-api-v3-datasets-q-business-20tax-page-5Bsi.json',
    reason: 'Large GIS open-data discovery dump; not validator-critical; archive on research stack',
  },
  {
    path: 'data/county-regulatory/fl/miami-dade/raw/gis-mdc-opendata-arcgis-com-api-v3-datasets-q-local-20business-20tax-f.json',
    reason: 'Large GIS open-data discovery dump; not validator-critical; archive on research stack',
  },
  {
    path: 'data/county-regulatory/fl/miami-dade/raw/instructions-self-service-portal.pdf',
    reason: 'Large instructional PDF; not validator-critical; archive on research stack',
  },
  {
    path: 'data/county-regulatory/fl/palm-beach/raw/MovingCo_Application.pdf',
    reason: 'Large application PDF; provenance metadata retained; binary archive on research stack',
  },
];

const EXTRA_C011_FROM_SOURCE = [
  // ensure latest C010/C011 tooling present even if inventory lagged
  'scripts/fl-c010-build-integration-gate.mjs',
  'scripts/fl-c010-complete-remaining-audits.mjs',
  'scripts/validate-fl-c010-integration-gate.mjs',
  'scripts/validate-fl-c010-county-stack-integration-gate.mjs',
];

function classifyPath(p) {
  if (p.startsWith('scripts/')) return 'scripts';
  if (p.startsWith('docs/')) return 'docs';
  if (/\/raw\//.test(p)) return 'raw';
  if (/\/normalized\//.test(p)) return 'normalized';
  if (/\/qualified\//.test(p)) return 'qualified';
  if (/\/architecture\//.test(p)) return 'architecture';
  if (p.includes('regulatory-source-catalog')) return 'catalog';
  return 'other';
}

const paths = new Set([...allow.include, ...REVIEW_TO_INCLUDE, ...EXTRA_C011_FROM_SOURCE]);
const entries = [];
const missing = [];
const errors = [];

for (const pathRel of [...paths].sort()) {
  const src = join(SOURCE, pathRel);
  if (!existsSync(src)) {
    missing.push(pathRel);
    continue;
  }
  const st = statSync(src);
  if (!st.isFile()) continue;
  const dest = join(DEST, pathRel);
  mkdirSync(dirname(dest), { recursive: true });
  try {
    copyFileSync(src, dest);
    const hash = sha256File(dest);
    entries.push({
      source_path: pathRel,
      destination_path: pathRel,
      source_sha256: hash,
      size: st.size,
      class: classifyPath(pathRel),
      pii_class: 'NONE_HEURISTIC',
      purpose: REVIEW_TO_INCLUDE.includes(pathRel)
        ? 'REVIEW→INCLUDE validator/script dependency'
        : 'INCLUDE durable county research artifact',
    });
  } catch (e) {
    errors.push({ path: pathRel, error: String(e) });
  }
}

const packageHash = createHash('sha256');
for (const e of entries) {
  packageHash.update(`${e.destination_path}\0${e.source_sha256}\n`);
}

const reviewDecisions = {
  task: 'FL-C011',
  unresolved_review: 0,
  include: REVIEW_TO_INCLUDE.map((p) => ({
    path: p,
    decision: 'INCLUDE',
    reason: 'Required for validator and/or qualification script reproducibility',
  })),
  exclude: REVIEW_TO_EXCLUDE,
};

const outDir = resolve('data/county-regulatory/fl/architecture/c011');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'review-file-decisions.json'), JSON.stringify(reviewDecisions, null, 2) + '\n');

const manifest = {
  manifest_id: 'FL_COUNTY_RESEARCH_V1_FINAL_INTEGRATION_MANIFEST',
  task: 'FL-C011',
  strategy: 'STRATEGY_3_SELECTIVE_TRANSPLANT',
  retrieved_at: new Date().toISOString(),
  source_c010_head: '027382d75990f13e39093ef3a0cb479165be49f1',
  source_freeze_sha: '1256170855439413242acadf68e659e53f4aabc3',
  source_root: SOURCE,
  target_main_base: null,
  include_from_c010_allowlist: allow.include_count,
  review_resolved_to_include: REVIEW_TO_INCLUDE.length,
  review_resolved_to_exclude: REVIEW_TO_EXCLUDE.length,
  unresolved_review: 0,
  extra_tooling_paths: EXTRA_C011_FROM_SOURCE,
  total_files: entries.length,
  total_size_bytes: entries.reduce((a, e) => a + e.size, 0),
  package_hash: packageHash.digest('hex'),
  c010_transplant_manifest_hash_known: 'b975dc344f7d31aebb085f3a6c698001',
  files: entries,
  excluded_review_paths: REVIEW_TO_EXCLUDE,
  missing,
  errors,
  expected_runtime_delta: 0,
  expected_db_delta: 0,
  consumer_pii_included: 0,
  google_places_api_requests: 0,
  production_migrations: 0,
  package_json_changed: false,
};

writeFileSync(
  join(outDir, 'final-integration-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
);

console.log(
  JSON.stringify(
    {
      ok: errors.length === 0 && missing.length === 0,
      copied: entries.length,
      size: manifest.total_size_bytes,
      package_hash: manifest.package_hash.slice(0, 32),
      missing: missing.length,
      errors: errors.length,
      review_include: REVIEW_TO_INCLUDE.length,
      review_exclude: REVIEW_TO_EXCLUDE.length,
    },
    null,
    2
  )
);
