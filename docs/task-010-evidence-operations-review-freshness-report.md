# Task 010 — Evidence operations, review, and freshness report

Date: 2026-08-17  
Branch: `move-2.0`  
Starting head: `19d9d6654dbf135edba43003a8fc8fc88cec5d73`

1. **Starting review inventory:** 34 location-review providers; 22 website-review candidates; 5 explicit-service providers. Baseline verified locations remain 52 and accepted official websites remain 6.
2. **Final review inventory:** 34 honest location cases remain open. Task 010 did not lower thresholds or manufacture resolutions. The operational fixture also exposes 22 website-identity and 6 service-geography review examples within the bounded queue.
3. **Review case types:** `LOCATION_CONFLICT`, `IDENTITY_CONFLICT`, `WEBSITE_IDENTITY`, `CONTACT_CONFLICT`, `BRANCH_RELATIONSHIP`, `SERVICE_GEOGRAPHY`, `STATE_AUTHORITY`, `SOURCE_FRESHNESS`, and `OTHER_RESEARCH_REVIEW`; explicit seven-state status contract and high/medium/low priority.
4. **Reviewer decision model:** Append-only decisions cite an evidence fingerprint plus selected/rejected observation IDs. Supersession points to the prior decision and preserves history. Database update/delete triggers enforce immutability.
5. **Decisions made during bounded pilot:** Zero real-provider decisions. Browser QA appended one synthetic, in-memory `KEEP IN REVIEW` decision; it made no database or provider mutation.
6. **Branch records created:** Zero real branches. The branch schema and tested constructor require source observations and explicitly set `inheritsFleet=false` and `createsServiceArea=false`.
7. **Website-review cases:** 22 represented in the operational queue baseline. Accept/reject/affiliation outcomes use the common append-only decision history; no candidate was accepted in Task 010.
8. **Service-area-review cases:** Six bounded console examples. Exact classifications require provider-published raw text and source URL; reviewer intuition cannot create geography.
9. **Internal console implementation:** `/experience-lab/v2/internal/review` provides health cards, queue, state/type/provider/reason filtering, source comparison, current consumer value, review controls, and decision history.
10. **Internal access controls:** Requires both Move V2 and the dedicated `MOVE_ENABLE_INTERNAL_REVIEW` flag; server returns 404 in Vercel Production. Operational tables have RLS and revoke `anon`/`authenticated`. There is no public write endpoint.
11. **Freshness policy versions:** `MOVE_EVIDENCE_FRESHNESS_2026_08_V1`, with soft/hard expiry, consumer behavior, retry interval, and failure escalation per source.
12. **FMCSA refresh policy:** 30-day soft / 60-day hard interval; 24-hour retry; three failures escalate; stale current-authority evidence excludes rather than falsely asserting current verification.
13. **FL refresh policy:** 14-day soft / 30-day hard interval; 12-hour retry; three failures escalate; stale authority excludes pending refresh.
14. **WA refresh policy:** 14-day soft / 30-day hard interval; 12-hour retry; three failures escalate; stale authority excludes pending refresh.
15. **Website refresh policy:** 90-day soft / 180-day hard interval; 72-hour retry; hard expiry labels pending/reviews and does not rewrite regulatory facts.
16. **Service-geography refresh policy:** 90-day soft / 180-day hard interval; selective refresh; removed or materially changed explicit text triggers release invalidation and review where ambiguous.
17. **Job types implemented:** FMCSA, FL authority, WA authority, website validation, website service geography, and consumer discovery rebuild.
18. **Scheduling status:** Disabled. No Production cron or live recurring job was enabled.
19. **Dry-run refresh results:** Bounded synthetic execution processed two items across checkpoints, completed on resume, no-op'd after completion, and retained cursor zero after a simulated first-item source failure.
20. **Source change events:** Versioned contract stores provider, source, field, old/new observation, detection time, materiality, consumer impact, and review requirement.
21. **Material-change logic:** Authority, primary location, explicit geography, display identity, and primary contact can rebuild; identity/location/website/service conflicts can open review. Format-only phones and title-only metadata are non-material.
22. **Discovery invalidation behavior:** Authority/location/explicit-service changes rebuild. Page-title, subscription, rating, and review-count changes do not. Commercial inputs never enter the dependency decision.
23. **Stale authority behavior:** Hard-stale regulatory evidence is not displayed as current; the provider is excluded pending refresh with neutral “Verification refresh pending” language.
24. **Source-outage behavior:** `SOURCE_UNAVAILABLE` preserves the last official observation and never translates to inactive, unlicensed, or closed.
25. **Freshness dashboard:** Shows open/high-priority cases, authority due, failed jobs, and current release age; queue provides oldest-case dates and affected providers.
26. **Review metrics:** Open 34; resolved 0; reopened 0; location review 34; website review 22; service review 6. Providers blocked from proximity remain represented rather than falsely verified.
27. **Consumer/internal data separation:** Public release regression confirms no reviewer, internal note, assignment, conflict-analysis, job-control, or experimental-derived fields.
28. **Playwright reviewer-console QA:** PASS, Chromium desktop 1440×900. Queue, filters, case open, evidence display, synthetic action, decision history, and derived-text absence validated.
29. **Consumer browser regressions:** PASS, Chromium desktop 1440×900 and mobile 390×844; the complete Task 009 evidence-first journey remains green.
30. **Operations runbook:** `docs/move-v2-evidence-operations-runbook.md` documents refreshes, cases/decisions, staleness, rebuild, failure recovery, superseding a bad normalization, outages, and Production-isolation checks.
31. **Idempotency:** PASS — completed fingerprint no-op, checkpointed resume, release rules unchanged, duplicate decision ID ignored.
32. **V1 integrity:** PASS — historical derived records and model status were not modified.
33. **Commercial firewall:** PASS — subscription, ratings, and reviews neither invalidate nor influence consumer discovery.
34. **Evidence immutability:** PASS — source observations remain unchanged; SQL ledger/change events reject update/delete.
35. **Experimental-derived isolation:** PASS — ordinary reads contain no experimental-derived geography; no V2 derived model created.
36. **Public/internal separation:** PASS — route/flag/RLS controls and public-response regression verified.
37. **Tests:** PASS — lint, Move V2 typecheck, 191/191 unit/domain tests, production build, 2/2 consumer browser tests, 1/1 reviewer browser test, and `git diff --check` (final delivery check).
38. **Commits:** `c00f93fa` (evidence operations implementation) and `b74e8adf` (CI streaming-state browser stabilization), followed by the report-close commit.
39. **CI:** PASS — push run `32053133383` and PR run `32053136220` both succeeded on `b74e8adf`, including lint, typecheck, 191 tests, build, both browser suites, artifact upload, default-off gates, and critical dependency audit.
40. **Vercel Preview:** PASS / Ready — Vercel status and Preview Comments both succeeded for `b74e8adf`.
41. **Production changes:** **NONE**.
42. **Task 010:** **PASS**.
43. **Ready for Task 011?** **YES**.
44. **Exact Task 011 recommendation:** Run a bounded authenticated-operations pilot: connect the private ledger/jobs to the Preview database with service-role-only commands, execute supervised FL/WA refresh samples, resolve a small evidence-cited case set, measure queue throughput and source reliability, and validate release rebuild/rollback end to end without expanding states or enabling derived geography.
