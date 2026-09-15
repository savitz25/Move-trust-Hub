# TH-SEARCH-R1-018 BLOCKER-MOVE-01 — Release Receipt

- Branch: `th-search-r1-018-blocker-move-01`
- PR: [savitz25/Move-trust-Hub#137](https://github.com/savitz25/Move-trust-Hub/pull/137)
- CI: `stale-manifest` workflow pass; Vercel preview build + deploy pass; Vercel Agent Review pass
- Merge commit: `8e574a13716d472ebe9525ed43d7869f162e4077` (merged to `main`)
- Production verified at `www.movetrusthub.com` (live `POST /api/specialist-execution/v2`, the
  real Ask-parent-facing contract), after waiting for the post-merge production deployment to roll
  out (the PR's Vercel preview completing is a different deployment than production; verified by
  polling until the response actually changed):

**Before rollout (still serving pre-fix build):**
```json
{"resultType":"SUPPORTED_RESULTS","total":34,"identityResolutionClass":"AMBIGUOUS_NAME",
 "rows":["JK Moving Services","Jk Moving Services","Ab Moving Services","Jp Moving Services",
         "Km Moving Services","Kings Moving Services","Bb&D Moving Services","H&L Moving Services"]}
```

**After rollout, `identityName: "JK Moving Services"`:**
```json
{"resultType":"SUPPORTED_RESULTS","total":2,"identityResolutionClass":"AMBIGUOUS_NAME",
 "rows":[
   {"name":"JK Moving Services","usdot":"1065394","hq":"Sterling, VA"},
   {"name":"Jk Moving Services","usdot":"1300300","hq":"GAITHERSBURG, MD"}
 ]}
```
Both rows are genuine, distinct, real "JK Moving Services"-branded companies. Zero unrelated rows.

**After rollout, `identityName: "JK Moving"`** (the entity name Ask parent actually extracts and
sends for "Can JK Moving handle my move from Virginia to Florida?", per the R1-016 fix in
`Conumers-Trust-Hub`):
```json
{"resultType":"SUPPORTED_RESULTS","total":3,"identityResolutionClass":"FUZZY_CANDIDATES",
 "rows":["JK Moving Services","Jk Moving Services","Jk Brokerage Services"]}
```
All 3 genuinely share the "JK" token (the third is a real, legitimately-related brokerage entity
under the same initials, matching move-ask-v1's own reference candidate set which additionally
lists "JK Forwarders" and "JK Van Lines"). Zero unrelated rows (Ab/Jp/Km/Kings/Bb&D/H&L Moving
Services are all correctly gone).

**BLOCKER-MOVE-01: PASS in production**, targeted matrix requirement (spec section 18) satisfied.
