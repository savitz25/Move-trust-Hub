# Canonical correction proposal ? NOT APPROVED / NOT EXECUTED

This release contains the public assertion. It does not change production records. The following is the exact scope proposed for a separately approved canonical correction after refreshing the bounded official evidence.

## Target and compare-and-set preconditions

- Project: canonical Move `arepfylnilkjmyduhwbz`; table `public.companies`.
- Stable key: `id = jk-moving`; slug `jk-moving-services`; expected row count **1**.
- Expected USDOT `1065394`; expected MC `225850`.
- Expected legal name `JK MOVING & STORAGE INC` and raw DBA `JK MOVING SERVICES`.
- Expected `updated_at = 2026-08-23 05:02:18.422731+00`.
- Expected `fmcsa_last_checked = 2026-08-23 05:02:18.368+00`.
- Expected `data_hash = 5d0585c2184935aa52df9b33545883eab15d7eecd7e366ec6bed038184969a01`.
- Any changed precondition or row count aborts the operation and requires another source review.

## Proposed association change

`mc_number`: `225850` -> `196957`, for this exact USDOT identity only, if the official USDOT/MC checks still corroborate it at approval/execution time. USDOT, identity key, publication, name, ratings, claims, regulatory state and other rows remain unchanged. The prior MC remains an explicitly disputed historical stored observation in the ticket/change evidence; it is not declared historically invalid or assigned to another business.

Evidence: independent SAFER USDOT1065394 and MC196957 checks identify the same legal name/DBA with source date 2026-09-10; MOTUS lists MC196957 for its two current authority registrations. MC225850 returns Record Inactive without holder/history. Evidence excerpts and SHA256 fingerprints are retained alongside this proposal.

## Provenance/hash and refresh prerequisites

A simple field-only update is insufficient approval for changing refresh timestamps or raw payload. The retained raw object currently has no MC/docket or snapshot date. Do not inject a web observation into an API-origin raw payload or stamp all FMCSA evidence as freshly checked. Preserve the old raw payload/check time. Record the docket-specific official source URL, source date, retrieval date and before/after association in the existing approved correction/audit mechanism, or a reviewed repository receipt if the current ledger cannot represent it. Exact audit fields must be reviewed before execution; no new table is proposed.

`data_hash` includes MC alongside other regulatory inputs. Recompute only from the same captured existing snapshot with the single accepted docket correction, after validating the repository hash contract; do not invent the resulting hash now or silently refresh unrelated fields. Record old/new hashes in the execution receipt. The existing DOT fetch helper overwrites a fetched docket with its supplied old-MC hint; a separate narrowly tested refresh fix must stop that stale hint from reinstating the old assertion. Do not run the existing multi-record directory-corrections or mass-refresh scripts for this proposal.

## Validation and rollback

Use a transaction with precondition checks and a one-row affected-count assertion. Validate USDOT/name unchanged, the accepted MC equal to the official relationship, and no other company/authority/claim/profile row mutated. Re-run exact MC/DOT/pair, name selection, public profile, Verify and legacy consumer tests. Remove/revise the containment artifact only in a reviewed follow-up after the new source fingerprint and public projection pass. The current guard intentionally does not auto-clear merely on a field change.

If canonical correction validation fails, roll back that transaction. After an executed correction, restoring the prior stored observation is permissible only with containment retained: it must never restore an unqualified public MC225850 association. Public code rollback should retain safe containment and USDOT research. Approval for this proposal has not been requested as a routine implementation gate and has not been granted.
