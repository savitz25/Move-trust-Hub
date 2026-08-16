# Task 001 report — MoveTrustHub 2.0 foundation

Date: 2026-08-16. Scope stops before Task 002.

1. **Baseline** — `savitz25/Move-trust-Hub`; starting remote commit `a788b03c8c7f878388abf1f2e62f0f96a1b12521`; clean isolated worktree branch `move-2.0`. The original checkout was on local `main` at `5ae34bfa`, 11 commits behind, with unrelated modifications/untracked audits; it remains untouched.
2. **Current V1 architecture** — Next.js 15 App Router, React 19, TypeScript, npm, Tailwind, Supabase/PostgreSQL, Vercel, GA4 plus Vercel analytics tooling. Existing capabilities include FMCSA/QCMobile refresh and Verify DOT, Google Places API (New), Supabase company/enrichment snapshots, company directory/profiles, compare, local state/county discovery, inventory/Move Plan, route/destination SEO, provider portal/claim, reviews, auto transport, and large static sitemap generation.
3. **Production safety** — GitHub default branch is `main`. GitHub deployment evidence labels the latest `main` commit `a788b03c` as Vercel Production; non-production Git branches are expected to produce Preview deployments. V2 route additionally refuses `VERCEL_ENV=production`. No production deployment, URL, data, or environment was changed.
4. **V2 structure** — `lib/move-v2`, additive `move_v2` SQL schema, synthetic `/experience-lab/v2`, isolated tests/docs/CI workflow, four off-by-default server flags.
5. **Provider identity model** — UUID `provider_id` spine; separate source records, names, addresses, contacts, locations, classifications, state authority, service areas, and external identities. Optional `organization_id` supports future console ownership.
6. **USDOT / MC model** — typed USDOT/MC/MX/state-license observations with issuing jurisdiction, provenance, and seen timestamps; none is the internal primary key.
7. **Legal / DBA / display rule** — legal and DBA names are preserved separately. Credible official DBA is display name; otherwise legal name.
8. **Local carrier classification** — active carrier lacking interstate HHG authority becomes `LOCAL_INTRASTATE_CARRIER_CANDIDATE`, pending state evidence, never automatically invalid.
9. **Interstate carrier classification** — requires active registration and valid federal interstate HHG carrier authority.
10. **Broker classification** — uses broker-specific authority; an active valid broker is distinct from a carrier. Inactive broker authority cannot appear active.
11. **Dual role** — requires both valid carrier HHG and broker authorities.
12. **Move-type eligibility** — local/intrastate/interstate/unknown is evaluated before eligibility; interstate requires valid carrier authority and local eligibility can require applicable state authority.
13. **State authority** — adapter-ready table supports jurisdiction, identifier/type/status, dates, source and last check. No 50-state coverage is claimed.
14. **Provenance** — source type/reference/URL, retrieved/effective time, confidence, and derivation version; immutable source snapshots are separate from normalized records.
15. **Freshness** — independent FMCSA, state, Google, and official-site timestamps in the profile contract.
16. **Business contacts** — multiple original and normalized phones, emails, and websites survive merge with labels, timestamps, status/confidence, and provenance. No inferred email.
17. **Google Places audit** — existing API (New) endpoints, masks, `GOOGLE_PLACES_API_KEY`, retry/backoff, five-candidate search, 14-query ceiling, scoring thresholds, and Supabase persistence are reused. Key is server-only.
18. **Google matching** — DBA/legal name plus address, phone, domain and location signals; name-only conflict is `IDENTITY_REVIEW`; corroborated score can auto-accept.
19. **Official website validation** — Google-returned site is only a candidate; provider signals and regulatory identifiers validate ownership before `VERIFIED`.
20. **Website enrichment** — adapter contract returns observed contacts, published services/areas, source URLs; no crawl was run.
21. **Crawler security** — HTTPS, same-domain, robots-aware, 10-page/2 MB/8-second/3-redirect defaults; private IP/DNS-rebinding checks required; no auth/forms/JS/unbounded recursion.
22. **Service areas** — regulatory allowed, provider-published, and TrustHub-derived search scopes are explicit and cannot be conflated.
23. **Profile read model** — identity, move eligibility, authority, contacts, business identity/locations/services, evidence, and per-source freshness.
24. **Move Plan** — shared PII-free context and stable stages from Route through Claims; reuses future provider IDs and existing V1 persistence boundaries.
25. **Estimate Analyzer** — future document types and explicit provider identity-resolution status connect documents to `provider_id`; analyzer itself was not built.
26. **V1 migration inventory** — documented in `docs/movetrusthub-v2-migration-inventory.md`, including directory/profile, DOT, compare, local/state/county, moving-to, calculator/inventory, Move Plan, guides, auto, and container surfaces.
27. **SEO preservation** — same intent keeps the same URL; redirects only for genuine moves after analytics/canonical review. No redirect created.
28. **Trust participation** — future claim/correction/submitted data attaches separately and never overwrites government evidence or implies quality/endorsement.
29. **Provider Console** — stable provider/organization/location/contact/source IDs avoid a later identity rebuild.
30. **Commercial firewall** — **PASS**. Commercial schema/grants and public decision code are separate; public logic has no billing input; regression 15 locks invariance.
31. **Synthetic Experience Lab** — ten unmistakably synthetic scenarios cover interstate, local candidate, state-verified local, broker, dual role, inactive, review, DBA, multi-contact, and Places/site enrichment. Noindex, Preview flag, Production 404.
32. **Regression tests** — all 15 pass: (1) local candidate, (2) interstate carrier, (3) inactive carrier, (4) active broker, (5) inactive broker, (6) dual role, (7) DBA display/legal preserved, (8) legal fallback, (9) name-only conflict review, (10) corroborated Places auto-match, (11) website area is provider-published, (12) site claim cannot change authority, (13) multiple contacts retained, (14) absent email remains absent, (15) subscription cannot affect public decision.
33. **Security** — no secret committed; Preview env is gitignored; server-only feature/enrichment keys; commercial grant isolation; crawler SSRF contract; no crawl/PII/real-provider feed. Dependency audit reduced immediately fixable findings; three high advisories remain in Next 15 transitive PostCSS/Sharp and require a separately scoped breaking Next 16 upgrade.
34. **Migrations** — one additive, unapplied migration creates `move_v2` and `move_v2_commercial`; no V1 table changed. RLS enabled; public commercial grants revoked.
35. **Tests** — V2 tests 15/15; scoped V2 TypeScript PASS; scoped lint PASS after warnings fixed; `git diff --check` PASS. Repository-wide TypeScript remains red on extensive pre-existing V1/data/script errors. Full local build exceeded 10 minutes on the existing large SSG surface without emitting a failure before the execution timeout.
36. **Commits** — recorded in branch Git history after implementation.
37. **CI run** — `Move V2 foundation` workflow added for push/PR; final run recorded after push.
38. **Preview URL** — recorded after Vercel Preview deployment.
39. **Production changes** — **NONE**.
40. **Blocking issues** — no Task 001 domain blocker. Baseline repository-wide type debt and a future breaking Next security upgrade are follow-ups; migration remains deliberately unapplied until a future authorized database rollout.
41. **Ready for Task 002 — FMCSA data spine?** — **YES**, contingent on Task 002 explicitly authorizing its ingestion scope and migration application. Do not begin automatically.
