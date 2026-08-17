# Task 012 — V1→V2 migration, SEO, and parity report

Date: 2026-08-17
Branch: `move-2.0`
Starting head: `54f040a60cae5321e72685e871e9d629ea06fb73`

1. **V1 routes inventoried:** 2,694 unique public URLs, legacy redirect sources, and repository route patterns from independent live sitemap, local sitemap, App Router, redirect, robots, navigation/internal-link, and generated-route sources.
2. **Indexable routes inventoried:** 2,421 live sitemap URLs: 676 main-sitemap entries plus 1,746 local entries, with one overlap removed.
3. **Route families:** 1,695 county/local, 529 moving-to, 51 state, 50 provider, 49 route guides, 14 resources, 13 auto, 6 guides, 3 legal/contact, 2 quote tools, 2 mover-directory, and the homepage/calculator/compare/DOT/about surfaces; 346 repository route files were independently inspected.
4. **Same-URL preserves:** 2,354 `PRESERVE_AS_IS`, 2 `REBUILD_IN_V2_SAME_URL` (homepage and local mover entry), and 2 same-intent merges (compare and DOT verification). Default contract is same URL.
5. **301 migrations:** 140 route/pattern classifications, predominantly already-separated lender/insurance hub routes plus methodology and destination aliases. The explicit redirect matrix requires one hop. Next’s current permanent implementation emits 308; literal 301-versus-permanent-308 edge policy is a P1 decision.
6. **Retirements:** 0 with 410; 0 unrelated homepage redirects. No valuable public route is retired by Task 012.
7. **Unmatched routes:** 0 unclassified routes. There are 16 unmatched historical provider identities, which remain V1 rather than becoming 404.
8. **Provider URLs inventoried:** 50 live `/companies/*` and `/company/*` URLs observed by the provider-mapping crawl.
9. **Provider identity matches:** 33 exact USDOT→stable Move V2 provider matches. Canonical remains the historical human-readable slug; provider ID is internal.
10. **Provider identity review cases:** 1 multi-identifier review and 16 unmatched. No fuzzy SEO merge. All 17 stay on V1 until evidence resolves them.
11. **State pages:** 51 preserved at the same URLs. V2 data modules may be added where evidence exists; content availability is separate from state-verified search eligibility.
12. **County/local pages:** 1,695 preserved. FL/WA may receive verified search modules; other states retain useful informational content without unsupported verification claims.
13. **Moving-to pages:** 529 preserved. Existing one-hop aliases remain in the redirect matrix.
14. **Guides/articles:** 69 guide/resource/route-guide URLs preserved with author/date/citation/internal-link/metadata intent. No mass rewrite.
15. **Tools:** Moving calculator, quote checker, compare, DOT verification, and Move Plan routes are retained. No tool is removed at launch.
16. **Move Plan parity:** `/my-move`, saved plan IDs/bookmarks, login/create-password, reports, inventory, and persistence exist in V1. V2 has no replacement workflow. Classification: `CAN_REMAIN_V1_DURING_TRANSITION`; preserving saved state is launch-required.
17. **ZIP planner parity:** Current ZIP/origin planning is embedded across Move Plan and V2 search. Preserve V1 planner behavior; compose V2 origin resolution without changing saved-plan URLs. `REQUIRED_BEFORE_LAUNCH` for the search entry, not for a planner rewrite.
18. **Inventory/cubic calculator parity:** `/moving-calculator` is indexable, canonical, structured as `WebApplication`, and linked from destination content. Preserve unchanged; `REQUIRED_BEFORE_LAUNCH` regression coverage, no rewrite.
19. **Comparison parity:** `/compare` and quote-check comparison exist; Task 008 provides factual 2–4 mover comparison with no winner. Merge V2 evidence fields at the same URL; launch-critical.
20. **DOT verification parity:** `/verify-dot` remains canonical and indexable. V2 federal evidence can enhance it at the same URL. Dedicated MC-only UX is P2. A broken `/suggest` link was found and corrected to `/contact`.
21. **Auto transport parity:** 13 sitemap URLs preserved. Task 002A regulatory roles may enhance Trust Reports later; current surface can remain V1 during core launch.
22. **Portable/container parity:** `/companies/pods` and `/companies/units-moving-portable-storage` are preserved. They remain outside HHG eligibility logic; a dedicated identity model is P2.
23. **Structured-data findings:** Golden set observed Organization and WebSite on 28/28; BreadcrumbList 22; WebPage 20; FAQPage 12; ItemList 8; Service 6; AdministrativeArea 5; HowTo 4; LocalBusiness/CollectionPage/City/Article each 3; WebApplication and AboutPage each 1. Keep Organization/WebSite/Breadcrumb/Article/ItemList/WebApplication; improve Service and LocalBusiness scope; retain FAQ only where visible and eligible; remove any unsupported schema rather than preserving invalid markup.
24. **Canonical findings:** 28/28 golden pages have Production-host canonicals; no Preview/localhost canonical. Apex `movetrusthub.com` redirects 308 to current canonical `https://www.movetrusthub.com`.
25. **Sitemap findings:** Main and 51-way local index return 200. Launch grouping contract: static/core, providers, states/counties, guides, tools, and auto. Only approved current-release, 200, canonical, indexable, non-redirect URLs may appear.
26. **Robots findings:** Production allows public crawl, disallows admin/API/internal asset paths, declares www host and both Move sitemaps. Preview V2 is page-level noindex and has no Preview canonical. Production must not inherit Preview blocking.
27. **Internal-link findings:** Bounded crawl across 28 golden sources found 300 unique links and checked 300. It found one real broken `/suggest` link and seven intentional cross-hub/auth redirects; no Preview/internal/localhost links. The broken link is fixed in the candidate.
28. **Broken-link count:** Production baseline 1; proposed candidate 0 for the detected link. Migration Playwright found zero golden-set route failures.
29. **Analytics continuity:** Preserve Move GA4 stream `G-433BDVV8MJ`, SPA page views, Vercel Analytics, and Speed Insights. Required V2 events: search, path selection, Trust Report/source open, compare add/view, shortlist, calculator start/complete, Move Plan start, website click, and phone click. Analytics contract rejects addresses, contact data, inventory contents, and exact move dates.
30. **Production host contract:** `https://www.movetrusthub.com`; no host change in launch sequence.
31. **Feature flag contract:** Explicit defaults/Preview/launch values exist for all five Move flags. Internal review and enrichment stay Production-off; V2 and real evidence reads turn on only after gates; experimental-derived is hard false, never client-enableable.
32. **Environment variable contract:** Names-only contract is in the cutover runbook. Public Supabase and Move GA identity are Production-required; database/service keys are server-only; admin/cron/source keys internal-only; review/browser/enrichment controls Preview/offline-only. No values were printed or committed.
33. **Database cutover model:** Additive Move V2 schema, immutable approved full release, separate current pointer, compatibility adapter for V1 reads, no destructive V1 migration. Task 011’s eight-provider pilot is proof only, not a public full release. Rehearsal exposed a missing legacy `companies.usdot_status` compatibility field, now a P1 closure item.
34. **Recommended cutover strategy:** **HYBRID: route-by-route + server feature flags + immutable release pointer**. Big bang rejected as unnecessary SEO/rollback risk.
35. **Rollback architecture:** Disable route composition/read flag, restore prior immutable pointer, select prior V1 implementation, preserve all V2 evidence, purge bounded HTML caches, rerun golden set. Triggers and steps are explicit in the runbook.
36. **SEO golden set:** 28 live URLs; 28/28 status 200 and canonical/indexable. Includes homepage, 5 provider pages, 3 state, 5 county/local, 3 moving-to, 3 guides, calculator, Move Plan, compare, DOT, auto, portable, about, and methodology.
37. **Migration Playwright:** PASS — 28 statuses/canonicals/headings/noindex checks, one-hop permanent redirects, sitemap/robots exclusions, and Preview noindex.
38. **Mobile QA:** Existing 390×844 consumer journey remains the launch mobile baseline; cards, Trust Report, compare, shortlist, unsupported states, invalid/cross-county ZIP, tap targets, and overflow are covered.
39. **Accessibility smoke:** Existing named controls/dialog/focus behavior plus migration heading checks pass. This is a smoke assessment, not WCAG certification.
40. **Security/public-internal isolation:** PASS. Reviewer console, service-role commands, audit/jobs, debug, and experimental-derived surfaces are excluded/noindex/404 by Production contract. Public APIs are bounded sanitized reads only and remain disabled until the P1 rate-limit/flag gate.
41. **Performance findings:** Warm live golden capture median response 120 ms, max 1,097 ms. Earlier cold observations reached roughly 5 seconds on large provider/destination pages. Local rehearsal logs also show >2 MB cache entries and a V1 compatibility-query fallback; provider payload/cache sizing and compatibility are launch P1/P2 work, not a reason to change URLs.
42. **P0 blockers:** 0.
43. **P1 launch requirements:** 9 groups: route composition, sanitized/rate-limited Production reads, provider identity review, full 86-provider immutable release, DB compatibility adapter, homepage/navigation, analytics events, redirect/canonical decision, sitemap release selection, and final cross-environment rehearsal (grouped in the gap register).
44. **P2 post-launch items:** Reviewer SSO/RBAC, central Move Plan redesign, MC-specific UX, auto redesign, portable identity model, provider consolidation, performance work, and expanded accessibility automation.
45. **Migration matrix:** `docs/task-012-v1-v2-migration-matrix.csv` contains 2,694 classified rows/patterns and all required fields.
46. **Cutover runbook:** `docs/move-v2-cutover-runbook.md` contains checkpoints, flags, ordering, redirects, sitemap/robots, smoke, analytics, rollback triggers/procedure, and Search Console follow-up.
47. **V1 integrity:** PASS — read-only Production audit only; no V1 data/schema/write operation.
48. **Commercial firewall:** PASS — paid/subscription/rating/review inputs have no route, canonical, sitemap, provider identity, or search effect.
49. **Experimental-derived isolation:** PASS — excluded from golden set, sitemaps, APIs, and launch flags; NJ/Illinois remain excluded from verified local eligibility.
50. **Tests:** PASS locally: lint, typecheck, 215/215 tests, 28/28 SEO golden validation, production build (8 GB Node heap required for 1,880 static pages), consumer Playwright 2/2, reviewer Playwright 1/1, migration Playwright 3/3, and diff check.
51. **Commits:** `13152687` — Define V1 to V2 cutover contract. A final report-status commit records remote gates without changing the contract.
52. **CI:** Pending pushed-head result.
53. **Vercel Preview:** Pending pushed-head result.
54. **Production changes:** **NONE**.
55. **Task 012:** **PASS** as a migration contract/rehearsal; launch itself remains correctly blocked on P1 closures.
56. **Ready for Task 013?** **YES**.
57. **Exact Task 013 recommendation:** Implement the P1 launch-candidate integration only: full 86-provider immutable release, V1 database compatibility adapter, same-URL homepage/local-search composition, sanitized rate-limited reads, provider identity review routing, privacy-safe analytics events, and Production-like cutover/rollback rehearsal. Do not add states, SEO pages, SSO, or derived geography.

Supporting artifacts:

- `docs/task-012-v1-v2-migration-matrix.csv`
- `docs/task-012-provider-url-identity-map.csv`
- `docs/task-012-redirect-matrix.csv`
- `docs/task-012-production-seo-golden-baseline.json`
- `docs/task-012-internal-link-audit.json`
- `lib/move-v2/migration/seo-golden-set.json`
- `docs/task-012-launch-gap-register.md`
- `docs/move-v2-cutover-runbook.md`
