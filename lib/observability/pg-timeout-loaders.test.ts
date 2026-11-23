import assert from 'node:assert/strict';
import { mock, test } from 'node:test';
import Module from 'node:module';

const timeout = { code: '57014', message: 'statement timeout fixture', details: '', hint: '' };
const captureMessage = mock.fn(() => { throw new Error('Sentry unavailable'); });
const query = new Proxy({}, {
  get: (_target, key) => key === 'then'
    ? (resolve: (value: unknown) => void) => resolve({ data: null, error: timeout })
    : () => query,
});
// tsx compiles these loader dependencies through CommonJS; intercept only
// their dependency imports, keeping the production loaders and helper real.
const replacements: Record<string, unknown> = {
  '@sentry/nextjs': {
    captureMessage,
    withScope: (callback: (scope: unknown) => void) => callback({ addEventProcessor() {} }),
  },
  '@supabase/supabase-js': { createClient: () => ({ from: () => query }) },
  '@/lib/supabase/config': {
    getSupabaseUrl: () => 'https://fixture.invalid', getSupabaseAnonKey: () => 'fixture',
    isSupabaseConfigured: () => true, isSupabaseAdminConfigured: () => false,
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

test('actual company and county loaders preserve fallback/throw when Sentry throws', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const { getCompanySlugById } = await import('@/lib/supabase/queries/companies');
  assert.equal(await getCompanySlugById('fixture-company'), null);
  assert.equal(captureMessage.mock.callCount(), 1);

  t.mock.timers.tick(10_000);
  const { getApprovedMoversForState } = await import('@/lib/local-movers/approved-county-movers');
  await assert.rejects(getApprovedMoversForState('florida'), /approved_movers_state_error:florida/);
  assert.equal(captureMessage.mock.callCount(), 2);
});
