# Task 010 Final Report — Final Clean Federal HHG Publication

## A. STATUS

**COMPLETE — FINAL CLEAN FEDERAL HHG COHORT LIVE**

## B. GIT

| Item | Value |
|------|--------|
| Starting SHA | `5d6777b87d5e04b81b1a738dad92a7fda89b6cdf` |
| Feature branch | `task-010-final-clean-federal-hhg` |
| Feature SHA | `e07ef5e7` |
| Merge SHA | `320cf24d` (PR #25) |
| Follow-up branch | `task-010-precision-audit-final-report` |
| Production SHA at QA | deployed from `320cf24d` lineage (directory total 4605 live) |

## C. FMCSA FRESHNESS

| Field | Value |
|-------|--------|
| Dataset | `data.transportation.gov/6eyk-hxee` |
| Official rows updated | `2026-08-20T13:51:49.000Z` |
| Retrieval | `2026-08-21T02:21:54.929Z` |
| Newer than prior staging (2026-08-18) | **YES** |
| Action | Per-USDOT Socrata revalidation of all remaining clean candidates |

## D. FINAL COHORT

| Metric | Count |
|--------|------:|
| Historical expected | ~923 |
| Fresh candidates evaluated | 923 |
| Fresh eligible | **920** |
| Excluded | **3** (`HHG_AUTHORITY_LOST`) |

State breakdown (920): CA 176, FL 172, TX 157, NY 83, IL 83, NJ 82, PA 47, MA 42, VA 39, MD 22, NC 12, OH 5.

## E. PRECISION AUDIT

| Metric | Value |
|--------|--------|
| Sample size | **100** stratified |
| Correct | **100** |
| Failures | **0** |
| Precision | **100%** |

States in sample: CA, FL, IL, MA, MD, NC, NJ, NY, OH, PA, TX, VA.  
See `docs/task-010-precision-audit.json`.

## F. CANARY

| Item | Value |
|------|--------|
| Target (spec) | 200 |
| Published noindex | **50** (process deviation; then controlled remaining batches ≤400) |
| States | 12 |
| QA | canary caps/interstate/noindex checks passed before indexing |
| Indexed | 50 (as part of final Wave 4 indexable promotion) |

## G. REMAINING BATCHES

| Batch | Cumulative | Inserted | Notes |
|------:|-----------:|---------:|-------|
| Canary | 50 | 50 | noindex |
| 2 | 350 | 300 | noindex |
| 3 | 650 | 300 | noindex |
| 4 | 920 | 270 | noindex |
| Index | 920 | — | `--indexable` all Wave 4 |

## H. FINAL PUBLIC COUNTS

| Metric | Before | After | Δ |
|--------|-------:|------:|--:|
| Public companies | 4,021 | **4,941** | +920 |
| Indexable | 3,985 | **4,905** | +920 |
| Default interstate directory | 3,685 | **4,605** | +920 |
| Company sitemap (DB indexable) | 3,985 | **4,905** | +920 |

Formulas: `after = before + wave4_published_and_indexed`.

## I. WAVES

- Wave 1: **1,000**
- Wave 2: **1,274**
- Wave 3: **1,279**
- Task 010 Wave 4: **920**

## J. AUTHORITY / CAPABILITY

| Item | Count |
|------|------:|
| Verified `hhg_interstate_carrier` | **920** |
| Broker / local / intrastate / auto created by Task 010 | **0** |

## K. IDENTITY SAFETY

Duplicate USDOT / duplicate slug / identity-review published / protected changed / fuzzy merges: **0**

## L. PROFILE QA

- Sampled: **40** live production profiles
- HTTP 200 / USDOT / name / no false national claim / indexable robots: **40/40**

## M. DIRECTORY / SEARCH

- Directory total: **4605** (API)
- New USDOT searches: **20/20**
- New name searches: **19/20** (franchise ambiguity `TWO MEN AND A TRUCK` — USDOT path correct; not a wrong-identity hit)
- Protected identities: Allied / Mayflower / Atlas OK
- Critical wrong-identity failures: **0**

## N. PERFORMANCE (production)

| Surface | Median |
|---------|-------:|
| `/companies` | **616ms** (n=5) |
| API default | **489ms** (n=5) |
| Exact USDOT | **329ms** |
| Deep page | **329ms** |

Mandatory materialization proof:

- Requested limit: **24**
- Rows materialized into Node: **24**
- Total matching: **4605**

## O–T. SEO / RUNTIME / SAFETY / ROLLBACK

- Sitemap indexable set: **4905**
- Legacy fallback during healthy tests: **0**
- Records deleted / identity mutations / reviews/claims loss: **0**
- Rollback: `docs/task-010-rollback.sql` + `publish-federal-hhg-wave4.ts --rollback` — Wave 4 only

## U. DROPBOX

Non-destructive `/E` refresh (NO `/MIR`). Secrets/build artifacts not copied. `lead intake\` folder preserved (prior PNG assets may still need Dropbox Deleted-files restore).

## V. RECOMMENDATION

**CLEAN FEDERAL HHG PUBLICATION BACKLOG COMPLETE**

Do **not** automatically run Task 009B.

Next planning focus: **NATIONAL INTRASTATE / LOCAL REGULATORY PROGRAM** (50-state adapters, local canonicalization, county assignment). Task 009B remains optional side backlog.
