import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { beforeEach } from 'node:test';
import {
  COUNTY_LOAD_VISIBILITY_INTERVAL_MS,
  deliverCountyLoadVisibility,
  resetCountyLoadVisibilityWindowForTests,
  type CountyLoadCaptureContext,
  type CountyLoadVisibilityInput,
} from '@/lib/local-movers/county-load-visibility';
import { localStates } from '@/lib/local-movers/states';

type Captured = { message: string; context: CountyLoadCaptureContext };

function captureSink() {
  const events: Captured[] = [];
  return {
    events,
    capture(message: string, context: CountyLoadCaptureContext) {
      events.push({ message, context });
    },
  };
}

function incomplete(state: string, failedCountyCount: number, usedFallback = false): CountyLoadVisibilityInput {
  return { state, freshComplete: false, usedFallback, failedCountyCount };
}

beforeEach(() => {
  resetCountyLoadVisibilityWindowForTests();
});

test('an incomplete state load emits one partial-load warning', () => {
  const sink = captureSink();
  const sentAt = new Map<string, number>();
  deliverCountyLoadVisibility(incomplete('texas', 2), sink.capture, { now: 1_000, sentAt });

  assert.equal(sink.events.length, 1);
  const event = sink.events[0]!;
  assert.equal(event.message, 'Move county load incomplete for texas');
  assert.deepEqual(event.context, {
    level: 'warning',
    tags: {
      hub: 'move',
      state: 'texas',
      kind: 'county_partial_load',
      failed_county_count: '2',
    },
    fingerprint: ['move-county-partial-load', 'texas'],
  });
  assert.deepEqual(Object.keys(event.context.tags).sort(), [
    'failed_county_count',
    'hub',
    'kind',
    'state',
  ]);
  const packed = JSON.stringify(event);
  assert.doesNotMatch(packed, /@|phone|email|profileSlug|usdot|Bearer|secret/i);
});

test('a last-good snapshot emits a fallback warning and still reports the partial load', () => {
  const sink = captureSink();
  deliverCountyLoadVisibility(incomplete('texas', 2, true), sink.capture, {
    now: 1_000,
    sentAt: new Map(),
  });

  assert.deepEqual(
    sink.events.map((event) => event.context.tags.kind),
    ['county_partial_load', 'snapshot_fallback']
  );
  assert.deepEqual(
    sink.events.map((event) => event.context.fingerprint),
    [
      ['move-county-partial-load', 'texas'],
      ['move-county-snapshot-fallback', 'texas'],
    ]
  );
  assert.equal(sink.events[1]?.message, 'Move county load used last-good snapshot for texas');
  assert.equal(sink.events[1]?.context.level, 'warning');
  assert.equal(sink.events[1]?.context.tags.hub, 'move');
  assert.equal(sink.events[1]?.context.tags.state, 'texas');
  assert.equal(sink.events[1]?.context.tags.failed_county_count, '2');
});

test('the same state and kind is emitted at most once per five minutes', () => {
  const sink = captureSink();
  const sentAt = new Map<string, number>();
  const now = 10_000;
  deliverCountyLoadVisibility(incomplete('texas', 2, true), sink.capture, { now, sentAt });
  deliverCountyLoadVisibility(incomplete('texas', 4, true), sink.capture, { now: now + 1, sentAt });
  deliverCountyLoadVisibility(incomplete('texas', 4, true), sink.capture, {
    now: now + COUNTY_LOAD_VISIBILITY_INTERVAL_MS - 1,
    sentAt,
  });
  assert.equal(sink.events.length, 2);

  deliverCountyLoadVisibility(incomplete('florida', 1), sink.capture, { now: now + 1, sentAt });
  assert.equal(sink.events.length, 3);
  assert.equal(sink.events[2]?.context.tags.state, 'florida');
  assert.equal(sink.events[2]?.context.tags.kind, 'county_partial_load');

  deliverCountyLoadVisibility(incomplete('texas', 2, true), sink.capture, {
    now: now + COUNTY_LOAD_VISIBILITY_INTERVAL_MS,
    sentAt,
  });
  assert.equal(sink.events.length, 5);
  assert.deepEqual(
    sink.events.slice(3).map((event) => event.context.tags.kind),
    ['county_partial_load', 'snapshot_fallback']
  );
});

