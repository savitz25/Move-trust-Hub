# County outage cache

Successor of `f4de5c3cea6474231b8b1c6caf555d961fee4ae1`. That commit is unchanged.

## What was stored

`dynamic = 'force-static'` stores a successful render. A degraded load still returned HTTP 200 with `data-county-load=failed`. The next request reused that document. Middleware also set `CDN-Cache-Control: max-age=60`, and that header can store a non-200 response. A 60-second TTL shortens a bad object. It does not stop the bad object from being stored.

## This successor

`refuseCachedCountyOutage` throws `county_load_failed` when `sourceMode` is `degraded`, before the success document is returned. `db`, `seed`, and `hybrid` continue, including a county with zero movers. Unknown counties stay on the existing 404 no-store path. State indexes and other routes keep their existing TTLs.

County HTML from middleware now sets `Cache-Control: private, no-store` and `CDN-Cache-Control: no-store`. That overrides the `vercel.json` 60-second rule for this path. The 60-second helper remains in `countyHtmlCdnCacheControl` for a later status-aware cache. It is not applied at the edge here.

## Load

A continuous requester at a 86400-second TTL fills the CDN about once per day per county. At 60 seconds that is about 1,440 fills per day, 24 times the daily fills, if every expiry meets traffic. Those fills are not database calls once a successful static document exists. A degraded throw is not stored, so the next request tries the load again. That is one database attempt per retry until a non-degraded result is rendered. This commit does not measure a hosted database. No purge and no revalidation was run.

## Hosted check, do not run

1. Deploy this branch only to an isolated non-production project.
2. Request one known county, one unknown county, one state index, and `/`.
3. Expect the known county to render, the unknown county to be 404 no-store, and the state index and home to keep their current cache headers.
4. Force a degraded load in that isolated project and expect a failed response that is not reused as HTTP 200.
5. Rollback is `git revert` of this commit. Production is still `06de26a5`. No purge is required while this branch is unpushed.

#253 was not modified.
