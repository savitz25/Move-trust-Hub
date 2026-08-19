# Task 011 — Authenticated operations pilot report

Date: 2026-08-17  
Branch: `move-2.0`  
Starting head: `6bd20ea106d0e7a42a577289c9c81276b2cc2a75`

1. **Preview database identity/safety check:** PASS. Canonical Move project reference `arepfylnilkjmyduhwbz`; legacy Production V1/forbidden reference `uvqkyupfnpswdozmuzih` was not targeted. The service-role and administrator secrets were detected only by variable name and never printed. Before the pilot, the Move V2 provider spine contained 599,326 records and no operational discovery releases. A baseline release/checkpoint was created before pointer advancement. Schema migrations were scoped to `move_v2` plus RLS-locked operational ledger tables.
2. **Operational commands connected:** Server-only `listReviewCases`, `readReviewCase`, `recordReviewDecision`, `runBoundedRefresh`, `resumeRefreshJob`, `inspectRefreshJob`, `inspectChangeEvents`, `rebuildConsumerDiscovery`, `inspectDiscoveryRelease`, and `supersedeReviewDecision`. Mutation authorization uses a constant-time comparison against a server-only secret. No mutation API route exists.
3. **Pilot providers selected:** Eight existing state-verified records, chosen for state balance and evidence diversity: 1776 Moving and Storage, 904 Movers, 1Truck 2Movers, A & A Transfer & Storage, Affordable Movers, A Perfect Mover, A2B Moving & Storage, and Air Van. Sample includes five verified locations, three honest location reviews, three validated websites, three explicit-geography providers, and WA DBA/legal-name examples.
4. **FL sample size:** 4.
5. **WA sample size:** 4.
6. **FMCSA refresh attempts/results:** 8 attempts; 8 SUCCESS; 0 changed in compared legal name/power-unit fields; 0 unavailable/failed. Median observed response time approximately 69 ms. All eight public records reported allowed-to-operate `Y`; this observation did not override state-local eligibility.
7. **FL authority refresh attempts/results:** 4 bounded anonymous official-page checks; 4 SUCCESS; no negative status inferred; typical/median observed response approximately 455 ms.
8. **WA authority refresh attempts/results:** 4 provider-specific UTC detail-page checks; 4 SUCCESS; no negative status inferred; typical/median observed response approximately 810 ms.
9. **Website refresh attempts/results:** 3 validated-site checks; 3 SUCCESS; five providers had no validated website and were not guessed or crawled.
10. **Service-geography refresh attempts/results:** 3 bounded checks on the same validated domains; 3 SUCCESS. Existing raw claims remained attached to the immutable candidate evidence; no new classification was manufactured.
11. **Source unavailable/failures:** 0 in the supervised real-source run. The recoverable `SOURCE_UNAVAILABLE`/failure branch remains covered by deterministic tests and never changes provider status.
12. **Real change events detected:** 0 material source changes. Current FMCSA legal names and power units agreed for all eight. This honest no-change result was retained.
13. **Non-material changes detected:** 0 from live evidence. Title-only and format-only-phone branches were verified as synthetic controls and do not invalidate discovery.
14. **Review cases inspected:** 3 real location-conflict cases plus 1 explicitly labeled synthetic supersession-control case.
15. **Real review decisions recorded:** 3 evidence-cited `RETAIN_UNRESOLVED` / `RESOLVED_NO_DECISION` decisions. No ambiguous provider was promoted to verified.
16. **Decisions remaining unresolved:** 3 real cases; all remain withheld from proximity calculations.
17. **Evidence citations per decision:** 2 immutable refresh-observation IDs per real decision, plus the case evidence fingerprint, reason, reviewer command identity, timestamp, and decision version.
18. **Decision supersession proof:** PASS through `SYNTHETIC CONTROL TEST`. The corrected decision references the earlier decision; both ledger rows remain; audit history count is 2. It was never treated as real source evidence.
19. **Discovery invalidation events:** 1 operational dependency transition: checked snapshot/checkpoint → database-backed refreshed-evidence release. No commercial input participated.
20. **New discovery releases:** 1 current operational pilot release plus 1 preserved baseline: `MOVE_CONSUMER_DISCOVERY_2026_08_V3_OPERATIONAL_PILOT`, fingerprint `0df751e59e03ec3e04a9e175b62030fe76e19f8e3c79ee8cb6f40aae777ba8e7`.
21. **No-change release no-op proof:** PASS. Immediate identical rerun returned `NO_OP`, retained the same release/fingerprint, inserted no duplicate observations, and—after the discovered guard correction—does not advance the pointer.
22. **Consumer-visible changes:** 0 provider facts changed because live source comparison produced no defensible material change. The operational release contains the same five verified and three review location outcomes; ordinary Preview consumers therefore receive no silent fact change.
23. **Trust Report traceability:** PASS. Each of the eight release candidates stores location decision evidence, refresh trace/fingerprints, explicit raw service evidence, and provider ID; the internal console loads the real case and decision history. Existing public Trust Reports remain free of internal metadata.
24. **Rollback/recovery demonstration:** PASS. The pointer was moved from the operational release to the preserved baseline and then restored to the corrected operational release. Both actions are in the operational audit log.
25. **Source evidence immutability after rollback:** PASS. The selected provider’s refresh-observation count was identical before/after recovery; the bad normalized control remains historical and the corrected decision was appended.
26. **Job checkpoint/resume proof:** PASS. Cursor progress was persisted provider-by-provider. A post-refresh release-stage failure left the completed refresh checkpoint intact; the next execution continued from cursor 8 without repeating source requests and completed release publication.
27. **Duplicate-run proof:** PASS. Unique `(provider, source, evidence_fingerprint)` observations total 22; repeated completed input no-ops.
28. **Source reliability observations:** 22/22 bounded observations succeeded: FMCSA 8, FL 4, WA 4, website validation 3, service geography 3. This tiny controlled sample is not a general source-SLA claim. No rate limit was observed; requests were sequential and bounded.
29. **Review workflow observations:** Three real cases were inspectable side by side; each showed the state/FMCSA conflict, took one evidence comparison plus a retain-unresolved action, and rendered history. Average cited refreshed observations per real decision: 2. Resolution pressure was deliberately absent.
30. **Final review inventory:** Overall checked-in consumer baseline remains 34 location reviews. Operational pilot ledger: 3 real retained-unresolved cases and 1 synthetic-control case.
31. **Final verified location count:** Overall FL/WA consumer baseline remains 52. Scoped operational release: 5/8 verified; 3/8 location review.
32. **Final website status counts:** Overall baseline remains 6 accepted / 22 review. Pilot: 3 validated websites refreshed successfully; 5 were not attempted because no validated domain was available.
33. **Final explicit-service count:** Overall baseline remains 5. Scoped operational release: 3 providers carry explicit evidence.
34. **Final active discovery release:** Database pointer → `MOVE_CONSUMER_DISCOVERY_2026_08_V3_OPERATIONAL_PILOT`, 8 candidates, fingerprint above; prior pointer → immutable V2 database checkpoint. Experimental derived is false.
35. **External API cost:** Google calls 0; other paid requests 0; incremental cost **$0.00**.
36. **Internal/public separation:** PASS. Operational tables are RLS-enabled and revoked from browser roles; writes require server authorization; console is read-only with in-memory QA actions; public API contains no reviewer, audit, job, or decision metadata.
37. **V1 integrity:** PASS. Provider-spine count stayed 599,326; forbidden legacy project was not contacted; historical model records were unchanged.
38. **Commercial firewall:** PASS. Subscription, ratings, reviews, advertising, and payment data neither refreshed nor invalidated a release.
39. **Experimental-derived isolation:** PASS. No derived model was created/activated; public output and operational release both declare it excluded. NJ and Illinois remain excluded.
40. **Tests:** PASS — 203/203 Move V2 domain/regression tests, lint, typecheck, build, and diff check.
41. **Playwright:** PASS — consumer desktop/mobile and reviewer-console desktop, including real operational read/fallback-safe behavior and synthetic non-persistent browser actions.
42. **Commits:** `81e616f0` (authenticated operational lifecycle), followed by the report-close commit.
43. **CI:** PASS — push run `32057522628` and PR run `32057527441` succeeded on `81e616f0`, including lint, typecheck, 203 tests, build, both browser suites, artifacts, default-off gates, and critical dependency audit.
44. **Vercel Preview:** PASS / Ready — Vercel status succeeded on `81e616f0`.
45. **PR #1 DRAFT status:** Confirmed OPEN + DRAFT on `81e616f0`; description updated for Tasks 001–011; not merged.
46. **Production changes:** **NONE**.
47. **Task 011:** **PASS**.
48. **Ready for Task 012?** **YES**.
49. **Exact Task 012 recommendation:** Build a narrowly authenticated reviewer deployment using organization SSO/RBAC and CSRF-protected server actions, then run a supervised weekly FL/WA operational cadence with alerting, source-SLA measurement, and release-approval separation. Keep state scope fixed and derived geography disabled until independent activation evidence exists.

Supporting machine-readable records:

- `docs/task-011-pilot-audit.json`
- `docs/task-011-recovery-control-audit.json`
- `docs/task-011-final-db-audit.json`
