import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolve } from 'path';
import {
  FloridaStateMoverAdapter,
  isFdacsBroker,
  mapFdacsAuthorityType,
  mapFdacsStatus,
  parseFdacsCsv,
} from '@/lib/state-hhg/fl/adapter';
import { parseFdacsLegacyXls } from '@/lib/state-hhg/fl/legacy-xls';
import { readFileSync, existsSync } from 'fs';

describe('FloridaStateMoverAdapter', () => {
  it('maps status and roles', () => {
    assert.equal(mapFdacsStatus('Registered'), 'active');
    assert.equal(mapFdacsStatus('Expired'), 'expired');
    assert.equal(isFdacsBroker('Moving Broker'), true);
    assert.equal(isFdacsBroker('Intrastate Mover'), false);
    assert.equal(mapFdacsAuthorityType('Moving Broker'), 'intrastate_hhg_broker');
    assert.equal(
      mapFdacsAuthorityType('Intrastate Mover'),
      'intrastate_mover_registration'
    );
  });

  it('parses new-portal CSV', () => {
    const csv = `"Business Name","Location","Phone","Email","License Number","License Type","Status","Issue Date","Expire Date","DBA/Other Names","Contracted Movers"
"Test Mover LLC","1 Main St, Miami, FL 33101","(305) 555-0100","a@b.com","IM999","Intrastate Movers","Registered","01/01/2026","01/01/2028","Test DBA",""
`;
    const rows = parseFdacsCsv(csv);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].licenseNumber, 'IM999');
  });

  it('loads legacy XLS movers when present', async () => {
    const path = resolve('data/state-hhg/fl/fdacs-legacy-im-active.xls');
    if (!existsSync(path)) return;
    const rows = parseFdacsLegacyXls(readFileSync(path, 'utf8'));
    assert.ok(rows.length >= 1000, `expected >=1000 movers, got ${rows.length}`);
    const sample = rows[0];
    assert.ok(sample.licenseNumber.startsWith('IM'));
    assert.equal(sample.licenseType.toLowerCase().includes('mover'), true);

    const adapter = new FloridaStateMoverAdapter({
      legacyXlsPaths: [path],
      csvPaths: [],
    });
    const meta = adapter.getSourceMetadata();
    assert.equal(meta.googlePlacesRequests, 0);
    assert.equal(meta.stateCode, 'FL');
    const raw = await adapter.fetchOrLoadRegistry();
    assert.ok(raw.length >= 1000);
    const norm = adapter.normalizeRecord(raw[0]);
    assert.equal(norm.stateCode, 'FL');
    assert.ok(norm.authorityNumber);
    assert.ok(norm.legalName);
    assert.equal(adapter.resolveBrokerRole(norm), false);
  });

  it('keeps mover and broker roles distinct', async () => {
    const moverPath = resolve('data/state-hhg/fl/fdacs-legacy-im-active.xls');
    const brokerPath = resolve('data/state-hhg/fl/fdacs-legacy-mb-active.xls');
    if (!existsSync(moverPath) || !existsSync(brokerPath)) return;
    const adapter = new FloridaStateMoverAdapter({
      legacyXlsPaths: [moverPath, brokerPath],
      csvPaths: [],
    });
    const raw = await adapter.fetchOrLoadRegistry();
    const norms = raw.map((r) => adapter.normalizeRecord(r));
    const movers = norms.filter((n) => n.raw.roleClass === 'mover');
    const brokers = norms.filter((n) => n.raw.roleClass === 'broker');
    assert.ok(movers.length > 0);
    assert.ok(brokers.length > 0);
    assert.ok(brokers.every((b) => adapter.resolveBrokerRole(b)));
  });
});
