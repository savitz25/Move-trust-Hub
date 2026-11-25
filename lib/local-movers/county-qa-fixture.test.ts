import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  COUNTY_QA_CONTROL_PATH,
  COUNTY_QA_FIXTURE_ENV,
  COUNTY_QA_PROJECT_ID_ENV,
  COUNTY_QA_PROJECT_NAME_ENV,
  COUNTY_QA_TARGET_PATH,
  PRODUCTION_VERCEL_PROJECT_ID,
  PRODUCTION_VERCEL_PROJECT_NAME,
  countyQaFixtureActive,
  countyQaFixtureRequestAllowed,
} from './county-qa-fixture-gate';
import {
  countyGenerateStaticParams,
  countyQaFixtureSeo,
  countyQaRenderMarker,
  countyQaStaticParams,
} from './county-qa-fixture';

const ENV_KEYS = [
  COUNTY_QA_FIXTURE_ENV,
  COUNTY_QA_PROJECT_ID_ENV,
  COUNTY_QA_PROJECT_NAME_ENV,
  'VERCEL_PROJECT_ID',
  'VERCEL_PROJECT_NAME',
] as const;

const QA_ID = 'prj_qa_m2_local';
const QA_NAME = 'move-trust-hub-qa';

async function withEnv(
  values: Record<string, string | undefined>,
  fn: () => void | Promise<void>
) {
  const previous = new Map<string, string | undefined>();
  for (const key of ENV_KEYS) {
    previous.set(key, process.env[key]);
    const next = values[key];
    if (next === undefined) delete process.env[key];
    else process.env[key] = next;
  }
  try {
    await fn();
  } finally {
    for (const key of ENV_KEYS) {
      const prior = previous.get(key);
      if (prior === undefined) delete process.env[key];
      else process.env[key] = prior;
    }
  }
}

const qaOn: Record<string, string> = {
  [COUNTY_QA_FIXTURE_ENV]: '1',
  [COUNTY_QA_PROJECT_ID_ENV]: QA_ID,
  [COUNTY_QA_PROJECT_NAME_ENV]: QA_NAME,
  VERCEL_PROJECT_ID: QA_ID,
  VERCEL_PROJECT_NAME: QA_NAME,
};

test('county QA fixture is off by default', async () => {
  await withEnv({}, () => {
    assert.equal(countyQaFixtureActive(), false);
    assert.equal(countyQaFixtureRequestAllowed(COUNTY_QA_TARGET_PATH), false);
    assert.equal(countyQaFixtureSeo('florida', 'qa-cache-fixture'), null);
    assert.equal(countyQaRenderMarker('florida', 'qa-cache-fixture'), null);
  });
});

test('flag 1 without a matching non-production project stays off', async () => {
  await withEnv({ [COUNTY_QA_FIXTURE_ENV]: '1' }, () => {
    assert.equal(countyQaFixtureActive(), false);
  });
  await withEnv(
    {
      [COUNTY_QA_FIXTURE_ENV]: '1',
      [COUNTY_QA_PROJECT_ID_ENV]: QA_ID,
      [COUNTY_QA_PROJECT_NAME_ENV]: QA_NAME,
      VERCEL_PROJECT_ID: 'prj_other',
      VERCEL_PROJECT_NAME: QA_NAME,
    },
    () => {
      assert.equal(countyQaFixtureActive(), false);
    }
  );
});

test('production project id and name never activate the fixture', async () => {
  assert.equal(PRODUCTION_VERCEL_PROJECT_ID, 'prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0');
  assert.equal(PRODUCTION_VERCEL_PROJECT_NAME, 'move-trust-hub');
  await withEnv(
    {
      [COUNTY_QA_FIXTURE_ENV]: '1',
      [COUNTY_QA_PROJECT_ID_ENV]: PRODUCTION_VERCEL_PROJECT_ID,
      [COUNTY_QA_PROJECT_NAME_ENV]: PRODUCTION_VERCEL_PROJECT_NAME,
      VERCEL_PROJECT_ID: PRODUCTION_VERCEL_PROJECT_ID,
      VERCEL_PROJECT_NAME: PRODUCTION_VERCEL_PROJECT_NAME,
    },
    () => {
      assert.equal(countyQaFixtureActive(), false);
      assert.equal(countyQaFixtureRequestAllowed(COUNTY_QA_TARGET_PATH), false);
    }
  );
  await withEnv(
    {
      ...qaOn,
      [COUNTY_QA_PROJECT_NAME_ENV]: PRODUCTION_VERCEL_PROJECT_NAME,
      VERCEL_PROJECT_NAME: PRODUCTION_VERCEL_PROJECT_NAME,
    },
    () => {
      assert.equal(countyQaFixtureActive(), false);
    }
  );
});

