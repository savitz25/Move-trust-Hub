# Task 011D.4 — Scale Decision

**SCALE_READY: YES**

**FINAL DECISION: `KEEP_80_NOINDEX`**

## Why KEEP_80_NOINDEX

1. Production canary is technically healthy (authority, identity, discovery, interstate isolation, SEO gates).
2. Observation volume / analytics for real consumer interaction is **INSUFFICIENT** — do not treat launch-day technical QA as enough to index.
3. Profiles are discovery-useful but often **thin for aggressive indexing**.
4. Expansion to remaining ~849 INGESTED providers should stay controlled; do not jump to all-ready bulk publish.

## Remaining internal pool (informational)

| Segment | Count |
|---------|------:|
| INGESTED state-only | 849 |
| Publication-ready (excl. canary) FL | 731 |
| Publication-ready (excl. canary) WA | 118 |
| Publication-ready total excl. canary | 849 |

## If/when Wave 2 is justified

Recommended safest next size:

**+100 FL / +50 WA (total +150)** — Option 1

Not recommended now as an automatic next engineering execution inside 011D.4.

Larger options (+200/+100 or full ready pool) only after:

- continued canary stability window
- query/index health under load
- optional 011D.5 indexing readiness if SEO expansion is desired

## Rollback

Still available via `docs/task-011d3-rollback.sql` / `npm run rollback:task-011d3`.

**Rollback needed now: NO**

## Radius

POWER_UNIT / FIXED / Adjacent: remain **disabled**.
