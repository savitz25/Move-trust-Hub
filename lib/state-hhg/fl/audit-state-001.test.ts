import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import {
  FL_AUDIT_STATE_001_GOOGLE_PLACES_REQUESTS,
  FL_AUDIT_STATE_001_PRODUCTION_WRITES,
  STATE_ENRICHMENT_ATTRIBUTES,
  TASK_HISTORY,
  classifyBrokerServiceScopeStorage,
  coveragePct,
  depthBucket,
  isMateriallyResearchable,
  partitionValid,
  realizedCompanyInserts,
} from '@/lib/state-hhg/fl/audit-state-001';

test('audit is read-only and Google-frozen', () => {
  assert.equal(FL_AUDIT_STATE_001_GOOGLE_PLACES_REQUESTS, 0);
  assert.equal(FL_AUDIT_STATE_001_PRODUCTION_WRITES, 0);
  assert.equal(STATE_ENRICHMENT_ATTRIBUTES.length, 14);
});

test('coverage partition and independent IM/MB percentages', () => {
  assert.equal(partitionValid(1098, 930, 168), true);
  assert.equal(coveragePct(930, 1098), 84.7);
  assert.equal(coveragePct(19, 26), 73.1);
  assert.equal(coveragePct(0, 0), 0);
});

test('depth buckets and material researchability require identity plus two extras', () => {
  assert.equal(depthBucket(0), '0');
  assert.equal(depthBucket(1), '1');
  assert.equal(depthBucket(3), '2-3');
  assert.equal(depthBucket(6), '4-6');
  assert.equal(depthBucket(7), '7+');
  assert.equal(isMateriallyResearchable(['deterministic_fl_state_regulatory_identity']), false);
  assert.equal(
    isMateriallyResearchable([
      'im_identifier',
      'im_source_status',
      'source_phone_observation_newly_gained',
    ]),
    true
  );
});

test('interstate service_scope on broker rows is storage compatibility, not federal authority', () => {
  assert.equal(
    classifyBrokerServiceScopeStorage({ entityType: 'BROKER', serviceScope: 'interstate', usdotNumber: null }),
    'SCHEMA_STORAGE_COMPATIBILITY_ONLY'
  );
  assert.equal(
    classifyBrokerServiceScopeStorage({ entityType: 'BROKER', serviceScope: 'interstate', usdotNumber: '3197443' }),
    'HAS_AUTHORITATIVE_FEDERAL_ID'
  );
});

test('realized company inserts are only FL-004/011D/011I', () => {
  assert.equal(realizedCompanyInserts(), 37 + 32 + 17);
  assert.equal(TASK_HISTORY.filter((t) => t.classification === 'PUBLICATION_WRITE').map((t) => t.task).join(','), 'FL-010A');
});

test('frozen audit artifacts reconcile IM/MB partitions and zero Google/writes', () => {
  const p = resolve(process.cwd(), 'docs/audits/florida-state/executive-audit-summary.json');
  if (!existsSync(p)) return;
  const s = JSON.parse(readFileSync(p, 'utf8')) as {
    google_places_requests: number;
    production_writes: number;
    im: { active: number; represented: number; unresolved: number };
    mb: { active: number; represented: number; unresolved: number };
    public_mb: number;
  };
  assert.equal(s.google_places_requests, 0);
  assert.equal(s.production_writes, 0);
  assert.equal(s.im.represented + s.im.unresolved, s.im.active);
  assert.equal(s.mb.represented + s.mb.unresolved, s.mb.active);
  assert.equal(s.public_mb, 0);
  const ledger = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/audits/florida-state/final-state-impact-ledger.json'), 'utf8')
  ) as { POST_STATE_CURRENT: { wrong_company: number; canonical_contact_promotions: number } };
  assert.equal(ledger.POST_STATE_CURRENT.wrong_company, 0);
  assert.equal(ledger.POST_STATE_CURRENT.canonical_contact_promotions, 0);
  const scope = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/audits/florida-state/broker-storage-semantics-audit.json'), 'utf8')
  ) as { SCHEMA_STORAGE_COMPATIBILITY_ONLY: number };
  assert.ok(scope.SCHEMA_STORAGE_COMPATIBILITY_ONLY >= 0);
});
