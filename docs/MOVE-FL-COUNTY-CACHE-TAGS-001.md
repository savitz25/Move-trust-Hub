# County HTML tags and isolated revalidation

Draft implementation for MOVE-FL-COUNTY-CACHE-TAGS-001. Independent review is separate. No deployment or recovery action is authorized by this document.

`vercel.json` disables Git deployments only for `c5/move-fl-county-cache-tags-001`, so publishing this draft branch does not request a preview deployment. Other branches and all cache/header configuration remain unchanged. See [Vercel git.deploymentEnabled](https://vercel.com/docs/project-configuration/git-configuration).

The new POST `/api/revalidate-county-paths` authenticates only the exact `Authorization: Bearer` header against `REVALIDATE_SECRET`. Unconfigured service returns 503; missing/wrong bearer returns 401. Query parameters cannot authenticate. Invalid JSON or a missing/empty/invalid paths array returns 400. The complete literal batch is validated before any invalidation. Duplicates are collapsed. Accepted paths match exactly `/local-movers/[a-z0-9-]+/[a-z0-9-]+`, with no decoding or normalization. This is a syntactic allowlist, not an authorization list of recovery candidates or a check that a county exists.

The route calls only `revalidatePath(path, 'page')`. It never calls `revalidateTag` or the existing blanket helpers/routes. A valid batch is not a transactional revalidation operation: a framework failure during execution could occur after an earlier valid path was already marked. Invalid batches perform no calls. The route does not purge the Vercel CDN directly, refresh shared data, or imply authorization for non-FL recovery.

For normal county GET/HEAD responses, middleware adds the single tag `county-{stateSlug}-{countySlug}` in `Cache-Tag` and `Vercel-Cache-Tag`. RSC requests and earlier redirects/rewrites do not receive this HTML tag. No shared family tag is added. The latter header is the one Vercel documents for CDN tag ingestion; Vercel strips it before client delivery. `Cache-Tag` supplies the requested observable header. See [Vercel's cache-tag announcement](https://vercel.com/changelog/tag-based-cache-invalidation-now-available-for-all-responses) and [CDN invalidation documentation](https://vercel.com/docs/caching/cdn-cache/purge). Actual ingestion/behavior on a deployed static response still requires separately authorized post-deploy verification; local tests do not claim a CDN purge result. Existing cached objects are not retroactively retagged by this source change.

## Why no Next cacheTag call

The pinned Next version is 15.5.19. Its installed `dist/server/use-cache/cache-tag.js` requires experimental.useCache and a `use cache` work-unit context; it throws in ordinary request/prerender/unstable-cache contexts. This repo enables neither useCache nor dynamicIO. The county page uses `dynamic = 'force-static'` and `revalidate = 60`, with no `use cache` scope. Calling cacheTag there is therefore not supported by the current configuration. Enabling an experimental cache model or wrapping the page would broaden this change. The [Next 15 cacheTag docs](https://nextjs.org/docs/15/app/api-reference/functions/cacheTag) also describe an experimental cache context (online docs can differ from this pinned patch). Header emission avoids that migration; no Next config, page export, TTL or publication decision changes.

## Validation

Run locally with Node supporting module mocks (repo already uses this test pattern):

```text
node --import tsx --experimental-test-module-mocks --test lib/local-movers/county-cache-tag.test.ts lib/local-movers/revalidate-county-paths.test.ts lib/local-movers/county-cache-middleware.test.ts lib/cache/control.test.ts
```

Tests invoke the actual route with mocked next/cache functions and an in-process random disposable secret. They prove invalid batches/auth failures invoke neither cache function; success invokes only exact county paths with `page`, never either shared tag. Actual middleware response tests prove both tag headers, unchanged county TTL, and absence on hubs/unrelated paths/RSC/redirects. Pure tests cover traversal/encoded paths, uppercase, query/fragment, schemes, slash/segment variations, non-string bodies and final newlines.

Optional TTL and empty-render protections are not implemented. The existing county middleware CDN TTL remains 86400; ISR remains 60. Existing blanket invalidation routes/helpers, shared approved-county-movers data tag, companies-directory tag, indexability/publication/quality rules and last-good snapshots are unchanged. No live endpoint, cache purge, Production environment, database or scan is used for validation.
