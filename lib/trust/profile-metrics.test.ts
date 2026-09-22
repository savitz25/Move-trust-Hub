import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  formatComplaintEvidenceLabel,
  getComplaintEvidence,
  NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE,
} from '@/lib/trust/profile-metrics';

test('getComplaintEvidence: no FMCSA identity -> no_record, never a fabricated 0', () => {
  const e = getComplaintEvidence({ fmcsaComplaints: 0, usdotNumber: '', fmcsaLastChecked: null });
  assert.equal(e.status, 'no_record');
  assert.equal(formatComplaintEvidenceLabel(e), 'No FMCSA complaint record on file');
});

test('getComplaintEvidence: real USDOT identity -> shows the real complaint count, singular', () => {
  const e = getComplaintEvidence({ fmcsaComplaints: 1, usdotNumber: '123456', fmcsaLastChecked: null });
  assert.deepEqual(e, { status: 'recorded', complaints: 1 });
  assert.equal(formatComplaintEvidenceLabel(e), '1 complaint recorded');
});

test('getComplaintEvidence: the ticket\'s own example (187 complaints) renders correctly', () => {
  const e = getComplaintEvidence({ fmcsaComplaints: 187, usdotNumber: '76235', fmcsaLastChecked: '2026-07-21' });
  assert.deepEqual(e, { status: 'recorded', complaints: 187 });
  assert.equal(formatComplaintEvidenceLabel(e), '187 complaints recorded');
});

test('getComplaintEvidence: a genuine zero-complaint record (fmcsaLastChecked present, no usdot) still shows evidence', () => {
  const e = getComplaintEvidence({ fmcsaComplaints: 0, usdotNumber: '', fmcsaLastChecked: '2026-01-01' });
  assert.deepEqual(e, { status: 'recorded', complaints: 0 });
  assert.equal(formatComplaintEvidenceLabel(e), '0 complaints recorded');
});

test('MOVE-PROFILE-V3-001D: no code path derives a normalized rate from fmcsaShipments any more', () => {
  // Regression guard for the fail-closed decision. Everything past the
  // documented warning comment (which explains the retired formula by
  // name, for future readers) must contain no live rate computation.
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.resolve(__dirname, 'profile-metrics.ts'), 'utf8');
  const afterCommentBlock = source.slice(source.indexOf('export type ComplaintEvidence'));
  assert.ok(
    !/fmcsaShipments/.test(afterCommentBlock),
    'live code (past the explanatory comment) must never read fmcsaShipments again'
  );
  assert.ok(!source.includes('formatComplaintRatio'), 'the retired per-1000 rate formatter must not be reintroduced');
  assert.ok(!source.includes('MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE'), 'the retired shipment threshold must not be reintroduced');
  assert.ok(!source.includes('ratioPer1000'), 'the retired rate field must not be reintroduced');
});

test('NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE explicitly says the denominator is unverified', () => {
  assert.match(NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE, /verified shipment denominator/i);
  assert.match(NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE, /unavailable/i);
});