test('exact project match turns the fixture on, and spaces or case do not', async () => {
  await withEnv(qaOn, () => {
    assert.equal(countyQaFixtureActive(), true);
    assert.equal(countyQaFixtureRequestAllowed(COUNTY_QA_TARGET_PATH), true);
    assert.equal(countyQaFixtureRequestAllowed(COUNTY_QA_CONTROL_PATH), true);
    assert.equal(countyQaFixtureRequestAllowed('/local-movers/florida/miami-dade'), false);
  });
  await withEnv({ ...qaOn, [COUNTY_QA_FIXTURE_ENV]: '1 ' }, () => {
    assert.equal(countyQaFixtureActive(), false);
  });
  await withEnv({ ...qaOn, [COUNTY_QA_PROJECT_ID_ENV]: `${QA_ID} ` }, () => {
    assert.equal(countyQaFixtureActive(), false);
  });
  await withEnv({ ...qaOn, VERCEL_PROJECT_NAME: 'Move-Trust-Hub-QA' }, () => {
    assert.equal(countyQaFixtureActive(), false);
  });
});

test('fixture SEO is in memory for the two slugs only', async () => {
  await withEnv(qaOn, () => {
    const target = countyQaFixtureSeo('florida', 'qa-cache-fixture');
    const control = countyQaFixtureSeo('florida', 'qa-cache-control');
    assert.ok(target);
    assert.ok(control);
    assert.equal(target.movers[0]?.name, 'QA Fixture Carrier');
    assert.equal(control.movers[0]?.name, 'QA Control Carrier');
    assert.equal(target.movers[0]?.profilePublished, false);
    assert.equal(target.movers[0]?.listingSource, 'catalog');
    assert.equal(target.movers[0]?.isLocalOnly, true);
    assert.equal(target.indexDecision.reason, 'qa_cache_fixture');
    assert.equal(target.indexDecision.tier, 'noindex');
    assert.equal(target.approvedCount, 0);
    assert.equal(countyQaFixtureSeo('florida', 'miami-dade'), null);
    assert.equal(countyQaFixtureSeo('georgia', 'qa-cache-fixture'), null);
    assert.deepEqual(
      countyQaStaticParams().map((row) => row.countySlug),
      ['qa-cache-fixture', 'qa-cache-control']
    );
  });
});

test('generateStaticParams returns only the fixture slugs when the gate is on', async () => {
  const real = [{ stateSlug: 'florida', countySlug: 'miami-dade' }];
  await withEnv(qaOn, async () => {
    const params = await countyGenerateStaticParams(() => real);
    assert.deepEqual(
      params.map((row) => row.countySlug),
      ['qa-cache-fixture', 'qa-cache-control']
    );
  });
  await withEnv({}, async () => {
    const params = await countyGenerateStaticParams(() => real);
    assert.deepEqual(params, real);
  });
});

test('render marker is null when off and changes on each fixture render', async () => {
  await withEnv({}, () => {
    assert.equal(countyQaRenderMarker('florida', 'qa-cache-fixture'), null);
  });
  await withEnv(qaOn, () => {
    const first = countyQaRenderMarker('florida', 'qa-cache-fixture');
    const second = countyQaRenderMarker('florida', 'qa-cache-fixture');
    assert.ok(first);
    assert.ok(second);
    assert.equal(first.label, 'county-florida-qa-cache-fixture');
    assert.notEqual(first.marker, second.marker);
    assert.equal(countyQaRenderMarker('florida', 'miami-dade'), null);
    const control = countyQaRenderMarker('florida', 'qa-cache-control');
    assert.equal(control?.label, 'county-florida-qa-cache-control');
  });
});

test('fixture source does not call the published evaluator, Supabase, or a cache tag', () => {
  const fixture = readFileSync(new URL('./county-qa-fixture.ts', import.meta.url), 'utf8');
  const gate = readFileSync(new URL('./county-qa-fixture-gate.ts', import.meta.url), 'utf8');
  const seo = readFileSync(new URL('./county-page-seo.ts', import.meta.url), 'utf8');
  const middleware = readFileSync(new URL('../../middleware.ts', import.meta.url), 'utf8');
  const page = readFileSync(
    new URL('../../app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx', import.meta.url),
    'utf8'
  );

  assert.equal(fixture.includes('publishedCountyEvaluation'), false);
  assert.equal(fixture.includes('supabase'), false);
  assert.equal(fixture.includes('countyCacheTag'), false);
  assert.equal(fixture.includes('addCacheTag'), false);
  assert.equal(fixture.includes('revalidatePath'), false);
  assert.equal(fixture.includes('data-qa-cache-tag'), false);
  assert.equal(gate.includes('server-only'), false);
  assert.equal(gate.includes('node:crypto'), false);
  assert.equal(gate.includes('publishedCountyEvaluation'), false);

  const fixtureCall = seo.indexOf('countyQaFixtureSeo(stateSlug, countySlug)');
  const publishedCall = seo.indexOf('publishedCountyEvaluation(stateSlug, countySlug)');
  assert.ok(fixtureCall >= 0 && publishedCall > fixtureCall);

  assert.equal(middleware.includes('countyQaFixtureRequestAllowed(pathname)'), true);
  assert.equal(
    middleware.includes("from '@/lib/local-movers/county-qa-fixture'"),
    false
  );
  assert.equal(page.includes('data-county-load={sourceMode === \'degraded\' ? \'failed\' : \'ok\'}'), true);
  assert.equal(page.includes('data-qa-cache-label={qaMarker.label}'), true);
  assert.equal(page.includes('data-qa-cache-tag'), false);
});
