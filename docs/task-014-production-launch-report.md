# Task 014 — Production launch report

Date: 2026-08-17
Launch worktree: `C:\Users\makei\move-trust-hub-v2-launch`
Production-changing actions: **NONE**

1. **Authorized launch candidate SHA:** `419890c0acbfa4a8160360ca877c19209637190b`.
2. **Pre-launch CI:** **PASS** on the authorized SHA.
3. **Pre-launch Preview:** **PASS / Ready**; Vercel status on PR #1 is successful.
4. **V1 checkpoint timestamp:** 2026-08-17 during the controlled launch session; the live golden crawl completed before any Production mutation.
5. **Previous Production SHA/deployment:** `aaca23f33827acb874d2706e72e7e4cca702063d`; deployment `dpl_GvpXyBgeBjVxH5V4ETvxHVsgqLBp` (`move-trust-qfotqe3el-savitz25-s-projects.vercel.app`), Ready.
6. **Launch merge SHA:** Not created.
7. **Production deployment ID:** No new deployment.
8. **Database checkpoint:** **NOT COMPLETED**. The resolved Production environment has no server database connection variable, so V1 counts/checksums, additive-schema verification, and release-pointer inspection could not be performed safely.
9. **Approved discovery release:** Expected `MOVE_CONSUMER_DISCOVERY_2026_08_V2`; not activated or revalidated against Production.
10. **Provider count:** Expected 86; Production release not queried.
11. **FL count:** Expected 41; Production release not queried.
12. **WA count:** Expected 45; Production release not queried.
13. **Verified-location count:** Expected 52; Production release not queried.
14. **Review-location count:** Expected 34; Production release not queried.
15. **Experimental-derived status:** Candidate contract is hard false; Production V2 was not activated.
16. **NJ status:** Excluded by candidate contract; Production V2 was not activated.
17. **Illinois status:** Excluded by candidate contract; Production V2 was not activated.
18. **Dark deployment result:** Not attempted.
19. **V1 golden result after dark deploy:** Not applicable. Pre-deploy Production baseline was **28/28 PASS**.
20. **Release pointer activation:** Not attempted.
21. **V2 flag activation:** Not attempted.
22. **Public reads activation:** Not attempted.
23. **Public API smoke:** Not attempted against Production V2.
24. **Same-URL composition activation:** Not attempted.
25. **Homepage result:** Pre-launch V1 baseline returned 200 with the correct Production canonical and no `noindex`.
26. **Local search results:** Not activated; V1 remained unchanged.
27. **Interstate result:** Not activated; V1 remained unchanged.
28. **Historical provider results:** Sampled golden provider URLs returned 200 with historical canonicals.
29. **Unresolved-provider fallback:** Candidate contract preserved; not activated in Production.
30. **Compare result:** `/compare` returned 200 in the V1 golden baseline.
31. **DOT verification:** `/verify-dot` returned 200 in the V1 golden baseline.
32. **Move Plan result:** `/my-move` returned 200 in the V1 golden baseline.
33. **Calculator result:** `/moving-calculator` returned 200 in the V1 golden baseline.
34. **Auto result:** `/auto-transport` returned 200 in the V1 golden baseline.
35. **Redirect activation:** Not attempted.
36. **Redirect validation:** Not applicable; no launch redirects activated.
37. **Sitemap URL count:** Live main sitemap contained 1,100 `<loc>` entries. The local sitemap index contained 51 child sitemap entries. Full child expansion was not run after the environment gate failed.
38. **Sitemap validation:** Both `/sitemap.xml` and `/sitemap-local/sitemap.xml` returned 200 before launch.
39. **Robots validation:** **PASS** before launch: public content allowed; admin, API, and internal framework paths disallowed; only Production Move sitemaps advertised.
40. **Canonical validation:** **PASS** across the 28-URL pre-launch golden set; host remained `https://www.movetrusthub.com`.
41. **Production SEO golden result:** **28/28 PASS before deployment**. No deployment occurred.
42. **Analytics continuity:** Existing code/baseline identifies `G-433BDVV8MJ`; required Production variable `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE` is absent, so the launch gate did not pass.
43. **Analytics privacy:** Candidate contract passed Task 013; no new Production events were activated.
44. **Security validation:** No Production V2 exposure occurred. Required environment validation failed before cutover.
45. **Performance observations:** Pre-launch golden requests completed without a launch-critical availability failure; no post-launch measurement exists.
46. **Desktop smoke:** Not run post-launch because launch did not begin.
47. **Mobile smoke:** Not run post-launch because launch did not begin.
48. **Production errors observed:** No launch-induced errors; Production was not modified.
49. **Fixes made during launch:** None.
50. **Rollback controls verified:** Previous Production deployment and SHA were recorded. Full pointer/flag rollback inputs could not be recorded because the database pointer and launch flags were unavailable.
51. **Rollback triggered?:** **NO** — no Production-changing action occurred.
52. **If rollback:** Not applicable; Production remained at its original state.
53. **Search Console action:** None; sitemap submission was not attempted.
54. **Post-launch monitoring observations:** Not applicable; launch stopped before deployment.
55. **Final Production SHA:** `aaca23f33827acb874d2706e72e7e4cca702063d` (unchanged).
56. **Final Production deployment:** `dpl_GvpXyBgeBjVxH5V4ETvxHVsgqLBp` (unchanged).
57. **Final active discovery release:** Not queried and not changed.
58. **PR final state:** PR #1 remains **OPEN + DRAFT**, head `419890c0acbfa4a8160360ca877c19209637190b`, mergeable.
59. **Production changes:** **NONE**. No merge, deploy, environment mutation, database write, release-pointer change, feature activation, redirect activation, sitemap selection, or cache purge occurred.
60. **Task 014:** **PARTIAL** — stopped at the environment/database safety gates.
61. **MOVETRUSTHUB 2.0 LIVE?:** **NO**.
62. **STABILIZATION REQUIRED?:** **NO**; the existing V1 Production deployment remains healthy.
63. **Exact next recommendation:** Add or restore the required Production variable names through the authorized secret-management process—especially a valid server database connection variable and `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE=G-433BDVV8MJ`—and define all launch flags at `false`. Confirm whether the deployed cron configuration requires `CRON_SECRET`. Then restart Task 014 at the Production baseline/database/environment gates, query and record the V1 database checkpoint and current release pointer, and proceed only if every gate passes.

