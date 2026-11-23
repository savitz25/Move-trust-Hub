import assert from 'node:assert/strict';
import Module from 'node:module';
import { mock, test } from 'node:test';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Company } from '@/types';
import type { Database } from '@/types/supabase';

type QueryResult = { data: unknown; error: { code?: string; message: string } | null };

const timeout = { code: '57014', message: 'statement timeout fixture' };
const captureMessage = mock.fn((_name: string, _context: unknown) => 'test-event');
let queryResults: QueryResult[] = [];

const query = new Proxy({}, {
  get: (_target, key) => key === 'then'
    ? (resolve: (value: QueryResult) => void) => resolve(queryResults.shift()!)
    : () => query,
});
const client = { from: () => query } as unknown as SupabaseClient<Database>;

const replacements: Record<string, unknown> = {
  '@sentry/nextjs': {
    captureMessage,
    withScope: (callback: (scope: unknown) => void) => callback({ addEventProcessor() {} }),
  },
  '@supabase/supabase-js': { createClient: () => client },
  '@/lib/supabase/config': {
    getSupabaseUrl: () => 'https://fixture.invalid',
    getSupabaseAnonKey: () => 'fixture',
    isSupabaseConfigured: () => true,
    isSupabaseAdminConfigured: () => false,
  },
  '@/lib/supabase/admin': { createAdminClient: () => null },
  'next/cache': { unstable_cache: (fn: unknown) => fn },
  '@/lib/logging/logger': { logger: { warn() {}, error() {}, info() {} } },
};
const loader = Module as unknown as { _load: (id: string, parent: unknown, isMain: boolean) => unknown };
const originalLoad = loader._load;
mock.method(loader, '_load', function (id: string, parent: unknown, isMain: boolean) {
  if (id in replacements) return replacements[id];
  return originalLoad.call(Module, id, parent, isMain);
});

const expectedContext = (dataRoute: string) => ({
  level: 'warning',
  fingerprint: ['pg-57014'],
  tags: { pg_code: '57014', data_route: dataRoute },
});

test('the three reviewed readers capture 57014 without changing their failure behavior', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const { selectEvidenceRows } = await import('@/lib/local-movers/approved-county-movers');
  const { attributeDirectoryPageCompanies, loadProfilePlaceAssociation } =
    await import('@/lib/supabase/queries/companies');
  const { attributeListedCompanies } = await import('@/lib/verification/rating-provenance');
  const { seedCompanies } = await import('@/data/seed-companies');

  await t.test('selectEvidenceRows captures its literal table and preserves the thrown error', async () => {
    queryResults = [{ data: null, error: timeout }];
    await assert.rejects(
      selectEvidenceRows(client, 'provider_service_area', 'company_id', ['co-fixture']),
      (error: unknown) => {
        assert.equal(
          (error as Error).message,
          'approved_movers_evidence:provider_service_area:statement timeout fixture'
        );
        return true;
      }
    );
    assert.deepEqual(captureMessage.mock.calls.at(-1)?.arguments, [
      'pg_statement_timeout_57014',
      expectedContext('provider_service_area'),
    ]);
  });

  await t.test('loadProfilePlaceAssociation captures and preserves its failed placeholder', async () => {
    t.mock.timers.tick(10_000);
    queryResults = [
      { data: null, error: timeout },
      { data: null, error: null },
    ];
    const result = await loadProfilePlaceAssociation(client, {
      id: 'co-fixture',
      verification_sources: {
        google: { status: 'ok', place_id: 'place-fixture', name: 'Fixture Movers' },
      },
    });
    assert.deepEqual(result, { holders: [], enumeration: 'failed' });
    assert.deepEqual(captureMessage.mock.calls.at(-1)?.arguments, [
      'pg_statement_timeout_57014',
      expectedContext('companies'),
    ]);
  });

  await t.test('attributeDirectoryPageCompanies captures and preserves failed attribution', async () => {
    t.mock.timers.tick(10_000);
    queryResults = [
      { data: null, error: null },
      { data: null, error: timeout },
    ];
    const company = {
      ...seedCompanies[0]!,
      googleData: {
        status: 'ok',
        place_id: 'place-fixture',
        name: 'Fixture Movers',
      },
    } as Company;
    const result = await attributeDirectoryPageCompanies([company]);
    assert.deepEqual(
      result,
      attributeListedCompanies([company], { holders: [], enumeration: 'failed' })
    );
    assert.deepEqual(captureMessage.mock.calls.at(-1)?.arguments, [
      'pg_statement_timeout_57014',
      expectedContext('companies'),
    ]);
  });

  await t.test('a non-57014 evidence error preserves the throw and does not capture', async () => {
    t.mock.timers.tick(10_000);
    const before = captureMessage.mock.callCount();
    queryResults = [{ data: null, error: { code: 'XX000', message: 'other fixture' } }];
    await assert.rejects(
      selectEvidenceRows(client, 'provider_state_authority', 'company_id', ['co-fixture']),
      /approved_movers_evidence:provider_state_authority:other fixture/
    );
    assert.equal(captureMessage.mock.callCount(), before);
  });
});
