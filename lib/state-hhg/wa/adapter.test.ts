import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { existsSync } from 'fs';
import { resolve } from 'path';
import {
  WashingtonStateMoverAdapter,
  mapUtcStatus,
  utcRawSourceKey,
} from '@/lib/state-hhg/wa/adapter';

describe('WashingtonStateMoverAdapter', () => {
  it('maps UTC status', () => {
    assert.equal(mapUtcStatus('Active'), 'active');
    assert.equal(mapUtcStatus('[Active]'), 'active');
    assert.equal(mapUtcStatus('Inactive'), 'inactive');
  });

  it('builds stable source keys', () => {
    assert.equal(
      utcRawSourceKey({ companyNodeId: '1', utcId: '2', permitNumber: 'HG070844' }),
      'WA_UTC:PERMIT:HG070844'
    );
  });

  it('loads snapshot and normalizes when present', async () => {
    const snapshot = resolve('data/state-hhg/wa/utc-hhg-active-raw.json');
    if (!existsSync(snapshot)) return;
    const adapter = new WashingtonStateMoverAdapter({ snapshotPath: snapshot });
    const meta = adapter.getSourceMetadata();
    assert.equal(meta.googlePlacesRequests, 0);
    assert.equal(meta.stateCode, 'WA');
    const raw = await adapter.fetchOrLoadRegistry();
    assert.ok(raw.length >= 200, `expected >=200, got ${raw.length}`);
    const norm = adapter.normalizeRecord(raw[0]);
    assert.equal(norm.stateCode, 'WA');
    assert.ok(norm.legalName);
    assert.equal(adapter.resolveBrokerRole(norm), false);
    assert.equal(norm.raw.roleClass, 'mover');
    assert.equal(norm.raw.authorityType, 'intrastate_hhg_carrier');
  });
});
