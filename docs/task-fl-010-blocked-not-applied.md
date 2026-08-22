# Task FL-010 — BLOCKED, not applied

**Status:** `BLOCKED — NOT APPLIED`

Production now serves merged FL-009 `52afb48b`. `notFound()` is firing (title **Page Not Found**), but GET `/companies/{slug}` for INGESTED Wave 1 members still returns **HTTP 200**.

`x-matched-path: /companies/[slug]` and `cdn-cache-control: max-age=300` match `export const revalidate = 300` on the company profile page. ISR is serving a cached 200 not-found shell instead of HTTP 404.

FL-010 abort rule: any INGESTED HTTP 200 → do not apply.

Wave 1 remains `INGESTED` / `indexable=false`. KEEP_80 unchanged. Google Places requests: 0.

**Recommended next task:** bounded company-profile HTTP 404 status fix (likely disable ISR/`revalidate` on the anonymous not-found path, or `force-dynamic` when `notFound()` runs), then retry FL-010 apply.
