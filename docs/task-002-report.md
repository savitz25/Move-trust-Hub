# Task 002 report — national FMCSA data spine

Run date: 2026-08-16. Repository `savitz25/Move-trust-Hub`; starting/head `4dc3756a178e1374c38bc2a8197b6b24986c4521`; branch `move-2.0`; original dirty main worktree untouched. Draft PR #1 continues to target main.

## Production safety

Public Production changes: **NONE**. No V1 table, provider ID, search, indexed page, redirect, or feature flag was changed. Google enrichment: **NOT RUN**. Website enrichment: **NOT RUN**. State-license enrichment: **NOT RUN**. Real-data and V2 routes are server-gated, noindex, and hard-404 in `VERCEL_ENV=production`.

## Official releases and loads

Exact current source metadata, row counts, bytes and hashes are in `fmcsa-source-registry.md`. Loads processed: Census 4,485,162; Motus Carrier 107,097; AuthHist 120,850; Insurance 100,645; Revoke/Suspend 9,956; BOC-3 110,966 (loaded because its 10 MB footprint is small and it preserves useful process-agent evidence). Census validation: zero parse failures, blank USDOT or duplicate USDOT; 88 blank legal names were reported.

Local/durable source storage is 1,191,007,899 bytes before normalized outputs; normalized CSV evidence is 236,419,157 bytes. The first build took 328.98 seconds and the identical-release rerun took 293.71 seconds. All six normalized CSV SHA-256 values were byte-identical. Artifacts are immutable by dated directory and SHA and excluded from Git.

## Real national output

Moving-relevant providers: **277,813**. Classifications: interstate HHG carrier **715**; local/intrastate carrier candidate **96,460**; authorized broker **68**; dual-role carrier/broker **82**; HHG freight forwarder **28**; inactive moving entity **88,135**; needs regulatory review **92,325**. Review is intentionally conservative and retains contradictions.

Coverage: DBA 65,875 / 23.71%; phone 274,331 / 98.75%; physical and mailing address 277,812 / effectively 100%; MC/MX/FF docket 189,365 / 68.16%; current authority 100,658 / 36.23%; financial evidence 79,792 / 28.72%; power units 277,078 / 99.74%; drivers 260,832 / 93.89%. The complete state-by-classification distribution is recorded in the local release report and summarized in `fmcsa-data-quality.md`; address state is never treated as service area.

V1 coverage audit: 145 providers had USDOT; 145 exact Census matches; 0 missing. Their current classifications are 115 local candidates, 14 interstate carriers, 6 dual-role, 2 brokers, 4 inactive and 4 review. V1 labels were QA only and never authority truth.

## Architecture and integrity

Stable provider IDs are deterministic from exact USDOT. Legal, DBA, and display values remain separate with DBA-first display. Multiple dockets, authority rows, history events, insurance filings, contacts, and source observations remain separate. The current Motus era wins current-state conflicts against legacy L&I while legacy history remains immutable. Classifier input contains no billing/subscription field: commercial firewall **PASS**. Local-only rule **PASS**. Official artifact immutability **PASS**. V1 code/data integrity **PASS**.

The additive migrations are `20260816120000_move_v2_provider_identity_foundation.sql` and `20260816190000_move_v2_fmcsa_national_spine.sql`. They contain no V1 mutation. Database application/load is currently **BLOCKED**: the configured environment has URL, anon, and service-role keys but no PostgreSQL/management credential; Supabase CLI is unauthenticated and no connected signed-in browser is available. Consequently database table/index sizes, SQL `EXPLAIN ANALYZE`, transactional publication, and database-level rerun proof cannot honestly be reported as passed.

## QA, tests, and Preview

Automated rules: all Task 001 tests plus Task 002 A–O pass (32/32 total). This includes active local candidate, interstate, restoration, current revoke, broker bond, inactive broker, missing broker financial evidence, dual-role, DBA/no DBA, Motus-over-legacy, multiple authorities/dockets, idempotent keying, and commercial isolation. Lint, focused typecheck, parser tests, `git diff --check`, and full Next production build pass.

A six-class real-data QA surface exists at `/experience-lab/v2/real`, separate from the synthetic lab. It is bounded, noindex, Preview-only, and requires both V2 and real-provider flags. The national release itself is never served as a bulk endpoint.

The requested 115+ manual entity review and bounded SAFER comparison are not marked complete; automated source-trace sampling is not a substitute for that manual semantic review. The Preview real-data flag also remains off until database publication is available.

## Status

Commercial firewall: **PASS**. Production changes: **NONE**. Draft PR must remain draft. Ready for Task 003: **NO**—database publication, SQL performance measurements, 115+ manual QA, bounded SAFER spot-check, Preview deployment verification, and CI must finish first. Do not begin Task 003.
