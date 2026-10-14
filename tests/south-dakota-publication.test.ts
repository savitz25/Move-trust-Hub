import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../app/south-dakota/page.tsx', import.meta.url), 'utf8');

describe('South Dakota Move publication', () => {
  it('publishes a canonical indexable statewide route with official source links', () => {
    assert.ok(page.includes('canonical: `${SITE_URL}/south-dakota`'));
    assert.ok(page.includes('robots: { index: true, follow: true }'));
    assert.ok(page.includes('sdlegislature.gov/Statutes/49'));
    assert.ok(page.includes('sdtruckinfo.sd.gov/intrastate-carriers/'));
    assert.ok(page.includes('consumer.sd.gov/fastfacts/moving.aspx'));
    assert.ok(page.includes('safer.fmcsa.dot.gov'));
  });

  it('keeps vehicle permits, state HHG roster, and federal authority separate', () => {
    assert.ok(page.includes('NOT_ACQUIRED'));
    assert.ok(page.includes('single-trip application provision is a trip permit record, not a statewide mover roster'));
    assert.ok(page.includes('Federal operating authority and USDOT/MC identifiers do not establish intrastate state authority.'));
    assert.ok(page.includes('A vehicle registration or plate is not a household-goods company authority record.'));
  });

  it('publishes no inferred mover census, ratings, or adverse findings', () => {
    assert.ok(page.includes('No mover count or active-authority total is inferred'));
    assert.ok(!page.includes('AggregateRating'));
    assert.ok(page.includes('does not rank movers'));
    assert.ok(page.includes('complaints, and orders are separate evidence'));
  });
});