test('the process window keeps one event per state per kind', () => {
  const first = captureSink();
  const second = captureSink();
  deliverCountyLoadVisibility(incomplete('texas', 1), first.capture, { now: 50 });
  deliverCountyLoadVisibility(incomplete('texas', 1), second.capture, { now: 51 });
  deliverCountyLoadVisibility(incomplete('ohio', 3, true), second.capture, { now: 51 });

  assert.equal(first.events.length, 1);
  assert.deepEqual(
    second.events.map((event) => `${event.context.tags.state}:${event.context.tags.kind}`),
    ['ohio:county_partial_load', 'ohio:snapshot_fallback']
  );
});

test('a complete load emits nothing and does not consume the window', () => {
  const sink = captureSink();
  const sentAt = new Map<string, number>();
  deliverCountyLoadVisibility(
    { state: 'texas', freshComplete: true, usedFallback: false, failedCountyCount: 0 },
    sink.capture,
    { now: 1_000, sentAt }
  );
  assert.equal(sink.events.length, 0);
  assert.equal(sentAt.size, 0);

  deliverCountyLoadVisibility(incomplete('texas', 1), sink.capture, { now: 1_001, sentAt });
  assert.equal(sink.events.length, 1);
  assert.equal(sink.events[0]?.context.tags.kind, 'county_partial_load');
});

test('a capture failure does not escape or open another event inside the window', () => {
  const sentAt = new Map<string, number>();
  assert.doesNotThrow(() => {
    deliverCountyLoadVisibility(incomplete('texas', 1), () => {
      throw new Error('dsn unavailable');
    }, { now: 1_000, sentAt });
  });
  const sink = captureSink();
  deliverCountyLoadVisibility(incomplete('texas', 1), sink.capture, { now: 1_001, sentAt });
  assert.equal(sink.events.length, 0);
});

test('unknown or contact-shaped state values are not sent', () => {
  const sink = captureSink();
  const sentAt = new Map<string, number>();
  for (const state of ['jane@example.com', '555-010-0199', 'Texas', '', 'not-a-state', 'texas?token=secret']) {
    deliverCountyLoadVisibility(incomplete(state, 1, true), sink.capture, { now: 1_000, sentAt });
  }
  assert.equal(sink.events.length, 0);
  assert.equal(sentAt.size, 0);
});

test('every published state slug can be reported', () => {
  const sentAt = new Map<string, number>();
  for (const state of localStates) {
    const sink = captureSink();
    deliverCountyLoadVisibility(incomplete(state.slug, 1), sink.capture, { now: 1_000, sentAt });
    assert.equal(sink.events.length, 1, state.slug);
    assert.equal(sink.events[0]?.context.tags.state, state.slug);
    assert.deepEqual(sink.events[0]?.context.fingerprint, ['move-county-partial-load', state.slug]);
  }
});

test('state load and sitemap evaluation share one Sentry report', () => {
  const source = readFileSync('lib/local-movers/county-indexability-async.ts', 'utf8');
  const sitemap = readFileSync('app/sitemap-local/sitemap.ts', 'utf8');
  assert.match(sitemap, /evaluatePublishedStateCounties\(id\)/);
  assert.doesNotMatch(sitemap, /captureMessage/);
  assert.match(source, /reportCountyLoadVisibility\(\{/);
  assert.match(source, /freshComplete: settled\.freshComplete/);
  assert.match(source, /usedFallback: settled\.usedFallback/);
  assert.match(source, /Sentry\.captureMessage\(message, \{/);
  assert.match(source, /level: context\.level/);
  assert.match(source, /fingerprint: context\.fingerprint/);
  assert.doesNotMatch(source, /captureException\(/);
});
