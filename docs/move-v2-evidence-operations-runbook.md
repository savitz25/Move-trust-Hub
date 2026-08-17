# Move V2 evidence operations runbook

## Safety boundary

The reviewer console is available only when `MOVE_ENABLE_V2=true` and `MOVE_ENABLE_INTERNAL_REVIEW=true`, and its server route returns 404 when `VERCEL_ENV=production`. Operational tables have RLS enabled and grant no access to browser roles. Task 010 schedules are disabled; all validation uses dry-run or synthetic data. Consumer APIs never return reviewer names, notes, conflict analysis, job controls, or decision metadata.

## Official refreshes

Run the source-specific bounded job (`FMCSA_FRESHNESS`, `FL_STATE_AUTHORITY_FRESHNESS`, or `WA_STATE_AUTHORITY_FRESHNESS`) in dry-run first. Each job has an input fingerprint, item limit, checkpoint cursor, attempt count, and source-aware retry policy. A repeated completed fingerprint is a no-op. A failure retains the last successful cursor, so resumption does not replay committed items. Raw source observations are inserted append-only; duplicate source fingerprints do not duplicate evidence.

Never translate an outage into inactive, unlicensed, or closed. Record `SOURCE_UNAVAILABLE`, retry according to policy, and show “Verification refresh pending.” Authority evidence past hard expiry is excluded until refreshed; website/contact staleness is labeled or reviewed without rewriting regulatory status.

## Review cases and decisions

Cases open when normalization is ambiguous or a material refresh change requires judgment. A case fingerprints and cites its source observations. Reviewers inspect state, FMCSA, Google, website, and other observations side by side. Decisions append to the ledger and must cite selected/rejected observation IDs. A later decision references `supersedes_decision_id`; history is never updated or deleted.

Location selection requires strong location evidence and cannot use a name-only match. Service geography requires provider-published raw text and its source URL. A branch is a location fact only: it creates neither service coverage nor a separate provider, authority, or fleet allocation.

## Stale evidence behavior

Policy `MOVE_EVIDENCE_FRESHNESS_2026_08_V1` uses soft and hard intervals. Soft expiry produces `REFRESH_DUE`; hard expiry produces `STALE`. Regulatory records use shorter intervals and hard consumer exclusion. Website and service content use a neutral pending label/review. Repeated failures escalate to `REVIEW_REQUIRED` without changing source facts.

## Change detection and discovery rebuilds

Authority status, selected primary location, explicit service geography, display identity, and selected primary contact can invalidate discovery. Identity, location, website-identity, and service conflicts can also open review. Page-title changes, format-only phone changes, ratings, review counts, and subscriptions do not rebuild discovery. Commercial fields never enter the dependency fingerprint.

For a rebuild, inspect material change events, resolve required cases, run `CONSUMER_DISCOVERY_REBUILD` in dry-run, compare the input fingerprint to the current immutable release, and publish a new immutable Preview release only when inputs differ. Keep the prior current pointer available for rollback.

## Failure inspection and rollback

Inspect failed job type, source status, checkpoint, attempt count, last error, and last successful refresh. Resume with the same input fingerprint after the source recovers. To reverse a bad normalized choice, open/reopen its case and append a superseding decision citing the correct evidence; then rebuild discovery. Never edit the original observation or prior decision.

## Confirming Production isolation

Before and after Preview work, verify no production migration, cron, release pointer, or deployment was executed. Confirm the Production reviewer route is 404, public APIs contain no internal fields, `MOVE_ENABLE_INTERNAL_REVIEW=false` is the default, experimental derived coverage is absent, and the PR remains draft and unmerged.
