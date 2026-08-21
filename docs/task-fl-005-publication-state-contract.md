# Task FL-005 — Publication-state contract

**Google Places / API requests: 0.**

Anonymous public profile gate: `isAnonymousPublicProfileAllowed` in `lib/provider/publication.ts`.

`INGESTED` is internal-only. Direct `/companies/{slug}` returns `notFound()` for anonymous visitors. Portal/owner routes still use `getCompanyBySlugAsync` and are unchanged.

Legacy federal rows with `publication_state = null` remain publicly reachable. `PUBLISHABLE` canary profiles remain reachable with noindex.

| State | Profile route (anonymous) | Search / directory | County / state canary discovery | Sitemap | Robots |
| ----- | ------------------------- | ------------------ | ------------------------------- | ------- | ------ |
| `INGESTED` | **NO** (`notFound()`) | NO | NO | NO | noindex (not served) |
| `CLASSIFIED` / `REVIEW_REQUIRED` / `INACTIVE` | **NO** | NO | NO | NO | noindex |
| `PUBLISHABLE` (`indexable=false`, canary) | **YES** | bounded (directory allows PUBLISHABLE) | **YES** if in `local_hhg_canary_publication` + `consumer_eligible` | NO | noindex |
| `INDEXABLE` / `VERIFIED` | YES | YES | per other evidence | YES if `indexable=true` | index |
| `null` (legacy federal) | YES | YES | catalog/federal rules | YES | index |

`isSeoIndexableCompany` still requires `indexable !== false`, so canary `PUBLISHABLE` + `indexable=false` stays out of the sitemap.
