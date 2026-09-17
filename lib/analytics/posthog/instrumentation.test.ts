import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');

describe('Move PostHog instrumentation surfaces', () => {
  it('profile_viewed fires on the company profile surface', () => {
    const src = readFileSync(join(root, 'app/(move)/companies/[slug]/page.tsx'), 'utf8');
    assert.match(src, /ProfileViewed/);
    assert.match(src, /profileType="moving_company"/);
    assert.doesNotMatch(src, /ProfileViewed[^>]*usdot/);
  });

  it('search form submits search_submitted without using the raw query', () => {
    const src = readFileSync(join(root, 'components/specialist-search/SpecialistSearchShell.tsx'), 'utf8');
    assert.match(src, /captureSearchSubmitted\('ask_form'\)/);
    assert.doesNotMatch(src, /captureSearchSubmitted\([^)]*query/);
  });

  it('search results emit search_results_returned', () => {
    const src = readFileSync(join(root, 'components/specialist-search/SearchAnalytics.tsx'), 'utf8');
    assert.match(src, /captureSearchResultsReturned/);
  });

  it('does not emit Ask specialist_handoff_started on Move', () => {
    const src = readFileSync(join(root, 'lib/analytics/posthog/events.ts'), 'utf8');
    assert.doesNotMatch(src, /SPECIALIST_HANDOFF_STARTED/);
  });
});
