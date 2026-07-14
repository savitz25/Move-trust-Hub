/**
 * Audit county metadata builders against rendered output expectations (not source grep only).
 * Run: npx tsx scripts/audit-rendered-metadata.ts
 */
import { writeFileSync } from 'node:fs';
import { getCounty } from '../lib/local-movers/geography/index';
import { buildCountyPageMetadata } from '../lib/local-movers/seo-metadata';
import { getMoversForCounty } from '../lib/local-movers/index';
import { getLocalState } from '../lib/local-movers/states';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { buildAllAuditProbes } from './lib/live-county-audit';

let failures = 0;

function auditCounty(stateSlug: string, countySlug: string, label: string) {
  const county = getCounty(stateSlug, countySlug);
  const state = getLocalState(stateSlug);
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!county || !state || !result) {
    failures += 1;
    return { label, pass: false, errors: ['missing_county_or_movers'] };
  }

  const path = `/local-movers/${stateSlug}/${countySlug}`;
  const indexDecision = evaluateCountyIndexability(stateSlug, countySlug);
  const metadata = buildCountyPageMetadata(
    county,
    state.name,
    result.movers,
    path,
    indexDecision
  );

  const errors: string[] = [];
  const title = typeof metadata.title === 'string' ? metadata.title : '';
  const description = metadata.description ?? '';

  if ('keywords' in metadata && metadata.keywords !== undefined) {
    errors.push('metadata_contains_keywords');
  }
  if (!title.includes('Movers Serving')) {
    errors.push('title_missing_movers_serving');
  }
  if (/\bloup river sherman\b/i.test(description)) {
    errors.push('description_artifact');
  }
  if (indexDecision.tier === 'index' && metadata.robots?.index !== true) {
    errors.push('robots_not_index_for_tier1');
  }
  if (indexDecision.tier === 'noindex' && metadata.robots?.index !== false) {
    errors.push('robots_not_noindex_for_tier2');
  }

  if (errors.length > 0) failures += 1;

  return {
    label,
    path,
    pass: errors.length === 0,
    title,
    robots: metadata.robots,
    errors,
  };
}

const { all: probes } = buildAllAuditProbes();
const results = probes.map((p) => auditCounty(p.stateSlug, p.countySlug, p.label));

const report = {
  generatedAt: new Date().toISOString(),
  auditedCount: results.length,
  failures,
  pass: failures === 0,
  results,
};

writeFileSync('scripts/output/rendered-metadata-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (!report.pass) process.exit(1);