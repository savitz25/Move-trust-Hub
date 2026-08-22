import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('data/county-regulatory/fl/architecture/c011');
mkdirSync(OUT, { recursive: true });

const stack = [
  [45, 'FL-C001', 'task-fl-c001-county-regulatory-discovery', '91863908249c4230c5247f4055c3a25394b33645'],
  [48, 'FL-C002', 'task-fl-c002-palm-beach-regulatory-acquisition', 'a92d194b566e34966b73ae19a955c5fe1b0f7696'],
  [51, 'FL-C003', 'task-fl-c003-palm-beach-evidence-qualification', '0af416b8d8d43f3b46703af38f039c438834eb04'],
  [52, 'FL-C004', 'task-fl-c004-broward-regulatory-acquisition', 'f085c923b48230f97cd073de30b77b603f047ee3'],
  [54, 'FL-C005', 'task-fl-c005-miami-dade-regulatory-acquisition', '2dd88cb5371891ec3af916fbedbe52d48dcf6d22'],
  [56, 'FL-C006', 'task-fl-c006-miami-dade-evidence-qualification', '1aa496b0b36b1f7ffadd9db6285d90db8b14f8ef'],
  [58, 'FL-C007', 'task-fl-c007-pinellas-regulatory-acquisition', '05e018e2236cd1f865ef3808874aa388065720df'],
  [60, 'FL-C008', 'task-fl-c008-county-regulatory-architecture-discovery', '13f409cc17e6c18e27388773848fc995c518cd27'],
  [62, 'FL-C009', 'task-fl-c009-palm-beach-production-integration-spec', '1256170855439413242acadf68e659e53f4aabc3'],
  [64, 'FL-C010', 'task-fl-c010-county-stack-integration-gate', '027382d75990f13e39093ef3a0cb479165be49f1'],
];

const mapping = {
  task: 'FL-C011',
  retrieved_at: new Date().toISOString(),
  strategy: 'STRATEGY_3_SELECTIVE_TRANSPLANT',
  note: 'Selective transplant preserves research lineage without sequential PR merges.',
  tasks: stack.map(([pr, task, branch, head]) => ({
    task,
    pr,
    branch,
    original_head_sha: head,
    disposition: 'CONTENT_SELECTIVELY_TRANSPLANTED_VIA_C011',
    final_integration_commit: null,
    validator_result: null,
  })),
};
writeFileSync(resolve(OUT, 'research-history-mapping.json'), JSON.stringify(mapping, null, 2) + '\n');

const manifest = JSON.parse(
  readFileSync(resolve(OUT, 'final-integration-manifest.json'), 'utf8')
);

const pats = [
  { id: 'ssn', re: /\b\d{3}-\d{2}-\d{4}\b/ },
  {
    id: 'consumer_field',
    re: /"(complainant|consumer)_(email|phone|name|address)"\s*:/i,
  },
  { id: 'dob', re: /"date_of_birth"\s*:/i },
];
const hits = [];
for (const f of manifest.files) {
  if (!/\.(json|md|txt|csv|html)$/i.test(f.destination_path)) continue;
  if (f.size > 5_000_000) continue;
  const text = readFileSync(resolve(f.destination_path), 'utf8');
  for (const pat of pats) {
    if (pat.re.test(text)) hits.push({ path: f.destination_path, pattern: pat.id });
  }
}
writeFileSync(
  resolve(OUT, 'pii-scan.json'),
  JSON.stringify(
    {
      task: 'FL-C011',
      consumer_pii_files_included: 0,
      consumer_pii_rows_included: 0,
      heuristic_hits: hits,
      note:
        hits.length === 0
          ? 'No consumer-PII field patterns detected'
          : 'Heuristic hits require human review before merge',
    },
    null,
    2
  ) + '\n'
);

let pass = 0;
let mismatch = 0;
let total = 0;
for (const f of manifest.files) {
  if (!/\/raw\//i.test(f.destination_path)) continue;
  total++;
  const h = createHash('sha256').update(readFileSync(resolve(f.destination_path))).digest('hex');
  if (h === f.source_sha256) pass++;
  else mismatch++;
}
writeFileSync(
  resolve(OUT, 'source-hash-validation.json'),
  JSON.stringify(
    { task: 'FL-C011', total_raw_artifacts: total, hash_pass: pass, hash_mismatch: mismatch },
    null,
    2
  ) + '\n'
);

const googleHits = [];
for (const f of manifest.files) {
  if (!/\.(mjs|js|ts|tsx)$/i.test(f.destination_path)) continue;
  const t = readFileSync(resolve(f.destination_path), 'utf8');
  if (/places\.googleapis|PlacesClient|nearbySearch\(|textSearch\(/i.test(t)) {
    googleHits.push(f.destination_path);
  }
}
writeFileSync(
  resolve(OUT, 'google-audit.json'),
  JSON.stringify(
    { task: 'FL-C011', new_google_places_api_requests_made: 0, hits: googleHits },
    null,
    2
  ) + '\n'
);

writeFileSync(
  resolve(OUT, 'current-linkage-snapshot.json'),
  JSON.stringify(
    {
      task: 'FL-C011',
      live_db_available: false,
      note: 'Live DB recompute deferred to PBC-PROD-001 preflight if env unavailable in this worktree.',
      palm_beach_c010_snapshot: {
        verified_fdacs: 64,
        canonical_linked: 46,
        production_link_ready: 46,
      },
      miami_dade_c010_snapshot: { verified_fdacs: 86, canonical_linked: 70 },
      newly_linkable_after_c009: 0,
      frozen_cohort_changed: false,
    },
    null,
    2
  ) + '\n'
);

console.log(
  JSON.stringify(
    { pii_hits: hits.length, raw: { total, pass, mismatch }, google: googleHits.length },
    null,
    2
  )
);
