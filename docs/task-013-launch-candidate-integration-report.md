# Task 013 — Launch-candidate integration report

Date: 2026-08-17
Branch: `move-2.0`
Production writes/deployments: **NONE**

1. **Starting P1 register:** 10 Task 012 groups: full release, DB compatibility, same-URL composition, hardened reads, provider routing, analytics, redirects, sitemap selection, homepage/navigation, and cross-environment rehearsal.
2. **Ending P1 register:** 0. Each starting item is implemented and rehearsed. Broader performance projection work and reviewer SSO remain P2 and are not required by the launch contract.
3. **Full release version:** `MOVE_CONSUMER_DISCOVERY_2026_08_V2`. V3 was not created because approved evidence content did not change; renaming identical evidence would violate the versioning rule.
4. **Providers expected:** 86.
5. **Providers published:** 86; missing diff 0, duplicate diff 0.
6. **FL count:** 41.
7. **WA count:** 45.
8. **Verified-location count:** 52.
9. **Review-location count:** 34. These providers remain researchable without coordinates or fake distance.
10. **Explicit-service count:** 5.
11. **Representative Tier distributions:** 33401: A0/B7/C34; 32801: A1/B5/C35; 98101: A2/B22/C21; 99201: A0/B2/C43.
12. **V1 DB compatibility fields audited:** IDs, slugs, names, USDOT, `usdot_status`, authority/out-of-service, phone, website, headquarters/physical address, plus homepage, company, compare, DOT, local-mover, calculator and Move Plan handoffs.
13. **`usdot_status` resolution:** Three-stage non-destructive projection plus read adapter. Missing values derive from authority/out-of-service evidence; source rows remain unchanged.
14. **Same-URL surfaces composed:** `/`, `/local-movers`, exact-mapped `/companies/[slug]`, `/compare`, and `/verify-dot`; FL/WA search is composed at `/local-movers`. Existing compare/DOT surfaces remain at their historical URLs.
15. **Exact provider mappings enabled:** 33 exact-USDOT mappings; historical slugs remain canonical.
16. **Historical provider fallbacks:** 1 identity review + 16 unmatched remain V1; no fuzzy merge, redirect, or 404.
17. **Public API routes enabled in rehearsal:** ZIP resolve, local/interstate search, Trust Report, and compare. All remain server-flag controlled and default off outside the candidate configuration.
18. **Sanitization results:** Public Trust Reports omit review decisions, conflicts, evidence snapshots, reviewer/job/change metadata, raw operations data, service credentials, and experimental geography.
19. **Rate-limit policy:** Per operation and best available proxy client IP; 60-second window: ZIP 60, search 40, provider 120, compare 30, federal 30. Normal research is anonymous. Excess returns redacted 429; unexpected limiter/read failure returns redacted 503 and never changes eligibility.
20. **Malformed-input results:** Strict 5-digit ZIP, UUID provider identifier, deduplicated compare list of 2–4. Malformed/excessive values return 400 without stack/DB details.
21. **Analytics events implemented:** `move_search`, `move_path_selected`, `trust_report_open`, `source_open`, compare add/view, shortlist add/remove, calculator start/complete, Move Plan start, provider website click, and provider phone click.
22. **Analytics privacy verification:** Only state, coarse move path/tier, opaque provider ID, source type, count, page path and calculator type are allowed. ZIP, addresses, contact values, dates, inventory and free text are rejected. Optional session keys suppress duplicates. GA identity remains `G-433BDVV8MJ`; Vercel Analytics and Speed Insights remain intact.
23. **Redirect status decision:** Approve Next/Vercel permanent **308**. It is cacheable/permanent, preserves method/query behavior, and is the platform's actual contract; documentation/tests no longer pretend it is literal 301.
24. **Redirect chains/loops:** 0/0; targets are one-hop canonical 200 pages.
25. **Candidate sitemap URL count:** 2,421 approved indexable V1 URLs from the locked matrix. Release selection excludes redirects, duplicates, API/internal/Preview, noindex, and unsupported generated V2 URLs.
26. **Robots validation:** Production crawl contract retained; Preview noindex retained; internal/API routes excluded.
27. **Canonical validation:** `https://www.movetrusthub.com`; Preview never becomes canonical or sitemap host.
28. **Homepage composition:** Existing SEO content remains. A flag-controlled origin/destination ZIP research entry adds “We cite. You decide.” and no-paid-placement framing without a lead form.
29. **Move Plan preservation:** `/my-move`, saved plan URLs, auth/create-password, reports and persistence remain unchanged.
30. **Calculator preservation:** `/moving-calculator`, canonical/schema intent and deep-link behavior remain unchanged.
31. **Performance/cache findings:** The 5,947,836-byte cross-request company-directory Data Cache item caused the >2 MB warning. Task 013 removes only that invalid cache layer; React request dedupe and route/CDN caching remain. Public V2 responses use bounded projections and never serialize location review ledgers.
32. **Largest cache entry before/after:** Before 5,947,836 bytes; after no oversized company-directory Data Cache entry. Large route payload/build pressure remains P2 for bounded directory projection work.
33. **Build memory/time:** Final patched-dependency candidate build completed in approximately 175 seconds with an 8 GB local Node heap for 1,880 static pages. This remains the safe build envelope; no pages or URLs were removed.
34. **Production-like environment check:** Required variable names are documented. Local environment file contains Supabase public/server variables; GA uses the canonical code fallback because the optional Move-specific variable is absent. Candidate flags are explicit and injected only into rehearsal. Values/secrets were never printed.
35. **Cutover rehearsal result:** PASS — approve immutable release, validate environment/baselines, enable read/composition flags, select V2 release/candidate sitemap, then exercise consumer/provider/local/compare/DOT/calculator/Move Plan/auto/unsupported/internal/rate-limit paths.
36. **28-URL golden result after cutover:** 28/28 PASS.
37. **Rollback rehearsal result:** PASS — flags/pointers/sitemap selection returned to V1 state while V2 evidence remained immutable.
38. **Golden result after rollback:** 28/28 PASS.
39. **Rollback duration observation:** Local state/pointer simulation completed in under one second; this is not a Production SLA and cache propagation would add operational time.
40. **Failure-injection results:** Release unavailable, DB compatibility failure and missing mapping fall back to V1; public read/limiter errors return neutral 503. All preserve global 200 behavior, avoid mass 404, and redact secrets.
41. **Internal/public separation:** PASS. Operations writes, notes, reviewer identities and job controls remain absent from public APIs. Internal console remains Production-disabled.
42. **Security checks:** Input validation, rate enforcement, safe errors, server-only credentials, security headers, no public write endpoint, internal isolation and client-bundle credential regression covered. Patched PostCSS 8.5.26 and Sharp 0.35.3 are forced within Next 15; `npm audit --omit=dev --audit-level=high` reports 0 vulnerabilities.
43. **Commercial firewall:** PASS. Subscription, payment, advertising, rating/review counts and profile completeness affect none of eligibility, tier, distance, order, mapping, canonical, sitemap, warnings or geography.
44. **Experimental-derived isolation:** PASS; off in release, reads, same-URL composition and sitemap.
45. **NJ/IL exclusion:** PASS for state-verified local eligibility; informational V1 content remains preserved.
46. **P0 remaining:** 0.
47. **P1 remaining:** 0.
48. **P2 deferred:** bounded directory projection/build-memory optimization; reviewer SSO/RBAC; broader performance/accessibility work; Move Plan/auto/portable redesigns; unresolved provider identity research.
49. **Tests:** 229/229 unit/contract tests PASS; lint, Move V2 typecheck, SEO validation, build, diff check and dependency audit PASS.
50. **Playwright:** Consumer desktop/mobile 2/2, reviewer 1/1, migration 3/3, launch candidate 2/2 and rollback 2/2 PASS.
51. **Commits:** Pending delivery commit record.
52. **CI:** Pending pushed-head result.
53. **Vercel Preview:** Pending pushed-head result.
54. **PR status:** Must remain OPEN + DRAFT.
55. **Production changes:** **NONE**.
56. **Task 013:** **PASS** subject to final local/remote gates.
57. **LAUNCH CANDIDATE READY?** **YES** subject to final local/remote gates.
58. **Ready for Task 014?** **YES** after final gates.
59. **Exact Task 014 recommendation:** Production launch authorization and monitored hybrid cutover only: take the V1/database checkpoint, verify the approved 86-provider V2 release, enable the documented public-read and same-URL flags route-by-route, activate the approved 308/sitemap selection, validate analytics/28-URL golden set, monitor errors/Search Console, and retain immediate flag/pointer rollback. Add no states, SEO expansion, derived geography, or feature redesign.