## Phase 0 and workspace preservation

- Original workspace preserved: **YES**.
- Original workspace status remained only `?? MOVETRUSTHUB-V1-PRE-MIGRATION-HANDOFF.md`.
- Preserved handoff: `C:\Users\makei\move-trust-hub-v2\MOVETRUSTHUB-V1-PRE-MIGRATION-HANDOFF.md`; 19,981 bytes; modified 2026-08-17T15:41:50.9488332-04:00; SHA-256 `06546A97DBD43777F74EE641C53E2FF9882F89232648CDA046113E15CBB54804`.
- Clean launch worktree HEAD: `419890c0acbfa4a8160360ca877c19209637190b`.
- `origin/move-2.0` exact match: **YES**.
- Working tree was clean before this report was created.
- County SEO Compliance: **PASS**.
- Vercel Preview: **PASS**.
- Phase 0: **PASS**.

## Stop reason

The resolved Vercel Production environment contained the Supabase public URL/key, Supabase service-role key, Google Places key, FMCSA key, and `ADMIN_SECRET`, but it did not contain a server database connection variable, `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE`, any of the required `MOVE_ENABLE_*` launch flags, or `CRON_SECRET`. Task 014 requires the database checkpoint and explicit dark flag state before deployment. Continuing would have made the release neither fully verifiable nor immediately reversible, so the launch was stopped without changing Production.

## Task 014B — Production configuration and final dry-run gate

Task 014B date: 2026-08-17
Verdict: **BLOCKED — NOT READY**
Production deployment/domain/DNS changes: **NONE**
Production environment configuration changes: preferred Move GA name added, seven launch flags explicitly set dark, and a generated sensitive cron secret added. No deployment was triggered.

