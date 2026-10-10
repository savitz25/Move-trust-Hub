# MU-MOVE-001 S1 — exact USDOT matcher scope

Reason code: `MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE`.

This change is the matcher follow-up only. It does not run the Data Pipeline SQL backfill, does not write `federal_hhg_staging` or `companies`, and does not create companies.

## What the candidate filter actually was

`scripts/stage-federal-hhg.ts` is the only caller of `matchStagedToCompanies`. Its historical candidate read was:

```sql
SELECT id, slug, name, usdot_number, mc_number FROM public.companies
```

Confirmed against that read:

| Column | Role in the historical false negative |
| --- | --- |
| `legacy_directory_row` | Not a SQL predicate. The pass that wrote the 118 `exact USDOT` links ran while `companies` was the legacy directory (`legacy_directory_row=true`). |
| id prefix `usdot-%` | Not a SQL predicate, and not present in that candidate set. Non-legacy spine rows were inserted later and were never re-matched. |
| `publication_state` | Not a predicate. Spine rows are commonly `INGESTED` / not indexable. |
| `entity_type` | Not a predicate. Carrier, broker, and carrier/broker rows all carry USDOT keys. |

The false stamp was `no exact USDOT or MC match` (and, for 45 rows, `name similarity only — not a canonical match`) on staging keys that already equaled a spine `usdot_number`. Equality is digit-normalized `usdot_number`. The `usdot-*` id is not used as a USDOT when `usdot_number` is empty.

## Scope contract

`FEDERAL_HHG_MATCH_CANDIDATE_SQL` still reads `public.companies` and now selects `legacy_directory_row`, `publication_state`, and `entity_type` so the scope stays visible. A `WHERE` on any of those columns, or `id NOT LIKE 'usdot-%'`, throws `MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE` before matching starts.

`isExactUsdotMatchCandidate` keeps a company when it has a digit USDOT. Legacy flag, `usdot-%` id, publication state, and entity type do not remove it.

## Link rules

1. A 1:1 digit USDOT becomes `exact USDOT` before name similarity.
2. The matcher does not stamp `no exact USDOT or MC match` when any candidate has that USDOT.
3. When both sides have MC digits, they must agree. USDOT-only is allowed when MC is missing on one or both sides. Disagreement is `USDOT matches but MC differs` and does not link.
4. USDOT `1398726` is a collision hold (`northern-michigan-moving` and `northern-michigan-moving-2`). It is not auto-linked even if the candidate list shows only one of those companies. Reason stays `duplicate USDOT on existing companies`.
5. Name similarity still returns no `companyId`. The matcher does not insert `companies` rows. A true miss may still be `NEW_CANONICAL_CANDIDATE` for a later publication decision; that disposition is not a write.
