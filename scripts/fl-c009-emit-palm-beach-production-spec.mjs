/**
 * FL-C009 — emit/hash Palm Beach production integration spec package (design-only).
 * No production writes. No Google Places APIs.
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve('data/county-regulatory/fl/architecture/c009');
const DOCS = resolve('docs/county-regulatory/architecture/palm-beach-v1');
const META = join(ROOT, 'meta');
const SUMMARY = join(ROOT, 'fl-c009-summary.json');

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}
function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
}

if (!existsSync(SUMMARY)) {
  console.error('missing', SUMMARY);
  process.exit(1);
}

mkdirSync(META, { recursive: true });

const summary = readJson(SUMMARY);
const jsonFiles = readdirSync(ROOT)
  .filter((f) => f.endsWith('.json'))
  .sort();
const docFiles = existsSync(DOCS)
  ? readdirSync(DOCS)
      .filter((f) => f.endsWith('.md'))
      .sort()
  : [];

const hashParts = [];
for (const f of jsonFiles) {
  if (f === 'florida-im-company-crosswalk-current.json') continue;
  hashParts.push(sha256(readFileSync(join(ROOT, f))));
}
for (const f of docFiles) {
  hashParts.push(sha256(readFileSync(join(DOCS, f))));
}
const cohort = join(ROOT, 'cohort', 'pbc-production-integration-cohort-v1.json');
if (existsSync(cohort)) hashParts.push(sha256(readFileSync(cohort)));

summary.package_hash = sha256(hashParts.join('|')).slice(0, 16);
summary.emitted_at = new Date().toISOString();
summary.json_files_count = jsonFiles.length;
summary.doc_files_count = docFiles.length;
summary.design_only = true;
summary.production_db_migrations = 0;
summary.production_writes = false;
summary.google_places_api_requests = 0;
summary.consumer_pii_committed = 0;
summary.cohort_sha256 = existsSync(cohort) ? sha256(readFileSync(cohort)) : null;

writeFileSync(SUMMARY, JSON.stringify(summary, null, 2));

writeFileSync(
  join(META, 'raw-provenance.json'),
  JSON.stringify(
    {
      task: 'FL-C009',
      note: 'Design-only specification package; no new county raw acquisitions. Uses C002/C003 qualified Palm Beach artifacts + current read-only Florida IM crosswalk snapshot.',
      google_places_api_requests: 0,
      production_writes: false,
      production_db_migrations: 0,
      consumer_pii_committed: 0,
      files: [
        ...docFiles.map((f) => ({
          path: `docs/county-regulatory/architecture/palm-beach-v1/${f}`,
          kind: 'design_doc',
          modified: false,
        })),
        {
          path: 'data/county-regulatory/fl/architecture/c009/cohort/pbc-production-integration-cohort-v1.json',
          kind: 'cohort_manifest',
          sha256: existsSync(cohort) ? sha256(readFileSync(cohort)) : null,
          modified: false,
        },
      ],
    },
    null,
    2
  )
);

if (!existsSync(join(META, 'stack-vs-main-note.json'))) {
  writeFileSync(
    join(META, 'stack-vs-main-note.json'),
    JSON.stringify(
      {
        task: 'FL-C009',
        county_stack_preserved: true,
        rebase_performed: false,
        merge_performed: false,
        origin_main_at_task_start: 'ab93c84195f3b36c7e2bbd70495a0ee1432d8140',
        c008_head: '13f409cc17e6c18e27388773848fc995c518cd27',
        SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: 'NO',
        note: 'Builder 1 advanced main (FL-010r). County stack not rebased. Design-only Palm Beach production integration spec.',
      },
      null,
      2
    )
  );
}

console.log(
  JSON.stringify(
    {
      ok: true,
      task: 'FL-C009',
      package_hash: summary.package_hash,
      PRODUCTION_LINK_READY: summary.production_link_ready,
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: summary.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW,
      recommended_fl_c010: summary.recommended_fl_c010,
      json_files: jsonFiles.length,
      docs: docFiles.length,
      production_writes: false,
      google_places_api_requests: 0,
    },
    null,
    2
  )
);