### 1. Baseline verification

- Worktree: `C:\Users\makei\move-trust-hub-v2-launch`.
- Branch: `task-014-launch` with no upstream; HEAD and `origin/move-2.0` were both `419890c0acbfa4a8160360ca877c19209637190b` with divergence `0/0`.
- The report remains uncommitted so the isolated launch branch does not move away from the frozen SHA.
- PR #1 remained OPEN + DRAFT, mergeable, at the exact approved SHA; CI, County SEO Compliance, and Vercel Preview checks remained successful.
- Original workspace remained unchanged except for the intentionally untracked Grok handoff. Its SHA-256 remained `06546A97DBD43777F74EE641C53E2FF9882F89232648CDA046113E15CBB54804`.
- Original Production deployment remained `dpl_GvpXyBgeBjVxH5V4ETvxHVsgqLBp`, Ready, with the same Production aliases. No deployment, promotion, alias, or DNS change occurred.

### 2. Environment variable inventory — names/status only

| Variable | Production | Preview | Task 014B result |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | PRESENT | PRESENT | READY; canonical project reference verified |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | PRESENT | PRESENT | READY |
| `SUPABASE_SERVICE_ROLE_KEY` | PRESENT | PRESENT | READY; server-only |
| `GOOGLE_PLACES_API_KEY` | PRESENT | PRESENT | READY; enrichment remains disabled |
| `FMCSA_WEB_KEY` | PRESENT | PRESENT | READY |
| `ADMIN_SECRET` | PRESENT | PRESENT | READY; server-only |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE` | PRESENT after Task 014B | MISSING | READY; canonical repository value configured for Production |
| `CRON_SECRET` | PRESENT after Task 014B | MISSING | REQUIRED + READY; Production-only sensitive value |
| `MOVE_ENABLE_V2` | PRESENT after Task 014B | implicit Preview enable | READY; explicit Production `false` |
| `MOVE_ENABLE_REAL_PROVIDER_DATA` | PRESENT after Task 014B | implicit Preview enable | READY; explicit Production `false` |
| `MOVE_ENABLE_PUBLIC_READS` | PRESENT after Task 014B | implicit Preview enable | READY; explicit Production `false` |
| `MOVE_ENABLE_SAME_URL_COMPOSITION` | PRESENT after Task 014B | implicit Preview enable | READY; explicit Production `false` |
| `MOVE_ENABLE_GOOGLE_ENRICHMENT` | PRESENT after Task 014B | unset/default false | READY; explicit Production `false` |
| `MOVE_ENABLE_WEBSITE_ENRICHMENT` | PRESENT after Task 014B | unset/default false | READY; explicit Production `false` |
| `MOVE_ENABLE_INTERNAL_REVIEW` | PRESENT after Task 014B | explicitly/implicitly used for QA | READY; explicit Production `false` |

Preview and Production share the established canonical Supabase project and existing application credentials. Production differs intentionally through `VERCEL_ENV`, target identity, Production GA configuration, Production-only cron authentication, and explicit dark launch flags. Preview values were not blindly cloned.

### 3. Database configuration result

**READY for application serving; no direct PostgreSQL variable is required by the Production consumer runtime.** Repository-wide inspection found that Move 2.0 public reads consume the committed immutable `release-v2.json`. V1 server access uses `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY`. Direct `DATABASE_URL`/`SUPABASE_DB_URL` handling belongs to offline migration/operations scripts and the reviewer operations store. The reviewer route hard-404s when `VERCEL_ENV=production` before attempting a database read.

The canonical Supabase project reference matched the architecture, the build-time project guard passed, and a bounded read-only REST request returned HTTP 206 with a content-range header. No database write was performed. A direct PostgreSQL URL was not invented or added to Vercel.

### 4. MOVE_ENABLE flag matrix

| Flag | Feature | Default/unset | Preview | Production dry-run | Launch class | Risk if enabled | Impact if disabled |
|---|---|---|---|---|---|---|---|
| `MOVE_ENABLE_V2` | V2 consumer composition master gate | false, except Preview auto-true | true | false | REQUIRED FOR LAUNCH, enabled only during controlled cutover | exposes V2 surfaces | V1 remains active |
| `MOVE_ENABLE_REAL_PROVIDER_DATA` | immutable evidence-backed provider data | false, except Preview auto-true | true | false | REQUIRED FOR LAUNCH after release verification | activates real evidence reads | V2 real-data path unavailable |
| `MOVE_ENABLE_PUBLIC_READS` | public V2 discovery APIs | false, except Preview auto-true | true | false | REQUIRED FOR LAUNCH after internal validation | exposes public read APIs | APIs remain dark |
| `MOVE_ENABLE_SAME_URL_COMPOSITION` | V2 inside historical URLs | false, except Preview auto-true | true | false | REQUIRED FOR FINAL CUTOVER | changes consumer rendering on canonical URLs | V1 composition remains |
| `MOVE_ENABLE_GOOGLE_ENRICHMENT` | offline Google enrichment | false | false | false | KEEP DISABLED | request/paid enrichment risk | no launch impact |
| `MOVE_ENABLE_WEBSITE_ENRICHMENT` | offline bounded crawling | false | false | false | KEEP DISABLED | request-time crawl/security risk | no launch impact |
| `MOVE_ENABLE_INTERNAL_REVIEW` | reviewer console | false | QA-only | false | KEEP DISABLED | internal UI exposure risk | no consumer impact |

### 5. Analytics result

**READY.** `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE` is the preferred code path. The repository documents and exports one canonical Move stream ID; Task 014B configured that established value without printing it in the report. The legacy Production alias was present but did not match the canonical/known-typo classifications and was left untouched for auditability. Host-aware resolution prevents the Move stream from loading on the standalone Insurance host. Missing configuration falls back safely and cannot crash rendering. `GoogleAnalyticsRoot` is mounted once, and the client uses a single-init guard; initialization is deferred and does not alter SSR markup or hydration state.

### 6. CRON_SECRET applicability

**REQUIRED + READY.** `vercel.json` defines eight scheduled refresh invocations covering FMCSA, BBB, lender, and insurance refresh endpoints. The route handlers use shared authentication that accepts the Vercel bearer secret (or an authenticated admin session) and otherwise returns 401 before performing work. A strong random Production-only sensitive value was generated and stored through Vercel without being displayed, logged, committed, or copied to Preview. No cron endpoint was invoked.

### 7. Production-equivalent build results

- Dependency install/audit: PASS; 0 vulnerabilities.
- Move V2 lint: PASS.
- Move V2 typecheck: PASS.
- Move V2 unit/contract suite: **229/229 PASS**.
- Supabase canonical-project build guard: PASS.
- Next production compilation: PASS after approximately 7.2 minutes.
- Static generation: PASS, 1,880/1,880 pages.
- Vercel Production packaging: **FAIL** — `Unable to find lambda for route: /lender/sitemap.xml`.
- County schema under resolved Production environment: **FAIL**, 13 spot-check mismatches (12 Virginia records and Wyoming/Sweetwater).
- Canonical county metadata guard: PASS.
- County testimonial import/live guard: PASS.
- Read-only Supabase connectivity: PASS.

The Vercel packaging failure and county-data mismatches are launch blockers. No attempt was made to optimize, rewrite sitemap code, or modify county data during the launch gate.

### 8. SEO results

- Golden contract validator: **28/28 PASS**, correct Production canonical host, zero errors.
- Pre-launch live Production golden crawl from Task 014A: **28/28 PASS**.
- Canonical metadata guard: PASS.
- County SEO: **FAIL locally under the resolved Production environment** despite the frozen-head GitHub County SEO check being green; the runtime data discrepancy must be reconciled before cutover.
- Vercel packaging for `/lender/sitemap.xml`: FAIL, preventing a complete production-equivalent sitemap/route package proof.

### 9. Browser QA results

**FAIL / NOT COMPLETED.** The exact-head Preview deployment remained Ready, and Task 013/CI previously passed its desktop/mobile Playwright suites. For Task 014B, the required browser-control surface reported no available browser backend. Per browser safety rules, no unrelated browser mechanism was substituted. Fresh desktop/mobile console, hydration, asset, and interactive checks therefore cannot be claimed.

### 10. Remaining blockers

1. Resolve the Vercel Production build packaging error for `/lender/sitemap.xml` and prove `vercel build --prod` exits successfully.
2. Reconcile the 13 Production-environment county-schema spot-check mismatches without changing launch scope or inventing data; rerun the exact county gate to PASS.
3. Connect an approved browser backend and complete fresh desktop/mobile QA against the exact-head Preview.

### 11. Exact production cutover recommendation

Do not cut over. Fix only the two launch defects above on a reviewed candidate, rerun all frozen-head CI/SEO/county/build gates, and complete browser QA. If a code or evidence change is required, create a new reviewed launch SHA and rerun Task 014 gates; do not silently launch a SHA different from `419890c0acbfa4a8160360ca877c19209637190b`.

### 12. Rollback recommendation

No application rollback is required because no deployment occurred. Retain the explicit Production flags at `false`. If the newly added environment configuration itself must be reversed, remove only the Task 014B-added preferred GA name, cron secret, and seven explicit flags after recording their names/scopes; do not alter existing credentials or the current deployment. The current Grok deployment and domain aliases remain the application rollback baseline.

### 13. Final verdict

**BLOCKED — NOT READY FOR PRODUCTION CUTOVER.** Database, analytics, flag, cron, CI, focused tests, and the 28-URL SEO contract are ready. Production-equivalent Vercel packaging, Production-scoped county validation, and fresh browser QA are not ready.

## Task 014B.1

### Baseline and production preservation

- Starting SHA: `419890c0acbfa4a8160360ca877c19209637190b`.
- Isolated branch/worktree: `task-014-launch` at `C:\Users\makei\move-trust-hub-v2-launch`.
- Original dirty workspace and Grok handoff remained untouched; handoff SHA-256 remains `06546A97DBD43777F74EE641C53E2FF9882F89232648CDA046113E15CBB54804`.
- Production deployment, aliases, domain, DNS, database, and frozen Production environment variables were not changed.

### `/lender/sitemap.xml` root cause and decision

The route was an empty metadata sitemap left as a belt-and-suspenders artifact after LenderTrustHub became a standalone vertical. Move's root sitemap already excluded `/lender` and `/insurance`, and the migration contract already provides exact permanent handoffs to `www.lendertrusthub.com`. Classification: **legacy V1/migration support; dead sitemap route**. The empty native Move sitemap was removed. Exact `/lender` and `/lender/*` redirect behavior remains and is regression-tested; no speculative redirect was added.

The first repair exposed the same Next metadata-route/Vercel lambda collision in the legitimate local sitemap family. That family was converted to explicit route handlers, preserving `/sitemap-local/sitemap.xml` and `/sitemap-local/sitemap/{state}.xml` publicly while eliminating overlapping metadata-route ownership.

### Narrow cross-vertical audit

- Legitimate absolute AskTrustHub, LenderTrustHub, and InsuranceTrustHub CTAs remain.
- Exact legacy lender/insurance redirect rules remain.
- Move's sitemap/robots contract does not advertise specialist content as Move-owned.
- Six Move destination-guide links incorrectly used `/insurance/resources/guides/*`; each now targets the existing Move-owned `/resources/guides/*` equivalent.
- Dormant specialist implementation code remains behind the established host/prefix separation; it was not broadly deleted in this launch repair.

### County-schema reconciliation

| Route | Expected before | Actual before | Classification | Resolution |
|---|---|---|---|---|
| `/local-movers/virginia/fairfax-city` | Fairfax | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/henrico` | Henrico | Laurel | stale fixture | fixture aligned to locked override: Laurel |
| `/local-movers/virginia/richmond` | Richmond | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/spotsylvania` | Fredericksburg | Spotsylvania | data-contract difference | official courthouse locality set to Spotsylvania Courthouse |
| `/local-movers/virginia/hanover` | Mechanicsville | Hanover | stale fixture | fixture aligned to locked override: Hanover |
| `/local-movers/virginia/roanoke` | Roanoke | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/roanoke-county` | Salem | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/bedford-city` | Bedford | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/bedford` | Bedford | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/franklin` | Rocky Mount | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/richmond-county` | Warsaw | none | application defect | apply override after slug disambiguation |
| `/local-movers/virginia/franklin-city` | Franklin | none | application defect | apply override after slug disambiguation |
| `/local-movers/wyoming/sweetwater` | Rock Springs | Green River | stale fixture | fixture aligned to official county seat: Green River |

Result: `validate:county-schema` passes all 41 curated states and 1,776 spot checks; zero mismatches remain. A 13-route regression test was added.

### Verification

- Move V2 typecheck: PASS.
- Move V2 lint: PASS.
- Move V2 tests: 232/232 PASS.
- County SEO: PASS, zero unexplained mismatches.
- Production-equivalent Next build using Production-scoped configuration: PASS (1,829 pages).
- Vercel route packaging: **FAIL**. The original `/lender/sitemap.xml` failure is gone, and the repaired local sitemap routes are packaged. Vercel CLI 59.1.4 under Node 24 and Node 22, plus CLI 48.11.1, subsequently fail by asking for a lambda for different statically generated `/moving-to/*` pages (`alabama`, `alaska`, `arkansas`). This is now a broader Vercel local packager/static-route incompatibility, not the repaired sitemap route.
- Existing Playwright 1.62.1 production-build harness: PASS after a production-equivalent V2-enabled QA build. Full suite: 17 passed with one recovered mobile timing retry. Focused rerun after increasing the visibility wait to the suite's established 15-second hydration allowance: 6/6 PASS.
- Desktop QA: PASS. Mobile QA: PASS. Fresh evidence is under `test-results/task-014b1/screenshots` (generated, not committed).
- SEO golden browser suite: 28/28 PASS on both desktop and mobile.

### Seven Production flags and launch impact

| Flag | Current Production | Feature unavailable while false | Core launch requirement? | Recommended launch value |
|---|---:|---|---:|---:|
| `MOVE_ENABLE_V2` | false | V2 orchestration | yes | true at Task 014 phase 6 |
| `MOVE_ENABLE_REAL_PROVIDER_DATA` | false | approved provider release reads | yes | true at phase 6 |
| `MOVE_ENABLE_PUBLIC_READS` | false | consumer discovery APIs | yes | true after internal validation |
| `MOVE_ENABLE_SAME_URL_COMPOSITION` | false | V2 on historical URLs | yes | true only after public-read gate |
| `MOVE_ENABLE_GOOGLE_ENRICHMENT` | false | Google enrichment | no | false |
| `MOVE_ENABLE_WEBSITE_ENRICHMENT` | false | website crawling/enrichment | no | false |
| `MOVE_ENABLE_INTERNAL_REVIEW` | false | reviewer UI | no | false |

No Production flag was changed. The first four are intentionally dark now but must be enabled sequentially during the controlled cutover; the last three remain disabled.

### Verdict and recommendation

- New code/evidence commit: the final `task-014-launch` HEAD containing this section (exact SHA recorded in the Task 014B.1 handoff).
- Database: READY. Analytics: READY. CRON secret: READY.
- CI on starting SHA: PASS. New-branch CI must be observed after push.
- Remaining blocker: a successful Vercel production-equivalent route-package proof for the static `/moving-to/*` family.
- Verdict: **BLOCKED — NOT READY FOR TASK 014C**. Reproduce the static-route packaging failure in Vercel's remote non-production build environment or align the local build adapter with the project-supported Vercel runtime; do not deploy or alter Production.
