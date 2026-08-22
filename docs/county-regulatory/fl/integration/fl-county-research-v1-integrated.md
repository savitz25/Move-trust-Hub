# Florida County Research V1 — Integrated

**Status:** `INTEGRATED — COUNTY RESEARCH V1 ON MAIN`

| Field | Value |
|---|---|
| Integration PR | [#67](https://github.com/savitz25/Move-trust-Hub/pull/67) |
| Merge SHA | `47038f656a4ca2b0effdc865c65808babf4bc69a` |
| Strategy | `STRATEGY_3_SELECTIVE_TRANSPLANT` |
| Freeze | `FL_COUNTY_RESEARCH_V1_FREEZE` @ `1256170855439413242acadf68e659e53f4aabc3` |
| C010 head | `027382d75990f13e39093ef3a0cb479165be49f1` |
| Final manifest | `data/county-regulatory/fl/architecture/c011/final-integration-manifest.json` |
| Manifest hash | `da851281bf73257ba7438bb01960ea48…` |
| Files added | 420 (0 modified / 0 deleted in C011 commit series) |

## Safety counters

```text
Runtime application changes: 0
Production DB migrations: 0
Production DB writes: 0
Consumer PII: 0
Google Places/API calls: 0
Trust Score changed: NO
```

## Historical research PRs

Closed **without merge** after C011: #45 #48 #51 #52 #54 #56 #58 #60 #62 #64  
(each referenced FL-C011 / PR #67)

## Validation

- County validators C001–C010 on post-merge main: PASS
- Build + state-HHG + canary + directory: PASS (pre-merge on integration branch)
- Production smoke: Wave1/KEEP_80 `200 + noindex`; INDEXABLE `200 + index`; Wave1 sitemap hits `0`

## Next

`READY_FOR_PBC_PROD_001` — Palm Beach Production Foundation + Credential Wave A Internal Ingest  
Do not start automatically.
