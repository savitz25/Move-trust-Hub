import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { analyticsEnvironment, shouldEnablePosthog } from './environment.ts';
import { createPosthogClientGate } from './posthog-gate.ts';
import {
  sanitizeAnalyticsUrl,
  sanitizeCaptureResult,
  stripForbiddenProperties,
} from './privacy.ts';
import { TRUSTHUB_HUB } from './events.ts';
import { captureTrustEvent } from './capture.ts';

describe('Move PostHog contract', () => {
  it('uses hub = move', () => {
    assert.equal(TRUSTHUB_HUB, 'move');
  });

  it('environment logic never assumes production', () => {
    const previousPublic = process.env.NEXT_PUBLIC_VERCEL_ENV;
    delete process.env.NEXT_PUBLIC_VERCEL_ENV;
    delete process.env.VERCEL_ENV;
    assert.equal(analyticsEnvironment(), 'development');
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview';
    assert.equal(analyticsEnvironment(), 'preview');
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    assert.equal(analyticsEnvironment(), 'production');
    if (previousPublic === undefined) delete process.env.NEXT_PUBLIC_VERCEL_ENV;
    else process.env.NEXT_PUBLIC_VERCEL_ENV = previousPublic;
  });

  it('production gate stays off without production env and token/host', () => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    const vercel = process.env.NEXT_PUBLIC_VERCEL_ENV;
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview';
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN = 'phc_test';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://us.i.posthog.com';
    assert.equal(shouldEnablePosthog(), false);
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    delete process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    delete process.env.NEXT_PUBLIC_POSTHOG_HOST;
    assert.equal(shouldEnablePosthog(), false);
    if (token === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    else process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN = token;
    if (host === undefined) delete process.env.NEXT_PUBLIC_POSTHOG_HOST;
    else process.env.NEXT_PUBLIC_POSTHOG_HOST = host;
    if (vercel === undefined) delete process.env.NEXT_PUBLIC_VERCEL_ENV;
    else process.env.NEXT_PUBLIC_VERCEL_ENV = vercel;
  });

  it('reserved PostHog properties survive privacy sanitization', () => {
    const event = sanitizeCaptureResult({
      event: '$pageview',
      properties: {
        token: 'phc_live',
        distinct_id: 'abc',
        query: 'USDOT 3244649',
        $current_url: 'https://www.movetrusthub.com/ask?q=secret',
        $pathname: '/ask',
      },
    });
    assert.equal(event?.properties?.token, 'phc_live');
    assert.equal(event?.properties?.distinct_id, 'abc');
    assert.equal(event?.properties?.query, undefined);
    assert.equal(event?.properties?.$current_url, 'https://www.movetrusthub.com/ask');
    assert.equal(event?.properties?.$title, 'Move Trust Hub');
  });

  it('forbidden consumer properties are removed', () => {
    const cleaned = stripForbiddenProperties({
      hub: 'move',
      query: 'Find USDOT 3244649',
      usdot: '3244649',
      email: 'a@b.c',
      result_count: 3,
      success: true,
    });
    assert.deepEqual(cleaned, { hub: 'move', result_count: 3, success: true });
  });

  it('search events fire without raw search text', () => {
    const props = stripForbiddenProperties({
      hub: 'move',
      environment: 'production',
      surface: 'ask_form',
      capability: 'IDENTITY',
      q: 'USDOT 3244649',
      query: 'USDOT 3244649',
      success: true,
    });
    assert.equal(props.q, undefined);
    assert.equal(props.query, undefined);
    assert.equal(props.capability, 'IDENTITY');
    assert.equal(props.hub, 'move');
  });

  it('concurrent init callers share one client', async () => {
    let loads = 0;
    const gate = createPosthogClientGate(async () => {
      loads += 1;
      await new Promise((r) => setTimeout(r, 20));
      return { id: 'sdk' };
    });
    const [a, b, c] = await Promise.all([gate.get(), gate.get(), gate.get()]);
    assert.equal(a, b);
    assert.equal(b, c);
    assert.equal(loads, 1);
  });

  it('analytics failure is non-fatal', () => {
    assert.doesNotThrow(() =>
      captureTrustEvent('search_submitted', { query: 'secret', email: 'a@b.c' }),
    );
  });
});
