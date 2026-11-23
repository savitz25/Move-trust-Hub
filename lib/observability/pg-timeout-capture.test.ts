import assert from 'node:assert/strict';
import { mock, test } from 'node:test';

const captureMessage = mock.fn((_name: string, _context: unknown) => 'test-event');
let processor: ((event: Record<string, unknown>) => unknown) | undefined;
mock.module('@sentry/nextjs', {
  namedExports: {
    captureMessage,
    withScope: (callback: (scope: unknown) => void) => callback({
      addEventProcessor: (value: typeof processor) => { processor = value; },
    }),
  },
});
const helper = import('./pg-timeout-capture');
const expected = {
  level: 'warning',
  fingerprint: ['pg-57014'],
  tags: { pg_code: '57014', data_route: 'companies' },
};

test('57014 capture is exact, bounded, private, and never changes caller control flow', async (t) => {
  const { captureStatementTimeout } = await helper;
  t.mock.timers.enable({ apis: ['Date'], now: 0 });

  await t.test('non-57014 and null do not capture or reserve the window', () => {
    for (const error of [null, undefined, {}, { code: 'XX000' }, { code: 57014 }]) {
      captureStatementTimeout(error, 'companies');
    }
    assert.equal(captureMessage.mock.callCount(), 0);
  });

  await t.test('five calls in ten seconds produce exactly one minimal capture', () => {
    const error = { code: '57014', message: 'private', details: 'private', hint: 'private' };
    for (let i = 0; i < 5; i++) captureStatementTimeout(error, 'companies');
    assert.equal(captureMessage.mock.callCount(), 1);
    assert.deepEqual(captureMessage.mock.calls[0].arguments, ['pg_statement_timeout_57014', expected]);
    t.mock.timers.tick(9_999);
    captureStatementTimeout(error, 'directory_query_page');
    assert.equal(captureMessage.mock.callCount(), 1);
    t.mock.timers.tick(1);
    captureStatementTimeout(error, 'companies');
    assert.equal(captureMessage.mock.callCount(), 2);
  });

  await t.test('SDK request, user, breadcrumbs and other enrichment are removed', () => {
    assert.ok(processor);
    assert.deepEqual(processor({
      event_id: 'test-id', timestamp: 10, request: { url: 'https://example.test/?private=value' },
      user: { id: 'private' }, extra: { query: 'private' }, contexts: { private: true },
      breadcrumbs: [{ message: 'private' }], tags: { company: 'private' },
      exception: { values: [{ value: 'private' }] },
    }), { event_id: 'test-id', timestamp: 10, message: 'pg_statement_timeout_57014', ...expected });
  });

  await t.test('Sentry throwing preserves caller return and original throw; failure is rate limited', () => {
    captureMessage.mock.mockImplementation(() => { throw new Error('Sentry failure'); });
    const original = { code: '57014' };
    const returningCaller = () => { captureStatementTimeout(original, 'companies'); return null; };
    const throwingCaller = () => { captureStatementTimeout(original, 'companies'); throw original; };
    t.mock.timers.tick(10_000);
    assert.equal(returningCaller(), null);
    assert.equal(captureMessage.mock.callCount(), 3);
    assert.equal(returningCaller(), null);
    assert.equal(captureMessage.mock.callCount(), 3);
    t.mock.timers.tick(10_000);
    assert.throws(throwingCaller, (error) => error === original);
    assert.equal(captureMessage.mock.callCount(), 4);
  });

  await t.test('even a throwing code getter cannot escape', () => {
    assert.doesNotThrow(() => captureStatementTimeout({ get code() { throw new Error('getter'); } }, 'companies'));
  });
});
