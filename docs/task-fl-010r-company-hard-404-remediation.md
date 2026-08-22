# Task FL-010R — True HTTP 404 remediation

**Status:** in progress toward `READY_TO_RETRY_FL_010_APPLY`  
**Wave 1 apply executed: NO**  
**Google Places / API requests: 0**

Started from merged PR #57 `4711355486f3787e5c154cadeb0ff6d11dbb0118`.

---

## Root cause (evidenced)

Combination:

1. **Sitewide `app/loading.tsx`** wrapped `/companies/[slug]`. The loading shell committed **HTTP 200** before `notFound()` ran.
2. **Middleware CDN cache** (`CDN-Cache-Control: max-age=300` on all `/companies/*`) stored that 200 not-found shell. Production `x-matched-path` stayed `/companies/[slug]`; `cdn-cache-control: max-age=300`.
3. **User-agent matrix:** browser, curl, Googlebot, Bingbot, Twitterbot, and facebookexternalhit all received **200** — so this was not bot-only streaming metadata. `Vary` was only `Accept-Encoding`.

`export const revalidate = 300` was **not** sufficient as the sole cause. Company profiles already build as `ƒ` dynamic.

---

## Fix

1. Relocate loading skeleton to `app/(move)/(marketing)/loading.tsx` so it does not wrap company profiles.
2. Add `app/(move)/companies/[slug]/layout.tsx` — resolve slug → company → anonymous eligibility → `notFound()` before children.
3. Skip middleware HTML CDN cache for `/companies/:slug` (keep `/companies` index and share-og).
4. Deduplicate `getCompanyBySlugAsync` with React `cache()`.

No redirects. No Wave 1 apply. Publication helpers unchanged.

---

## Cache transition

INGESTED → PUBLISHABLE: next request should 200/noindex (no CDN 200-not-found cache). Recommend `revalidatePath('/companies/'+slug)` on FL-010 apply.

PUBLISHABLE → INGESTED: next request should 404.

---

## Local production HTTP (`next start`)

| State | Result |
| ----- | ------ |
| Wave 1 INGESTED | **37/37 HTTP 404** |
| Unknown | **10/10 HTTP 404** |
| KEEP_80 | **80/80 HTTP 200** |
| INDEXABLE Allied | **200** |
