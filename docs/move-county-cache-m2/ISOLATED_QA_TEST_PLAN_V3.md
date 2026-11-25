# Isolated QA test plan v3 — county cache candidate

Status: DO-NOT-RUN.

This plan supersedes the expectation that a county QA fixture stays HIT under CDN-Cache-Control max-age=86400. That expectation described Option C, which failed: revalidatePath returned 200 and the CDN object stayed HIT inside the 86400 window.

Do not run this plan on the isolated QA project, on preview, or on production until a separate Founder GO names the run. Do not purge. Do not change env on a hosted project. Do not enable COUNTY_QA_FIXTURE on production. Do not copy the #253 tag or revalidate route onto this branch.

## Candidate

Branch `b3/move-county-cache-m2-001` from `06de26a5`. Local only.

Known two-segment county HTML (`/local-movers/:state/:county`) gets middleware CDN-Cache-Control `max-age=60, stale-while-revalidate=60`. Browser Cache-Control for that path stays `public, max-age=0, s-maxage=60, stale-while-revalidate=604800`. The route `revalidate = 60` is unchanged. vercel.json already asks for CDN-Cache-Control max-age=60 on `/local-movers/:path*`. Middleware was replacing that with max-age=86400. This candidate stops that replacement for the two-segment county document only.

These paths keep the previous TTL:

- `/` and other public HTML: CDN-Cache-Control max-age=86400
- `/local-movers/florida` and any one-segment state index: 86400
- `/florida` and `/new-jersey`: 60
- `/companies`: 300
- company profile HTML: no middleware CDN TTL
- unknown county: HTTP 404, Cache-Control `private, no-store, max-age=0`, CDN-Cache-Control `no-store`, one robots noindex, nofollow, no canonical

## What this does not do

Next 15.5.19 `unstable_noStore()` returns immediately when `store.forceStatic` is true (`node_modules/next/dist/server/web/spec-extension/unstable-no-store.js`, the `store.forceStatic` branch). `markCurrentScopeAsDynamic` also returns when `store.forceStatic` is set (`node_modules/next/dist/server/app-render/dynamic-rendering.js` around the forceStatic guard). The county page exports `dynamic = 'force-static'`. A failed county load still calls `unstable_noStore()` from `county-indexability-async.ts`, and that call does not opt the response out of the static cache.

This candidate does not claim per-response no-store for a failed load. Failed loads stay noindex (`county_load_failed`). The page does not throw on a failed load, and it does not answer a known county with 404 during an outage. `DirectoryDegradedBanner` still renders when `sourceMode === 'degraded'`. The main element sets `data-county-load="failed"` in that case and `data-county-load="ok"` otherwise. `ok` includes a successful empty directory. The short CDN TTL is the correction window for a bad object, including a failed render that was stored.

Do not enable `experimental.useCache`. Do not call `cacheTag()` or `addCacheTag()`. A middleware Cache-Tag is not stored on the prerender object. Build-time prerender has no Vercel request context.

Local `next start` can show the middleware header. It cannot prove that Vercel stores that TTL. A hosted proof is the GO-gated run below.

## Fixture harness

Default off. `COUNTY_QA_FIXTURE` must be exactly `1`. `COUNTY_QA_PROJECT_ID` must equal `VERCEL_PROJECT_ID`. `COUNTY_QA_PROJECT_NAME` must equal `VERCEL_PROJECT_NAME`. Comparison is exact, with no trim. Production project id `prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0` and production name `move-trust-hub` never activate the fixture.

Paths, only when the gate is on:

- `/local-movers/florida/qa-cache-fixture` label text `county-florida-qa-cache-fixture`
- `/local-movers/florida/qa-cache-control` label text `county-florida-qa-cache-control`

The label is `data-qa-cache-label` text. It is not a cache tag and it does not purge. `data-qa-render-marker` is a new `crypto.randomUUID()` on each server render.

When the gate is on, `generateStaticParams` returns only those two slugs, and `countyQaFixtureSeo` returns before `publishedCountyEvaluation`. That path makes zero Supabase calls. When the gate is off, both slugs stay unresolved and middleware returns the existing 404 no-store document. `unresolvedCountyCacheHeaders` itself stays geography-only.

## Performance

A real county render still calls `publishedCountyEvaluation` once. That function calls `evaluatePublishedStateCounties`, which loads the approved movers for the state once, loads profile facts once, and then resolves each county in the state through the shared load. The per-render fan-out is unchanged.

The CDN object for a hot county can expire about once a minute, plus a one-minute stale window, instead of about once a day. Origin and database traffic for hot counties can rise because of that shorter TTL. Record that rate change. Do not hide it. The fixture path adds zero `publishedCountyEvaluation` calls.

## Hosted checks, after a Founder GO only

Use the isolated QA project. Do not use production project `prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0`. Set the fixture env only on that QA project, with the QA project id and name matching `VERCEL_PROJECT_ID` and `VERCEL_PROJECT_NAME`. Do not purge.

1. Known county such as `/local-movers/florida/miami-dade`: HTTP 200, one robots directive consistent with its index decision, canonical is that county URL, CDN-Cache-Control is `max-age=60, stale-while-revalidate=60`. Fetch twice inside the fresh window and record age. After the max-age and the stale window, the next response must be able to replace the object without a purge.
2. State index `/local-movers/florida`: HTTP 200, CDN-Cache-Control remains the default max-age=86400.
3. Homepage and `/companies`: previous TTLs, unchanged.
4. Unknown county `/local-movers/florida/zz-not-a-county-b3`, with and without prefetch: HTTP 404, private no-store, CDN-Cache-Control no-store, one robots noindex, nofollow, canonical count 0.
5. Fixture slugs with the flag off: same 404 contract as the unknown county.
6. Fixture slugs with the flag on: HTTP 200, noindex, `data-qa-render-marker` changes between two origin renders, `data-qa-cache-label` is the text label above, CDN-Cache-Control is the 60s county header, and the server log for that render shows no Supabase call.
7. Confirm production project id still refuses the fixture even if `COUNTY_QA_FIXTURE=1`.
8. Confirm bypass count is unchanged. Do not mint a bypass.

Stop the hosted run if any check writes production, changes env outside the named QA project, or purges cache.
