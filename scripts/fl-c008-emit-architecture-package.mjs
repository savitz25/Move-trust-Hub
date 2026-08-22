/**
 * FL-C008 — emit/validate architecture package presence and summary hash.
 * Design-only. No DB writes. No Google Places APIs.
 */
import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve('data/county-regulatory/fl/architecture/c008');
const META = resolve('data/county-regulatory/fl/architecture/meta');
const DOCS = resolve('docs/county-regulatory/architecture');

const requiredJson = [
  'four-pilot-summary.json',
  'county-regulatory-posture-model.json',
  'capability-matrix.json',
  'concept-catalog.json',
  'production-schema-reuse-audit.json',
  'evidence-lifecycle.json',
  'adapter-contract.json',
  'stack-manifest.json',
  'stack-integration-options.json',
  'state-track-coordination.json',
  'first-production-pilot.json',
  'first-production-feature-sequence.json',
  'national-portability.json',
  'network-reuse.json',
  'fl-c008-summary.json',
  'recommended-fl-c009.json',
];

const requiredDocs = [
  'COUNTY_REGULATORY_ARCHITECTURE_V1.md',
  'stack-integration-runbook.md',
  'future-county-onboarding-playbook.md',
  'schema-sketch.md',
];

const requiredMeta = ['stack-vs-main-note.json', 'raw-provenance.json'];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

for (const f of requiredJson) {
  const p = resolve(ROOT, f);
  if (!existsSync(p)) throw new Error(`missing ${f}`);
}
for (const f of requiredDocs) {
  const p = resolve(DOCS, f);
  if (!existsSync(p)) throw new Error(`missing doc ${f}`);
}
for (const f of requiredMeta) {
  const p = resolve(META, f);
  if (!existsSync(p)) throw new Error(`missing meta ${f}`);
}

const hashInput = {};
for (const f of requiredJson) {
  if (f === 'fl-c008-summary.json') continue;
  hashInput[f] = readJson(resolve(ROOT, f));
}
for (const f of requiredDocs) {
  hashInput[`doc:${f}`] = readFileSync(resolve(DOCS, f), 'utf8');
}
for (const f of requiredMeta) {
  hashInput[`meta:${f}`] = readJson(resolve(META, f));
}

const packageHash = createHash('sha256')
  .update(JSON.stringify(hashInput))
  .digest('hex')
  .slice(0, 16);

const summaryPath = resolve(ROOT, 'fl-c008-summary.json');
const summary = readJson(summaryPath);
summary.package_hash = packageHash;
summary.emitted_at = new Date().toISOString();
writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n');

console.log(
  JSON.stringify(
    {
      ok: true,
      task: 'FL-C008',
      package_hash: packageHash,
      json_files: requiredJson.length,
      docs: requiredDocs.length,
      production_writes: false,
      google_places_api_requests: 0,
    },
    null,
    2
  )
);
